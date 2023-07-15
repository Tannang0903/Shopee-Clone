import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema, LoginSchemaType } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import authAPI from 'src/apis/auth.api'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import path from 'src/constants/path'

const Login = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(LoginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: LoginSchemaType) => {
      return authAPI.login(body)
    }
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate(path.home)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ErrorResponse<LoginSchemaType>>(error)) {
          const loginError = error.response?.data.data
          if (loginError?.email) {
            setError('email', {
              message: loginError.email,
              type: 'Server'
            })
          }
          if (loginError?.password) {
            setError('password', {
              message: loginError.password,
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
              <h1 className='text-xl'>Đăng nhập</h1>
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
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center rounded-sm bg-orange py-[10px] text-sm uppercase text-white'
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                >
                  Đăng Nhập
                </Button>
              </div>
              <div className='mt-1 flex justify-between'>
                <Link to={'/!'} className='mt-1  text-xs font-light text-blue-800'>
                  Quên mật khẩu
                </Link>
                <Link to={'/!'} className='mt-1 text-xs font-light text-blue-800'>
                  Đăng nhập với SMS
                </Link>
              </div>
              <footer className='mt-6 text-center'>
                <span className='mr-1 text-sm font-light text-[#b5b5b5]'>Bạn mới biết đến Shopee?</span>
                <Link to={path.register} className='text-sm font-normal text-[#ee4d2d]'>
                  Đăng ký
                </Link>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
