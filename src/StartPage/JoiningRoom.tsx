import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

const JoiningRoom = () => {
  const [saveInputValue, setSaveInputValue] = useState()

  function ChangedInput(e: React.ChangeEvent<InputEvent>) {
    const Value = e.target.value
    setSaveInputValue(Value)
  }

  function onButtonSubmit() {
    const url = window.location.href
    const id = url.substring(url.lastIndexOf('/') + 1)
    axios.put('/id/ownId/', {
      id: id,
    })
  }

  return (
    <Form
      onSubmit={() => onButtonSubmit()}
      action={`/${saveInputValue}/meeting/`}
      className="d-flex"
    >
      <Form.Control
        placeholder="Insert RoomId"
        onChange={(e) => ChangedInput(e)}
        required
      />
      <Button type="submit">JOIN</Button>
    </Form>
  )
}

export default JoiningRoom
