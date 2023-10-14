import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbconnect } from "../../../../../utils/db";
import Order from "../../../../../utils/model/Order";

export async function GET(request, {params}){
    try {
        await mongoose.connect(dbconnect);

        let order = await Order.findById(params.orderid);
        return NextResponse.json({result : order});
    }catch(error){
        return NextResponse.json({result : error});
    }
}


export async function PUT(request, {params}){
    try {
        let body = await request.json();
        await mongoose.connect(dbconnect);
        let order = await Order.findOneAndUpdate({orderId : params.orderid}, {status : body.status});
        return NextResponse.json({result : order});
    }catch(error){
        return NextResponse.json({result : error});
    }
}