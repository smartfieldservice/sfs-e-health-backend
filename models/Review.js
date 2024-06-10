const { mongoose, Schema }=require("mongoose");

const reviewSchema = mongoose.Schema({

    doctorId :{
        type : Schema.ObjectId,
        ref : "doctor",
        required : true
    },
    review : {
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

module.exports = mongoose.model('review', reviewSchema)