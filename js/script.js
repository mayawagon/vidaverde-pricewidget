var vidaVerde = {};

//jQuery time
$( document ).ready(function() {
	var current_fs, next_fs, previous_fs; //fieldsets
	var left, opacity, scale; //fieldset properties which we will animate
	var animating; //flag to prevent quick multi-click glitches

	var viewNext = function(event){
		if(animating) return false;
		animating = true;
		
		current_fs = $(event.target).closest("fieldset");
		next_fs = current_fs.next();
		
		//activate next step on progressbar using the index of next_fs
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		
		//show the next fieldset
		next_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({
	        'transform': 'scale('+scale+')',
	        'position': 'absolute'
	      });
				next_fs.css({'left': left, 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	};

	var viewPrevious = function(event){
		if(animating) return false;
		animating = true;
		
		current_fs = $(this).parent();
		previous_fs = $(this).parent().prev();
		
		//de-activate current step on progressbar
		$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
		
		//show the previous fieldset
		previous_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale previous_fs from 80% to 100%
				scale = 0.8 + (1 - now) * 0.2;
				//2. take current_fs to the right(50%) - from 0%
				left = ((1-now) * 50)+"%";
				//3. increase opacity of previous_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({'left': left});
				previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	};

	// Show color on selected button and advance to next screen
	var selectButton = function(event){
		var buttons = $(event.target).parent().find(".button");
		buttons.removeClass("selected");
		$(event.target).addClass("selected");
		viewNext(event);
	};

	var updateValues = function(){
		vidaVerde.numBedooms = parseInt($("[name='numbedrooms']").val() || 0);
		vidaVerde.numAdditionalRooms = parseInt($("[name='numadditionalrooms']").val() || 0);

		// Rooms
		vidaVerde.numTotalRooms = vidaVerde.numBedooms + vidaVerde.numAdditionalRooms;
		vidaVerde.numBathrooms = parseInt($("[name='numbathrooms']").val() || 0);
		vidaVerde.numAttics = parseInt($("[name='numatticrooms']").val() || 0);
		vidaVerde.numPets = parseInt($("[name='numpets']").val() || 0);

		vidaVerde.pets = parseInt($("[name='extraspets']").val() || 0);

		// Extras
		vidaVerde.laundry = parseInt($("[name='extraslaundry']").val() || 0);
		vidaVerde.beds = parseInt($("[name='extrasbeds']").val() || 0);
		vidaVerde.ovens = parseInt($("[name='extrasovens']").val() || 0);
		
		vidaVerde.closets = parseInt($("[name='extrasclosets']").val() || 0);
		vidaVerde.fridges = parseInt($("[name='extrasfridges']").val() || 0);
		vidaVerde.windows = parseInt($("[name='extraswindows']").val() || 0);

		calculateQuote();
	};

	var calculateQuote = function(){
		var quote = 0;

		quote += 50 + (vidaVerde.numTotalRooms - 1) * 5;
		quote += vidaVerde.numBathrooms * 10;
		quote += vidaVerde.laundry * 10;
		quote += vidaVerde.beds * 5;
		quote += vidaVerde.ovens * 20;
		quote += vidaVerde.closets * 20;
		quote += vidaVerde.fridges * 20;
		quote += vidaVerde.windows * 10;

		$("#quote").text(quote.toString());
	};

	$("input").change(updateValues);
	$(".next").click(viewNext);
	$(".previous").click(viewPrevious);

	$(".button.schedule").click(selectButton);

	$(".submit").click(function(event){
                viewNext(event);
		return false;
	});
});
