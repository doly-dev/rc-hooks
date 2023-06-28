import { sleep } from 'ut2';

export default async function getCurrentTime() {
  await sleep();
  return new Date().getTime();
}
