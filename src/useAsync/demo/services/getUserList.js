import Mock from 'mockjs';

const userList = ({ page: { pageNum, pageSize }, data = {} }) => (
  Mock.mock({
    [`data|${pageSize}`]: [{
      id: '@guid',
      name: '@cname',
      'gender|1': ['male', 'female'],
      email: '@email',
      disabled: false
    }],
    pageInfo: {
      total: 25
    },
    errCode: "00",
    errMsg: ""
  })
)

export default function getUserList(params) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(userList(params))
    }, 1000)
  });
}