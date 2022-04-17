import { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import axios from 'axios'

interface Props {
  Text: string
  setAddedValueToCall: any
}

function SearchfiltredUser(props: Props) {
  const [FilltredData, setFilltredData] = useState([])

  useEffect(() => {
    async function fetchdata() {
      const response = await axios.get('/user/data')
      const Data = response.data
      const FilltredData = Data.filter((User: any) => {
        return User._id.includes(props.Text)
      })
      setFilltredData(FilltredData)
    }
    fetchdata()
  }, [props.Text])

  function SelectUser(index: number) {
    const ClickedValue = FilltredData[index]
    props.setAddedValueToCall(ClickedValue)
  }

  return (
    <ListGroup
      className="list-unstyled w-100 overflow-auto ps-4 mt-2"
      style={{ maxHeight: '50vh', boxShadow: '0px 0px 0px 3.5px lightgray' }}
    >
      {FilltredData.map((User: any, index: number) => {
        return <div onClick={() => SelectUser(index)}>{User._id}</div>
      })}
    </ListGroup>
  )
}

export default SearchfiltredUser
