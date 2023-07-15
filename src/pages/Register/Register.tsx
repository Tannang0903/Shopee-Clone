import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterSchema, RegisterSchemaType } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import authAPI from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import path from 'src/constants/path'

const Register = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

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
      return authAPI.registerAccount(body)
    }
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate(path.home)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ErrorResponse<Omit<RegisterSchemaType, 'confirm_password'>>>(error)) {
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
    <div className='h-[600px] bg-[url("https://down-vn.img.susercontent.com/file/sg-11134004-7qvfc-lisjisjilfqv70")] bg-cover bg-center bg-no-repeat'>
      <div className='container px-[60px]'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-[60px]'>
          <div className='rounded-sm bg-white p-[30px] lg:col-span-2 lg:col-start-4 '>
            <form onSubmit={onSubmit} noValidate>
              <h1 className='text-xl'>Đăng kí</h1>
              <div className='mt-8'>
                <input
                  type='email'
                  className='w-full rounded-sm border border-gray-300 px-3 py-2 font-light outline-none focus:border-gray-500 focus:shadow'
                  placeholder='Email'
                  {...register('email')}
                />
                <span className='mt-1 block min-h-[16px] text-xs font-light text-red-700'>{errors.email?.message}</span>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  className='w-full rounded-sm border border-gray-300 px-3 py-2 font-light outline-none focus:border-gray-500 focus:shadow'
                  placeholder='Mật khẩu'
                  autoComplete='on'
                  {...register('password')}
                />
                <span className='mt-1 block min-h-[16px] text-xs font-light text-red-700'>
                  {errors.password?.message}
                </span>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  className='w-full rounded-sm border border-gray-300 px-3 py-2 font-light outline-none focus:border-gray-500 focus:shadow'
                  placeholder='Xác nhận mật khẩu'
                  autoComplete='on'
                  {...register('confirm_password')}
                />
                <span className='mt-1 block min-h-[16px] text-xs font-light text-red-700'>
                  {errors.confirm_password?.message}
                </span>
              </div>
              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center rounded-sm bg-orange py-[10px] text-sm uppercase text-white'
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                >
                  Đăng Nhập
                </Button>
              </div>
              <footer className='mt-6 text-center'>
                <span className='mr-1 text-sm font-light text-[#b5b5b5]'>Bạn đã có tài khoản?</span>
                <Link to={path.login} className='text-sm font-normal text-[#ee4d2d]'>
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
