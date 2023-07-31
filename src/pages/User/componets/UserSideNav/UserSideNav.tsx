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
            <i className='fa-solid fa-pen mr-1 text-[12px]'></i>
            <span className='text-[14px] capitalize'>{t('side nav.edit profile')}</span>
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
          <i className='fa-regular fa-user mr-[10px] text-[18px] text-blue-600'></i>
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
          <i className='fa-regular fa-pen-to-square mr-2 text-[18px] text-green-400'></i>
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
          <i className='fa-solid fa-clipboard-list mr-3  text-[18px] text-orange'></i>
          <span>{t('side nav.history purchase')}</span>
        </NavLink>
      </div>
    </div>
  )
}

export default UserSideNav
