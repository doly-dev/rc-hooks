import waitTime from '../../../utils/waitTime';

export default async function changeUsername(username: string) {
  console.log(username);
  await waitTime();
  return { success: true };
}
