var pg = require("pg");

var client = new pg.Client({
  host: 'localhost', 
  user:'dbacai99',
  database: 'grocerivibes',
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
\l : list databases
\c __ : connect to a database
\dt show db tables
\d (__): describe table(s)
 */