const { mongoose }=require("mongoose");

const specialistSchema = mongoose.Schema({

       
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