import { useQuery } from '@tanstack/react-query'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product'
import SortProductList from './components/SortProductList'
import productAPI from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import categoryAPI from 'src/apis/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

const ProductList = () => {
  const queryConfig = useQueryConfig()

  const ProductListQuery = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productAPI.getProducts(queryConfig as ProductListConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  const CategoryListQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryAPI.getCategories()
  })

  return (
    <div className='bg-[#f5f5f5] py-[32px]'>
      {ProductListQuery.data && (
        <div className='container grid grid-cols-6 gap-4 '>
          <aside className='col-span-1'>
            {}
            <AsideFilter queryConfig={queryConfig} categories={CategoryListQuery.data?.data.data || []} />
          </aside>
          <div className='col-span-5'>
            <SortProductList
              queryConfig={queryConfig}
              pageSize={ProductListQuery.data.data.data.pagination.page_size}
            />
            <div className='mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {ProductListQuery.data?.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
            <Pagination queryConfig={queryConfig} pageSize={ProductListQuery.data.data.data.pagination.page_size} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductList
