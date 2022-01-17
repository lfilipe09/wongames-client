import { gql } from '@apollo/client'
import { HighlightFragment } from 'graphql/fragments/highlight'
import { GameFragment } from 'graphql/fragments/game'

export const QUERY_RECOMMENDED = gql`
  query QueryRecommended {
    recommended {
      section {
        title
        highlight {
          ...HighlightFragment
        }
        games {
          ...GameFragment
        }
      }
    }
  }

  ${HighlightFragment}
  ${GameFragment}
`
