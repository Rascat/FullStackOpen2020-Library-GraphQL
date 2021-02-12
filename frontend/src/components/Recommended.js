import React from 'react'
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

import BookTable from './BookTable'

const Recommended = props => {

  const meQueryResult = useQuery(ME)
  const allBooksQueryResult = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (meQueryResult.loading || allBooksQueryResult.loading) {
    return <div>loading ...</div>
  }

  const currentUser = meQueryResult.data.me
  const books = allBooksQueryResult.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre <em>{currentUser.favoriteGenre}</em></p>
      <BookTable books={books.filter(book => book.genres.includes(currentUser.favoriteGenre))} />
    </div>
  )

}

export default Recommended