import mongoose from "mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Order from "../../../../utils/model/Order";
import { dbconnect } from "../../../../utils/db";



export async function POST(request, {params}){

    try {
        const body = await request.json();
        let data = jwt.verify(body.token, 'jwtsecret')
        await mongoose.connect(dbconnect);

        //initiate order corresponding to order id
        let order = await Order.find({"email" : data.email});

        return NextResponse.json({result : order});
        
    }catch(error){
        return NextResponse.json({result : `${error}`});
    }
}