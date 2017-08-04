/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-11-09
 * @author Li <li@maichong.it>
 */

let _store;

function setStore(store) {
  _store = store;
}

function getStore() {
  return _store;
}

export { getStore, setStore };
