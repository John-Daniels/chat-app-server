import http from "http"
import express from "express"
import initializeSockets from "./controllers/sockets/socket.controller.js"

const port = 5000

const app = express()
app.get("/", (req, res) => {
  res.send("welcome to my chat-app server")
})

app.get("/test", (req, res) => {
  res.send("welcome to my chat-app server")
})

const server = http.createServer(app)

initializeSockets(server)

server.listen(port, () => {
  console.clear()
  console.log(`server is up at port ${port}!`)
})
