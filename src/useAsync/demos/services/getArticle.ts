import Mock from 'mockjs';
import waitTime from '../../../utils/waitTime';

export default async function getArticle() {
  await waitTime();
  return {
    data: Mock.mock('@paragraph') as string,
    time: new Date().getTime()
  };
}
