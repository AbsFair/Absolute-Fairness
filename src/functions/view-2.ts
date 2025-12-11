import { refreshForThe1stTime } from '@/box/L5/RefreshDAppStatusV1'
import { document_url } from '@/state'

export async function play(name: string) {
  refreshForThe1stTime(name)
}

export function tutorial(name: string) {
  switch (name) {
    case 'equal':
      window.open(document_url + '/docs/FairFate.html', '_blank')
      break
    case 'dices':
      window.open(document_url + "/docs/Liar'sDice.html", '_blank')
      break
    case 'refer':
      window.open(document_url + '/docs/ReferralSystem.html', '_blank')
      break
    default:
      break
  }
}
