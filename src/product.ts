import { Schema, model } from 'mongoose';
import { ProductType } from "./modules/product";

// Mongoose schema
const productSchema = new Schema<ProductType>({
    name: String,
    description: String,
    price: Number,
    inventory: Number
}, { versionKey: false });

const Product = model<ProductType>('Product', productSchema);

module.exports = Product;