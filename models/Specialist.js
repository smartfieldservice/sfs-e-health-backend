const { mongoose }=require("mongoose");

const specialistSchema = mongoose.Schema({
    
    speciality : {
        type : String,
        required : true
    },
    slug : {
        type : String,
        unique : true
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

module.exports = mongoose.model('specialist', specialistSchema)