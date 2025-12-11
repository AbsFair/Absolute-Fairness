import { showWarningDialog } from '@/box/L1/ShowWarningDialog'
import { showLoadingDialog } from '@/box/L1/ShowLoadingDialog'
import { checkWeb3Address } from '@/box/L2/CheckWeb3Address'
import { SystemProgram } from '@solana/web3.js'
import { document_url, globalStates, msg_1, msg_2, nameOfTheCurrentView, viewNames } from '@/state'
import { processTranction } from '@/box/L1/ProcessTransaction'
import { refreshDAppStatusV2 } from '@/box/L5/RefreshDAppStatusV2'
import { refreshDAppStatusV3 } from '@/box/L5/RefreshDAppStatusV3'

export function query() {
  window.open(document_url + '/docs/PDARent.html', '_blank')
}

export async function refresh() {
  showLoadingDialog()
  if (nameOfTheCurrentView.value == viewNames[3]) {
    refreshDAppStatusV2(true)
  } else if (nameOfTheCurrentView.value == viewNames[4]) {
    refreshDAppStatusV3(true)
  } else {
    showWarningDialog(true, msg_1)
    console.log(msg_1)
    return
  }
}

export function tutorial() {
  switch (nameOfTheCurrentView.value) {
    case viewNames[3]:
      window.open(document_url + '/docs/FairFate.html#🚀-getting-started', '_blank')
      break
    case viewNames[4]:
      window.open(document_url + "/docs/Liar'sDice.html#step-1-pre-game-setup", '_blank')
      break
    default:
      showWarningDialog(true, msg_1)
      console.log(msg_1)
      return
  }
}

export async function register() {
  showLoadingDialog()

  if ((await checkWeb3Address()) <= 2) {
    return
  }

  if (nameOfTheCurrentView.value == viewNames[3]) {
    if ((await sendTxAndConfirmForSimple()) < 2) {
      return
    }
  } else if (nameOfTheCurrentView.value == viewNames[4]) {
    if ((await sendTxAndConfirmForBattle()) < 2) {
      return
    }
  } else {
    showWarningDialog(true, msg_1)
    console.log(msg_1)
    return
  }

  refresh()
}

async function sendTxAndConfirmForSimple() {
  if (
    globalStates.simpleProgram != undefined &&
    globalStates.userPublicKey != undefined &&
    globalStates.anchorProvider != undefined &&
    globalStates.userRDataAddress != undefined &&
    globalStates.userSDataAddress != undefined
  ) {
    try {
      const transaction = await globalStates.simpleProgram.methods
        .create()
        .accountsStrict({
          systemProgram: SystemProgram.programId,
          signer: globalStates.userPublicKey,
          rData: globalStates.userRDataAddress,
          sData: globalStates.userSDataAddress,
        })
        .transaction()
      await processTranction(transaction, globalStates.anchorProvider.connection)
      return 2
    } catch (error) {
      showWarningDialog(false, String(error))
      console.log(String(error))
      return 1
    }
  } else {
    showWarningDialog(true, msg_2)
    console.log(msg_2)
    return 0
  }
}

async function sendTxAndConfirmForBattle() {
  if (
    globalStates.battleProgram != undefined &&
    globalStates.userPublicKey != undefined &&
    globalStates.anchorProvider != undefined &&
    globalStates.userRDataAddress != undefined &&
    globalStates.userBDataAddress != undefined
  ) {
    try {
      const transaction = await globalStates.battleProgram.methods
        .create()
        .accountsStrict({
          systemProgram: SystemProgram.programId,
          signer: globalStates.userPublicKey,
          rData: globalStates.userRDataAddress,
          bData: globalStates.userBDataAddress,
        })
        .transaction()
      await processTranction(transaction, globalStates.anchorProvider.connection)
      return 2
    } catch (error) {
      showWarningDialog(false, String(error))
      console.log(String(error))
      return 1
    }
  } else {
    showWarningDialog(true, msg_2)
    console.log(msg_2)
    return 0
  }
}
