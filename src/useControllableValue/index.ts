import { SetStateAction, useCallback, useState } from 'react';
import useUpdateEffect from '../useUpdateEffect';

type Props<T> = {
  value?: T;
  defaultValue?: T;
  [key: string]: any;
};

type Options<T> = Partial<{
  defaultValue: T;
  defaultValuePropName: string;
  valuePropName: string;
  trigger: string;
}>;

/**
 * 组件状态即可以自己内部管理，也可以由外部控制。
 *
 * @param {Object} props 组件的 `props`。
 * @param {Object} [options] 配置项。
 * @param {*} [options.defaultValue] 默认值，会被 `props.defaultValue` 和 `props.value` 覆盖。
 * @param {string} [options.defaultValuePropName='defaultValue'] 默认值的属性名。默认 `defaultValue`。
 * @param {string} [options.valuePropName='value'] 值的属性名。默认 `value`。
 * @param {string} [options.trigger='onChange'] 修改值时，触发的函数名。默认 `onChange`。
 * @returns {Array}
 * @example
 * const [state, setState] = useControllableValue(props, {
 *   defaultValue: ''
 * });
 */
function useControllableValue<T = any>(props: Props<T> = {}, options: Options<T> = {}) {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange'
  } = options;

  const hasValueProp = valuePropName in props;
  const value = props[valuePropName] as T;
  const [state, setState] = useState<T>(() => {
    if (hasValueProp) {
      return value;
    }
    if (defaultValuePropName in props) {
      return props[defaultValuePropName];
    }
    return defaultValue;
  });

  useUpdateEffect(() => {
    if (hasValueProp) {
      setState(value);
    }
  }, [value, hasValueProp]);

  const handleSetState = useCallback(
    (v: SetStateAction<T>, ...args: any[]): any => {
      if (!hasValueProp) {
        setState(v);
      }
      if (props[trigger]) {
        props[trigger].apply(props, [v].concat(args));
      }
    },
    [hasValueProp, props, trigger]
  );

  return [hasValueProp ? value : state, handleSetState] as const;
}

export default useControllableValue;
