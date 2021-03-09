const nedb = require('nedb');

class Workouts {

    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({filename: dbFilePath, autoload: true});
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    }

    init() {
        this.db.insert({
        title: '5 Km Run',
        exerciseType: 'Cardio',
        duration: '35 min',
        caloriesBurned: '350 cals',
        weight: '',
        reps: '',
        date: '2020-02-18',
        user: 'Billy'
        });
        //for later debugging
        console.log('db entry billy run inserted');
        this.db.insert({
        title: 'Yoga',
        exerciseType: 'Cardio',
        duration: '60 min',
        caloriesBurned: '600 cals',
        weight: '',
        reps: '',
        date: '2020-02-18',
        user: 'Billy'
        });
        //for later debugging
        console.log('db entry Billy yoga inserted');
    }

    //a function to return all entries from the database
getAllWorkouts() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
    //use the find() function of the database to get the data,
    //error first callback function, err for error, entries for data
    this.db.find({}, function(err, workouts) {
    //if error occurs reject Promise
    if (err) {
    reject(err);
    //if no error resolve the promise & return the data
    } else {
    resolve(workouts);
    //to see what the returned data looks like
    console.log('function all() returns: ', workouts);
    }
    })
    })
    } 

    getUserWorkouts() {
        return new Promise((resolve, reject) => {
            this.db.find({user: 'Billy'}, function(err, workouts) {
                if(err) {
                    reject(err)
                } else {
                    resolve(workouts);
                    console.log('getUserWorkouts() return: ' , workouts);
                }
            }) 
        })
    }

    addWorkout(title, exerciseType, duration, caloriesBurned, weight, reps, user) {
        var workout = {
            title: title,
            exerciseType: exerciseType,
            duration: duration,
            caloriesBurned: caloriesBurned,
            weight: weight,
            reps: reps,
            date: new Date().toISOString().split('T')[0],
            user: user
        }
        console.log('workout created, workout');

        this.db.insert(workout, function(err, doc) {
            if (err) {
                console.log('Error inserting document', title);
            } else {
                console.log('document inserted into database', doc);
            }
        })
    }

    // getEntriesByUser(authorName) {
    //     return new Promise((resolve, reject) => {
    //     this.db.find({ 'author': authorName }, function(err, entries) {
    //     if (err) {
    //     reject(err);
    //     } else {
    //     resolve(entries);
    //     console.log('getEntriesByUser returns: ', entries);
    //     }
    //     })
    //     })
    //     }
}

module.exports = Workouts;