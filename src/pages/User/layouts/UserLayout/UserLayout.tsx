import { Outlet } from 'react-router-dom'
import UserSideNav from '../../componets/UserSideNav'

const UserLayout = () => {
  return (
    <div className='bg-[#f5f5f5] py-6'>
      <div className='container grid grid-cols-12 gap-6'>
        <div className='col-span-2'>
          <UserSideNav />
        </div>
        <div className='col-span-10'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default UserLayout
