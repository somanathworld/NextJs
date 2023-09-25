import { METHODS } from "http";
import Link from "next/link";
import { POST } from "../api/users/route";

export default async function Page() {
  let users = await usersList();
  return (
    <div>
      {users.map((user) => (
        <h1 className="m-4" key={user.id}>
          <Link href={`/users/${user.id}`}>{user.name}</Link>
        </h1>
      ))}
    </div>
  );
}

async function usersList() {
  let resp = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
  });
  let data = await resp.json();
  return data;
}
