 class Category {
  constructor(id, name, nicename) {
    this._id = id;
    this._name = name;
    this._nicename = nicename;
  }

  get id() {
    return this._id;
  }
  set id(id) {
    this._id = id;
  }

  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }

  get nicename() {
    return this._nicename;
  }
  set nicename(nicename) {
    this._nicename = nicename;
  }
}

export default Category;