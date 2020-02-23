DROP DATABASE IF EXISTS grocerivibes;

CREATE DATABASE grocerivibes;
-- createdb gallery
--dropdb gallery
\connect grocerivibes;

CREATE TABLE inventory(
    id   SERIAL         NOT NULL    PRIMARY KEY,
    item     VARCHAR(100)   NOT NULL,
    category VARCHAR(100)   NOT NULL,
    quantity INT,
    price    NUMERIC(5,2)
);

CREATE TABLE users(
    id  SERIAL        NOT NULL    PRIMARY KEY,
    username   VARCHAR         NOT NULL
);

CREATE TABLE carts (
    id  SERIAL      NOT NULL        PRIMARY KEY,
    userid  INT     REFERENCES users(id),
    itemid  INT     REFERENCES inventory(id),
    quantity INT     
);

COPY inventory(item, category, quantity, price) FROM '/Users/dbacai99/Interview/GroceriVibes/database/initial_data.csv' DELIMITER ',' HEADER CSV