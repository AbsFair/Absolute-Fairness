import {
  basicAmount,
  betAmountOfTheOppo,
  betAmountOfTheUser,
  bonusesTheUserWined,
  displaiedGameResult,
  globalStates,
  hintForConfirmation,
  launchUnixTimestamp,
  luckyWordsForBattle,
  maxSecondsForClocks,
  msg_1,
  onChainData,
  operationButtonName,
  opponentWeb3Address,
  theMostRecentBid,
  theMostRecentLog,
  viewNames,
  yourDiceRolls1,
  yourDiceRolls2,
  yourDiceRolls3,
  yourDiceRolls4,
  yourDiceRolls5,
} from '@/state'
import { showWarningDialog } from '../L1/ShowWarningDialog'
import { getHashOfStringWithSalt } from '../L2/CalculateHashValues'
import { getTheMostRecentBid } from '../L2/GetTheMostRecentBid'
import { getDiceFace } from '../L1/GetDiceFace'
import { updateBounsesWhenWining } from '../L3/UpdateBounsesV2'
import { navigate } from '../L3/NavigatePage'
import { compare } from '../L5/RefreshDAppStatusV3'

export async function updateBStatusWhenGStatusIs2() {
  ////////////////////////////////////////////////////////////////////////////////
  if (onChainData.bCfgs == undefined) {
    showWarningDialog(true, msg_1)
    console.log('error')
    return 0
  } else if (onChainData.rData == undefined) {
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
  if (
    globalStates.hashValueForBattle == undefined ||
    globalStates.hashValueForBattle.word != luckyWordsForBattle.value ||
    globalStates.hashValueForBattle.salt != onChainData.bData.salt_val
  ) {
    const hash = await getHashOfStringWithSalt(
      luckyWordsForBattle.value,
      onChainData.bData.salt_val,
    )
    if (hash != undefined) {
      globalStates.hashValueForBattle = {
        word: luckyWordsForBattle.value,
        salt: onChainData.bData.salt_val,
        hash: hash,
      }
    } else {
      console.log('error')
      return 0
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  opponentWeb3Address.value = onChainData.bOppo.user_key.toString()
  ////////////////////////////////////////////////////////////////////////////////
  if (Date.now() / 1000 - onChainData.bData.update_t > onChainData.bCfgs.time_amt) {
    // settlement page 1
    betAmountOfTheUser.value =
      (onChainData.bData.m_amount * (Math.pow(2, onChainData.bData.game_idx) * basicAmount)) /
      1000000000
    betAmountOfTheOppo.value =
      (onChainData.bData.o_amount * (Math.pow(2, onChainData.bData.game_idx) * basicAmount)) /
      1000000000
    if (
      (onChainData.bData.g_status == 2 && onChainData.bData.seat_idx == 2) ||
      (onChainData.bData.g_status == 3 && onChainData.bData.seat_idx == 1)
    ) {
      displaiedGameResult.value = 'You timed out.'
      bonusesTheUserWined.value = 0
    } else if (
      (onChainData.bData.g_status == 2 && onChainData.bData.seat_idx == 1) ||
      (onChainData.bData.g_status == 3 && onChainData.bData.seat_idx == 2)
    ) {
      displaiedGameResult.value = 'Your opponent timed out.'
      updateBounsesWhenWining(onChainData.bCfgs, onChainData.bData, onChainData.rData)
    } else {
      showWarningDialog(true, msg_1)
      console.log('error')
      return 0
    }
    navigate(viewNames[4], 7)
    return 1
  }
  ////////////////////////////////////////////////////////////////////////////////
  if (
    onChainData.bData.seat_idx == 1 &&
    compare(globalStates.hashValueForBattle.hash[1], onChainData.bData.hash_val) == false
  ) {
    navigate(viewNames[4], 3)
    return 1
  } else if (
    onChainData.bData.seat_idx == 2 &&
    compare(globalStates.hashValueForBattle.hash[2], onChainData.bData.hash_val) == false
  ) {
    navigate(viewNames[4], 3)
    return 1
  }
  ////////////////////////////////////////////////////////////////////////////////
  if (
    (onChainData.bData.g_status == 2 && onChainData.bData.seat_idx == 2) ||
    (onChainData.bData.g_status == 3 && onChainData.bData.seat_idx == 1)
  ) {
    // operation page 1
    operationButtonName.value = 'Operate'
    theMostRecentBid.value = getTheMostRecentBid(onChainData.bData, 'from your opponent.')
    theMostRecentLog.value = 'Your opponent made a bid.'
    betAmountOfTheUser.value =
      (onChainData.bData.m_amount * (Math.pow(2, onChainData.bData.game_idx) * basicAmount)) /
      1000000000
    betAmountOfTheOppo.value =
      (onChainData.bData.o_amount * (Math.pow(2, onChainData.bData.game_idx) * basicAmount)) /
      1000000000
    hintForConfirmation.value = 'Your Turn!'
    maxSecondsForClocks.value = onChainData.bCfgs.time_amt
    launchUnixTimestamp.value = onChainData.bData.update_t
    if (onChainData.bData.seat_idx == 1) {
      yourDiceRolls1.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[0][0] + onChainData.bData.m_result[0]) % 6,
      )
      yourDiceRolls2.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[0][1] + onChainData.bData.m_result[1]) % 6,
      )
      yourDiceRolls3.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[0][2] + onChainData.bData.m_result[2]) % 6,
      )
      yourDiceRolls4.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[0][3] + onChainData.bData.m_result[3]) % 6,
      )
      yourDiceRolls5.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[0][4] + onChainData.bData.m_result[4]) % 6,
      )
    } else if (onChainData.bData.seat_idx == 2) {
      yourDiceRolls1.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[1][0] + onChainData.bData.m_result[0]) % 6,
      )
      yourDiceRolls2.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[1][1] + onChainData.bData.m_result[1]) % 6,
      )
      yourDiceRolls3.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[1][2] + onChainData.bData.m_result[2]) % 6,
      )
      yourDiceRolls4.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[1][3] + onChainData.bData.m_result[3]) % 6,
      )
      yourDiceRolls5.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[1][4] + onChainData.bData.m_result[4]) % 6,
      )
    } else {
      showWarningDialog(true, msg_1)
      console.log('error')
      return 0
    }
    navigate(viewNames[4], 5)
    return 1
  } else if (
    (onChainData.bData.g_status == 2 && onChainData.bData.seat_idx == 1) ||
    (onChainData.bData.g_status == 3 && onChainData.bData.seat_idx == 2)
  ) {
    // operation page 1
    operationButtonName.value = 'Operate'
    theMostRecentBid.value = getTheMostRecentBid(onChainData.bData, 'from you.')
    theMostRecentLog.value = 'You made a bid.'
    betAmountOfTheUser.value =
      (onChainData.bData.m_amount * (Math.pow(2, onChainData.bData.game_idx) * basicAmount)) /
      1000000000
    betAmountOfTheOppo.value =
      (onChainData.bData.o_amount * (Math.pow(2, onChainData.bData.game_idx) * basicAmount)) /
      1000000000
    hintForConfirmation.value = 'Await Opp!'
    maxSecondsForClocks.value = onChainData.bCfgs.time_amt
    launchUnixTimestamp.value = onChainData.bData.update_t
    if (onChainData.bData.seat_idx == 1) {
      yourDiceRolls1.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[0][0] + onChainData.bData.m_result[0]) % 6,
      )
      yourDiceRolls2.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[0][1] + onChainData.bData.m_result[1]) % 6,
      )
      yourDiceRolls3.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[0][2] + onChainData.bData.m_result[2]) % 6,
      )
      yourDiceRolls4.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[0][3] + onChainData.bData.m_result[3]) % 6,
      )
      yourDiceRolls5.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[0][4] + onChainData.bData.m_result[4]) % 6,
      )
    } else if (onChainData.bData.seat_idx == 2) {
      yourDiceRolls1.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[1][0] + onChainData.bData.m_result[0]) % 6,
      )
      yourDiceRolls2.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[1][1] + onChainData.bData.m_result[1]) % 6,
      )
      yourDiceRolls3.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[1][2] + onChainData.bData.m_result[2]) % 6,
      )
      yourDiceRolls4.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[1][3] + onChainData.bData.m_result[3]) % 6,
      )
      yourDiceRolls5.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[1][4] + onChainData.bData.m_result[4]) % 6,
      )
    } else {
      showWarningDialog(true, msg_1)
      console.log('error')
      return 0
    }
    navigate(viewNames[4], 5)
    return 1
  } else {
    showWarningDialog(true, msg_1)
    console.log('error')
    return 0
  }
  ////////////////////////////////////////////////////////////////////////////////
}
