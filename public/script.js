console.log('Hello2')
// const express = require('express');
// const app = express();
const displayElement = document.getElementById('submitted_happy_thoughts');



const submit_button = document.getElementById('submit_button');

function refreshDisplay() {
  fetch('/api/messages')
    .then(result => result.json() // console.log(result) 
      )
    .then(data => displayMessage(data) //console.log(data)
      
      )
    .catch(error => console.log('Error'));
}

function displayMessage(message1) {
  displayElement.innerHTML = message1
    .map(record => JSON.stringify(record))
    .join('<br>');
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





// const myMessage = 'hi'
// const body = {
//     message: myMessage
// };
// const bodyString = JSON.stringify(body)



