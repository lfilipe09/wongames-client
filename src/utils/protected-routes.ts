import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'

async function protectedRoutes(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  if (!session) {
    context.res.setHeader(
      'Location',
      `/sign-in?callbackUrl=${context.resolvedUrl}` //ele redireciona pro sign in, mas informa via callback url qual a url profile me que tva tenando entrar
    )
    context.res.statusCode = 302
  }

  return session
}

export default protectedRoutes
