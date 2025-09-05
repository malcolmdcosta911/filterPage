require("dotenv").config();

const mongoose = require("mongoose");
const { Product } = require("./models/product");
const db = process.env.MONGO_URL;

const data = [
  {
    name: "Happiny",
    description: "Happiny plushie",
    images: [
      {
        source: "https://picsum.photos/200/300",
      },
    ],
    brand: "Bandpresto",
    size: "S",
    price: 12,
  },
  {
    name: "Pawmi",
    description: "Pawmi plushie",
    images: [
      {
        source: "https://picsum.photos/200/300",
      },
    ],
    brand: "Bandpresto",
    size: "M",
    price: 36,
  },
  {
    name: "Gible",
    description: "Gible plushie",
    images: [
      {
        source: "https://picsum.photos/200/300",
      },
    ],
    brand: "Bandpresto",
    size: "M",
    price: 40,
  },
  ,
  {
    name: "Pikachu",
    description: "Pikachu plushie",
    images: [
      {
        source: "https://picsum.photos/200/300",
      },
    ],
    brand: "Nintendo",
    size: "L",
    price: 63,
  },
  {
    name: "Kirby",
    description: "Kirby plushie",
    images: [
      {
        source: "https://picsum.photos/200/300",
      },
    ],
    brand: "Star collection",
    size: "L",
    price: 60,
  },
  {
    name: "Chansey",
    description: "Chansey plushie",
    images: [
      {
        source: "https://picsum.photos/200/300",
      },
    ],
    brand: "Star collection",
    size: "S",
    price: 14,
  },
  {
    name: "Blissey",
    description: "Blissey plushie",
    images: [
      {
        source: "https://picsum.photos/200/300",
      },
    ],
    brand: "Star collection",
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
