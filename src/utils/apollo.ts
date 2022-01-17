import { ApolloClient, HttpLink, NormalizedCacheObject } from '@apollo/client'
import { useMemo } from 'react'
import apolloCache from './apolloCache'

//fala que o apolo pode começar com null par auqe não caia no if(exist) das funções do initializeApollo e useApollo
let apolloClient: ApolloClient<NormalizedCacheObject | null>

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', //true
    link: new HttpLink({ uri: 'http://localhost:1337/graphql' }),
    cache: apolloCache
  })
}
//o ssr ser window signidica que sempre ele vai verificar o
//window da pagina, se ela tiver undefined é porque é ssr. Se window existir ele não vai fazer ssr

//vamos criar uma função para não criar o apollo 2x
//para que, caso já tenha uma instância do apollo, ele pegar
//do cache

export function initializeApollo(initialState = null) {
  //serve para verificar se já existe uma instância para naõ criar outra
  const apolloClientGlobal = apolloClient ?? createApolloClient()

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
export function useApollo(initialState = null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]) //quer fazer isso só quando o initialState mudar
  return store
}
