import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
}

const RatingStar = ({ queryConfig }: Props) => {
  const navigate = useNavigate()

  const handleFilterStar = (ratingFilter: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(ratingFilter)
      }).toString()
    })
  }

  return (
    <ul className='pl-2'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <li className='mt-2 flex items-center' key={index}>
            <button className='mr-2 flex text-sm text-[#efc243]' onClick={() => handleFilterStar(5 - index)}>
              {Array(5)
                .fill(0)
                .map((_, indexStar) => {
                  if (indexStar < 5 - index) return <i className='fa-solid fa-star mr-[4px]' />
                  else return <i className='fa-regular fa-star mr-[4px]'></i>
                })}
            </button>
            {index !== 0 && <span>trở lên</span>}
          </li>
        ))}
    </ul>
  )
}

export default RatingStar
