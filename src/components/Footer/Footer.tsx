import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className='container py-[48px]'>
        <div className='grid grid-cols-5 gap-4'>
          <div className='col-span-1'>
            <h3 className='mb-2 fill-text text-[13px] font-semibold uppercase'>Chăm sóc khách hàng</h3>
            <ul>
              <li>
                <Link to={'/!'} className='mb-1 text-[12px] font-light capitalize text-[#3f3f3f] hover:text-[#ee4d2d]'>
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link to={'/!'} className='mb-1 text-[12px] font-light capitalize text-[#3f3f3f] hover:text-[#ee4d2d]'>
                  Shopee Blog
                </Link>
              </li>
              <li>
                <Link to={'/!'} className='mb-1 text-[12px] font-light capitalize text-[#3f3f3f] hover:text-[#ee4d2d]'>
                  Shopee Mall
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-span-1'>
            <h3 className='mb-2 fill-text text-[13px] font-semibold uppercase'>Về Shopee</h3>
            <ul>
              <li>
                <Link to={'/!'} className='mb-1 text-[12px] font-light capitalize text-[#3f3f3f] hover:text-[#ee4d2d]'>
                  Giới thiệu về Shopee Việt Nam
                </Link>
              </li>
              <li>
                <Link to={'/!'} className='mb-1 text-[12px] font-light capitalize text-[#3f3f3f] hover:text-[#ee4d2d]'>
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link to={'/!'} className='mb-1 text-[12px] font-light capitalize text-[#3f3f3f] hover:text-[#ee4d2d]'>
                  Điều khoản Shopee
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-span-1'>
            <h3 className='mb-2 fill-text text-[13px] font-semibold uppercase'>Thanh toán</h3>
            <ul className='flex flex-wrap'>
              <li className='mb-2 mr-2 rounded-sm p-1 shadow-[rgba(50,_50,_105,_0.25)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                <img src='https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8' alt='' />
              </li>
              <li className='mb-2 mr-2 rounded-sm p-1 shadow-[rgba(50,_50,_105,_0.25)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                <img src='https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06' alt='' />
              </li>
              <li className='mb-2 mr-2 rounded-sm p-1 shadow-[rgba(50,_50,_105,_0.25)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                <img src='https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281' alt='' />
              </li>
              <li className='mb-2 mr-2 rounded-sm p-1 shadow-[rgba(50,_50,_105,_0.25)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                <img src='https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c' alt='' />
              </li>
              <li className='mb-2 mr-2 rounded-sm p-1 shadow-[rgba(50,_50,_105,_0.25)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                <img src='https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08' alt='' />
              </li>
              <li className='mb-2 mr-2 rounded-sm p-1 shadow-[rgba(50,_50,_105,_0.25)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                <img src='https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281' alt='' />
              </li>
            </ul>
          </div>
          <div className='col-span-1'>
            <h3 className='mb-2 fill-text text-[13px] font-semibold uppercase'>Theo dõi chúng tôi trên</h3>
            <ul>
              <li>
                <a
                  href='https://www.facebook.com/ShopeeVN'
                  target='_blank'
                  className='mb-1 flex items-center text-[12px] font-light capitalize text-[#3f3f3f] hover:text-[#ee4d2d]'
                  rel='noreferrer'
                >
                  <i className='fa-brands fa-facebook mr-2 text-[16px]'></i>
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href='https://www.instagram.com/Shopee_VN/'
                  target='_blank'
                  className='mb-1 flex items-center text-[12px] font-light capitalize text-[#3f3f3f] hover:text-[#ee4d2d]'
                  rel='noreferrer'
                >
                  <i className='fa-brands fa-square-instagram mr-2 text-[16px]'></i>
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href='https://id.linkedin.com/in/shopee-partner-726163204/en?trk=people-guest_people_search-card'
                  target='_blank'
                  className='mb-1 flex items-center text-[12px] font-light capitalize text-[#3f3f3f] hover:text-[#ee4d2d]'
                  rel='noreferrer'
                >
                  <i className='fa-brands fa-linkedin mr-2 text-[16px]'></i>
                  <span>Linkedin</span>
                </a>
              </li>
            </ul>
          </div>
          <div className='col-span-1'>
            <h3 className='mb-2 fill-text text-[13px] font-semibold uppercase'>Tải ứng dụng Shopee</h3>
            <div className='flex'>
              <div className='rounded-sm p-1 shadow-[rgba(50,_50,_105,_0.25)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                <img src='https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472' alt='QR code' />
              </div>
              <div className='ml-3 flex flex-col justify-between'>
                <a
                  href='https://play.google.com/store/search?q=shopee&c=apps'
                  target='_blank'
                  rel='noreferrer'
                  className='rounded-sm p-1 shadow-[rgba(50,_50,_105,_0.25)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def'
                    alt='Google Play'
                  />
                </a>
                <a
                  href='https://apps.apple.com/vn/app/shopee-mua-s%E1%BA%AFm-online/id959841449'
                  target='_blank'
                  rel='noreferrer'
                  className='rounded-sm p-1 shadow-[rgba(50,_50,_105,_0.25)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/ad01628e90ddf248076685f73497c163'
                    alt='App store'
                  />
                </a>
                <a
                  href='https://appgallery.cloud.huawei.com/ag/n/app/C101433653?channelId=web&detailType=0'
                  target='_blank'
                  rel='noreferrer'
                  className='rounded-sm p-1 shadow-[rgba(50,_50,_105,_0.25)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
                >
                  <img
                    src='https://down-vn.img.susercontent.com/file/35352374f39bdd03b25e7b83542b2cb0'
                    alt='App Gallery'
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='mx-auto mt-6'>
          <p className='text-center text-[14px] font-light text-[#737373]'>
            © 2023 - Bản quyền thuộc về Công ty TNHH Shopee
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
