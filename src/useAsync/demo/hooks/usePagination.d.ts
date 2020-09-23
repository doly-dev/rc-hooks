import { AsyncParams, AsyncResult } from "rc-hooks/types/useAsync";

type showTotalFn = (num: number | string) => string;

interface Options extends AsyncParams {
  defaultPageNum?: number;
  defaultPageSize?: number;
  defaultTotal?: number;
  [key: string]: any;
}

interface PaginationParams {
  pageSize: number;
  current: number;
  [key: string]: any;
}

interface ReturnValues extends AsyncResult {
  changePagination: (page: PaginationParams) => void;
  pagination: {
    total: number;
    current: number;
    pageSize: number;
    showTotal: showTotalFn;
    showSizeChanger: true;
  }
}

declare function usePagination(asyncFn: () => Promise<any>, options?: Options): ReturnValues;

export default usePagination;