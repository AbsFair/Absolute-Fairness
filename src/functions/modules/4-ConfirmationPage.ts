import { processTranction } from '@/box/L1/ProcessTransaction'
import { showLoadingDialog } from '@/box/L1/ShowLoadingDialog'
import { showWarningDialog } from '@/box/L1/ShowWarningDialog'
import { getHashOfStringWithSalt } from '@/box/L2/CalculateHashValues'
import { checkWeb3Address } from '@/box/L2/CheckWeb3Address'
import { refreshDAppStatusV2 } from '@/box/L5/RefreshDAppStatusV2'
import {
  document_url,
  globalStates,
  luckyWordsForSimple,
  msg_1,
  msg_2,
  onChainData,
  refresh_interval,
  s_cfgs_pkey,
  showDialogOnView3,
} from '@/state'
import { PublicKey } from '@solana/web3.js'

const callbackForWarningDialog = () => {
  refresh_interval.target = setInterval(() => {
    refresh_interval.object = refreshDAppStatusV2(true)
  }, refresh_interval.length)
  showDialogOnView3.value = false
}

export async function refresh() {
  showLoadingDialog()
}

export function tutorial() {
  window.open(document_url + '/docs/FairFate.html#step-3-confirm-page', '_blank')
}

export async function confirm() {
  clearInterval(refresh_interval.target)
  showLoadingDialog()
  if (refresh_interval.object != undefined) {
    await refresh_interval.object
  }
  showLoadingDialog()
  ////////////////////////////////////////////////////////////
  const response_1 = await checkWeb3Address()
  if (response_1 == 0) {
    return
  } else if (response_1 == 1) {
    globalStates.callbackForWarningDialog = callbackForWarningDialog
    return
  } else if (response_1 == 2) {
    return
  }
  ////////////////////////////////////////////////////////////
  if (onChainData.sData == undefined) {
    showWarningDialog(true, msg_1)
    return
  } else if (
    (onChainData.sData.seat_idx == 1 && onChainData.sData.g_status == 2) ||
    (onChainData.sData.seat_idx == 2 && onChainData.sData.g_status == 3)
  ) {
    const msg = 'You have already confirmed, please await your opponent!'
    showWarningDialog(false, msg)
    globalStates.callbackForWarningDialog = callbackForWarningDialog
    return
  }
  ////////////////////////////////////////////////////////////
  const response = await checkHashAndSendAndConfirm()
  ////////////////////////////////////////////////////////////
  if (response == 2) {
    clearInterval(refresh_interval.target)
    refresh_interval.target = setInterval(() => {
      refreshDAppStatusV2(true)
    }, refresh_interval.length)
  }
}

export async function checkHashAndSendAndConfirm() {
  let hash_values = undefined
  ////////////////////////////////////////////////////////////
  if (onChainData.sData == undefined) {
    showWarningDialog(true, msg_2)
    console.log(msg_2)
    return
  } else if (onChainData.sOppo == undefined) {
    showWarningDialog(true, msg_2)
    console.log(msg_2)
    return
  }
  ////////////////////////////////////////////////////////////
  hash_values = await getHashOfStringWithSalt(luckyWordsForSimple.value, onChainData.sData.salt_val)
  if (hash_values == undefined) {
    showWarningDialog(true, msg_1)
    return
  } else if (compare(hash_values[2], onChainData.sData.hash_val) == false) {
    luckyWordsForSimple.value = ''
    const msg = 'Please enter the same lucky words you entered in the pre-game setup page!'
    showWarningDialog(false, msg)
    globalStates.callbackForWarningDialog = callbackForWarningDialog
    console.log(msg)
    return
  }
  ////////////////////////////////////////////////////////////
  if (
    globalStates.simpleProgram != undefined &&
    globalStates.userPublicKey != undefined &&
    globalStates.userSDataAddress != undefined &&
    globalStates.anchorProvider != undefined
  ) {
    try {
      const buffer = Buffer.alloc(4)
      buffer.writeUInt32BE(onChainData.sOppo.user_idx)
      const transaction = await globalStates.simpleProgram.methods
        .submit(hash_values[1])
        .accountsStrict({
          signer: globalStates.userPublicKey,
          sCfgs: s_cfgs_pkey,
          sArea: PublicKey.findProgramAddressSync(
            [Buffer.from([onChainData.sData.game_idx]), Buffer.from([onChainData.sData.area_idx])],
            globalStates.simpleProgram.programId,
          )[0],
          sData: globalStates.userSDataAddress,
          oData: PublicKey.findProgramAddressSync(
            [buffer, Buffer.from('data')],
            globalStates.simpleProgram.programId,
          )[0],
        })
        .transaction()
      await processTranction(transaction, globalStates.anchorProvider.connection)
      refreshDAppStatusV2(true)
      return 2
    } catch (error) {
      showWarningDialog(false, String(error))
      globalStates.callbackForWarningDialog = callbackForWarningDialog
      console.log(error)
      return 1
    }
  } else {
    showWarningDialog(true, msg_2)
    console.log(msg_2)
    return 0
  }
}

function compare(a: number[], b: number[]): boolean {
  if (a.length !== b.length) {
    return false
  } else {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false
      }
    }
  }
  return true
}
