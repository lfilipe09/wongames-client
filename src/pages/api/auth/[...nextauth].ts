import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {
  GenericObject,
  NextApiRequest,
  NextApiResponse
} from 'next-auth/_utils'

const options = {
  pages: {
    signIn: '/sign-in'
  },
  //providers são responsáveis em fazer a autenticação do usuário e retornar o nosso token
  //tem varios providers, google, github, facebook... mas estaoms usando uma api própria e por isso somente o Providers.Credentials
  providers: [
    Providers.Credentials({
      //O name é o nome que quer que apareça no formulario
      name: 'Sign-in',
      //credentials é se vc quer que ele crie a pa[gina por vc, mas a gnt já criou a página]
      credentials: {},

      //os parametros são as credenciais que vamos usar
      //ele verifica o usuário, se tiver um usuário ele o retorna, se não ele fica nulo
      async authorize({ email, password }) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
          {
            //esse objeto é oque vai enviar para o fetch
            method: 'POST',
            body: new URLSearchParams({ identifier: email, password })
          }
        )

        const data = await response.json()

        if (data.user) {
          return { ...data.user, jwt: data.jwt }
        } else {
          return null
        }
      }
    })
  ],
  //callbacks são responsáveis em retornar um conjunto de informações
  callbacks: {
    //session é para o usuário navegar entre as páginas sempre logado
    session: async (session: GenericObject, user: GenericObject) => {
      session.jwt = user.jwt
      session.id = user.id

      return Promise.resolve(session)
    },
    //para fazer chamadas autenticadas
    jwt: async (token: GenericObject, user: GenericObject) => {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.username
        token.jwt = user.jwt
      }

      return Promise.resolve(token)
    }
    //usa promise.revlte pra resolver funções assíncronas
  }
}

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)

export default Auth
