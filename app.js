
const express = require('express');

const app = express();

app.use(express.static('public'));

app.listen(3000, ()=> {
    console.log('request starting...');
})

console.log("server running at 'localhost:3000'");