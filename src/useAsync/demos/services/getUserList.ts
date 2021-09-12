import Mock from 'mockjs';

const userList = ({ pageSize }: {
  pageSize: number;
  [x: string]: any;
}) => (
  Mock.mock({
    [`data|${pageSize}`]: [{
      id: '@guid',
      name: '@cname',
      'gender|1': ['male', 'female'],
      email: '@email',
      disabled: false
    }],
    total: 25,
    errCode: "00",
    errMsg: ""
  })
)

type Result = {
  data: {
    id: string;
    name: string;
    gender: 'male' | 'female';
    email: string;
    disabled: boolean;
  }[],
  total: number;
  errCode: string;
  errMsg: string;
}

export default function getUserList({ current, pageSize }: {
  current: number;
  pageSize: number;
  [x: string]: any;
}) {
  return new Promise<Result>(resolve => {
    setTimeout(() => {
      resolve(userList({
        pageNum: current,
        pageSize
      }))
    }, 1000)
  });
}