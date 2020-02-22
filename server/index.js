const express = require('express');
const path = require('path');
var cors = require('cors')

const psql= require ("../database/db_connection.js");


const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json())


app.listen(PORT, () => { 
  console.log('Express is Listening on hi:', PORT)
}
);