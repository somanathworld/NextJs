import mongoose from "mongoose";
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken";
import { dbconnect } from "../../../../utils/db";
import User from "../../../../utils/model/User";

export async function POST(request){
    let body = await request.json();
 
    let token = request.nextUrl.searchParams.get("token");
    let data = jwt.verify(token, 'jwtsecret');
    await mongoose.connect(dbconnect);


    let user = await User.findOneAndUpdate({email : data.email}, { fname : body.name, 
        address : body.addrs, phone : body.phone, pincode:body.pin, city : body.city, state : body.state})
    return NextResponse.json({success : true, data : "Record updated"})
}