const express = require('express');
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser')
const psql= require ("../database/db_connection.js");
// const cors = require('cors');


const PORT = 3000;
const app = express();

// app.use(cors());
app.use(express.json())
app.use(compression());
app.use(cookieParser());


app.listen(PORT, () => {console.log('Express is Listening on PORT', PORT)});
app.use('/', express.static(path.resolve(__dirname, '../client', 'dist')))

app.get("/all-items", (req,res) => {
  psql.getAllItems((err, data) => {
    if (err) {
      res.status(400).send(err);
      console.log('ERROR from SERVER getAllItems', err)
    } else {
      // console.log('SERVER response SUCESSFUL')
      res.status(200).send(data)
    }
  })
})

app.get("/cartItems", (req,res) => {
  psql.getCartItems((err, data) => {
    if (err) {
      res.status(400).send(err);
      console.log('ERROR from SERVER getCartItems', err)
    } else {
      // console.log('SERVER response SUCESSFUL')
      res.status(200).send(data)
    }
  }, req.cookies.userid)
})

app.post("/addUser", (req, res) => {
  psql.addUser((err,id) => {
    if(err) {
      res.status(400).send(err);
      console.log('ERROR from SERVER addUser', err)
    } else {
      //  console.log('SERVER response SUCESSFUL', id)

      res.status(200)
        .cookie("userid", id)
        .send({id})
    }
  }, req.body.username)
})

app.post("/addItem", (req,res) => {
  // const input= {...req.body, ...req.cookies}
  const input = Object.assign({}, req.body, req.cookies)
  console.log("req body from addItem", input)
  psql.addItem((err, data) =>{
    if(err) {
        res.status(400).send(err)
        console.log('ERROR from SERVER addItem')
      } else {
        res.status(200)
          .send(data)
      }
    }, input
  )
})
    


  
