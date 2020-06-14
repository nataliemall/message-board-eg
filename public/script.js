console.log('Hello2')
// const express = require('express');
// const app = express();


const submit_button = document.getElementById('submit_button');


submit_button.addEventListener('click', () => {
    console.log('TEST2')
    console.log(document.getElementById('happy_thought').value)

    const jsonConst = '{"mykey":' + (document.getElementById('happy_thought').value) + '}';
    console.log(jsonConst) // does "mykey" need quotes around it?

    var jsonString = JSON.stringify(jsonConst)
    console.log(jsonString)

    fetch('/api/messages/', {method: 'PUT',  headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }, body: jsonString}).then(() => {
      // TODO something

      console.log('test FETCH')
      // refreshDisplay();
    });

    console.log('TEST')
})




// const myMessage = 'hi'
// const body = {
//     message: myMessage
// };
// const bodyString = JSON.stringify(body)



