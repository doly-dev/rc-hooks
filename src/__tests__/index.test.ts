import * as allHooks from '..';

describe('index', () => {
  it('should be defined', () => {
    Object.keys(allHooks).forEach(module => {
      expect(allHooks[module]).toBeDefined();
    });
  });
});