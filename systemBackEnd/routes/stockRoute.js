import express from "express";
import {Category, Product,Stock} from "../models/stockModel"


const  router = express.Router();

router.post("/create-category",async (req, res) => {
    console.log( 'create-category ')
    try {
        const category = new Category({
            name:        req.body.name ,
            code:        req.body.code
        });
        const newCategory = await  category.save();
        if(newCategory){
            return res.status(201).send({ message: 'Categoria Criado', data: newCategory });
        }
    }catch (e) {
        console.log("Error creating category -> " +  e.message);
        return res.status(500).send({ message: ' Error na criação da Categoria.' });
    }
})
router.post("/create-product",async (req, res) => {
    console.log( 'create-product ')
    try {
        const category = await Category.findById(req.params.category_id);
        const product = new Product({
            name:        req.body.name ,
            image:       req.body.image,
            price:       req.body.price,
            brand:       req.body.brand,
            description: req.body.description,
            rating:      req.body.rating,
            numReviews:  req.body.numReviews,
        });

        const newProduct = await  product.save();
        newProduct.category.push(category);
        if(newProduct){
            return res.status(201).send({ message: 'Produto Criado', data: newProduct });
        }
    }catch (e) {
        console.log("Error creating product -> " +  e.message);
        return res.status(500).send({ message: ' Error na criação do Produto.' });
    }
})
router.post("/create-stok",async (req, res) => {
    console.log( 'create-product ')
    try {
        const product = await Product.findById(req.params.product_id);
        const stock = new Stock({
            productQty:    req.body.name
        });
        const newStock = await  stock.save();
        newStock.product.push(product);
        if(newStock){
            return res.status(201).send({ message: 'Estoque Criado', data: newStock });
        }
    }catch (e) {
        console.log("Error creating stock -> " +  e.message);
        return res.status(500).send({ message: ' Error na criação do estoque.' });
    }
})

export default router;