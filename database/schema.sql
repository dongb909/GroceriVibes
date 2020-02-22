DROP DATABASE IF EXISTS movielist;

CREATE DATABASE movielist;
-- createdb gallery
--dropdb gallery
\connect movielist;

CREATE TABLE movies(
    movie_id  SERIAL         NOT NULL    PRIMARY KEY,
    title     VARCHAR(100)   NOT NULL,
    genre     VARCHAR(100)   NOT NULL,
    watchStatus BOOLEAN
);

