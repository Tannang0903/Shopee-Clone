import { Link } from 'react-router-dom'
import Button from 'src/components/Button'

const AsideFilter = () => {
  return (
    <div className=''>
      <Link to={'/'} className='flex items-center border-b-[1px] border-gray-300/80 py-[16px]'>
        <i className='fa-solid fa-bars'></i>
        <h3 className='ml-2 font-bold capitalize'>Tất cả danh mục</h3>
      </Link>
      <div className='py-[20px]'>
        <ul className='pl-4 text-[14px]'>
          <li className='capitalize pb-2 '>
            <Link to={'/'} className='relative text-orange font-semibold'>
              <svg viewBox='0 0 4 7' className='fill-orange w-2 h-2 absolute top-[4px] left-[-12px]'>
                <polygon points='4 3.5 0 0 0 7'></polygon>
              </svg>
              Đồng hồ
            </Link>
          </li>
          <li className='capitalize pb-2'>
            <Link to={'/'}>Đồng hồ Nam</Link>
          </li>
          <li className='capitalize pb-2'>
            <Link to={'/'}>Đồng hồ Nữ</Link>
          </li>
          <li className='capitalize pb-2'>
            <Link to={'/'}>Bộ Đồng hồ và đồng hồ cặp</Link>
          </li>
          <li className='capitalize pb-2'>
            <Link to={'/'}>Đồng hồ Trẻ em</Link>
          </li>
          <li className='capitalize pb-2'>
            <Link to={'/'}>Phụ kiện Đồng hồ</Link>
          </li>
        </ul>
      </div>
      <div className='flex items-center border-b-[1px] border-gray-300/80 py-[16px]'>
        <i className='fa-solid fa-filter'></i>
        <h3 className='ml-2 font-bold capitalize'>Bộ lọc tìm kiếm</h3>
      </div>
      <div className='py-[20px] border-b-[1px] border-gray-300/80'>
        <h4 className='pb-[12px] text-[16px] text-gray-700'>Khoảng giá</h4>
        <form>
          <div className='grid grid-cols-5'>
            <input
              type='text'
              placeholder='Từ'
              className='col-span-2 uppercase text-center border border-gray-300 rounded-sm font-light text-[13px] text-gray-500 py-1 outline-none'
            />
            <div className='col-span-1 text-center text-gray-400'>-</div>
            <input
              type='text'
              placeholder='đến'
              className='col-span-2 uppercase text-center border border-gray-300 rounded-sm font-light text-[13px] text-gray-500 py-1 outline-none'
            />
          </div>
          <Button className='uppercase py-[6px] bg-orange hover:bg-orange/80 w-full mt-[16px] text-white rounded-sm shadow-sm text-sm'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='py-[20px] border-b-[1px] border-gray-300/80'>
        <h4 className='pb-[12px] text-[16px] text-gray-700'>Đánh giá</h4>
        <ul className='pl-2'>
          <li className='mt-2'>
            <Link to={'/!'} className='text-[#efc243] text-sm'>
              <i className='fa-solid fa-star' />
              <i className='fa-solid fa-star' />
              <i className='fa-solid fa-star' />
              <i className='fa-solid fa-star' />
              <i className='fa-solid fa-star' />
            </Link>
          </li>
          <li className='flex items-center mt-2'>
            <Link to={'/!'} className='text-[#efc243] text-sm flex mr-2'>
              <i className='fa-solid fa-star' />
              <i className='fa-solid fa-star' />
              <i className='fa-solid fa-star' />
              <i className='fa-solid fa-star' />
              <i className='fa-regular fa-star'></i>
            </Link>
            <span>trở lên</span>
          </li>
        </ul>
      </div>
      <Button className='uppercase py-[6px] bg-orange hover:bg-orange/80 w-full mt-[20px] text-white rounded-sm shadow-sm text-sm'>
        Xóa tất cả
      </Button>
    </div>
  )
}

export default AsideFilter
