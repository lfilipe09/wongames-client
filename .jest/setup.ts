import '@testing-library/jest-dom'
import 'jest-styled-components'
import dotenv from 'dotenv'

//essa é uma biblioteca para fazer leitura de variáveis ambientes
//para o jest entender a variável de ambiente
dotenv.config({
  path: '.env.development'
})