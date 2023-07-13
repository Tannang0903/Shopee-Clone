import Button from 'src/components/Button'
import { order as orderConstant } from 'src/constants/product.param'
import { QueryConfig } from '../ProductList'
import { sortBy } from 'src/constants/product.param'
import { ProductListConfig } from 'src/types/product.type'
import classNames from 'classnames'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const SortProductList = ({ queryConfig, pageSize }: Props) => {
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const page = Number(queryConfig.page)

  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='flex justify-between rounded-sm bg-[#ededed] px-6 py-3'>
      <div className='my-auto flex  items-center'>
        <h3 className=' my-auto mr-4'>Sắp xếp theo</h3>
        <Button
          className={classNames('mr-2 rounded-sm text-sm capitalize ', {
            'bg-orange px-4 py-[6px] text-white shadow-sm hover:bg-orange/80 ': isActiveSortBy(sortBy.view),
            'bg-white px-4 py-[6px] text-black hover:bg-gray-200': !isActiveSortBy(sortBy.view)
          })}
          onClick={() => handleSort(sortBy.view)}
        >
          Phổ biến
        </Button>
        <Button
          className={classNames('mr-2 rounded-sm text-sm capitalize ', {
            'bg-orange px-4 py-[6px] text-white shadow-sm hover:bg-orange/80 ': isActiveSortBy(sortBy.createdAt),
            'bg-white px-4 py-[6px] text-black hover:bg-gray-200': !isActiveSortBy(sortBy.createdAt)
          })}
          onClick={() => handleSort(sortBy.createdAt)}
        >
          Mới nhất
        </Button>
        <Button
          className={classNames('mr-2 rounded-sm text-sm capitalize ', {
            'bg-orange px-4 py-[6px] text-white shadow-sm hover:bg-orange/80 ': isActiveSortBy(sortBy.sold),
            'bg-white px-4 py-[6px] text-black hover:bg-gray-200': !isActiveSortBy(sortBy.sold)
          })}
          onClick={() => handleSort(sortBy.sold)}
        >
          Bán chạy
        </Button>
        <select
          className={classNames('w-[180px] rounded-sm px-4 py-[7px] text-sm shadow-sm outline-none', {
            'bg-orange px-4 py-[6px] text-white shadow-sm hover:bg-orange/80 ': isActiveSortBy(sortBy.price),
            'bg-white px-4 py-[6px] text-black hover:bg-gray-200': !isActiveSortBy(sortBy.price)
          })}
          value={order || ''}
          onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
        >
          <option value='' disabled className='bg-white text-black'>
            Giá
          </option>
          <option value={orderConstant.asc} className='bg-white text-black'>
            Giá: Thấp đến cao
          </option>
          <option value={orderConstant.desc} className='bg-white text-black'>
            Giá: cao đến thấp
          </option>
        </select>
      </div>
      <div className='flex items-center justify-end '>
        <div className='mr-2 text-[13px]'>
          <span className='text-orange'>{page}</span>/{pageSize}
        </div>
        <div className='flex items-center'>
          {page === 1 ? (
            <span className='mx-2 flex h-8 w-8 cursor-not-allowed items-center justify-center rounded bg-gray-300 text-gray-600 shadow-sm'>
              <i className='fa-solid fa-angle-left'></i>
            </span>
          ) : (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page - 1).toString()
                }).toString()
              }}
              className='mx-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-gray-300 text-gray-600 shadow-sm'
            >
              <i className='fa-solid fa-angle-left'></i>
            </Link>
          )}
          {page === pageSize ? (
            <span className='flex h-8 w-8 cursor-not-allowed items-center justify-center rounded bg-gray-300 text-gray-600 shadow-sm'>
              <i className='fa-solid fa-angle-right'></i>
            </span>
          ) : (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page + 1).toString()
                }).toString()
              }}
              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-gray-300 text-gray-600 shadow-sm'
            >
              <i className='fa-solid fa-angle-right'></i>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default SortProductList
