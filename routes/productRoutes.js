const express = require("express");
const Product = require("../Models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  try {
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "Products not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.productId });
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: "Product not found with the given ID" });
  }
});

router.post("/", (req, res) => {
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    sale: req.body.sale,
    color: req.body.color,
    fabric: req.body.fabric,
    stock: req.body.stock,
  });

  product
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      let e = "";
      for (field in err.errors) e += err.errors[field].message;
      res.status(400).json({ message: e });
    });
});

module.exports = router;

// router.get("/", (req, res) => {
//   Product.find({ inStock: true })
//     .then((data) => res.status(200).json(data))
//     .limit(10) //Set limit
//     .sort({title: 1}) // Sort title by Ascending order
//     .select({title:1, price:1}) // Select ONLY title and price
//     .catch((err) => {
//       res.status(500).json({ message: err });
//     });
// });
