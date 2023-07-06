import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginSchema, LoginSchemaType } from 'src/utils/rules'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(LoginSchema)
  })

  const onSubmit = handleSubmit((data) => {
    // console.log(data)
  })

  return (
    <div className='bg-[url("https://down-vn.img.susercontent.com/file/sg-11134004-7qvfc-lisjisjilfqv70")] bg-no-repeat bg-cover bg-center h-[600px]'>
      <div className='container px-[60px]'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-[60px]'>
          <div className='lg:col-span-2 lg:col-start-4 bg-white rounded-sm p-[30px] '>
            <form onSubmit={onSubmit} noValidate>
              <h1 className='text-xl'>Đăng nhập</h1>
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
                <button type='submit' className='w-full bg-orange text-white py-[10px] rounded-sm uppercase text-sm'>
                  Đăng Nhập
                </button>
              </div>
              <div className='mt-1 flex justify-between'>
                <Link to={'/!'} className='text-blue-800  text-xs mt-1 font-light'>
                  Quên mật khẩu
                </Link>
                <Link to={'/!'} className='text-blue-800 text-xs mt-1 font-light'>
                  Đăng nhập với SMS
                </Link>
              </div>
              <footer className='mt-6 text-center'>
                <span className='text-sm text-[#b5b5b5] font-light mr-1'>Bạn mới biết đến Shopee?</span>
                <Link to={'/register'} className='text-sm text-[#ee4d2d] font-normal'>
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
