import type { BArea, BCfgs, BData, SArea, SCfgs, SData } from '@/state'

export function getIsRemoved(area: SArea | BArea, data: SData | BData) {
  return (
    (data.seat_idx == 1 && area.player_1[data.room_idx] != data.user_idx) ||
    (data.seat_idx == 2 && area.player_2[data.room_idx] != data.user_idx)
  )
}

export function getIsExpired(
  cfgs: SCfgs | BCfgs,
  area: SArea | BArea | undefined,
  data: SData | BData,
) {
  if (area == undefined) {
    return Date.now() / 1000 - data.update_t > cfgs.time_amt
  } else {
    return Date.now() / 1000 - area.update_t[data.room_idx] > cfgs.time_amt
  }
}
