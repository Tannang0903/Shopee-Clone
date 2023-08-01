import type { Meta, StoryObj } from '@storybook/react'

import RegisterHeader from './RegisterHeader'

const meta: Meta<typeof RegisterHeader> = {
  title: 'components/RegisterHeader',
  component: RegisterHeader
}

export default meta
type Story = StoryObj<typeof meta>

export const UI: Story = {}
