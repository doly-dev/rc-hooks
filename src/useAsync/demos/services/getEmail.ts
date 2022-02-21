import Mock from 'mockjs';
import { waitTime } from 'util-helpers';

export default async function getEmail(search: string) {
  console.log(search);
  await waitTime();
  return Mock.mock({ 'data|5': ['@email'] }).data as string[];
}
