import Mock from 'mockjs';

const userList = ({ pageNum, pageSize, ...restParams }) => (
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

export default function getUserList({current, pageSize}) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(userList({
        pageNum: current,
        pageSize
      }))
    }, 1000)
  });
}