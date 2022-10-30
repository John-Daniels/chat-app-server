const http = require("http")
const express = require("express")
const { Server } = require("socket.io")

const port = process.env.PORT || 5000
const app = express()
app.get("/", (req, res) => {
  res.send("welcome to my web socket")
})
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
  },
})

io.on("connection", (client) => {
  console.log("new client connection", client.id)
  client.on("position-change", (data) => {
    console.log(data)
    client.broadcast.emit("position-change", data)
  })

  client.on("disconnect", () => {
    console.log("client disconnect")
  })
})

server.listen(port, () => {
  console.clear()
  console.log(`server is up at port ${port}!`)
})
