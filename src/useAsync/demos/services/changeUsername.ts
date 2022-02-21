import { waitTime } from 'util-helpers';

export default async function changeUsername(username: string) {
  console.log(username);
  await waitTime();
  return { success: true };
}
