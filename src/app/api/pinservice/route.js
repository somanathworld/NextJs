import { NextResponse } from "next/server";
import {pincodes} from "../../../../utils/data/pincode";

export async function GET(){
    return NextResponse.json({pincodes})
}