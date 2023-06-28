import { sleep } from 'ut2';

export default async function changeUsername(username: string) {
  console.log(username);
  await sleep();
  return { success: true };
}
