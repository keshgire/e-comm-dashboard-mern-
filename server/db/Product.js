const mongoose=require('mongoose')

let productSchema=  mongoose.Schema({
    name:String,
    price:String,
    userID:String,
    catagory:String,
    company:String
});

module.exports= mongoose.model('products',productSchema);