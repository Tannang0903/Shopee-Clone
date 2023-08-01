import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import { Fragment, useContext, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import purchaseAPI from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'
import { useTranslation } from 'react-i18next'

const Cart = () => {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)

  const { t } = useTranslation('cart')

  const PurchasesInCartQuery = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseAPI.getPurchases({ status: purchasesStatus.inCart })
  })
  const purchasesInCart = PurchasesInCartQuery.data?.data.data

  const UpdatePurchasesMutation = useMutation({
    mutationFn: purchaseAPI.updatePurchase,
    onSuccess: () => {
      PurchasesInCartQuery.refetch()
    }
  })

  const BuyProductsMutation = useMutation({
    mutationFn: purchaseAPI.buyProducts,
    onSuccess: (data) => {
      toast.success(data.data.message)
      PurchasesInCartQuery.refetch()
    }
  })

  const DeletePurchasesMutation = useMutation({
    mutationFn: purchaseAPI.deletePurchase,
    onSuccess: () => {
      PurchasesInCartQuery.refetch()
    }
  })

  const location = useLocation()
  const chosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId

  const isAllChecked = useMemo(() => extendedPurchases.every((purchase) => purchase.checked), [extendedPurchases])
  const isPurchasesChecked = useMemo(
    () => extendedPurchases.filter((purchase) => purchase.checked),
    [extendedPurchases]
  )
  const purchasesCheckedCount = isPurchasesChecked.length
  const totalPurchasesCheckedPrice = useMemo(
    () =>
      isPurchasesChecked.reduce((total, current) => {
        return total + current.product.price * current.buy_count
      }, 0),
    [isPurchasesChecked]
  )
  const totalPurchasesCheckedSavingPrice = useMemo(
    () =>
      isPurchasesChecked.reduce((total, current) => {
        return total + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [isPurchasesChecked]
  )

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const isChosenPurchaseFromLocation = chosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChosenPurchaseFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchasesInCart, chosenPurchaseIdFromLocation, setExtendedPurchases])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  })

  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleAllCheck = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleTypeQuantity = (purchaseIndex: number, value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      console.log({ purchase_id: purchase.product._id })

      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      UpdatePurchasesMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleDeletePurchase = (purchaseIndex: number) => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    DeletePurchasesMutation.mutate([purchaseId])
  }

  const handleDeleteListPurchases = () => {
    const purchaseIds = isPurchasesChecked.map((purchase) => purchase._id)
    DeletePurchasesMutation.mutate(purchaseIds)
  }

  const handleBuyProducts = () => {
    if (isPurchasesChecked.length > 0) {
      const body = isPurchasesChecked.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      BuyProductsMutation.mutate(body)
    }
  }

  return (
    <Fragment>
      <Helmet>
        <title>Giỏ hàng</title>
        <meta name='description' content='Đây là trang giỏ hàng của dự án Shopee Clone' />
      </Helmet>
      <div className='bg-[#f5f5f5] py-8'>
        {extendedPurchases && extendedPurchases.length > 0 ? (
          <div>
            <div className='container'>
              <div className=' grid w-full grid-cols-12 rounded-sm bg-white p-4 shadow-sm'>
                <div className='col-span-6 flex items-center'>
                  <input
                    type='checkbox'
                    className='mx-6 h-5 w-5 flex-shrink-0 border-[1px] border-gray-200 p-2 accent-orange'
                    checked={isAllChecked}
                    onChange={handleAllCheck}
                  />
                  <span className='flex-grow text-[15px] capitalize text-gray-600'>{t('table heading.product')}</span>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-5 text-center text-[15px] capitalize text-gray-600'>
                    <span className='col-span-2'>{t('table heading.unit price')}</span>
                    <span className='col-span-1'>{t('table heading.quantity')}</span>
                    <span className='col-span-1'>{t('table heading.total price')}</span>
                    <span className='col-span-1'>{t('table heading.actions')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='container'>
              {extendedPurchases?.map((purchase, index) => (
                <div
                  className='my-4 grid w-full grid-cols-12 items-center rounded-sm  bg-white p-4 shadow-sm'
                  key={index}
                >
                  <div className='col-span-6 flex items-center'>
                    <input
                      type='checkbox'
                      className='mx-6 h-5 w-5 flex-shrink-0 border-[1px] border-gray-200 p-2 accent-orange'
                      checked={purchase.checked}
                      onChange={handleCheck(index)}
                    />
                    <Link to={`${path.home}${purchase.product._id}`} className='flex items-center'>
                      <div className='mr-2'>
                        <img src={purchase.product.image} alt={purchase.product.name} className='h-[80px] w-[80px]' />
                      </div>
                      <div className='max-w-[70%] overflow-hidden text-[15px] line-clamp-2'>
                        <p>{purchase.product.name}</p>
                      </div>
                    </Link>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center text-[15px] capitalize text-gray-600 '>
                      <div className='col-span-2  text-[14px]'>
                        <span className='mr-2 text-gray-400 line-through'>
                          {formatCurrency(purchase.product.price_before_discount)}
                        </span>
                        <span className='text-black'>{formatCurrency(purchase.product.price)}</span>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          value={purchase.buy_count}
                          max={purchase.product.quantity}
                          onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                          onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                          onType={(value) => handleTypeQuantity(index, value)}
                          onFocusOut={(value) =>
                            handleQuantity(
                              index,
                              value,
                              value >= 1 &&
                                value <= purchase.product.quantity &&
                                value !== (purchasesInCart as Purchase[])[index].buy_count
                            )
                          }
                          disabled={purchase.disabled}
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-[14px] text-orange'>
                          {formatCurrency(purchase.buy_count * purchase.product.price)}
                        </span>
                      </div>
                      <div className='col-span-1'>
                        <button onClick={() => handleDeletePurchase(index)} className='text-red-500'>
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
                              d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='container sticky bottom-0 mt-4 rounded-sm shadow-[rgba(17,_17,_26,_0.1)_0px_0px_4px]'>
              <div className='grid grid-cols-12 bg-white p-6'>
                <div className='col-span-4 flex items-center'>
                  <input
                    type='checkbox'
                    className=' h-5 w-5 flex-shrink-0 border-[1px] border-gray-200 p-2 accent-orange'
                    checked={isAllChecked}
                    onChange={handleAllCheck}
                  />
                  <button className='mx-6 capitalize' onClick={handleAllCheck}>
                    {t('footer.select all')} ({extendedPurchases?.length})
                  </button>
                  <button onClick={handleDeleteListPurchases} className='text-red-500'>
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
                        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                      />
                    </svg>
                  </button>
                </div>
                <div className='col-span-8 flex items-center justify-end'>
                  <div>
                    <div className='flex items-center'>
                      <span className='mr-1 text-[14px]'>
                        {t('footer.total')} ({purchasesCheckedCount} {t('footer.item')}):
                      </span>
                      <span className='mx-4 text-[20px] text-orange'>{formatCurrency(totalPurchasesCheckedPrice)}</span>
                    </div>
                    <div className='flex items-center justify-end text-[14px]'>
                      <span className='mr-1'>{t('footer.saved')}</span>
                      <span className='mx-4 text-orange'>
                        {formatNumberToSocialStyle(totalPurchasesCheckedSavingPrice)}
                      </span>
                    </div>
                  </div>
                  <Button
                    className='flex items-center rounded-sm bg-orange px-14 py-2 text-[16px] text-white shadow-sm'
                    onClick={handleBuyProducts}
                    disabled={BuyProductsMutation.isLoading}
                    isLoading={BuyProductsMutation.isLoading}
                  >
                    <span>{t('footer.check out')}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='my-10 flex flex-col items-center justify-center'>
            <img
              src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9bdd8040b334d31946f49e36beaf32db.png'
              alt='Empty Cart'
              className='w-[120px]'
            />
            <div className='my-4 text-[16px] text-gray-500'>{t('empty cart.your shopping cart is empty')}</div>
            <Link
              to={path.home}
              className='h-[36px] rounded-sm bg-orange px-[24px] text-[16px] uppercase leading-[36px] text-white shadow-sm hover:bg-orange/80'
            >
              {t('empty cart.go shopping now')}
            </Link>
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default Cart
