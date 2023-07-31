import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import UserAPI from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { UserSchema, UserSchemaType } from 'src/utils/rules'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

type FormData = Pick<UserSchemaType, 'password' | 'new_password' | 'confirm_password'>

const PasswordSchema = UserSchema.pick(['password', 'new_password', 'confirm_password'])

const ChangePassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<{
    password: string | undefined
    new_password: string | undefined
    confirm_password: string | undefined
  }>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(PasswordSchema)
  })

  const { t } = useTranslation('account')

  const UpdatePasswordMutation = useMutation(UserAPI.updateProfile)

  const handleSubmitForm = handleSubmit(async (data) => {
    try {
      const response = await UpdatePasswordMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(response.data.message)
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntity<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <Fragment>
      <Helmet>
        <title>Đổi mật khẩu</title>
        <meta name='description' content='Đây là trang đổi mật khẩu của dự án Shopee Clone' />
      </Helmet>
      <div className='rounded-sm bg-white px-8 py-4 shadow'>
        <div className='border-b-[1px] border-gray-300/40 pb-2'>
          <h1 className='text-[20px] font-normal capitalize'>{t('heading.change password')}</h1>
          <h2 className='text-[15px] text-gray-600'>{t('heading.description password')}</h2>
        </div>
        <div className='py-6'>
          <form onSubmit={handleSubmitForm}>
            <div className='mt-4 grid grid-cols-10 items-center gap-6 text-[15px]'>
              <div className='col-span-3 mb-2 text-right text-gray-600'>{t('change password.password')}</div>
              <div className='col-span-5'>
                <Input
                  type='password'
                  name='password'
                  register={register}
                  errorMessage={errors.password?.message}
                  placeholder={t('change password.password')}
                  classNameInput='w-full rounded-sm border-[1px] border-gray-300 px-4 py-1 outline-none'
                  className='relative'
                  autoComplete='on'
                />
              </div>
            </div>
            <div className='mt-4 grid grid-cols-10 items-center gap-6 text-[15px]'>
              <div className='col-span-3 mb-2 text-right text-gray-600'>{t('change password.new password')}</div>
              <div className='col-span-5'>
                <Input
                  type='password'
                  name='new_password'
                  register={register}
                  errorMessage={errors.new_password?.message}
                  placeholder={t('change password.new password')}
                  classNameInput='w-full rounded-sm border-[1px] border-gray-300 px-4 py-1 outline-none'
                  className='relative'
                  autoComplete='on'
                />
              </div>
            </div>
            <div className='mt-4 grid grid-cols-10 items-center gap-6 text-[15px]'>
              <div className='col-span-3 mb-2 text-right text-gray-600'>{t('change password.confirm password')}</div>
              <div className='col-span-5'>
                <Input
                  type='password'
                  name='confirm_password'
                  register={register}
                  errorMessage={errors.confirm_password?.message}
                  placeholder={t('change password.confirm password')}
                  classNameInput='w-full rounded-sm border-[1px] border-gray-300 px-4 py-1 outline-none'
                  className='relative'
                  autoComplete='on'
                />
              </div>
            </div>
            <div className='mt-6 grid grid-cols-10 items-center gap-4 text-[15px]'>
              <Button
                type='submit'
                className='col-span-1 col-start-4 rounded-sm bg-orange px-4 py-2 text-[15px] text-white shadow-sm'
              >
                {t('button.save')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default ChangePassword
