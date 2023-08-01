import type { Meta, StoryObj } from '@storybook/react'

import Footer from './Footer'

const meta: Meta<typeof Footer> = {
  title: 'components/Footer',
  component: Footer
}

export default meta
type Story = StoryObj<typeof meta>

export const UI: Story = {}
