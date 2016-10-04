main = function (game) {
	var sprite,
	bmd,
	drawArray,
	resultText,
	recognizedNumber;
	return {
		init : function () {},
		create : function () {
			drawArray = [];

			game.input.onDown.add(this.onDown, this);
			game.input.onUp.add(this.onUp, this);
			game.input.addMoveCallback(this.onMove, this);

			bmd = game.add.bitmapData(720, 1280);
			var color = 'white';

			bmd.ctx.beginPath();
			bmd.ctx.lineWidth = 5;
			bmd.ctx.strokeStyle = color;
			bmd.ctx.stroke();
			sprite = game.add.sprite(0, 0, bmd);

			var style = {
				font : "65px Calibri",
				fill : "#aaaaaa",
				align : "center"
			};
			resultText = game.add.text(game.world.centerX, 100, "Draw", style);
			resultText.anchor.set(0.5);

		},
		update : function () {},
		onDown : function () {
			//console.log('Down');
			bmd.clear();
		},
		onUp : function () {
			//console.log('Up');
			//console.log(drawArray.length);
			if (drawArray.length > 2) {
				recognizedNumber = recognize(bmd.ctx, 720, 1280);
			} else {
				recognizedNumber = '-';
			}
			resultText.text = recognizedNumber;
			drawArray = [];
		},
		onMove : function (pointer, x, y) {
			drawArray.push([pointer.x, pointer.y]);
			if (drawArray.length > 1) {
				bmd.ctx.beginPath();
				bmd.ctx.moveTo(drawArray[drawArray.length - 2][0], drawArray[drawArray.length - 2][1]);
				bmd.ctx.lineTo(drawArray[drawArray.length - 1][0], drawArray[drawArray.length - 1][1]);
				bmd.ctx.stroke();
				bmd.ctx.closePath();
				bmd.render();
			}
		}

	}
};
