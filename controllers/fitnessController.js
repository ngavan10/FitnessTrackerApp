const usersDAO = require('../models/users');
const workoutsDAO = require('../models/workouts');

const userDb = new usersDAO();
const workoutDb = new workoutsDAO();

userDb.init();
workoutDb.init();

exports.landing_page = function(req, res) {
    res.render('home', {
        'title': 'Fitness+',
        'pageTitle': 'Home'
        });
    } 

exports.user_profile = function(req, res) {
    res.render('user-profile', {
        'title': 'Fitness+',
        'pageTitle': 'User Profile'
        });
    } 


exports.dashboard = function(req, res) {
    res.render('dashboard', {
        'title': 'Fitness+',
        'pageTitle': 'Dashboard'
        });
    } 


exports.workout = function(req, res) {
    workoutDb.getUserWorkouts().then((list) => {
        res.render('workouts', {
        'title': 'Fitness+',
        'pageTitle': 'Workouts',
        'workouts': list
        });
        console.log('promise resolved');
        }).catch((err) => {
        console.log('promise rejected', err);
        })} 

    exports.post_new_workout = function(req, res) {
        if(!req.body.title) {
            res.status(400).send("Workout must have a title");
            return;
        }
    
        workoutDb.addWorkout(
            req.body.title, 
            req.body.exerciseType, 
            req.body.duration, 
            req.body.caloriesBurned, 
            req.body.weight, 
            req.body.reps,
            req.body.user);
        res.redirect('/workouts');
    }
    
