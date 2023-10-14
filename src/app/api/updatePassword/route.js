import mongoose from "mongoose";
import { NextResponse } from "next/server"
import { dbconnect } from "../../../../utils/db";
import User from "../../../../utils/model/User";

var CryptoJS = require("crypto-js");

export async function POST(request){
    let body = await request.json();

    await mongoose.connect(dbconnect);
    let user = await User.findOne({email : body.email});
    let oriPwd = CryptoJS.AES.decrypt(user.password, 'secret123').toString(CryptoJS.enc.Utf8)
    if(oriPwd === body.pwd){
        await User.findOneAndUpdate({email : body.email}, {password : CryptoJS.AES.encrypt(body.npwd, 'secret123').toString()});
        return NextResponse.json({success : true, data : "Record updated"})
    }else{
        return NextResponse.json({success : false, data : "Wrong Password entered"})
    }
}