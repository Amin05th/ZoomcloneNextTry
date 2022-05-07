const Socketport = 8000
const io = require('socket.io')(Socketport, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  socket.on('join-room', (RoomId, Id) => {
    socket.join(RoomId)
    socket.on('ready', () => {
      socket.to(RoomId).emit('user-connected', Id)
    })

    socket.on('disconnect', () => {
      socket.to(RoomId).emit('user-disconnected')
    })
  })
})
