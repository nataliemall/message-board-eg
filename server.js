const sqlite3 = require('sqlite3').verbose();

const DB_PATH = './database/sqlite3';


const PORT = process.env.PORT || 5000;  // added to try to get a local port
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


// //added on July 13 to try to adjust database from server.js
// pool.connect();

// pool.query('SELECT pubic,test_table FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   pool.end();
// });


const express = require('express');
const db = new sqlite3.Database(DB_PATH, startApp) // connects to new sqlite database?

async function startApp() {
    const app = express();
    app.use(express.json()) // for parsing application/json

    // let router = require('express').Router();
    // let bodyParser = require('body-parser');
    // router.use(bodyParser.json());


    // const PORT = process.env.PORT || 4002;

    app.use(express.static('public'));

    app.get('/api/hello/', (req, res, send) => {
        res.send('hello')
        })

    // app.get('/api/messages/', (req, res, send) => {
    //     // console.log('messages')
    //     console.log('from Fetch')

    //     res.send(["message1", "message2"])
    //     })
    // SELECT * FROM Table ORDER BY date(dateColumn) DESC Limit 1

    db.all('SELECT message FROM messages ORDER BY date DESC, time Limit 10;', (err, rows) => {
    
    // console.log(rows);
      })

    app.get('/api/messages', async (req, res) => {  //insert message to display here
      // await fakeNetworkDelay();

      // console.log(db)

      // try {
      //   const client = await pool.connect(); 
      //   const result = await client.query('SELECT * FROM test_table');
      //   const results = { 'results': (result) ? result.rows : null};
      //   res.send( results );
      //   client.release();
      // } catch (err) {
      //   console.error(err);
      //   res.send("Error " + err);
      // }

      // commented out because it's sqlite stuff: (july 14 2020)
      db.all('SELECT message FROM messages ORDER BY date DESC, time DESC Limit 10;', (err, rows) => {
      // db.all('SELECT date, time, message FROM messages;', (err, rows) => {

        console.log(rows)
        res.send(rows)

      });
    });


    app.put('/api/messages/', async (req, res) => {
    // await fakeNetworkDelay();
        console.log('Test PUT at messages')
        console.log(req.body.mykey)
        const date = getDate();
        const time = getTime();
        const message = req.body.mykey; //"${message}"
        // Don't do interpolation like this with user-provided data!
        const command = `
          INSERT INTO messages (date, time, message)
          VALUES ("${date}", "${time}", "${message}") 
            `;
        db.run(command, (err) => {
          res.send("done");
          if (err) {
            console.log(err)
          }
            });
          
        });

    app.get('/api/fakeobject', (req, res) => {
      const myObject = {
        key1: "value",
        key2: 3,
        key3: [{}]
      };
      const myNewObject = {
        newKey2: myObject.key2
      }
      // const myMessage = JSON.stringify(myObject);
      res.send(myNewObject);
    })


    app.get('/api/messages/random', async (req, res) => {
      console.log('Test Random get route');

      // db.all('COUNT * FROM messages')

      const command2 = 
      `SELECT message FROM messages;`;
      // 'SELECT COUNT (*) from messages';

      db.all(command2, (err, rows) => {
        // res.send("done");
        console.log('second command2');
        console.log('command 2 return', rows.length);

        var number_of_messages = rows.length; 
        var random_num = Math.floor(Math.random() * rows.length);
        console.log('random num', random_num)

        var random_message = rows[random_num].message
        // console.log(random_message.message)

        console.log('random message', random_message)

        var random_json = rows[random_num];
        console.log('random json', random_json);

        // var rows = random_json;
        console.log(typeof rows)
        console.log('random json type', typeof random_json);
        res.send(rows)



        // res.send(random_json);
        // res.send(rows)


        // console.log(rows.value)
        if (err) {
          console.log(err)
        }
          });
      

      // find number of messages 
      // get random number n from length
      // extract nth message
      // res.send(nth_message)
    })


    app.get('/db', async (req, res) => {     //creating the database if postgresQL
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.send( results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    } 
    })




    app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))

    }



function getDate() {
  const today = new Date();
  const year = (today.getFullYear())
    .toString();
  const month = (today.getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const day = (today.getDate())
    .toString()
    .padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTime() {
  const now = new Date();
  const hours = (now.getHours() + 1)
    .toString()
    .padStart(2, '0');
  const minutes = (now.getMinutes())
    .toString()
    .padStart(2, '0');
  return `${hours}:${minutes}`;
}







