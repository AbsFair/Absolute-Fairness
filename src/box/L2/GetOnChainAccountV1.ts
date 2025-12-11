import {
  msg_2,
  msg_3,
  b_cfgs_pkey,
  onChainData,
  r_cfgs_pkey,
  s_cfgs_pkey,
  globalStates,
} from '@/state'
import { showWarningDialog } from '../L1/ShowWarningDialog'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getCfgsAndRData() {
  ////////////////////////////////////////////////////////////
  let accounts, account_1, account_2, account_3, account_4
  ////////////////////////////////////////////////////////////
  if (
    globalStates.rewardProgram == undefined ||
    globalStates.simpleProgram == undefined ||
    globalStates.battleProgram == undefined ||
    globalStates.anchorProvider == undefined ||
    globalStates.userRDataAddress == undefined
  ) {
    showWarningDialog(false, msg_2)
    console.log('error')
    return 0
  }
  ////////////////////////////////////////////////////////////
  try {
    accounts = await globalStates.anchorProvider.connection.getMultipleAccountsInfo([
      r_cfgs_pkey,
      s_cfgs_pkey,
      b_cfgs_pkey,
      globalStates.userRDataAddress,
    ])
  } catch (error) {
    showWarningDialog(false, String(error))
    console.log(error)
    return 1
  }
  ////////////////////////////////////////////////////////////
  if (accounts[0] == null || accounts[1] == null || accounts[2] == null) {
    showWarningDialog(true, msg_3)
    console.log('error')
    return 2
  }
  ////////////////////////////////////////////////////////////
  try {
    account_1 = globalStates.rewardProgram.coder.accounts.decode('rCfgs', accounts[0].data)
    account_2 = globalStates.simpleProgram.coder.accounts.decode('sCfgs', accounts[1].data)
    account_3 = globalStates.battleProgram.coder.accounts.decode('bCfgs', accounts[2].data)
    if (accounts[3] != null) {
      account_4 = globalStates.rewardProgram.coder.accounts.decode('rData', accounts[3].data)
    }
  } catch (error) {
    showWarningDialog(false, String(error))
    console.log('error')
    return 3
  }
  ////////////////////////////////////////////////////////////
  try {
    onChainData.rCfgs = {
      player_a: account_1.playerA,
      charge_a: account_1.chargeA,
    }
    onChainData.sCfgs = {
      time_amt: account_2.timeAmt,
      r_rate_1: account_2.rRate1,
      r_rate_2: account_2.rRate2,
      r_rate_3: account_2.rRate3,
    }
    onChainData.bCfgs = {
      time_amt: account_3.timeAmt,
      r_rate_1: account_3.rRate1,
      r_rate_2: account_3.rRate2,
      r_rate_3: account_3.rRate3,
    }
    if (accounts[3] != null) {
      onChainData.rData = {
        status_c: account_4.statusC,
        player_i: account_4.playerI,
        reward_a: account_4.rewardA,
        update_t: account_4.updateT,
        player_k: account_4.playerK,
        parent_k: account_4.parentK,
      }
    } else {
      onChainData.rData = undefined
    }
    return 5
  } catch (error) {
    showWarningDialog(false, String(error))
    console.log('error')
    return 4
  }
  ////////////////////////////////////////////////////////////
}

export async function getRData() {
  ////////////////////////////////////////////////////////////
  if (globalStates.rewardProgram == undefined || globalStates.userRDataAddress == undefined) {
    showWarningDialog(true, msg_2)
    console.log(msg_2)
    return 0
  }
  ////////////////////////////////////////////////////////////
  try {
    const account = await globalStates.rewardProgram.account.rData.fetch(
      globalStates.userRDataAddress,
    )
    onChainData.rData = {
      status_c: account.statusC,
      player_i: account.playerI,
      reward_a: account.rewardA,
      update_t: account.updateT,
      player_k: account.playerK,
      parent_k: account.parentK,
    }
    return 3
  } catch (error) {
    if (String(error).includes('Account does not exist or has no data')) {
      onChainData.rData = undefined
      return 2
    } else {
      showWarningDialog(false, String(error))
      console.log(String(error))
      return 1
    }
  }
  ////////////////////////////////////////////////////////////
}
