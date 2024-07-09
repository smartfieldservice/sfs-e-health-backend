const { body } = require('express-validator');
const { parsePhoneNumberFromString } = require('libphonenumber-js');

const validationRules = [
    
    body('email').isEmail().withMessage('Invalid email address!'),

];

//@exports
module.exports = { validationRules }