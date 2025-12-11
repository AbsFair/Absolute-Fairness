import { globalStates, msg_2, msg_3, onChainData } from '@/state'
import { showWarningDialog } from '../L1/ShowWarningDialog'
import { PublicKey } from '@solana/web3.js'

export async function getBData() {
  ////////////////////////////////////////////////////////////
  if (globalStates.battleProgram == undefined || globalStates.userBDataAddress == undefined) {
    showWarningDialog(true, msg_2)
    console.log(msg_2)
    return 0
  }
  ////////////////////////////////////////////////////////////
  try {
    const account = await globalStates.battleProgram.account.bData.fetch(
      globalStates.userBDataAddress,
    )
    onChainData.bData = {
      g_status: account.gStatus,
      g_degree: account.gDegree,
      m_amount: account.mAmount,
      o_amount: account.oAmount,
      m_result: account.mResult,
      o_result: account.oResult,
      game_idx: account.gameIdx,
      area_idx: account.areaIdx,
      room_idx: account.roomIdx,
      seat_idx: account.seatIdx,
      user_key: account.userKey,
      user_idx: account.userIdx,
      oppo_idx: account.oppoIdx,
      salt_val: account.saltVal,
      hash_val: account.hashVal,
      update_t: account.updateT,
    }
    return 3
  } catch (error) {
    if (String(error).includes('Account does not exist or has no data')) {
      onChainData.bData = undefined
      return 2
    } else {
      showWarningDialog(false, String(error))
      console.log('error')
      return 1
    }
  }
  ////////////////////////////////////////////////////////////
}

export async function getBDataAndBArea() {
  let accounts, account_1, account_2
  ////////////////////////////////////////////////////////////
  if (
    onChainData.bData == undefined ||
    globalStates.battleProgram == undefined ||
    globalStates.anchorProvider == undefined ||
    globalStates.userBDataAddress == undefined
  ) {
    showWarningDialog(true, msg_2)
    console.log('error')
    return 0
  }
  ////////////////////////////////////////////////////////////
  try {
    accounts = await globalStates.anchorProvider.connection.getMultipleAccountsInfo([
      globalStates.userBDataAddress,
      PublicKey.findProgramAddressSync(
        [Buffer.from([onChainData.bData.game_idx]), Buffer.from([onChainData.bData.area_idx])],
        globalStates.battleProgram.programId,
      )[0],
    ])
  } catch (error) {
    showWarningDialog(false, String(error))
    console.log('error')
    return 1
  }
  ////////////////////////////////////////////////////////////
  if (accounts[0] == null || accounts[1] == null) {
    showWarningDialog(false, msg_3)
    console.log('error')
    return 2
  }
  ////////////////////////////////////////////////////////////
  try {
    account_1 = globalStates.battleProgram.coder.accounts.decode('bData', accounts[0].data)
    account_2 = globalStates.battleProgram.coder.accounts.decode('bArea', accounts[1].data)
  } catch (error) {
    showWarningDialog(false, String(error))
    console.log('error')
    return 3
  }
  ////////////////////////////////////////////////////////////
  try {
    onChainData.bData = {
      g_status: account_1.gStatus,
      g_degree: account_1.gDegree,
      m_amount: account_1.mAmount,
      o_amount: account_1.oAmount,
      m_result: account_1.mResult,
      o_result: account_1.oResult,
      game_idx: account_1.gameIdx,
      area_idx: account_1.areaIdx,
      room_idx: account_1.roomIdx,
      seat_idx: account_1.seatIdx,
      user_key: account_1.userKey,
      user_idx: account_1.userIdx,
      oppo_idx: account_1.oppoIdx,
      salt_val: account_1.saltVal,
      hash_val: account_1.hashVal,
      update_t: account_1.updateT,
    }
    if (
      onChainData.bData.game_idx == account_2.gameIdx &&
      onChainData.bData.area_idx == account_2.areaIdx
    ) {
      onChainData.bArea = {
        game_idx: account_2.gameIdx,
        area_idx: account_2.areaIdx,
        room_idx: account_2.roomIdx,
        player_1: account_2.player1,
        player_2: account_2.player2,
        update_t: account_2.updateT,
      }
    } else {
      onChainData.bArea = undefined
    }
  } catch (error) {
    showWarningDialog(false, String(error))
    console.log('error')
    return 4
  }
  ////////////////////////////////////////////////////////////
  return 5
}

export async function getBArea() {
  ////////////////////////////////////////////////////////////
  if (globalStates.battleProgram == undefined || onChainData.bData == undefined) {
    showWarningDialog(true, msg_2)
    console.log(msg_2)
    return 0
  }
  ////////////////////////////////////////////////////////////
  try {
    const account = await globalStates.battleProgram.account.bArea.fetch(
      PublicKey.findProgramAddressSync(
        [Buffer.from([onChainData.bData.game_idx]), Buffer.from([onChainData.bData.area_idx])],
        globalStates.battleProgram.programId,
      )[0],
    )
    onChainData.bArea = {
      game_idx: account.gameIdx,
      area_idx: account.areaIdx,
      room_idx: account.roomIdx,
      player_1: account.player1,
      player_2: account.player2,
      update_t: account.updateT,
    }
    return 2
  } catch (error) {
    showWarningDialog(false, String(error))
    console.log('error')
    return 1
  }
  ////////////////////////////////////////////////////////////
}

export async function getBOppo(index: number) {
  ////////////////////////////////////////////////////////////
  if (globalStates.battleProgram == undefined) {
    showWarningDialog(true, msg_2)
    console.log('error')
    return 0
  }
  ////////////////////////////////////////////////////////////
  try {
    const buffer = Buffer.alloc(4)
    buffer.writeUInt32BE(index)
    const account = await globalStates.battleProgram.account.bData.fetch(
      PublicKey.findProgramAddressSync(
        [buffer, Buffer.from('data')],
        globalStates.battleProgram.programId,
      )[0],
    )
    onChainData.bOppo = {
      g_status: account.gStatus,
      g_degree: account.gDegree,
      m_amount: account.mAmount,
      o_amount: account.oAmount,
      m_result: account.mResult,
      o_result: account.oResult,
      game_idx: account.gameIdx,
      area_idx: account.areaIdx,
      room_idx: account.roomIdx,
      seat_idx: account.seatIdx,
      user_key: account.userKey,
      user_idx: account.userIdx,
      oppo_idx: account.oppoIdx,
      salt_val: account.saltVal,
      hash_val: account.hashVal,
      update_t: account.updateT,
    }
    return 2
  } catch (error) {
    showWarningDialog(false, String(error))
    console.log('error')
    return 1
  }
  ////////////////////////////////////////////////////////////
}

export async function getBGame(b_game_pkey: PublicKey) {
  ////////////////////////////////////////////////////////////
  if (globalStates.battleProgram == undefined) {
    showWarningDialog(true, msg_2)
    console.log(msg_2)
    return 0
  }
  ////////////////////////////////////////////////////////////
  try {
    const account = await globalStates.battleProgram.account.bGame.fetch(b_game_pkey)
    onChainData.bGame = {
      game_idx: account.gameIdx,
      area_amt: account.areaAmt,
      area_idx: account.areaIdx,
    }
    return 2
  } catch (error) {
    showWarningDialog(false, String(error))
    console.log('error')
    return 1
  }
  ////////////////////////////////////////////////////////////
}
