import type { Meta, StoryObj } from '@storybook/react'

import Register from './Register'

const meta: Meta<typeof Register> = {
  title: 'pages/Register',
  component: Register
}

export default meta
type Story = StoryObj<typeof meta>

export const Form: Story = {}
