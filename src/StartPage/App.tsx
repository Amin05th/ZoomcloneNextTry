import { useState } from 'react'
import UpperbodyDashboard from './UpperbodyDashboard'
import SearchfiltredUser from './SearchfiltredUser'
import SearchInput from './SearchInput'
import { Container } from 'react-bootstrap'

function App() {
  const [Text, setText] = useState('')
  const [AddedValueToCall, setAddedValueToCall] = useState()

  return (
    <Container className="d-flex flex-column justify-content-between">
      <UpperbodyDashboard AddedValueToCall={AddedValueToCall} />
      <SearchInput setText={setText} />
      <SearchfiltredUser
        Text={Text}
        setAddedValueToCall={setAddedValueToCall}
      />
    </Container>
  )
}

export default App
