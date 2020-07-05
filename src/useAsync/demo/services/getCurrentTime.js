export default function getCurrentTime() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(new Date().getTime())
    }, 100)
  })
}