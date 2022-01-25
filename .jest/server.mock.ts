//toda vez que tentar chamar o fetch, é substituído por esse fetch aqui
global.fetch = require('node-fetch')

import {server} from '../src/utils/mockServer/server'

//estamos definindo o beforeAll e etc aqui e não no setup.ts
//porque não queremos que ele execute em cada teste literalmente
//e sim somente quando for importado nos testes que fazem esse tipo de
//requisição

//antes de cada teste da aplicação
beforeAll(() => {
  //ficar escutando todas as chamadas nos testes
  server.listen()
})

//depois de cada teste 
afterEach(() => {
  //reseta todos os handlers para caso eles sejam chamados
  //novamente
  server.restoreHandlers()
})

//depois dos testes da aplicação
afterAll(() => {
  //fecha o server e limpa os tests
  server.close()
})