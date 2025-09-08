import { Pipe, PipeTransform } from '@angular/core';
import { ProductsData } from '../../features/products/interfaces/allProductsResponse';

@Pipe({
  name: 'productsSearch',
})
export class ProductsSearchPipe implements PipeTransform {
  transform(products: ProductsData[], searchText: string): ProductsData[] {
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
