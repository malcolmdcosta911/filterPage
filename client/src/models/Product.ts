type Product = {
  // creator: string;
  // id: string;
  // imagePath: string;
  // price: number;
  // pricingOption: PricingOption;
  // title: string;
  // images: string[];
  _id: string;
  images: Image[];
  brand: string;
  price: number;
  name: string;
  description: string;
};

export enum PricingOption {
  SMALL = 1,
  MEDIUM = 2,
  LARGE = 3,
}

type Image = {
  source: string;
};

export type { Product };
