"use strict";
let smoothingSlider;
let pointAmountSlider;
let lifeTimeSlider;
let stepsizeSlider;
let noiseSlider;
let assignInputs = () => {
    smoothingSlider = document.getElementById("smoothing");
    pointAmountSlider = document.getElementById("points");
    lifeTimeSlider = document.getElementById("lifetime");
    stepsizeSlider = document.getElementById("stepsize");
    noiseSlider = document.getElementById("noise");
};
let handleInputs = () => {
    smoothingSlider.oninput = (e) => {
        field = new FlowField(fieldSize.x, fieldSize.y);
        field.smooth(parseFloat(smoothingSlider.value) * Math.min(fieldSize.x, 10));
        field.smooth(parseFloat(smoothingSlider.value) * Math.min(fieldSize.x, 10));
        field.smooth(parseFloat(smoothingSlider.value) * Math.min(fieldSize.x, 10));
        clearCanvas();
    };
    pointAmountSlider.oninput = (e) => {
        n_points = parseInt(pointAmountSlider.value);
        resetPoints();
    };
    lifeTimeSlider.oninput = (e) => {
        lifetime = Math.round(Math.sqrt(parseInt(lifeTimeSlider.value)));
    };
    stepsizeSlider.oninput = (e) => {
        stepsize = Math.sqrt(parseFloat(stepsizeSlider.value));
    };
    noiseSlider.oninput = (e) => {
        noisePower = parseFloat(noiseSlider.value);
    };
};
