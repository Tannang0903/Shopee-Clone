import type { Meta, StoryObj } from '@storybook/react'

import CartHeader from './CartHeader'

const meta: Meta<typeof CartHeader> = {
  title: 'components/CartHeader',
  component: CartHeader
}

export default meta
type Story = StoryObj<typeof meta>

export const UI: Story = {}
