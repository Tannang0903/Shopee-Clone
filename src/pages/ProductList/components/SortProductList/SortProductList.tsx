import Button from 'src/components/Button'
import { sortBy, order as orderConstant } from 'src/constants/product.param'
import { ProductListConfig } from 'src/types/product.type'
import classNames from 'classnames'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import omit from 'lodash/omit'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const SortProductList = ({ queryConfig, pageSize }: Props) => {
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const page = Number(queryConfig.page)

  const navigate = useNavigate()

  const { t } = useTranslation('home')

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
        <h3 className=' my-auto mr-4'>{t('sort products.sort by')}</h3>
        <Button
          className={classNames('mr-2 rounded-sm text-sm capitalize ', {
            'bg-orange px-4 py-[6px] text-white shadow-sm hover:bg-orange/80 ': isActiveSortBy(sortBy.view),
            'bg-white px-4 py-[6px] text-black hover:bg-gray-200': !isActiveSortBy(sortBy.view)
          })}
          onClick={() => handleSort(sortBy.view)}
        >
          {t('sort products.popular')}
        </Button>
        <Button
          className={classNames('mr-2 rounded-sm text-sm capitalize ', {
            'bg-orange px-4 py-[6px] text-white shadow-sm hover:bg-orange/80 ': isActiveSortBy(sortBy.createdAt),
            'bg-white px-4 py-[6px] text-black hover:bg-gray-200': !isActiveSortBy(sortBy.createdAt)
          })}
          onClick={() => handleSort(sortBy.createdAt)}
        >
          {t('sort products.latest')}
        </Button>
        <Button
          className={classNames('mr-2 rounded-sm text-sm capitalize ', {
            'bg-orange px-4 py-[6px] text-white shadow-sm hover:bg-orange/80 ': isActiveSortBy(sortBy.sold),
            'bg-white px-4 py-[6px] text-black hover:bg-gray-200': !isActiveSortBy(sortBy.sold)
          })}
          onClick={() => handleSort(sortBy.sold)}
        >
          {t('sort products.top sales')}
        </Button>
        <select
          className={classNames(
            'w-[180px] rounded-sm bg-white px-4 py-[7px] text-sm shadow-sm outline-none hover:bg-gray-200',
            {
              'text-orange': isActiveSortBy(sortBy.price),
              'text-black': !isActiveSortBy(sortBy.price)
            }
          )}
          value={order || ''}
          onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
        >
          <option value='' disabled className='bg-white text-black'>
            {t('sort products.price')}
          </option>
          <option value={orderConstant.asc} className='bg-white text-black'>
            {t('sort products.low to high')}
          </option>
          <option value={orderConstant.desc} className='bg-white text-black'>
            {t('sort products.high to low')}
          </option>
        </select>
      </div>
      <div className='flex items-center justify-end'>
        <div className='mr-2 text-[13px]'>
          <span className='text-orange'>{page}</span>/{pageSize}
        </div>
        <div className='flex items-center'>
          {page === 1 ? (
            <span className='mx-2 flex h-8 w-8 cursor-not-allowed items-center justify-center rounded bg-gray-300 text-gray-600 shadow-sm'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
                <path
                  fillRule='evenodd'
                  d='M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z'
                  clipRule='evenodd'
                />
              </svg>
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
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
                <path
                  fillRule='evenodd'
                  d='M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z'
                  clipRule='evenodd'
                />
              </svg>
            </Link>
          )}
          {page === pageSize ? (
            <span className='flex h-8 w-8 cursor-not-allowed items-center justify-center rounded bg-gray-300 text-gray-600 shadow-sm'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
                <path
                  fillRule='evenodd'
                  d='M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z'
                  clipRule='evenodd'
                />
              </svg>
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
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
                <path
                  fillRule='evenodd'
                  d='M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z'
                  clipRule='evenodd'
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default SortProductList
