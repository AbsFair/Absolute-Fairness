import { processTranction } from '@/box/L1/ProcessTransaction'
import { showLoadingDialog } from '@/box/L1/ShowLoadingDialog'
import { showWarningDialog } from '@/box/L1/ShowWarningDialog'
import { navigate } from '@/box/L3/NavigatePage'
import { refreshDAppStatusV2 } from '@/box/L5/RefreshDAppStatusV2'
import { refreshDAppStatusV3 } from '@/box/L5/RefreshDAppStatusV3'
import {
  b_cfgs_pkey,
  b_safe_pkey,
  bonusesTheUserWined,
  document_url,
  globalStates,
  msg_1,
  msg_2,
  nameOfTheCurrentView,
  onChainData,
  placeholder,
  s_cfgs_pkey,
  s_safe_pkey,
  viewNames,
} from '@/state'
import { PublicKey, SystemProgram } from '@solana/web3.js'

export async function refresh() {
  showLoadingDialog()
  if (nameOfTheCurrentView.value == viewNames[3]) {
    await refreshDAppStatusV2(true)
    return
  } else if (nameOfTheCurrentView.value == viewNames[4]) {
    await refreshDAppStatusV3(true)
    return
  } else {
    showWarningDialog(true, msg_1)
    console.log('error')
    return
  }
}

export function tutorial() {
  switch (nameOfTheCurrentView.value) {
    case viewNames[3]:
      window.open(document_url + '/docs/FairFate.html#step-4-settlement-page', '_blank')
      break
    case viewNames[4]:
      window.open(document_url + "/docs/Liar'sDice.html#step-4-settlement-page", '_blank')
      break
    default:
      showWarningDialog(true, msg_1)
      console.log(msg_1)
      return
  }
}

export async function nextStep() {
  showLoadingDialog()
  if (nameOfTheCurrentView.value == viewNames[3] && bonusesTheUserWined.value > 0) {
    if (
      onChainData.rData == undefined ||
      onChainData.sCfgs == undefined ||
      onChainData.sData == undefined ||
      globalStates.rewardProgram == undefined ||
      globalStates.simpleProgram == undefined ||
      globalStates.anchorProvider == undefined ||
      globalStates.userRDataAddress == undefined ||
      globalStates.userSDataAddress == undefined
    ) {
      showWarningDialog(true, msg_2)
      console.log('error')
      return
    } else if (onChainData.sData.g_status == 1) {
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
      try {
        const transaction = await globalStates.simpleProgram.methods
          .direct()
          .accountsStrict({
            systemProgram: SystemProgram.programId,
            rewardProgram: globalStates.rewardProgram.programId,
            signer: globalStates.userPublicKey,
            sSafe: s_safe_pkey,
            target: target,
            rData1: rData1,
            rData2: globalStates.userRDataAddress,
            sData: globalStates.userSDataAddress,
            sCfgs: s_cfgs_pkey,
            sArea: PublicKey.findProgramAddressSync(
              [
                Buffer.from([onChainData.sData.game_idx]),
                Buffer.from([onChainData.sData.area_idx]),
              ],
              globalStates.simpleProgram.programId,
            )[0],
          })
          .transaction()
        await processTranction(transaction, globalStates.anchorProvider.connection)
        refreshDAppStatusV2(true)
        return
      } catch (error) {
        showWarningDialog(false, String(error))
        console.log(String(error))
        return
      }
    } else if (onChainData.sData.g_status >= 2) {
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
      try {
        const transaction = await globalStates.simpleProgram.methods
          .settle()
          .accountsStrict({
            systemProgram: SystemProgram.programId,
            rewardProgram: globalStates.rewardProgram.programId,
            signer: globalStates.userPublicKey,
            sSafe: s_safe_pkey,
            target: target,
            rData1: rData1,
            rData2: globalStates.userRDataAddress,
            sData: globalStates.userSDataAddress,
            sCfgs: s_cfgs_pkey,
          })
          .transaction()
        await processTranction(transaction, globalStates.anchorProvider.connection)
        refreshDAppStatusV2(true)
        return
      } catch (error) {
        showWarningDialog(false, String(error))
        console.log(String(error))
        return
      }
    }
  } else if (nameOfTheCurrentView.value == viewNames[4] && bonusesTheUserWined.value > 0) {
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
    } else if (onChainData.bData.g_status == 1) {
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
      try {
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
              [
                Buffer.from([onChainData.bData.game_idx]),
                Buffer.from([onChainData.bData.area_idx]),
              ],
              globalStates.battleProgram.programId,
            )[0],
          })
          .transaction()
        await processTranction(transaction, globalStates.anchorProvider.connection)
        refreshDAppStatusV3(true)
        return
      } catch (error) {
        showWarningDialog(false, String(error))
        console.log(String(error))
        return
      }
    } else if (onChainData.bData.g_status >= 2) {
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
      try {
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
        console.log(String(error))
        return
      }
    } else {
      showWarningDialog(true, msg_1)
      console.log('error')
      return
    }
  } else if (nameOfTheCurrentView.value == viewNames[3]) {
    navigate(viewNames[3], 2)
    return
  } else if (nameOfTheCurrentView.value == viewNames[4]) {
    navigate(viewNames[4], 2)
    return
  } else {
    showWarningDialog(true, msg_1)
    console.log('error')
    return
  }
}
