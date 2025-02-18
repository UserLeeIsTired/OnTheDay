-- Install extension first
CREATE EXTENSION IF NOT EXISTS pgcrypto; 

-- Create the trigger to set the salt and password_hash columns on insert
CREATE OR REPLACE FUNCTION insert_password_trigger() RETURNS TRIGGER AS $$
BEGIN
    -- Generate a random key for the salt column
    NEW.salt = encode(digest(random()::text, 'sha256'), 'hex');

    -- Concatenate the password with the salt and hash the combined value
    NEW.password_hash = encode(digest(NEW.password_hash || NEW.salt, 'sha256'), 'hex');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



-- Create the trigger on the otd_domain_owner table
CREATE OR REPLACE TRIGGER insert_password_otd_domain_owner
BEFORE INSERT ON otd_domain_owner
FOR EACH ROW
EXECUTE FUNCTION insert_password_trigger();


-- Create the trigger on the otd_user table
CREATE OR REPLACE TRIGGER insert_password_otd_user
BEFORE INSERT ON otd_user
FOR EACH ROW
EXECUTE FUNCTION insert_password_trigger();

