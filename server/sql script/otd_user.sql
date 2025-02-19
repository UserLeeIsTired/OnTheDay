-- Drop the table otd_user and the sequence user_id_seq if they exist
DROP TABLE IF EXISTS otd_user CASCADE;

-- Create the table otd_user using the sequence
CREATE TABLE otd_user (
    uid SERIAL PRIMARY KEY,
	company_domain_id INTEGER,
    username VARCHAR(256) NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    salt VARCHAR(256) NOT NULL,
    created_at TIMESTAMP,
	is_banned BOOLEAN NOT NULL DEFAULT FALSE,
	CONSTRAINT fk_company_domain FOREIGN KEY (company_domain_id) REFERENCES otd_domain_owner(uid),
	CONSTRAINT unique_company_domain_username UNIQUE (company_domain_id, username)
);



--INSERT INTO otd_user (company_domain, username, password_hash) VALUES ('example.com.otd', 'User1', 'password')