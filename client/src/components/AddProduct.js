import React, { useState } from "react";
import './AddProduct.css'

function AddProduct() {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [catagory, setCatagory] = useState();
  const [company, setCompany] = useState();
  const [err,setErr]=useState(true);
  const addProduct=async()=>{
  
    let data= await fetch('http://localhost:7000/add-product',{
        method:'post',
        body:JSON.stringify({name,price,catagory,company}),
        headers: {"content-type":"application/json"}
    })
    data= await data.json();
    console.log(data);
    setName('');
    setPrice('');
    setCatagory('');
    setCompany('');
  }

  return (
    <div className="add-product">
        <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* `err && !name && <span>please enter valid name</span>` */}
      <input
        type="text"
        placeholder="Enter product price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product catagory"
        value={catagory}
        onChange={(e) => setCatagory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter product company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default AddProduct;
