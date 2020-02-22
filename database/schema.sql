DROP DATABASE IF EXISTS grocerivibes;

CREATE DATABASE grocerivibes;
-- createdb gallery
--dropdb gallery
\connect grocerivibes;

CREATE TABLE groceries(
    movie_id  SERIAL         NOT NULL    PRIMARY KEY,
    title     VARCHAR(100)   NOT NULL,
    genre     VARCHAR(100)   NOT NULL,
    watchStatus BOOLEAN
);

