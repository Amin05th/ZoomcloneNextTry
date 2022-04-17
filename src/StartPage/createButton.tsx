import { Component } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'

interface Props {
  AddedValueToCall: any
}

export default class createButton extends Component<Props> {
  SendInsertedPeople() {
    axios.post('/meeting/members', {
      Members: this.props.AddedValueToCall,
    })
  }

  render() {
    return (
      <form
        action="/meeting"
        method="GET"
        className="d-flex justify-content-end mt-3"
      >
        <Button type="submit" onClick={() => this.SendInsertedPeople()}>
          CREATE
        </Button>
      </form>
    )
  }
}
