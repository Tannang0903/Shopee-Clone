import { useForm } from 'react-hook-form'
import useQueryConfig from './useQueryConfig'
import { InputSearchSchema, InputSearchType } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import path from 'src/constants/path'

const useSearchProducts = () => {
  const queryConfig = useQueryConfig()

  const { register, handleSubmit } = useForm<InputSearchType>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(InputSearchSchema)
  })

  const navigate = useNavigate()

  const handleSubmitSearchProduct = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return { register, handleSubmitSearchProduct }
}

export default useSearchProducts
