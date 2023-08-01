import type { Meta, StoryObj } from '@storybook/react'

import NavHeader from './NavHeader'

const meta: Meta<typeof NavHeader> = {
  title: 'components/NavHeader',
  component: NavHeader
}

export default meta
type Story = StoryObj<typeof meta>

export const UI: Story = {}
