import Point from "./libs/point";
import Rect from "./libs/rect";

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');


let reactA = new Rect(ctx, 50, 50, 200, 140);
reactA.onClick(function () {
  this.ctx.fillStyle = '#7fcaff'
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
});

reactA.onDrag(function (ev) {

  this.x += ev.offsetX - this.mouseDownPoint.x;
  this.y += ev.offsetY - this.mouseDownPoint.y;

  this.mouseDownPoint = new Point(ev.offsetX, ev.offsetY);
});
let reactB = new Rect(ctx, 550, 350, 200, 140);
reactB.onDrag(function (ev) {

  this.x += ev.offsetX - this.mouseDownPoint.x;
  this.y += ev.offsetY - this.mouseDownPoint.y;

  this.mouseDownPoint = new Point(ev.offsetX, ev.offsetY);
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