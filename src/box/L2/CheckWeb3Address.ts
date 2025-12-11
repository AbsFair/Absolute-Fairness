import { globalStates, msg_2 } from '@/state'
import { showWarningDialog } from '../L1/ShowWarningDialog'

export async function checkWeb3Address() {
  if (
    globalStates.userPublicKey != undefined &&
    globalStates.injectedWeb3WalletProvider != undefined
  ) {
    try {
      const reponse = await globalStates.injectedWeb3WalletProvider.connect()
      if (reponse.publicKey.toString() == globalStates.userPublicKey.toString()) {
        return 3
      } else {
        const message =
          `You've switched your ${globalStates.nameOfTheWeb3Wallet} accounts! ` +
          'Please return to the homepage to start over.'
        showWarningDialog(true, message)
        return 2
      }
    } catch (error) {
      showWarningDialog(false, String(error))
      return 1
    }
  } else {
    showWarningDialog(true, msg_2)
    return 0
  }
}
