import Mock from 'mockjs';
import { waitTime } from 'util-helpers';

export default async function getUsername() {
  await waitTime();
  return Mock.mock('@name') as string;
}
