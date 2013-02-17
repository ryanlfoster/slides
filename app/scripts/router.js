define(['backbone'], function(Backbone) {

	var Main = Backbone.Router.extend({
		routes: {
			''           : 'home',
			'slides/:id' : 'showSlide'
		},

		home: function () {
			console.log("Home Route");

			App.Event.trigger('init');
		},

		showSlide: function (slideIndex) {
			App.Event.trigger('changeSlide', {
				slideIndex : slideIndex,
				direction  : 'next'
			});
		}

	});
	
	return Main; 
});