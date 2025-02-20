package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

func main() {
	db, err := NewDatabase()
	if err != nil {
		fmt.Println("Error initializing database:", err)
		return
	}
	defer db.Close()

	r := chi.NewRouter()

	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Accept", "Content-Type", "X-CSRF-TOKEN"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum age for the preflight OPTIONS request
	})
	r.Use(cors.Handler)

	redis := NewRedis()

	r.Post("/domain-owner", func(w http.ResponseWriter, r *http.Request) {
		CreateDomainOwner(w, r, db, redis)
	})

	r.Post("/domain-owner/login", func(w http.ResponseWriter, r *http.Request) {
		Login(w, r, db, redis)
	})

	r.Post("/domain-owner/logout", func(w http.ResponseWriter, r *http.Request) {
		Logout(w, r, redis)
	})

	// r.Get("/domain-owner", func(w http.ResponseWriter, r *http.Request) {
	// 	GetDomainOwners(w, r, db)
	// })

	r.Get("/domain-owner/access", func(w http.ResponseWriter, r *http.Request) {
		TestAccess(w, r, db, redis)
	})

	r.Delete("/domain-owner", func(w http.ResponseWriter, r *http.Request) {
		DeleteDomain(w, r, db, redis)
	})

	http.ListenAndServe("0.0.0.0:8080", r)
}
