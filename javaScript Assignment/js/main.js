"use strict";


// Author: Kit Bispham Staite
// functions

function getMouseXY(event) {
    //the outside of the canvas
    var boundingRect = canvas.getBoundingClientRect();
    //pixels from top and left of page
    var offsetX = boundingRect.left;
    var offsetY = boundingRect.top;

    var width = (boundingRect.width-canvas.width)/2;
    var height = (boundingRect.height-canvas.height)/2;
    offsetX += width;
    offsetY += height;
    //rounding the x and y
    var x1 = Math.round(event.clientX-offsetX);
    var y1 = Math.round(event.clientY-offsetY);
    return {x: x1, y: y1};
}

function drawHair(){
    //Setting up colour, line width and x y coordinates
    context.strokeStyle = "rgb(0, 0, 0)";
    context.lineWidth = "5";
    var Xstart = CANVAS_WIDTH*1/5;
    var Ystart = CANVAS_HEIGHT*1/6;
    var Yend = CANVAS_HEIGHT*1/8;
    var Xend = CANVAS_WIDTH-Xstart;
    //spikes 
    var numSpikes = 8;
    var spikeBase = (Xend-Xstart)/numSpikes;

    //draw the hair with spikes
    context.beginPath();
    context.moveTo(Xstart, Ystart);
    for (var n=0; n<numSpikes; n+=1){
        context.lineTo(Xstart+n*spikeBase+spikeBase/2, Yend);
        context.lineTo(Xstart+(n+1)*spikeBase, Ystart);
    }
    context.stroke();
}

function drawEars(){
    //Setting up colour, line width and x y coordinates
    context.strokeStyle = "rgb(0, 0, 0)";
    var Xstart = CANVAS_WIDTH*1/10;
    var Ystart = CANVAS_HEIGHT*1/3;
    var Yend = CANVAS_HEIGHT*1/2;
    var earWidth = (CANVAS_WIDTH-Xstart*2)
    var lwidth = 15;
    context.lineWidth = lwidth.toString();

    //draw both ears
    for (var n=0; n<=1; n+=1){
        context.beginPath();
        context.moveTo(Xstart+(n*earWidth), Ystart);
        context.lineTo(Xstart+(n*earWidth), Yend);
        context.stroke();
        
    }
    
}

function drawNose(){
    //Setting up colour, line width and x y coordinates
    context.strokeStyle = "rgb(0, 0, 0)";
    var Xstart = CANVAS_WIDTH*1/2;
    var Ystart = CANVAS_HEIGHT*1/2;
    var Yend = Ystart+ CANVAS_HEIGHT*1/20;
    var lwidth = 5;
    context.lineWidth = lwidth.toString();

    //draw nose
    context.beginPath();
    context.moveTo(Xstart, Ystart);
    context.lineTo(Xstart, Yend);
    context.stroke();

    //the click box
    noseBox = {x1: Xstart-lwidth, y1: Ystart, x2: Xstart+lwidth, y2: Yend}
}

function drawEyebrows(){
    //Setting up colour, line width and x y coordinates
    context.strokeStyle = "rgb(0, 0, 0)";
    var diameter = CANVAS_HEIGHT*1/10
    var Xstart = CANVAS_WIDTH*1/4;
    var Ystart1 = CANVAS_HEIGHT*1/3-diameter/1.5;
    var Yend1 = Ystart1;
    var Ystart2 = Ystart1;
    var Yend2 = Yend1;
    var eyeWidth = CANVAS_WIDTH-Xstart*2-diameter;
    
    context.lineWidth = "5";
    //making them slanted
    if (faceState == "anger"){
        Yend1 += 15
        Ystart2 += 15
    }

    //draw both eyebrows
    context.beginPath();
    context.moveTo(Xstart-eyeWide, Ystart1);
    context.lineTo(Xstart+diameter-eyeWide, Yend1);
    context.stroke();

    context.beginPath();
    context.moveTo(Xstart+eyeWidth+eyeWide, Ystart2);
    context.lineTo(Xstart+diameter+eyeWidth+eyeWide, Yend2);
    context.stroke();
}

function drawEyes(){
    //Setting up colour, line width and x y coordinates
    context.strokeStyle = "rgb(0, 0, 0)";
    var radius = CANVAS_HEIGHT*1/20
    var Xstart = CANVAS_WIDTH*1/4+radius;
    var Ystart = CANVAS_HEIGHT*1/3;
    var eyeWidth = CANVAS_WIDTH-Xstart*2;
    var lwidth = 5;
    context.lineWidth = lwidth.toString();

    //draw eyes
    if (faceState == "neutral" || faceState == "anger"){
        //Eye 1
        context.beginPath();
        context.arc(Xstart-eyeWide, Ystart, radius, 0, 2*Math.PI);
        context.stroke();
        //Eye 2
        context.beginPath();
        context.arc(Xstart+eyeWidth+eyeWide, Ystart, radius, 0, 2*Math.PI);
        context.stroke();
    }
    else if(faceState == "happy"){
        //Eye 1
        context.beginPath();
        context.arc(Xstart-eyeWide, Ystart, radius, 2/4*Math.PI*2 ,Math.PI*2);
        context.stroke();
        //Eye 2
        context.beginPath();
        context.arc(Xstart+eyeWidth+eyeWide, Ystart, radius, 2/4*Math.PI*2 ,Math.PI*2);
        context.stroke();
    }
    
}

function drawMouth(){
    //Setting up colour, line width and x y coordinates
    context.strokeStyle = mouthColour;
    context.fillStyle = mouthColour;
    var Xstart = CANVAS_WIDTH*1/4;
    var Ystart = CANVAS_HEIGHT*3/4;
    var Xend = CANVAS_WIDTH-Xstart;
    var Yend = CANVAS_HEIGHT*3/4+15;
    
    //draw mouth
    if (faceState == "neutral" || faceState == "anger"){
        context.fillRect(Xstart, Ystart, CANVAS_WIDTH-Xstart*2, 15);
    }
    else if(faceState == "happy"){
        //setting up ellipse variables
        var radiusX = Xend-Xstart*2;
        var radiusY = Yend*1/4
        var Yend = CANVAS_HEIGHT;
        var lwidth = 5;
        context.lineWidth = lwidth.toString();
        context.fillRect(Xstart, Ystart, CANVAS_WIDTH-Xstart*2, 5);
        context.beginPath();
        context.ellipse(Xstart*2, Ystart, radiusX, radiusY, Math.PI*2, 2/4*Math.PI*2, Math.PI*2, true);
        context.stroke();
    }

    //click box for mouth
    mouthBox = {x1: Xstart, y1: Ystart, x2: Xend, y2: Yend}
}

function clear() {
    //draw a rectangle to cover the face
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }


function drawFace(){
    //draw all face parts
    clear();
    drawMouth();
    drawEyes();
    drawNose()
    drawEyebrows()
    drawEars()
    drawHair()
}

function inBox(box, pos){
    //check if the click is in the for certain face part
    if (pos.x >= box.x1 &&
        pos.x <= box.x2 &&
        pos.y >= box.y1 &&
        pos.y <= box.y2){
            return true;
        }
    return false;
}

function canvasClick(event) {
    //do function if click is in a click box
    var pos = getMouseXY(event);
    if (inBox(mouthBox, pos)){
        //get random colour for lips
        var num1 = Math.floor(Math.random() * 255)
        var num2 = Math.floor(Math.random() * 255)
        var num3 = Math.floor(Math.random() * 255)
        mouthColour = "rgb("+num1+", "+num2+", "+num3+")";
        
    } 
    else if (inBox(noseBox, pos)) {
        //widen eyes
        eyeWide += CANVAS_WIDTH*1/50;
        if (eyeWide > CANVAS_WIDTH*1/50*6){
            //reset the eyes if they extend too far
            eyeWide = 0;
        }
    }
    drawFace()
  }

//changing face state when button is clicked
function happyBtn(){
    faceState = "happy";
    drawFace();
}

function neutralBtn(){
    faceState = "neutral";
    drawFace();
}

function angerBtn(){
    faceState = "anger";
    drawFace();
}

// main program

//setting up Elements
var happy = document.getElementById('button_happy');
var neutral = document.getElementById('button_neutral');
var anger = document.getElementById('button_anger');

//setting up canvas
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

//Making width and height responsive
canvas.width = screen.width;
const CANVAS_WIDTH = canvas.width;
canvas.height = screen.height*0.7;
const CANVAS_HEIGHT = canvas.height;

//Setting up variables for face
var faceState = "neutral";
var eyeWide = 0;
var mouthColour = "rgb(0, 0, 0)";
var mouthBox;
var noseBox;

//Setting up Listeners
happy.addEventListener('click', happyBtn, false); 
neutral.addEventListener('click', neutralBtn, false); 
anger.addEventListener('click', angerBtn, false); 
canvas.addEventListener('click', canvasClick);

//Draw face 
drawFace();




