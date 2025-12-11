export function timestampToFormattedUTC(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  const year = date.getUTCFullYear().toString().slice(-2)
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

export function timestampToFormattedHMS(timestamp: number): string {
  const minutes = Math.floor(timestamp / 60)
  const seconds = Math.floor(timestamp % 60)
  const parts = []
  parts.push(`${minutes} min`)
  parts.push(`${seconds} sec`)
  return parts.join(' ')
}
