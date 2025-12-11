import BN from 'bn.js'
import type { Battle } from './assets/types/battle'
import type { Reward } from './assets/types/reward'
import type { Simple } from './assets/types/simple'
import { Buffer } from 'buffer'
import { Program, AnchorProvider } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import { ref } from 'vue'

////////////////////////////////////////////////////////////////////////////////////////////////////

export const msg_1 = 'An unexpected error occurred. Please return to the homepage to start over.'
export const msg_2 = 'Initialization is not complete. Please return to the homepage to start over.'
export const msg_3 = 'Failed to connect to Solana RPC node. Please check your Read-Only RPC URL.'

////////////////////////////////////////////////////////////////////////////////////////////////////

export const refresh_interval: {
  length: number
  target: NodeJS.Timeout | number | undefined
  object: Promise<void> | undefined
} = {
  length: 4000,
  target: undefined,
  object: undefined,
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export const viewNames = {
  '1': 'first',
  '2': 'array',
  '3': 'equal',
  '4': 'dices',
  '5': 'refer',
}

export const basicAmount = 10000000

export const selectedAmountForSimple = [2, 3, 4, 5, 6]
export const selectedAmountForBattle = [2, 3, 4, 5, 6]

////////////////////////////////////////////////////////////////////////////////////////////////////

export const placeholder = new PublicKey('5tvAWxFiR7JoNqauc4oyMy56BqJ3npFyGAbe1jTcZR6b')

export const reward_pkey = new PublicKey('6t1Tc1MJA73wMUidFV2RmtFFwEssMmYa4ytrwMyc8iQS')
export const simple_pkey = new PublicKey('7XmRb1oto6TBZgrzLoU818uUFDPRNPAJrAWpxoTae8zB')
export const battle_pkey = new PublicKey('Gsa82hEsHuL7pAzY8UNNJb48CsHJsqGXer2KTuVNi4R')

export const r_cfgs_pkey = PublicKey.findProgramAddressSync([Buffer.from('cfgs')], reward_pkey)[0]
export const s_safe_pkey = PublicKey.findProgramAddressSync([Buffer.from('safe')], simple_pkey)[0]
export const s_cfgs_pkey = PublicKey.findProgramAddressSync([Buffer.from('cfgs')], simple_pkey)[0]
export const b_safe_pkey = PublicKey.findProgramAddressSync([Buffer.from('safe')], battle_pkey)[0]
export const b_cfgs_pkey = PublicKey.findProgramAddressSync([Buffer.from('cfgs')], battle_pkey)[0]

export const document_url = 'https://docs.absolute-fairness.org'
export const default_rpc_url = 'https://api.mainnet-beta.solana.com'
export const defautl_displayed_rpc_url = 'https://api.mainnet-beta.solana.com'

////////////////////////////////////////////////////////////////////////////////////////////////////

export const solanaReadOnlyRPCURL = ref(default_rpc_url)
export const nameOfTheCurrentView = ref('')
export const userWeb3WalletAddress = ref('')
export const messageInWarningDialog = ref('')

export const displayedSolanaReadOnlyRPCURL = ref(defautl_displayed_rpc_url)

////////////////////////////////////////////////////////////////////////////////////////////////////

export const showDialogOnView1 = ref(false)
export const dialogTypeOnView1 = ref('')

export const showDialogOnView2 = ref(false)
export const dialogTypeOnView2 = ref('')

export const moduleTypeOnView3 = ref(3)
export const showDialogOnView3 = ref(false)
export const dialogTypeOnView3 = ref('')

export const moduleTypeOnView4 = ref(3)
export const showDialogOnView4 = ref(false)
export const dialogTypeOnView4 = ref('')

export const moduleTypeOnView5 = ref(3)
export const showDialogOnView5 = ref(false)
export const dialogTypeOnView5 = ref('')

////////////////////////////////////////////////////////////////////////////////////////////////////

export const referralCode = ref('')
export const upgradePrice = ref(0)

export const yourDiceRolls1 = ref(1)
export const yourDiceRolls2 = ref(1)
export const yourDiceRolls3 = ref(1)
export const yourDiceRolls4 = ref(1)
export const yourDiceRolls5 = ref(1)

export const oppoDiceRolls1 = ref(1)
export const oppoDiceRolls2 = ref(1)
export const oppoDiceRolls3 = ref(1)
export const oppoDiceRolls4 = ref(1)
export const oppoDiceRolls5 = ref(1)

export const theMostRecentBid = ref('')
export const theMostRecentLog = ref('')

export const betAmountOfTheUser = ref(0)
export const betAmountOfTheOppo = ref(0)

export const maxSecondsForClocks = ref(0)
export const launchUnixTimestamp = ref(0)

export const luckyWordsForSimple = ref('')
export const luckyWordsForBattle = ref('')

export const hintForConfirmation = ref('')
export const opponentWeb3Address = ref('')
export const operationButtonName = ref('')

export const bonusesTheUserWined = ref(0)
export const displaiedGameResult = ref('')

export const userReferralStatusC = ref(0)
export const userReferralRewardA = ref(0)
export const userReferralUpdateT = ref(0)

export const referralCodeOfTheUser = ref('')

////////////////////////////////////////////////////////////////////////////////////////////////////

export const globalStates: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  injectedWeb3WalletProvider: any
  callbackForWarningDialog: () => void
  nameOfTheWeb3Wallet: string | undefined
  hashValueForBattle: HashV | undefined
  hashValueForSimple: HashV | undefined
  userRDataAddress: PublicKey | undefined
  userSDataAddress: PublicKey | undefined
  userBDataAddress: PublicKey | undefined
  anchorProvider: AnchorProvider | undefined
  rewardProgram: Program<Reward> | undefined
  simpleProgram: Program<Simple> | undefined
  battleProgram: Program<Battle> | undefined
  userPublicKey: PublicKey | undefined
} = {
  injectedWeb3WalletProvider: undefined,
  callbackForWarningDialog: () => {},
  nameOfTheWeb3Wallet: undefined,
  hashValueForBattle: undefined,
  hashValueForSimple: undefined,
  userRDataAddress: undefined,
  userSDataAddress: undefined,
  userBDataAddress: undefined,
  anchorProvider: undefined,
  rewardProgram: undefined,
  simpleProgram: undefined,
  battleProgram: undefined,
  userPublicKey: undefined,
}

export const onChainData: {
  rCfgs: RCfgs | undefined
  rData: RData | undefined
  sCfgs: SCfgs | undefined
  sGame: SGame | undefined
  sArea: SArea | undefined
  sData: SData | undefined
  sOppo: SOppo | undefined
  bCfgs: BCfgs | undefined
  bGame: BGame | undefined
  bArea: BArea | undefined
  bData: BData | undefined
  bOppo: BOppo | undefined
} = {
  rCfgs: undefined,
  rData: undefined,
  sCfgs: undefined,
  sGame: undefined,
  sArea: undefined,
  sData: undefined,
  sOppo: undefined,
  bCfgs: undefined,
  bGame: undefined,
  bArea: undefined,
  bData: undefined,
  bOppo: undefined,
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export interface HashV {
  word: string
  salt: number
  hash: number[][]
}

export interface RCfgs {
  player_a: number
  charge_a: BN
}

export interface RData {
  status_c: number
  player_i: number
  reward_a: BN
  update_t: number
  player_k: PublicKey
  parent_k: PublicKey
}

export interface SCfgs {
  time_amt: number
  r_rate_1: BN
  r_rate_2: BN
  r_rate_3: BN
}

export interface SGame {
  game_idx: number
  area_amt: number
  area_idx: number
}

export interface SArea {
  game_idx: number
  area_idx: number
  room_idx: number
  player_1: number[]
  player_2: number[]
  update_t: number[]
}

export interface SData {
  g_status: number
  m_number: number
  o_number: number
  game_idx: number
  area_idx: number
  room_idx: number
  seat_idx: number
  user_key: PublicKey
  user_idx: number
  oppo_idx: number
  salt_val: number
  hash_val: number[]
  update_t: number
}

export interface SOppo {
  g_status: number
  m_number: number
  o_number: number
  game_idx: number
  area_idx: number
  room_idx: number
  seat_idx: number
  user_key: PublicKey
  user_idx: number
  oppo_idx: number
  salt_val: number
  hash_val: number[]
}

export interface BCfgs {
  time_amt: number
  r_rate_1: BN
  r_rate_2: BN
  r_rate_3: BN
}

export interface BGame {
  game_idx: number
  area_amt: number
  area_idx: number
}

export interface BArea {
  game_idx: number
  area_idx: number
  room_idx: number
  player_1: number[]
  player_2: number[]
  update_t: number[]
}

export interface BData {
  g_status: number
  g_degree: number[]
  m_amount: number
  o_amount: number
  m_result: number[]
  o_result: number[]
  game_idx: number
  area_idx: number
  room_idx: number
  seat_idx: number
  user_key: PublicKey
  user_idx: number
  oppo_idx: number
  salt_val: number
  hash_val: number[]
  update_t: number
}

export interface BOppo {
  g_status: number
  g_degree: number[]
  m_amount: number
  o_amount: number
  m_result: number[]
  o_result: number[]
  game_idx: number
  area_idx: number
  room_idx: number
  seat_idx: number
  user_key: PublicKey
  user_idx: number
  oppo_idx: number
  salt_val: number
  hash_val: number[]
  update_t: number
}

////////////////////////////////////////////////////////////////////////////////////////////////////
