//@external modules
const mongoose = require("mongoose");

//@create Admin schema
const adminSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique: true,
        required:true,
    },
    image : {
        type : String
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    role:{ 
        type:String,
        enum : ['admin', 'superAdmin'],
        default : "admin"
    }
},{
    toJSON : {
        transform : function(doc, ret){
            delete ret.password;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
});

//@exports
module.exports = mongoose.model("admin",adminSchema);