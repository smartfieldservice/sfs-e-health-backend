const doctorController = require('./doctor/doctorController');
const reviewController = require('./doctor/reviewController');
const ratingController = require('./doctor/ratingController');
const specialistController = require('./dashboard/specialistController');
const userController = require('./user/userController');
const divisionController = require('./dashboard/address/divisionController');
const districtController = require('./dashboard/address/districtController');
const adminController = require('./dashboard/admin/adminController');

//@exports
module.exports = {  doctorController,
                    reviewController,
                    ratingController,
                    specialistController,
                    userController,
                    divisionController,
                    districtController,
                    adminController
                }