const { body } = require('express-validator');
const { parsePhoneNumberFromString } = require('libphonenumber-js');

const validationRules = [
    
    body('email').optional().isEmail().withMessage('Invalid email address!'),
    
    body('phone').custom((value, { req }) => {
        
        if (!value || value.trim() === '') {
            throw new Error('Phone number should not be empty!');
        }
        
        const phoneNumber = parsePhoneNumberFromString(value);
        
        if (!phoneNumber || !phoneNumber.isValid()) {
            throw new Error('Invalid phone number!');
        }
        return true;
    }),

    body('otp').optional().isString().withMessage('Enter OTP!')
];

//@exports
module.exports = { validationRules }