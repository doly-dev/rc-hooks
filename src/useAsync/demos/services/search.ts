import Mockjs from 'mockjs';
import waitTime from '../../../utils/waitTime';

type DataItem = {
  text: string;
};

type Result = {
  list: DataItem[];
};

export default async function search(params: {
  keyword: string;
  order: number;
  pageNum: number;
  pageSize: number;
}) {
  const { keyword, order, pageNum, pageSize } = params;
  console.log(params);

  await waitTime();

  return Mockjs.mock({
    [`list|${pageNum < 3 ? pageSize : pageSize - 1}`]: [
      {
        text: `keyword=${keyword} order=${order} pageNum=${pageNum} id=@id`
      }
    ]
  }) as Result;
}
