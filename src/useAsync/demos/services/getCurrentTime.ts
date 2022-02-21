import { waitTime } from 'util-helpers';

export default async function getCurrentTime() {
  await waitTime();
  return new Date().getTime();
}
