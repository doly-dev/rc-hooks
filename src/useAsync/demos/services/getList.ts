import { sleep } from "ut2";

const getList = async ({ pageSize = 10, current = 1 }) => {
  await sleep();
  const total = 15;
  const data: {
    id: string,
    text: string
  }[] = [];

  if (pageSize * current > total + pageSize || current < 1) {
    return {
      data,
      total
    }
  }

  for (let i = pageSize * (current - 1); i < Math.min(pageSize * current, total); i++) {
    data.push({
      id: i + '',
      text: i + ' ' + Math.random()
    });
  }

  return {
    data,
    total
  }
}

export default getList;