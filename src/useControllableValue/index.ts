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
