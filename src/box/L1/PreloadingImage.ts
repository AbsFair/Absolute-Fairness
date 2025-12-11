export function preloadingImage(urls: string[]) {
  const promises: Promise<void>[] = []
  urls.forEach((element) => {
    promises.push(loader(element))
  })
  return Promise.allSettled(promises)
}

function loader(url: string) {
  return new Promise<void>((resolve, reject) => {
    const image = new Image()
    image.src = url
    image.onload = () => {
      resolve()
    }
    image.onerror = () => {
      reject()
    }
  })
}
