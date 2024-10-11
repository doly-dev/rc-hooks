import { isBrowser, isWindow } from 'ut2';

/**
 * 获取垂直滚动的像素数
 *
 * @param el 滚动容器，默认 window
 * @returns
 */
export const getScrollTop = (el: Window | HTMLElement = window) => {
  if (!isBrowser || !el) {
    return 0;
  }
  if (isWindow(el)) {
    return window.scrollY;
  }
  return el.scrollTop;
};

/**
 * 获取元素内容高度，包括由于溢出导致的视图中不可见内容
 *
 * @param el 滚动容器，默认 window
 * @returns
 */
export const getScrollHeight = (el: Window | HTMLElement = window) => {
  if (!isBrowser || !el) {
    return 0;
  }
  if (isWindow(el)) {
    return document.documentElement.scrollHeight;
  }
  return el.scrollHeight;
};

/**
 * 获取元素内部的高度，包含内边距，但不包括水平滚动条、边框和外边距
 *
 * @param el 滚动容器，默认 window
 * @returns
 */
export const getClientHeight = (el: Window | HTMLElement = window) => {
  if (!isBrowser || !el) {
    return 0;
  }
  if (isWindow(el)) {
    return document.documentElement.clientHeight;
  }
  return el.clientHeight;
};
