/**
 * 创建一个异步的组件，后期可用于微前端
 */

import { AsyncComponentLoader, defineAsyncComponent } from 'vue';

interface Options {
  loading?: boolean;
  delay?: number;
  timeout?: number;
  /** 是否加载失败后处理 */
  retry?: boolean;
}
export function createAsyncComponent(loader: AsyncComponentLoader, options: Options = {}) {
  const { loading = false, delay = 100, timeout = 3000, retry = true } = options;
  return defineAsyncComponent({
    loader,
    // loading组件自己定义
    loadingComponent: loading ? <div>123</div> : undefined,
    // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
    delay,
    // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件
    // 默认值：Infinity（即永不超时，单位 ms）
    timeout,
    // 定义组件是否可挂起 | 默认值：true
    suspensible: true,
    /**
     * @param {*} error 错误信息对象
     * @param {*} retry 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试
     * @param {*} fail  一个函数，指示加载程序结束退出
     * @param {*} attempts 允许的最大重试次数
     */
    onError: !retry
      ? () => {}
      : (error, retry, fail, attempts) => {
          if (error.message.match(/fetch/) && attempts <= 3) {
            // 请求发生错误时重试，最多可尝试 3 次
            retry();
          } else {
            // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
            // 必须调用其中一个才能继续错误处理。
            fail();
          }
        },
  });
}
