let slidercap = document.getElementById("capfactor");
let capout = document.getElementById("capval");
capout.innerHTML = slidercap.value;

slidercap.oninput = function () {
  capout.innerHTML = this.value;
}

let sliderlife = document.getElementById("deslife");
let lifeout = document.getElementById("lifeval");
lifeout.innerHTML = sliderlife.value;

sliderlife.oninput = function () {
  lifeout.innerHTML = this.value;
}

let sliderom = document.getElementById("omrate");
let omout = document.getElementById("opval");
omout.innerHTML = sliderom.value;

sliderom.oninput = function () {
  omout.innerHTML = this.value;
}

let sliderllr = document.getElementById("llrate");
let llrout = document.getElementById("llrval");
llrout.innerHTML = sliderllr.value;

sliderllr.oninput = function () {
  llrout.innerHTML = this.value;
}

let sliderfcr = document.getElementById("fcr");
let fcrout = document.getElementById("fcrval");
fcrout.innerHTML = sliderfcr.value;

sliderfcr.oninput = function () {
  fcrout.innerHTML = this.value;
}

let sliderdrate = document.getElementById("discrate");
let drateout = document.getElementById("discval");
drateout.innerHTML = sliderdrate.value;

sliderdrate.oninput = function () {
  drateout.innerHTML = this.value;
}
