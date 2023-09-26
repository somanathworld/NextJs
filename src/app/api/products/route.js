import mongoose from 'mongoose';
import { NextResponse } from "next/server";
//import { dbconnect } from '../../../../utils/db';
import { Product } from '../../../../utils/model/product';


export async function GET() {

    let data = [];
    let success = true;
    try {
        const dbconnect = "mongodb+srv://root:root@cluster0.spoizjd.mongodb.net/practicedb?retryWrites=true&w=majority"
        await mongoose.connect(dbconnect);
        data = await Product.find();
    } catch (error) {
        data.push({result : error});
        success = false;
    }
    return NextResponse.json({ result: data, success });

}

export async function POST(request) {

    // let data, resp;
    // try{
    //     await mongoose.connect(dbconnect);
    //     data = await request.json()
    //     resp = await Product.create(data);
    // }catch(error){
    //     return NextResponse.json({result : "Internal DB error", success : false})
    // }
    // return NextResponse.json({result : resp, success : true});


    let payload = await request.json();
    let prod = new Product(payload);
    let result;
    try {
        await mongoose.connect(dbconnect);
        result = await prod.save();
    } catch (error) {
        return NextResponse.json({ result: "Internal DB error", success: false })
    }
    return NextResponse.json({ result: result, success: true });

}
