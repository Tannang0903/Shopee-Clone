/* eslint-disable import/no-unresolved */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productAPI from 'src/apis/product.api'
import ProductRating from 'src/components/ProductRating'
import { Product as ProductType, ProductListConfig } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, rateSale } from 'src/utils/utils'
import Product from '../ProductList/components/Product'
import QuantityController from 'src/components/QuantityController'
import purchaseAPI from 'src/apis/purchase.api'
import { purchasesStatus } from 'src/constants/purchase'
import { toast } from 'react-toastify'
import path from 'src/constants/path'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

const ProductDetail = () => {
  const { id } = useParams()

  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')

  const [buyCount, setBuyCount] = useState<number>(1)

  const imageRef = useRef(null)

  const navigate = useNavigate()

  const { t } = useTranslation('product')

  const queryClient = useQueryClient()

  const ProductQuery = useQuery({
    queryKey: ['product', id],
    queryFn: () => productAPI.getProductsDetail(id as string)
  })
  const product = ProductQuery.data?.data.data

  const queryConfig: ProductListConfig = { limit: '10', page: '1', category: product?.category._id }
  const ProductListQuery = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productAPI.getProducts(queryConfig as ProductListConfig),
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })
  const productsData = ProductListQuery.data

  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseAPI.addToCart(body)
  })

  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const chooseActiveImage = (image: string) => {
    setActiveImage(image)
  }

  const nextSliderImage = () => {
    if (currentIndexImages[1] < (product as ProductType)?.images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prevSliderImage = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoomImage = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const image = imageRef.current as unknown as HTMLImageElement
    const { naturalHeight, naturalWidth } = image

    const rect = event.currentTarget.getBoundingClientRect()
    const { offsetX, offsetY } = event.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)

    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoomImage = () => (imageRef.current as unknown as HTMLImageElement)?.removeAttribute('style')

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const handleAddToCart = () => {
    addToCartMutation.mutate(
      { product_id: product?._id as string, buy_count: buyCount },
      {
        onSuccess: (data) => {
          toast.success(data.data.message)
          queryClient.invalidateQueries({
            queryKey: ['purchases', { status: purchasesStatus.inCart }]
          })
        }
      }
    )
  }

  const handleBuyNow = async () => {
    const response = await addToCartMutation.mutateAsync({ product_id: product?._id as string, buy_count: buyCount })
    const purchase = response.data.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  if (!product) return null

  return (
    <Fragment>
      <Helmet>
        <title>{product.name}</title>
        <meta name='description' content='Đây là trang mô tả sản phẩm của dự án Shopee Clone' />
      </Helmet>
      <div className='bg-gray-100 py-[60px]'>
        <div>
          <div className='container grid grid-cols-12 gap-8 rounded-sm bg-white p-4 shadow'>
            <div className='col-span-5'>
              <div
                onMouseMove={handleZoomImage}
                onMouseLeave={handleRemoveZoomImage}
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%] shadow'
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className='pointer-events-none absolute left-0 top-0 h-full w-full bg-white object-contain'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-2'>
                <button
                  onClick={prevSliderImage}
                  className='absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded bg-black/20 py-1 text-white hover:bg-black/10'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((image) => {
                  const isActive = image === activeImage
                  return (
                    <div
                      className='relative w-full pt-[100%]'
                      key={image}
                      onMouseEnter={() => chooseActiveImage(image)}
                    >
                      <img
                        src={image}
                        alt={product.name}
                        className='absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-contain'
                      />
                      {isActive && <div className='absolute inset-0 border-[1px] border-orange' />}
                    </div>
                  )
                })}
                <button
                  onClick={nextSliderImage}
                  className='absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded bg-black/20  py-1 text-white hover:bg-black/10'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <div className='overflow-hidden'>
                <div className='min-h-[56px] text-start text-xl leading-8 line-clamp-2'>
                  <div className='mr-3 inline-flex -translate-y-[12%] rounded-sm bg-orange px-2 py-[2px] text-xs capitalize text-white shadow-sm'>
                    {t('preferred')}
                  </div>
                  <span className=''>{product.name}</span>
                </div>
              </div>
              <div className='mt-2 flex items-center'>
                <div className='flex items-center pr-6'>
                  <span className='mr-2 inline-block border-b-[1px] border-orange text-[16px] font-normal leading-[18px] text-orange'>
                    {product.rating}
                  </span>
                  <ProductRating rating={product.rating} size='h-4 w-4' color='fill-orange text-orange' />
                </div>
                <div className='border-x-[1px] border-gray-400/70 px-6 leading-6'>
                  <span className='mr-2 border-b-[1px] border-gray-500 text-[16px] font-normal '>
                    {formatNumberToSocialStyle(product.view)}
                  </span>
                  <span className='text-[14px] capitalize text-gray-500'>{t('views')}</span>
                </div>
                <div className='px-6'>
                  <span className='mr-2 border-b-[1px] border-gray-500 text-[16px] font-normal'>
                    {formatNumberToSocialStyle(product.sold)}
                  </span>
                  <span className='text-[14px] capitalize text-gray-500'>{t('sold')}</span>
                </div>
              </div>
              <div className='mt-3 flex items-center bg-[#fafafa] px-5 py-5'>
                <span className=' text-[16px] text-gray-400 line-through'>
                  {formatCurrency(product.price_before_discount)}
                </span>
                <span className='mx-4 text-[28px] text-orange '>{formatCurrency(product.price)}</span>
                <div className='rounded-sm bg-orange px-[4px] text-[12px] font-bold leading-4 text-white shadow-sm '>
                  <span>
                    {rateSale(product.price_before_discount, product.price)} {t('off')}
                  </span>
                </div>
              </div>
              <div className='mt-6 grid grid-cols-6'>
                <span className='col-span-1 ml-5 text-[14px] capitalize text-gray-500'>{t('quantity')}</span>
                <div className='col-span-5 flex'>
                  <QuantityController
                    onDecrease={handleBuyCount}
                    onIncrease={handleBuyCount}
                    onType={handleBuyCount}
                    value={buyCount}
                    max={product.quantity}
                  />
                  <div className='ml-5 text-[14px] text-gray-500'>
                    <span className='mr-1'>{product.quantity}</span>
                    <span>{t('available')}</span>
                  </div>
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  onClick={handleAddToCart}
                  className='mx-5 flex h-[48px] items-center rounded-sm border border-orange bg-[#ffeee8] px-4 text-orange shadow-sm'
                >
                  <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 576 512' className='fill-orange'>
                    <path d='M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z' />
                  </svg>
                  <span className='ml-2 capitalize'>{t('add to cart')}</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className='h-[48px] rounded-sm bg-orange px-4 capitalize text-white shadow-sm'
                >
                  {t('buy now')}
                </button>
              </div>
            </div>
          </div>
          <div className='container mt-6 grid grid-cols-12 gap-6'>
            <div className='col-span-9'>
              <div className='mb-6 rounded-sm bg-white p-6 shadow'>
                <h3 className='rounded-sm bg-gray-100/50 px-4 py-2 text-[18px] uppercase shadow-sm'>
                  {t('product description')}
                </h3>
                <div className='mt-8 text-[13px]'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.description
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <h3 className='rounded-sm text-[16px] uppercase'>{t('from the same shop')}</h3>
                {productsData && (
                  <div className='mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                    {ProductListQuery.data?.data.data.products.map((product) => (
                      <div className='col-span-1' key={product._id}>
                        <Product product={product} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='col-span-3 rounded-sm bg-white p-6 shadow'>
              <h4>{t('top selling products')}</h4>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ProductDetail
