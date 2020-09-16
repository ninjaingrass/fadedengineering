/* == Initializations of Plugins ==*/

(function(jj){
	jj(document).ready(function(){
		// Animations
		if ((jj("[data-animation-effect]").length>0) && !Modernizr.touch) {
			jj("[data-animation-effect]").each(function() {
				var item = jj(this),
				animationEffect = item.attr("data-animation-effect");

				if(Modernizr.mq('only all and (min-width: 768px)') && Modernizr.csstransitions) {
					item.appear(function() {
						if(item.attr("data-effect-delay")) item.css("effect-delay", delay + "ms");
						setTimeout(function() {
							item.addClass('animated object-visible ' + animationEffect);

						}, item.attr("data-effect-delay"));
					}, {accX: 0, accY: -130});
				} else {
					item.addClass('object-visible');
				}
			});
		};

		// Isotope filters
		if (jj('.mp-artists').length>0 || jj('.masonry-grid').length>0 || jj('.masonry-grid-fitrows').length>0) {
			jj(window).load(function() {
				jj('.masonry-grid').isotope({
					itemSelector: '.masonry-grid-item',
					layoutMode: 'masonry'
				});
				jj('.masonry-grid-fitrows').isotope({
					itemSelector: '.masonry-grid-item',
					layoutMode: 'fitRows'
				});
				jj('.mp-artists').fadeIn();
				var jjcontainer = jj('.mp-artists').isotope({
					itemSelector: '.mp-artists__item',
					layoutMode: 'masonry',
					transitionDuration: '0.6s',
					filter: "*"
				});
				// filter items on button click
				jj('.mp-filters').on( 'click', '.mp-filters__item a', function() {
					var filterValue = jj(this).attr('data-filter');
					jj(".mp-filters").find("li.active").removeClass("active");
					jj(this).parent().addClass("active");
					jjcontainer.isotope({ filter: filterValue });
					return false;
				});
			});
		};

		// Magnific popup 
		if ((jj(".popup-img").length > 0) || (jj(".popup-iframe").length > 0) || (jj(".popup-img-single").length > 0)) { 
			jj(".popup-img").magnificPopup({
				type:"image",
				gallery: {
					enabled: true,
				}
			});
			jj(".popup-img-single").magnificPopup({
				type:"image",
				gallery: {
					enabled: false,
				}
			});
			jj('.popup-iframe').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				preloader: false,
				fixedContentPos: false
			});
		};		
	});
})(this.jQuery);

