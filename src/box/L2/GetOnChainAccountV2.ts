import { globalStates, msg_2, msg_3, onChainData } from '@/state'
import { showWarningDialog } from '../L1/ShowWarningDialog'
import { PublicKey } from '@solana/web3.js'

export async function getSData() {
  ////////////////////////////////////////////////////////////
  if (globalStates.simpleProgram == undefined || globalStates.userSDataAddress == undefined) {
    showWarningDialog(true, msg_2)
    console.log(msg_2)
    return 0
  }
  ////////////////////////////////////////////////////////////
  try {
    const account = await globalStates.simpleProgram.account.sData.fetch(
      globalStates.userSDataAddress,
    )
    onChainData.sData = {
      g_status: account.gStatus,
      m_number: account.mNumber,
      o_number: account.oNumber,
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
      onChainData.sData = undefined
      return 2
    } else {
      showWarningDialog(false, String(error))
      console.log('error')
      return 1
    }
  }
  ////////////////////////////////////////////////////////////
}

export async function getSDataAndSArea() {
  ////////////////////////////////////////////////////////////
  let accounts, account_1, account_2
  ////////////////////////////////////////////////////////////
  if (
    onChainData.sData == undefined ||
    globalStates.simpleProgram == undefined ||
    globalStates.anchorProvider == undefined ||
    globalStates.userSDataAddress == undefined
  ) {
    showWarningDialog(true, msg_2)
    console.log(msg_2)
    return 0
  }
  ////////////////////////////////////////////////////////////
  try {
    accounts = await globalStates.anchorProvider.connection.getMultipleAccountsInfo([
      globalStates.userSDataAddress,
      PublicKey.findProgramAddressSync(
        [Buffer.from([onChainData.sData.game_idx]), Buffer.from([onChainData.sData.area_idx])],
        globalStates.simpleProgram.programId,
      )[0],
    ])
  } catch (error) {
    showWarningDialog(false, String(error))
    console.log(error)
    return 1
  }
  ////////////////////////////////////////////////////////////
  if (accounts[0] == null || accounts[1] == null) {
    showWarningDialog(true, msg_3)
    console.log('error')
    return 2
  }
  ////////////////////////////////////////////////////////////
  try {
    account_1 = globalStates.simpleProgram.coder.accounts.decode('sData', accounts[0].data)
    account_2 = globalStates.simpleProgram.coder.accounts.decode('sArea', accounts[1].data)
  } catch (error) {
    showWarningDialog(false, String(error))
    console.log('error')
    return 3
  }
  ////////////////////////////////////////////////////////////
  try {
    onChainData.sData = {
      g_status: account_1.gStatus,
      m_number: account_1.mNumber,
      o_number: account_1.oNumber,
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
      onChainData.sData.game_idx == account_2.gameIdx &&
      onChainData.sData.area_idx == account_2.areaIdx
    ) {
      onChainData.sArea = {
        game_idx: account_2.gameIdx,
        area_idx: account_2.areaIdx,
        room_idx: account_2.roomIdx,
        player_1: account_2.player1,
        player_2: account_2.player2,
        update_t: account_2.updateT,
      }
    } else {
      onChainData.sArea = undefined
    }
    return 5
  } catch (error) {
    showWarningDialog(false, String(error))
    console.log('error')
    return 4
  }
  ////////////////////////////////////////////////////////////
}

export async function getSArea() {
  ////////////////////////////////////////////////////////////
  if (globalStates.simpleProgram == undefined || onChainData.sData == undefined) {
    showWarningDialog(true, msg_2)
    console.log(msg_2)
    return 0
  }
  ////////////////////////////////////////////////////////////
  try {
    const account = await globalStates.simpleProgram.account.sArea.fetch(
      PublicKey.findProgramAddressSync(
        [Buffer.from([onChainData.sData.game_idx]), Buffer.from([onChainData.sData.area_idx])],
        globalStates.simpleProgram.programId,
      )[0],
    )
    onChainData.sArea = {
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

export async function getSOppo(index: number) {
  ////////////////////////////////////////////////////////////
  if (globalStates.simpleProgram == undefined) {
    showWarningDialog(true, msg_2)
    console.log('error')
    return 0
  }
  ////////////////////////////////////////////////////////////
  try {
    const buffer = Buffer.alloc(4)
    buffer.writeUInt32BE(index)
    const account = await globalStates.simpleProgram.account.sData.fetch(
      PublicKey.findProgramAddressSync(
        [buffer, Buffer.from('data')],
        globalStates.simpleProgram.programId,
      )[0],
    )
    onChainData.sOppo = {
      g_status: account.gStatus,
      m_number: account.mNumber,
      o_number: account.oNumber,
      game_idx: account.gameIdx,
      area_idx: account.areaIdx,
      room_idx: account.roomIdx,
      seat_idx: account.seatIdx,
      user_key: account.userKey,
      user_idx: account.userIdx,
      oppo_idx: account.oppoIdx,
      salt_val: account.saltVal,
      hash_val: account.hashVal,
    }
    return 2
  } catch (error) {
    showWarningDialog(false, String(error))
    console.log('error')
    return 1
  }
  ////////////////////////////////////////////////////////////
}

export async function getSGame(s_game_pkey: PublicKey) {
  ////////////////////////////////////////////////////////////
  if (globalStates.simpleProgram == undefined) {
    showWarningDialog(true, msg_2)
    console.log(msg_2)
    return 0
  }
  ////////////////////////////////////////////////////////////
  try {
    const account = await globalStates.simpleProgram.account.sGame.fetch(s_game_pkey)
    onChainData.sGame = {
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
