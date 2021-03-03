exports.landing_page = function(req, res) {
    res.render('home');
    } 

exports.user_profile = function(req, res) {
    res.send('<h1>User Profile Page</h1>');
}

exports.dashboard = function(req, res) {
    res.send('<h1>Dashboard</h1>');
}

exports.login = function(req, res) {
    res.send('<h1>Login Page</h1>');
}