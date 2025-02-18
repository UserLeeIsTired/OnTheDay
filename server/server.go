package main

import (
	"encoding/json"
	"net/http"
)

type NewDomainOwner struct {
	CompanyDomain string
	Username      string
	Password      string
}

func CreateDomainOwner(w http.ResponseWriter, r *http.Request, db *Database) {
	var newDomainOwner NewDomainOwner
	err := json.NewDecoder(r.Body).Decode(&newDomainOwner)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if len(newDomainOwner.Password) < 8 {
		http.Error(w, "The password must contain at least 8 characters", http.StatusBadRequest)
		return
	}

	_, err = db.CreateDomainOwner(newDomainOwner.CompanyDomain, newDomainOwner.Username, newDomainOwner.Password)

	if err != nil {
		http.Error(w, err.Error(), http.StatusConflict)
		return
	}

	response := map[string]interface{}{
		"message": "Company domain is created successfully",
		"user": map[string]string{
			"Company Domain":   newDomainOwner.CompanyDomain,
			"Owner's username": newDomainOwner.Username,
		},
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}

func GetDomainOwners(w http.ResponseWriter, r *http.Request, db *Database) {
	DomainOwners, err := db.GetDomainOwners()

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	responseJSON, err := json.Marshal(DomainOwners)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"message": "Domain owners retrieved successfully",
		"users":   json.RawMessage(responseJSON),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
