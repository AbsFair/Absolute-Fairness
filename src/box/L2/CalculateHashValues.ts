import { showWarningDialog } from '../L1/ShowWarningDialog'

export async function getHashOfStringWithSalt(words: string, salts: number) {
  try {
    let hash_value_0 = await crypto.subtle.digest('SHA-256', Buffer.from(words + String(salts)))
    for (let i = 1; i <= 1000; i++) {
      hash_value_0 = await crypto.subtle.digest('SHA-256', hash_value_0)
    }
    const hash_value_1 = await crypto.subtle.digest('SHA-256', hash_value_0)
    const hash_value_2 = await crypto.subtle.digest('SHA-256', hash_value_1)
    const hash_value_3 = await crypto.subtle.digest('SHA-256', hash_value_2)
    return [
      Array.from(new Uint8Array(hash_value_1)),
      Array.from(new Uint8Array(hash_value_2)),
      Array.from(new Uint8Array(hash_value_3)),
    ]
  } catch {
    showWarningDialog(false, 'An unexpected error occurred while calculating the hash.')
    return undefined
  }
}
