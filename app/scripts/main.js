require.config({
	shim: {
		"backbone" : {
			deps     : ['../components/underscore/underscore', 'jquery'],
			exports : 'Backbone'
		}
	},

	paths: {
		jquery   : 'vendor/jquery.min',
		backbone : '../components/backbone/backbone',
		prism    : '../components/prism/prism'
	}
});

require(['views/app', 'prism'], function (AppView, Prism) {
	
	window.App = {
		Event: _.extend({}, Backbone.Events)
	};

	new AppView();

})