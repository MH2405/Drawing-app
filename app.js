var color = document.querySelector('#color')
var eraser = document.querySelector('#eraser')
var decrease = document.querySelector('#decrease')
var sizeEl = document.querySelector('#size')
var increase = document.querySelector('#increase')
var save = document.querySelector('#save')
var close = document.querySelector('#close')
var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')

var currentPos = {
    x: 0,
    y: 0
}
var currentPosAfter = {
    x: 0,
    y: 0
}

var isDrawing = false
var colorPanit = '#000000'
var size = 0
sizeEl.innerText = size

document.addEventListener('mousedown', function(e){
    currentPos = {
        x: e.offsetX,
        y: e.offsetY
    }
    isDrawing = true
})

document.addEventListener('mousemove', function(e){
    if(isDrawing){
        currentPosAfter = {
            x: e.offsetX,
            y: e.offsetY
        }

        ctx.beginPath();
        ctx.arc(currentPos.x, currentPos.y, size, 0, 2 * Math.PI)
        ctx.fillStyle = colorPanit; 
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(currentPos.x, currentPos.y);
        ctx.lineTo(currentPosAfter.x, currentPosAfter.y);
        ctx.strokeStyle = colorPanit;
        ctx.lineWidth = size * 2;
        ctx.stroke(); 

        currentPos.x = currentPosAfter.x
        currentPos.y = currentPosAfter.y
    }
})

document.addEventListener('mouseup', function(e){
    isDrawing = false
})

color.addEventListener('change', function(e){
    colorPanit = e.target.value
})

eraser.addEventListener('click', function(){
    colorPanit = '#ffffff'
})

decrease.addEventListener('click', function(){
    size -= 5
    size = size > 5 ? size : 5
    sizeEl.innerText = size
})

increase.addEventListener('click', function(){
    size += 5
    size = size < 30 ? size : 30
    sizeEl.innerText = size
})

close.addEventListener('click', function(){
    var canvasTats = canvas.getClientRects()[0]
    ctx.clearRect(0, 0, canvasTats.width, canvasTats.height)
})

save.addEventListener('click', function(e){
    var output = canvas.toDataURL('image/png');
    save.setAttribute('href', output)
})
