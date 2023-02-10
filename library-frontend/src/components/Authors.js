import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import Select from 'react-select';
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from "../queries/queries"

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [selectedOption, setSelectedOption] = useState(null);
  const [born, setBorn] = useState('') 

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors.map(author => {
    return {
      name: author.name,
      born: author.born,
      bookCount: author.bookCount
    }

  })

  const handleEditAuthor = (event) => {
    event.preventDefault()

    let setBornTo = Number.parseInt(born)
    let name = selectedOption.value
    editAuthor({  variables: { name, setBornTo} })

    setBorn('')
    setSelectedOption('')

  }
  const options = authors.map(author => {
    return {
      value : author.name,
      label : author.name
    }
  })

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h2>Edit Author</h2>
      <form onSubmit={handleEditAuthor}>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
        <div>
          born:
          <input value={born} onChange={({ target }) => setBorn(target.value) }/>      
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Authors
