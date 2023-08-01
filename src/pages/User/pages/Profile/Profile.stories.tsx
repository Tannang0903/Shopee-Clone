import type { Meta, StoryObj } from '@storybook/react'

import Profile from './Profile'

const meta: Meta<typeof Profile> = {
  title: 'pages/User/Profile',
  component: Profile
}

export default meta
type Story = StoryObj<typeof meta>

export const Form: Story = {}
