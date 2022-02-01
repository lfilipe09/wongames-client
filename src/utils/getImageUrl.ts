export const getImageUrl = (url: string | undefined) => {
  if (process.env.NEXT_PUBLIC_IMAGE_HOST) {
    return `${process.env.NEXT_PUBLIC_IMAGE_HOST}${url}`
  }
  //Se não tem o de cima, manda só a url
  if (url) {
    return url
  }

  //Se não tiver nada, retorna nulo
  return null
}
