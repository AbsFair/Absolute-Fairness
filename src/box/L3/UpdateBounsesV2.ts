import { basicAmount, bonusesTheUserWined, type BCfgs, type BData, type RData } from '@/state'

export function updateBounsesWhenWining(bCfgs: BCfgs, bData: BData, rData: RData) {
  let value = 0
  if (bData.g_status == 1) {
    value = Math.pow(2, bData.game_idx) * basicAmount * 2
  } else if (bData.g_status > 1) {
    value = Math.pow(2, bData.game_idx) * basicAmount * (bData.m_amount + bData.o_amount)
  }
  if (rData.status_c == 0) {
    value = value * (1 - (bCfgs.r_rate_1.toNumber() + bCfgs.r_rate_2.toNumber()) / 10000)
  } else if (rData.status_c == 1) {
    value = value * (1 - (bCfgs.r_rate_1.toNumber() + bCfgs.r_rate_3.toNumber()) / 10000)
  } else if (rData.status_c == 2) {
    value = value * (1 - bCfgs.r_rate_1.toNumber() / 10000)
  }
  bonusesTheUserWined.value = value / 1000000000
}
