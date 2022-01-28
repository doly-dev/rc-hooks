export default function waitTime(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
