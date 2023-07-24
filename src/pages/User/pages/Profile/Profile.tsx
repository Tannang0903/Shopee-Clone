import { useMutation, useQuery } from '@tanstack/react-query'
import UserAPI, { BodyUpdateProfile } from 'src/apis/user.api'
import Button from 'src/components/Button'
import { UserSchema, UserSchemaType } from 'src/utils/rules'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { useContext, useEffect } from 'react'
import DateSelect from '../../componets/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'

type FormData = Pick<UserSchemaType, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>

const ProfileSchema = UserSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

const Profile = () => {
  const { setProfile } = useContext(AppContext)

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(ProfileSchema)
  })

  const ProfileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: UserAPI.getProfile
  })
  const profile = ProfileQuery.data?.data.data

  const UpdateProfileMutation = useMutation({
    mutationFn: (body: BodyUpdateProfile) => UserAPI.updateProfile(body)
  })

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
    const response = await UpdateProfileMutation.mutateAsync({
      ...data,
      date_of_birth: data.date_of_birth?.toISOString()
    })
    setProfile(response.data.data)
    setProfileToLS(response.data.data)
    ProfileQuery.refetch()
    toast.success(response.data.message)
  })

  return (
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
              <DateSelect errorMessage={errors.date_of_birth?.message} onChange={field.onChange} value={field.value} />
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
              src='https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiI4MDQwOTc0L29yaWdpbmFsX2ZmNGYxZjQzZDdiNzJjYzMxZDJlYjViMDgyN2ZmMWFjLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTIwMCwiaGVpZ2h0IjoxMjAwLCJmaXQiOiJpbnNpZGUiLCJ3aXRob3V0RW5sYXJnZW1lbnQiOnRydWV9LCJ3ZWJwIjp7InF1YWxpdHkiOjkwfSwianBlZyI6eyJxdWFsaXR5Ijo5MH0sInJvdGF0ZSI6bnVsbH19?bc=0'
              alt='avatar'
              className='mt-6 h-24 w-24 rounded-[50%] border-[1px] border-gray-300 shadow-sm'
            />
            <input type='file' name='' id='' className='hidden' accept='.jpg,.jpeg,.png' />
            <Button
              type='button'
              className='my-4 rounded-sm border-[1px] border-gray-300 px-4 py-2 text-[15px] capitalize text-gray-600 shadow-sm'
            >
              Chọn ảnh
            </Button>
            <span className='text-[14px] text-gray-500'>Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
