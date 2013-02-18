define(['backbone'], function (Backbone) {

	var Slide = Backbone.Model.extend({
		defaults : {
			type  : 'note',
			title : ''
		},

		initialize: function () {
			this.setFontSize();	
		},

		/**
		 * Sets a size attribute per slide based on character lengths
		 */
		setFontSize: function () {
			var length = this.get('title').length,
				size;

			if ( length >= 20 ){
				size = 'x-large';
			} else if ( length >= 10 ) {
				size = 'large'
			} else {
				size = 'normal'
			}

			this.set( 'size', size );
		}
	});

	return Slide;
});