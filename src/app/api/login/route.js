import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "../../../../utils/model/User";
import { dbconnect } from "../../../../utils/db";

var CryptoJS = require("crypto-js");


export async function POST(request){
    let payload = await request.json();    
    await mongoose.connect(dbconnect);
    let user = await User.findOne({"email" : payload.email});
    if(user != null){
        let oriPwd = CryptoJS.AES.decrypt(user.password, 'secret123').toString(CryptoJS.enc.Utf8)
        if(payload.email === user.email && payload.password === oriPwd){
            var token = jwt.sign({fname : user.fname, lname:user.lname, email : user.email},'jwtsecret' ,{ expiresIn: '2d' });
            return NextResponse.json({success : true, token});
        }else{
            return NextResponse.json({success : false, error : "Invalid credentials"})
        }
    }else{
        return NextResponse.json({success : false, error : "User not exist"});
    }
}
