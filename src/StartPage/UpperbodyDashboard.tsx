import { useEffect, useState } from 'react'
import CreateButton from './createButton'
import InsertetPeople from './InsertetPeople'
import JoiningRoom from './JoiningRoom'

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
      <div className="d-flex justify-content-between mt-3">
        <JoiningRoom />
        <CreateButton AddedValueToCall={AddedValueToCall} />
      </div>
      <InsertetPeople AddedValueToCall={AddedValueToCall} />
    </div>
  )
}

export default UpperbodyDashboard
