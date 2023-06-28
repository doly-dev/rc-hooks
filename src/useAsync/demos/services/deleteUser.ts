import { sleep } from 'ut2';

export default async function deleteUser(userId: string) {
  console.log(userId);
  await sleep();
  return { success: true };
}
