'use client'

import { useState } from "react"

export default function Upload() {

    const [file, setFile] = useState();
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        data.set('file', file);
        let resp = await fetch("http://localhost:3000/api/upload", {
            method : "post",
            cache : "no-cache",
            body : data
        })
        resp =  await resp.json(); 
        if(resp.success){
            alert("image uploaded successfully.");
        }else{
            alert("some error occurred, Try again later...\n"+resp.message)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={(event) => setFile(event.target.files?.[0])} />
                <button>Upload Image</button>
            </form>
        </>
    )
}