"use strict";
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
window.onresize = () => {
    shapeCanvasToWindow();
};
let mouse = new vec(0, 0);
window.onmousemove = (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
};
function update(t) {
    console.log(mouse);
    line(new vec(0, 0), mouse);
    window.requestAnimationFrame(update);
}
function start() {
    shapeCanvasToWindow();
}
start();
update(0);
