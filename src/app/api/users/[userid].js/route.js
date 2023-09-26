import { NextResponse } from "next/server";
import { users } from "../../../../../utils/users";

export async function GET(request, { params }) {
  const userId = params ? params.userid : null
  const user = users.filter((user) => user.id === parseInt(userId));
  return NextResponse.json(
    user.length === 0 ? [{ result: "Given userid Not Available" }] : user,
    { status: 200 },
  );
}
