import { processTranction } from '@/box/L1/ProcessTransaction'
import { showLoadingDialog } from '@/box/L1/ShowLoadingDialog'
import { showWarningDialog } from '@/box/L1/ShowWarningDialog'
import { checkWeb3Address } from '@/box/L2/CheckWeb3Address'
import { refreshForThe1stTime } from '@/box/L5/RefreshDAppStatusV1'
import {
  document_url,
  globalStates,
  moduleTypeOnView5,
  msg_1,
  msg_2,
  onChainData,
  referralCode,
  showDialogOnView5,
  upgradePrice,
  viewNames,
} from '@/state'
import { PublicKey } from '@solana/web3.js'

export function goBack() {
  moduleTypeOnView5.value = 1
}

export function query() {
  window.open(document_url + '/docs/ReferralSystem.html', '_blank')
}

export function tutorial() {
  window.open(document_url + '/docs/ReferralSystem.html', '_blank')
}

export async function upgrade() {
  //////////////////////////////////////////////////////////////////
  showLoadingDialog()
  //////////////////////////////////////////////////////////////////
  if ((await checkWeb3Address()) <= 2) {
    return false // exit from the current function
  }
  //////////////////////////////////////////////////////////////////
  if (checkTheEnteredCode() == false) {
    return false // exit from the current function
  }
  //////////////////////////////////////////////////////////////////
  if ((await sendTxAndConfirm()) == false) {
    return false // exit from the current function
  }
  //////////////////////////////////////////////////////////////////
  await refreshForThe1stTime(viewNames[5])
  //////////////////////////////////////////////////////////////////
}

function checkTheEnteredCode() {
  try {
    new PublicKey(referralCode.value)
    return true
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    showWarningDialog(false, 'Please enter a valid referral code.')
    console.log('Please enter a valid referral code.')
    return false
  }
}

async function sendTxAndConfirm() {
  if (
    globalStates.rewardProgram != undefined &&
    globalStates.userPublicKey != undefined &&
    globalStates.anchorProvider != undefined &&
    globalStates.userRDataAddress != undefined
  ) {
    try {
      const transaction = await globalStates.rewardProgram.methods
        .upgradeA()
        .accountsStrict({
          signer: globalStates.userPublicKey,
          rData1: new PublicKey(referralCode.value),
          rData2: globalStates.userRDataAddress,
        })
        .transaction()
      await processTranction(transaction, globalStates.anchorProvider.connection)
      return true
    } catch (error) {
      showWarningDialog(false, String(error))
      console.log(String(error))
      return false
    }
  } else {
    showWarningDialog(false, msg_2)
    console.log(msg_2)
    return false // exit from the current function
  }
}

export function skip() {
  if (onChainData.rCfgs != undefined) {
    upgradePrice.value = (onChainData.rCfgs.charge_a.toNumber() * 4) / 1000000000
    showDialogOnView5.value = false
    moduleTypeOnView5.value = 3
  } else {
    showWarningDialog(true, msg_1)
    return false
  }
}
