import waitTime from '../../../utils/waitTime';

export default async function deleteUser(userId: string) {
  console.log(userId);
  await waitTime();
  return { success: true };
}
