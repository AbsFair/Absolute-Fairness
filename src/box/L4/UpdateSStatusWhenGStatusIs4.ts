import {
  basicAmount,
  betAmountOfTheOppo,
  betAmountOfTheUser,
  msg_1,
  onChainData,
  opponentWeb3Address,
  viewNames,
} from '@/state'
import { showWarningDialog } from '../L1/ShowWarningDialog'
import { updateBounsesAndResult } from '../L3/UpdateBounsesV1'
import { navigate } from '../L3/NavigatePage'

export function updateSStatusWhenGStatusIs4() {
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
    betAmountOfTheUser.value = (Math.pow(2, onChainData.sData.game_idx) * basicAmount) / 1000000000
    betAmountOfTheOppo.value = (Math.pow(2, onChainData.sData.game_idx) * basicAmount) / 1000000000
    opponentWeb3Address.value = onChainData.sOppo.user_key.toString()
    updateBounsesAndResult(onChainData.rData, onChainData.sCfgs, onChainData.sData)
    navigate(viewNames[3], 5)
    return
  }
  ////////////////////////////////////////////////////////////
}
