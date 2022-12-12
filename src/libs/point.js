export default class Point {
  #x;
  #y;
  constructor(x, y) {
    this.#x = x;
    this.#y = y;
    this._x = x;
    this._y = y;
  }


  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
  }
}