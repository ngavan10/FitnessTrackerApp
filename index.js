const express = require('express');
const path = require('path');
const router = require('./router/fitnessRouter');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const app = express();
const public = path.join(__dirname, 'public');
var moment = require('moment'); 
moment().format(); 

app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use(express.static(public));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', router);



app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})