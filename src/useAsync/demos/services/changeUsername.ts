export default function changeUsername(username: string) {
  console.log(username);
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}
