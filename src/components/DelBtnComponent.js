'use client'
export default function DelBtnCompnent({id}){

    async function clickHandler(){
        let resp = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: "delete",
            cache: "no-cache"
        });
        let data = await resp.json();
        if (data.success) {
            alert("Products deleted successfully.")
        } else {
            alert("Try again later..."+data.resutl);
        }
    }

    return(<button onClick = {clickHandler}>
        Delete
    </button>);
}