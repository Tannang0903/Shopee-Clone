import { useMutation, useQuery } from '@tanstack/react-query'
import UserAPI from 'src/apis/user.api'
import Button from 'src/components/Button'
import { UserSchema, UserSchemaType } from 'src/utils/rules'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import DateSelect from '../../componets/DateSelect'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
import { getAvatarURL, isAxiosUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import InputFile from 'src/components/InputFile'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'

type FormData = Pick<UserSchemaType, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>

type FormDataError = Omit<FormData, 'date_of_birth '> & {
  date_of_birth?: string
}

const ProfileSchema = UserSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

const Profile = () => {
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = useForm<{
    name: string | undefined
    phone: string | undefined
    address: string | undefined
    avatar: string | undefined
    date_of_birth: Date | undefined
  }>({
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(ProfileSchema)
  })

  const avatar = watch('avatar')

  const ProfileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: UserAPI.getProfile
  })
  const profile = ProfileQuery.data?.data.data

  const UpdateProfileMutation = useMutation(UserAPI.updateProfile)

  const UploadAvatarMutation = useMutation(UserAPI.uploadAvatar)

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('address', profile.address)
      setValue('phone', profile.phone)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const handleSubmitForm = handleSubmit(async (data) => {
    let avatarName = avatar
    try {
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadResponse = await UploadAvatarMutation.mutateAsync(form)
        avatarName = uploadResponse.data.data
        setValue('avatar', avatarName)
      }
      const response = await UpdateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(response.data.data)
      setProfileToLS(response.data.data)
      ProfileQuery.refetch()
      toast.success(response.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntity<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  return (
    <Fragment>
      <Helmet>
        <title>Hồ sơ</title>
        <meta name='description' content='Đây là trang hồ sơ cá nhân của dự án Shopee Clone' />
      </Helmet>
      <div className='rounded-sm bg-white px-8 py-4 shadow'>
        <div className='border-b-[1px] border-gray-300/40 pb-2'>
          <h1 className='text-[20px] font-normal'>Hồ sơ của tôi</h1>
          <h2 className='text-[15px] text-gray-600'>Quản lý thông tin hồ sơ để bảo mật tài khoản</h2>
        </div>
        <div className='grid grid-cols-10 gap-6 py-6'>
          <form className='col-span-7' onSubmit={handleSubmitForm}>
            <div className='grid grid-cols-10 items-center gap-6 text-[15px]'>
              <div className='col-span-2 mb-2 text-right text-gray-600'>Email</div>
              <div className='col-span-8'>
                <span>{profile?.email}</span>
              </div>
            </div>
            <div className='mt-4 grid grid-cols-10 items-center gap-6 text-[15px]'>
              <div className='col-span-2 mb-2 text-right text-gray-600'>Tên</div>
              <div className='col-span-8'>
                <Input
                  type='text'
                  name='name'
                  register={register}
                  errorMessage={errors.name?.message}
                  placeholder='Tên'
                  classNameInput='w-full rounded-sm border-[1px] border-gray-300 px-4 py-1 outline-none'
                />
              </div>
            </div>
            <div className='mt-4 grid grid-cols-10 items-center gap-6 text-[15px]'>
              <div className='col-span-2 mb-2 text-right text-gray-600'>Số điện thoại</div>
              <div className='col-span-8'>
                <Controller
                  control={control}
                  name='phone'
                  render={({ field }) => (
                    <InputNumber
                      placeholder='Số điện thoại'
                      classNameInput='w-full rounded-sm border-[1px] border-gray-300 px-4 py-1 outline-none'
                      className='mt-2'
                      errorMessage={errors.phone?.message}
                      classErrorMessage='mt-1 block min-h-[16px] text-xs font-light text-red-700'
                      {...field}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
            <div className='mt-4 grid grid-cols-10 items-center gap-6 text-[15px]'>
              <div className='col-span-2 mb-2 text-right text-gray-600'>Địa chỉ</div>
              <div className='col-span-8'>
                <Input
                  type='text'
                  name='address'
                  register={register}
                  errorMessage={errors.address?.message}
                  placeholder='Đại chỉ'
                  classNameInput='w-full rounded-sm border-[1px] border-gray-300 px-4 py-1 outline-none'
                />
              </div>
            </div>
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            <div className='mt-6 grid grid-cols-10 items-center gap-6 text-[15px]'>
              <Button
                type='submit'
                className='col-span-2 col-start-3 rounded-sm bg-orange px-4 py-2 text-[15px] text-white shadow-sm'
              >
                Lưu
              </Button>
            </div>
          </form>
          <div className='col-span-3 border-l-[1px]'>
            <div className='flex flex-col items-center justify-center px-10'>
              <img
                src={previewImage || getAvatarURL(avatar)}
                alt='avatar'
                className='mt-6 h-24 w-24 rounded-[50%] border-[1px] border-gray-300 shadow-sm'
              />
              <InputFile onChange={handleChangeFile} />
              <span className='text-[14px] text-gray-500'>Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Profile
