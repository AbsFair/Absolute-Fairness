import { showWarningDialog } from '@/box/L1/ShowWarningDialog'
import {
  msg_1,
  msg_2,
  viewNames,
  b_cfgs_pkey,
  b_safe_pkey,
  onChainData,
  globalStates,
  luckyWordsForBattle,
  document_url,
} from '@/state'
import { getHashOfStringWithSalt } from '@/box/L2/CalculateHashValues'
import { getBGamePkey } from '@/box/L1/GetGamePkey'
import { processTranction } from '@/box/L1/ProcessTransaction'
import { PublicKey, SystemProgram } from '@solana/web3.js'
import { showLoadingDialog } from '@/box/L1/ShowLoadingDialog'
import { navigate } from '@/box/L3/NavigatePage'
import { refreshDAppStatusV3 } from '@/box/L5/RefreshDAppStatusV3'

export async function goBack() {
  navigate(viewNames[4], 5)
}

export async function tutorial() {
  window.open(document_url + "/docs/Liar'sDice.html#step-3-operation-page", '_blank')
}

export async function challenge() {
  showLoadingDialog()
  if (onChainData.bData == undefined) {
    showWarningDialog(true, msg_1)
    return
  } else if (onChainData.bData.g_status == 1) {
    showWarningDialog(false, 'You cannot challenge when no player has bid.')
    return
  } else if (
    (onChainData.bData.g_status == 2 && onChainData.bData.seat_idx == 2) ||
    (onChainData.bData.g_status == 3 && onChainData.bData.seat_idx == 1)
  ) {
    if ((await checkHashAndSendAndConfirm()) == 2) {
      refreshDAppStatusV3(true)
    }
  } else {
    showWarningDialog(true, msg_1)
    return
  }
}

export async function makeABid(quantity: number, diceFace: number) {
  showLoadingDialog()
  if (onChainData.bData == undefined) {
    showWarningDialog(true, msg_1)
    console.log('error')
    return
  } else if (onChainData.bData.g_status > 3) {
    showWarningDialog(false, 'You cannot make a bid when one of players has challenged.')
    return
  } else if (
    quantity < onChainData.bData.g_degree[0] ||
    (quantity == onChainData.bData.g_degree[0] && diceFace <= onChainData.bData.g_degree[1])
  ) {
    showWarningDialog(
      false,
      'Your cannot make a bid that is equal to or lower than the most recent bid.',
    )
    return
  } else if (onChainData.bData.g_status == 1) {
    if ((await detachAndConfirm(quantity, diceFace)) == 2) {
      refreshDAppStatusV3(true)
    }
  } else if (
    (onChainData.bData.g_status == 2 && onChainData.bData.seat_idx == 2) ||
    (onChainData.bData.g_status == 3 && onChainData.bData.seat_idx == 1)
  ) {
    if ((await assertAndConfirm(quantity, diceFace)) == 2) {
      refreshDAppStatusV3(true)
    }
  } else {
    showWarningDialog(true, msg_1)
    return
  }
}

async function checkHashAndSendAndConfirm() {
  ////////////////////////////////////////////////////////////
  if (onChainData.bData == undefined) {
    showWarningDialog(true, msg_2)
    console.log('error')
    return
  } else if (onChainData.bOppo == undefined) {
    showWarningDialog(true, msg_2)
    console.log('error')
    return
  }
  ////////////////////////////////////////////////////////////
  const hash_values = await getHashOfStringWithSalt(
    luckyWordsForBattle.value,
    onChainData.bData.salt_val,
  )
  if (hash_values == undefined) {
    showWarningDialog(true, msg_1)
    return
  } else if (
    (onChainData.bData.seat_idx == 1 &&
      compare(hash_values[1], onChainData.bData.hash_val) == false) ||
    (onChainData.bData.seat_idx == 2 &&
      compare(hash_values[2], onChainData.bData.hash_val) == false)
  ) {
    const msg = 'Please enter the same lucky words you entered in the pre-game setup page!'
    showWarningDialog(false, msg)
    globalStates.callbackForWarningDialog = () => {
      navigate(viewNames[4], 3)
    }
    return
  }
  ////////////////////////////////////////////////////////////
  let hash_value
  if (onChainData.bData.seat_idx == 1) {
    hash_value = hash_values[0]
  } else if (onChainData.bData.seat_idx == 2) {
    hash_value = hash_values[1]
  } else {
    showWarningDialog(true, msg_1)
    return
  }
  ////////////////////////////////////////////////////////////
  const bGamePkey = getBGamePkey(onChainData.bData.game_idx - 1)
  if (bGamePkey == undefined) {
    showWarningDialog(true, msg_1)
    return
  }
  ////////////////////////////////////////////////////////////
  if (
    globalStates.battleProgram != undefined &&
    globalStates.userPublicKey != undefined &&
    globalStates.userRDataAddress != undefined &&
    globalStates.userBDataAddress != undefined &&
    globalStates.anchorProvider != undefined
  ) {
    try {
      const buffer = Buffer.alloc(4)
      buffer.writeUInt32BE(onChainData.bData.oppo_idx)
      const transaction = await globalStates.battleProgram.methods
        .finish(hash_value)
        .accountsStrict({
          systemProgram: SystemProgram.programId,
          signer: globalStates.userPublicKey,
          bCfgs: b_cfgs_pkey,
          bSafe: b_safe_pkey,
          bData: globalStates.userBDataAddress,
          oData: PublicKey.findProgramAddressSync(
            [buffer, Buffer.from('data')],
            globalStates.battleProgram.programId,
          )[0],
        })
        .transaction()
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

function compare(a: number[], b: number[]): boolean {
  if (a.length !== b.length) {
    return false
  } else {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false
      }
    }
  }
  return true
}

async function detachAndConfirm(quantity: number, diceFace: number) {
  ////////////////////////////////////////////////////////////
  if (onChainData.bData == undefined) {
    showWarningDialog(true, msg_2)
    console.log('error')
    return
  } else if (onChainData.bOppo == undefined) {
    showWarningDialog(true, msg_2)
    console.log('error')
    return
  }
  ////////////////////////////////////////////////////////////
  const hash_values = await getHashOfStringWithSalt(
    luckyWordsForBattle.value,
    onChainData.bData.salt_val,
  )
  if (hash_values == undefined) {
    showWarningDialog(true, msg_1)
    return
  } else if (compare(hash_values[2], onChainData.bData.hash_val) == false) {
    const msg = 'Please enter the same lucky words you entered in the pre-game setup page!'
    showWarningDialog(false, msg)
    globalStates.callbackForWarningDialog = () => {
      navigate(viewNames[4], 3)
    }
    return
  }
  ////////////////////////////////////////////////////////////
  const bGamePkey = getBGamePkey(onChainData.bData.game_idx - 1)
  if (bGamePkey == undefined) {
    showWarningDialog(true, msg_1)
    return
  }
  ////////////////////////////////////////////////////////////
  if (
    globalStates.battleProgram != undefined &&
    globalStates.userPublicKey != undefined &&
    globalStates.userRDataAddress != undefined &&
    globalStates.userBDataAddress != undefined &&
    globalStates.anchorProvider != undefined
  ) {
    try {
      const buffer = Buffer.alloc(4)
      buffer.writeUInt32BE(onChainData.bOppo.user_idx)
      const transaction = await globalStates.battleProgram.methods
        .detach([quantity, diceFace], hash_values[1])
        .accountsStrict({
          systemProgram: SystemProgram.programId,
          signer: globalStates.userPublicKey,
          bCfgs: b_cfgs_pkey,
          bSafe: b_safe_pkey,
          bArea: PublicKey.findProgramAddressSync(
            [Buffer.from([onChainData.bData.game_idx]), Buffer.from([onChainData.bData.area_idx])],
            globalStates.battleProgram.programId,
          )[0],
          bData: globalStates.userBDataAddress,
          oData: PublicKey.findProgramAddressSync(
            [buffer, Buffer.from('data')],
            globalStates.battleProgram.programId,
          )[0],
        })
        .transaction()
      await processTranction(transaction, globalStates.anchorProvider.connection)
      return 2
    } catch (error) {
      showWarningDialog(false, String(error))
      console.log(error)
      return 1
    }
  } else {
    showWarningDialog(true, msg_2)
    console.log(msg_2)
    return 0
  }
}

async function assertAndConfirm(quantity: number, diceFace: number) {
  ////////////////////////////////////////////////////////////
  if (onChainData.bData == undefined) {
    showWarningDialog(true, msg_2)
    console.log('error')
    return
  }
  ////////////////////////////////////////////////////////////
  const bGamePkey = getBGamePkey(onChainData.bData.game_idx - 1)
  if (bGamePkey == undefined) {
    showWarningDialog(true, msg_1)
    return
  }
  ////////////////////////////////////////////////////////////
  if (
    globalStates.battleProgram != undefined &&
    globalStates.userPublicKey != undefined &&
    globalStates.userRDataAddress != undefined &&
    globalStates.userBDataAddress != undefined &&
    globalStates.anchorProvider != undefined
  ) {
    try {
      const buffer = Buffer.alloc(4)
      buffer.writeUInt32BE(onChainData.bData.oppo_idx)
      const transaction = await globalStates.battleProgram.methods
        .assert([quantity, diceFace])
        .accountsStrict({
          systemProgram: SystemProgram.programId,
          signer: globalStates.userPublicKey,
          bCfgs: b_cfgs_pkey,
          bSafe: b_safe_pkey,
          bData: globalStates.userBDataAddress,
          oData: PublicKey.findProgramAddressSync(
            [buffer, Buffer.from('data')],
            globalStates.battleProgram.programId,
          )[0],
        })
        .transaction()
      await processTranction(transaction, globalStates.anchorProvider.connection)
      return 2
    } catch (error) {
      showWarningDialog(false, String(error))
      console.log(error)
      return 1
    }
  } else {
    showWarningDialog(true, msg_2)
    console.log(msg_2)
    return 0
  }
  ////////////////////////////////////////////////////////////
}
