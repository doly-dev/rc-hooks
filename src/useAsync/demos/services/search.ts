import Mockjs from 'mockjs';

function waitTime(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export default async function search({
  keyword,
  order,
  pageNum,
  pageSize
}: {
  keyword: string;
  order: number;
  pageNum: number;
  pageSize: number;
}) {
  await waitTime();

  if (!keyword) {
    return {
      list: []
    };
  }

  return Mockjs.mock({
    [`list|${pageNum < 3 ? pageSize : pageSize - 1}`]: [
      {
        text: `${keyword} ${order} ${pageNum} @id`
      }
    ]
  });
}
