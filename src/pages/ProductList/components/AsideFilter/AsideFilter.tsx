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
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
        </svg>
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
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
          />
        </svg>
        <h3 className='ml-2 font-bold capitalize'>{t('aside filter.filter search')}</h3>
      </div>
      <div className='border-b-[1px] border-gray-300/80 py-[20px]'>
        <h4 className='pb-[12px] text-[16px] capitalize text-gray-700'>{t('aside filter.price range')}</h4>
        <form onSubmit={onsubmit}>
          <div className='grid grid-cols-5'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    placeholder={t('aside filter.to')}
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
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-5 w-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
              </svg>
            </div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    placeholder={t('aside filter.from')}
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
            {t('aside filter.apply')}
          </Button>
        </form>
      </div>
      <div className='border-b-[1px] border-gray-300/80 py-[20px]'>
        <h4 className='pb-[12px] text-[16px] text-gray-700'>{t('aside filter.rating')}</h4>
        <RatingStar queryConfig={queryConfig} />
      </div>
      <Button
        onClick={handleRemoveAllFilter}
        className='mt-[20px] w-full rounded-sm bg-orange py-[6px] text-sm uppercase text-white shadow-sm hover:bg-orange/80'
      >
        {t('aside filter.remove all')}
      </Button>
    </div>
  )
}

export default AsideFilter
