import {
  msg_1,
  viewNames,
  moduleTypeOnView3,
  moduleTypeOnView4,
  moduleTypeOnView5,
  showDialogOnView3,
  showDialogOnView4,
  showDialogOnView5,
  nameOfTheCurrentView,
} from '@/state'
import { showWarningDialog } from '../L1/ShowWarningDialog'
import router from '@/index'

export function navigate(name: string, index: number) {
  ////////////////////////////////////////////////////////////
  if (name == viewNames[3]) {
    if (moduleTypeOnView3.value != index) {
      moduleTypeOnView3.value = index
    }
    if (showDialogOnView3.value) {
      showDialogOnView3.value = false
    }
  } else if (name == viewNames[4]) {
    if (moduleTypeOnView4.value != index) {
      moduleTypeOnView4.value = index
    }
    if (showDialogOnView4.value) {
      showDialogOnView4.value = false
    }
  } else if (name == viewNames[5]) {
    if (moduleTypeOnView5.value != index) {
      moduleTypeOnView5.value = index
    }
    if (showDialogOnView5.value) {
      showDialogOnView5.value = false
    }
  } else {
    showWarningDialog(true, msg_1)
    console.log(msg_1)
  }
  ////////////////////////////////////////////////////////////
  if (nameOfTheCurrentView.value != name) {
    router.push('/' + name)
  }
}
