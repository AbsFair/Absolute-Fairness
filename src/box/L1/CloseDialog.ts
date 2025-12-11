import {
  nameOfTheCurrentView,
  showDialogOnView1,
  showDialogOnView2,
  showDialogOnView3,
  showDialogOnView4,
  showDialogOnView5,
  viewNames,
} from '@/state'

export function closeDialog() {
  if (nameOfTheCurrentView.value == viewNames[1]) {
    if (showDialogOnView1.value == true) {
      showDialogOnView1.value = false
    }
    return null
  } else if (nameOfTheCurrentView.value == viewNames[2]) {
    if (showDialogOnView2.value == true) {
      showDialogOnView2.value = false
    }
    return null
  } else if (nameOfTheCurrentView.value == viewNames[3]) {
    if (showDialogOnView3.value == true) {
      showDialogOnView3.value = false
    }
    return null
  } else if (nameOfTheCurrentView.value == viewNames[4]) {
    if (showDialogOnView4.value == true) {
      showDialogOnView4.value = false
    }
    return null
  } else if (nameOfTheCurrentView.value == viewNames[5]) {
    if (showDialogOnView5.value == true) {
      showDialogOnView5.value = false
    }
    return null
  }
}
