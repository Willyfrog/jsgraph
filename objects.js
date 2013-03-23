APP.P_RADIUS = 3;

function Point (x, y) {
    this.x = x;
    this.y = y;

    this.draw=function (ctx) {
	console.log("drawing!");
	ctx.moveTo(x, y);
	ctx.arc(x, y, APP.P_RADIUS, 0, Math.PI*2);
	ctx.fillStyle="#33C";
	ctx.fill();
    };
}
