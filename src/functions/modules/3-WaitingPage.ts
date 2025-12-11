import { processTranction } from '@/box/L1/ProcessTransaction'
import { showLoadingDialog } from '@/box/L1/ShowLoadingDialog'
import { showWarningDialog } from '@/box/L1/ShowWarningDialog'
import { checkWeb3Address } from '@/box/L2/CheckWeb3Address'
import { refreshDAppStatusV2 } from '@/box/L5/RefreshDAppStatusV2'
import { refreshDAppStatusV3 } from '@/box/L5/RefreshDAppStatusV3'
import {
  b_safe_pkey,
  document_url,
  globalStates,
  msg_1,
  msg_2,
  nameOfTheCurrentView,
  onChainData,
  refresh_interval,
  s_safe_pkey,
  showDialogOnView3,
  showDialogOnView4,
  viewNames,
} from '@/state'
import { PublicKey, SystemProgram } from '@solana/web3.js'

const callbackForWarningDialogForSimple = () => {
  refresh_interval.target = setInterval(() => {
    refreshDAppStatusV2(true)
  }, refresh_interval.length)
  showDialogOnView3.value = false
}

const callbackForWarningDialogForBattle = () => {
  refresh_interval.target = setInterval(() => {
    refreshDAppStatusV3(true)
  }, refresh_interval.length)
  showDialogOnView4.value = false
}

export function refresh() {
  showLoadingDialog()
}

export function tutorial() {
  switch (nameOfTheCurrentView.value) {
    case viewNames[3]:
      window.open(document_url + '/docs/FairFate.html#step-2-waiting-page', '_blank')
      break
    case viewNames[4]:
      window.open(document_url + "/docs/Liar'sDice.html#step-2-waiting-page", '_blank')
      break
    default:
      showWarningDialog(true, msg_1)
      console.log(msg_1)
      return
  }
}

export async function withdraw() {
  clearInterval(refresh_interval.target)
  showLoadingDialog()
  if (refresh_interval.object != undefined) {
    await refresh_interval.object
  }
  showLoadingDialog()
  const response_1 = await checkWeb3Address()
  if (response_1 == 0) {
    return
  } else if (response_1 == 1) {
    if (nameOfTheCurrentView.value == viewNames[3]) {
      globalStates.callbackForWarningDialog = callbackForWarningDialogForSimple
    } else if (nameOfTheCurrentView.value == viewNames[4]) {
      globalStates.callbackForWarningDialog = callbackForWarningDialogForBattle
    } else {
      showWarningDialog(true, msg_1)
      return 0
    }
    return
  } else if (response_1 == 2) {
    return
  }
  if (nameOfTheCurrentView.value == viewNames[3]) {
    if (onChainData.sData == undefined) {
      showWarningDialog(true, msg_2)
      return
    }
    const response_2 = await sendAndConfirmForSimple()
    if (response_2 == 0) {
      return
    } else if (response_2 == 1) {
      globalStates.callbackForWarningDialog = callbackForWarningDialogForSimple
      return
    }
    refreshDAppStatusV2(true)
  } else if (nameOfTheCurrentView.value == viewNames[4]) {
    if (onChainData.bData == undefined) {
      showWarningDialog(true, msg_2)
      return
    }
    const response_2 = await sendAndConfirmForBattle()
    if (response_2 == 0) {
      return
    } else if (response_2 == 1) {
      globalStates.callbackForWarningDialog = callbackForWarningDialogForBattle
      return
    }
    refreshDAppStatusV3(true)
  } else {
    showWarningDialog(true, msg_1)
    return 0
  }
}

async function sendAndConfirmForSimple() {
  if (
    onChainData.sData != undefined &&
    onChainData.sCfgs != undefined &&
    globalStates.simpleProgram != undefined &&
    globalStates.anchorProvider != undefined &&
    globalStates.userRDataAddress != undefined &&
    globalStates.userSDataAddress != undefined
  ) {
    try {
      const transaction = await globalStates.simpleProgram.methods
        .recall()
        .accountsStrict({
          systemProgram: SystemProgram.programId,
          signer: globalStates.userPublicKey,
          sSafe: s_safe_pkey,
          sArea: PublicKey.findProgramAddressSync(
            [Buffer.from([onChainData.sData.game_idx]), Buffer.from([onChainData.sData.area_idx])],
            globalStates.simpleProgram.programId,
          )[0],
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

async function sendAndConfirmForBattle() {
  if (
    onChainData.bData != undefined &&
    onChainData.bCfgs != undefined &&
    globalStates.battleProgram != undefined &&
    globalStates.anchorProvider != undefined &&
    globalStates.userRDataAddress != undefined &&
    globalStates.userBDataAddress != undefined
  ) {
    try {
      const transaction = await globalStates.battleProgram.methods
        .recall()
        .accountsStrict({
          signer: globalStates.userPublicKey,
          bSafe: b_safe_pkey,
          bArea: PublicKey.findProgramAddressSync(
            [Buffer.from([onChainData.bData.game_idx]), Buffer.from([onChainData.bData.area_idx])],
            globalStates.battleProgram.programId,
          )[0],
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
