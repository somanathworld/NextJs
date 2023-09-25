"use client";

import { useEffect, useState } from "react";

export default function EdidProduct({ params }) {
    const [prodData, setProdData] = useState({
        name: "",
        price: 0,
        company: "",
        category: "",
    });

    useEffect(() => {
        async function fetchProduct() {
            let resp = await fetch(`http://localhost:3000/api/products/${params.prodid}`, {
                cache : "no-cache"
            });
            let data = await resp.json();
            if (data.success) {
                setProdData({
                    name: data.result.name,
                    price: data.result.price,
                    company: data.result.company,
                    category: data.result.category,
                })
            } else {
                alert("Product load failed " + data.result);
            }
        }
        fetchProduct();
    }, []);

    const clickHandler = async () => {
        let resp = await fetch(`http://localhost:3000/api/products/${params.prodid}`, {
            method: "put",
            body: JSON.stringify(prodData),
            cache: "no-cache"
        });
        let data = await resp.json();
        if (data.success) {
            alert("Products updated successfully")
        } else {
            alert("Try again later..."+data.resutl);
        }
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-center">Update Products Form</h1>
            <div className="m-4">
                <label className="me-4">Name: </label>
                <input
                    value={prodData.name}
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e) => setProdData({ ...prodData, name: e.target.value })}
                />
            </div>
            <div className="m-4">
                <label className="me-4">Price: </label>
                <input
                    value={prodData.price}

                    type="number"
                    name="price"
                    id="price"
                    onChange={(e) => setProdData({ ...prodData, price: e.target.value })}
                />
            </div>
            <div className="m-4">
                <label className="me-4">Company: </label>
                <input
                    value={prodData.company}
                    type="text"
                    name="company"
                    id="company"
                    onChange={(e) => setProdData({ ...prodData, company: e.target.value })}
                />
            </div>
            <div className="m-4">
                <label className="me-4">Category: </label>
                <input
                    value={prodData.category}
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
                    Update Product
                </button>
            </div>
        </div>
    );
}

