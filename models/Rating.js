const { mongoose, Schema }=require("mongoose");

const ratingSchema = mongoose.Schema({

    doctorId :{
        type : Schema.ObjectId,
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

module.exports = mongoose.model('rating', ratingSchema)