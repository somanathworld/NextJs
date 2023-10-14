import mongoose from "mongoose";
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken';
import { dbconnect } from "../../../../utils/db";
import User from "../../../../utils/model/User";

export async function GET(request){
    let token = request.nextUrl.searchParams.get("token");
    let data = jwt.verify(token, 'jwtsecret');
    await mongoose.connect(dbconnect);

    let user = await User.find({email : data.email})
    return NextResponse.json({success : true, user})
}