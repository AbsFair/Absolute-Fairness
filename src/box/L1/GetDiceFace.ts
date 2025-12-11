export function getDiceFace(index: number) {
  if (index == 0) {
    return 2
  } else if (index == 1) {
    return 3
  } else if (index == 2) {
    return 4
  } else if (index == 3) {
    return 5
  } else if (index == 4) {
    return 6
  } else if (index == 5) {
    return 1
  } else {
    return 0
  }
}
