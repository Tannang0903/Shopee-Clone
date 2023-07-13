export interface Product {
  _id: string
  name: string
  image: string
  images: string[]
  price_before_discount: number
  price: number
  rating: number
  quantity: number
  sold: number
  view: number
  description: string
  category: {
    _id: string
    name: string
  }
  createdAt: string
  updatedAt: string
}

export interface ProductList {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface ProductListConfig {
  page?: number | string
  limit?: number
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
  category?: string
}
