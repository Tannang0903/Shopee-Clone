import { useState } from 'react'
import type { UseFormRegister } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  classNameInput?: string
  classNameEye?: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  autoComplete?: string
}

const Input = ({
  type,
  errorMessage,
  placeholder,
  name,
  register,
  autoComplete,
  className,
  classNameInput = 'w-full rounded-sm border border-gray-300 px-3 py-2 font-light outline-none focus:border-gray-500 focus:shadow',
  classNameEye = 'absolute right-[4px] top-[3px] block cursor-pointer px-2 py-1 text-orange'
}: Props) => {
  const [openEye, setOpenEye] = useState<boolean>(false)

  const toggleEye = () => {
    setOpenEye((prev) => !prev)
  }

  const handleType = () => {
    if (type === 'password') {
      return openEye ? 'text' : 'password'
    }
    return type
  }

  return (
    <div className={className}>
      <input
        className={classNameInput}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name)}
        type={handleType()}
      />
      {type === 'password' &&
        (openEye ? (
          <button type='button' onClick={toggleEye} className={classNameEye}>
            <i className='fa-regular fa-eye'></i>
          </button>
        ) : (
          <button type='button' onClick={toggleEye} className={classNameEye}>
            <i className='fa-regular fa-eye-slash'></i>
          </button>
        ))}
      <span className='mt-1 block min-h-[16px] text-xs font-light text-red-700'>{errorMessage}</span>
    </div>
  )
}

export default Input
