
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbconnect } from "../../../../utils/db";
import User from "../../../../utils/model/User";

export async function POST(request){
    var CryptoJS = require("crypto-js");

    let payload = await request.json();
    await mongoose.connect(dbconnect);
    const {fname, lname, email, password} = payload;
    let u = new User({fname, lname, email, password : CryptoJS.AES.encrypt(password, 'secret123').toString() });
    await u.save();
    return NextResponse.json({success : true});
}