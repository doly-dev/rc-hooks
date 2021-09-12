import Mock from "mockjs";

export default function getArticle() {
  return new Promise<{ data: string; time: number; }>((resolve) => {
    setTimeout(() => {
      resolve({
        data: Mock.mock("@paragraph"),
        time: new Date().getTime(),
      });
    }, 1000);
  });
}
