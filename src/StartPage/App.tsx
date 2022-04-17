import { useState, useEffect } from 'react'
import UpperbodyDashboard from './UpperbodyDashboard'
import SearchfiltredUser from './SearchfiltredUser'
import SearchInput from './SearchInput'
import { Container } from 'react-bootstrap'
import io from 'socket.io-client'

function App() {
  const [Text, setText] = useState('')
  const [AddedValueToCall, setAddedValueToCall] = useState()
  const [Socket, setSocket]: any = useState()

  useEffect(() => {
    const socket = io('http://localhost:8000')
    setSocket(socket)
  }, [])

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
