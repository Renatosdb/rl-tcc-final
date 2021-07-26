import express from 'express';
import mongoose from "mongoose";
import data from './data';
import config from "./config";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute";
import stockRoute from "./routes/stockRoute";

dotenv.config();

const dbUrl = config.DATABASE_HOST;

mongoose.connect(dbUrl,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(error => console.log(error.reason) );

const app = express();

app.use(bodyParser.json());
app.use("/api/users", userRoute );
app.use("/api/stock", stockRoute );

app.get("/api/products" , (req, res) =>{
  console.log('get -> /api/products');
  res.send(data.products);
});
app.get("/api/products/:id" , (req, res) =>{
  console.log('get -> /api/products/:id');
  const id_produt = req.params.id
  const product = data.products.find(y  => y.id.toString() === id_produt.toString())
  if(product)
    res.send(product);
  else
    res.status(404).send({msg: "Produto não encontrado"});
});


app.listen(3030, () => {console.log('Servidor iniciado htpp://localhost:3030')})
