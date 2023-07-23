import { Link } from 'react-router-dom'
import Popover from '../Popover'
import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { purchasesStatus } from 'src/constants/purchase'
import authAPI from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'
import { getAccessTokenFromLS } from 'src/utils/auth'
import path from 'src/constants/path'

const NavHeader = () => {
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)

  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: (token: string) => authAPI.logout(token),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })

  const handleLogout = () => {
    const token = getAccessTokenFromLS().split(' ')[1]
    logoutMutation.mutate(token)
  }

  return (
    <nav className='container flex h-[36px] items-center justify-between'>
      <ul className='flex'>
        <li>
          <a
            href='https://banhang.shopee.vn/'
            className='block border-r-[2px] border-gray-100/40 pr-2 capitalize hover:text-gray-300'
            target='_blank'
            rel='noreferrer'
          >
            Kênh người bán
          </a>
        </li>
        <Popover
          as='li'
          className=''
          renderPopover={
            <div className='w-[180px] rounded-sm bg-white shadow-[rgba(50,_50,_105,_0.25)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
              <div className=''>
                <img
                  src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/d91264e165ed6facc6178994d5afae79.png'
                  alt='QR code'
                  className='w-full'
                />
              </div>
              <div className='flex flex-wrap items-center px-2 pb-3'>
                <div className='w-1/2 px-1 py-1'>
                  <img
                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/39f189e19764dab688d3850742f13718.png'
                    alt='App store'
                  />
                </div>
                <div className='w-1/2 px-1 py-1'>
                  <img
                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/f4f5426ce757aea491dce94201560583.png'
                    alt='Google Play'
                  />
                </div>
                <div className='w-1/2 px-1 py-1'>
                  <img
                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/1ae215920a31f2fc75b00d4ee9ae8551.png'
                    alt='App Gallery'
                  />
                </div>
              </div>
            </div>
          }
        >
          <a
            href={'https://shopee.vn/web'}
            target='_blank'
            rel='noreferrer'
            className='block border-r-[2px] border-gray-100/40 px-2 hover:text-gray-300'
          >
            Tải ứng dụng
          </a>
        </Popover>
        <li className='flex'>
          <span className='border-gray-100/40 px-2'>Kết nối</span>
          <a href='https://www.facebook.com/ShopeeVN' className='mr-2' target='_blank' rel='noreferrer'>
            <i className='fa-brands fa-facebook' />
          </a>
          <a href='https://www.instagram.com/Shopee_VN/' className='text-[16px]' target='_blank' rel='noreferrer'>
            <i className='fa-brands fa-instagram' />
          </a>
        </li>
      </ul>
      <ul className='flex items-center'>
        <li>
          <Link to={'/notice'} className='block hover:text-gray-300'>
            <i className='fa-regular fa-bell'></i>
            <span className='ml-1 mr-3 capitalize'>Thông báo</span>
          </Link>
        </li>
        <li>
          <a
            href='https://help.shopee.vn/portal'
            target='_blank'
            rel='noreferrer'
            className='block hover:text-gray-300'
          >
            <i className='fa-regular fa-circle-question'></i>
            <span className='ml-1 mr-3 capitalize'>Hỗ trợ </span>
          </a>
        </li>
        <Popover
          as='li'
          className='mr-3 flex cursor-pointer items-center hover:text-gray-300'
          renderPopover={
            <div className='relative overflow-hidden rounded-sm bg-white shadow-md'>
              <div className='flex w-[160px] flex-col'>
                <button className='px-4 py-2 text-left hover:text-orange'>Tiếng Việt</button>
                <button className='px-4 py-2 text-left hover:text-orange'>English</button>
              </div>
            </div>
          }
        >
          <i className='fa-solid fa-globe'></i>
          <span className='ml-1 mr-1 capitalize'>Tiếng Việt</span>
          <i className='fa-solid fa-angle-down'></i>
        </Popover>
        {isAuthenticated && (
          <Popover
            as='li'
            className='flex cursor-pointer items-center'
            renderPopover={
              <div className='relative overflow-hidden rounded-sm border border-gray-100 bg-white shadow-md'>
                <div className='flex w-[160px] flex-col'>
                  <Link
                    to={path.profile}
                    className='block px-4 py-2 text-left hover:bg-gray-100 hover:text-emerald-400'
                  >
                    Tài khoản của tôi
                  </Link>
                  <Link to={'/!'} className='block px-4 py-2 text-left hover:bg-gray-100 hover:text-emerald-400'>
                    Đơn mua
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='block px-4 py-2 text-left hover:bg-gray-100 hover:text-emerald-400'
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            }
          >
            <img
              src='https://images.are.na/eyJidWNrZXQiOiJhcmVuYV9pbWFnZXMiLCJrZXkiOiI4MDQwOTc0L29yaWdpbmFsX2ZmNGYxZjQzZDdiNzJjYzMxZDJlYjViMDgyN2ZmMWFjLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTIwMCwiaGVpZ2h0IjoxMjAwLCJmaXQiOiJpbnNpZGUiLCJ3aXRob3V0RW5sYXJnZW1lbnQiOnRydWV9LCJ3ZWJwIjp7InF1YWxpdHkiOjkwfSwianBlZyI6eyJxdWFsaXR5Ijo5MH0sInJvdGF0ZSI6bnVsbH19?bc=0'
              alt=''
              className='inline-block h-5 w-5 rounded-[50%]'
            />
            <span className='ml-1 font-medium hover:text-gray-300'>{profile?.email}</span>
          </Popover>
        )}
        {!isAuthenticated && (
          <li className='flex items-center'>
            <Link to={path.register} className=' border-r border-r-gray-300 px-3 capitalize hover:text-white/70'>
              Đăng kí
            </Link>
            <Link to={path.login} className=' px-3 capitalize hover:text-white/70 '>
              Đăng nhập
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default NavHeader
