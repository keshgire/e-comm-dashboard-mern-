import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddProduct.css";

function UpdateProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [catagory, setCatagory] = useState();
  const [company, setCompany] = useState();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let data = await fetch(`http://localhost:7000/product/${params.id}`);
    data = await data.json();
    setName(data.name);
    setCatagory(data.catagory);
    setCompany(data.company);
    setPrice(data.price);
  };

  const updateData = async () => {
    console.log(name, price, catagory, company);
    let data = await fetch(`http://localhost:7000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, catagory, company }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    data = await data.json();
    navigate("/");
  };

  return (
    <div className="add-product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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
      <button onClick={updateData}>Update Product</button>
    </div>
  );
}

export default UpdateProduct;
