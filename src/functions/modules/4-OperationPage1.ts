import { processTranction } from '@/box/L1/ProcessTransaction'
import { showLoadingDialog } from '@/box/L1/ShowLoadingDialog'
import { showWarningDialog } from '@/box/L1/ShowWarningDialog'
import { getHashOfStringWithSalt } from '@/box/L2/CalculateHashValues'
import { checkWeb3Address } from '@/box/L2/CheckWeb3Address'
import { navigate } from '@/box/L3/NavigatePage'
import { refreshDAppStatusV3 } from '@/box/L5/RefreshDAppStatusV3'
import {
  b_cfgs_pkey,
  b_safe_pkey,
  document_url,
  globalStates,
  luckyWordsForBattle,
  msg_1,
  msg_2,
  onChainData,
  refresh_interval,
  showDialogOnView4,
  viewNames,
} from '@/state'
import { PublicKey, SystemProgram } from '@solana/web3.js'

const callbackForWarningDialog = () => {
  refresh_interval.target = setInterval(() => {
    refresh_interval.object = refreshDAppStatusV3(true)
  }, refresh_interval.length)
  showDialogOnView4.value = false
}

export async function refresh() {
  showLoadingDialog()
}

export async function operate() {
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
  if (onChainData.bData == undefined) {
    showWarningDialog(true, msg_2)
    return
  } else if (onChainData.bData.g_status == 1) {
    if (onChainData.bData.seat_idx == 1) {
      navigate(viewNames[4], 6)
    } else if (onChainData.bData.seat_idx == 2) {
      showWarningDialog(false, "It's not your turn yet, please wait for your opponent!")
      globalStates.callbackForWarningDialog = callbackForWarningDialog
      return
    } else {
      showWarningDialog(true, msg_1)
      return
    }
  } else if (onChainData.bData.g_status == 2) {
    if (onChainData.bData.seat_idx == 1) {
      showWarningDialog(false, "It's not your turn yet, please wait for your opponent!")
      globalStates.callbackForWarningDialog = callbackForWarningDialog
      return
    } else if (onChainData.bData.seat_idx == 2) {
      navigate(viewNames[4], 6)
    } else {
      showWarningDialog(true, msg_1)
      return
    }
  } else if (onChainData.bData.g_status == 3) {
    if (onChainData.bData.seat_idx == 1) {
      navigate(viewNames[4], 6)
    } else if (onChainData.bData.seat_idx == 2) {
      showWarningDialog(false, "It's not your turn yet, please wait for your opponent!")
      globalStates.callbackForWarningDialog = callbackForWarningDialog
      return
    } else {
      showWarningDialog(true, msg_1)
      return
    }
  } else if (onChainData.bData.g_status == 4) {
    if (onChainData.bData.seat_idx == 1) {
      showWarningDialog(false, "It's not your turn yet, please wait for your opponent!")
      globalStates.callbackForWarningDialog = callbackForWarningDialog
      return
    } else if (onChainData.bData.seat_idx == 2) {
      if ((await checkHashAndSendAndConfirm()) == 2) {
        refreshDAppStatusV3(true)
      }
    } else {
      showWarningDialog(true, msg_1)
      return
    }
  } else if (onChainData.bData.g_status == 5) {
    if (onChainData.bData.seat_idx == 1) {
      if ((await checkHashAndSendAndConfirm()) == 2) {
        refreshDAppStatusV3(true)
      }
    } else if (onChainData.bData.seat_idx == 2) {
      showWarningDialog(false, "It's not your turn yet, please wait for your opponent!")
      globalStates.callbackForWarningDialog = callbackForWarningDialog
      return
    } else {
      showWarningDialog(true, msg_1)
      return
    }
  } else {
    showWarningDialog(true, msg_1)
    return
  }
}

export function tutorial() {
  window.open(document_url + "/docs/Liar'sDice.html#step-3-operation-page", '_blank')
}

export async function checkHashAndSendAndConfirm() {
  ////////////////////////////////////////////////////////////
  if (onChainData.bData == undefined) {
    showWarningDialog(true, msg_2)
    console.log('error')
    return
  } else if (onChainData.bOppo == undefined) {
    showWarningDialog(true, msg_2)
    console.log('error')
    return
  }
  ////////////////////////////////////////////////////////////
  const hash_values = await getHashOfStringWithSalt(
    luckyWordsForBattle.value,
    onChainData.bData.salt_val,
  )
  if (hash_values == undefined) {
    showWarningDialog(true, msg_1)
    return
  } else if (
    (onChainData.bData.seat_idx == 1 &&
      compare(hash_values[1], onChainData.bData.hash_val) == false) ||
    (onChainData.bData.seat_idx == 2 &&
      compare(hash_values[2], onChainData.bData.hash_val) == false)
  ) {
    const msg = 'Please enter the same lucky words you entered in the pre-game setup page!'
    showWarningDialog(false, msg)
    globalStates.callbackForWarningDialog = () => {
      navigate(viewNames[4], 3)
    }
    return
  }
  ////////////////////////////////////////////////////////////
  let hash_value
  if (onChainData.bData.seat_idx == 1) {
    hash_value = hash_values[0]
  } else if (onChainData.bData.seat_idx == 2) {
    hash_value = hash_values[1]
  } else {
    showWarningDialog(true, msg_1)
    return
  }
  ////////////////////////////////////////////////////////////
  if (
    globalStates.battleProgram != undefined &&
    globalStates.userPublicKey != undefined &&
    globalStates.userRDataAddress != undefined &&
    globalStates.userBDataAddress != undefined &&
    globalStates.anchorProvider != undefined
  ) {
    try {
      const buffer = Buffer.alloc(4)
      buffer.writeUInt32BE(onChainData.bData.oppo_idx)
      const transaction = await globalStates.battleProgram.methods
        .finish(hash_value)
        .accountsStrict({
          systemProgram: SystemProgram.programId,
          signer: globalStates.userPublicKey,
          bCfgs: b_cfgs_pkey,
          bSafe: b_safe_pkey,
          bData: globalStates.userBDataAddress,
          oData: PublicKey.findProgramAddressSync(
            [buffer, Buffer.from('data')],
            globalStates.battleProgram.programId,
          )[0],
        })
        .transaction()
      await processTranction(transaction, globalStates.anchorProvider.connection)
      return 2
    } catch (error) {
      showWarningDialog(false, String(error))
      globalStates.callbackForWarningDialog = callbackForWarningDialog
      console.log('error')
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
