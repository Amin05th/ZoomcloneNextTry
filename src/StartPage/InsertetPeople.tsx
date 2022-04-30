import { Component } from 'react'
import { ListGroup } from 'react-bootstrap'

interface Props {
  AddedValueToCall: string[]
}

export default class InsertetPeople extends Component<Props> {
  render() {
    return (
      <div>
        <ListGroup
          className="w-100 list-unstyled overflow-auto m-2 d-flex justify-content-center"
          style={{ maxHeight: '30vh', height: '30vh' }}
        >
          {this.props.AddedValueToCall.map((User: any, index: number) => {
            return <div key={index}>{User._id}</div>
          })}
        </ListGroup>
      </div>
    )
  }
}
