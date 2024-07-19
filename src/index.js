import Point from "./libs/point";
import Rect from "./libs/rect";
import {PaintContext} from "./libs/core";

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

/**
 * control how elements movement
 */
class MovementManager extends PaintContext {
  // targets now moving
  #targets = new Set;

  // all can move element need control
  #elements = new Set;

  #moveStartPoint = new Point(0, 0);

  constructor(ctx) {
    super(ctx);
  }

  addTarget(target) {
    this.#targets.add(target);
  }

  removeTarget(target) {
    this.#targets.delete(target);
  }

  clearTargets() {
    this.#targets.clear();
    console.log(this.#targets.size)
  }

  move(point) {
    let offX = point.x - this.#moveStartPoint.x;
    let offY = point.y - this.#moveStartPoint.y;

    for (let element of this.#targets) {
      element.moveTo(new Point( element.x + offX, element.y + offY));
    }
  }


  set moveStartPoint(value) {
    this.#moveStartPoint = value;
  }
}



class DrawPanel {
  #canvas = null;
  #ctx = null;

  constructor(el) {
    this.#canvas = document.querySelector('#canvas');
    this.#ctx = canvas.getContext('2d');
  }
}

let mm = new MovementManager();

let reactA = new Rect(ctx, 50, 50, 200, 140);
let reactB = new Rect(ctx, 550, 350, 200, 140);


let mouseDown = false
let mouseMove = false
canvas.addEventListener("mousedown", (e) => {
  mouseDown = true;
  mm.moveStartPoint = new Point(e.x, e.y);
})

canvas.addEventListener("mousemove", (e) => {
  mouseMove = true;

  if (mouseDown) {
    mm.move(new Point(e.x, e.y));
  }

  mm.moveStartPoint = new Point(e.x, e.y);
})

canvas.addEventListener("mouseup", (e) => {
  mouseDown = false;

  mm.clearTargets();
})

reactA.onClick(function () {
  mm.addTarget(reactA);
});

reactB.onClick(function () {
  mm.addTarget(reactB);
})

reactA.onDrag(function (ev) {
});


reactB.onDrag(function (ev) {

});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  reactA.draw();
  reactA.linkToRect(reactB);
  reactB.draw();
  requestAnimationFrame(animate);
}

animate();