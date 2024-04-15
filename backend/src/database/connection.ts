import mongoose, { Schema } from "mongoose";

export async function DBConnection() {

    try {
        const db = await mongoose.connect('mongodb://localhost:27017/reactcrud')
        console.log("db Connected");

    } catch (error) {
        console.log(error);

    }
}


const productSchema = new Schema({
    title: String,
    price: Number,
    discription: String,
    sku: Number,
    imageName: String,
    city: String,
    state: String,
    test: [{ firstName: String, lastName: String }]
})

export const  ProductTable = mongoose.model('Product', productSchema)