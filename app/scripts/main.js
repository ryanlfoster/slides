require.config({
	shim: {
		"backbone" : {
			deps     : ['../components/underscore/underscore', 'jquery'],
			exports : 'Backbone'
		}
	},

	paths: {
		jquery   : 'vendor/jquery.min',
		backbone : '../components/backbone/backbone'
	}
});

require(['views/app'], function (AppView) {
	
	window.App = {
		Event: _.extend({}, Backbone.Events)
	};

	new AppView();

})