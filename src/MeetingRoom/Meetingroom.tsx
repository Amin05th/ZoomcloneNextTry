import { useRef } from 'react'
import { useStream } from './StreamProvider'
import Peer, {MediaConnection} from 'peerjs'
import io from 'socket.io-client'
import axios from 'axios'

function Meetingroom() {
  const socket = io('http://localhost:8000/')
  const videoGrid = useRef<HTMLVideoElement>(null)
  const Stream = useStream()
  const myPeer = new Peer(undefined, {
    port: 3001,
    host: '/',
  })
  const myVideo = document.createElement('video')
  myVideo.muted = true

  Stream.Stream.then((stream: MediaStream) => {
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

  socket.on('user-disconnected', () => {
    for (const conns in myPeer.connections) {
      myPeer.connections[conns].forEach((conn: MediaConnection) => {
        console.log(conn)
        conn.peerConnection.close()
        if (conn.close) conn.close()
      })
    }
  })

  myPeer.on('open', (id) => {
    axios.get('/id/ids').then((RoomID) => {
      socket.emit('join-room', RoomID.data.RoomId, id)
    })
  })

  function connectToNewUser(userId: string, stream: MediaStream) {
    const InvitedMembers: string[] = []
    PushMembersinArray(InvitedMembers)

    axios.get('/id/ownid/').then((res) => {
      const isIncluded = InvitedMembers.includes(res.data)
      if (!isIncluded) return
      const call = myPeer.call(userId, stream)
      const video = document.createElement('video')
      call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream)
      })
      call.on('close', () => {
        video.remove()
      })
    })
  }

  function addVideoStream(video: HTMLVideoElement, stream: MediaStream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.current.append(video)
  }

  function PushMembersinArray(Array: string[]) {
    axios.get('/meeting/members').then((res) => {
      res.data.forEach((Member: {_id: string}) => {
        Array.push(Member._id)
      })
    })
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
