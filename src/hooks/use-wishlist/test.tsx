import { MockedProvider } from '@apollo/client/testing'
import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import { useWishlist, WishlistProvider } from '.'
import {
  createWishlistMock,
  removeWishlistMock,
  updateWishlistMock,
  wishlistItems,
  wishlistMock
} from './mock'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useSession = jest.spyOn(require('next-auth/client'), 'useSession')
const session = { jwt: '123', user: { email: 'lorem@ipsum.com' } }
useSession.mockImplementation(() => [session])

describe('useWishlist', () => {
  it('should return wishlist items', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      //vai ser o cara que vai mockar as chamadas do apollo apra não bater no backend e vai receber um array do mocks, se a chamada tiver igual a do mock, retorna do mock
      //Além do mockprovider do apollo, precisa do wishlist provider que criamos, pois ele vai ser capaz de retornar os dados, métodos e etc
      <MockedProvider mocks={[wishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    )

    //renderHook recebe uma callback que retorna a nossa a callback do nosso hook e dpeois recebe um objeto que vai renderizar o hook
    //e o nosso result vira o nosso hook
    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    })

    //it starts loading the data
    expect(result.current.loading).toBe(true)

    //wait until get the data
    await waitForNextUpdate()

    expect(result.current.items).toStrictEqual([
      wishlistItems[0],
      wishlistItems[1]
    ])
  })

  it('should check if the game is in wishlist', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      //vai ser o cara que vai mockar as chamadas do apollo apra não bater no backend e vai receber um array do mocks, se a chamada tiver igual a do mock, retorna do mock
      //Além do mockprovider do apollo, precisa do wishlist provider que criamos, pois ele vai ser capaz de retornar os dados, métodos e etc
      <MockedProvider mocks={[wishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    )

    //renderHook recebe uma callback que retorna a nossa a callback do nosso hook e dpeois recebe um objeto que vai renderizar o hook
    //e o nosso result vira o nosso hook
    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    })

    //wait until get the data
    await waitForNextUpdate()

    expect(result.current.isInWishlist('1')).toBe(true)
    expect(result.current.isInWishlist('2')).toBe(true)
    expect(result.current.isInWishlist('3')).toBe(false)
  })

  it('should add item in wishlist creating a new list', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      //vai ser o cara que vai mockar as chamadas do apollo apra não bater no backend e vai receber um array do mocks, se a chamada tiver igual a do mock, retorna do mock
      //Além do mockprovider do apollo, precisa do wishlist provider que criamos, pois ele vai ser capaz de retornar os dados, métodos e etc
      <MockedProvider mocks={[createWishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    )

    //renderHook recebe uma callback que retorna a nossa a callback do nosso hook e dpeois recebe um objeto que vai renderizar o hook
    //e o nosso result vira o nosso hook
    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    })

    //act serve para rodar coisas que modifiquem estados
    act(() => {
      result.current.addToWishlist('3')
    })

    await waitForNextUpdate()
    expect(result.current.items).toStrictEqual([wishlistItems[2]])
  })

  it('should add item in wishlist updating the current list', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      //vai ser o cara que vai mockar as chamadas do apollo apra não bater no backend e vai receber um array do mocks, se a chamada tiver igual a do mock, retorna do mock
      //Além do mockprovider do apollo, precisa do wishlist provider que criamos, pois ele vai ser capaz de retornar os dados, métodos e etc
      <MockedProvider mocks={[wishlistMock, updateWishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    )

    //renderHook recebe uma callback que retorna a nossa a callback do nosso hook e dpeois recebe um objeto que vai renderizar o hook
    //e o nosso result vira o nosso hook
    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    })

    //espera os dados chegarem
    await waitForNextUpdate()

    //act serve para rodar coisas que modifiquem estados
    act(() => {
      result.current.addToWishlist('3')
    })

    await waitFor(() => {
      expect(result.current.items).toStrictEqual(wishlistItems)
    })
  })

  it('should remove item from wishlist', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      //vai ser o cara que vai mockar as chamadas do apollo apra não bater no backend e vai receber um array do mocks, se a chamada tiver igual a do mock, retorna do mock
      //Além do mockprovider do apollo, precisa do wishlist provider que criamos, pois ele vai ser capaz de retornar os dados, métodos e etc
      <MockedProvider mocks={[wishlistMock, removeWishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    )

    //renderHook recebe uma callback que retorna a nossa a callback do nosso hook e dpeois recebe um objeto que vai renderizar o hook
    //e o nosso result vira o nosso hook
    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    })

    //espera os dados chegarem
    await waitForNextUpdate()

    //act serve para rodar coisas que modifiquem estados
    act(() => {
      result.current.removeFromWishlist('1')
    })

    await waitFor(() => {
      expect(result.current.items).toStrictEqual([wishlistItems[1]])
    })
  })
})
