import Button from 'components/Button'
import Heading from 'components/Heading'
import * as S from './styles'
import { AddShoppingCart } from '@styled-icons/material-outlined/AddShoppingCart'
import Ribbon from 'components/Ribbon'
import { FavoriteBorder } from '@styled-icons/material-outlined'

export type GameInfoProps = {
  title: string
  description: string
  price: string
}

const GameInfo = ({ description, price, title }: GameInfoProps) => (
  <S.Wrapper>
    <Heading lineBottom>{title}</Heading>
    <Ribbon>{`$${price}`}</Ribbon>
    <S.Description>{description}</S.Description>
    <S.ButtonsWrapper>
      <Button icon={<AddShoppingCart />} size="large">
        Add to cart
      </Button>
      <Button icon={<FavoriteBorder />} size="large" minimal>
        wishlist
      </Button>
    </S.ButtonsWrapper>
  </S.Wrapper>
)

export default GameInfo
