// https://github.com/gregberge/loadable-components
import ttLoadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { timeout } from "promise-timeout";
import { loadSpinner } from "./LoadSpinner";

/**
 * 组件导入函数,支持自定义加载动画
 * @param {Function} func 返回动态引入的函数, 如 ()=>import('./a/b/c')
 * @param {Object} options {
 *      spinner:spinner, // loading动画组件, 默认为loadSpinner,
 *      其他参数参考LoadSpinner组件
 * }
 * @returns {Component}
 */
export const loadable = (func: any, options = { spinner: loadSpinner } as any) => {
    const { spinner, ...restOptions } = options;

    return ttLoadable(func, {
        fallback: loadSpinner(spinner, restOptions),
        ...restOptions,
    });
};

/**
 * 组件导入函数,支持延时加载
 * @param {Promise} promise 动态引入的返回值, 如 import('./a/b/c')
 * @param {Object} options {
 *      spinner:spinner, // loading动画组件, 默认为loadSpinner,
 *      delay:200, // 延迟时间, 默认200ms,
 *      其他参数参考LoadSpinner组件
 * }
 * @returns {Component}
 */
export const loadableDelay = (promise: Promise<any>, options = { spinner: loadSpinner } as any) => {
    const { spinner, delay = 200, ...restOptions } = options;

    return ttLoadable(() => pMinDelay(promise, delay), {
        fallback: loadSpinner(spinner, restOptions),
        ...restOptions,
    });
};

/**
 * 组件导入函数,支持加载超时
 * @param {Promise} promise 动态引入的返回值, 如 import('./a/b/c')
 * @param {Object} options {
 *      spinner:spinner, // loading动画组件, 默认为loadSpinner,
 *      time:200, // 过期时间, 默认5000ms,
 *      其他参数参考LoadSpinner组件
 * }
 * @returns {Component}
 */
export const loadableTimeout = (promise: Promise<any>, options = { spinner: loadSpinner, time: 5000 } as any) => {
    const { spinner, time = 5000, ...restOptions } = options;

    return ttLoadable(() => timeout(promise, time), {
        fallback: loadSpinner(spinner, restOptions),
        ...restOptions,
    });
};

/**
 * lib动态导入函数
 * @param {Function} func 返回动态引入的函数, 如 ()=>import('abc')
 */
export const loadableLib = ttLoadable.lib;
