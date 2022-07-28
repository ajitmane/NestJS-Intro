import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel("Product") private readonly productModel: Model<Product>
  ) {}
  products: Product[] = [];

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = new this.productModel({ title, desc, price });
    //this.products.push(newProduct);
    const result = await newProduct.save();
    return result._id;
  }

  async getProducts() {
    const products = this.productModel.find().exec();
    //return [...this.products];
    return products;
  }

  private async findProduct(prodId: string): Promise<Product> {
    //const prodIndex = this.products.findIndex((prod) => prod.id == prodId);
    const product = await this.productModel.findById(prodId);
    if (!product) {
      throw new NotFoundException("Could not find product");
    }

    return product;
  }

  getProductById(id: string) {
    const prod = this.findProduct(id);
    return prod;
  }

  async updateProductById(
    id: string,
    title: string,
    desc: string,
    price: number
  ) {
    const updatedProd = await this.findProduct(id);
    if (title) {
      updatedProd.title = title;
    }

    if (desc) {
      updatedProd.desc = desc;
    }

    if (price) {
      updatedProd.price = price;
    }

    await updatedProd.save();

    return null;
  }

  async deleteProduct(id: string) {
    const result = await this.productModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException("Could not find product.");
    }
    return result;
  }
}
