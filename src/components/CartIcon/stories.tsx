import { Story, Meta } from '@storybook/react/types-6-0'
import CartIcon from '.'

export default {
  title: 'CartIcon',
  component: CartIcon,
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

export const Default: Story = () => <CartIcon />
export const withItems: Story = (args) => <CartIcon {...args} />

//Se usa o cart contextvalue não tem a possibilidade de mudar na
//interface do storybook, se deixa direto quantity: 3 , aí pode
withItems.args = {
  cartContextValue: {
    quantity: 3
  }
}
