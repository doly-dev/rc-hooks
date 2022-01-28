import Mock from 'mockjs';
import waitTime from '../../../utils/waitTime';

export default async function getUsername() {
  await waitTime();
  return Mock.mock('@name') as string;
}
