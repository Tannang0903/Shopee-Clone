import { Link } from 'react-router-dom'

const Product = () => {
  return (
    <Link to={'/'} className='bg-white rounded-sm shadow-sm block overflow-hidden'>
      <div>
        <img
          src='https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02eece816d50.jpg'
          alt=''
          className='w-full h-[180px] object-center'
        />
      </div>
      <div className='p-3'>
        <p className='text-xs'>Điện Thoại Vsmart Active 3 6GB/64GB - Hàng Chính Hãng</p>
        <div className='flex my-4 text-sm'>
          <span className='text-gray-500 line-through mr-2'>3990000</span>
          <span className='text-orange'>3190000</span>
        </div>
        <div className='flex items-center'>
          <div className='text-[#efc243] text-[9px] flex mr-2'>
            <i className='fa-solid fa-star' />
            <i className='fa-solid fa-star' />
            <i className='fa-solid fa-star' />
            <i className='fa-solid fa-star' />
            <i className='fa-regular fa-star'></i>
          </div>
          <div className='text-xs'>
            Đã bán <span>7.6K</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
