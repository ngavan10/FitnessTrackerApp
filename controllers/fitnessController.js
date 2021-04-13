const usersDAO = require('../models/users');
// const workoutsDAO = require('../models/workouts');
 const plansDAO = require('../models/plans');
 var moment = require('moment'); 

const userDb = new usersDAO();
// const workoutDb = new workoutsDAO();
 const plansDb = new plansDAO();

userDb.init();
// workoutDb.init();
 plansDb.init();

exports.landing_page = function(req, res) {
    res.render('home', {
        'title': 'Fitness+',
        'pageTitle': 'Home'
        });
    } 

exports.dashboard = function(req, res) {
    res.render('dashboard', {
        'title': 'Fitness+',
        'pageTitle': 'Dashboard'
        });
    } 

exports.create_a_plan = function(req, res) {
    res.render('create-a-plan', {
        'title': 'Fitness+',
        'pageTitle': 'Create A plan'
        });
    } 

    exports.create_new_plan = function(req, res) {
        if(!req.body.title) {
            res.status(400).send("Workout must have a title");
            return;
        }

        let d = req.body.date;
    
        var newDate = [];
        var startDate = d;

        var endDate = moment(startDate).add(6, 'days').format('YYYY-MM-DD')
        var dateMove = new Date(startDate);
        var strDate = startDate;

        while (strDate < endDate){
        var strDate = dateMove.toISOString().slice(0,10);
        newDate.push({date: strDate});
        dateMove.setDate(dateMove.getDate()+1);
        };
    
         plansDb.addPlan(
             req.body.title, 
            newDate, 
            req.body.user);
        res.redirect('/plans');
    }

    exports.show_plans = function (req, res) {
        plansDb.getAllPlans().then((plans) => {
                var newResult = [];
                var result = plans.filter(res => {
                    for(var i=0; i < res.goals.length; i++) {
                        if(res.goals[i].status == 'incomplete') {
                            newResult.push(res.goals[i])
                        }
                    }}
                )
                console.log(newResult)
                var result = plans.filter(res => {
                for (var i = 0; i < res.goals.length; i++) {
                    res.goals[i].index = i;
                  }
                })

                res.render('plans', {
                'title': 'Fitness+',
                'pageTitle': 'Plans',
                'plans': plans,
                'incompleteGoals': newResult
                });
           
        })
    }

    exports.user_profile = function (req, res) {
        userDb.getUserDetails().then((user) => {
            res.render('user-profile', {
                'title': 'Fitness+',
                'pageTitle': 'User-Profile',
                'user': user
            })
        })
    }
exports.login = function (req, res) {
    userDb.login(req.body.username, req.body.password);
    res.redirect('/dashboard');
}

exports.delete_plan = function(req, res) {
    plansDb.deletePlan(req.body.deletePlan);
    res.redirect('/plans')
};

exports.delete_goal = function(req, res) {
    plansDb.deleteGoal(req.body.plan, req.body.deleteGoal);
    res.redirect('/plans')
}

exports.add_goal = function(req, res) {
    plansDb.addGoalToPlan(req.body.goalNumber, req.body.exercise, req.body.duration, req.body.difficulty, req.body.addToPlan );
    res.redirect('/plans')
}

exports.update_goal = function(req, res) {
    plansDb.updateGoal(req.body.plan, req.body.updateGoal, req.body.key);
    res.redirect('/plans')
}
