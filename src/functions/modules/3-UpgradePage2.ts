import { processTranction } from '@/box/L1/ProcessTransaction'
import { showLoadingDialog } from '@/box/L1/ShowLoadingDialog'
import { showWarningDialog } from '@/box/L1/ShowWarningDialog'
import { checkWeb3Address } from '@/box/L2/CheckWeb3Address'
import { refreshForThe1stTime } from '@/box/L5/RefreshDAppStatusV1'
import {
  document_url,
  globalStates,
  moduleTypeOnView5,
  msg_2,
  onChainData,
  r_cfgs_pkey,
  viewNames,
} from '@/state'
import { SystemProgram } from '@solana/web3.js'

export function goBack() {
  moduleTypeOnView5.value = 1
}
export function tutorial() {
  window.open(document_url + '/docs/ReferralSystem.html', '_blank')
}

export function query() {
  window.open(document_url + '/docs/ReferralSystem.html#different-memberships', '_blank')
}

export async function upgrade() {
  //////////////////////////////////////////////////////////////////
  showLoadingDialog()
  //////////////////////////////////////////////////////////////////
  if ((await checkWeb3Address()) <= 2) {
    return false // exit from the current function
  }
  //////////////////////////////////////////////////////////////////
  if (onChainData.rData?.status_c == 0) {
    if ((await sendTxAndConfirm0()) == false) {
      return false // exit from the current function
    }
  } else if (onChainData.rData?.status_c == 1) {
    if ((await sendTxAndConfirm1()) == false) {
      return false // exit from the current function
    }
  } else {
  }
  //////////////////////////////////////////////////////////////////
  await refreshForThe1stTime(viewNames[5])
  //////////////////////////////////////////////////////////////////
}

async function sendTxAndConfirm0() {
  if (
    onChainData.rData != undefined &&
    onChainData.rCfgs != undefined &&
    globalStates.rewardProgram != undefined &&
    globalStates.userPublicKey != undefined &&
    globalStates.anchorProvider != undefined &&
    globalStates.userRDataAddress != undefined
  ) {
    try {
      const transaction = await globalStates.rewardProgram.methods
        .upgradeC()
        .accountsStrict({
          systemProgram: SystemProgram.programId,
          signer: globalStates.userPublicKey,
          rCfgs: r_cfgs_pkey,
          rData: globalStates.userRDataAddress,
        })
        .transaction()
      await processTranction(transaction, globalStates.anchorProvider.connection)
      return true
    } catch (error) {
      showWarningDialog(false, String(error))
      console.log(String(error))
      return false
    }
  } else {
    showWarningDialog(false, msg_2)
    console.log(msg_2)
    return false // exit from the current function
  }
}

async function sendTxAndConfirm1() {
  if (
    onChainData.rData != undefined &&
    onChainData.rCfgs != undefined &&
    globalStates.rewardProgram != undefined &&
    globalStates.userPublicKey != undefined &&
    globalStates.anchorProvider != undefined &&
    globalStates.userRDataAddress != undefined
  ) {
    try {
      const target = await globalStates.rewardProgram.account.rData.fetch(
        onChainData.rData.parent_k,
      )
      const transaction = await globalStates.rewardProgram.methods
        .upgradeB()
        .accountsStrict({
          systemProgram: SystemProgram.programId,
          signer: globalStates.userPublicKey,
          rCfgs: r_cfgs_pkey,
          target: target.playerK,
          rData1: onChainData.rData.parent_k,
          rData2: globalStates.userRDataAddress,
        })
        .transaction()
      await processTranction(transaction, globalStates.anchorProvider.connection)
      return true
    } catch (error) {
      showWarningDialog(false, String(error))
      console.log(String(error))
      return false
    }
  } else {
    showWarningDialog(false, msg_2)
    console.log(msg_2)
    return false // exit from the current function
  }
}
