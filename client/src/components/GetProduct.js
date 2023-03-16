import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GetProduct.css";
function GetProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await fetch("http://localhost:7000/get-product");
    data = await data.json();
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    let data = await fetch(`http://localhost:7000/product/${id}`, {
      method: "Delete",
    });
    data = await data.json();
    if(data){
      getData();
    }
  };

  const updateData =async (id) => {
    navigate(`/update/${id}`);
    
  };

  const searchProduct=async(e)=>{
    let key= e.target.value;
    if(key){
      let data= await fetch(`http://localhost:7000/search/${key}`);
      data=await data.json();
      if(data){
        setProducts(data);
      }
    }
   else{
    getData()
   }
  }

  return (
    <div className="get-product">
      <h1>Products List</h1>
      <input type="text" className="search-box" placeholder="Search Product..." onChange={searchProduct} />
      <ul>
        <li>Sr. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Catagory</li>
        <li>Company</li>
        <li>Operations</li>
      </ul>
      {
      products.length>0? products.map((item, index) => (
        <ul key={index}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.catagory}</li>
          <li>{item.company}</li>
          <li>
        
            <button onClick={() => deleteProduct(item._id)}>Delete</button>
            <button onClick={() => updateData(item._id)}>Update</button>
          </li>
        </ul>
      )):
      <h1 style={{color: "red"}}>No record found</h1>
      }
    </div>
  );
}

export default GetProduct;
