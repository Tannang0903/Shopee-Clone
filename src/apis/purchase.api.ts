import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const purchaseAPI = {
  addToCart: (body: { product_id: string; buy_count: number }) =>
    http.post<SuccessResponse<Purchase>>('purchases/add-to-cart', body),

  getPurchases: (params: { status: PurchaseListStatus }) =>
    http.get<SuccessResponse<Purchase[]>>('purchases/', {
      params: params
    }),

  buyProducts: (body: { product_id: string; buy_count: number }[]) =>
    http.post<SuccessResponse<Purchase[]>>('purchases/buy-products', body),

  updatePurchase: (body: { purchase_id: string; buy_count: number }) =>
    http.put<SuccessResponse<Purchase>>('/purchases/update-purchase', body),

  deletePurchase: (purchasesId: string[]) =>
    http.delete<SuccessResponse<{ deleted_count: number }>>('/purchases', {
      data: purchasesId
    })
}

export default purchaseAPI
