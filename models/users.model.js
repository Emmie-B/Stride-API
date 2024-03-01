import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    transactionkey: {
      type: String,
      required: true,
      trim: true
    },
    publicKey: {
      type: String,
      required: true,
      trim: true
    },
    privateKey: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)

export default User
