import Mock from 'mockjs';
import { sleep } from 'ut2';

export default async function getUsername() {
  await sleep();
  return Mock.mock('@name') as string;
}
