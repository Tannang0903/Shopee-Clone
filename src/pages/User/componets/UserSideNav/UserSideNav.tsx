import classNames from 'classnames'
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { getAvatarURL } from 'src/utils/utils'
import { useTranslation } from 'react-i18next'

const UserSideNav = () => {
  const { profile } = useContext(AppContext)

  const { t } = useTranslation('account')

  return (
    <div>
      <div className='flex items-center border-b-[1px] border-gray-300/40 py-4'>
        <Link to={path.profile} className='mr-3 h-12 w-12 flex-shrink-0'>
          <img
            src={getAvatarURL(profile?.avatar)}
            alt='avatar'
            className='h-full w-full rounded-[50%] border-[1px] border-gray-300 shadow-sm'
          />
        </Link>
        <div className='flex flex-grow flex-col justify-center overflow-hidden'>
          <div className='truncate text-[15px] font-medium leading-4'>{profile?.email}</div>
          <Link to={path.profile} className='flex items-center text-gray-400'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
              <path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z' />
            </svg>
            <span className='ml-1 text-[14px] capitalize'>{t('side nav.edit profile')}</span>
          </Link>
        </div>
      </div>
      <div className='py-6 text-[15px]'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('flex cursor-pointer items-center py-1 hover:text-orange', {
              'text-orange': isActive,
              'text-gray-800': !isActive
            })
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='mr-[4px] h-5 w-5 text-blue-600 '
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
            />
          </svg>
          <span>{t('side nav.my account')}</span>
        </NavLink>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames('flex cursor-pointer items-center py-1 hover:text-orange', {
              'text-orange': isActive,
              'text-gray-800': !isActive
            })
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='mr-[4px] h-5 w-5 text-green-400'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
            />
          </svg>
          <span>{t('side nav.change password')}</span>
        </NavLink>
        <NavLink
          to={path.historyPurchase}
          className={({ isActive }) =>
            classNames('flex cursor-pointer items-center py-1 hover:text-orange', {
              'text-orange': isActive,
              'text-gray-800': !isActive
            })
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='mr-[4px] h-5 w-5 text-orange'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
            />
          </svg>
          <span>{t('side nav.history purchase')}</span>
        </NavLink>
      </div>
    </div>
  )
}

export default UserSideNav
