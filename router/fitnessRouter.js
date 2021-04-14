const express = require('express');
const router = express.Router();
const controller = require('../controllers/fitnessController.js');
const auth = require('../auth/auth'); 
const {ensureLoggedIn} = require('connect-ensure-login');
module.exports = router;

router.get("/",
    controller.landing_page
);

router.get('/register', controller.show_register_page); 
router.post('/register', controller.post_new_user); 

router.get('/login', controller.show_login_page);
router.post("/login", auth.authorize("/login"), controller.post_login); 

router.get('/logout', controller.logout); 

router.get('/user-profile', ensureLoggedIn('/login'), controller.user_profile);
// router.get("/plan/:plan", controller.show_plan);
router.get("/create-a-plan", ensureLoggedIn('/login'), controller.create_a_plan);
router.get("/dashboard", ensureLoggedIn('/login'), controller.dashboard);
// router.get("/workouts", controller.workout);
// router.post('/workouts', controller.post_new_workout); 
router.get('/plans', ensureLoggedIn('/login'), controller.show_plans);
router.post('/create-a-plan', ensureLoggedIn('/login'), controller.create_new_plan);
//router.post('/', controller.login);
router.post('/delete', ensureLoggedIn('/login'),  controller.delete_plan);
router.post('/deleteGoal', ensureLoggedIn('/login'),  controller.delete_goal);
router.post('/addGoal', ensureLoggedIn('/login'),  controller.add_goal);
router.post('/updateGoal', ensureLoggedIn('/login'),  controller.update_goal);


router.use(function(req, res) {
res.status(404);
res.type('text/plain');
res.send('404 Error. Page not found.');
}) ;

router.use(function(err, req, res, next) {
res.status(500);
res.type('text/plain');
res.send('Internal Server Error.');
}) ;