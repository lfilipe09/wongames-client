import Button from 'components/Button'
import Heading from 'components/Heading'
import * as S from './styles'

import Ribbon from 'components/Ribbon'
import { FavoriteBorder } from '@styled-icons/material-outlined'
import formatPrice from 'utils/format-price'
import CartButton from 'components/CartButton'

export type GameInfoProps = {
  id: string
  title: string
  description: string
  price: number
}

const GameInfo = ({ description, price, title, id }: GameInfoProps) => (
  <S.Wrapper>
    <Heading lineBottom>{title}</Heading>
    <Ribbon>{formatPrice(price)}</Ribbon>
    <S.Description>{description}</S.Description>
    <S.ButtonsWrapper>
      <CartButton id={id} size="large" hasText />
      <Button icon={<FavoriteBorder />} size="large" minimal>
        Wishlist
      </Button>
    </S.ButtonsWrapper>
  </S.Wrapper>
)

export default GameInfo
