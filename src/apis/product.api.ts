import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const productAPI = {
  getProducts: (params: ProductListConfig) =>
    http.get<SuccessResponse<ProductList>>('/products', {
      params
    }),

  getProductsDetail: (id: string) => http.get<SuccessResponse<Product>>(`/products/${id}`)
}

export default productAPI
