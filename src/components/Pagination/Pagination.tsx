import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/pages/ProductList/ProductList'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
const RANGE = 2

const Pagination = ({ queryConfig, pageSize }: Props) => {
  const page = Number(queryConfig.page)

  const renderPagination = () => {
    let dotBefore = false
    let dotAfter = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span
            key={index}
            className='mx-2 flex h-8 w-8 items-center justify-center rounded bg-gray-300 text-gray-600 shadow-sm'
          >
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span
            key={index}
            className='mx-2 flex h-8 w-8 items-center justify-center rounded bg-gray-300 text-gray-600 shadow-sm'
          >
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber > RANGE && pageNumber < page - RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              'mx-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded text-center text-gray-600 shadow-sm',
              {
                'bg-red-300': pageNumber === page,
                'bg-gray-300': pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  return (
    <div className='mt-6 flex flex-wrap justify-center'>
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

      {renderPagination()}
      {page === pageSize ? (
        <span className='mx-2 flex h-8 w-8 cursor-not-allowed items-center justify-center rounded bg-gray-300 text-gray-600 shadow-sm'>
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
          className='mx-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-gray-300 text-gray-600 shadow-sm'
        >
          <i className='fa-solid fa-angle-right'></i>
        </Link>
      )}
    </div>
  )
}

export default Pagination
