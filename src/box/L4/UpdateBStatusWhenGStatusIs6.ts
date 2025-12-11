import {
  basicAmount,
  betAmountOfTheOppo,
  betAmountOfTheUser,
  bonusesTheUserWined,
  msg_1,
  onChainData,
  oppoDiceRolls1,
  oppoDiceRolls2,
  oppoDiceRolls3,
  oppoDiceRolls4,
  oppoDiceRolls5,
  opponentWeb3Address,
  theMostRecentBid,
  viewNames,
  yourDiceRolls1,
  yourDiceRolls2,
  yourDiceRolls3,
  yourDiceRolls4,
  yourDiceRolls5,
  type BData,
} from '@/state'
import { showWarningDialog } from '../L1/ShowWarningDialog'
import { getTheMostRecentBid } from '../L2/GetTheMostRecentBid'
import { getDiceFace } from '../L1/GetDiceFace'
import { updateBounsesWhenWining } from '../L3/UpdateBounsesV2'
import { navigate } from '../L3/NavigatePage'

export async function updateBStatusWhenGStatusIs6() {
  ////////////////////////////////////////////////////////////////////////////////
  if (onChainData.rData == undefined) {
    showWarningDialog(true, msg_1)
    console.log('error')
    return 0
  } else if (onChainData.bCfgs == undefined) {
    showWarningDialog(true, msg_1)
    console.log('error')
    return 0
  } else if (onChainData.bData == undefined) {
    showWarningDialog(true, msg_1)
    console.log('error')
    return 0
  } else if (onChainData.bData.game_idx > 9) {
    showWarningDialog(true, msg_1)
    console.log('error')
    return 0
  } else if (onChainData.bOppo == undefined) {
    showWarningDialog(true, msg_1)
    console.log('error')
    return 0
  }
  ////////////////////////////////////////////////////////////////////////////////
  if (onChainData.bData.g_status == 6) {
    theMostRecentBid.value = getTheMostRecentBid(onChainData.bData, 'from you.')
  } else if (onChainData.bData.g_status == 7) {
    theMostRecentBid.value = getTheMostRecentBid(onChainData.bData, 'from your opponent.')
  } else {
    showWarningDialog(true, msg_1)
    console.log('error')
    return 0
  }
  ////////////////////////////////////////////////////////////////////////////////
  opponentWeb3Address.value = onChainData.bOppo.user_key.toString()
  ////////////////////////////////////////////////////////////////////////////////
  yourDiceRolls1.value = getDiceFace(onChainData.bData.m_result[0] % 6)
  yourDiceRolls2.value = getDiceFace(onChainData.bData.m_result[1] % 6)
  yourDiceRolls3.value = getDiceFace(onChainData.bData.m_result[2] % 6)
  yourDiceRolls4.value = getDiceFace(onChainData.bData.m_result[3] % 6)
  yourDiceRolls5.value = getDiceFace(onChainData.bData.m_result[4] % 6)
  ////////////////////////////////////////////////////////////////////////////////
  oppoDiceRolls1.value = getDiceFace(onChainData.bData.o_result[0] % 6)
  oppoDiceRolls2.value = getDiceFace(onChainData.bData.o_result[1] % 6)
  oppoDiceRolls3.value = getDiceFace(onChainData.bData.o_result[2] % 6)
  oppoDiceRolls4.value = getDiceFace(onChainData.bData.o_result[3] % 6)
  oppoDiceRolls5.value = getDiceFace(onChainData.bData.o_result[4] % 6)
  ////////////////////////////////////////////////////////////////////////////////
  betAmountOfTheUser.value =
    (onChainData.bData.m_amount * (Math.pow(2, onChainData.bData.game_idx) * basicAmount)) /
    1000000000
  betAmountOfTheOppo.value =
    (onChainData.bData.o_amount * (Math.pow(2, onChainData.bData.game_idx) * basicAmount)) /
    1000000000
  ////////////////////////////////////////////////////////////////////////////////
  const isEnough = count(onChainData.bData)
  ////////////////////////////////////////////////////////////////////////////////
  if (isEnough && onChainData.bData.g_status == 6) {
    if (onChainData.bData.seat_idx == 1) {
      theMostRecentBid.value = getTheMostRecentBid(onChainData.bData, 'from you.')
      updateBounsesWhenWining(onChainData.bCfgs, onChainData.bData, onChainData.rData)
    } else if (onChainData.bData.seat_idx == 2) {
      theMostRecentBid.value = getTheMostRecentBid(onChainData.bData, 'from your opponent.')
      bonusesTheUserWined.value = 0
    } else {
      showWarningDialog(true, msg_1)
      console.log('error')
      return 0
    }
  } else if (!isEnough && onChainData.bData.g_status == 6) {
    if (onChainData.bData.seat_idx == 1) {
      theMostRecentBid.value = getTheMostRecentBid(onChainData.bData, 'from you.')
      bonusesTheUserWined.value = 0
    } else if (onChainData.bData.seat_idx == 2) {
      theMostRecentBid.value = getTheMostRecentBid(onChainData.bData, 'from your opponent.')
      updateBounsesWhenWining(onChainData.bCfgs, onChainData.bData, onChainData.rData)
    } else {
      showWarningDialog(true, msg_1)
      console.log('error')
      return 0
    }
  } else if (isEnough && onChainData.bData.g_status == 7) {
    if (onChainData.bData.seat_idx == 1) {
      theMostRecentBid.value = getTheMostRecentBid(onChainData.bData, 'from your opponent.')
      bonusesTheUserWined.value = 0
    } else if (onChainData.bData.seat_idx == 2) {
      theMostRecentBid.value = getTheMostRecentBid(onChainData.bData, 'from you.')
      updateBounsesWhenWining(onChainData.bCfgs, onChainData.bData, onChainData.rData)
    } else {
      showWarningDialog(true, msg_1)
      console.log('error')
      return 0
    }
  } else if (!isEnough && onChainData.bData.g_status == 7) {
    if (onChainData.bData.seat_idx == 1) {
      theMostRecentBid.value = getTheMostRecentBid(onChainData.bData, 'from your opponent.')
      updateBounsesWhenWining(onChainData.bCfgs, onChainData.bData, onChainData.rData)
    } else if (onChainData.bData.seat_idx == 2) {
      theMostRecentBid.value = getTheMostRecentBid(onChainData.bData, 'from you.')
      bonusesTheUserWined.value = 0
    } else {
      showWarningDialog(true, msg_1)
      console.log('error')
      return 0
    }
  } else {
    showWarningDialog(true, msg_1)
    console.log('error')
    return 0
  }
  ////////////////////////////////////////////////////////////////////////////////
  navigate(viewNames[4], 8)
  return 1
}

function count(data: BData) {
  let number = 0
  for (const n of data.m_result) {
    if (n == 5 || n == data.g_degree[1]) {
      number += 1
    }
  }
  for (const n of data.o_result) {
    if (n == 5 || n == data.g_degree[1]) {
      number += 1
    }
  }
  if (number < data.g_degree[0]) {
    return false
  } else {
    return true
  }
}
