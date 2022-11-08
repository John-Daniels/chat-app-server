import mongoose from "mongoose"

const userSchema = mongoose.Schema(
  {
    username: String,
    avater: String,
    room: String,
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("Users", userSchema)

export default User
