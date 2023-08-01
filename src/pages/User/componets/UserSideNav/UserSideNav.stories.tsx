import type { Meta, StoryObj } from '@storybook/react'

import UserSideNav from './UserSideNav'

const meta: Meta<typeof UserSideNav> = {
  title: 'pages/User/UserSideNav',
  component: UserSideNav
}

export default meta
type Story = StoryObj<typeof meta>

export const UI: Story = {}
