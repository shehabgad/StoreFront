CREATE TABLE IF NOT EXISTS plants 
(
    name varchar(100),
    description text,
    individuals integer,
    sighting_date date,
    id SERIAL PRIMARY KEY
);