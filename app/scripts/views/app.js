define([
	'backbone',
	'views/slides',
	'collections/slides',
	'router'
], function(Backbone, SlidesView, SlidesCollection, MainRouter) {

	var AppView = Backbone.View.extend({
		el : 'body',

		initialize : function () {
			var testCollection = [
				{ title: 'First Slide' },
				{ title: 'Second Slide' }
			];

			new SlidesView({
				collection: new SlidesCollection( testCollection )
			});

			App.router = new MainRouter();
			Backbone.history.start();
		}
	});

	return AppView; 
});