import { Link } from 'react-router-dom'
import Popover from '../Popover'
import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { purchasesStatus } from 'src/constants/purchase'
import authAPI from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'
import { getAccessTokenFromLS } from 'src/utils/auth'
import path from 'src/constants/path'
import { getAvatarURL } from 'src/utils/utils'
import { useTranslation } from 'react-i18next'
import { locales } from 'src/i18n/i18n'

const NavHeader = () => {
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)

  const { i18n, t } = useTranslation('header')
  const currentLanguage = locales[i18n.language as keyof typeof locales]

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

  const handleChangeLanguage = (language: 'en' | 'vi') => {
    i18n.changeLanguage(language)
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
            {t('navigation.seller center')}
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
            {t('navigation.download')}
          </a>
        </Popover>
        <li className='flex'>
          <span className='border-gray-100/40 px-2'>{t('navigation.follow us on')}</span>
          <a href='https://www.facebook.com/ShopeeVN' className='mr-2' target='_blank' rel='noreferrer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='1em'
              viewBox='0 0 512 512'
              className='fill-white text-[16px]'
            >
              <path d='M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z' />
            </svg>
          </a>
          <a href='https://www.instagram.com/Shopee_VN/' className='text-[16px]' target='_blank' rel='noreferrer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='1em'
              viewBox='0 0 448 512'
              className='fill-white text-[16px]'
            >
              <path d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z' />
            </svg>
          </a>
        </li>
      </ul>
      <ul className='flex items-center'>
        <li>
          <a href='/notice' className='flex items-center hover:text-gray-300'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
              />
            </svg>
            <span className='ml-1 mr-3 capitalize'>{t('navigation.notifications')}</span>
          </a>
        </li>
        <li>
          <a
            href='https://help.shopee.vn/portal'
            target='_blank'
            rel='noreferrer'
            className='flex items-center hover:text-gray-300'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z'
              />
            </svg>
            <span className='ml-1 mr-3 capitalize'>{t('navigation.help')}</span>
          </a>
        </li>
        <Popover
          as='li'
          className='mr-3 flex cursor-pointer items-center hover:text-gray-300'
          renderPopover={
            <div className='relative overflow-hidden rounded-sm bg-white shadow-md'>
              <div className='flex w-[160px] flex-col'>
                <button className='px-4 py-2 text-left hover:text-orange' onClick={() => handleChangeLanguage('vi')}>
                  Tiếng Việt
                </button>
                <button className='px-4 py-2 text-left hover:text-orange' onClick={() => handleChangeLanguage('en')}>
                  English
                </button>
              </div>
            </div>
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
            />
          </svg>
          <span className='ml-1 mr-1 capitalize'>{currentLanguage}</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg>
        </Popover>
        {isAuthenticated && (
          <Popover
            as='li'
            className='flex cursor-pointer items-center'
            renderPopover={
              <div className='relative overflow-hidden rounded-sm border border-gray-100 bg-white shadow-md'>
                <div className='flex w-[180px] flex-col'>
                  <Link
                    to={path.profile}
                    className='block px-4 py-2 text-left capitalize hover:bg-gray-100 hover:text-emerald-400'
                  >
                    {t('navigation.my account')}
                  </Link>
                  <Link
                    to={path.historyPurchase}
                    className='block px-4 py-2 text-left capitalize hover:bg-gray-100 hover:text-emerald-400'
                  >
                    {t('navigation.my purchase')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='block px-4 py-2 text-left capitalize hover:bg-gray-100 hover:text-emerald-400'
                  >
                    {t('navigation.logout')}
                  </button>
                </div>
              </div>
            }
          >
            <img src={getAvatarURL(profile?.avatar)} alt='avatar' className='inline-block h-5 w-5 rounded-[50%]' />
            <span className='ml-1 font-medium hover:text-gray-300'>{profile?.email}</span>
          </Popover>
        )}
        {!isAuthenticated && (
          <li className='flex items-center'>
            <Link to={path.register} className=' border-r border-r-gray-300 px-3 capitalize hover:text-white/70'>
              {t('navigation.sign up')}
            </Link>
            <Link to={path.login} className=' px-3 capitalize hover:text-white/70 '>
              {t('navigation.login')}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default NavHeader
