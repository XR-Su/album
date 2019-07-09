import * as localStore from '../localStore';

describe('localStore test', () => {
  it('append object', () => {
    localStore.append('fruit', { apple: { count: 12 } });
    localStore.append('fruit', { banana: { count: 32 } });
    expect(localStore.getItem('fruit')).toMatchObject({
      apple: { count: 12 },
      banana: { count: 32 }
    });
  });

  it('remove object', () => {
    localStore.remove('fruit', 'apple');
    expect(localStore.getItem('fruit')).toMatchObject({
      banana: { count: 32 }
    });
  });

  it('append array', () => {
    localStore.clearAll();
    localStore.append('fruit', ['banana']);
    localStore.append('fruit', ['apple']);
    expect(localStore.getItem('fruit')).toMatchObject(['banana', 'apple']);
    localStore.remove('fruit', 'apple');
    expect(localStore.getItem('fruit')).toMatchObject(['banana']);
  });
});
