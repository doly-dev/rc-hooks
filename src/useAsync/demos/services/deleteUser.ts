import { waitTime } from 'util-helpers';

export default async function deleteUser(userId: string) {
  console.log(userId);
  await waitTime();
  return { success: true };
}
