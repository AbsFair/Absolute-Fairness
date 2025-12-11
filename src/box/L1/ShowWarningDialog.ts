import router from '@/index'
import {
  viewNames,
  globalStates,
  dialogTypeOnView1,
  dialogTypeOnView2,
  dialogTypeOnView3,
  dialogTypeOnView4,
  showDialogOnView1,
  showDialogOnView2,
  showDialogOnView3,
  showDialogOnView4,
  messageInWarningDialog,
  showDialogOnView5,
  dialogTypeOnView5,
  nameOfTheCurrentView,
  refresh_interval,
} from '@/state'

export function showWarningDialog(backToFirst: boolean, warningMessage: string) {
  if (backToFirst == true) {
    clearInterval(refresh_interval.target)
  }
  messageInWarningDialog.value = warningMessage
  if (nameOfTheCurrentView.value == viewNames[1]) {
    if (backToFirst == false) {
      globalStates.callbackForWarningDialog = () => {
        showDialogOnView1.value = false
      }
    } else {
      globalStates.callbackForWarningDialog = () => {
        router.replace('/')
      }
    }
    dialogTypeOnView1.value = 'warning'
    showDialogOnView1.value = true
  } else if (nameOfTheCurrentView.value == viewNames[2]) {
    if (backToFirst == false) {
      globalStates.callbackForWarningDialog = () => {
        showDialogOnView2.value = false
      }
    } else {
      globalStates.callbackForWarningDialog = () => {
        router.replace('/')
      }
    }
    dialogTypeOnView2.value = 'warning'
    showDialogOnView2.value = true
  } else if (nameOfTheCurrentView.value == viewNames[3]) {
    if (backToFirst == false) {
      globalStates.callbackForWarningDialog = () => {
        showDialogOnView3.value = false
      }
    } else {
      globalStates.callbackForWarningDialog = () => {
        router.replace('/')
      }
    }
    dialogTypeOnView3.value = 'warning'
    showDialogOnView3.value = true
  } else if (nameOfTheCurrentView.value == viewNames[4]) {
    if (backToFirst == false) {
      globalStates.callbackForWarningDialog = () => {
        showDialogOnView4.value = false
      }
    } else {
      globalStates.callbackForWarningDialog = () => {
        router.replace('/')
      }
    }
    dialogTypeOnView4.value = 'warning'
    showDialogOnView4.value = true
  } else if (nameOfTheCurrentView.value == viewNames[5]) {
    if (backToFirst == false) {
      globalStates.callbackForWarningDialog = () => {
        showDialogOnView5.value = false
      }
    } else {
      globalStates.callbackForWarningDialog = () => {
        router.replace('/')
      }
    }
    dialogTypeOnView5.value = 'warning'
    showDialogOnView5.value = true
  } else {
    return null
  }
}
