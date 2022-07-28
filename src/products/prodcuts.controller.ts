import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./products.model";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //Add Product - POST
  @Post()
  async addProduct(
    @Body("title") prodTitle: string,
    @Body("desc") prodDesc: string,
    @Body("price") prodPrice: number
  ) {
    const prodId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice
    );

    return { id: prodId };
  }

  //GetProduct - GET
  @Get()
  async getProducts(): Promise<any> {
    const products = await this.productsService.getProducts();
    //return this.productsService.getProducts();
    return products;
  }

  @Get(":id")
  async getProductById(@Param("id") id: string): Promise<Product> {
    const product = await this.productsService.getProductById(id);
    //return this.productsService.getProductById(id);
    return product;
  }

  @Patch(":id")
  updateProduct(
    @Param("id") id: string,
    @Body("title") prodTitle: string,
    @Body("desc") prodDesc: string,
    @Body("price") prodPrice: number
  ): any {
    return this.productsService.updateProductById(
      id,
      prodTitle,
      prodDesc,
      prodPrice
    );
  }

  @Delete(":id")
  deleteProduct(@Param("id") id: string): any {
    return this.productsService.deleteProduct(id);
  }
}
