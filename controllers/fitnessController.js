const usersDAO = require('../models/users');
// const workoutsDAO = require('../models/workouts');
 const plansDAO = require('../models/plans');
 var moment = require('moment'); 
 var alert = require('alert'); 

//const userDb = new usersDAO();
// const workoutDb = new workoutsDAO();
 const plansDb = new plansDAO();

//userDb.init();
// workoutDb.init();
 plansDb.init();

exports.landing_page = function(req, res) {
   if(req.isAuthenticated() == false) {
    res.render('home', {
        'title': 'Fitness+',
        'pageTitle': 'Home'
        });
   } else {
    res.render('home', {
        'title': 'Fitness+',
        'user': req.user.username,
        'pageTitle': 'Home'
        });
   }
        
    
    
    } 

exports.show_register_page = function(req, res) {
    res.render("user/register", {
        'title': 'Fitness+',
    });
    } 

exports.post_new_user = function(req, res) {
    const firstname = req.body.firstname;
    const surname = req.body.surname;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const city = req.body.city;
    const gender = req.body.gender;
    const age = req.body.age;
    const weight = req.body.weight;
    const height = req.body.height;
    const objective = req.body.objective;

    //console.log("register user", user, "password",  password);
    if (!username || !password) {
        res.send(401, '<h1>no user or no password</h1>');
return; }
usersDAO.lookup(username, function(err, u) {
        if (u) {
            res.send(401, `<h1>User exists: ${username}</h1>`);
return; }
usersDAO.create(firstname, surname, username, password, email, city, gender, age, weight, height, objective);
        res.redirect('/login');
    });
}

exports.show_login_page = function(req, res) {
    res.render("user/login", {
        'title': 'Fitness+',
    });
    };

exports.post_login = function(req, res) {
    res.redirect("/dashboard");
    }; 

exports.logout = function(req, res) {
    req.logout();
    res.redirect("/");
    }; 

exports.dashboard = function(req, res) {
    plansDb.getPlansForUser(req.user.username).then((plans) => {
        res.render('dashboard', {
            'title': 'Fitness+',
            'pageTitle': 'Dashboard',
            'plans': plans
            });
    })
    } 

exports.create_a_plan = function(req, res) {
    res.render('create-a-plan', {
        'title': 'Fitness+',
        'pageTitle': 'Create A plan',
        'user': req.user.username
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
        
        var day = moment(startDate).format('dddd');
        if(day != 'Monday') {
            alert("Start Date Must be a Monday")
            
        } else {

        
        var endDate = moment(startDate).add(6, 'days').format('YYYY-MM-DD')
        var dateMove = new Date(startDate);
        var strDate = startDate;

        while (strDate < endDate){
        var strDate = dateMove.toISOString().slice(0,10);
        newDate.push({date: strDate});
        dateMove.setDate(dateMove.getDate()+1);
        };
        var letterNumber = /^[0-9a-zA-Z ]+$/;
        var t = req.body.title
        
        if(t.match(letterNumber)){
            plansDb.addPlan(
                req.body.title, 
                newDate, 
                req.user.username);
            res.redirect('/plans');
        }
        else {
            alert("Invalid Plan Name")
            
        }
    }
    
         
    }

    exports.show_plans = function (req, res) {
        plansDb.getPlansForUser(req.user.username).then((plans) => {
                var newResult = [];
                var result = plans.filter(res => {
                    console.log(res)
                        for(var i=0; i < res.goals.length; i++) {
                            if(res.goals[i].status == 'incomplete') {
                                newResult.push({name: res.plan, goal: res.goals[i]})
                                
                            }
                        }
                    }
                )
                
                var result = plans.filter(res => {
                
                        for (var i = 0; i < res.goals.length; i++) {
                            res.goals[i].index = i;
                          }
                        }
                    
                )

                res.render('plans', {
                'title': 'Fitness+',
                'pageTitle': 'Plans',
                'plans': plans,
                'incompleteGoals': newResult
                });
           
        })
    }

    exports.user_profile = function (req, res) {
        let user = req.user.username;
        usersDAO.getUserDetails(user).then((details) => {
            res.render('user-profile', {
                'title': 'Fitness+',
                'pageTitle': 'User Profile',
                'user': req.user,
                'details': details
            })
        })
    }
exports.login = function (req, res) {
    usersDAO.login(req.body.username, req.body.password);
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
    alert(`Goal ${req.body.goalNumber} in ${req.body.addToPlan} has successfully been added!`)
    res.redirect('/plans')
}

exports.update_goal = function(req, res) {
    plansDb.updateGoal(req.body.plan, req.body.updateGoal, req.body.key);
    alert(`Goal Status in ${req.body.goalNumber} in ${req.body.addToPlan}  has been updated to completed!`)
    res.redirect('/plans')
}
