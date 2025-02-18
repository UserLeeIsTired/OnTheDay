package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
)

func main() {
	db, err := NewDatabase()
	if err != nil {
		fmt.Println("Error initializing database:", err)
		return
	}
	defer db.Close()

	r := chi.NewRouter()

	r.Post("/domain-owner", func(w http.ResponseWriter, r *http.Request) {
		CreateDomainOwner(w, r, db)
	})

	r.Get("/domain-owner", func(w http.ResponseWriter, r *http.Request) {
		GetDomainOwners(w, r, db)
	})

	http.ListenAndServe("0.0.0.0:8080", r)
}
