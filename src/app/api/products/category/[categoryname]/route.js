import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { dbconnect } from "../../../../../../utils/db";
import { Product } from "../../../../../../utils/model/product";

export async function GET(request, content) {
    let result;
    let success = true;
    try {
        await mongoose.connect(dbconnect);
        result = await Product.find({category : content.params.categoryname});
    } catch (error) {
        result = error;
        success = false;
    }
    return NextResponse.json({ result, success });
}
