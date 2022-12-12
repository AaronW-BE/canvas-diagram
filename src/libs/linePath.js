import Point from "./point";

export default class LinePath {
  constructor(ctx) {
    this.ctx = ctx;
    this.path = [];
  }

  add(x, y) {
    this.path.push(new Point(x, y));
  }

  draw() {
    this.ctx.beginPath();
    let _path = [...this.path];
    let beginPoint = _path.shift();
    this.ctx.moveTo(beginPoint.x, beginPoint.y);

    for (let i = 0; i < _path.length; i++) {
      this.ctx.lineTo(_path[i].x, _path[i].y);
    }
    this.ctx.stroke();
  }
};