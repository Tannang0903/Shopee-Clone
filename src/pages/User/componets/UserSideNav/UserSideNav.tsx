import { useContext } from 'react'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'

const UserSideNav = () => {
  const { profile } = useContext(AppContext)

  return (
    <div>
      <div className='flex items-center border-b-[1px] border-gray-300/40 py-4'>
        <Link to={path.profile} className='mr-3 h-12 w-12 flex-shrink-0'>
          <img
            src={
              profile?.avatar ||
              'https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiI4MDQwOTc0L29yaWdpbmFsX2ZmNGYxZjQzZDdiNzJjYzMxZDJlYjViMDgyN2ZmMWFjLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTIwMCwiaGVpZ2h0IjoxMjAwLCJmaXQiOiJpbnNpZGUiLCJ3aXRob3V0RW5sYXJnZW1lbnQiOnRydWV9LCJ3ZWJwIjp7InF1YWxpdHkiOjkwfSwianBlZyI6eyJxdWFsaXR5Ijo5MH0sInJvdGF0ZSI6bnVsbH19?bc=0'
            }
            alt='avatar'
            className='h-full w-full rounded-[50%] border-[1px] border-gray-300 shadow-sm'
          />
        </Link>
        <div className='flex flex-grow flex-col justify-center overflow-hidden'>
          <div className='truncate text-[15px] font-medium leading-4'>{profile?.email}</div>
          <Link to={path.profile} className='flex items-center text-gray-400'>
            <i className='fa-solid fa-pen mr-1 text-[12px]'></i>
            <span className='text-[14px] capitalize'>Sửa hồ sơ</span>
          </Link>
        </div>
      </div>
      <div className='py-6 text-[15px]'>
        <Link to={path.profile} className='flex cursor-pointer items-center py-1 hover:text-orange'>
          <i className='fa-regular fa-user mr-2 text-[18px] text-blue-600'></i>
          <span>Tài khoản của tôi</span>
        </Link>
        <Link to={path.changePassword} className='flex cursor-pointer items-center py-1 hover:text-orange'>
          <i className='fa-regular fa-pen-to-square mr-2 text-[18px] text-green-400'></i>
          <span>Đổi mật khẩu</span>
        </Link>
        <Link to={path.historyPurchase} className='flex cursor-pointer items-center py-1 hover:text-orange'>
          <i className='fa-solid fa-clipboard-list mr-3  text-[18px] text-orange'></i>
          <span>Đơn mua</span>
        </Link>
      </div>
    </div>
  )
}

export default UserSideNav
