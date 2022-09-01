import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 3000


const productSchema = new mongoose.Schema({
    productName: String,
    productPrice : Number,
    shopName : String,
    numberOfSale : Number,
    rating : Number,
    isFreeShipping : Boolean,
    currencyCode : String
  });


  const productModel = mongoose.model('product', productSchema);


app.post('/product', (req,res) => {

     let body = req.body


     if(!body.productName || !body.productPrice || !body.shopName || !body.numberOfSale || !body.rating || !body.isFreeShipping || !body.currencyCode){
  
          res.status(400).send(`Required Field Missing, all Fields are required`)
          return;
     }

     let result = productModel.create({

        productName : body.productName,
        productPrice : body.productPrice,
        shopName : body.shopName,
        numberOfSale : body.numberOfSale,
        rating : body.rating,
        isFreeShipping : body.isFreeShipping,
        currencyCode : body.currencyCode,
        
       }).catch(e => {
          console.log("db error :" , e);
          res.status(500).send({message : "db error product is not saved in database"})
       })
        console.log("Product Saved : ", result);
       res.status(201).send({message : "Product is Saved in DataBase"})



    })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


let dbURI = "mongodb+srv://abc:abc@cluster0.2acphjp.mongodb.net/practiceecommercewebsite?retryWrites=true&w=majority";
// let dbURI = 'mongodb://localhost/mydatabase';
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////