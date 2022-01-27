import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): string {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(id: string) {
    const product = this.findProduct(id);
    return { ...product };
  }

  updateProduct(id: string, title: string, description: string, price: number) {
    const product = this.findProduct(id);
    product.title = title ? title : product.title;
    product.description = description ? description : product.description;
    product.price = price ? price : product.price;
  }

  findProduct(id: string) {
    const product = this.products.find((product) => product.id === id);
    if (!product) throw new NotFoundException('Could not find product.');
    return product;
  }

  deleteProduct(id: string) {
    this.products = this.products.filter((item) => item.id !== id);
  }
}
