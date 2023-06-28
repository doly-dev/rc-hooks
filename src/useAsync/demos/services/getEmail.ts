import Mock from 'mockjs';
import { sleep } from 'ut2';

export default async function getEmail(search: string) {
  console.log(search);
  await sleep();
  return Mock.mock({ 'data|5': ['@email'] }).data as string[];
}
