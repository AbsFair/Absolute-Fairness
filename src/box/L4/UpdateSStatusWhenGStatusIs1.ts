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
import { getIsExpired, getIsRemoved } from '../L3/StatusDerivation'
import { navigate } from '../L3/NavigatePage'
import { updateBounsesAndResult } from '../L3/UpdateBounsesV1'

export function updateSStatusWhenGStatusIs1() {
  let is_removed: boolean = false
  let is_expired: boolean = false
  if (
    onChainData.rData == undefined ||
    onChainData.sCfgs == undefined ||
    onChainData.sData == undefined
  ) {
    showWarningDialog(true, msg_1)
    console.log('error')
    return false
  } else if (onChainData.sData.seat_idx == 1) {
    if (onChainData.sArea == undefined) {
      showWarningDialog(true, msg_1)
      console.log('error')
      return false
    } else {
      is_removed = getIsRemoved(onChainData.sArea, onChainData.sData)
      is_expired = getIsExpired(onChainData.sCfgs, onChainData.sArea, onChainData.sData)
      if (is_removed == false && onChainData.sArea.update_t[onChainData.sData.room_idx] == 0) {
        // waiting page
        betAmountOfTheUser.value =
          (Math.pow(2, onChainData.sData.game_idx) * basicAmount) / 1000000000
        launchUnixTimestamp.value = onChainData.sData.update_t
        navigate(viewNames[3], 3)
        return true
      } else if (is_removed == false && is_expired == false) {
        // confirmation page
        if (onChainData.sOppo == undefined) {
          showWarningDialog(true, msg_1)
          console.log('error')
          return false
        } else {
          betAmountOfTheUser.value =
            (Math.pow(2, onChainData.sData.game_idx) * basicAmount) / 1000000000
          hintForConfirmation.value = 'Your Turn!'
          maxSecondsForClocks.value = onChainData.sCfgs.time_amt
          launchUnixTimestamp.value = onChainData.sArea.update_t[onChainData.sData.room_idx]
          opponentWeb3Address.value = onChainData.sOppo.user_key.toString()
          navigate(viewNames[3], 4)
          return true
        }
      } else {
        // settlement page 1
        betAmountOfTheUser.value =
          (Math.pow(2, onChainData.sData.game_idx) * basicAmount) / 1000000000
        betAmountOfTheOppo.value =
          (Math.pow(2, onChainData.sData.game_idx) * basicAmount) / 1000000000
        opponentWeb3Address.value = 'It is unavailable when both players have timed out.'
        updateBounsesAndResult(onChainData.rData, onChainData.sCfgs, onChainData.sData)
        navigate(viewNames[3], 5)
        return true
      }
    }
  } else if (onChainData.sData.seat_idx == 2) {
    is_expired = getIsExpired(onChainData.sCfgs, undefined, onChainData.sData)
    if (is_expired == false) {
      // confirmation page
      if (onChainData.sOppo == undefined) {
        showWarningDialog(true, msg_1)
        console.log('error')
        return false
      } else {
        betAmountOfTheUser.value =
          (Math.pow(2, onChainData.sData.game_idx) * basicAmount) / 1000000000
        opponentWeb3Address.value = onChainData.sOppo.user_key.toString()
        hintForConfirmation.value = 'Your Turn!'
        maxSecondsForClocks.value = onChainData.sCfgs.time_amt
        launchUnixTimestamp.value = onChainData.sData.update_t
        navigate(viewNames[3], 4)
        return true
      }
    } else {
      // settlement page 1
      betAmountOfTheUser.value =
        (Math.pow(2, onChainData.sData.game_idx) * basicAmount) / 1000000000
      betAmountOfTheOppo.value =
        (Math.pow(2, onChainData.sData.game_idx) * basicAmount) / 1000000000
      opponentWeb3Address.value = 'It is unavailable when both players have timed out.'
      updateBounsesAndResult(onChainData.rData, onChainData.sCfgs, onChainData.sData)
      navigate(viewNames[3], 5)
      return true
    }
  } else {
    showWarningDialog(true, msg_1)
    console.log('error')
    return false
  }
}
