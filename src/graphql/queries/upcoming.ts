import { gql } from '@apollo/client'
import { HighlightFragment } from 'graphql/fragments/highlight'
import { GameFragment } from 'graphql/fragments/game'

export const QUERY_UPCOMING = gql`
  query QueryUpcoming($date: Date!) {
    upcomingGames: games(
      where: { release_date_gt: $date }
      sort: "release_date:asc"
      limit: 8
    ) {
      ...GameFragment
    }

    showcase: home {
      upcomingGames {
        title
        highlight {
          ...HighlightFragment
        }
      }
    }
  }

  ${HighlightFragment}
  ${GameFragment}
`
