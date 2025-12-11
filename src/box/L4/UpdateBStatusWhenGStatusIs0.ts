import { viewNames } from '@/state'
import { navigate } from '../L3/NavigatePage'

export async function updateBStatusWhenGStatusIs0() {
  navigate(viewNames[4], 2)
  return 1
}
