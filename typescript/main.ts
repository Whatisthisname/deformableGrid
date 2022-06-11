// disable scroll bar
document.body.style.overflow = "hidden"

var canvas = <HTMLCanvasElement>document.getElementById("canvas");
var ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

var slider = <HTMLInputElement>document.getElementById("points");

let fieldSize = new vec (10, 5)
let canvasSize : vec = new vec(canvas.width, canvas.height)

slider.oninput = (e) => {
    field = new FlowField(fieldSize.x, fieldSize.y)
    field.smooth(parseInt(slider.value))
    clearCanvas()
    drawField()
}

let field = new FlowField(fieldSize.x, fieldSize.y)

window.onresize = () => {
    shapeCanvasToWindow()
}

let mouse: vec = new vec(0, 0)

window.onmousemove = (e: MouseEvent) => {
    mouse.x = e.x
    mouse.y = e.y
}

let lastMouse: vec = new vec(0, 0)

let points: vec[] = []
let lastPoints: vec[] = []
let n_points = 400

let drawScale = 20

let frame : number = 0

function update(t: number) {
    // line(lastMouse, mouse)
    // mouse.copyTo(lastMouse)
    // console.log(field.sampleInterpolated(mouse.scale(1/30)))
    if (frame++ % 30 == 0) {
        resetPoints()
    }
    updatePoints()
    drawPoints(t)
    window.requestAnimationFrame(update)
}


function start() {
    ctx.lineWidth = 0.1
    shapeCanvasToWindow()
    drawField()
    resetPoints()
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function resetPoints() {
    for (let i = 0; i < n_points; i++) {
        points[i] = new vec(Math.random() * canvas.width, Math.random() * canvas.height)
        lastPoints[i] = new vec(0, 0)
        points[i].copyTo(lastPoints[i])
    }
}

function drawField() {
    ctx.strokeStyle = "#aa0000"
    for (let i = 0; i < field.width; i++) {
        for (let j = 0; j < field.height; j++) {
            let start = new vec((i+0.5)*canvas.width/field.width, (j+0.5)*canvas.height/field.height)
            line(start, start.add(vec.fromRadians(field.field[i][j]).scale(drawScale * 0.7)))
            circ(start, drawScale * 0.1)
            // circ(start, drawScale * field.field[i][j] * 0.1)
            // ctx.fillStyle = "#00ff00"//"#" + Math.round(field.field[i][j]).toString() + "f0000"
            // let scaleFactor = field.field[i][j] / (2*Math.PI)
            // ctx.fillRect(i * drawScale, j * drawScale, drawScale * scaleFactor, drawScale * scaleFactor)
        }
    }
}

function updatePoints() {
    for (let i = 0; i < n_points; i++) {
        points[i].copyTo(lastPoints[i])
        let point_to_field = new vec(points[i].x * field.width / canvas.width, points[i].y * field.height / canvas.height)
        let sample = field.sample(point_to_field.add(new vec(0.5, 0.5)))
        points[i]._add(vec.fromRadians(sample).scale(3))
    }
}

function drawPoints(t : number) {
    ctx.strokeStyle = rgb(t % 255, (t+ 201) % 255, (t+103) % 255)
    for (let i = 0; i < n_points; i++) {
        line(points[i], lastPoints[i])
    }
}

function rgb(r : number, g : number , b : number){
    return ["rgb(",r,",",g,",",b,")"].join("");
  }


start()
update(0)