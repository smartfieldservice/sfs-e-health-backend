const { mongoose }=require("mongoose");

const patientSchema = mongoose.Schema({

        name : {
            type : String
        },
        phone : {
            type : String,
            required : true
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

module.exports = mongoose.model('patient', patientSchema)