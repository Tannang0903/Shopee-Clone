import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import { useContext, useEffect, useMemo } from 'react'
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

const Cart = () => {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)

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
                <div className='flex-grow text-[15px] capitalize text-gray-600'>Sản phẩm</div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center text-[15px] capitalize text-gray-600'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
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
                      <button onClick={() => handleDeletePurchase(index)}>
                        <i className='fa-solid fa-trash'></i>
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
                  Chọn tất cả ({extendedPurchases?.length})
                </button>
                <button onClick={handleDeleteListPurchases}>
                  <i className='fa-solid fa-trash'></i>
                </button>
              </div>
              <div className='col-span-8 flex items-center justify-end'>
                <div>
                  <div className='flex items-center'>
                    <span className='mr-1 text-[14px]'>Tổng thanh toán ({purchasesCheckedCount} Sản phẩm):</span>
                    <span className='mx-4 text-[20px] text-orange'>{formatCurrency(totalPurchasesCheckedPrice)}</span>
                  </div>
                  <div className='flex items-center justify-end text-[14px]'>
                    <span className='mr-1'>Tiết kiệm</span>
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
                  <span>Mua hàng</span>
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
          <div className='my-4 text-[16px] text-gray-500'>Giỏ hàng của bàn còn trống</div>
          <Link
            to={path.home}
            className='h-[36px] rounded-sm bg-orange px-[24px] text-[16px] uppercase leading-[36px] text-white shadow-sm hover:bg-orange/80'
          >
            Mua ngay
          </Link>
        </div>
      )}
    </div>
  )
}

export default Cart
