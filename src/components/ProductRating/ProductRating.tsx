import classNames from 'classnames'

interface Props {
  rating: number
  size: string
  color: string
}

const ProductRating = ({ rating, size, color }: Props) => {
  const handleRate = (order: number) => {
    if (order <= rating) {
      return '100%'
    }
    if (order > rating && order - rating < 1) {
      return Math.ceil((rating - Math.floor(rating)) * 100) + '%'
    }
    return '0%'
  }
  return (
    <div className='flex items-center'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div className='relative' key={index}>
            <div
              className={classNames(`absolute left-0 top-0 z-10 h-full overflow-hidden`)}
              style={{ width: handleRate(index + 1) }}
            >
              <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className={`${size} ${color}`}>
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div>
            <svg
              enableBackground='new 0 0 15 15'
              viewBox='0 0 15 15'
              x={0}
              y={0}
              className={`${size} fill-current text-gray-300`}
            >
              <polygon
                points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </svg>
          </div>
        ))}
    </div>
  )
}

export default ProductRating
