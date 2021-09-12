import Mock from 'mockjs';

export default function getUsername() {
  return new Promise<string>(resolve => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}