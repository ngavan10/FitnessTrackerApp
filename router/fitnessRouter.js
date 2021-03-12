const express = require('express');
const router = express.Router();
const controller = require('../controllers/fitnessController.js');
module.exports = router;

router.get("/",
    controller.landing_page
);
router.get("/user-profile", controller.user_profile);
// router.get("/plan/:plan", controller.show_plan);
router.get("/create-a-plan", controller.create_a_plan);
router.get("/dashboard", controller.dashboard);
// router.get("/workouts", controller.workout);
// router.post('/workouts', controller.post_new_workout); 
router.get('/plans', controller.show_plans);
 router.post('/create-a-plan', controller.create_new_plan);


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