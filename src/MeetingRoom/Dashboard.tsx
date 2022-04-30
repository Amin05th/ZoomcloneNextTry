import Meetingroom from './Meetingroom'
import Buttons from './Buttons'
import { StreamProvider } from './StreamProvider'

const MettingrroomDashboard = () => {
  return (
    <div
      className="d-flex flex-column"
      style={{ height: '100vh', width: '100vw', backgroundColor: 'black' }}
    >
      <StreamProvider>
        <Meetingroom />
        <Buttons />
      </StreamProvider>
    </div>
  )
}

export default MettingrroomDashboard
