import { battle_pkey, simple_pkey } from '@/state'
import { PublicKey } from '@solana/web3.js'

export function getSGamePkey(game_idx: number) {
  return PublicKey.findProgramAddressSync([Buffer.from([game_idx])], simple_pkey)[0]
}

export function getBGamePkey(game_idx: number) {
  return PublicKey.findProgramAddressSync([Buffer.from([game_idx])], battle_pkey)[0]
}
