import type { BData } from '@/state'

export function getTheMostRecentBid(data: BData, tail: string) {
  let result = `${data.g_degree[0]} × `
  if (data.g_degree[1] == 0) {
    result += '2'
  } else if (data.g_degree[1] == 1) {
    result += '3'
  } else if (data.g_degree[1] == 2) {
    result += '4'
  } else if (data.g_degree[1] == 3) {
    result += '5'
  } else if (data.g_degree[1] == 4) {
    result += '6'
  } else if (data.g_degree[1] == 5) {
    result += '1'
  } else {
    return ''
  }
  return `${result} ${tail}`
}
