import React from 'react'
import { Button } from 'react-bootstrap'
import { useStream } from './StreamProvider'

function Buttons() {
  const Stream = useStream()

  function toggleCam() {
    Stream.Stream.then((myStream: any) => {
      myStream
        .getVideoTracks()
        .forEach((track: any) => (track.enabled = !track.enabled))
    })
  }

  function toggleAudio() {
    Stream.Stream.then((myStream: any) => {
      myStream
        .getAudioTracks()
        .forEach((track: any) => (track.enabled = !track.enabled))
    })
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
      <Button variant="light" style={{ width: '80px', height: '40px' }}>
        Leave
      </Button>
    </div>
  )
}

export default Buttons
