import Button from 'src/components/Button'
import Popover from 'src/components/Popover'

const SortProductList = () => {
  return (
    <div className='flex justify-between px-6 py-3 bg-[#ededed]'>
      <div className='flex items-center  my-auto'>
        <h3 className=' my-auto mr-4'>Sắp xếp theo</h3>
        <Button className='capitalize px-4 py-[6px] mr-2 bg-orange hover:bg-orange/80 text-white rounded-sm shadow-sm text-sm'>
          Phổ biến
        </Button>
        <Button className='capitalize px-4 py-[6px] mr-2 bg-white hover:bg-gray-200 rounded-sm shadow-sm text-sm'>
          Mới nhất
        </Button>
        <Button className='capitalize px-4 py-[6px] mr-2 bg-white hover:bg-gray-200 rounded-sm shadow-sm text-sm'>
          Bán chạy
        </Button>
        <Popover
          className='w-[160px] px-4 py-[6px] bg-white rounded-sm shadow-sm text-sm flex justify-between items-center'
          renderPopover={
            <div className='flex flex-col w-[160px] py-2 bg-white rounded-sm shadow-sm'>
              <Button className='capitalize py-2 px-2 hover:text-orange rounded-sm text-sm text-left border-none'>
                Giá: thấp đến cao
              </Button>
              <Button className='capitalize py-2 px-2 hover:text-orange rounded-sm text-sm text-left border-none'>
                Giá: cao đến thấp
              </Button>
            </div>
          }
        >
          <span>Giá</span>
          <i className='fa-solid fa-angle-down'></i>
        </Popover>
      </div>
      <div className='flex items-center justify-end '>
        <div className='text-[13px] mr-4'>
          <span className='text-orange'>1</span>/9
        </div>
        <div>
          <div>
            <i className='fa-solid fa-angle-left text-xs px-[14px] py-[8px] bg-white/60 text-gray-400 border-[1px] border-gray-300/70 rounded-sm' />
            <i className='fa-solid fa-angle-right text-xs px-[14px] py-[8px] bg-white cursor-pointer border-[1px] border-gray-300/70 rounded-sm' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList
