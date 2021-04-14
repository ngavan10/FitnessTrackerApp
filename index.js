const express = require('express');
const session = require('express-session');
const path = require('path');
const router = require('./router/fitnessRouter');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const auth = require('./auth/auth');
const passport = require('passport');
const app = express();
const public = path.join(__dirname, 'public');
var moment = require('moment'); 
moment().format(); 

app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use(express.static(public));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ secret: 'dont tell anyone', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
// initialize authentication with passport
auth.init(app);
app.use('/', router);



app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})