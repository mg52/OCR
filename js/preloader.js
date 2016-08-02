preloader = function(game) {
	return{
		preload: function() {
		},
		create: function() {
			game.state.start('main');
		}
	}
};
