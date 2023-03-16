const mongoose=require('mongoose');
let url='mongodb+srv://suraj:suraj@cluster0.glwz2f4.mongodb.net/e-commerce'
mongoose.connect(url).then(()=>console.log("db connected"))