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

type NewDomainUser struct {
	CompanyDomainId string
	Username        string
	Password        string
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
		http.Error(w, "Invalid domain name or the company domain has already been used", http.StatusConflict)
		return
	}

	sessionId, err := redis.CreateKeyWithExpiration(uId)

	if err != nil {
		http.Error(w, "Server Error", http.StatusInternalServerError)
		return
	}

	cookie := http.Cookie{
		Name:     "sessionId",
		Value:    sessionId,
		Expires:  time.Now().Add(24 * time.Hour),
		Path:     "/",
		Secure:   false,
		SameSite: http.SameSiteNoneMode,
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

func GetDomainOwner(w http.ResponseWriter, r *http.Request, db *Database, redis *Redis) {
	cookie, err := r.Cookie("sessionId")

	if err != nil {
		http.Error(w, "Unauthorized access", http.StatusBadRequest)
		return
	}

	uId, err := redis.GetValueByKey(cookie.Value)

	if err != nil {
		http.Error(w, "Unauthorized access", http.StatusBadRequest)
		return
	}

	domainOwner, err := db.GetDomainOwner(uId)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	responseJSON, err := json.Marshal(domainOwner)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"message": "Domain owner retrieved successfully",
		"users":   json.RawMessage(responseJSON),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func Login(w http.ResponseWriter, r *http.Request, db *Database, redis *Redis) {
	var loginBody LoginBody

	err := json.NewDecoder(r.Body).Decode(&loginBody)

	if err != nil {
		return
	}

	domainOwner, userId, err := db.Login(loginBody.CompanyDomain, loginBody.Username, loginBody.Password)

	if err != nil {
		http.Error(w, "Company domain, username, or password is incorrect", http.StatusUnauthorized)
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
		Expires:  time.Now().Add(24 * time.Hour),
		Path:     "/",
		Secure:   false,
		HttpOnly: false,
		SameSite: http.SameSiteLaxMode,
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
		Secure:   false,
		SameSite: http.SameSiteNoneMode,
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

func CreateDomainUser(w http.ResponseWriter, r *http.Request, db *Database, redis *Redis) {

	cookie, err := r.Cookie("sessionId")

	if err != nil {
		http.Error(w, "Unauthorized access", http.StatusBadRequest)
		return
	}

	uId, err := redis.GetValueByKey(cookie.Value)

	if err != nil {
		http.Error(w, "Unauthorized access", http.StatusBadRequest)
		return
	}

	var newDomainUser NewDomainUser
	err = json.NewDecoder(r.Body).Decode(&newDomainUser)

	if err != nil {
		http.Error(w, "Request error", http.StatusBadRequest)
		return
	}

	newDomainUser.CompanyDomainId = uId

	if len(newDomainUser.Password) < 8 {
		http.Error(w, "The password must contain at least 8 characters", http.StatusBadRequest)
		return
	}

	lastInsertedId, err := db.CreateDomainUser(newDomainUser.CompanyDomainId, newDomainUser.Username, newDomainUser.Password)

	if err != nil {
		http.Error(w, "Username has been used in the domain", http.StatusBadRequest)
		return
	}

	response := map[string]interface{}{
		"message":  "New user is created successfully",
		"user_id":  json.RawMessage(lastInsertedId),
		"username": json.RawMessage(newDomainUser.Username),
		"password": json.RawMessage(newDomainUser.Password),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)

}

func GetAllDomainUser(w http.ResponseWriter, r *http.Request, db *Database, redis *Redis) {

}
