import { processTranction } from '@/box/L1/ProcessTransaction'
import { showLoadingDialog } from '@/box/L1/ShowLoadingDialog'
import { showWarningDialog } from '@/box/L1/ShowWarningDialog'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import {
  msg_2,
  viewNames,
  b_cfgs_pkey,
  b_safe_pkey,
  onChainData,
  placeholder,
  globalStates,
  bonusesTheUserWined,
  msg_1,
  document_url,
} from '@/state'
import { refreshDAppStatusV3 } from '@/box/L5/RefreshDAppStatusV3'
import { navigate } from '@/box/L3/NavigatePage'

export async function refresh() {
  showLoadingDialog()
  refreshDAppStatusV3(true)
}

export function tutorial() {
  window.open(document_url + "/docs/Liar'sDice.html#step-4-settlement-page", '_blank')
}

export async function nextStep() {
  showLoadingDialog()
  if (
    onChainData.rData == undefined ||
    onChainData.bCfgs == undefined ||
    onChainData.bData == undefined ||
    globalStates.rewardProgram == undefined ||
    globalStates.battleProgram == undefined ||
    globalStates.anchorProvider == undefined ||
    globalStates.userRDataAddress == undefined ||
    globalStates.userBDataAddress == undefined
  ) {
    showWarningDialog(true, msg_2)
    console.log('error')
    return
  } else if (bonusesTheUserWined.value == 0) {
    navigate(viewNames[4], 2)
    return
  } else if (onChainData.bData.g_status == 1) {
    try {
      let target, rData1
      if (onChainData.rData.status_c == 1) {
        rData1 = onChainData.rData.parent_k
        target = (await globalStates.rewardProgram.account.rData.fetch(onChainData.rData.parent_k))
          .playerK
      } else {
        rData1 = PublicKey.findProgramAddressSync(
          [placeholder.toBytes()],
          globalStates.rewardProgram.programId,
        )[0]
        target = placeholder
      }
      const transaction = await globalStates.battleProgram.methods
        .direct()
        .accountsStrict({
          systemProgram: SystemProgram.programId,
          rewardProgram: globalStates.rewardProgram.programId,
          signer: globalStates.userPublicKey,
          bSafe: b_safe_pkey,
          target: target,
          rData1: rData1,
          rData2: globalStates.userRDataAddress,
          bData: globalStates.userBDataAddress,
          bCfgs: b_cfgs_pkey,
          bArea: PublicKey.findProgramAddressSync(
            [Buffer.from([onChainData.bData.game_idx]), Buffer.from([onChainData.bData.area_idx])],
            globalStates.battleProgram.programId,
          )[0],
        })
        .transaction()
      await processTranction(transaction, globalStates.anchorProvider.connection)
      refreshDAppStatusV3(true)
      return
    } catch (error) {
      showWarningDialog(false, String(error))
      console.log('error')
      return
    }
  } else if (onChainData.bData.g_status > 1) {
    try {
      let target, rData1
      if (onChainData.rData.status_c == 1) {
        rData1 = onChainData.rData.parent_k
        target = (await globalStates.rewardProgram.account.rData.fetch(onChainData.rData.parent_k))
          .playerK
      } else {
        rData1 = PublicKey.findProgramAddressSync(
          [placeholder.toBytes()],
          globalStates.rewardProgram.programId,
        )[0]
        target = placeholder
      }
      const transaction = await globalStates.battleProgram.methods
        .settle()
        .accountsStrict({
          systemProgram: SystemProgram.programId,
          rewardProgram: globalStates.rewardProgram.programId,
          signer: globalStates.userPublicKey,
          bSafe: b_safe_pkey,
          target: target,
          rData1: rData1,
          rData2: globalStates.userRDataAddress,
          bData: globalStates.userBDataAddress,
          bCfgs: b_cfgs_pkey,
        })
        .transaction()
      await processTranction(transaction, globalStates.anchorProvider.connection)
      refreshDAppStatusV3(true)
      return
    } catch (error) {
      showWarningDialog(false, String(error))
      console.log('error')
      return
    }
  } else {
    showWarningDialog(true, msg_1)
    console.log('error')
    return
  }
}
