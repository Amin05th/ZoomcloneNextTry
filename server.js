const express = require('express')
const helmet = require('helmet')
const path = require('path')
const uuid = require('uuid')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./User')
const Port = 3000
const app = express()
let RoomId

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
)
app.use(express.static('Startpagebuild'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
mongoose.connect('mongodb://localhost/zoom')

app.get('/', (req, res) => {
  res.redirect(`/${uuid.v4()}`)
})

app.get('/meeting', (req, res) => {
  res.redirect(`/${uuid.v4()}/meeting/`)
})

app.get('/:id', async (req, res) => {
  const param = req.params.id
  res.sendFile(path.join(__dirname, '/Startpagebuild/Startpage.html'))
  if ((await User.exists({ _id: param })) != null) return
  await User.create({ _id: param })
})

app.get('/:id/meeting/', (req, res) => {
  RoomId = req.params.id
  app.use(`/${req.params.id}/meeting/`, express.static('Meetingbuild'))
  res.sendFile(path.join('/Meetingbuild/Meetingroom.html'), { root: __dirname })
})

app.get('/user/data', async (req, res) => {
  const UserDataBase = await User.find({})
  res.json(UserDataBase)
})

app.get('/room/roomid', (req, res) => {
  res.json(RoomId)
})
app.listen(Port)
