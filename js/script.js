var vidaVerde = {};
vidaVerde.prices = {
	"1room": {
		"1bath": {
			weekly: 55,
			"every other week": 65,
			monthly: 90
		},

		"2bath": {
			weekly: 65,
			"every other week": 75,
			monthly: 100
		}
	},

	"2room": {
		"1bath": {
			weekly: 55,
			"every other week": 65,
			monthly: 90
		},

		"2bath": {
			weekly: 65,
			"every other week": 75,
			monthly: 100
		}
	},

	"3room": {
		"1bath": {
			weekly: 60,
			"every other week": 70,
			monthly: 95
		},

		"2bath": {
			weekly: 70,
			"every other week": 80,
			monthly: 105
		}
	},

	"4room": {
		"1bath": {
			weekly: 65,
			"every other week": 80,
			monthly: 105
		},

		"2bath": {
			weekly: 75,
			"every other week": 85,
			monthly: 110
		},

		"3bath": {
			weekly: 85,
			"every other week": 95,
			monthly: 120
		}
	},

	"5room": {
		"1bath": {
			weekly: 70,
			"every other week": 85,
			monthly: 115
		},

		"2bath": {
			weekly: 80,
			"every other week": 95,
			monthly: 125
		},

		"3bath": {
			weekly: 90,
			"every other week": 105,
			monthly: 135
		}
	},

	"6room": {
		"1bath": {
			weekly: 75,
			"every other week": 85,
			monthly: 115
		},

		"2bath": {
			weekly: 80,
			"every other week": 95,
			monthly: 125
		},

		"3bath": {
			weekly: 95,
			"every other week": 110,
			monthly: 140
		}
	},

	"7room": {
		"1bath": {
			weekly: 80,
			"every other week": 95,
			monthly: 125
		},

		"2bath": {
			weekly: 90,
			"every other week": 105,
			monthly: 135
		},

		"3bath": {
			weekly: 100,
			"every other week": 115,
			monthly: 145
		}
	},

	"8room": {
		"1bath": {
			weekly: 85,
			"every other week": 100,
			monthly: 130
		},

		"2bath": {
			weekly: 95,
			"every other week": 110,
			monthly: 140
		},

		"3bath": {
			weekly: 105,
			"every other week": 120,
			monthly: 150
		}
	},

	"9room": {
		"1bath": {
			weekly: 90,
			"every other week": 110,
			monthly: 145
		},

		"2bath": {
			weekly: 100,
			"every other week": 120,
			monthly: 155
		},

		"3bath": {
			weekly: 110,
			"every other week": 150,
			monthly: 165
		}
	},

	"9room": {
		"1bath": {
			weekly: 90,
			"every other week": 110,
			monthly: 145
		},

		"2bath": {
			weekly: 100,
			"every other week": 120,
			monthly: 155
		},

		"3bath": {
			weekly: 110,
			"every other week": 150,
			monthly: 165
		}
	},

	"10room": {
		"1bath": {
			weekly: 95,
			"every other week": 115,
			monthly: 150
		},

		"2bath": {
			weekly: 105,
			"every other week": 125,
			monthly: 160
		},

		"3bath": {
			weekly: 115,
			"every other week": 135,
			monthly: 170
		},

		"4bath": {
			weekly: 125,
			"every other week": 145,
			monthly: 180
		}
	},

	"10room": {
		"1bath": {
			weekly: 95,
			"every other week": 115,
			monthly: 150
		},

		"2bath": {
			weekly: 105,
			"every other week": 125,
			monthly: 160
		},

		"3bath": {
			weekly: 115,
			"every other week": 135,
			monthly: 170
		},

		"4bath": {
			weekly: 125,
			"every other week": 145,
			monthly: 180
		}
	},

	"11room": {
		"1bath": {
			weekly: 100,
			"every other week": 120,
			monthly: 155
		},

		"2bath": {
			weekly: 110,
			"every other week": 130,
			monthly: 165
		},

		"3bath": {
			weekly: 120,
			"every other week": 140,
			monthly: 175
		},

		"4bath": {
			weekly: 130,
			"every other week": 150,
			monthly: 185
		}
	},

	"1attic": {
		weekly: 20,
		"every other week": 30,
		monthly: 50
	},

	"2attic": {
		weekly: 25,
		"every other week": 35,
		monthly: 55
	}
};

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

	var increment = function(event){
		var input = $(this).parent().find("input");
		var value = parseFloat(input.val());
		var operation = $(this).attr("data-operation");
		var increment = $(this).attr("data-increment");
		var step;

		increment === "half" && value > 0 ? step = .5 : step = 1;

		if(operation === "minus"){
			value > 1 ? input.val(value - step) : input.val(0);
		} else {
			input.val(value + step);
		}
		updateValues();
	};

	var updateValues = function(){
		vidaVerde.schedule = $("[name='schedule'].selected").val();
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
		if(vidaVerde.numTotalRooms > 0 && vidaVerde.numBathrooms > 0){
			var quote = vidaVerde.prices[vidaVerde.numTotalRooms+"room"][vidaVerde.numBathrooms+"bath"][vidaVerde.schedule];

			vidaVerde.numAttics > 0 ? quote += vidaVerde.prices[vidaVerde.numAttics+"attic"][vidaVerde.schedule] : false;
			quote += vidaVerde.laundry * 10;
			quote += vidaVerde.beds * 5;
			quote += vidaVerde.ovens * 20;
			quote += vidaVerde.closets * 20;
			quote += vidaVerde.fridges * 20;
			quote += vidaVerde.windows * 10;
			if(vidaVerde.numPets > 0){
				vidaVerde.numPets < 4 ? quote += 10 : quote += 10 + (vidaVerde.numPets - 3) * 5;
			} 

			$("#quote").text(quote.toString());
		}
	};

	$("input").change(updateValues);
	$(".next").click(viewNext);
	$(".previous").click(viewPrevious);

	$(".button.schedule").click(selectButton);
	$(".increment").click(increment);

	$(".submit").click(function(event){
                viewNext(event);
		return false;
	});
});
