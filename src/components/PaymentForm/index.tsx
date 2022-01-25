import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { PaymentIntent, StripeCardElementChangeEvent } from '@stripe/stripe-js'
import { ErrorOutline, ShoppingCart } from '@styled-icons/material-outlined'
import Button from 'components/Button'
import { FormLoading } from 'components/Form'
import Heading from 'components/Heading'
import { useCart } from 'hooks/use-cart'
import { Session } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { createPaymentIntent, createPayment } from 'utils/stripe/methods'
import Link from 'next/link'

import * as S from './styles'

type PaymentFormProps = {
  session: Session
}

const PaymentForm = ({ session }: PaymentFormProps) => {
  const { items } = useCart()
  const { push } = useRouter()
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [freeGames, setFreeGames] = useState(false)

  useEffect(() => {
    //está deixando dentro de uma função o if porque quer usar a forma async
    //já que a função que vem do nosso utils é async
    async function setPaymentMode() {
      if (items.length) {
        //primeiro bate na API /order/create-payment-intent
        //para ir na API tem que enviar os itens do carrinho
        const data = await createPaymentIntent({
          items,
          token: session.jwt
        })
        //se o freeGames tiver true, seta o freegames
        //e faz o fluxo do jogo gratuito
        if (data.freeGames) {
          setFreeGames(true)
          return
        }

        //se tiver erro faz o setError
        if (data.error) {
          setError(data.error)
          return
        }

        //se não for nenhum dos casos acima o paymentIntent foi valido
        setFreeGames(false)
        setClientSecret(data.client_secret)
        //Toda vez que o usuário adicionar um item tem que atualizar o seu preço
        //como tem vários fetchs e condições, melhor criar um método no utils
      }
    }

    setPaymentMode()
  }, [items, session])

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  //método para salvar conta no banco
  const saveOrder = async (paymentIntent?: PaymentIntent) => {
    const data = await createPayment({
      items,
      paymentIntent,
      token: session.jwt
    })

    return data
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault() //previne a página de dar refresh
    setLoading(true)

    if (freeGames) {
      //salva no banco
      //bater na API de orders
      saveOrder()
      //redireciona
      push('/success')
      return
    }

    const payload = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement)!
      }
    })

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setLoading(false)
    } else {
      setError(null)
      setLoading(false)

      // salvar a compra no banco do Strapi
      //bater na API de orders
      saveOrder(payload.paymentIntent)
      // redirectionar para a página de Sucesso
      push('/success')
    }
  }

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        <S.Body>
          <Heading color="black" lineBottom size="small">
            Payment
          </Heading>

          {freeGames ? (
            <S.FreeGames>Only free games, click buy and enjoy!</S.FreeGames>
          ) : (
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: '16px'
                  }
                }
              }}
              onChange={handleChange}
            />
          )}
          {error && (
            <S.Error>
              <ErrorOutline size={20} /> {error}
            </S.Error>
          )}
        </S.Body>
        <S.Footer>
          <Link href="/" passHref>
            <Button as="a" fullWidth minimal>
              Continue shopping
            </Button>
          </Link>
          <Button
            fullWidth
            icon={loading ? <FormLoading /> : <ShoppingCart />}
            disabled={!freeGames && (disabled || !!error)}
          >
            {!loading && <span>Buy now</span>}
          </Button>
        </S.Footer>
      </form>
    </S.Wrapper>
  )
}

export default PaymentForm
