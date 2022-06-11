let smoothingSlider : HTMLInputElement
let pointAmountSlider : HTMLInputElement
let lifeTimeSlider : HTMLInputElement
let stepsizeSlider : HTMLInputElement
let noiseSlider : HTMLInputElement



let assignInputs = () => {
    smoothingSlider = <HTMLInputElement>document.getElementById("smoothing");
    pointAmountSlider = <HTMLInputElement>document.getElementById("points");
    lifeTimeSlider = <HTMLInputElement>document.getElementById("lifetime");
    stepsizeSlider = <HTMLInputElement>document.getElementById("stepsize");
    noiseSlider = <HTMLInputElement>document.getElementById("noise");
}

let handleInputs = () => {
    smoothingSlider.oninput = (e) => {
        field = new FlowField(fieldSize.x, fieldSize.y)
        field.smooth(parseFloat(smoothingSlider.value) * Math.min(fieldSize.x, 10) )
        field.smooth(parseFloat(smoothingSlider.value) * Math.min(fieldSize.x, 10) )
        field.smooth(parseFloat(smoothingSlider.value) * Math.min(fieldSize.x, 10) )
        clearCanvas()
    }
    pointAmountSlider.oninput = (e) => {
        n_points = parseInt(pointAmountSlider.value)
        resetPoints()
    }
    lifeTimeSlider.oninput = (e) => {
        lifetime = Math.round(Math.sqrt(parseInt(lifeTimeSlider.value)))
    }
    stepsizeSlider.oninput = (e) => {
        stepsize = Math.sqrt(parseFloat(stepsizeSlider.value))
    }
    noiseSlider.oninput = (e) => {
        noisePower = parseFloat(noiseSlider.value)
    }
}