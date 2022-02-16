var canvas = <HTMLCanvasElement>document.getElementById("canvas");
var ctx = <CanvasRenderingContext2D> canvas.getContext("2d");

window.onresize = () => {
    shapeCanvasToWindow()
}

let mouse: vec = new vec(0, 0)

window.onmousemove = (e: MouseEvent) => {
    mouse.x = e.x
    mouse.y = e.y
}


function update(t : number) {
    console.log(mouse)
    line(new vec(0,0), mouse)
    window.requestAnimationFrame(update)
}


function start() {
    shapeCanvasToWindow()
}


start()
update(0)