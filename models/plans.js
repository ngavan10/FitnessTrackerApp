const nedb = require('nedb');

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
        plan: 'Week1Plan',
        weekDates: [{ date: '2021-03-15' },
        { date: '2021-03-16' },
        { date: '2021-03-17' },
        { date: '2021-03-18' },
        { date: '2021-03-19' },
        { date: '2021-03-20' },
        { date: '2021-03-21'}],
        goals: [{goalNumber: 1, exercise: 'Football', duration: '90 minutes', difficulty: 'Hard'}],
        user: 'Billy'
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
        console.log( goalNumber);

        this.db.update({ 'plan': 'Week1Plan'}, 
        { $pull: { goals: { goalNumber: goalNumber } } }, function(err, goals) {
            if (err) {
                console.log('Error deleting document', plan);
            } else {
                console.log('document deleted into database', goals);
            }
        })
    }

    addGoalToPlan(goalNumber, exercise, duration, difficulty, plan) {
        var goal = {
            goalNumber: goalNumber,
            exercise: exercise,
            duration: duration,
            difficulty: difficulty   
        }
        console.log('plan created, plan');

        this.db.update({plan: 'Week1Plan'}, {$push: {goals: goal}}, function(err, doc) {
            if (err) {
                console.log('Error inserting document', plan);
            } else {
                console.log('document inserted into database', doc);
            }
        })
    }
}


module.exports = Plans;