import type { Meta, StoryObj } from '@storybook/react'

import MainLayout from './MainLayout'
import ProductDetail from 'src/pages/ProductDetail'

const meta: Meta<typeof MainLayout> = {
  title: 'layouts/MainLayout',
  component: MainLayout
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

// export const PageProductDetail: Story = {
//   args: {
//     children: <ProductDetail />
//   }
// }

// PageProductDetail.story = {
//   parameters: {
//     reactRouter: {
//         routePath: '/:productId',
//         routeParams: { productId: '60afadff6ef5b902180aacb1' }
//     }
//   }
// }
