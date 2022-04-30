import { useEffect, useState } from 'react'
import CreateButton from './createButton'
import InsertetPeople from './InsertetPeople'

interface Props {
  AddedValueToCall: string
}

const UpperbodyDashboard = (props: Props) => {
  const [AddedValueToCall, setAddedValueToCall]: any = useState([])

  useEffect(() => {
    if (props.AddedValueToCall == undefined) return
    setAddedValueToCall((prevValue: string) => {
      if (prevValue.includes(props.AddedValueToCall)) {
        return prevValue.filter((previd: string) => {
          return props.AddedValueToCall === previd
        })
      }
      return [...prevValue, props.AddedValueToCall]
    })
  }, [props.AddedValueToCall])

  return (
    <div>
      <CreateButton AddedValueToCall={AddedValueToCall} />
      <InsertetPeople AddedValueToCall={AddedValueToCall} />
    </div>
  )
}

export default UpperbodyDashboard
