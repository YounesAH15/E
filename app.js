require("dotenv").config(); // environment variable

// require packages
const express = require("express");
const mongoose = require("mongoose");

// initialise express
const app = express();

mongoose
.connect(
    process.env.MONGODB_URI  ,{}      )
 .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

 // create a schema
 const productsSchema = new mongoose.Schema( {
    id: Number,
    code: String,
    name: String,
    description: String,
    price: Number  ,
    quantity: Number  ,
    inventoryStatus: String,
    category: String,
    image: { type:String,required:false},
    rating : { type: Number , required: false }
})

  // create a model with studentSchema
   const Product  = mongoose.model('Products', productsSchema);

   // Create a new document
  
let path = require('path');
let fs = require('fs');
const file_path= path.join(__dirname, "/data/products.json")

const jsonProducts = JSON.parse(fs.readFileSync(file_path)).data 
for(let produit of jsonProducts){

const prod  = new Product(produit)                                        // Add the document to Collections
if(Product.find(produit)) {
  continue;
}
prod.save().then(() => console.log("One entry added"), (err) => console.log(err));
// Save method can also be written as:
}
                // get documents
 app.get('/products' ,  async (req, res) => {
    
  let found = await Product.find({})                                            
    if (found ) {
      res.send(found);
      } else {
     console.log('err');
      res.send("Some error occured!")
         }                      
   })                                                            
   

 app.get('/products/:id' ,  async (req, res) => {
      
        let found = await Product.find({
          id: req.params.id
        })                                            
            if (found ) {
                  res.send(found);
                        } else {
                             console.log('err');
                                   res.send("Some error occured!")
                                            }                      
                                               })                                                            
                                               



 app.post('/products' , async (req, res)=>{

  const produit = req.params.body 
  const prod  = new Product(produit)                                        // Add the document to Collections
  if(Product.find(produit)) {
    console.log('already exists' )
    }
    prod.save().then(() => console.log("One entry added"), (err) => console.log(err));
    // Save method can also be written as:

 })

 app.patch('/products/:id', (req,res) =>{

  const newproduct = req.params.body

  Product.update({id: req.params.body.id}, newproduct )
 })

 app.delete('/products/:id', (req, res)=>{
  Product.deleteOne({
    id: req.params.id 
  })
  console.log('deleted one' )
 })

// Server listen
app.listen(3000, () => console.log("Server listening to port 3000"));
