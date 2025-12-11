import reward_idl from '@/assets/idl/reward.json'
import simple_idl from '@/assets/idl/simple.json'
import battle_idl from '@/assets/idl/battle.json'
import type { Reward } from '@/assets/types/reward'
import type { Simple } from '@/assets/types/simple'
import type { Battle } from '@/assets/types/battle'
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Connection } from '@solana/web3.js'
import { showLoadingDialog } from '@/box/L1/ShowLoadingDialog'
import { showWarningDialog } from '@/box/L1/ShowWarningDialog'
import {
  globalStates,
  dialogTypeOnView1,
  solanaReadOnlyRPCURL,
  document_url,
  displayedSolanaReadOnlyRPCURL,
  default_rpc_url,
  defautl_displayed_rpc_url,
  showDialogOnView1,
} from '@/state'

export function query() {
  window.open(document_url + '/docs/RPCURL.html', '_blank')
}

export function check() {
  dialogTypeOnView1.value = 'u_terms'
  showDialogOnView1.value = true
}

export async function connect() {
  // show loading dialog
  showLoadingDialog()
  // check read-only rpc url
  displayedSolanaReadOnlyRPCURL.value = displayedSolanaReadOnlyRPCURL.value
    .replace(/\s/g, '')
    .replace(/\/+$/, '')
  if (displayedSolanaReadOnlyRPCURL.value == defautl_displayed_rpc_url) {
    solanaReadOnlyRPCURL.value = default_rpc_url
  } else {
    solanaReadOnlyRPCURL.value = displayedSolanaReadOnlyRPCURL.value
  }
  try {
    // update anchorProvider
    globalStates.anchorProvider = new AnchorProvider(
      new Connection(solanaReadOnlyRPCURL.value, 'confirmed'),
      globalStates.injectedWeb3WalletProvider,
    )
    // update rewardProgram
    globalStates.rewardProgram = new Program(
      reward_idl,
      globalStates.anchorProvider,
    ) as Program<Reward>
    // update simpleProgram
    globalStates.simpleProgram = new Program(
      simple_idl,
      globalStates.anchorProvider,
    ) as Program<Simple>
    // update battleProgram
    globalStates.battleProgram = new Program(
      battle_idl,
      globalStates.anchorProvider,
    ) as Program<Battle>
    // update
    dialogTypeOnView1.value = 'picking'
  } catch (error) {
    showWarningDialog(false, String(error))
    console.log('error')
    return
  }
}

export function practice() {
  window.open(document_url + '/docs/Devnet.html', '_blank')
  // solanaReadOnlyRPCURL.value = 'https://api.devnet.solana.com'
}

export function tutorial() {
  window.open(document_url, '_blank')
}
