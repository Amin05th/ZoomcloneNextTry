import { useRef, useEffect } from 'react'
import { useStream } from './StreamProvider'
import peer from 'peerjs'
import io from 'socket.io-client'
import axios from 'axios'

function Meetingroom() {
  const VideoGrid: any = useRef()
  const Stream = useStream()
  const PeerList: any[] = []
  const ClosePeers: any[] = []
  const Peer = new peer(undefined, {
    host: '/',
    port: 3001,
  })
  const socket = io('http://localhost:8000/')

  useEffect(() => {
    async function OpenPeer() {
      const FetchRoomId = await axios.get('/room/roomid')
      const RoomId = FetchRoomId.data
      Peer.on('open', (id: string) => {
        socket.emit('join-room', RoomId, id)
      })
    }
    OpenPeer()
  })

  socket.on('user-disconnected', (userId) => {
    if (ClosePeers[userId]) return ClosePeers[userId].close()
  })

  function PeerCall() {
    Stream.Stream.then((mystream: any) => {
      AddMyVideo(mystream)
      socket.on('user-connected', (Id) => {
        const call = Peer.call(Id, mystream)
        call.on('stream', (remoteStream) => {
          if (PeerList.includes(call.peer)) return
          AddRemoteVideo(remoteStream, call)
          PeerList.push(call.peer)
        })
        ClosePeers[Id] = call
      })
    })
  }
  PeerCall()

  Peer.on('call', (call) => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        call.answer(stream)
        call.on('stream', (remoteStream) => {
          if (PeerList.includes(call.peer)) return
          AddRemoteVideo(remoteStream, call)
          PeerList.push(call.peer)
        })
      })
  })

  function AddMyVideo(stream: any) {
    if (VideoGrid.current == null) return
    const video = document.createElement('video')
    video.srcObject = stream
    video.onloadeddata = function () {
      video.play()
      video.muted = true
    }
    VideoGrid.current.append(video)
  }

  function AddRemoteVideo(
    stream: MediaProvider | null,
    call: peer.MediaConnection
  ) {
    if (VideoGrid.current === undefined) return
    const video = document.createElement('video')
    video.srcObject = stream
    video.onloadeddata = function () {
      video.play()
    }
    VideoGrid.current.append(video)
    call.on('close', () => {
      video.remove()
    })
  }

  return (
    <div
      ref={VideoGrid}
      className="d-flex justify-content-center align-items-center overflow-auto"
      style={{ height: '80%', width: '100%', flexWrap: 'wrap' }}
    ></div>
  )
}

export default Meetingroom
