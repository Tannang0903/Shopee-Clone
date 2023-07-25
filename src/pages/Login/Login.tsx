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
import Input from 'src/components/Input'

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
              <Input
                type='email'
                name='email'
                register={register}
                placeholder='Email'
                className='mt-8'
                errorMessage={errors.email?.message}
                autoComplete='on'
              />
              <Input
                type='password'
                name='password'
                register={register}
                placeholder='Mật khẩu'
                className='relative mt-3'
                errorMessage={errors.password?.message}
                autoComplete='on'
              />
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
                <Link to={'/forget-password'} className='mt-1  text-xs font-light text-blue-800'>
                  Quên mật khẩu
                </Link>
                <Link to={'/login-with-sms'} className='mt-1 text-xs font-light text-blue-800'>
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
