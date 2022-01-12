import { Story, Meta } from '@storybook/react/types-6-0'
import CartList, { CartListProps } from '.'

import mockItems from './mock'

export default {
  title: 'CartList',
  component: CartList,
  args: {
    items: mockItems,
    total: 'R$ 330,00'
  },
  argTypes: {
    items: {
      type: ''
    }
  },
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

export const Default: Story<CartListProps> = (args) => (
  <div style={{ maxWidth: 800, margin: '0 auto' }}>
    <CartList {...args} />
  </div>
)

export const WithButton: Story<CartListProps> = (args) => (
  <div style={{ maxWidth: 800, margin: '0 auto' }}>
    <CartList {...args} hasButton />
  </div>
)

export const Empty: Story<CartListProps> = () => (
  <div style={{ maxWidth: 800, margin: '0 auto' }}>
    <CartList />
  </div>
)
