import { useRef } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import peer from 'peerjs'

function Meetingroom() {
  const socket = io('http://localhost:8000/')
  const VideoGrid: any = useRef()
  const Peer = new peer(undefined, {
    host: '/',
    port: 3001,
  })
  const myVideo = document.createElement('video')
  myVideo.muted = true
  const Peers: any = {}

  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    })
    .then((source) => {
      addNewVideoStream(myVideo, source)

      Peer.on('call', (call) => {
        const video = document.createElement('video')
        call.answer(source)
        call.on('stream', (userVideoStream: any) => {
          addNewVideoStream(video, userVideoStream)
        })
      })

      socket.on('connect-users', (clientId) => {
        connectToNewUser(clientId, source)
      })
    })

  socket.on('user-disconnected', (userId) => {
    if (Peers[userId]) Peers[userId].close()
  })

  Peer.on('open', (id) => {
    socket.emit('join-room', 'asdfghjkl', id)
  })

  function connectToNewUser(userId: any, stream: any) {
    const call = Peer.call(userId, stream)
    const video = document.createElement('video') 
    call.on('stream', (userVideoStream) => {
      console.log(userVideoStream)
      addNewVideoStream(video, userVideoStream)
    })

    call.on('close', () => {
      console.log('HAHA SUII')
    })
    Peers[userId] = call
  }

  function addNewVideoStream(myVideo: any, source: any) {
    myVideo.srcObject = source
    myVideo.addEventListener('loadedmetadata', () => {
      myVideo.play()
    })
    VideoGrid.current.appendChild(myVideo)
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh', width: '100vw' }}
    >
      <main style={{ width: '70%', height: '75vh' }}>
        <div
          ref={VideoGrid}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px,1fr))',
            height: '100%',
            width: '100%',
          }}
        ></div>
      </main>
    </div>
  )
}

export default Meetingroom
