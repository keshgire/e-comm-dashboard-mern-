const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = await result.toObject();
  delete result.password;

  if (result) {
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send({ result: "something went wrong, please try after sometime" });
      } else {
        res.send({ result, auth: token });
      }
    });
  }
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({
            result: "something went wrong, please try after sometime",
          });
        } else {
          res.send({ user, auth: token });
        }
      });
    //   res.send(user);
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "Require Email and Password" });
  }
});

app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/get-product", async (req, res) => {
  let product = await Product.find();
  res.send(product);
});

app.delete("/product/:id", async (req, res) => {
  let product = await Product.deleteOne({ _id: req.params.id });

  res.send(product);
});

app.get("/product/:id", async (req, res) => {
  let product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.send({ result: "No id found" });
  }
});

app.put("/product/:id", async (req, res) => {
  let product = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(product);
});

app.get("/search/:key", async (req, res) => {
  let product = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { catagory: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(product);
});

app.listen(7000);
