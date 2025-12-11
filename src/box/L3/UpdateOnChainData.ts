import { onChainData } from '@/state'
import { getCfgsAndRData } from '../L2/GetOnChainAccountV1'
import { getSArea, getSData, getSDataAndSArea, getSOppo } from '../L2/GetOnChainAccountV2'
import { getBArea, getBData, getBDataAndBArea, getBOppo } from '../L2/GetOnChainAccountV3'
import { getIsExpired, getIsRemoved } from './StatusDerivation'

export async function updateOnChainDataV1() {
  ////////////////////////////////////////////////////////////////////////////////
  if ((await getCfgsAndRData()) < 5) {
    return false
  }
  ////////////////////////////////////////////////////////////////////////////////
  return true
}

export async function updateOnChainDataV2() {
  ////////////////////////////////////////////////////////////////////////////////
  if (
    onChainData.sData != undefined &&
    onChainData.sData.seat_idx == 1 &&
    onChainData.sData.g_status == 1
  ) {
    if ((await getSDataAndSArea()) < 5) {
      return false
    }
  } else {
    onChainData.sArea = undefined
    if ((await getSData()) < 2) {
      return false
    }
  }
  console.log(onChainData.sData)
  ////////////////////////////////////////////////////////////////////////////////
  if (
    onChainData.sArea == undefined &&
    onChainData.sData != undefined &&
    onChainData.sData.seat_idx == 1 &&
    onChainData.sData.g_status == 1
  ) {
    if ((await getSArea()) < 2) {
      return false
    }
  }
  console.log(onChainData.sArea)
  ////////////////////////////////////////////////////////////////////////////////
  if (
    onChainData.sCfgs != undefined &&
    onChainData.sArea != undefined &&
    onChainData.sData != undefined &&
    onChainData.sData.seat_idx == 1 &&
    onChainData.sData.g_status == 1
  ) {
    if (
      getIsRemoved(onChainData.sArea, onChainData.sData) ||
      getIsExpired(onChainData.sCfgs, onChainData.sArea, onChainData.sData)
    ) {
      return true
    }
  } else if (
    onChainData.sCfgs != undefined &&
    onChainData.sData != undefined &&
    onChainData.sData.seat_idx == 2 &&
    onChainData.sData.g_status == 1
  ) {
    if (getIsExpired(onChainData.sCfgs, undefined, onChainData.sData)) {
      return true
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  if (
    onChainData.sArea != undefined &&
    onChainData.sData != undefined &&
    onChainData.sData.seat_idx == 1 &&
    onChainData.sData.g_status == 1 &&
    onChainData.sArea.player_2[onChainData.sData.room_idx] != 0
  ) {
    if ((await getSOppo(onChainData.sArea.player_2[onChainData.sData.room_idx])) < 2) {
      return false
    }
  } else if (
    onChainData.sData != undefined &&
    onChainData.sData.oppo_idx != 0 &&
    onChainData.sData.oppo_idx != onChainData.sOppo?.user_idx
  ) {
    if ((await getSOppo(onChainData.sData.oppo_idx)) < 2) {
      return false
    }
  }
  console.log(onChainData.sOppo)
  ////////////////////////////////////////////////////////////////////////////////
  return true
}

export async function updateOnChainDataV3() {
  ////////////////////////////////////////////////////////////////////////////////
  if (
    onChainData.bData != undefined &&
    onChainData.bData.seat_idx == 1 &&
    onChainData.bData.g_status == 1
  ) {
    if ((await getBDataAndBArea()) < 5) {
      return false
    }
  } else {
    onChainData.bArea = undefined
    if ((await getBData()) < 2) {
      return false
    }
  }
  console.log(onChainData.bData)
  ////////////////////////////////////////////////////////////////////////////////
  if (
    onChainData.bData != undefined &&
    onChainData.bData.seat_idx == 1 &&
    onChainData.bData.g_status == 1 &&
    onChainData.bArea == undefined
  ) {
    if ((await getBArea()) < 2) {
      return false
    }
  }
  console.log(onChainData.bArea)
  ////////////////////////////////////////////////////////////////////////////////
  if (
    onChainData.bCfgs != undefined &&
    onChainData.bArea != undefined &&
    onChainData.bData != undefined &&
    onChainData.bData.seat_idx == 1 &&
    onChainData.bData.g_status == 1
  ) {
    if (
      getIsRemoved(onChainData.bArea, onChainData.bData) ||
      getIsExpired(onChainData.bCfgs, onChainData.bArea, onChainData.bData)
    ) {
      return true
    }
  } else if (
    onChainData.bCfgs != undefined &&
    onChainData.bData != undefined &&
    onChainData.bData.seat_idx == 2 &&
    onChainData.bData.g_status == 1
  ) {
    if (getIsExpired(onChainData.bCfgs, undefined, onChainData.bData)) {
      return true
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  if (
    onChainData.bArea != undefined &&
    onChainData.bData != undefined &&
    onChainData.bData.seat_idx == 1 &&
    onChainData.bData.g_status == 1 &&
    onChainData.bArea.player_2[onChainData.bData.room_idx] != 0
  ) {
    if ((await getBOppo(onChainData.bArea.player_2[onChainData.bData.room_idx])) < 2) {
      return false
    }
  } else if (
    onChainData.bData != undefined &&
    onChainData.bData.oppo_idx != 0 &&
    onChainData.bData.oppo_idx != onChainData.bOppo?.user_idx
  ) {
    if ((await getBOppo(onChainData.bData.oppo_idx)) < 2) {
      return false
    }
  }
  console.log(onChainData.bOppo)
  ////////////////////////////////////////////////////////////
  return true
}
