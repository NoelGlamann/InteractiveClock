//Noel Glamann
//January 25, 2021

//-------------------------------------------------------------------------------------------------------------------------

var canvas = document.getElementById('canvas'); //create a canvas
var ctx = canvas.getContext('2d'); //create 2D drawing object
var radius = canvas.height / 2; //calculate the clock radius

ctx.translate(radius, radius); //remap axis to center in the canvas

radius = radius * 0.9; //reduce radius by 90%

setInterval(drawClock, 1000); //run clock function every second

//-------------------------------------------------------------------------------------------------------------------------

function drawClock() {
	drawFace(ctx, radius);
	drawNumbers (ctx, radius);
	drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
	var grad; 
	
	// white circle for face
	ctx.beginPath();
	ctx.arc(0, 0, radius, 0, 2*Math.PI);
	ctx.fillStyle = "white";
	ctx.fill();
	
	//radial gradient
	grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
	grad.addColorStop(0, '#333');
	grad.addColorStop(0.5, 'white');
	grad.addColorStop(1, '#333');
	
	//create gradient as stroke style
	ctx.strokeStyle = grad;
	ctx.lineWidth = radius * 0.1;
	ctx.stroke();
	
	//draw the center
	ctx.beginPath();
	ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
	ctx.fillStyle = '#333'
	ctx.fill();
}

function drawNumbers(ctx, radius) {
	var ang;
	var num;
	ctx.font = radius*0.15 + "px arial"; //set font at 15% of radius
	ctx.textBaseline = "middle"; //set text alignment to middle
	ctx.textAlign = "center"; //set text alignment to center
	for(num=1; num < 13; num++){ //calculate the print position for each number
		ang = num *Math.PI /6;
		ctx.rotate(ang);
		ctx.translate(0, -radius*0.85);
		ctx.rotate(-ang);
		ctx.fillText(num.toString(), 0, 0);
		ctx.rotate(ang);
		ctx.translate(0, radius*0.85);
		ctx.rotate(-ang);
	}
}

var secOffset = 0;
var minOffset = 0;
var hrOffset = 0;

function drawTime(ctx, radius){
	var now = new Date();
	var hour = now.getHours()+hrOffset;
	var minute = now.getMinutes()+minOffset;
	var second = now.getSeconds()+secOffset;
	//hour
	hour = hour%12;
	//calculate angle of hour hand
	hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
	//make hour hand 50% of canvas's radius
	drawHand(ctx, hour, radius*0.5, radius*0.07);
	//minute
	//calculate angle of minute hand
	minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
	//make minute hand 80% of canvas's radius
	drawHand(ctx, minute, radius*0.8, radius*0.07);
	//second
	//calculate angle of second hand
	second=(second*Math.PI/30);
	//make second hand 90% of canvas's radius
	drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width){
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	ctx.moveTo(0,0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.stroke();
	ctx.rotate(-pos);
}	


//-------------------------------------------------------------------------------------------------------------------------

function drawRequestedTime(ctx, radius){
	let date = new Date();
	hrOffset = document.getElementById("hour").value-date.getHours();
	minOffset = document.getElementById("min").value-date.getMinutes();
	secOffset = document.getElementById("sec").value-date.getSeconds();
}

function reset()
{
	hrOffset = 0;
	minOffset = 0;
	secOffset = 0;

}

function drawRequestedHand(ctx, pos, length, width){
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	ctx.moveTo(0,0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.stroke();
	ctx.rotate(-pos);
}
	
	