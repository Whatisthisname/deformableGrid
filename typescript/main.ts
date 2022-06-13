// disable scroll bar
document.body.style.overflow = "hidden"

var canvas = <HTMLCanvasElement>document.getElementById("canvas");
var ctx = <CanvasRenderingContext2D>canvas.getContext("2d");


let fieldSize = new vec (200, 100)
let canvasSize : vec = new vec(canvas.width, canvas.height)

assignInputs()


let n_points = parseInt(pointAmountSlider.value)
let lifetime = Math.round(Math.sqrt(parseInt(lifeTimeSlider.value)))
let stepsize = Math.sqrt(parseFloat(stepsizeSlider.value))
let smoothing = parseFloat(smoothingSlider.value) * Math.min(fieldSize.x, 10)
let field = new FlowField(fieldSize.x, fieldSize.y)
let noisePower = 0.1
let paused = false

field.smooth(smoothing)
field.smooth(smoothing)

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


let drawScale = 20

let frame : number = 0


function update(t: number) {
    if (!paused) {
        if (frame++ % lifetime == 0) {
            resetPoints()
        }
        updatePoints()
        drawPoints(t)
    }
    window.requestAnimationFrame(update)
}


function start() {
    ctx.lineWidth = 0.1
    shapeCanvasToWindow()
    // drawField()
    resetPoints()
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function resetPoints() {
    frame = 1
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
            line(start, start.add(vec.fromRadians(field.field[i][j]).scale(drawScale * 2)))
            circ(start, drawScale * 0.5)
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
        let sample = field.sampleInterpolated(point_to_field.sub(new vec(0.5, 0.5)))
        points[i]._add(vec.fromRadians(sample).scale(stepsize).add(vec.fromRadians(Math.random() * 2 * Math.PI).scale(gaussianRand()*noisePower)))
    }
}

function drawPoints(t : number) {
    ctx.strokeStyle = rgba(t % 255, (t) % 255, (t) % 255, (frame/lifetime) * (1-frame/lifetime)* 4)
    for (let i = 0; i < n_points; i++) {
        line(points[i], lastPoints[i])
    }
}

function rgba(r : number, g : number , b : number, a : number = 1) {
    return ["rgba(",r,",",g,",",b,",",a,")"].join("");
  }


handleInputs()

start()
update(0)