define(['backbone'], function(Backbone) {

	var Slide = Backbone.View.extend({
		className : 'slide',

		render : function () {
			if ( this.model.get('image') ) {
				this.renderImage();
			} else if (this.model.get('bullets') ) {
				this.renderBullets();
			} else if (this.model.get('quote')) {
				this.renderBlockquote();
			} else {
				this.renderHeading();
			}

			return this;
		},

		renderHeading: function () {
			this.$el.append(
				'<h1 class=' + this.model.get('size') + '>' + this.model.get('title') + '</h1>'
			);
		},

		renderImage: function () {
			this.$el
				.addClass( 'image' )
				.append('<img src=' + this.model.get('image') + '>');
		},

		renderBullets: function () {
			var el = this.$el;

			el.addClass('bullets')

			if ( this.model.get( 'title' )) {
				el.append('<h1>' + this.model.get('title') + '</h1>')
			}

			el.append([
					'<ul>',
						'<li>' + this.model.get('bullets').join('</li><li>'),
					'</ul>'
				].join(' '));
		},

		renderBlockquote: function () {
			this.$el
				.addClass('quote')
				.append([
					'<figure>',
						'<blockquote>',
							this.model.get('quote'),
						'</blockquote>',
						'<figcaption>',
							'<cite>',
								this.model.get('cite'),
							'</cite>',
						'</figcaption>',
					'</figure>'
				].join(''));
		}
	});

	return Slide; 
});