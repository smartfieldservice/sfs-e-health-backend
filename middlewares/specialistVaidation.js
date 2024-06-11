const { body } = require('express-validator');

const validationRules = [
    
    body('field').custom((value, { req }) => {
        if (!value || value.trim() === '') {
            throw new Error('Field should not be empty!');
        }
        if (value.length < 3) {
            throw new Error('Field name is too short!');
        }
        return true;
    })
    
];

//@exports
module.exports = { validationRules }