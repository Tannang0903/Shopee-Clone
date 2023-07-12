import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

interface Props {
  product: ProductType
}

const Product = ({ product }: Props) => {
  return (
    <Link to={'/!'} className='bg-white rounded-sm shadow-sm block overflow-hidden hover:translate-y-[-2px]'>
      <div className='w-full pt-[100%] relative'>
        <img src={product.image} alt={product.name} className='object-cover absolute top-0 left-0 h-full w-full' />
      </div>
      <div className='p-3'>
        <div className='overflow-hidden'>
          <p className='text-xs line-clamp-2 min-h-[32px]'>{product.name}</p>
        </div>
        <div className='flex my-4 text-sm '>
          <span className='text-gray-500 line-through mr-2 truncate max-w-[50%]'>
            {formatCurrency(product.price_before_discount)}
          </span>
          <span className='text-orange'>{formatCurrency(product.price)}</span>
        </div>
        <div className='flex items-center'>
          <ProductRating rating={product.rating} />
          <div className='text-xs'>
            Đã bán <span>{formatNumberToSocialStyle(product.sold)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
