import {
  type RData,
  type SCfgs,
  type SData,
  basicAmount,
  bonusesTheUserWined,
  displaiedGameResult,
} from '@/state'

export function updateBounsesAndResult(rData: RData, sCfgs: SCfgs, sData: SData) {
  function updateBounsesWhenWining(sCfg: SCfgs, sData: SData, rData: RData) {
    const amount = 2 * Math.pow(2, sData.game_idx) * basicAmount
    if (rData.status_c == 0) {
      const value =
        amount - (amount * (sCfg.r_rate_1.toNumber() + sCfg.r_rate_2.toNumber())) / 10000
      bonusesTheUserWined.value = value / 1000000000
    } else if (rData.status_c == 1) {
      const value =
        amount - (amount * (sCfg.r_rate_1.toNumber() + sCfg.r_rate_3.toNumber())) / 10000
      bonusesTheUserWined.value = value / 1000000000
    } else if (rData.status_c == 2) {
      const value = amount - (amount * sCfg.r_rate_1.toNumber()) / 10000
      bonusesTheUserWined.value = value / 1000000000
    }
  }
  function updateBounsesWhenLosing() {
    bonusesTheUserWined.value = 0
  }
  function updateBounsesWhenTimeout(sCfg: SCfgs, sData: SData, rData: RData) {
    const amount = Math.pow(2, sData.game_idx) * basicAmount
    if (rData.status_c == 0) {
      const value =
        amount - (amount * (sCfg.r_rate_1.toNumber() + sCfg.r_rate_2.toNumber())) / 10000
      bonusesTheUserWined.value = value / 1000000000
    } else if (rData.status_c == 1) {
      const value =
        amount - (amount * (sCfg.r_rate_1.toNumber() + sCfg.r_rate_3.toNumber())) / 10000
      bonusesTheUserWined.value = value / 1000000000
    } else if (rData.status_c == 2) {
      const value = amount - (amount * sCfg.r_rate_1.toNumber()) / 10000
      bonusesTheUserWined.value = value / 1000000000
    }
  }
  const msg_1 = 'You won.'
  const msg_2 = 'Your opponent timed out.'
  const msg_3 = 'Both players timed out.'
  const msg_4 = 'You timed out.'
  const msg_5 = 'You lost.'
  if (sData.g_status == 1) {
    displaiedGameResult.value = msg_3
    updateBounsesWhenTimeout(sCfgs, sData, rData)
  } else if (sData.g_status == 2) {
    if (sData.seat_idx == 1) {
      // Your opponent timed out
      displaiedGameResult.value = msg_2
      updateBounsesWhenWining(sCfgs, sData, rData)
    } else if (sData.seat_idx == 2) {
      // You timed out
      displaiedGameResult.value = msg_4
      updateBounsesWhenLosing()
    }
  } else if (sData.g_status == 3) {
    if (sData.seat_idx == 1) {
      // You timed out
      displaiedGameResult.value = msg_4
      updateBounsesWhenLosing()
    } else if (sData.seat_idx == 2) {
      // Your opponent timed out
      updateBounsesWhenWining(sCfgs, sData, rData)
      displaiedGameResult.value = msg_2
    }
  } else if (sData.seat_idx == 1) {
    if (sData.m_number % 2 == 0) {
      if (sData.o_number % 2 == 0) {
        // you won
        displaiedGameResult.value = msg_1
        updateBounsesWhenWining(sCfgs, sData, rData)
      } else {
        // you lost
        displaiedGameResult.value = msg_5
        updateBounsesWhenLosing()
      }
    } else {
      if (sData.o_number % 2 == 0) {
        // you lost
        displaiedGameResult.value = msg_5
        updateBounsesWhenLosing()
      } else {
        // you won
        displaiedGameResult.value = msg_1
        updateBounsesWhenWining(sCfgs, sData, rData)
      }
    }
  } else if (sData.seat_idx == 2) {
    if (sData.m_number % 2 == 0) {
      if (sData.o_number % 2 == 0) {
        // you lost
        displaiedGameResult.value = msg_5
        updateBounsesWhenLosing()
      } else {
        // you won
        displaiedGameResult.value = msg_1
        updateBounsesWhenWining(sCfgs, sData, rData)
      }
    } else {
      if (sData.o_number % 2 == 0) {
        // you won
        displaiedGameResult.value = msg_1
        updateBounsesWhenWining(sCfgs, sData, rData)
      } else {
        // you lost
        displaiedGameResult.value = msg_5
        updateBounsesWhenLosing()
      }
    }
  } else {
    return undefined
  }
}
