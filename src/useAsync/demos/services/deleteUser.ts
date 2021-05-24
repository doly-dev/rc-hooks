export default function deleteUser(userId: string) {
  console.log(userId);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}