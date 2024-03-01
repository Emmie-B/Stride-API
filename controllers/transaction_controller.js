import {
  Keypair,
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  LAMPORTS_PER_SOL
} from '@solana/web3.js'
import User from '../models/users.model.js'
import GlobalKey from '../models/globalkey.model.js'
import { convertSLEtoSOL } from './exchange_controller.js'
import 'dotenv/config'

const makeTransfer = async (req, res) => {
  const userId = req.body.id
  const receiverPhone = req.body.phone
  const amount = req.body.amount
  const transactionkey = req.body.transactionkey
  //    convert SLE to SOL

  // convertSOLtoSLE()

  try {
    const convertedAmount = convertSLEtoSOL(amount, 0.0081)
    console.log(convertedAmount)
    // Fetch sender information
    const sender = await User.findById(userId)

    // console.log(sender.privateKey)

    // Parse the string representation into an array of integers
    const privateKeyArray = sender.privateKey
      .split(',')
      .map(num => parseInt(num.trim()))

    // Create the Uint8Array from the array of integers
    const privateKeyUint8Array = Uint8Array.from(privateKeyArray)

    // Create the sender's Keypair
    const senderKeypair = Keypair.fromSecretKey(privateKeyUint8Array)

    // console.log(senderKeypair)
    const fromPubkey = senderKeypair.publicKey
    // console.log(`des: `, fromPubkey.toBase58())

    // Fetch receiver information
    const receiver = await GlobalKey.findOne({ phone: receiverPhone })
      .then(data => {
        // console.log(`phone: `, data.publickey)
        if (!data) {
            return res.status(404).json({ message: 'Receiver not found' })
        } else {
          return data
        }
      })
      .catch(err => {
        console.log(err.message)
      })

    // console.log(receiver)
    const toPubkey = new PublicKey(receiver.publickey)
    console.log(toPubkey.toBase58())

    // Validate public keys
    if (!PublicKey.isOnCurve(toPubkey) || !PublicKey.isOnCurve(fromPubkey)) {
      throw new Error('Invalid public key')
    }

    // Initialize Solana connection
    const connection = new Connection(
      'https://api.devnet.solana.com',
      'confirmed'
    )

    // Build and send transaction

    // check if the transaction key is valid
    console.log(`fst:`, transactionkey)
    console.log(`Sec`, sender.transactionkey)
    if (transactionkey !== sender.transactionkey) {
       return res.status(400).json({ message: 'Invalid transaction key' })
    } else {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromPubkey,
          toPubkey: toPubkey,
          lamports: LAMPORTS_PER_SOL * convertedAmount
        })
      )
      const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [senderKeypair]
      )
      if (signature) {
        res.status(200).json({
          message: `Transaction successful! Signature: ${signature}, Amount: ${convertedAmount} SOL, Receiver: ${toPubkey.toBase58()}, Amount received: ${amount} SLE`
        })
      }
    }

    // console.log('Transaction signature:', signature)
  } catch (error) {
    console.error('Transaction failed:', error.message)
    return 'Transaction failed!'
  }
}

export default makeTransfer
