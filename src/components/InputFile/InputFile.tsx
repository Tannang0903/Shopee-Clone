import { Fragment, useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/config'
import Button from '../Button'

interface Props {
  onChange?: (file?: File) => void
}

const InputFile = ({ onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const OnFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFormLocal = event.target.files?.[0]
    if ((fileFormLocal && fileFormLocal.size > config.maxSizeAvatar) || !fileFormLocal?.type.includes('image')) {
      toast.error('Dụng lượng file tối đa 1 MB và định dạng: .JPEG, .PNG')
    } else {
      onChange && onChange(fileFormLocal)
    }
  }

  const handleUploadFile = () => {
    fileInputRef.current?.click()
  }

  return (
    <Fragment>
      <input
        type='file'
        className='hidden'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={OnFileChange}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(event) => ((event.target as any).value = null)}
      />
      <Button
        type='button'
        onClick={handleUploadFile}
        className='my-4 rounded-sm border-[1px] border-gray-300 px-4 py-2 text-[15px] capitalize text-gray-600 shadow-sm'
      >
        Chọn ảnh
      </Button>
    </Fragment>
  )
}

export default InputFile
