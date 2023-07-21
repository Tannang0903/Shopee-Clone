import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import purchaseAPI from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { formatCurrency } from 'src/utils/utils'

const Cart = () => {
  const PurchasesInCartQuery = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseAPI.getPurchases({ status: purchasesStatus.inCart })
  })
  const purchasesInCart = PurchasesInCartQuery.data?.data.data

  return (
    <div className='bg-[#f5f5f5] py-8'>
      <div className='container'>
        <div className=' grid w-full grid-cols-12 rounded-sm bg-white p-4 shadow-sm'>
          <div className='col-span-6 flex items-center'>
            <input
              type='checkbox'
              name=''
              className='mx-6 h-5 w-5 flex-shrink-0 border-[1px] border-gray-200 p-2 accent-orange'
            />
            <div className='flex-grow text-[15px] capitalize text-gray-600'>Sản phẩm</div>
          </div>
          <div className='col-span-6'>
            <div className='grid grid-cols-5 text-center text-[15px] capitalize text-gray-600'>
              <div className='col-span-2'>Đơn giá</div>
              <div className='col-span-1'>Số lượng</div>
              <div className='col-span-1'>Số tiền</div>
              <div className='col-span-1'>Thao tác</div>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        {purchasesInCart?.map((purchase) => (
          <div className='my-4 grid w-full grid-cols-12 rounded-sm  bg-white p-4 shadow-sm' key={purchase._id}>
            <div className='col-span-6 flex items-center'>
              <input
                type='checkbox'
                name=''
                className='mx-6 h-5 w-5 flex-shrink-0 border-[1px] border-gray-200 p-2 accent-orange'
              />
              <Link to={`${path.home}${purchase.product._id}`} className='flex items-center'>
                <div className='mr-2'>
                  <img src={purchase.product.image} alt={purchase.product.name} className='h-[80px] w-[80px]' />
                </div>
                <div className='max-w-[70%] overflow-hidden text-[15px] line-clamp-2'>
                  <p>{purchase.product.name}</p>
                </div>
              </Link>
            </div>
            <div className='col-span-6'>
              <div className='grid grid-cols-5 grid-rows-3 text-center text-[15px] capitalize text-gray-600 '>
                <div className='col-span-2 row-start-2 text-[14px]'>
                  <span className='mr-2 text-gray-400 line-through'>
                    {formatCurrency(purchase.product.price_before_discount)}
                  </span>
                  <span className='text-black'>{formatCurrency(purchase.product.price)}</span>
                </div>
                <div className='col-span-1 row-start-2'>
                  <QuantityController value={purchase.buy_count} max={purchase.product.quantity} />
                </div>
                <div className='col-span-1 row-start-2'>
                  <span className='text-[14px] text-orange'>
                    {formatCurrency(purchase.buy_count * purchase.product.price)}
                  </span>
                </div>
                <div className='col-span-1 row-start-2'>
                  <i className='fa-solid fa-trash'></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='container sticky bottom-0 rounded-sm shadow-[rgba(17,_17,_26,_0.1)_0px_0px_4px]'>
        <div className='grid grid-cols-12 bg-white p-6'>
          <div className='col-span-7 flex items-center'>
            <input type='checkbox' className=' h-5 w-5 flex-shrink-0 border-[1px] border-gray-200 p-2 accent-orange' />
            <div className='mx-6 capitalize'>Chọn tất cả ({purchasesInCart?.length})</div>
            <i className='fa-solid fa-trash'></i>
          </div>
          <div className='col-span-5 flex items-center justify-end'>
            <div>
              <div className='flex items-center'>
                <span className='mr-1'>Tổng thanh toán (0 Sản phẩm):</span>
                <span className='mx-4 text-[20px] text-orange'>0</span>
              </div>
              <div className='flex items-center justify-end text-[14px]'>
                <span className='mr-1'>Tiết kiệm</span>
                <span className='mx-4 text-orange'>15.5k</span>
              </div>
            </div>
            <Button className='rounded-sm bg-orange px-14 py-2 text-[16px] text-white shadow-sm'>Mua hàng</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
