import Mock from 'mockjs';

export default function getArticle(type?: any) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: Mock.mock('@paragraph'),
        time: new Date().getTime()
      })
    }, 1000)
  });
}