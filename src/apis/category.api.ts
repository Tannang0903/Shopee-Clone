import { Category } from 'src/types/category.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const categoryAPI = {
  getCategories: () => http.get<SuccessResponse<Category[]>>('/categories')
}

export default categoryAPI
