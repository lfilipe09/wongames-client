import { ApolloClient, HttpLink, NormalizedCacheObject } from '@apollo/client'
import { useMemo } from 'react'
import apolloCache from './apolloCache'
import { setContext } from '@apollo/client/link/context'
import { Session } from 'next-auth/client'

//fala que o apolo pode começar com null par auqe não caia no if(exist) das funções do initializeApollo e useApollo
let apolloClient: ApolloClient<NormalizedCacheObject | null>

function createApolloClient(session?: Session | null) {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`
  })

  //renomeou a session como clientSession
  const authLink = setContext((_, { headers, session: clientSession }) => {
    //Fazer assim faz com que a session passa vir do clinet side ou do server side
    //faz isso porque a wishlist está em páginas client side e não quer tornar o app todo server side
    const jwt = session?.jwt || clientSession?.jwt || ''
    const authorization = jwt ? `Bearer ${jwt}` : ''
    return { headers: { ...headers, authorization } }
  })

  return new ApolloClient({
    ssrMode: typeof window === 'undefined', //true
    link: authLink.concat(httpLink),
    cache: apolloCache
  })
}
//o ssr ser window signidica que sempre ele vai verificar o
//window da pagina, se ela tiver undefined é porque é ssr. Se window existir ele não vai fazer ssr

//vamos criar uma função para não criar o apollo 2x
//para que, caso já tenha uma instância do apollo, ele pegar
//do cache

export function initializeApollo(
  initialState = null,
  session?: Session | null
) {
  //serve para verificar se já existe uma instância para naõ criar outra
  const apolloClientGlobal = apolloClient ?? createApolloClient(session)

  //se já tiver um estado inicial ele restaura o estado pra dentro do global
  //ou seja, tá recuperando os dados do cache
  if (initialState) {
    apolloClientGlobal.cache.restore(initialState)
  }

  //inicializando no SSR com cache limpo (para não compartilhar o cache de um usuário x com y)
  if (typeof window === 'undefined') return apolloClientGlobal
  apolloClient = apolloClient ?? apolloClientGlobal

  return apolloClient
}

//use memo só executa se o initialState, para evitar que ele execute toda hora
export function useApollo(initialState = null, session?: Session) {
  const store = useMemo(
    () => initializeApollo(initialState, session),
    [initialState, session]
  ) //quer fazer isso só quando o initialState mudar
  return store
}
