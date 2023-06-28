import Mock from 'mockjs';
import { sleep } from 'ut2';

export default async function getArticle() {
  // console.log('getArticle ', Date.now());
  await sleep();
  return {
    data: Mock.mock('@paragraph') as string,
    time: new Date().getTime()
  };
}
