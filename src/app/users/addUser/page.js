"use client";

import { useState } from "react";

export default function Page() {
    const [userData, setUserData] = useState({
        name: "",
        age: 0,
        email: "",
        city: "",
    });

    const clickHandler = async() => {
        let resp = await fetch("http://localhost:3000/api/users", {
            method: "post",
            body: JSON.stringify(userData),
            cache : "force-cache"
        });
        let data = await resp.json();
            alert(JSON.stringify(data));
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-center">Add User Form</h1>
            <div className="m-4">
                <label className="me-4">Name: </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
            </div>
            <div className="m-4">
                <label className="me-4">Email: </label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
            </div>
            <div className="m-4">
                <label className="me-4">Age: </label>
                <input
                    type="number"
                    name="age"
                    id="age"
                    onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                />
            </div>
            <div className="m-4">
                <label className="me-4">City: </label>
                <input
                    type="text"
                    name="city"
                    id="city"
                    onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                />
            </div>
            <div className="text-center">
                <button
                    className="bg-white text-black p-2 rounded-full"
                    onClick={clickHandler}
                >
                    Add user
                </button>
            </div>
        </div>
    );
}
