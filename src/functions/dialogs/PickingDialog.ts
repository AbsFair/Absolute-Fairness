import router from '@/index'
import { PublicKey } from '@solana/web3.js'
import { showLoadingDialog } from '@/box/L1/ShowLoadingDialog'
import { showWarningDialog } from '@/box/L1/ShowWarningDialog'
import {
  dialogTypeOnView1,
  globalStates,
  messageInWarningDialog,
  msg_2,
  referralCodeOfTheUser,
  showDialogOnView1,
  userWeb3WalletAddress,
  viewNames,
} from '@/state'
import { preloadingImage } from '@/box/L1/PreloadingImage'

type CustomWindow = Window & {
  phantom?: {
    solana?: {
      isPhantom?: boolean
    }
  }
  backpack?: {
    solana?: {
      isBackpack?: boolean
    }
  }
}

export async function select(name: string) {
  showLoadingDialog()
  if (name == 'Phantom') {
    globalStates.nameOfTheWeb3Wallet = 'Phantom'
    if ((window as CustomWindow).phantom?.solana?.isPhantom) {
      globalStates.injectedWeb3WalletProvider = (window as CustomWindow).phantom?.solana
    } else {
      globalStates.callbackForWarningDialog = () => {
        showDialogOnView1.value = false
        window.open('https://phantom.app/', '_blank')
      }
      messageInWarningDialog.value =
        'Phantom is not installed! To continue, please install Phantom from the link: ' +
        'https://phantom.app/.'
      dialogTypeOnView1.value = 'warning'
      showDialogOnView1.value = true
      return
    }
  } else if (name == 'Backpack') {
    globalStates.nameOfTheWeb3Wallet = 'Backpack'
    if ((window as CustomWindow).backpack?.solana?.isBackpack) {
      globalStates.injectedWeb3WalletProvider = (window as CustomWindow).backpack?.solana
    } else {
      globalStates.callbackForWarningDialog = () => {
        showDialogOnView1.value = false
        window.open('https://backpack.app/', '_blank')
      }
      messageInWarningDialog.value =
        'Backpack is not installed! To continue, please install Backpack from the link: ' +
        'https://backpack.app/.'
      dialogTypeOnView1.value = 'warning'
      showDialogOnView1.value = true
      return
    }
  }
  const load_images = preloadingImage([
    new URL('../../assets/jpg/stars_1.jpg', import.meta.url).href,
    new URL('../../assets/jpg/stars_2.jpg', import.meta.url).href,
    new URL('../../assets/jpg/stars_3.jpg', import.meta.url).href,
    new URL('../../assets/jpg/new_york.jpg', import.meta.url).href,
  ])
  try {
    const reponse = await globalStates.injectedWeb3WalletProvider.connect()
    globalStates.userPublicKey = reponse.publicKey
    userWeb3WalletAddress.value = reponse.publicKey.toString()
    if (globalStates.userPublicKey != undefined && globalStates.rewardProgram != undefined) {
      globalStates.userRDataAddress = PublicKey.findProgramAddressSync(
        [globalStates.userPublicKey.toBytes()],
        globalStates.rewardProgram.programId,
      )[0]
      referralCodeOfTheUser.value = globalStates.userRDataAddress.toString()
    } else {
      showWarningDialog(true, msg_2)
      return
    }
    await load_images
    router.push('/' + viewNames[2])
    return
  } catch (error) {
    showWarningDialog(false, String(error))
    console.log('error')
    return
  }
}

export function cancel() {
  showDialogOnView1.value = false
}
