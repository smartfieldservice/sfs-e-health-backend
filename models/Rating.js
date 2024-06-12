const { mongoose, Schema }=require("mongoose");

const ratingSchema = mongoose.Schema({

    doctorId :{
        type : Schema.ObjectId,
        ref : "doctor",
        required : true
    },
    rating : {
        type : Number
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

//@exports
module.exports = mongoose.model('rating', ratingSchema);