import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'

import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'

import BookTable from './BookTable'

const Books = (props) => {
  const [genres, setGenres] = useState(new Set())
  const [books, setBooks] = useState([])
  const allBooksResult = useQuery(ALL_BOOKS)
  const [getBooksByGenre, { data }] = useLazyQuery(BOOKS_BY_GENRE)

  useEffect(() => {
    if (allBooksResult.data) {
      console.log('Executing effect hook of query')
      const books = allBooksResult.data.allBooks
      setBooks(books)

      const genresToAdd = []
      books.forEach(book => genresToAdd.push(...book.genres))
      setGenres(new Set([...genresToAdd]))
    }
  }, [allBooksResult.data])

  useEffect(() => {
    if (data) {
      console.log('Executing effect hook of lazy query')
      setBooks(data.allBooks)
    }
  }, [data])

  const showGenre = genre => {
    getBooksByGenre({ variables: { genre } })
  }


  if (!props.show) {
    return null
  }

  if (allBooksResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <BookTable
        books={books}
      />

      <div>
        {Array.from(genres).map(genre =>
          (<button key={genre} onClick={() => showGenre(genre)}>{genre}</button>))}
        <button onClick={() => showGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books