import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import { Category } from 'src/types/category.type'
import classNames from 'classnames'
import path from 'src/constants/path'
import InputNumber from 'src/components/InputNumber'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputNumberSchema } from 'src/utils/rules'
import RatingStar from '../RatingStar'
import omit from 'lodash/omit'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = {
  price_min: string | undefined
  price_max: string | undefined
}

const AsideFilter = ({ queryConfig, categories }: Props) => {
  const { category } = queryConfig

  const { t } = useTranslation('home')

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(InputNumberSchema),
    shouldFocusError: false
  })

  const navigate = useNavigate()

  const onsubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max as string,
        price_min: data.price_min as string
      }).toString()
    })
  })

  const handleRemoveAllFilter = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }

  return (
    <div className=''>
      <Link
        to={path.home}
        className={classNames('flex items-center border-b-[1px] border-gray-300/80 py-[16px]', {
          'text-orange': !category
        })}
      >
        <i className='fa-solid fa-bars'></i>
        <h3 className='ml-2 font-bold capitalize'>{t('aside filter.all categories')}</h3>
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
        <h3 className='ml-2 font-bold capitalize'>{t('aside filter.filter search')}</h3>
      </div>
      <div className='border-b-[1px] border-gray-300/80 py-[20px]'>
        <h4 className='pb-[12px] text-[16px] text-gray-700'>Khoảng giá</h4>
        <form onSubmit={onsubmit}>
          <div className='grid grid-cols-5'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    placeholder='Từ'
                    className='col-span-2'
                    classNameInput='w-full rounded-sm border border-gray-300 py-1 text-center text-[13px] font-light uppercase text-gray-500 outline-none'
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                    value={field.value}
                    ref={field.ref}
                  />
                )
              }}
            />
            <div className='col-span-1 flex items-center justify-center text-[10px] text-gray-400'>
              <i className='fa-solid fa-minus'></i>
            </div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    placeholder='Đến'
                    className='col-span-2'
                    classNameInput='w-full rounded-sm border border-gray-300 py-1 text-center text-[13px] font-light uppercase text-gray-500 outline-none'
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                    value={field.value}
                    ref={field.ref}
                  />
                )
              }}
            />
          </div>
          <div className=' min-h-[28px] text-center text-[13px] text-red-600'>{errors.price_min?.message}</div>
          <Button className=' w-full rounded-sm bg-orange py-[6px] text-sm uppercase text-white shadow-sm hover:bg-orange/80'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='border-b-[1px] border-gray-300/80 py-[20px]'>
        <h4 className='pb-[12px] text-[16px] text-gray-700'>Đánh giá</h4>
        <RatingStar queryConfig={queryConfig} />
      </div>
      <Button
        onClick={handleRemoveAllFilter}
        className='mt-[20px] w-full rounded-sm bg-orange py-[6px] text-sm uppercase text-white shadow-sm hover:bg-orange/80'
      >
        Xóa tất cả
      </Button>
    </div>
  )
}

export default AsideFilter
