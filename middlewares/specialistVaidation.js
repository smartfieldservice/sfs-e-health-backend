const { body } = require('express-validator');

const validationRules = [
    
    body('speciality').custom((value, { req }) => {
        if (!value || value.trim() === '') {
            throw new Error('Speciality should not be empty!');
        }
        if (value.length < 3) {
            throw new Error('Speciality name is too short!');
        }
        return true;
    })
    
];

//@exports
module.exports = { validationRules }