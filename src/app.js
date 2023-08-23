const express = require("express");
const ProductManager = require("./ProductManager.js");
const productManager = new ProductManager();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("products", async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProduct();

  if (limit) {
    return res.send(products.slice(0, limit));
  }

  res.send(products);
});

app.get("product:pid", async (req, res) => {
  const pid = parseInt(req.params.pid, 10);

  const product = await productManager.getById(pid);

  res.send(product);
});
