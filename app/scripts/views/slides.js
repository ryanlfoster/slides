/**
 * Creates a view for holding all the slides
 * Has bindings for left and right arrow for prev and next functions
 */
define(['backbone', 'views/slide'], function(Backbone, SlideView) {

	var SlidesView = Backbone.View.extend({
		el: $('.slides'),

		/**
		 * Initializes the slidesview
		 *   sets current index to first slide
		 *   hides all other slides
		 *   adds event binding for changing slide
		 */
		initialize: function () {
			this.numSlides = this.collection.length;
			this.currentSlideIndex = 1;
			this.transitionSpeed = 500;

			this.renderAll();

			App.Vent.on('init', this.hideAllButFirst, this);
			App.Vent.on('changeSlide', this.changeSlide, this);
		},

		/**
		 * Hides every slide but the first
		 */
		hideAllButFirst: function () {
			this.$el.children(':nth-child(n+2)').hide();
		},

		/**
		 * Changes slide
		 */
		changeSlide: function (opts) {
			var self = this;
			var newSlide;
			var slides = this.$el.children();


			//  If we're requesting specific slide
			//  then set current index
			if ( opts.slideIndex ) {
				this.currentSlideIndex = ~~opts.slideIndex;
			} else {
				// Otherwise grab the prev or next slide
				this.setCurrentSlideIndex( opts.direction );
			}

			newSlide = slides.eq( this.currentSlideIndex - 1 );
			
			//  transition to that slide
			slides.filter(':visible')
				.css('position', 'absolute')
				.animate({
					top     : opts.direction === 'next' ? '100%' : '-100%',
					opacity : 'hide'
				}, this.transitionSpeed, function () {
					// slide is gone from view
					$(this).css('top', 0);

					// bring new slide into view
					newSlide
						.css('position', 'absolute')
						.css('top', opts.direction === 'next' ? '-100%' : '100%' )
						.animate({
							top: 0,
							opacity: 'show'
						}, self.transitionSpeed);
				});


			App.router.navigate('/slides/' + this.currentSlideIndex);
		},


		setCurrentSlideIndex: function (direction) {
			this.currentSlideIndex += direction === 'next' ? 1 : -1
			
			if ( this.currentSlideIndex > this.numSlides ) {
				this.currentSlideIndex = 1;
			}

			if ( this.currentSlideIndex <= 0 ) {
				this.currentSlideIndex = this.numSlides;
			}
		},

		/**
		 * Empties the container and renders each slide
		 */
		renderAll: function () {
			this.$el.empty();
			this.collection.each(this.render, this);
		},

		/**
		 * Creates a new view for all slides
		 * @param  {obj} slide - single slide
		 */
		render: function (slide) {
			var slideView = new SlideView({ model: slide });

			this.$el.append( slideView.render().el );

			return this;
		}
	});

	return SlidesView; 
});