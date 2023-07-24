import type { UseFormRegister } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  classNameInput?: string
  name: string
  register: UseFormRegister<any>
  autoComplete?: string
}

const Input = ({
  type,
  errorMessage,
  placeholder,
  className,
  name,
  register,
  autoComplete,
  classNameInput = 'w-full rounded-sm border border-gray-300 px-3 py-2 font-light outline-none focus:border-gray-500 focus:shadow'
}: Props) => {
  return (
    <div className={className}>
      <input
        type={type}
        className={classNameInput}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register(name)}
      />
      <span className='mt-1 block min-h-[16px] text-xs font-light text-red-700'>{errorMessage}</span>
    </div>
  )
}

export default Input
