import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className='container py-[48px] shadow-sm'>
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
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='1em'
                    viewBox='0 0 512 512'
                    className='mr-2 text-[16px]'
                  >
                    <path d='M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z' />
                  </svg>
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
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='1em'
                    viewBox='0 0 448 512'
                    className='mr-2 text-[16px]'
                  >
                    <path d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z' />
                  </svg>
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
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='1em'
                    viewBox='0 0 448 512'
                    className='mr-2 text-[16px]'
                  >
                    <path d='M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z' />
                  </svg>
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
