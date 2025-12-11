import { checkWeb3Address } from '../L2/CheckWeb3Address'
import { showWarningDialog } from '../L1/ShowWarningDialog'
import { updateBStatusWhenGStatusIs0 } from '../L4/UpdateBStatusWhenGStatusIs0'
import { updateBStatusWhenGStatusIs1 } from '../L4/UpdateBStatusWhenGStatusIs1'
import { updateBStatusWhenGStatusIs2 } from '../L4/UpdateBStatusWhenGStatusIs2'
import { updateBStatusWhenGStatusIs4 } from '../L4/UpdateBStatusWhenGStatusIs4'
import { updateBStatusWhenGStatusIs6 } from '../L4/UpdateBStatusWhenGStatusIs6'
import { updateOnChainDataV3 } from '../L3/UpdateOnChainData'
import { navigate } from '../L3/NavigatePage'
import { msg_2, viewNames, onChainData } from '@/state'

export async function refreshDAppStatusV3(check_address: boolean) {
  if (check_address == true && (await checkWeb3Address()) != 3) {
    console.log('error')
    return
  } else if (onChainData.rData == undefined || onChainData.bCfgs == undefined) {
    showWarningDialog(true, msg_2)
    console.log('error')
    return
  } else if ((await updateOnChainDataV3()) == false) {
    return
  } else if (onChainData.bData == undefined) {
    navigate(viewNames[4], 1)
    return
  } else {
    switch (onChainData.bData.g_status) {
      case 0: {
        if ((await updateBStatusWhenGStatusIs0()) == 0) {
          console.log('error')
          return
        } else {
          return
        }
      }
      case 1: {
        if ((await updateBStatusWhenGStatusIs1()) == 0) {
          console.log('error')
          return
        } else {
          return
        }
      }
      case 2: {
        if ((await updateBStatusWhenGStatusIs2()) == 0) {
          console.log('error')
          return
        } else {
          return
        }
      }
      case 3: {
        if ((await updateBStatusWhenGStatusIs2()) == 0) {
          console.log('error')
          return
        } else {
          return
        }
      }
      case 4: {
        if ((await updateBStatusWhenGStatusIs4()) == 0) {
          console.log('error')
          return
        } else {
          return
        }
      }
      case 5: {
        if ((await updateBStatusWhenGStatusIs4()) == 0) {
          console.log('error')
          return
        } else {
          return
        }
      }
      case 6: {
        if ((await updateBStatusWhenGStatusIs6()) == 0) {
          console.log('error')
          return
        } else {
          return
        }
      }
      case 7: {
        if ((await updateBStatusWhenGStatusIs6()) == 0) {
          console.log('error')
          return
        } else {
          return
        }
      }
      default: {
        console.log('error')
        return
      }
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
}

export function compare(a: number[], b: number[]): boolean {
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
