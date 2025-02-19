package main

import (
	"database/sql"
	"fmt"
	"os"

	"strconv"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type DomainOwner struct {
	CompanyDomain string
	Username      string
	CreatedAt     string
}

type Database struct {
	db *sql.DB
}

func NewDatabase() (*Database, error) {
	err := godotenv.Load(".env")
	if err != nil {
		return nil, err
	}

	var (
		host     = os.Getenv("HOST")
		port     = os.Getenv("PORT")
		user     = os.Getenv("USER")
		password = os.Getenv("PASSWORD")
		dbname   = os.Getenv("DBNAME")
	)
	connectionString := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", user, password, host, port, dbname)

	db, err := sql.Open("postgres", connectionString)

	if err != nil {
		return nil, err
	}

	return &Database{db: db}, nil
}

func (d *Database) Close() {
	if d != nil {
		d.db.Close()
	}
}

func (d *Database) CreateDomainOwner(companyDomain string, username string, password string) (string, error) {
	stmt, err := d.db.Prepare("INSERT INTO otd_domain_owner (company_domain, owner_username, password_hash) VALUES ($1, $2, $3) RETURNING uid")

	if err != nil {
		return "", err
	}

	defer stmt.Close()

	lastInsertedId := -1
	err = stmt.QueryRow(companyDomain, username, password).Scan(&lastInsertedId)

	if err != nil {
		return "", err
	}

	return strconv.Itoa(lastInsertedId), nil
}

func (d *Database) Login(companyDomain string, username string, password string) (*DomainOwner, int, error) {
	stmt, err := d.db.Prepare("SELECT uid, company_domain, owner_username, created_at FROM otd_domain_owner WHERE company_domain = $1 AND owner_username = $2 AND password_hash = encode(digest($3 || salt, 'sha256'), 'hex')")

	if err != nil {
		return nil, -1, err
	}

	defer stmt.Close()

	var domainOwner DomainOwner

	var userId *int

	row := stmt.QueryRow(companyDomain, username, password)

	if err := row.Scan(&userId, &domainOwner.CompanyDomain, &domainOwner.Username, &domainOwner.CreatedAt); err != nil {
		if err == sql.ErrNoRows {
			return nil, -1, fmt.Errorf("Invalid credentials")
		}
		return nil, -1, err
	}

	return &domainOwner, *userId, nil
}

func (d *Database) GetDomainOwners() ([]DomainOwner, error) {
	rows, err := d.db.Query("SELECT company_domain, owner_username, created_at FROM otd_domain_owner")
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	var domainOwners []DomainOwner

	for rows.Next() {
		var domainOwner DomainOwner

		if err := rows.Scan(&domainOwner.CompanyDomain, &domainOwner.Username, &domainOwner.CreatedAt); err != nil {
			return nil, err
		}

		domainOwners = append(domainOwners, domainOwner)
	}

	return domainOwners, nil
}

func (d *Database) DeleteDomain(uId string) (bool, error) {

	res, err := d.db.Exec("DELETE FROM otd_domain_owner WHERE uId = $1", uId)

	if err != nil {
		return false, err
	}

	count, err := res.RowsAffected()

	if err != nil {
		return false, err
	}

	if count == 0 {
		return false, fmt.Errorf("Unsuccessful deletion")
	}

	return true, nil

}
