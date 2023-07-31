import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterSchema, RegisterSchemaType } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import authAPI from 'src/apis/auth.api'
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { Fragment, useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import Input from 'src/components/Input'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const Register = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const { t } = useTranslation('form')

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
    <Fragment>
      <Helmet>
        <title>Đăng kí</title>
        <meta name='description' content='Đây là trang đăng kí của dự án Shopee Clone' />
      </Helmet>
      <div className='h-[600px] bg-[url("https://down-vn.img.susercontent.com/file/sg-11134004-7qvfc-lisjisjilfqv70")] bg-cover bg-center bg-no-repeat'>
        <div className='container px-[60px]'>
          <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-[60px]'>
            <div className='rounded-sm bg-white p-[30px] lg:col-span-2 lg:col-start-4 '>
              <form onSubmit={onSubmit} noValidate>
                <h1 className='text-xl'>{t('register.register')}</h1>
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
                <Input
                  type='password'
                  name='confirm_password'
                  register={register}
                  placeholder={t('form.confirm password')}
                  className='relative mt-3'
                  errorMessage={errors.confirm_password?.message}
                  autoComplete='on'
                />
                <div className='mt-3'>
                  <Button
                    type='submit'
                    className='flex w-full items-center justify-center rounded-sm bg-orange py-[10px] text-sm uppercase text-white'
                    isLoading={registerAccountMutation.isLoading}
                    disabled={registerAccountMutation.isLoading}
                  >
                    {t('register.register')}
                  </Button>
                </div>
                <footer className='mt-6 text-center'>
                  <span className='mr-1 text-sm font-light text-[#b5b5b5]'>
                    {t('register.do you already have an account?')}
                  </span>
                  <Link to={path.login} className='text-sm font-normal text-[#ee4d2d]'>
                    {t('log in.log in')}
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

export default Register
