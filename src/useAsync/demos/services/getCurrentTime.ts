import waitTime from '../../../utils/waitTime';

export default async function getCurrentTime() {
  await waitTime();
  return new Date().getTime();
}
