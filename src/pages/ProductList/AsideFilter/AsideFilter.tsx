import { Link, createSearchParams } from 'react-router-dom'
import Button from 'src/components/Button'
import { Category } from 'src/types/category.type'
import { QueryConfig } from '../ProductList'
import classNames from 'classnames'
import path from 'src/constants/path'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

const AsideFilter = ({ queryConfig, categories }: Props) => {
  const { category } = queryConfig
  return (
    <div className=''>
      <Link
        to={'/'}
        className={classNames('flex items-center border-b-[1px] border-gray-300/80 py-[16px]', {
          'text-orange': !category
        })}
      >
        <i className='fa-solid fa-bars'></i>
        <h3 className='ml-2 font-bold capitalize'>Tất cả danh mục</h3>
      </Link>
      <div className='py-[20px]'>
        <ul className='pl-4 text-[14px]'>
          {categories.map((categoryItem) => {
            const isActive = category === categoryItem._id
            return (
              <li className='pb-2 capitalize' key={categoryItem._id}>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItem._id
                    }).toString()
                  }}
                  className={classNames('relative ', {
                    'font-semibold text-orange': isActive
                  })}
                >
                  {isActive && (
                    <svg viewBox='0 0 4 7' className='absolute left-[-12px] top-[4px] h-2 w-2 fill-orange'>
                      <polygon points='4 3.5 0 0 0 7'></polygon>
                    </svg>
                  )}
                  {categoryItem.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='flex items-center border-b-[1px] border-gray-300/80 py-[16px]'>
        <i className='fa-solid fa-filter'></i>
        <h3 className='ml-2 font-bold capitalize'>Bộ lọc tìm kiếm</h3>
      </div>
      <div className='border-b-[1px] border-gray-300/80 py-[20px]'>
        <h4 className='pb-[12px] text-[16px] text-gray-700'>Khoảng giá</h4>
        <form>
          <div className='grid grid-cols-5'>
            <input
              type='text'
              placeholder='Từ'
              className='col-span-2 rounded-sm border border-gray-300 py-1 text-center text-[13px] font-light uppercase text-gray-500 outline-none'
            />
            <div className='col-span-1 text-center text-gray-400'>-</div>
            <input
              type='text'
              placeholder='đến'
              className='col-span-2 rounded-sm border border-gray-300 py-1 text-center text-[13px] font-light uppercase text-gray-500 outline-none'
            />
          </div>
          <Button className='mt-[16px] w-full rounded-sm bg-orange py-[6px] text-sm uppercase text-white shadow-sm hover:bg-orange/80'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='border-b-[1px] border-gray-300/80 py-[20px]'>
        <h4 className='pb-[12px] text-[16px] text-gray-700'>Đánh giá</h4>
        <ul className='pl-2'>
          <li className='mt-2'>
            <Link to={'/!'} className='text-sm text-[#efc243]'>
              <i className='fa-solid fa-star' />
              <i className='fa-solid fa-star' />
              <i className='fa-solid fa-star' />
              <i className='fa-solid fa-star' />
              <i className='fa-solid fa-star' />
            </Link>
          </li>
          <li className='mt-2 flex items-center'>
            <Link to={'/!'} className='mr-2 flex text-sm text-[#efc243]'>
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
      <Button className='mt-[20px] w-full rounded-sm bg-orange py-[6px] text-sm uppercase text-white shadow-sm hover:bg-orange/80'>
        Xóa tất cả
      </Button>
    </div>
  )
}

export default AsideFilter
