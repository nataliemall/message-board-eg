const sqlite3 = require('sqlite3').verbose();

const DB_PATH = './database/sqlite3';


const express = require('express');
const db = new sqlite3.Database(DB_PATH, startApp) // connects to new sqlite database?

async function startApp() {
    const app = express();
    app.use(express.json()) // for parsing application/json

    const PORT = process.env.PORT || 4002;

    app.use(express.static('public'));

    app.get('/api/hello/', (req, res, send) => {
        res.send('hello')
        })

    // app.get('/api/messages/', (req, res, send) => {
    //     // console.log('messages')
    //     console.log('from Fetch')

    //     res.send(["message1", "message2"])
    //     })

    app.get('/api/messages', async (req, res) => {
      // await fakeNetworkDelay();
      db.all('SELECT date, time FROM messages;', (err, rows) => {
        res.send(rows)
        // res.send('test1');
        // TODO error handling
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





