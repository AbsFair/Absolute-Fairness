import {
  msg_1,
  viewNames,
  onChainData,
  globalStates,
  yourDiceRolls1,
  yourDiceRolls2,
  yourDiceRolls3,
  yourDiceRolls4,
  yourDiceRolls5,
  theMostRecentLog,
  betAmountOfTheUser,
  betAmountOfTheOppo,
  luckyWordsForBattle,
  opponentWeb3Address,
  displaiedGameResult,
  bonusesTheUserWined,
  launchUnixTimestamp,
  hintForConfirmation,
  operationButtonName,
  basicAmount,
  theMostRecentBid,
  maxSecondsForClocks,
} from '@/state'
import { showWarningDialog } from '../L1/ShowWarningDialog'
import { getHashOfStringWithSalt } from '../L2/CalculateHashValues'
import { getDiceFace } from '../L1/GetDiceFace'
import { navigate } from '../L3/NavigatePage'
import { updateBounsesWhenWining } from '../L3/UpdateBounsesV2'
import { compare } from '../L5/RefreshDAppStatusV3'

export async function updateBStatusWhenGStatusIs1() {
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
  } else if (onChainData.bData.seat_idx == 1 && onChainData.bArea == undefined) {
    showWarningDialog(true, msg_1)
    console.log('error')
    return 0
  } else if (onChainData.bData.seat_idx == 1 && onChainData.bArea != undefined) {
    const isRemoved =
      onChainData.bArea.player_1[onChainData.bData.room_idx] != onChainData.bData.user_idx
    const isExpired =
      Date.now() / 1000 - onChainData.bArea.update_t[onChainData.bData.room_idx] >
      onChainData.bCfgs.time_amt
    if (
      isRemoved == false &&
      onChainData.bData.seat_idx == 1 &&
      onChainData.bArea.update_t[onChainData.bData.room_idx] == 0
    ) {
      // waiting page
      betAmountOfTheUser.value =
        (Math.pow(2, onChainData.bData.game_idx) * basicAmount) / 1000000000
      launchUnixTimestamp.value = onChainData.bData.update_t
      navigate(viewNames[4], 4)
      return 1
    } else if (isRemoved == true || isExpired == true) {
      // settlement page 1
      betAmountOfTheUser.value =
        (Math.pow(2, onChainData.bData.game_idx) * basicAmount) / 1000000000
      betAmountOfTheOppo.value =
        (Math.pow(2, onChainData.bData.game_idx) * basicAmount) / 1000000000
      opponentWeb3Address.value = 'It is unavailable when no p-layer has bid.'
      displaiedGameResult.value = 'You timed out.'
      bonusesTheUserWined.value = 0
      navigate(viewNames[4], 7)
      return 1
    } else if (
      globalStates.hashValueForBattle == undefined ||
      globalStates.hashValueForBattle.word != luckyWordsForBattle.value ||
      globalStates.hashValueForBattle.salt != onChainData.bData.salt_val
    ) {
      const hash = await getHashOfStringWithSalt(
        luckyWordsForBattle.value,
        onChainData.bData.salt_val,
      )
      if (hash == undefined) {
        console.log('error')
        return 0
      } else {
        globalStates.hashValueForBattle = {
          word: luckyWordsForBattle.value,
          salt: onChainData.bData.salt_val,
          hash: hash,
        }
      }
    }
    ////////////////////////////////////////////////////////////////////////////////
    if (!compare(globalStates.hashValueForBattle.hash[2], onChainData.bData.hash_val)) {
      // pre-entry check
      navigate(viewNames[4], 3)
      return 1
    }
    ////////////////////////////////////////////////////////////////////////////////
    if (isRemoved == false && isExpired == false) {
      if (onChainData.bOppo == undefined) {
        showWarningDialog(true, msg_1)
        console.log('error')
        return 0
      }
      // operation page 1
      betAmountOfTheUser.value =
        (Math.pow(2, onChainData.bData.game_idx) * basicAmount) / 1000000000
      betAmountOfTheOppo.value =
        (Math.pow(2, onChainData.bData.game_idx) * basicAmount) / 1000000000
      maxSecondsForClocks.value = onChainData.bCfgs.time_amt
      launchUnixTimestamp.value = onChainData.bArea.update_t[onChainData.bData.room_idx]
      opponentWeb3Address.value = onChainData.bOppo.user_key.toString()
      operationButtonName.value = 'Operate'
      hintForConfirmation.value = 'Your Turn!'
      theMostRecentLog.value = 'Your opponent joined.'
      theMostRecentBid.value = 'No player has bid.'
      yourDiceRolls1.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[0][0] + onChainData.bOppo.hash_val[0]) % 6,
      )
      yourDiceRolls2.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[0][1] + onChainData.bOppo.hash_val[1]) % 6,
      )
      yourDiceRolls3.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[0][2] + onChainData.bOppo.hash_val[2]) % 6,
      )
      yourDiceRolls4.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[0][3] + onChainData.bOppo.hash_val[3]) % 6,
      )
      yourDiceRolls5.value = getDiceFace(
        (globalStates.hashValueForBattle.hash[0][4] + onChainData.bOppo.hash_val[4]) % 6,
      )
      navigate(viewNames[4], 5)
    }
  } else if (onChainData.bData.seat_idx == 2) {
    const isExpired = Date.now() / 1000 - onChainData.bData.update_t > onChainData.bCfgs.time_amt
    if (isExpired == true) {
      // settlement page 1
      betAmountOfTheUser.value =
        (Math.pow(2, onChainData.bData.game_idx) * basicAmount) / 1000000000
      betAmountOfTheOppo.value =
        (Math.pow(2, onChainData.bData.game_idx) * basicAmount) / 1000000000
      opponentWeb3Address.value = 'It is unavailable when no p-layer has bid.'
      displaiedGameResult.value = 'Your opponent timed out.'
      updateBounsesWhenWining(onChainData.bCfgs, onChainData.bData, onChainData.rData)
      navigate(viewNames[4], 7)
      return 1
    } else if (
      globalStates.hashValueForBattle == undefined ||
      globalStates.hashValueForBattle.word != luckyWordsForBattle.value ||
      globalStates.hashValueForBattle.salt != onChainData.bData.salt_val
    ) {
      const hash = await getHashOfStringWithSalt(
        luckyWordsForBattle.value,
        onChainData.bData.salt_val,
      )
      if (hash == undefined) {
        console.log('error')
        return 0
      } else {
        globalStates.hashValueForBattle = {
          word: luckyWordsForBattle.value,
          salt: onChainData.bData.salt_val,
          hash: hash,
        }
      }
    }
    ////////////////////////////////////////////////////////////////////////////////
    if (!compare(globalStates.hashValueForBattle.hash[2], onChainData.bData.hash_val)) {
      // pre-entry check
      navigate(viewNames[4], 3)
      return 1
    }
    ////////////////////////////////////////////////////////////////////////////////
    if (onChainData.bOppo == undefined) {
      showWarningDialog(true, msg_1)
      console.log('error')
      return 0
    } else if (isExpired == false) {
      // operation page 1
      betAmountOfTheUser.value =
        (Math.pow(2, onChainData.bData.game_idx) * basicAmount) / 1000000000
      betAmountOfTheOppo.value =
        (Math.pow(2, onChainData.bData.game_idx) * basicAmount) / 1000000000
      maxSecondsForClocks.value = onChainData.bCfgs.time_amt
      launchUnixTimestamp.value = onChainData.bData.update_t
      opponentWeb3Address.value = onChainData.bOppo.user_key.toString()
      operationButtonName.value = 'Operate'
      hintForConfirmation.value = 'Await Opp!'
      theMostRecentLog.value = 'You joined.'
      theMostRecentBid.value = 'No player has bid.'
      yourDiceRolls1.value = 0
      yourDiceRolls2.value = 0
      yourDiceRolls3.value = 0
      yourDiceRolls4.value = 0
      yourDiceRolls5.value = 0
      navigate(viewNames[4], 5)
    }
  } else {
    showWarningDialog(true, msg_1)
    console.log('error')
    return 0
  }
}
