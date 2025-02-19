package main

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"
)

type NewDomainOwner struct {
	CompanyDomain string
	Username      string
	Password      string
}

type LoginBody struct {
	CompanyDomain string
	Username      string
	Password      string
}

func CreateDomainOwner(w http.ResponseWriter, r *http.Request, db *Database, redis *Redis) {
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

	uId, err := db.CreateDomainOwner(newDomainOwner.CompanyDomain, newDomainOwner.Username, newDomainOwner.Password)

	if err != nil {
		http.Error(w, err.Error(), http.StatusConflict)
		return
	}

	sessionId, err := redis.CreateKeyWithExpiration(uId)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	cookie := http.Cookie{
		Name:     "sessionId",
		Value:    sessionId,
		Expires:  time.Now().Add(1 * time.Hour),
		Path:     "/",
		HttpOnly: true,
	}

	response := map[string]interface{}{
		"message": "Company domain is created successfully",
		"user": map[string]string{
			"Company Domain":   newDomainOwner.CompanyDomain,
			"Owner's username": newDomainOwner.Username,
		},
	}
	http.SetCookie(w, &cookie)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}

// func GetDomainOwners(w http.ResponseWriter, r *http.Request, db *Database) {
// 	DomainOwners, err := db.GetDomainOwners()

// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}

// 	responseJSON, err := json.Marshal(DomainOwners)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	response := map[string]interface{}{
// 		"message": "Domain owners retrieved successfully",
// 		"users":   json.RawMessage(responseJSON),
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	json.NewEncoder(w).Encode(response)
// }

func Login(w http.ResponseWriter, r *http.Request, db *Database, redis *Redis) {
	var loginBody LoginBody

	err := json.NewDecoder(r.Body).Decode(&loginBody)

	if err != nil {
		return
	}

	domainOwner, userId, err := db.Login(loginBody.CompanyDomain, loginBody.Username, loginBody.Password)

	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	responseJSON, err := json.Marshal(domainOwner)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	sessionId, err := redis.CreateKeyWithExpiration(strconv.Itoa(userId))

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	cookie := http.Cookie{
		Name:     "sessionId",
		Value:    sessionId,
		Expires:  time.Now().Add(1 * time.Hour),
		Path:     "/",
		HttpOnly: true,
	}

	http.SetCookie(w, &cookie)
	response := map[string]interface{}{
		"message": "Login successfully",
		"users":   json.RawMessage(responseJSON),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)

}

func TestAccess(w http.ResponseWriter, r *http.Request, db *Database, redis *Redis) {
	cookie, err := r.Cookie("sessionId")
	if err != nil {
		http.Error(w, "Unauthorized access", http.StatusUnauthorized)
		return
	}

	val, err := redis.ExtendKeyExpiration(cookie.Value)
	if err != nil {
		http.Error(w, "Cookie has expired", http.StatusUnauthorized)
		return
	}

	response := map[string]interface{}{
		"message": "Welcome back!",
		"user_id": json.RawMessage(val),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)

}

func Logout(w http.ResponseWriter, r *http.Request, redis *Redis) {
	cookie, err := r.Cookie("sessionId")

	if err != nil {
		http.Error(w, "Unauthorized access", http.StatusUnauthorized)
		return
	}

	uId, err := redis.GetValueByKey(cookie.Value)

	if err != nil {
		http.Error(w, "Cookie has been expired", http.StatusUnauthorized)
		return
	}

	res, err := redis.DeleteKey(uId)

	if err != nil || !res {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	remove := http.Cookie{
		Name:     "sessionId",
		Value:    "",
		Expires:  time.Unix(0, 0),
		Path:     "/",
		HttpOnly: true,
	}

	http.SetCookie(w, &remove)
}

func DeleteDomain(w http.ResponseWriter, r *http.Request, db *Database, redis *Redis) {
	cookie, err := r.Cookie("sessionId")

	if err != nil {
		http.Error(w, "Unauthorized access", http.StatusUnauthorized)
		return
	}

	uId, err := redis.GetValueByKey(cookie.Value)

	if err != nil {
		http.Error(w, "Cookie has been expired", http.StatusUnauthorized)
		return
	}

	res, err := db.DeleteDomain(uId)

	if err != nil || !res {
		http.Error(w, "Error occur during deletion", http.StatusUnauthorized)
		return
	}

	response := map[string]interface{}{
		"message": "Deletion is successful",
		"user_id": json.RawMessage(uId),
	}

	Logout(w, r, redis)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)

}
