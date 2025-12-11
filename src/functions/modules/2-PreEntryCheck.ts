import { showLoadingDialog } from '@/box/L1/ShowLoadingDialog'
import { showWarningDialog } from '@/box/L1/ShowWarningDialog'
import { getHashOfStringWithSalt } from '@/box/L2/CalculateHashValues'
import { compare, refreshDAppStatusV3 } from '@/box/L5/RefreshDAppStatusV3'
import { luckyWordsForBattle, onChainData, globalStates, msg_1, msg_2, document_url } from '@/state'

export function refresh() {
  showLoadingDialog()
  refreshDAppStatusV3(true)
}

export function tutorial() {
  window.open(document_url + "/docs/Liar'sDice.html#step-1-pre-game-setup", '_blank')
}

export async function nextStep() {
  showLoadingDialog()

  if (luckyWordsForBattle.value.length < 6) {
    showWarningDialog(false, 'The lucky words must be at least 6 characters.')
    return
  }

  if (onChainData.bData == undefined) {
    showWarningDialog(true, msg_2)
    return
  }

  const hash = await getHashOfStringWithSalt(luckyWordsForBattle.value, onChainData.bData.salt_val)

  if (hash != undefined) {
    globalStates.hashValueForBattle = {
      word: luckyWordsForBattle.value,
      salt: onChainData.bData.salt_val,
      hash: hash,
    }
  } else {
    showWarningDialog(true, msg_1)
    console.log('error')
    return
  }

  const msg = 'Please enter the same lucky words you entered in the pre-game setup page!'

  if (onChainData.bData.seat_idx == 1) {
    if (onChainData.bData.g_status == 1) {
      if (compare(globalStates.hashValueForBattle.hash[2], onChainData.bData.hash_val) == false) {
        showWarningDialog(false, msg)
        return
      }
    } else {
      if (compare(globalStates.hashValueForBattle.hash[1], onChainData.bData.hash_val) == false) {
        showWarningDialog(false, msg)
        return
      }
    }
  } else if (onChainData.bData.seat_idx == 2) {
    if (compare(globalStates.hashValueForBattle.hash[2], onChainData.bData.hash_val) == false) {
      showWarningDialog(false, msg)
      return
    }
  } else {
    showWarningDialog(true, msg_1)
    return
  }

  refreshDAppStatusV3(true)
}
