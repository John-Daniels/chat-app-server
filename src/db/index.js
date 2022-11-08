import { config } from "dotenv"
config()

import mongoose from "mongoose"
const main = () => {
  try {
    mongoose.connect(process.env.MONGO_URI)
    console.log("connected succesfully!")
  } catch (e) {
    console.log("Couldn'nt connect to the database!", e)
  }
}

main()
