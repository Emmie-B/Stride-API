import { Keypair } from '@solana/web3.js'
import User from '../models/users.model.js'
import Globalkey from '../models/globalkey.model.js'

const createAccount = (req, res) => {
  // check if the account exist via the  phone
  User.findOne({ phone: req.body.phone }).then(data => {
    if (!data) {
      const keypair = Keypair.generate()

      const user = new User({
        name: req.body.name,
        password: req.body.password,
        phone: req.body.phone,
        role: req.body.role,
        transactionkey: req.body.transactionkey,
        publicKey: keypair.publicKey.toBase58(),
        privateKey: keypair.secretKey.toString()
      })

      const globalkey = new Globalkey({
        phone: req.body.phone,
        holderId: user._id,
        holdername: req.body.name,
        publickey: keypair.publicKey.toBase58()
      })

      user
        .save()
        .then(data => {
          globalkey.save()

          res.status(201).json({ data: data, usercreated: true })
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating the User.'
          })
        })
    } else {
      res.status(200).json({ data: data, userExist: true })
    }
  })
}

const login = (req, res) => {
  User.findOne({ phone: req.body.phone, password: req.body.password })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'User not found'
        })
      } else {
        res.status(200).json({ data: data, userfound: true })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while finding the User.'
      })
    })
}

// export user
export { createAccount, login }

//  export multiple functions
