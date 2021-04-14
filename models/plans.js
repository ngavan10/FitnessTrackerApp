const nedb = require('nedb');

const dbFilePath = 'plans.db'

class Plans {
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
        plan: 'Week 1 Plan',
        weekDates: [{ date: '2021-03-15' },
        { date: '2021-03-16' },
        { date: '2021-03-17' },
        { date: '2021-03-18' },
        { date: '2021-03-19' },
        { date: '2021-03-20' },
        { date: '2021-03-21'}],
        goals: [{goalNumber: '1', exercise: 'Football', duration: '90 minutes', difficulty: 'Hard', status: 'incomplete'}],
        user: 'ngavan'
        });
        this.db.insert({
            plan: 'Week 2 Plan',
            weekDates: [{ date: '2021-03-15' },
            { date: '2021-03-16' },
            { date: '2021-03-17' },
            { date: '2021-03-18' },
            { date: '2021-03-19' },
            { date: '2021-03-20' },
            { date: '2021-03-21'}],
            goals: [{ goalNumber: '1', exercise: 'Football', duration: '90 minutes', difficulty: 'Hard', status: 'incomplete'},
            { goalNumber: '2', exercise: 'Tennis', duration: '60 minutes', difficulty: 'Intense', status: 'incomplete'},
            {goalNumber: '3', exercise: 'Walk', duration: '30 minutes', difficulty: 'Easy', status: 'complete'}],
            user: 'ngavan'
            });
    }

    getAllPlans() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
        //use the find() function of the database to get the data,
        //error first callback function, err for error, entries for data
        this.db.find({}, function(err, plans) {
        //if error occurs reject Promise
        if (err) {
        reject(err);
        //if no error resolve the promise & return the data
        } else {
        resolve(plans);
        //to see what the returned data looks like
        console.log('function all() returns: ', plans);
        }
        })
        })
        } 

    getPlansForUser(username) {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
        //use the find() function of the database to get the data,
        //error first callback function, err for error, entries for data
        this.db.find({user: username}, function(err, plans) {
        //if error occurs reject Promise
        if (err) {
        reject(err);
        //if no error resolve the promise & return the data
        } else {
        resolve(plans);
        //to see what the returned data looks like
        console.log('function plans for user returns: ', plans);
        }
        })
        })
        } 

    addPlan(plan, weekDates, user) {
        var plan = {
            plan: plan,
            weekDates: weekDates,
            user: user
        }
        console.log('plan created, plan');

        this.db.insert(plan, function(err, doc) {
            if (err) {
                console.log('Error inserting document', plan);
            } else {
                console.log('document inserted into database', doc);
            }
        })
    }

    deletePlan(plan) {
        var plan = {
            plan: plan,
        }
        console.log('plan deleted, plan');

        this.db.remove(plan, function(err, doc) {
            if (err) {
                console.log('Error deleting document', plan);
            } else {
                console.log('document deleted into database', doc);
            }
        })
    }


    deleteGoal(plan, goalNumber) {
        console.log('goal deleted, plan, goalNumber');
        this.db.update({plan: plan}, 
        { $pull: { goals: { goalNumber: goalNumber } } }, function(err, goals) {
            if (err) {
                console.log('Error deleting document', plan);
            } else {
                console.log('document deleted from database', goals);
            }
        })
    }

    addGoalToPlan(goalNumber, exercise, duration, difficulty, plan) {
        var goal = {
            goalNumber: goalNumber,
            exercise: exercise,
            duration: duration,
            difficulty: difficulty,
            status: 'incomplete'   
        }
        
        console.log('plan created, plan');

        this.db.update({plan: plan}, {$push: {goals: goal}}, function(err, doc) {
            if (err) {
                console.log('Error inserting document', plan);
            } else {
                console.log('document inserted into database', doc);
            }
        })
    }

    updateGoal(plan, goal, key) {
        console.log(plan)
        console.log(key)
        this.db.update({ plan: plan, 'goals.goalNumber': goal }, { $set: { [`goals.${key}.status`]: 'complete' } }, {}, function(err, numUp) {
            if (err) {
                console.log('error updating documents', err);
            }
            else {
                console.log(numUp, 'documents updated');
            }
        })
    }

}


module.exports = Plans;