import { Story, Meta } from '@storybook/react/types-6-0'
import OrdersList, { OrdersListProps } from '.'
import orderListMock from './mock'

export default {
  title: 'Profile/OrdersList',
  component: OrdersList,
  args: {
    items: orderListMock
  }
} as Meta

export const Basic: Story<OrdersListProps> = (args) => (
  <div style={{ maxWidth: 850, margin: 'auto' }}>
    <OrdersList {...args} />
  </div>
)
