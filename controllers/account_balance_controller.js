import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { convertSOLtoSLE } from './exchange_controller.js'

const checkAccountBalance = async (req, res) => {
  const publicKey = req.body.publickey

  try {
    const connection = new Connection(
      'https://api.devnet.solana.com',
      'confirmed'
    )
    //    check for invalid public key
    if (!PublicKey.isOnCurve(publicKey)) {
      throw new Error('Invalid public key')
    } else {
      console.log('Valid public key')
    }
    const address = new PublicKey(publicKey)
    const balance = await connection.getBalance(address)
    const convertedBalance = balance / LAMPORTS_PER_SOL
    const convertedBalanceInSLE = convertSOLtoSLE(convertedBalance, 0.0081)
    res.status(200).json({ balance: convertedBalanceInSLE })
    // return convertedBalance
  } catch (error) {
    return new Error(`${error}`)
  }
}

export default checkAccountBalance
