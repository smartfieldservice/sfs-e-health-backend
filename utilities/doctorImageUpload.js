//@external module
const multer = require("multer");

//@internal module
const { s3Upload } = require('../middlewares/middlewareExporter')

//@create an upload instance
const upload = multer({
    storage : s3Upload.storageConfig
});

//@file check
const doctorImage = (req, res, next) => {
    if (req.headers['content-type'] && req.headers['content-type'].startsWith('multipart/form-data')) {
        upload.single('image')(req, res, next);
    } else {
        next();
    }
};

//@exports
module.exports = {  doctorImage }