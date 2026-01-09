import { debounce, throttle, limit } from 'ut2';
import { AsyncMemo } from 'util-helpers';
import { isDocumentVisible } from '../utils/dom';
import subscribeVisible from '../utils/windowVisible';
import subscribeFocus from '../utils/windowFocus';
import { pkgName } from '../utils/config';

const asyncMemo = new AsyncMemo({ prefix: pkgName, stdTTL: 5 * 60 * 1000 });

/**
 * 获取缓存键值。
 *
 * @param key 键名称。
 * @returns 如果找到缓存键值，返回该键值，否则返回 `undefined`。
 */
export function getCache<T = any>(key: string) {
  return asyncMemo.cache.get(key) as T;
}

/**
 * 清理 `useAsync` 缓存。如果不传参数，表示清理全部。
 *
 * @param key 键名称。
 */
export function clearCache(key?: string | string[]) {
  if (key) {
    asyncMemo.cache.del(key);
  } else {
    asyncMemo.cache.clear();
  }
}

type InternalOptions<R = any, P extends any[] = any[]> = {
  /**
   * @description 缓存的键值。启用缓存机制，异步成功结果将被缓存。如果多个相同 cacheKey 的异步同时触发中，将共享第一个异步结果。
   */
  cacheKey?: string;

  /**
   * @description 缓存时间。单位毫秒。
   * @default 5*60*1000
   */
  cacheTime: number;

  /**
   * @description 持久化数据。开启后，在触发异步时如果有缓存数据，不再执行异步函数。需要配合 `cacheKey` `cacheTime` 使用。
   * @default false
   */
  persisted: boolean;

  /**
   * @description 格式化异步返回结果。
   * @param res 异步返回的数据。
   * @param params 触发异步函数的参数。
   * @returns 格式化后的数据。
   */
  formatResult?: (res: any, params: P) => R;

  /**
   * @description 异步函数 `resolve` 时触发，参数为 `data` 和 `params`。
   * @param data 异步返回的数据。
   * @param params 触发异步函数的参数。
   * @returns
   */
  onSuccess?: (data: R, params: P) => void;

  /**
   * @description 异步函数异常错误时触发，参数为 `error` 和 `params`。
   * @param err 错误信息。
   * @param params 触发异步函数的参数。
   * @returns
   */
  onError?: (err: Error, params: P) => void;

  /**
   * @description 异步函数执行完成后触发。
   * @returns
   */
  onFinally?: () => void;

  /**
   * @description 异步函数执行前触发，参数为 `params`。
   * @param params 触发异步函数的参数。
   * @returns
   */
  onBefore?: (params: P) => void;

  /**
   * @description 防抖间隔，单位为毫秒。设置后，请求进入防抖模式。
   */
  debounceInterval?: number;

  /**
   * @description 节流间隔，单位为毫秒。设置后，请求进入节流模式。
   */
  throttleInterval?: number;

  /**
   * @description 轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 `run`。
   */
  pollingInterval?: number;

  /**
   * @description 在页面隐藏时，是否继续轮询。如果为 `true`，不会停止轮询。如果为 `false`，在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询。
   * @default true
   */
  pollingWhenHidden: boolean;

  /**
   * @description 在屏幕重新获取焦点或重新显示时，是否重新发起请求。如果为 `false`，不会重新发起请求。如果为 `true`，在屏幕重新聚焦或重新显示时，会重新发起请求。
   * @default false
   */
  refreshOnWindowFocus: boolean;

  /**
   * @description 屏幕重新聚焦，重新发起请求时间间隔。需要配置 `refreshOnWindowFocus` 使用。
   * @default 5000
   */
  focusTimespan: number;
};

export type Options<R = any, P extends any[] = any[]> = Partial<InternalOptions<R, P>>;

export type AsyncFunction<R = any, P extends any[] = any[]> = (...args: P) => Promise<R>;

class Async<R = any, P extends any[] = any[]> {
  private async: AsyncFunction<R, P>;
  private debounce: ReturnType<typeof debounce<AsyncFunction<R, P>>> | undefined;
  private throttle: ReturnType<typeof throttle<AsyncFunction<R, P>>> | undefined;
  private unsubscribes: (() => void)[];
  private options: InternalOptions<R, P>;

  constructor(async: AsyncFunction<R, P>, options: Options<R, P>) {
    this.async = async;
    this.options = {
      cacheTime: 5 * 60 * 1000,
      persisted: false,
      pollingWhenHidden: true,
      refreshOnWindowFocus: false,
      focusTimespan: 5000,
      ...options
    };

    // 取消订阅列表
    this.unsubscribes = [];

    this.init();
  }

  // 初始化
  private init() {
    const { pollingInterval, refreshOnWindowFocus, focusTimespan } = this.options;

    // 延迟执行
    this.updateDebounce();

    // 订阅页面显示时触发轮询
    if (pollingInterval) {
      this.unsubscribes.push(subscribeVisible(this.rePolling.bind(this)));
    }

    // 订阅屏幕聚焦时请求
    if (refreshOnWindowFocus) {
      const limitRefresh = limit(this.refresh.bind(this), focusTimespan);
      this.unsubscribes.push(subscribeFocus(limitRefresh));
    }
  }

  // 内部缓存参数
  private params: any = [];

  // 更新延迟执行
  private updateDebounce() {
    const { debounceInterval, throttleInterval } = this.options;
    this.debounce =
      typeof debounceInterval === 'number' && debounceInterval > 0
        ? debounce(this._wraprun, debounceInterval)
        : undefined;
    this.throttle =
      typeof throttleInterval === 'number' && throttleInterval > 0
        ? throttle(this._wraprun, throttleInterval)
        : undefined;
  }

  // 标识页面获取焦点时是否触发轮询
  private pollingWhenVisibleFlag = false;

  // 轮询定时器
  private pollingTimer: any = null;

  // 轮询
  private rePolling() {
    if (this.pollingWhenVisibleFlag) {
      this.pollingWhenVisibleFlag = false;
      this.refresh();
    }
  }

  // 内部标记当前执行计数，防止同一个实例执行多次run 或 不执行取消后的run
  private counter = 1;

  private afterUpdateOptions(prevOptions: Options<R, P>, nextOptions: Partial<Options<R, P>> = {}) {
    // 可能取消延迟
    if (
      ('debounceInterval' in nextOptions &&
        nextOptions.debounceInterval !== prevOptions.debounceInterval) ||
      ('throttleInterval' in nextOptions &&
        nextOptions.throttleInterval !== prevOptions.throttleInterval)
    ) {
      this.updateDebounce();
    }
  }

  // 更新配置
  updateOptions(options: Partial<Options<R, P>>) {
    const prevOptions = this.options;
    const nextOptions = {
      ...this.options,
      ...options
    };
    this.options = nextOptions;
    this.afterUpdateOptions(prevOptions, nextOptions);
  }

  // 发起请求
  // 不返回Promise，只支持 onSuccess 或 onError 回调处理，避免多个实例同时调用 run 导致部分 Promise 没有触发问题
  private _run(...args: P) {
    if (this.pollingTimer) {
      clearTimeout(this.pollingTimer);
    }

    // 防止执行取消的异步结果
    // 触发多次run，只有执行最后一次异步结果
    const count = this.counter;
    this.params = args;
    const {
      cacheKey,
      cacheTime,
      persisted,
      formatResult,
      onSuccess,
      onError,
      onFinally,
      onBefore,
      pollingWhenHidden,
      pollingInterval
    } = this.options;

    onBefore?.(args);

    return new Promise<R>((resolve, reject) => {
      asyncMemo
        .run(
          () =>
            this.async.apply(this, args).then((res) => {
              return typeof formatResult === 'function' ? formatResult(res, args) : res;
            }),
          cacheKey,
          { persisted, ttl: cacheTime }
        )
        .then((fmtRes) => {
          if (count === this.counter) {
            onSuccess?.(fmtRes, args);
            resolve(fmtRes);
          }
        })
        .catch((err) => {
          if (count === this.counter) {
            onError?.(err, args);
            reject(err);
          }
        })
        .finally(() => {
          if (count === this.counter) {
            onFinally?.();

            if (pollingInterval) {
              if (!isDocumentVisible() && !pollingWhenHidden) {
                this.pollingWhenVisibleFlag = true;
                return;
              }
              this.pollingTimer = setTimeout(() => {
                this.run.apply(this, args);
              }, pollingInterval);
            }
          }
        });
    });
  }

  private _wraprun(...args: P) {
    this.counter += 1;
    return this._run.apply(this, args);
  }

  // 执行异步
  run(...args: P) {
    if (this.debounce) {
      this.debounce.apply(this, args);
      return Promise.resolve(null);
    }
    if (this.throttle) {
      this.throttle.apply(this, args);
      return Promise.resolve(null);
    }
    return this._wraprun.apply(this, args);
  }

  // 使用之前参数，重新执行异步
  refresh() {
    return this.run.apply(this, this.params);
  }

  // 取消请求
  cancel() {
    if (this.debounce) {
      this.debounce.cancel();
    }

    if (this.throttle) {
      this.throttle.cancel();
    }

    // 取消轮询定时器
    if (this.pollingTimer) {
      clearTimeout(this.pollingTimer);
      this.pollingTimer = null;
    }

    this.counter += 1;
  }

  // 标识是否销毁
  private destroyed = false;

  // 销毁
  destroy(needCancel = true) {
    if (needCancel) {
      this.cancel();
    }

    if (!this.destroyed) {
      this.destroyed = true;
      this.unsubscribes.forEach((s) => s());
      this.unsubscribes = [];
    }
  }

  // 恢复
  resume() {
    if (this.destroyed) {
      this.destroyed = false;
      this.init();
    }
  }
}

export default Async;
