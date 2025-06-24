import * as allHooks from 'rc-hooks';

describe('index', () => {
  it('should be defined', () => {
    Object.keys(allHooks).forEach((module) => {
      expect(allHooks[module as keyof typeof allHooks]).toBeDefined();
    });
  });
});
