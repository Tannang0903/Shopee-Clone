import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='bg-[url("https://down-vn.img.susercontent.com/file/sg-11134004-7qvfc-lisjisjilfqv70")] bg-no-repeat bg-cover bg-center h-[600px]'>
      <div className='max-w-[1200px] mx-auto px-[60px] h-full'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-[60px]'>
          <div className='lg:col-span-2 lg:col-start-4 bg-white rounded-sm p-[30px] '>
            <form action=''>
              <h1 className='text-xl'>Đăng kí</h1>
              <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  className='py-2 px-3 w-full outline-none rounded-sm border border-gray-300 focus:border-gray-500 focus:shadow font-light'
                  placeholder='Email'
                />
                <span className='block min-h-[16px] text-red-700 text-xs mt-1 font-light'>Vui lòng nhập Email</span>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  name='password'
                  className='py-2 px-3 w-full outline-none rounded-sm border border-gray-300 focus:border-gray-500 focus:shadow font-light'
                  placeholder='Mật khẩu'
                />
                <span className='block min-h-[16px] text-red-700 text-xs mt-1 font-light'>Vui lòng nhập mật khẩu</span>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  name='confirm_password'
                  className='py-2 px-3 w-full outline-none rounded-sm border border-gray-300 focus:border-gray-500 focus:shadow font-light'
                  placeholder='Xác nhận mật khẩu'
                />
                <span className='block min-h-[16px] text-red-700 text-xs mt-1 font-light'>
                  Vui lòng nhập lại mật khẩu
                </span>
              </div>
              <div className='mt-3'>
                <button className='w-full bg-orange text-white py-[10px] rounded-sm uppercase text-sm'>Đăng kí</button>
              </div>
              <footer className='mt-6 text-center'>
                <span className='text-sm text-[#b5b5b5] font-light mr-1'>Bạn đã có tài khoản?</span>
                <Link to={'/login'} className='text-sm text-[#ee4d2d] font-normal'>
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
