import React, { lazy as reactLazy, Suspense } from "react";
import { lazy as loadableLazy } from "@loadable/component";
import { loadSpinner } from "./LoadSpinner";

/**
 * 组件导入函数,支持自定义加载动画
 * Create a loadable component "Suspense" ready.
 * @param {Function} func 返回动态引入的函数, 如 ()=>import('./a/b/c')
 * @param {Object} options {spinner:spinner, // loading动画组件, 默认为loadSpinner, 其他参数参考LoadSpinner组件}
 * @returns {Component}
 */
export const lazy = (func: any, options = { spinner: loadSpinner } as any) => {
  const { spinner, ...restOptions } = options;
  const LazyComponent = reactLazy(func);

  return function LazyComponentFunc(props: any) {
    return (
      <Suspense fallback={loadSpinner(spinner, restOptions)}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

/**
 * 组件导入函数,支持自定义加载动画
 * @param {Function} func 返回动态引入的函数, 如 ()=>import('./a/b/c')
 * @param {Object} options {spinner:spinner, // loading动画组件, 默认为loadSpinner, 其他参数参考LoadSpinner组件}
 * @returns {Component}
 */
export const lazyX = (func: any, options = { spinner: loadSpinner } as any) => {
  const { spinner, ...restOptions } = options;
  const LazyXComponent = loadableLazy(func);

  return function LazyXComponentFunc(props: any) {
    return (
      <Suspense fallback={loadSpinner(spinner, restOptions)}>
        <LazyXComponent {...props} />
      </Suspense>
    );
  };
};

/**
 * lib动态导入函数
 * @param {Function} func 返回动态引入的函数, 如 ()=>import('abc')
 */
export const lazyLib = loadableLazy.lib;
