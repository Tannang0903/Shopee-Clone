import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'
import { useTranslation } from 'react-i18next'

interface Props {
  product: ProductType
}

const Product = ({ product }: Props) => {
  const { t } = useTranslation('home')

  return (
    <Link
      to={`${path.home}${product._id}`}
      className='block overflow-hidden rounded-sm bg-white shadow-sm hover:translate-y-[-2px]'
    >
      <div className='relative w-full pt-[100%]'>
        <img src={product.image} alt={product.name} className='absolute left-0 top-0 h-full w-full object-cover' />
      </div>
      <div className='p-3'>
        <div className='overflow-hidden'>
          <p className='min-h-[32px] text-xs line-clamp-2'>{product.name}</p>
        </div>
        <div className='my-4 flex text-sm '>
          <span className='mr-2 max-w-[50%] truncate text-gray-500 line-through'>
            {formatCurrency(product.price_before_discount)}
          </span>
          <span className='text-orange'>{formatCurrency(product.price)}</span>
        </div>
        <div className='flex items-center'>
          <ProductRating rating={product.rating} size='h-3 w-3' color='fill-yellow-300 text-yellow-300' />
          <div className='ml-2 text-xs'>
            {t('product.sold')} <span>{formatNumberToSocialStyle(product.sold)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
