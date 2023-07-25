import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import UserAPI from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { UserSchema, UserSchemaType } from 'src/utils/rules'
import { toast } from 'react-toastify'
import { isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'

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
    <div className='rounded-sm bg-white px-8 py-4 shadow'>
      <div className='border-b-[1px] border-gray-300/40 pb-2'>
        <h1 className='text-[20px] font-normal'>Đổi mật khẩu</h1>
        <h2 className='text-[15px] text-gray-600'>Quản lý mật khẩu để bảo mật tài kho</h2>
      </div>
      <div className='py-6'>
        <form onSubmit={handleSubmitForm}>
          <div className='mt-4 grid grid-cols-10 items-center gap-6 text-[15px]'>
            <div className='col-span-3 mb-2 text-right text-gray-600'>Mật khẩu</div>
            <div className='col-span-5'>
              <Input
                type='password'
                name='password'
                register={register}
                errorMessage={errors.password?.message}
                placeholder='Mật khẩu'
                classNameInput='w-full rounded-sm border-[1px] border-gray-300 px-4 py-1 outline-none'
                className='relative'
                autoComplete='on'
              />
            </div>
          </div>
          <div className='mt-4 grid grid-cols-10 items-center gap-6 text-[15px]'>
            <div className='col-span-3 mb-2 text-right text-gray-600'>Mật khẩu mới</div>
            <div className='col-span-5'>
              <Input
                type='password'
                name='new_password'
                register={register}
                errorMessage={errors.new_password?.message}
                placeholder='Mật khẩu mới'
                classNameInput='w-full rounded-sm border-[1px] border-gray-300 px-4 py-1 outline-none'
                className='relative'
                autoComplete='on'
              />
            </div>
          </div>
          <div className='mt-4 grid grid-cols-10 items-center gap-6 text-[15px]'>
            <div className='col-span-3 mb-2 text-right text-gray-600'>Nhập lại mật khẩu</div>
            <div className='col-span-5'>
              <Input
                type='password'
                name='confirm_password'
                register={register}
                errorMessage={errors.confirm_password?.message}
                placeholder='Nhập lại mật khẩu'
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
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
