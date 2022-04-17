import { Component } from 'react'
import { FormControl } from 'react-bootstrap'

interface Props {
  setText: any
}

export default class SearchInput extends Component<Props> {
  constructor(props: any | Readonly<Props>) {
    super(props)
    this.changedInput = this.changedInput.bind(this)
  }

  changedInput(e: any) {
    this.props.setText(e.target.value)
  }

  render() {
    return (
      <FormControl placeholder="Search" onInput={(e) => this.changedInput(e)} />
    )
  }
}
