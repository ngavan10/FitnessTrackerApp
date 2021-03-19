const nedb = require('nedb');

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
        firstname: 'Billy',
        surname: 'McMann',
        email: 'b_mcManns@hotmail.com',
        password: 'bdavies1',
        gender: 'Male',
        age: '28',
        weight: '75 KG',
        height: '170cm',
        goal: 'Muscle Gain',
        city: 'Toronto'
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

    getUserDetails() {
        return new Promise((resolve, reject) => {
        this.db.find({ firstname: 'Billy',  }, function(err, user) {
        if (err) {
        reject(err);
        } else {
        resolve(user);
        console.log('user Details', user);
        }
        })
        })
        }
    
    login(name, pass) {
        return new Promise((resolve, reject) => {
            this.db.find({ firstname: name, password: pass }, function(err, user) {
            if (err) {
            reject(err);
            } else {
            if(user.firstname != name) {
                console.log("Username Error");
                return;
            }
            else {
                resolve(user);
            }
            
            console.log('Logged in ', user);
            }
            })
            })
            }
    }




module.exports = Users;