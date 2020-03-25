class Storage {
  constructor(key, storage) {
    this.key = key;
    this.storage = storage || window.localStorage || window.sessionStorage;
    this.dataType = "";
  }

  parse(data) {
    let ret;
    switch (this.dataType) {
      case "string":
      case "":
        ret = data;
        break;
      case "number":
        ret = Number(data);
        break;
      case "undefined":
        ret = undefined;
        break;
      case "null":
        ret = null;
        break;
      case "boolean":
        ret = data === 'false' ? false : true;
        break;
      default:
        ret = JSON.parse(data);
    }
    return ret;
  }

  stringify(data) {
    this.dataType = typeof data;
    return JSON.stringify(data);
  }

  set(data) {
    this.storage.setItem(this.key, this.stringify(data));
  }

  get() {
    return this.parse(this.storage.getItem(this.key));
  }

  remove() {
    this.storage.removeItem(this.key);
  }
}

export default Storage;
