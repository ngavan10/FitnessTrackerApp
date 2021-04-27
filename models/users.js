const nedb = require('nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class Users {

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
        firstname: 'nathan',
        surname: 'gavan',
        username: 'ngavan',
        password: '$2b$10$sX7OvjSfWWC/B/sSBhYnwuqSIUGTU9M.Xas0mhFwZDQv37PpvSema',
        email: 'nathan@live.co.uk',
        city: 'Glasgow',
        gender: 'Male',
        age: '27',
        weight: '80 KG',
        height: '180cm',
        objective: 'Muscle Gain',
        sharedPlans: [{
            plan: 'Week 1 Plan',
            weekDates: [{ date: '2021-03-15' },
            { date: '2021-03-16' },
            { date: '2021-03-17' },
            { date: '2021-03-18' },
            { date: '2021-03-19' },
            { date: '2021-03-20' },
            { date: '2021-03-21'}],
            goals: [{goalNumber: '1', exercise: 'Football', duration: '90 minutes', difficulty: 'Hard', status: 'incomplete'}],
            user: 'hfairbain'
            }]
        });

        this.db.insert({
            firstname: 'harry',
            surname: 'fairbain',
            username: 'hfairbain',
            password: '$2b$10$SNOdiw3X7wSbsKOz8FdxFuv7aEOs9WIChy7nvjyq6osBiw3mY81n6',
            email: 'fairbain@live.co.uk',
            city: 'Glasgow',
            gender: 'Male',
            age: '30',
            weight: '900 KG',
            height: '170cm',
            objective: 'Muscle Gain',
            sharedPlans: []
            });
    }

    //a function to return all entries from the database
getAllUsers() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
    //use the find() function of the database to get the data,
    //error first callback function, err for error, entries for data
    this.db.find({}, function(err, users) {
    //if error occurs reject Promise
    if (err) {
    reject(err);
    //if no error resolve the promise & return the data
    } else {
    resolve(users);
    //to see what the returned data looks like
    console.log('function all() returns: ', users);
    }
    })
    })
    } 

    getUserDetails(username) {
        console.log(username)
        return new Promise((resolve, reject) => {
        this.db.find({ username: username}, function(err, user) {
        if (err) {
        reject(err);
        } else {
        resolve(user);
        console.log('user Details', user);
        }
        })
        })
        }

    lookup(user, cb) {
        this.db.find({'username': user}, function (err, entries) {
        if (err) {
        return cb(null, null);
        } else {
        if (entries.length == 0) {
        return cb(null, null);
        }
        return cb(null, entries[0]);
        }
        });
        }

    create(firstname, surname, username, password, email, city, gender, age, weight, height, objective) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function(hash) {
        var entry = {
        firstname: firstname,
        surname: surname,
        username: username,
        password: hash,
        email: email,
        city: city,
        gender: gender,
        age: age,
        weight: weight,
        height: height,
        objective: objective,
        };
        //console.log('user entry is: ', entry);
        
        that.db.insert(entry, function (err) {
        if (err) {
        console.log("Can't insert user: ", username);
        }
        else {
            console.log(entry)
        }
        });
        });
        }
    
    login(name, pass) {
        return new Promise((resolve, reject) => {
            this.db.find({ firstname: name, password: pass }, function(err, user) {
            if (err) {
            reject(err);
            } else {
            if(user.firstname == name && user.password == pass) {
                resolve(user);
            }
            else {
                console.log('USername')
            }
            
            console.log('Logged in ', user);
            }
            })
            })
    }

    sharePlanWithUser(username, plan) {
        console.log(plan)
       
        this.db.update({username: username}, {$push: {sharedPlans: plan}}, function(err, doc) {
            if (err) {
                console.log('Error inserting document', plan);
            } else {
                console.log('document inserted into database', doc);
            }
        })
    }

    }



    const dao = new Users();
    dao.init();
    module.exports = dao;
    //module.exports = Users;