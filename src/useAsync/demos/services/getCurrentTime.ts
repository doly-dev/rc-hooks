export default function getCurrentTime() {
  return new Promise<number>(resolve => {
    setTimeout(() => {
      resolve(new Date().getTime())
    }, 100)
  })
}