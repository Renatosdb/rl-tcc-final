import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:        {type:String, required: true},
    code:        {type:String, required: true,  unique: true}
    }
);

const productSchema = new mongoose.Schema({
    name:        {type:String, required: true},
    image:       { type: String, required: true },
    brand:       { type: String, required: true },
    price:       { type: Number, default: 0, required: true },
    category:    [categorySchema],
    description: { type: String, required: true },
    rating:      { type: Number, default: 0, required: true },
    numReviews:  { type: Number, default: 0, required: true },
    }
);
const stockSchema = new mongoose.Schema({
        product:        [productSchema],
        productQty:     {type: Number, default: 0, required: true},
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);
const Stock = mongoose.model("Stock", stockSchema);

export  {Category,Product,Stock};