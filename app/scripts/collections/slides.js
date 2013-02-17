define(['backbone', 'models/slide'], function(Backbone, SLideModel) {

	var Slides = Backbone.Collection.extend({
		model : SlideModel
	});

	return Slides; 
});