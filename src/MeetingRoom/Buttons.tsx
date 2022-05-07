import React from 'react'
import { Button } from 'react-bootstrap'
import { useStream } from './StreamProvider'

function Buttons() {
  const Stream = useStream()

  function toggleCam() {
    Stream.Stream.then((myStream: { getVideoTracks: () => any[] }) => {
      myStream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled))
    })
  }

  function toggleAudio() {
    Stream.Stream.then((myStream: { getAudioTracks: () => any[] }) => {
      myStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled))
    })
  }

  function leaveCall() {
    window.location.href = '/'
  }

  return (
    <div className="flex-grow-1 d-flex justify-content-center align-items-start gap-2 mt-3">
      <Button
        onClick={() => {
          toggleCam()
        }}
        variant="light"
        style={{ width: '80px', height: '40px' }}
      >
        Cam
      </Button>
      <Button
        onClick={() => {
          toggleAudio()
        }}
        variant="light"
        style={{ width: '80px', height: '40px' }}
      >
        Audio
      </Button>
      <Button variant="light" style={{ width: '80px', height: '40px' }}>
        Invite
      </Button>
      <Button
        onClick={() => leaveCall()}
        variant="light"
        style={{ width: '80px', height: '40px' }}
      >
        Leave
      </Button>
    </div>
  )
}

export default Buttons
