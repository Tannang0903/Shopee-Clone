import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterSchema, RegisterSchemaType } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegisterSchemaType>({
    resolver: yupResolver(RegisterSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<RegisterSchemaType, 'confirm_password'>) => {
      return registerAccount(body)
    }
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ResponseApi<Omit<RegisterSchemaType, 'confirm_password'>>>(error)) {
          const registerError = error.response?.data.data
          if (registerError?.email) {
            setError('email', {
              message: registerError.email,
              type: 'Server'
            })
          }
          if (registerError?.password) {
            setError('password', {
              message: registerError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-[url("https://down-vn.img.susercontent.com/file/sg-11134004-7qvfc-lisjisjilfqv70")] bg-no-repeat bg-cover bg-center h-[600px]'>
      <div className='container px-[60px]'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-[60px]'>
          <div className='lg:col-span-2 lg:col-start-4 bg-white rounded-sm p-[30px] '>
            <form onSubmit={onSubmit} noValidate>
              <h1 className='text-xl'>Đăng kí</h1>
              <div className='mt-8'>
                <input
                  type='email'
                  className='py-2 px-3 w-full outline-none rounded-sm border border-gray-300 focus:border-gray-500 focus:shadow font-light'
                  placeholder='Email'
                  {...register('email')}
                />
                <span className='block min-h-[16px] text-red-700 text-xs mt-1 font-light'>{errors.email?.message}</span>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  className='py-2 px-3 w-full outline-none rounded-sm border border-gray-300 focus:border-gray-500 focus:shadow font-light'
                  placeholder='Mật khẩu'
                  autoComplete='on'
                  {...register('password')}
                />
                <span className='block min-h-[16px] text-red-700 text-xs mt-1 font-light'>
                  {errors.password?.message}
                </span>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  className='py-2 px-3 w-full outline-none rounded-sm border border-gray-300 focus:border-gray-500 focus:shadow font-light'
                  placeholder='Xác nhận mật khẩu'
                  autoComplete='on'
                  {...register('confirm_password')}
                />
                <span className='block min-h-[16px] text-red-700 text-xs mt-1 font-light'>
                  {errors.confirm_password?.message}
                </span>
              </div>
              <div className='mt-3'>
                <button type='submit' className='w-full bg-orange text-white py-[10px] rounded-sm uppercase text-sm'>
                  Đăng kí
                </button>
              </div>
              <footer className='mt-6 text-center'>
                <span className='text-sm text-[#b5b5b5] font-light mr-1'>Bạn đã có tài khoản?</span>
                <Link to={'/login'} className='text-sm text-[#ee4d2d] font-normal'>
                  Đăng nhập
                </Link>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
