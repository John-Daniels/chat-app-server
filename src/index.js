// import { config } from "dotenv"
// config()

// import "./db/index.js"

import http from "http"
import express from "express"
import initializeSockets from "./controllers/sockets/socket.controller.js"

const port = process.env.PORT || 5000
const app = express()

app.use(express.static('web'))

const server = http.createServer(app)

initializeSockets(server)

server.listen(port, () => console.log(`server is up at port ${port}!`))
