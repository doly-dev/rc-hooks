import Mock from 'mockjs';
import { waitTime } from 'util-helpers';

export default async function getArticle() {
  // console.log('getArticle ', Date.now());
  await waitTime();
  return {
    data: Mock.mock('@paragraph') as string,
    time: new Date().getTime()
  };
}
