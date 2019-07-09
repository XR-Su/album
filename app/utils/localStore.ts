const ls = window.localStorage;
const str = (val: any = '') => JSON.stringify(val);
const json = (val: any) => {
  return val ? JSON.parse(val) : undefined;
};

/**
 * set item
 * @param key
 * @param val
 */
export const setItem = (key: string, val: any) => {
  ls.setItem(key, str(val));
};

export const clearItem = () => {};

export const getItem = (key: string) => json(ls.getItem(key) || '');

export const clearAll = () => ls.clear();
/**
 * append value in an item
 * @param key
 * @param val
 */
export const append = (key: string, val: any) => {
  const store = getItem(key);
  if (store) {
    if (val instanceof Array) {
      setItem(key, [...store, ...val]);
    } else if (val instanceof Object) {
      setItem(key, { ...store, ...val });
    } else {
      setItem(key, val);
    }
  } else {
    setItem(key, val);
  }
};

/**
 * remove value in an item
 * @param key
 * @param val
 */
export const remove = (key: string, item: any) => {
  const store = getItem(key);
  if (store) {
    if (store instanceof Array) {
      const index = store.indexOf(item);
      store.splice(index, 1);
      setItem(key, store);
    } else if (store instanceof Object) {
      delete store[item];
      setItem(key, store);
    } else {
      setItem(key, '');
    }
  } else {
    console.log('item not exist');
  }
};

export default {
  setItem,
  clearItem,
  getItem,
  clearAll,
  append,
  remove
};
