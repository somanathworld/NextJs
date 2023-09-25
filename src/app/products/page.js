import DelBtnCompnent from "@/components/DelBtnComponent";
import Link from "next/link";

export default async function Products() {
    let products = await listProdcts();
    return (
        <>
            <h1 style={{ textAlign: "center", margin : "20px 0px" }}>Products List</h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <table border="2px solid white">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Company</th>
                            <th>Category</th>
                            <th colSpan={2}>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(prod => (<tr key={prod.name}>
                                <td>{prod.name}</td>
                                <td>{prod.price}</td>
                                <td>{prod.company}</td>
                                <td>{prod.category}</td>
                                <td><Link href = {`/products/${prod._id}`}>Update</Link></td>
                                <td><DelBtnCompnent id = {prod._id}/></td>
                            </tr>))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={6}>&copy; All copyrights are reserved</td>
                        </tr>
                    </tfoot>
                </table>
            </div></>)
}

export async function listProdcts() {
    let resp = await fetch("http://localhost:3000/api/products", {
        cache: "no-cache"
    });
    let data = await resp.json();
    return data.result;
}