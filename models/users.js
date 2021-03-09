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
        email: 'b_davies@hotmail.com',
        password: 'bdavies1',
        gender: 'Male',
        age: '28',
        weight: '75 KG',
        height: '170cm',
        goal: 'Muscle Gain',
        city: 'Toronto'
        });
        //for later debugging
        console.log('db entry billy inserted');
        this.db.insert({
            firstname: 'Sarah',
            surname: 'Henry',
            email: 's_henry@hotmail.com',
            password: 'sHenry1',
            gender: 'Female',
            age: '24',
            weight: '56 KG',
            height: '150cm',
            goal: 'Tone Up',
            city: 'Ottawa'
        });
        //for later debugging
        console.log('db entry Sarah inserted');
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
    console.log('function all() returns: ', entries);
    }
    })
    })
    } 

    // getPetersEntries() {
    //     return new Promise((resolve, reject) => {
    //         this.db.find({author: 'Peter'}, function(err, entries) {
    //             if(err) {
    //                 reject(err)
    //             } else {
    //                 resolve(entries);
    //                 console.log('getPetersEntries() return: ' , entries);
    //             }
    //         }) 
    //     })
    // }

    // addEntry(author, subject, contents) {
    //     var entry = {
    //         author: author,
    //         subject: subject,
    //         contents: contents,
    //         published: new Date().toISOString().split('T')[0]
    //     }
    //     console.log('entry creates, entry');

    //     this.db.insert(entry, function(err, doc) {
    //         if (err) {
    //             console.log('Error inserting document', subject);
    //         } else {
    //             console.log('document inserted into database', doc);
    //         }
    //     })
    // }

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

module.exports = Users;