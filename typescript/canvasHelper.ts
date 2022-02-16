function shapeCanvasToWindow() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

function line(from: vec, to: vec) {
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.closePath()
    ctx.strokeStyle = "#ff0000"
    ctx.stroke()
}




