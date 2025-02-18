DROP TABLE IF EXISTS otd_domain_owner CASCADE;

CREATE TABLE otd_domain_owner (
    company_domain TEXT CHECK (company_domain ~ '^[a-zA-Z]{1,9}\.[a-zA-Z]{1,9}\.[a-zA-Z]{1,9}$') PRIMARY KEY,
    owner_username VARCHAR(256) NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    salt VARCHAR(256) NOT NULL,
    created_at TIMESTAMP
);


-- INSERT INTO otd_domain_owner (company_domain, owner_username, password_hash) VALUES ('example.com.otd', 'Example', 'password')

-- SELECT company_domain, owner_username, created_at FROM otd_domain_owner
-- WHERE company_domain='example.com.otd' AND owner_username='Example' AND password_hash=encode(digest('password' || salt, 'sha256'), 'hex');