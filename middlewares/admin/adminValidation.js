const { body } = require('express-validator');
const { parsePhoneNumberFromString } = require('libphonenumber-js');

const validationRules = [
    
    body('name').custom((value, { req }) => {
        if (!value || value.trim() === '') {
            throw new Error('Name is required!');
        }
        if (value.length < 3) {
            throw new Error('Name is too short!');
        }
        return true;
    }),

    body('email').isEmail().withMessage('Invalid email address!'),

    body('password').custom((value, { req }) => {
        if (!value || value.trim() === '') {
            throw new Error('Password is required!');
        }
        if (value.length < 5) {
            throw new Error('Password is too short!');
        }
        return true;
    }),

    body('address').custom((value, { req }) => {
        if (!value || value.trim() === '') {
            throw new Error('Address is required!');
        }
        if (value.length < 5) {
            throw new Error('Address is too short!');
        }
        return true;
    }),

    body('phone').custom((value, { req }) => {
        
        if (!value || value.trim() === '') {
            throw new Error('Phone number is required!');
        }
        
        const phoneNumber = parsePhoneNumberFromString(value, "BD");
        
        if (!phoneNumber || !phoneNumber.isValid()) {
            throw new Error('Invalid phone number!');
        }
        return true;
    }),
];

//@exports
module.exports = { validationRules }