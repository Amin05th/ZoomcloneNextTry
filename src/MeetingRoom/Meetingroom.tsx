import { useRef } from 'react'
import { useStream } from './StreamProvider'
import Peer from 'peerjs'
import io from 'socket.io-client'
import axios from 'axios'

function Meetingroom() {
  const socket = io('http://localhost:8000/')
  const videoGrid: any = useRef()
  const Stream = useStream()
  const myPeer = new Peer(undefined, {
    port: 3001,
    host: '/',
  })
  const myVideo = document.createElement('video')
  myVideo.muted = true
  const peers: any = {}

  Stream.Stream.then((stream: any) => {
    addVideoStream(myVideo, stream)

    myPeer.on('call', (call) => {
      call.answer(stream)
      const video = document.createElement('video')
      call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream)
        call.on('close', () => {
          video.remove()
        })
      })
    })
    socket.emit('ready')

    socket.on('user-connected', (userId) => {
      connectToNewUser(userId, stream)
    })
  })

  socket.on('user-disconnected', (userId) => {
    if (peers[userId]) peers[userId].close()
    for (const conns in myPeer.connections) {
      myPeer.connections[conns].forEach((conn: any) => {
        conn.peerConnection.close()
        if (conn.close) conn.close()
      })
    }
  })

  myPeer.on('open', (id) => {
    axios.get('/id/ids').then((RoomID) => {
      socket.emit('join-room', RoomID.data, id)
    })
  })

  function connectToNewUser(userId: any, stream: any) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', (userVideoStream) => {
      addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
      video.remove()
    })

    peers[userId] = call
  }

  function addVideoStream(video: any, stream: any) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.current.append(video)
  }

  return (
    <div
      ref={videoGrid}
      className="d-flex justify-content-center align-items-center overflow-auto"
      style={{ height: '80%', width: '100%', flexWrap: 'wrap' }}
    ></div>
  )
}

export default Meetingroom
