import type { Meta, StoryObj } from '@storybook/react'

import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Đăng nhập',
    className: 'flex w-full items-center justify-center rounded-sm bg-orange py-[10px] text-sm uppercase text-white',
    isLoading: true
  }
}

export const Secondary: Story = {
  args: {
    children: 'Lưu',
    className: 'col-span-1 col-start-4 rounded-sm bg-orange px-4 py-2 text-[15px] text-white shadow-sm'
  }
}
