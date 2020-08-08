const express = require("express");
const productRoutes = require("./routes/productRoutes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();
const PORT = "5000";

//Middlewares
app.use(bodyParser.json());

//Database connection
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to Database")
);

app.get("/", (req, res) => {
  res.send("Bushirts: Home Page");
});

app.use("/api/products", productRoutes);
// app.use("/api/users", usersRoutes);

// app.use((error, req, res, next) => {
//   if (res.headersSent) {
//     return next(error);
//   }
//   res
//     .status(error.code || 500)
//     .json({ message: error.message || "An unknown error occured" });
// });

app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});
