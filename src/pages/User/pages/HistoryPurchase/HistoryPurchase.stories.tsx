import type { Meta, StoryObj } from '@storybook/react'

import HistoryPurchase from './HistoryPurchase'

const meta: Meta<typeof HistoryPurchase> = {
  title: 'pages/User/HistoryPurchase',
  component: HistoryPurchase
}

export default meta
type Story = StoryObj<typeof meta>

export const UI: Story = {}
