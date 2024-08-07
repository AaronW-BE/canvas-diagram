import Point from "./point";
import LinePath from "./linePath";

export default class Rect {
  #width;
  #height;
  #x;
  #y;
  #ctx;
  #canMove = true;

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
    this.mouseOffset = new Point(0, 0);
    document.addEventListener('mousedown', ev => {
      this.mouseDown = this.pointInArea(new Point(ev.x, ev.y));
      this.mouseDownPoint = new Point(ev.x, ev.y);
      this.mouseOffset.x = this.x - ev.x;
      this.mouseOffset.y = this.y - ev.y;

      if (this.mouseDown) {
        let availableListeners = this.#listeners.filter(item => item.event === 'click');
        availableListeners.forEach(item => {
          item.processor.call(this, ev);
        });
      }

    });
    document.addEventListener('mouseup', ev => {
      console.info("mouse up")
      this.mouseDown = false
      this.mouseOffset.x = this.mouseOffset.y = 0;
    });

    document.addEventListener('mousemove', ev => {
      if (this.pointInArea(new Point(ev.x, ev.y)) && this.mouseDown) {

        // move element
        if (this.#canMove) {
          // this.x += ev.offsetX - this.mouseDownPoint.x;
          // this.y += ev.offsetY - this.mouseDownPoint.y;
          // this.mouseDownPoint = new Point(ev.offsetX, ev.offsetY);
        }
        return


        // let availableListeners = this.#listeners.filter(item => item.event === 'drag');
        // availableListeners.forEach(item => {
        //   item.processor.call(this, ev);
        // });
      }
    });
  }

  /**
   * move to a new position
   * @param point
   */
  moveTo(point) {
    this.x = point.x
    this.y = point.y
  }

  pointInArea(point) {
    if (!point) {
      return false;
    }
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

  isLeft(dst) {
    return dst.x - this.x > 0;
  }

  isTop(dst) {
    return dst.y - this.y > 0;
  }

  isBottom(dst) {
    return dst.y - this.y < 0;
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
    let linePath = new LinePath(this.ctx);
    linePath.add(startPoint.x, startPoint.y);
    linePath.add(middleX, startPoint.y);
    linePath.add(middleX, endPoint.y);
    linePath.add(endPoint.x, endPoint.y)
    linePath.draw();
  }

  draw() {
    this.ctx.fillStyle = "#f00";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};