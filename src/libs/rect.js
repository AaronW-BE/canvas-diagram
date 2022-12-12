import Point from "./point";

export default class Rect {
  #width;
  #height;
  #x;
  #y;
  #ctx;

  #listeners = [];

  constructor(ctx, x, y, width, height) {
    this.#ctx = ctx;
    this.#x = x;
    this.#y = y;
    this.#width = width;
    this.#height = height;

    // document.addEventListener('click', ev =>  {
    //   if (this.pointInArea(new Point(ev.x, ev.y))) {
    //     let availableListeners = this.#listeners.filter(item => item.event === 'click');
    //     availableListeners.forEach(item => {
    //       item.processor.call(this, ev);
    //     });
    //   }
    // });

    this.mouseDown = false;
    this.mouseDownPoint = null;
    document.addEventListener('mousedown', ev => {
      this.mouseDown = this.pointInArea(new Point(ev.x, ev.y));
      this.mouseDownPoint = new Point(ev.x, ev.y);
    });
    document.addEventListener('mouseup', ev => {
      console.info("mouse up")
      this.mouseDown = false
    });

    document.addEventListener('mousemove', ev => {
      if (this.pointInArea(new Point(ev.x, ev.y)) && this.mouseDown) {
        let availableListeners = this.#listeners.filter(item => item.event === 'drag');
        availableListeners.forEach(item => {
          item.processor.call(this, ev);
        });
      }
    });
  }

  pointInArea(point) {
    return point.x >= this.x && point.x <= this.x + this.width
      && point.y >= this.y && point.y <= this.y + this.height;
  }

  onClick(fn) {
    if (typeof fn !== "function") {
      throw new Error("onClick need a function type");
    }
    this.#listeners.push({
      event: 'click',
      processor: fn,
    });
  }

  onDrag(fn) {
    this.#listeners.push({
      event: 'drag',
      processor: fn,
    });
  }


  get ctx() {
    return this.#ctx;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }


  set x(value) {
    this.#x = value;
  }

  set y(value) {
    this.#y = value;
  }

  set width(value) {
    this.#width = value;
  }

  set height(value) {
    this.#height = value;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  isRight(dst) {
    return dst.#x > this.#x;
  }

  linkToRect(dst) {
    let startPoint = new Point(this.x, this.y + 10)
    let endPoint = new Point(dst.x, dst.y + 10);
    if (this.isRight(dst)) {
      startPoint.x = this.x + this.width;
    }
    const middleX = (startPoint.x + dst.x) / 2;
    const middleY = (this.y + dst.y) / 2;

    this.ctx.beginPath()
    // start
    this.ctx.moveTo(startPoint.x, startPoint.y);

    this.ctx.lineTo(middleX, startPoint.y);
    this.ctx.lineTo(middleX, endPoint.y);
    this.ctx.lineTo(endPoint.x, endPoint.y);
    this.ctx.stroke();
  }

  draw() {
    this.ctx.fillStyle = "#f00";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};