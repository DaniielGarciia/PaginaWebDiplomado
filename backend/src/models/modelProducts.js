import { Schema, model } from "mongoose";

const shemaProducts = new Schema({

    name: {
        type: String,
        required: true},
    
    description: {
        type: String,
        required: false},
    
    price: {
        type: Number,
        required: false,
        min : 0 
    },
    stock: {
        type: Number,
        required: false,
        min: 0,
    },
    category: {
        type: String,
        required: false
    },
    imagen: {
        type: String,
        required: false
    }
    
});

export default model("products", shemaProducts);