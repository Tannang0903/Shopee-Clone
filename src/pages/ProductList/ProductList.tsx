import AsideFilter from './AsideFilter'
import Product from './Product'
import SortProductList from './SortProductList'

const ProductList = () => {
  return (
    <div className='bg-[#f5f5f5] py-[32px]'>
      <div className='container grid grid-cols-6 gap-4 '>
        <aside className='col-span-1'>
          <AsideFilter />
        </aside>
        <div className='col-span-5'>
          <SortProductList />
          <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <div className='col-span-1' key={index}>
                  <Product />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
