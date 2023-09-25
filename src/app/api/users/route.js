
import { NextResponse } from "next/server";
import { users } from "../../../../utils/users";

export async function GET() {
  return NextResponse.json(users, { status: 200 });
}

export async function POST(request) {
  try {
    let payload = await request.json();
    console.log(payload);
    if (!payload.name || !payload.city || !payload.email || !payload.age) {
      return NextResponse.json(
        { result: "some fields is/are empty", success: false },
        { status: 500 },
      );
    }
    console.log(true);
    return NextResponse.json(
      { result: "New Record created.", success: true },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}

