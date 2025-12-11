import { navigate } from '../L3/NavigatePage'
import { checkWeb3Address } from '../L2/CheckWeb3Address'
import { showWarningDialog } from '../L1/ShowWarningDialog'
import { updateOnChainDataV2 } from '../L3/UpdateOnChainData'
import { updateSStatusWhenGStatusIs1 } from '../L4/UpdateSStatusWhenGStatusIs1'
import { updateSStatusWhenGStatusIs2 } from '../L4/UpdateSStatusWhenGStatusIs2'
import { msg_1, msg_2, viewNames, onChainData } from '@/state'
import { updateSStatusWhenGStatusIs4 } from '../L4/UpdateSStatusWhenGStatusIs4'

export async function refreshDAppStatusV2(check_address: boolean) {
  ////////////////////////////////////////////////////////////////////////////////
  if (check_address == true && (await checkWeb3Address()) != 3) {
    return
  } else if (onChainData.sCfgs == undefined || onChainData.rData == undefined) {
    showWarningDialog(true, msg_2)
    console.log('error')
    return
  } else if ((await updateOnChainDataV2()) == false) {
    return
  }
  ////////////////////////////////////////////////////////////////////////////////
  if (onChainData.sData == undefined) {
    navigate(viewNames[3], 1)
    return
  } else if (onChainData.sData.game_idx > 9) {
    showWarningDialog(true, msg_1)
    console.log(msg_1)
    return
  } else if (onChainData.sData.seat_idx > 2) {
    showWarningDialog(true, msg_1)
    console.log(msg_1)
    return
  }
  ////////////////////////////////////////////////////////////////////////////////
  if (onChainData.sData.g_status == 0) {
    navigate(viewNames[3], 2)
    return
  } else if (onChainData.sData.g_status == 1) {
    updateSStatusWhenGStatusIs1()
  } else if (onChainData.sData.g_status == 2 || onChainData.sData.g_status == 3) {
    updateSStatusWhenGStatusIs2()
  } else if (onChainData.sData.g_status == 4) {
    updateSStatusWhenGStatusIs4()
  } else {
    showWarningDialog(true, msg_1)
    console.log(msg_1)
    return
  }
  ////////////////////////////////////////////////////////////
}
