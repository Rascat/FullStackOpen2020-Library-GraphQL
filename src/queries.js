import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      name
      bookCount
      id
    }
    published
    genres
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!, 
    $author: String!, 
    $published: Int!, 
    $genres: [String!]!
  ) {
    addBook(
      title: $title,
      author: $author,
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    ...BookDetails
  }
}

${BOOK_DETAILS}
`

export const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const EDIT_YOB = gql`
  mutation editYOB($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
      id
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`