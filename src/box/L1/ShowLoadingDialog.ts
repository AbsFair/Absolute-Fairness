import {
  viewNames,
  dialogTypeOnView1,
  dialogTypeOnView2,
  dialogTypeOnView3,
  dialogTypeOnView4,
  showDialogOnView1,
  showDialogOnView2,
  showDialogOnView3,
  showDialogOnView4,
  dialogTypeOnView5,
  showDialogOnView5,
  nameOfTheCurrentView,
} from '@/state'

export function showLoadingDialog() {
  if (nameOfTheCurrentView.value == viewNames[1]) {
    if (dialogTypeOnView1.value != 'loading') {
      dialogTypeOnView1.value = 'loading'
    }
    if (showDialogOnView1.value != true) {
      showDialogOnView1.value = true
    }
    return null
  } else if (nameOfTheCurrentView.value == viewNames[2]) {
    if (dialogTypeOnView2.value != 'loading') {
      dialogTypeOnView2.value = 'loading'
    }
    if (showDialogOnView2.value != true) {
      showDialogOnView2.value = true
    }
    return null
  } else if (nameOfTheCurrentView.value == viewNames[3]) {
    if (dialogTypeOnView3.value != 'loading') {
      dialogTypeOnView3.value = 'loading'
    }
    if (showDialogOnView3.value != true) {
      showDialogOnView3.value = true
    }
    return null
  } else if (nameOfTheCurrentView.value == viewNames[4]) {
    if (dialogTypeOnView4.value != 'loading') {
      dialogTypeOnView4.value = 'loading'
    }
    if (showDialogOnView4.value != true) {
      showDialogOnView4.value = true
    }
    return null
  } else if (nameOfTheCurrentView.value == viewNames[5]) {
    if (dialogTypeOnView5.value != 'loading') {
      dialogTypeOnView5.value = 'loading'
    }
    if (showDialogOnView5.value != true) {
      showDialogOnView5.value = true
    }
    return null
  }
}
