import { range } from 'lodash'
import { useEffect, useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

const DateSelect = ({ value, onChange, errorMessage }: Props) => {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='mt-4 grid grid-cols-10 items-center gap-6 text-[15px]'>
      <div className='col-span-2 mb-2 text-right text-gray-600'>Ngày sinh</div>
      <div className='col-span-8'>
        <div className='grid grid-cols-3 gap-4'>
          <select
            onChange={handleChange}
            name='date'
            value={value?.getDate() || date.date}
            className='col-span-1 cursor-pointer rounded-sm border border-black px-2 py-1 shadow-sm hover:border-orange'
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            onChange={handleChange}
            name='month'
            value={value?.getMonth() || date.month}
            className='col-span-1 cursor-pointer rounded-sm border border-black px-2 py-1 shadow-sm hover:border-orange'
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>

          <select
            onChange={handleChange}
            name='year'
            value={value?.getFullYear() || date.year}
            className='col-span-1 cursor-pointer rounded-sm border border-black px-2 py-1 shadow-sm hover:border-orange'
          >
            <option disabled>Năm</option>
            {range(1990, new Date().getFullYear() + 1).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 block min-h-[16px] text-xs font-light text-red-700'>{errorMessage}</div>
      </div>
    </div>
  )
}

export default DateSelect
