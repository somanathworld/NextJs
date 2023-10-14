import { writeFile } from "fs/promises"
import { NextRequest, NextResponse } from "next/server";

export async function POST(request){
    const data = await request.formData();
    const file = data.get('file');
    if(file === "undefined"){
        return NextResponse.json({message : "No image found.", success : false});
    }

    const byteData = await file.arrayBuffer();
    const buffer =  Buffer.from(byteData);
    const path  = `public/${file.name}`;
    await writeFile(path, buffer);
    return NextResponse.json({message : "Image uploaded successfully", success : true});
}