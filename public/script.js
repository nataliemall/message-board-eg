console.log('Hello2')
// const express = require('express');
// const app = express();
const displayElement = document.getElementById('submitted_happy_thoughts');
const submit_button = document.getElementById('submit_button');

const randomThoughtElement = document.getElementById('random_thought');
const random_button = document.getElementById('random_button');

function refreshDisplay() {
  fetch('/api/messages')
    .then(result => result.json() // console.log(result) 
      )
    // .then(console.log(result))
    .then(data => displayMessage(data) //console.log(data)
      )
    .catch(error => console.log('Error'));
}

function displayMessage(message1) {   
  var recent_quotes = message1;
  // var justQuotes = message1[message];
  // console.log('quotes:', Object.entries(message1));
  console.log('recent quotes', recent_quotes)

  var i;
    for (i = 0; i < 11; i++) {
    // text += cars[i] + "<br>";
    displayElement.innerHTML += ( message1[i].message + '<br>' )
    // .map(record => JSON.stringify(record))
    // .join('<br>');
    }
}


function refreshRandom() {
  fetch('/api/messages/random')
    .then(result => result.json() //are "result" and "data" made up by you? 
      )
    .then(data => displayRandom(data)
      )
    .catch(error => console.log('Error on random refresh'));  //this error keeps happening
}


function displayRandom(message2) {

  console.log('thing to adjust', message2)

  var number_of_messages = message2.length; 
  var random_num = Math.floor(Math.random() * message2.length);
  console.log('num of messages:', number_of_messages)
  var random_message = message2[random_num].message
  console.log('random message', random_message)


  randomThoughtElement.innerHTML = random_message
    // .map(record => JSON.stringify(record))  //Pandu what is this about
    // .join('<br>');
  // <3
}

submit_button.addEventListener('click', () => {
    console.log('TEST2')
    console.log(document.getElementById('happy_thought').value)

    // const jsonstring2 = '{"mykey": "' + (document.getElementById('happy_thought').value) + '"}'; //this worked

    const objValue = document.getElementById('happy_thought').value;

    const mykey2 = { "mykey" : objValue};
    console.log(objValue)
    console.log(mykey2)

    const bobcatStr = JSON.stringify(mykey2);
    console.log(bobcatStr);
    // var jsonString = JSON.stringify(jsonConst)
    // console.log(jsonConst) // does "mykey" need quotes around it?
    // console.log(jsonString)

    // const jsonConst = '{"mykey": "bigcat2"}';
    // console.log(jsonstring2)
    // const jsonConst2 = JSON.stringify(jsonConst),

    fetch('/api/messages/', {
      method: 'PUT',
      // body: JSON.stringify(jsonConst),
      // body: '{"mykey": "bigcat2"}',
      body: bobcatStr,
      headers: {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json'
      // 'Content-Type': 'text/plain'

      // 'Content-Type': 'application/x-www-form-urlencoded',
      } 
      }).then(() => {
      // TODO something
      refreshDisplay();
      console.log('test FETCH');
      // refreshDisplay();
    });

    console.log('TEST');
})

random_button.addEventListener('click', () => {
  console.log('random_button was clicked');
  fetch('/api/messages/random', {
    method: 'GET'
  }).then(() => {
    refreshRandom();
    console.log('test random fetch')
  })
  } );




// const myMessage = 'hi'
// const body = {
//     message: myMessage
// };
// const bodyString = JSON.stringify(body)



