boot = function(game) {
	return{
		preload: function(){
		},
		create: function(){
			//screen size control
			game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;
			game.renderer.renderSession.roundPixels = true;
			game.state.start('preloader');
		}
	}
};
