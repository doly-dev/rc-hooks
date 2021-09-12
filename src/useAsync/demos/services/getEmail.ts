import Mock from 'mockjs';

export default function getEmail(search: string) {
  console.log(search);
  return new Promise<{ data: string[] }>(resolve => {
    setTimeout(() => {
      resolve(Mock.mock({ 'data|5': ['@email'] }).data);
    }, 300);
  });
}