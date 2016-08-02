main = function(game) {
    var sprite, bmd, isDown, drawArray, graphics, resultText;
	return{
		init: function(){

		},
		create: function() {
			isDown = 0;
			drawArray = [];
			game.input.onDown.add(this.onDown, this);
			game.input.onUp.add(this.onUp, this);

			graphics = game.add.graphics(0, 0);
			
			bmd = game.add.bitmapData(360,640);
			var color = 'white';

			bmd.ctx.beginPath();
			bmd.ctx.lineWidth = 5;
			bmd.ctx.strokeStyle = color;
			bmd.ctx.stroke();
			sprite = game.add.sprite(0, 0, bmd);

			var style = { font: "65px Calibri", fill: "#aaaaaa", align: "center" };
			resultText = game.add.text(game.world.centerX, 100, "Draw", style);
			resultText.anchor.set(0.5);

		},
		update: function() {
			if(isDown == 1){
				drawArray.push([game.input.x, game.input.y]);
				if(drawArray.length > 1){
					bmd.ctx.beginPath();
					bmd.ctx.moveTo(drawArray[drawArray.length - 2][0] , drawArray[drawArray.length - 2][1]);
					bmd.ctx.lineTo(drawArray[drawArray.length - 1][0] , drawArray[drawArray.length - 1][1]);
					bmd.ctx.stroke();
					bmd.ctx.closePath();
					bmd.render();
				}
			}
		},
		onDown: function() {
			//console.log('Down');
			isDown = 1;
			bmd.clear();
		},
		onUp: function() {
			//console.log('Up');
			isDown = 0;
			//var img = bmd.ctx.getImageData(0, 0, 500, 500);
			//var imgData = img.data;
			var recognizedNumber = recognize(bmd.ctx, 360, 640);
			resultText.text = recognizedNumber;
			drawArray = [];
			
		}
		
	}
};
