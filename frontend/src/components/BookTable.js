import React from 'react'
import PropTypes from 'prop-types'

const BookTable = ({ books }) => {
  if (books.length === 0) {
    return <div>No books to show</div>
  }

  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>
            author
            </th>
          <th>
            published
            </th>
        </tr>
        {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
      </tbody>
    </table>
  )
}

BookTable.propTypes = {
  books: PropTypes.array.isRequired
}

export default BookTable