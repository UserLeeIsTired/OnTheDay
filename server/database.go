package main

import (
	"database/sql"
	"fmt"
	"os"

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

	return &Database{db: db}, nil
}

func (d *Database) Close() {
	if d != nil {
		d.db.Close()
	}
}

func (d *Database) CreateDomainOwner(companyDomain string, username string, password string) (string, error) {
	stmt, err := d.db.Prepare("INSERT INTO otd_domain_owner (company_domain, owner_username, password_hash) VALUES ($1, $2, $3)")

	if err != nil {
		return "", err
	}

	defer stmt.Close()

	_, err = stmt.Exec(companyDomain, username, password)

	if err != nil {
		return "", err
	}

	result := fmt.Sprintf("Company domain is created successfully")

	return result, nil
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
