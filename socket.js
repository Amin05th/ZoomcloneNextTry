const Socketport = 8000
const io = require('socket.io')(Socketport, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  socket.on('join-room', (Roomid, clientId) => {
    socket.join(Roomid)
    socket.to(Roomid).emit('connect-users', clientId)

    socket.on('disconnect', () => {
      socket.to(Roomid).emit('user-disconnected', clientId)
    })
  })
})
