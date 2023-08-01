import type { Meta, StoryObj } from '@storybook/react'

import ChangePassword from './ChangePassword'

const meta: Meta<typeof ChangePassword> = {
  title: 'pages/User/ChangePassword',
  component: ChangePassword
}

export default meta
type Story = StoryObj<typeof meta>

export const Form: Story = {}
