import { PublicKey } from '@solana/web3.js'
import { checkWeb3Address } from '../L2/CheckWeb3Address'
import { showLoadingDialog } from '../L1/ShowLoadingDialog'
import { showWarningDialog } from '../L1/ShowWarningDialog'
import { refreshDAppStatusV2 } from './RefreshDAppStatusV2'
import { refreshDAppStatusV3 } from './RefreshDAppStatusV3'
import { updateOnChainDataV1 } from '../L3/UpdateOnChainData'
import { navigate } from '../L3/NavigatePage'
import {
  msg_1,
  msg_2,
  viewNames,
  onChainData,
  globalStates,
  userReferralRewardA,
  userReferralStatusC,
  userReferralUpdateT,
} from '@/state'

export async function refreshForThe1stTime(name: string) {
  showLoadingDialog()
  ////////////////////////////////////////////////////////////////////////////////
  if ((await checkWeb3Address()) < 3) {
    return
  } else if ((await updateOnChainDataV1()) == false) {
    return
  }
  ////////////////////////////////////////////////////////////////////////////////
  if (onChainData.rData == undefined) {
    if (name == viewNames[3]) {
      navigate(name, 0)
      return
    } else if (name == viewNames[4]) {
      navigate(name, 0)
      return
    } else if (name == viewNames[5]) {
      navigate(name, 0)
      return
    } else {
      showWarningDialog(true, msg_1)
      console.log('error')
      return
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  console.log(onChainData.rData)
  ////////////////////////////////////////////////////////////////////////////////
  userReferralStatusC.value = onChainData.rData.status_c
  userReferralRewardA.value = onChainData.rData.reward_a.toNumber()
  userReferralUpdateT.value = onChainData.rData.update_t
  ////////////////////////////////////////////////////////////////////////////////
  if (globalStates.simpleProgram == undefined) {
    showWarningDialog(true, msg_2)
    console.log('error')
    return
  }
  if (globalStates.battleProgram == undefined) {
    showWarningDialog(true, msg_2)
    console.log('error')
    return
  }
  ////////////////////////////////////////////////////////////////////////////////
  const buffer = Buffer.alloc(4)
  buffer.writeUInt32BE(onChainData.rData.player_i)
  ////////////////////////////////////////////////////////////////////////////////
  globalStates.userSDataAddress = PublicKey.findProgramAddressSync(
    [buffer, Buffer.from('data')],
    globalStates.simpleProgram.programId,
  )[0]
  ////////////////////////////////////////////////////////////////////////////////
  globalStates.userBDataAddress = PublicKey.findProgramAddressSync(
    [buffer, Buffer.from('data')],
    globalStates.battleProgram.programId,
  )[0]
  ////////////////////////////////////////////////////////////////////////////////
  if (name == viewNames[3]) {
    await refreshDAppStatusV2(false)
  } else if (name == viewNames[4]) {
    await refreshDAppStatusV3(false)
  } else if (name == viewNames[5]) {
    navigate(name, 1)
    return
  } else {
    showWarningDialog(true, msg_1)
    console.log('error')
    return
  }
}
