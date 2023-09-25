"use client";

import { useState } from "react";

export default function Page() {
    const [prodData, setProdData] = useState({
        name: "",
        price: 0,
        company: "",
        category: "",
    });

    const clickHandler = async () => {
        let resp = await fetch("http://localhost:3000/api/products", {
            method: "post",
            body: JSON.stringify(prodData),
            cache: "force-cache"
        });
        let data = await resp.json();
        if(data.success){
            alert("New products added")
        }else{
            alert("Try again later...");
        }
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-center">Add Products Form</h1>
            <div className="m-4">
                <label className="me-4">Name: </label>
                <input
                    text={prodData.name}
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e) => setProdData({ ...prodData, name: e.target.value })}
                />
            </div>
            <div className="m-4">
                <label className="me-4">Price: </label>
                <input
                    text={prodData.price}

                    type="number"
                    name="price"
                    id="price"
                    onChange={(e) => setProdData({ ...prodData, price: e.target.value })}
                />
            </div>
            <div className="m-4">
                <label className="me-4">Company: </label>
                <input
                    text={prodData.company}
                    type="text"
                    name="company"
                    id="company"
                    onChange={(e) => setProdData({ ...prodData, company: e.target.value })}
                />
            </div>
            <div className="m-4">
                <label className="me-4">Category: </label>
                <input
                    text={prodData.category}
                    type="text"
                    name="category"
                    id="category"
                    onChange={(e) => setProdData({ ...prodData, category: e.target.value })}
                />
            </div>
            <div className="text-center">
                <button
                    className="bg-white text-black p-2 rounded-full"
                    onClick={clickHandler}
                >
                    Add Product
                </button>
            </div>
        </div>
    );
}
