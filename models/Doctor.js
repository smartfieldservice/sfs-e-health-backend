const { mongoose , Schema } = require('mongoose');

const doctorSchema = mongoose.Schema({

        name :{
            type : String,
            required : true
        },
        institute :{
            type : String,
            required : true
        },
        image :{
            type : String
        },
        fees : {
            type : Number
        },
        specialist :{
            type : Array
        },
        availableTime : {
            type : String
        }

    },{
        toJSON : {
            transform : function(doc, ret){
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
            }
        },
        timestamps : true
});

module.exports = mongoose.module('doctor', doctorSchema);