import { useCallback, useState } from 'react';
import useUpdateEffect from '../useUpdateEffect';

type Props = Record<string | number, any>;

type Options<T> = Partial<{
  defaultValue: T;
  defaultValuePropName: string;
  valuePropName: string;
  trigger: string;
}>;

function useControllableValue<T = any>(props: Props = {}, options: Options<T> = {}) {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange',
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
    (v: T, ...args: any[]) => {
      if (!(hasValueProp)) {
        setState(v);
      }
      if (props[trigger]) {
        props[trigger](v, ...args);
      }
    },
    [props, valuePropName, trigger],
  );

  return [hasValueProp ? value : state, handleSetState] as const;
}

export default useControllableValue;