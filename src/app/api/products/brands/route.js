import mongoose from "mongoose";
import { dbconnect } from "../../../../../utils/db";
import { Product } from "../../../../../utils/model/product";
import { NextResponse } from "next/server";

export async function GET(){
    let result;
    let success = true;

    try{
    await mongoose.connect(dbconnect)
    result = await Product.distinct("brand");
    }catch(error){
        result = error;
        success = false;
    }
    return NextResponse.json({result, success});
}