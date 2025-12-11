import { showDialogOnView1 } from '@/state'
import { connect } from '../view-1'
import { showLoadingDialog } from '@/box/L1/ShowLoadingDialog'
// import { preloadingImage } from '@/box/L1/PreloadingImage'

export function no() {
  showDialogOnView1.value = false
}

export async function yes() {
  showLoadingDialog()
  // await preloadingImage([
  //   new URL('../../assets/jpg/stars_1.jpg', import.meta.url).href,
  //   new URL('../../assets/jpg/stars_2.jpg', import.meta.url).href,
  //   new URL('../../assets/jpg/stars_3.jpg', import.meta.url).href,
  //   new URL('../../assets/jpg/new_york.jpg', import.meta.url).href,
  // ])
  await connect()
}
