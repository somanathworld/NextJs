import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { dbconnect } from '../../../../utils/db';
import Order from '../../../../utils/model/Order';
import { Product } from '../../../../utils/model/product';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST (request){
    const body = await request.json();

    if(body.subTotal > 0){
    try {
        await mongoose.connect(dbconnect);

        for(let product in body.cart){
            let prodDetails = await Product.findById({_id : product});
            //check the product is out of stock
            if(body.cart[product]['qty'] > prodDetails.stock){
                return NextResponse.json({error :"Some items in your cart got out of stock, try again later!"});
            }
            //check cart is tampered or not
            if(body.cart[product]['price'] != prodDetails.price){
                return NextResponse.json({error :"Product Price changed.Try again later!"});
            }
        }

        //initiate order corresponding to order id
        let order = new Order({
            email : body.deliveryDet.email,
            orderId : body.oid,
            products : body.cart,
            address : body.deliveryDet.addrs,
            phone : body.deliveryDet.phone,
            pincode : body.deliveryDet.pin,
            state : body.deliveryDet.state,
            city : body.deliveryDet.city,
            amount : body.subTotal
        });
        await order.save();

        const product = await stripe.products.create({
            name: 'Leather Jacket',
            default_price_data : {
                currency : "INR",
                unit_amount : 100.00 * 100
            }
          });
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: product.default_price,
                    quantity: 1,
                },
            ],
            mode: 'payment',
             success_url: body.successUrl,
             cancel_url: body.failureUrl,
        });
        return NextResponse.json({url : session.url})
    } catch (err) {
        return NextResponse.json({error : err.message, status : 500})
    }
    }else{
        return NextResponse.json({error : "please add some item into cart for checkout"});
    }
}

