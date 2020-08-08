const express = require("express");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 100,
  },
  category: {
    type: Array,
    required: true,
  },
  sale: {
    type: Boolean,
    default: false,
  },
  color: {
    type: Array,
  },
  fabric: {
    type: Array,
  },
  stock: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: function () {
      return this.stock > 0 ? true : false;
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
