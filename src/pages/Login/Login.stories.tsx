import type { Meta, StoryObj } from '@storybook/react'

import Login from './Login'

const meta: Meta<typeof Login> = {
  title: 'pages/Login',
  component: Login
}

export default meta
type Story = StoryObj<typeof meta>

export const Form: Story = {}
