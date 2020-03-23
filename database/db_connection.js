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
  console.log ("=====connected to POSTGRES DATABASE=====");
});

const getAllItems = cb => {
  client.query((`SELECT * from inventory ORDER BY id;`), (err,res) => {
    if (err) {
      console.log ('ERROR from getAllItems DB', err.stack)
      cb(err.stack, null)
    } else {
      cb(null,res.rows)
      // console.log('DB RESPONSE success from getAllItems')
    }
  })
}

const getCartItems = (cb, userid) => {
  console.log(`userid `, userid)
  console.log(userid)
  client.query((`SELECT carts.quantity, inventory.item, inventory.price 
    FROM carts INNER JOIN inventory ON inventory.id = carts.itemid WHERE userid=${userid};`),
     (err,res) => {
    if (err) {
      console.log ('ERROR from getCartItems DB', err.stack)
      cb(err.stack, null)
    } else {
      cb(null,res.rows)
      // console.log('DB RESPONSE success from getAllItems')
    }
  })
}

const addUser = (cb, username) => {
  console.log(`username `, username)
  client.query(`INSERT INTO users(username) VALUES ('${username}'); SELECT * from users where username='${username}';`, (err,res)=> {
    if (err) {
      console.log('ERROR from addUser DB', err.stack);
      cb(err.stack, null)
    } else {
      console.log('res form db', res)
      // console.log('DB RESPONSE success from addUsers')
      cb(null, res[1].rows[0].id)
    }
  })
}

const addItem = (cb, {itemid, userid, qty}) => {
  client.query(`SELECT quantity from inventory where id=('${itemid}');`, (err, res)=>{
    if (err) {
      console.log('DB ERROR checking qty', err)
    } else {
      // console.log(`res `, res.rows[0].quantity, qty)
      const qtyCheck = res.rows[0].quantity >=qty ? res.rows[0].quantity - qty : -1
      if(qtyCheck > 0) {
        client.query(`UPDATE inventory set quantity=${qtyCheck} where id=${itemid}; 
          INSERT INTO carts(userid, itemid, quantity) VALUES('${userid}', '${itemid}', '${qty}'); 
            SELECT * from inventory ORDER BY id`, 
            (err, res) => {
              if (err) {
                console.log('DB ERROR addToCart', err)
              } else {
                console.log('3 query response', res[2].rows)
                cb(null, res[2].rows)
              }
            }
          )
        } 
      }
    }
  )
}

module.exports = {getAllItems, addUser, addItem, getCartItems}

/*$ brew services restart postgresql
psql postgres     without postgres then it's just bacai
\l : list databases
\c __ : connect to a database
\dt show db tables
\d (__): describe table(s)
 */