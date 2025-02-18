CREATE OR REPLACE FUNCTION insert_date_function()
RETURNS TRIGGER AS $$
BEGIN
    NEW.created_at := current_timestamp;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER insert_date_otd_domain_owner
BEFORE INSERT ON otd_domain_owner
FOR EACH ROW
EXECUTE FUNCTION insert_date_function();


CREATE OR REPLACE TRIGGER insert_date_otd_user
BEFORE INSERT ON otd_user
FOR EACH ROW
EXECUTE FUNCTION insert_date_function();

