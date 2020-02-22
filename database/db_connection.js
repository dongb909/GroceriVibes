var pg = require("pg");

var client = new pg.Client({
  host: 'localhost', 
  user:'dbacai99',
  database: 'movielist',
  password:'' 
}); 
client.connect((err)=>{
  if (err) {
    console.log('error connecting from DATABASE db_connection.js: ', err);
    return;
  }
  console.log ("============connected to POSTGRESQL DATABASE================");
});



/*$ brew services restart postgresql
psql postgres     without postgres then it's just bacai
quit

$ sudo su - postgres
$ psql
psql postgres < ./databases/postgresql/schema.sql
\l : list databases
\c __ : connect to a database
\dt show db tables
\d (__): describe table(s)
load schema psql -f schema.sql
psql < ./database/schema.sql

 */