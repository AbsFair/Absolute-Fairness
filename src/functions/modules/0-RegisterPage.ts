import { showWarningDialog } from '@/box/L1/ShowWarningDialog'
import { showLoadingDialog } from '@/box/L1/ShowLoadingDialog'
import { checkWeb3Address } from '@/box/L2/CheckWeb3Address'
import { SystemProgram } from '@solana/web3.js'
import { document_url, globalStates, msg_2, nameOfTheCurrentView, r_cfgs_pkey } from '@/state'
import { processTranction } from '@/box/L1/ProcessTransaction'
import { refreshForThe1stTime } from '@/box/L5/RefreshDAppStatusV1'

export function query() {
  window.open(document_url + '/docs/PDARent.html', '_blank')
}

export async function refresh() {
  showLoadingDialog()
  if (nameOfTheCurrentView.value != undefined) {
    await refreshForThe1stTime(nameOfTheCurrentView.value)
  } else {
    showWarningDialog(true, msg_2)
    console.log('error')
  }
}

export function tutorial() {
  window.open(document_url + '/docs/ReferralSystem.html', '_blank')
}

export async function register() {
  showLoadingDialog()

  if ((await checkWeb3Address()) <= 2) {
    return
  }

  if ((await sendTxAndConfirm()) <= 1) {
    return
  }

  refresh()
}

async function sendTxAndConfirm() {
  if (
    globalStates.rewardProgram != undefined &&
    globalStates.userPublicKey != undefined &&
    globalStates.anchorProvider != undefined &&
    globalStates.userRDataAddress != undefined
  ) {
    try {
      const transaction = await globalStates.rewardProgram.methods
        .createRData()
        .accountsStrict({
          systemProgram: SystemProgram.programId,
          signer: globalStates.userPublicKey,
          rCfgs: r_cfgs_pkey,
          rData: globalStates.userRDataAddress,
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
