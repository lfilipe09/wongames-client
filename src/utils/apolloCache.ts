import { InMemoryCache } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'

export default new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        games: concatPagination(['where', 'sort'])
      }
    },
    //aproveita o cache do apollo quando ta começando
    //para passar os dados também para a wishlist
    Wishlist: {
      fields: {
        games: {
          //o _ significa, fazer o merge do que tem antes com agora
          merge(_, incoming) {
            return incoming
          }
        }
      }
    }
  }
})
