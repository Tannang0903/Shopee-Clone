import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema, LoginSchemaType } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import authAPI from 'src/apis/auth.api'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { Fragment, useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import Input from 'src/components/Input'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const Login = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const { t } = useTranslation('form')

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
    <Fragment>
      <Helmet>
        <title>Đăng nhập</title>
        <meta name='description' content='Đây là trang đăng nhập của dự án Shopee Clone' />
      </Helmet>
      <div className='h-[600px] bg-[url("https://down-vn.img.susercontent.com/file/sg-11134004-7qvfc-lisjisjilfqv70")] bg-cover bg-center bg-no-repeat'>
        <div className='container px-[60px]'>
          <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-[60px]'>
            <div className='rounded-sm bg-white p-[30px] lg:col-span-2 lg:col-start-4 '>
              <form onSubmit={onSubmit} noValidate>
                <h1 className='text-xl'>{t('log in.log in')}</h1>
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
                  placeholder={t('form.password')}
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
                    {t('log in.log in')}
                  </Button>
                </div>
                <div className='mt-1 flex justify-between'>
                  <Link to={'/forget-password'} className='mt-1  text-xs font-light text-blue-800'>
                    {t('log in.forget password')}
                  </Link>
                  <Link to={'/login-with-sms'} className='mt-1 text-xs font-light text-blue-800'>
                    {t('log in.log in with phone number')}
                  </Link>
                </div>
                <footer className='mt-6 text-center'>
                  <span className='mr-1 text-sm font-light text-[#b5b5b5]'>{t('log in.new to shopee')}</span>
                  <Link to={path.register} className='text-sm font-normal text-[#ee4d2d]'>
                    {t('register.register')}
                  </Link>
                </footer>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Login
