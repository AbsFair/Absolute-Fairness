import { getBGamePkey, getSGamePkey } from '@/box/L1/GetGamePkey'
import { processTranction } from '@/box/L1/ProcessTransaction'
import { showLoadingDialog } from '@/box/L1/ShowLoadingDialog'
import { showWarningDialog } from '@/box/L1/ShowWarningDialog'
import { checkWeb3Address } from '@/box/L2/CheckWeb3Address'
import { getHashOfStringWithSalt } from '@/box/L2/CalculateHashValues'
import {
  b_cfgs_pkey,
  b_safe_pkey,
  type BGame,
  document_url,
  globalStates,
  luckyWordsForBattle,
  luckyWordsForSimple,
  msg_1,
  msg_2,
  nameOfTheCurrentView,
  onChainData,
  placeholder,
  s_cfgs_pkey,
  s_safe_pkey,
  selectedAmountForBattle,
  selectedAmountForSimple,
  type SGame,
  viewNames,
} from '@/state'
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { refreshDAppStatusV2 } from '@/box/L5/RefreshDAppStatusV2'
import { refreshDAppStatusV3 } from '@/box/L5/RefreshDAppStatusV3'
import { getSGame } from '@/box/L2/GetOnChainAccountV2'
import { getBGame } from '@/box/L2/GetOnChainAccountV3'

export function refresh() {
  showLoadingDialog()
  if (nameOfTheCurrentView.value == viewNames[3]) {
    refreshDAppStatusV2(true)
  } else if (nameOfTheCurrentView.value == viewNames[4]) {
    refreshDAppStatusV3(true)
  } else {
    showWarningDialog(true, msg_1)
    console.log('error')
    return
  }
}

export function tutorial() {
  switch (nameOfTheCurrentView.value) {
    case viewNames[3]:
      window.open(document_url + '/docs/FairFate.html#step-1-pre-game-setup', '_blank')
      break
    case viewNames[4]:
      window.open(document_url + "/docs/Liar'sDice.html#step-1-pre-game-setup", '_blank')
      break
    default:
      showWarningDialog(true, msg_1)
      console.log('error')
      return
  }
}

export async function nextStep(level: number, reEnteredluckyWords: string) {
  showLoadingDialog()

  if (checkTheEnteredCode(reEnteredluckyWords) <= 2) {
    return
  }

  if ((await checkWeb3Address()) <= 2) {
    return
  }

  const salt_value = Math.floor(Date.now() / 1000)

  let hash_values: number[][] | undefined

  if (nameOfTheCurrentView.value == viewNames[3]) {
    hash_values = await getHashOfStringWithSalt(luckyWordsForSimple.value, salt_value)
  } else if (nameOfTheCurrentView.value == viewNames[4]) {
    hash_values = await getHashOfStringWithSalt(luckyWordsForBattle.value, salt_value)
  } else {
    showWarningDialog(true, msg_1)
    console.log('error')
    return
  }

  if (hash_values == undefined) {
    showWarningDialog(true, msg_1)
    console.log('error')
    return
  }

  if (nameOfTheCurrentView.value == viewNames[3]) {
    const sGamePKey = getSGamePkey(selectedAmountForSimple[level])
    if ((await getSGame(sGamePKey)) <= 1) {
      return
    }
    if ((await sendAndConfirmForSimple(sGamePKey, hash_values[2], salt_value)) < 2) {
      return
    } else {
      refreshDAppStatusV2(true)
    }
  } else if (nameOfTheCurrentView.value == viewNames[4]) {
    const bGamePKey = getBGamePkey(selectedAmountForBattle[level])
    if ((await getBGame(bGamePKey)) <= 1) {
      return
    }
    if ((await sendAndConfirmForBattle(bGamePKey, hash_values[2], salt_value)) < 2) {
      return
    } else {
      refreshDAppStatusV3(true)
    }
  } else {
    showWarningDialog(true, msg_1)
    console.log('error')
    return
  }
}

export function checkTheEnteredCode(reEnteredLuckyWords: string) {
  if (nameOfTheCurrentView.value == viewNames[3]) {
    if (luckyWordsForSimple.value.length < 6) {
      showWarningDialog(false, 'The lucky words must be at least 6 characters.')
      return 1
    } else if (luckyWordsForSimple.value != reEnteredLuckyWords) {
      showWarningDialog(false, 'Both inputs must be same.')
      return 2
    } else {
      return 3
    }
  } else if (nameOfTheCurrentView.value == viewNames[4]) {
    if (luckyWordsForBattle.value.length < 6) {
      showWarningDialog(false, 'The lucky words must be at least 6 characters.')
      return 1
    } else if (luckyWordsForBattle.value != reEnteredLuckyWords) {
      showWarningDialog(false, 'Both inputs must be same.')
      return 2
    } else {
      return 3
    }
  } else {
    showWarningDialog(true, msg_1)
    console.log('error')
    return 0
  }
}

async function sendAndConfirmForSimple(
  sGamePKey: PublicKey,
  hash_value: number[],
  salt_value: number,
) {
  function get_area_i(sGame: SGame, index: number) {
    if (sGame.area_idx + index > sGame.area_amt - 1) {
      return sGame.area_idx + index - sGame.area_amt
    } else {
      return sGame.area_idx + index
    }
  }
  if (
    onChainData.sGame != undefined &&
    onChainData.rData != undefined &&
    globalStates.userPublicKey != undefined &&
    globalStates.simpleProgram != undefined &&
    globalStates.rewardProgram != undefined &&
    globalStates.anchorProvider != undefined &&
    globalStates.userRDataAddress != undefined &&
    globalStates.userSDataAddress != undefined &&
    onChainData.sCfgs != undefined
  ) {
    // create, send and confirm transaction
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
      // create
      const transaction = new Transaction()
      // add instruction
      if (onChainData.sData !== undefined && onChainData.sData.g_status == 1) {
        transaction.add(
          await globalStates.simpleProgram.methods
            .direct()
            .accountsStrict({
              systemProgram: SystemProgram.programId,
              rewardProgram: globalStates.rewardProgram.programId,
              signer: globalStates.userPublicKey,
              target: target,
              rData1: rData1,
              rData2: globalStates.userRDataAddress,
              sSafe: s_safe_pkey,
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
            .instruction(),
        )
      } else if (onChainData.sData !== undefined && onChainData.sData.g_status >= 1) {
        transaction.add(
          await globalStates.simpleProgram.methods
            .settle()
            .accountsStrict({
              systemProgram: SystemProgram.programId,
              rewardProgram: globalStates.rewardProgram.programId,
              signer: globalStates.userPublicKey,
              target: target,
              rData1: rData1,
              rData2: globalStates.userRDataAddress,
              sSafe: s_safe_pkey,
              sData: globalStates.userSDataAddress,
              sCfgs: s_cfgs_pkey,
            })
            .instruction(),
        )
      }
      // add instruction
      transaction.add(
        await globalStates.simpleProgram.methods
          .launch(salt_value, hash_value)
          .accountsStrict({
            systemProgram: SystemProgram.programId,
            signer: globalStates.userPublicKey,
            sCfgs: s_cfgs_pkey,
            sSafe: s_safe_pkey,
            sGame: sGamePKey,
            sData: globalStates.userSDataAddress,
            area1: PublicKey.findProgramAddressSync(
              [
                Buffer.from([onChainData.sGame.game_idx]),
                Buffer.from([get_area_i(onChainData.sGame, 0)]),
              ],
              globalStates.simpleProgram.programId,
            )[0],
            area2: PublicKey.findProgramAddressSync(
              [
                Buffer.from([onChainData.sGame.game_idx]),
                Buffer.from([get_area_i(onChainData.sGame, 1)]),
              ],
              globalStates.simpleProgram.programId,
            )[0],
            area3: PublicKey.findProgramAddressSync(
              [
                Buffer.from([onChainData.sGame.game_idx]),
                Buffer.from([get_area_i(onChainData.sGame, 2)]),
              ],
              globalStates.simpleProgram.programId,
            )[0],
            area4: PublicKey.findProgramAddressSync(
              [
                Buffer.from([onChainData.sGame.game_idx]),
                Buffer.from([get_area_i(onChainData.sGame, 3)]),
              ],
              globalStates.simpleProgram.programId,
            )[0],
            area5: PublicKey.findProgramAddressSync(
              [
                Buffer.from([onChainData.sGame.game_idx]),
                Buffer.from([get_area_i(onChainData.sGame, 4)]),
              ],
              globalStates.simpleProgram.programId,
            )[0],
          })
          .instruction(),
      )
      await processTranction(transaction, globalStates.anchorProvider.connection)
      return 2
    } catch (error) {
      showWarningDialog(false, String(error))
      console.log(String(error))
      return 1
    }
  } else {
    showWarningDialog(true, msg_2)
    console.log(msg_2)
    return 0
  }
}

async function sendAndConfirmForBattle(
  bGamePkey: PublicKey,
  hash_value: number[],
  salt_value: number,
) {
  function get_area_i(bGame: BGame, index: number) {
    if (bGame.area_idx + index > bGame.area_amt - 1) {
      return bGame.area_idx + index - bGame.area_amt
    } else {
      return bGame.area_idx + index
    }
  }
  if (
    onChainData.bGame != undefined &&
    onChainData.rData != undefined &&
    globalStates.userPublicKey != undefined &&
    globalStates.battleProgram != undefined &&
    globalStates.rewardProgram != undefined &&
    globalStates.anchorProvider != undefined &&
    globalStates.userRDataAddress != undefined &&
    globalStates.userBDataAddress != undefined &&
    onChainData.bCfgs != undefined
  ) {
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
      // create
      const transaction = new Transaction()
      // add instruction
      if (onChainData.bData !== undefined && onChainData.bData.g_status == 1) {
        transaction.add(
          await globalStates.battleProgram.methods
            .direct()
            .accountsStrict({
              systemProgram: SystemProgram.programId,
              rewardProgram: globalStates.rewardProgram.programId,
              signer: globalStates.userPublicKey,
              target: target,
              rData1: rData1,
              rData2: globalStates.userRDataAddress,
              bSafe: b_safe_pkey,
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
            .instruction(),
        )
      } else if (onChainData.bData !== undefined && onChainData.bData.g_status >= 2) {
        transaction.add(
          await globalStates.battleProgram.methods
            .settle()
            .accountsStrict({
              systemProgram: SystemProgram.programId,
              rewardProgram: globalStates.rewardProgram.programId,
              signer: globalStates.userPublicKey,
              target: target,
              rData1: rData1,
              rData2: globalStates.userRDataAddress,
              bSafe: b_safe_pkey,
              bData: globalStates.userBDataAddress,
              bCfgs: b_cfgs_pkey,
            })
            .instruction(),
        )
      }
      // add instruction
      transaction.add(
        await globalStates.battleProgram.methods
          .launch(salt_value, hash_value)
          .accountsStrict({
            systemProgram: SystemProgram.programId,
            signer: globalStates.userPublicKey,
            bCfgs: b_cfgs_pkey,
            bSafe: b_safe_pkey,
            bGame: bGamePkey,
            bData: globalStates.userBDataAddress,
            area1: PublicKey.findProgramAddressSync(
              [
                Buffer.from([onChainData.bGame.game_idx]),
                Buffer.from([get_area_i(onChainData.bGame, 0)]),
              ],
              globalStates.battleProgram.programId,
            )[0],
            area2: PublicKey.findProgramAddressSync(
              [
                Buffer.from([onChainData.bGame.game_idx]),
                Buffer.from([get_area_i(onChainData.bGame, 1)]),
              ],
              globalStates.battleProgram.programId,
            )[0],
            area3: PublicKey.findProgramAddressSync(
              [
                Buffer.from([onChainData.bGame.game_idx]),
                Buffer.from([get_area_i(onChainData.bGame, 2)]),
              ],
              globalStates.battleProgram.programId,
            )[0],
            area4: PublicKey.findProgramAddressSync(
              [
                Buffer.from([onChainData.bGame.game_idx]),
                Buffer.from([get_area_i(onChainData.bGame, 3)]),
              ],
              globalStates.battleProgram.programId,
            )[0],
            area5: PublicKey.findProgramAddressSync(
              [
                Buffer.from([onChainData.bGame.game_idx]),
                Buffer.from([get_area_i(onChainData.bGame, 4)]),
              ],
              globalStates.battleProgram.programId,
            )[0],
          })
          .instruction(),
      )
      await processTranction(transaction, globalStates.anchorProvider.connection)
      return 2
    } catch (error) {
      showWarningDialog(false, String(error))
      console.log('error')
      return 1
    }
  } else {
    showWarningDialog(true, msg_2)
    console.log(msg_2)
    return 0
  }
}
