import { gql } from '@apollo/client'

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    bookCount
    born
  }
}
`

const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author
    published
  }
}
`

const CREATE_BOOK = gql`
mutation addBook($title: String, $author: String, $published: Int, $genres: [String]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author
    published
  }
}
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
  }
}
`

export  { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, EDIT_AUTHOR }