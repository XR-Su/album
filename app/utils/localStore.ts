const ls = window.localStorage;
const str = (val: any) => JSON.stringify(val);
const json = (val: any) => JSON.parse(val);

/**
 * set item
 * @param key
 * @param val
 */
export const setItem = (key: string, val: any) => {
  ls.setItem(key, val);
};

/**
 * append value in an item
 * @param key
 * @param val
 */
export const append = (key: string, val: any) => {
  const store = json(ls.getItem(key) || '');
  if (store) {
    if (val instanceof Object) {
      setItem(key, str({ ...store, ...val }));
    } else if (val instanceof Array) {
      setItem(key, str([...store, ...val]));
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
  const store = json(ls.getItem(key) || '');
  if (store) {
    if (store instanceof Object) {
      delete store[item];
      setItem(key, str(store));
    } else if (store instanceof Array) {
      const index = store.indexOf(item);
      store.splice(index, 1);
      setItem(key, str(store));
    } else {
      setItem(key, '');
    }
  } else {
    console.log('item not exist');
  }
};

export const clearItem = () => {};
