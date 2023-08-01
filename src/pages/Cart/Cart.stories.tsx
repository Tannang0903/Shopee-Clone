import type { Meta, StoryObj } from '@storybook/react'

import Cart from './Cart'

const meta: Meta<typeof Cart> = {
  title: 'pages/Cart',
  component: Cart
}

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}
