/* Replace with your SQL commands */
CREATE TABLE users (
  name varchar(100),
  id SERIAL PRIMARY KEY,
  password_digest varchar(255)
)