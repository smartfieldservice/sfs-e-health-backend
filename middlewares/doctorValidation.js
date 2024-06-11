const { body } = require('express-validator');

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
    body('institute').custom((value, { req }) => {
        if (!value || value.trim() === '') {
            throw new Error('Institute is required!');
        }
        if (value.length < 3) {
            throw new Error('Institute is too short!');
        }
        return true;
    }),
    body('specialist').custom((value, { req }) => {
        if (!value || value.trim() === '') {
            throw new Error('Specialist is required!');
        }
        return true;
    })

];

//@exports
module.exports = { validationRules }