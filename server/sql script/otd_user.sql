-- Drop the table otd_user and the sequence user_id_seq if they exist
DROP TABLE IF EXISTS otd_user CASCADE;

-- Create a sequence
CREATE SEQUENCE user_id_seq START 1;

-- Create the table otd_user using the sequence
CREATE TABLE otd_user (
    uid bigint DEFAULT nextval('user_id_seq') PRIMARY KEY,
	company_domain TEXT,
    username VARCHAR(256) NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    salt VARCHAR(256) NOT NULL,
    created_at TIMESTAMP,
	is_banned BOOLEAN NOT NULL DEFAULT FALSE,
	CONSTRAINT fk_company_domain FOREIGN KEY (company_domain) REFERENCES otd_domain_owner(company_domain),
	CONSTRAINT unique_company_domain_username UNIQUE (company_domain, username)
);

-- Set the sequence owner of user_id_seq to otd_user.uid
ALTER SEQUENCE user_id_seq OWNED BY otd_user.uid;


--INSERT INTO otd_user (company_domain, username, password_hash) VALUES ('example.com.otd', 'User1', 'password')