import { renderHook, fireEvent } from '@testing-library/react';
import { useClickAway } from '../..';

describe('useClickAway', () => {
  let dom1: HTMLDivElement;
  let dom2: HTMLDivElement;

  beforeEach(() => {
    dom1 = document.createElement('div');
    dom2 = document.createElement('div');
    document.body.appendChild(dom1);
    document.body.appendChild(dom2);
  });

  afterEach(() => {
    document.body.removeChild(dom1);
    document.body.removeChild(dom2);
  });

  // it('should be defined', () => {
  //   expect(useClickAway).toBeDefined();
  // });

  it('dom click', () => {
    let count = 0;
    const { rerender, unmount } = renderHook((dom: HTMLDivElement) => {
      return useClickAway(dom, () => {
        count++;
      });
    });

    rerender(dom1);
    fireEvent.click(dom1);
    expect(count).toBe(0);
    fireEvent.click(dom2);
    expect(count).toBe(1);
    fireEvent.click(document.body);
    expect(count).toBe(2);

    rerender(dom2);
    fireEvent.click(dom1);
    expect(count).toBe(3);
    fireEvent.click(dom2);
    expect(count).toBe(3);
    fireEvent.click(document.body);
    expect(count).toBe(4);

    unmount();
    fireEvent.click(document.body);
    expect(count).toBe(4);
  });

  it('multiple target', () => {
    let count = 0;
    const { rerender, unmount } = renderHook((dom: HTMLDivElement | HTMLDivElement[]) => {
      return useClickAway(dom, () => {
        count++;
      });
    });

    rerender([dom1, dom2]);
    fireEvent.click(dom1);
    expect(count).toBe(0);
    fireEvent.click(dom2);
    expect(count).toBe(0);
    fireEvent.click(document.body);
    expect(count).toBe(1);

    unmount();
    fireEvent.click(document.body);
    expect(count).toBe(1);
  });

  it('multiple event', () => {
    let count = 0;
    const { rerender, unmount } = renderHook((dom: HTMLDivElement | HTMLDivElement[]) => {
      return useClickAway(dom, () => {
        count++;
      }, ['contextmenu', 'click']);
    });

    rerender(dom1);
    fireEvent.contextMenu(dom1);
    expect(count).toBe(0);
    fireEvent.contextMenu(dom2);
    expect(count).toBe(1);
    fireEvent.contextMenu(document.body);
    expect(count).toBe(2);

    fireEvent.click(dom1);
    expect(count).toBe(2);
    fireEvent.click(dom2);
    expect(count).toBe(3);
    fireEvent.click(document.body);
    expect(count).toBe(4);

    unmount();
    fireEvent.contextMenu(document.body);
    expect(count).toBe(4);
    fireEvent.click(document.body);
    expect(count).toBe(4);
  });
});
