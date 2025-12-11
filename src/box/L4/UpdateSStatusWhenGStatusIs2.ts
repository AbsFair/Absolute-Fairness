import {
  basicAmount,
  betAmountOfTheOppo,
  betAmountOfTheUser,
  hintForConfirmation,
  launchUnixTimestamp,
  maxSecondsForClocks,
  msg_1,
  onChainData,
  opponentWeb3Address,
  viewNames,
} from '@/state'
import { showWarningDialog } from '../L1/ShowWarningDialog'
import { getIsExpired } from '../L3/StatusDerivation'
import { navigate } from '../L3/NavigatePage'
import { updateBounsesAndResult } from '../L3/UpdateBounsesV1'

export function updateSStatusWhenGStatusIs2() {
  if (
    onChainData.rData == undefined ||
    onChainData.sCfgs == undefined ||
    onChainData.sData == undefined ||
    onChainData.sOppo == undefined
  ) {
    showWarningDialog(true, msg_1)
    console.log('error')
    return false
  } else {
    opponentWeb3Address.value = onChainData.sOppo.user_key.toString()
    if (getIsExpired(onChainData.sCfgs, undefined, onChainData.sData) == false) {
      if (onChainData.sData.seat_idx == 1) {
        if (onChainData.sData.g_status == 2) {
          hintForConfirmation.value = 'Await Opp!'
        } else {
          hintForConfirmation.value = 'Your Turn!'
        }
      } else if (onChainData.sData.seat_idx == 2) {
        if (onChainData.sData.g_status == 2) {
          hintForConfirmation.value = 'Your Turn!'
        } else {
          hintForConfirmation.value = 'Await Opp!'
        }
      } else {
        showWarningDialog(true, msg_1)
        console.log('error')
        return true
      }
      betAmountOfTheUser.value =
        (Math.pow(2, onChainData.sData.game_idx) * basicAmount) / 1000000000
      maxSecondsForClocks.value = onChainData.sCfgs.time_amt
      launchUnixTimestamp.value = onChainData.sData.update_t
      navigate(viewNames[3], 4)
      return true
    } else {
      betAmountOfTheUser.value =
        (Math.pow(2, onChainData.sData.game_idx) * basicAmount) / 1000000000
      betAmountOfTheOppo.value =
        (Math.pow(2, onChainData.sData.game_idx) * basicAmount) / 1000000000
      updateBounsesAndResult(onChainData.rData, onChainData.sCfgs, onChainData.sData)
      navigate(viewNames[3], 5)
      return true
    }
  }
}
