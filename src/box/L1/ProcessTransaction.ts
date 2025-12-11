import { globalStates } from '@/state'
import type { Connection, Transaction } from '@solana/web3.js'

export async function processTranction(transaction: Transaction, connection: Connection) {
  transaction.feePayer = globalStates.userPublicKey
  const blockhashWithExpiryBlockHeight = await connection.getLatestBlockhash()
  transaction.recentBlockhash = blockhashWithExpiryBlockHeight.blockhash
  transaction.lastValidBlockHeight = blockhashWithExpiryBlockHeight.lastValidBlockHeight
  await globalStates.injectedWeb3WalletProvider.signAndSendTransaction(transaction)
  // const { signature } =
  //   await globalStates.injectedWeb3WalletProvider.signAndSendTransaction(transaction)
  // await connection.confirmTransaction(
  //   {
  //     signature: signature,
  //     blockhash: blockhashWithExpiryBlockHeight.blockhash,
  //     lastValidBlockHeight: blockhashWithExpiryBlockHeight.lastValidBlockHeight,
  //   },
  //   'confirmed',
  // )
  return true
}
