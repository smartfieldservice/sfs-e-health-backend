const doctorController = require('./doctor/doctorController');
const reviewController = require('./doctor/reviewController');
const ratingController = require('./doctor/ratingController');
const specialistController = require('./specialistController');
const userController = require('./user/userController');
const divisionController = require('./address/divisionController');
const districtController = require('./address/districtController');

//@exports
module.exports = {  doctorController,
                    reviewController,
                    ratingController,
                    specialistController,
                    userController,
                    divisionController,
                    districtController
                }