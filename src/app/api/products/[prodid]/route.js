import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbconnect } from "../../../../../utils/db";
import { Product } from "../../../../../utils/model/product";

export async function PUT(request, content) {
    const filterId = { _id: content.params.prodid };
    const payload = await request.json();
    let result;
    let success = true;
    try {
        await mongoose.connect(dbconnect);
        result = await Product.findOneAndUpdate(filterId, payload);
    } catch (error) {
        result = error;
        success = false;
    }
    return NextResponse.json({ result, success });
}


export async function GET(request, content) {
    const record = { _id: content.params.prodid };
    let result;
    let success = true;
    try {
        await mongoose.connect(dbconnect);
        result = await Product.findById(record);
    } catch (error) {
        result = error;
        success = false;
    }
    return NextResponse.json({ result, success });
}

export async function DELETE(request, content) {
    const record = { _id: content.params.prodid };
    let result;
    let success = true;
    try {
        await mongoose.connect(dbconnect);
        result = await Product.deleteOne(record);
    } catch (error) {
        result = error;
        success = false;
    }
    return NextResponse.json({ result, success });
}    