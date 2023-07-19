import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  classNameWrapper?: string
}

const QuantityController = ({
  max,
  value,
  onIncrease,
  onDecrease,
  onType,
  classNameWrapper = 'ml-10',
  ...rest
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
  }

  const handleIncrease = () => {
    let _value = Number(value) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
  }

  const handleDecrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
  }

  return (
    <div className={'flex items-center ' + classNameWrapper}>
      <button
        type='button'
        className='flex h-[28px] w-[28px] items-center justify-center rounded-bl-sm rounded-tl-sm border border-gray-400/40'
        onClick={handleDecrease}
      >
        <i className='fa-solid fa-minus text-[10px]'></i>
      </button>
      <InputNumber
        className='border-y border-gray-400/50'
        classNameInput='w-[60px] text-center text-[14px] text-black outline-none'
        onChange={handleChange}
        value={value}
        {...rest}
      />
      <button
        type='button'
        className='flex h-[28px] w-[28px] items-center justify-center rounded-br-sm rounded-tr-sm border border-gray-400/40'
        onClick={handleIncrease}
      >
        <i className='fa-solid fa-plus text-[10px]'></i>
      </button>
    </div>
  )
}

export default QuantityController