import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fname : {type : String, required:true},
    lname : String,
    email : {type : String , required : true},
    password : {type : String , required : true},
    address : {type : String, default : ""},
    phone : {type : Number, default : 9999999999},
    pincode : {type : String, default : ""},
    state : {type : String , default : ""},
    city : {type : String, default : ""}

},{timestamps : true});

export default mongoose.models.User || mongoose.model("User", UserSchema);