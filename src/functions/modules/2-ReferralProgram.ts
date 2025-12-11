import { showLoadingDialog } from '@/box/L1/ShowLoadingDialog'
import { showWarningDialog } from '@/box/L1/ShowWarningDialog'
import { checkWeb3Address } from '@/box/L2/CheckWeb3Address'
import { refreshForThe1stTime } from '@/box/L5/RefreshDAppStatusV1'
import {
  document_url,
  moduleTypeOnView5,
  msg_1,
  nameOfTheCurrentView,
  onChainData,
  showDialogOnView5,
  upgradePrice,
  userReferralStatusC,
  viewNames,
} from '@/state'

export async function refresh() {
  if (nameOfTheCurrentView.value != undefined) {
    await refreshForThe1stTime(viewNames[5])
    return null // exit from the function
  } else {
    showWarningDialog(false, msg_1)
    return null // exit from the function
  }
}

export function tutorial() {
  window.open(document_url + '/docs/ReferralSystem.html', '_blank')
}

export async function upgrade() {
  //////////////////////////////////////////////////////////////////
  showLoadingDialog()
  //////////////////////////////////////////////////////////////////
  if ((await checkWeb3Address()) < 3) {
    return false
  }
  //////////////////////////////////////////////////////////////////
  if (userReferralStatusC.value == 0) {
    showDialogOnView5.value = false
    moduleTypeOnView5.value = 2
    return false
  } else if (userReferralStatusC.value == 1) {
    if (onChainData.rCfgs != undefined) {
      upgradePrice.value = (onChainData.rCfgs.charge_a.toNumber() * 2) / 1000000000
      showDialogOnView5.value = false
      moduleTypeOnView5.value = 3
    } else {
      showWarningDialog(true, msg_1)
      return false
    }
  } else if (userReferralStatusC.value == 2) {
    showWarningDialog(false, 'Max level reached. No further upgrades possible.')
    return false
  } else {
    showWarningDialog(true, 'An unexpected error occurred.')
    return false
  }
  //////////////////////////////////////////////////////////////////
}
