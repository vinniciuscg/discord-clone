const express = require("express");
const redis = require('./redis-client')
const app = express();
const bodyParser = require('body-parser');
const mysql = require("mysql2");
const cors = require("cors");
const PORT = 1433;

const db = mysql.createPool({
  host: "database-node",
  user: "root",
  password: "root",
  database: "messagesdb",
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/getFromRedis', async (req, res) => {
  let messages = await redis.getAsync('messages');
  if(!messages){
    
    const sqlSelect = "SELECT author, content, date, mention, bot FROM messages";

    db.query(sqlSelect, (err, result) => {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      redis.setAsync('messages', JSON.stringify(result));
      console.log("Getting from Database")

      return res.json(result)
    });
    
    //console.log(messages);
  }else{
    console.log('Getting from Redis');
    return res.json(JSON.parse(messages))
  }
  
})

app.get('/api/getFromDB', async (req, res) => {
  const sqlSelect = "SELECT author, content, date, mention, bot FROM messages";

  db.query(sqlSelect, (err, result) => {
    // if any error while executing above query, throw error
    if (err) throw err;
    
    // if there is no error, you have the result
    redis.setAsync('messages', JSON.stringify(result));

    console.log('Getting from Database');
    return res.json(result)
  });  
})

app.post('/api/toRedis', async (req, res) => {
  const {messagesArray} = req.body

  //let previous = await redis.getAsync('messages')
  //if(previous){
  //  previous = Array.from(JSON.parse(previous)).concat(unsentMessages)
  //}else{
  //  previous = unsentMessages
  //}
  redis.setAsync('messages', JSON.stringify(messagesArray));
})

app.post('/api/toDB/byArray', async (req, res) => {
  const {unsentMessages} = req.body
  console.log(unsentMessages);

  const sqlInsert = "INSERT INTO messages (author, content, date, mention, bot) VALUES ?"

  var values = []

  values = unsentMessages.map(function(entry) {
    return Object.keys(entry).map(function(field) {
        return entry[field]
    })
  });

  console.log(values);

  //redis.setAsync('messages', JSON.stringify(unsentMessages));

  db.query(sqlInsert, [values], (err, result) => {
    console.log(`${result.affectedRows} messages sent to DB`)
  })

})

app.post('/api/toDB/single', (req, res) => {

  const {author, content, date, mention, bot} = req.body

  const sqlInsert = "INSERT INTO messages (author, content, date, mention, bot) VALUES (?, ?, ?, ?, ?);";
  db.query(sqlInsert, [author, content, date, mention, bot], (err, result) => {
    console.log(err)
  })
})

app.listen(PORT, () => {
  console.log('running on port ' + PORT);
})