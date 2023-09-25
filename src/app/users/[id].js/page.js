export default async function Page({ params }) {
    let [user] = await userData(params.id);
    if (user.result) {
      return <h1>NO Records found</h1>;
    } else {
      return (
        <div className="flex flex-col">
          <h1>User Details {params.id}</h1>
          <b>Name : {user.name}</b>
          <b>Age : {user.age}</b>
          <b>Email : {user.email}</b>
          <b>City : {user.city}</b>
        </div>
      );
    }
  }
  
  async function userData(id) {
    let resp = await fetch("http://localhost:3000/api/users/" + id, {
      cache: "no-store",
    });
    let data = await resp.json();
    return data;
  }
  