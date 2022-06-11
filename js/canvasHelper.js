"use strict";
function shapeCanvasToWindow() {
    // reshape canvas to fit window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasSize = new vec(canvas.width, canvas.height);
}
function line(from, to) {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.closePath();
    ctx.stroke();
}
function circ(center, rad, start = 0, end = 2 * Math.PI) {
    ctx.beginPath();
    ctx.arc(center.x, center.y, rad, start, end);
    ctx.stroke();
}
