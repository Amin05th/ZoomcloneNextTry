import { Component, FormEvent } from 'react'
import { FormControl } from 'react-bootstrap'

interface Props {
  setText: React.Dispatch<React.SetStateAction<string>>
}

export default class SearchInput extends Component<Props> {
  constructor(props: Props | Readonly<Props>) {
    super(props)
    this.changedInput = this.changedInput.bind(this)
  }

  changedInput(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    this.props.setText(e.target.value)
  }

  render() {
    return (
      <FormControl placeholder="Search" onInput={(e) => this.changedInput(e)} />
    )
  }
}
