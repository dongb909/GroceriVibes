const express = require('express');
const path = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const psql = require('../database/db_connection.js');


const PORT = 3000;
const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(compression());
app.use(cookieParser());


app.listen(PORT, () => {console.log('Express is Listening on PORT', PORT)});
app.use('/', express.static(path.resolve(__dirname, '../client', 'dist')));

app.get('/all-items', (req, res) => {
  psql.getAllItems((err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/cartItems', (req, res) => {
  psql.getCartItems((err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(data);
    }
  }, req.cookies.userid);
});

app.post('/addUser', (req, res) => {
  psql.addUser((err, id) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200)
        .cookie('userid', id)
        .send({ id });
    }
  }, req.body.username);
});

app.post('/addItem', (req, res) => {
  const input = { ...req.body, ...req.cookies };
  // const input = Object.assign({}, req.body, req.cookies);
  psql.addItem((err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200)
        .send(data);
    }
  }, input);
});
