import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    paymentInfo: { type: String, default: "" },
    products: {type : Object, required : true},
    address : {type : String, required : true},
    phone : {type : Number, default : 9999999999},
    pincode : {type : String, default : ""},
    state : {type : String , default : ""},
    city : {type : String, default : ""},
    amount : {type : Number, required : true},
    status : {type : String, default : 'pending', required : true} ,
}, {timestamps : true});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);