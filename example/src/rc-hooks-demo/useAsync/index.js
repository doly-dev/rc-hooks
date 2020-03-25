import React from "react";

import Default from "./Default";
import AutoRun from "./AutoRun";
import PollingInterval from "./PollingInterval";
import Mutate from "./Mutate";
import LoadingDelay from "./LoadingDelay";
import RefreshOnWindowFocus from "./RefreshOnWindowFocus";
import Preload from "./Preload";
import DebounceInterval from "./DebounceInterval";
import ThrottleInterval from "./ThrottleInterval";

export default () => {
  return (
    <>
      <h3>默认请求</h3>
      <Default />
      <hr />
      <h3>手动触发请求</h3>
      <p>手动调用 run 时才会触发执行异步函数。</p>
      <AutoRun />
      <hr />
      <h3>轮询</h3>
      <p>定时触发函数执行</p>
      <PollingInterval />
      <hr />
      <h3>防抖</h3>
      <p>频繁触发 run ，则会以防抖策略进行请求。</p>
      <DebounceInterval />
      <hr />
      <h3>节流</h3>
      <p>频繁触发 run ，则会以节流策略进行请求。</p>
      <ThrottleInterval />
      <hr />
      <h3>缓存 & 预加载</h3>
      <p>同一个 cacheKey 的请求，是全局共享的，也就是你可以提前加载数据。利用该特性，可以很方便的实现预加载。</p>
      <Preload />
      <hr />
      <h3>屏幕聚焦重新请求</h3>
      <p>在浏览器窗口 refocus 和 revisible 时，会重新发起请求。</p>
      <RefreshOnWindowFocus />
      <hr />
      <h3>突变</h3>
      <p>直接修改 data，mutate 函数参数可以为 newData 或 (oldData)=> newData。</p>
      <Mutate />
      <hr />
      <h3>延迟loading</h3>
      <p>有效防止闪烁</p>
      <LoadingDelay />
      <hr />
    </>
  )
}