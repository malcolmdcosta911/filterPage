require("dotenv").config();

const mongoose = require("mongoose");
const { Product } = require("./models/product");
const db = process.env.MONGO_URL;

const data = [
  {
    name: "Red tshirt",
    description: "Red tshirt desc",
    images: [
      {
        source: "https://picsum.photos/200/300",
      },
    ],
    brand: "levis",
    size: "S",
    price: 12,
  },
  {
    name: "blue tshirt",
    description: "blue tshirt desc",
    images: [
      {
        source: "https://picsum.photos/200/300",
      },
    ],
    brand: "adidas",
    size: "M",
    price: 36,
  },
  {
    name: "blue tshirt",
    description: "blue tshirt desc",
    images: [
      {
        source: "https://picsum.photos/200/300",
      },
    ],
    brand: "Nike",
    size: "M",
    price: 40,
  },
  ,
  {
    name: "blue tshirt",
    description: "blue tshirt desc",
    images: [
      {
        source: "https://picsum.photos/200/300",
      },
    ],
    brand: "Adidas",
    size: "L",
    price: 63,
  },
  {
    name: "White shirt",
    description: "White shirt desc",
    images: [
      {
        source: "https://picsum.photos/200/300",
      },
    ],
    brand: "Puma",
    size: "L",
    price: 60,
  },
  {
    name: "White shirt",
    description: "White shirt desc",
    images: [
      {
        source: "https://picsum.photos/200/300",
      },
    ],
    brand: "Nike",
    size: "S",
    price: 14,
  },
  {
    name: "Yellow tshirt",
    description: "Yellow tshirt desc",
    images: [
      {
        source: "https://picsum.photos/200/300",
      },
    ],
    brand: "levis",
    size: "S",
    price: 16,
  },
];

async function seed() {
  try {
    console.log("seed", db);
    mongoose.connect(db);

    await Product.createCollection();
    await Product.deleteMany();

    await Promise.all(data.map((product) => Product.create(product)));

    console.log("seeding success");
  } catch (error) {
    console.log(error.message);
  } finally {
    mongoose.disconnect();
  }
}

// seed();
