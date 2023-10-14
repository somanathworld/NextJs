import mongoose from "mongoose";

const productModel = new mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    discountPercentage : Number,
    rating : Number,
    stock : Number,
    brand : String,
    category : String,
    size : [],
    variant : [],
    thumbnail : String,
    images : Array
})

export const Product = mongoose.models.products || mongoose.model("products", productModel)  