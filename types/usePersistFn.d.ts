type Fn = (...args: any) => any;

declare const usePersisFn: <T extends Fn>(fn: T) => T;

export default usePersisFn;