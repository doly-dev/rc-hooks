import Mock from 'mockjs';

export default function getEmail(search: string) {
  console.log(search);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Mock.mock({ 'data|5': ['@email'] }).data);
    }, 300);
  });
}