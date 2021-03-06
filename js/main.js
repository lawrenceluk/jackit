$("#bigbutton").click(function() {
	$('#mce-EMAIL').focus();
});

Parse.initialize("9iFBOZbXNasx6wr4NnSlDSeAEZ4BiiKQg1gHCYOn", "1kFVBhQOySICQbvslZqu0YyQdm4QMfN8OLPNABYy");    
var Game = Parse.Object.extend("Game");
var names = ["Josh", "Ankush", "Aieswarya", "Angelique", "Elle", "Lawrence", "Long", "Michelle"];

/*
function addRow() {
	var g = new Game();
	  g.save(
	  	{p1: names[rand(0, names.length-1)],
	  	 p2: names[rand(0, names.length-1)],
	  	 p1score: rand(500, 2500),
	  	 p2score: rand(500, 2500)
	  	}, 
	  {
	  success: function(object) {
	  	console.log("success: "+JSON.stringify(object, null, 4));
	  },
	  error: function(model, error) {
	    console.log("error: "+error);
	  }
	});
} */ 

function getPlayer(name) {
	var scores = [];
	var query = new Parse.Query(Game);
	query.equalTo("p1", name);
	query.limit(10);
	query.descending("createdAt");
	$("#leaderboard").html("Loading...");
	query.find({
	  success: function(results) {
	    for (var i = 0; i < results.length; i++) {
	    	scores.push(results[i].attributes);
	    }
	  },
	  error: function(error) {
	    console.log("Error: " + error.code + " " + error.message);
	    $("#leaderboard").html("Error loading leaderboard.");	  }
	});
	query = new Parse.Query(Game);
	query.limit(10);
	query.equalTo("p2", name);
	query.descending("createdAt");
	query.find({
	  success: function(results) {
	    for (var i = 0; i < results.length; i++) { 
	      scores.push(results[i].attributes);
	    }
	    if (scores.length == 0) {
	    	$("#leaderboard").html("Player not found.");
	    	return;
	    }
	  	$("#leaderboard").html("");
	    for (var i = 0; i < scores.length; i++) {
	  		var str = "<tr>";
	  		str += "<td>"+(i+1)+"</td>";
	    	var rr = scores[i];
	    	if (rr.p1score < rr.p2score)
	      	str += "<td class='fade'>"+rr.p1+"</td>";
	      else str += "<td>"+rr.p1+"</td>";
	      if (rr.p1score > rr.p2score)
	      	str += "<td class='winscore'>"+rr.p1score+"</td>";
	      else str += "<td class='fade'>"+rr.p1score+"</td>";
	    	if (rr.p2score < rr.p1score)
	      	str += "<td class='fade'>"+rr.p2+"</td>";
	      else str += "<td>"+rr.p2+"</td>";
	      if (rr.p2score > rr.p1score)
	      	str += "<td class='winscore'>"+rr.p2score+"</td>";
	      else str += "<td class='fade'>"+rr.p2score+"</td>";
	    	str += "</tr>"
	    	$("#leaderboard").append(str);
	    }
	  },
	  error: function(error) {
	    console.log("Error: " + error.code + " " + error.message);
	    $("#leaderboard").html("Error loading leaderboard.");
	  }
	});
}

function getRecentGames() {
	$("#leaderboard").html("Loading...");
	var query = new Parse.Query(Game);
	query.descending("createdAt");
	query.limit(20);
	query.find({
	  success: function(results) {
	  	$("#leaderboard").html("");
	    for (var i = 0; i < results.length; i++) {
	  		var str = "<tr>";
	  		str += "<td>"+(results[i].createdAt.toUTCString().split(" ")[4])+"</td>";
	    	var rr = results[i].attributes;
	    	if (rr.p1score < rr.p2score)
	      	str += "<td class='fade'>"+rr.p1+"</td>";
	      else str += "<td>"+rr.p1+"</td>";
	      if (rr.p1score > rr.p2score)
	      	str += "<td class='winscore'>"+rr.p1score+"</td>";
	      else str += "<td class='fade'>"+rr.p1score+"</td>";
	    	if (rr.p2score < rr.p1score)
	      	str += "<td class='fade'>"+rr.p2+"</td>";
	      else str += "<td>"+rr.p2+"</td>";
	      if (rr.p2score > rr.p1score)
	      	str += "<td class='winscore'>"+rr.p2score+"</td>";
	      else str += "<td class='fade'>"+rr.p2score+"</td>";
	    	str += "</tr>"
	    	$("#leaderboard").append(str);
	    }
	  },
	  error: function(error) {
	    console.log("Error: " + error.code + " " + error.message);
	    $("#leaderboard").html("Error loading leaderboard.");
	  }
	});
}

function getTopGames() {
	$("#leaderboard").html("Loading...");
	var highscores = [];
	var query = new Parse.Query(Game);
	query.descending("p1score");
	query.limit(10);
	query.find({
		success: function(results) {
			for (var i = 0; i < results.length; i++) {
				var rr = results[i].attributes;
				highscores.push({
					player: rr.p1,
					score: rr.p1score
				});
			}
		},
		error: function(error) {
	    console.log("Error: " + error.code + " " + error.message);
	    $("#leaderboard").html("Error loading leaderboard.");
	  }
	});
	query = new Parse.Query(Game);
	query.descending("p2score");
	query.limit(10);
	query.find({
		success: function(results) {
			$("#leaderboard").html("");
			for (var i = 0; i < results.length; i++) {
				var rr = results[i].attributes;
				highscores.push({
					player: rr.p2,
					score: rr.p2score
				});
			}
			// highscores should now contain 50 best players
			highscores.sort(compare);
			var str = "<tr>";
				str += "<td class='winscore'>"+1+"</td>";
				str += "<td class='winscore'>"+highscores[0].player+"</td>";
				str += "<td class='winscore'>"+highscores[0].score+"</td>";
				str += "<tr>";
		  	$("#leaderboard").append(str);		
			for (var i = 1; i < highscores.length; i++) {
				str = "<tr>"
				str += "<td>"+(i+1)+"</td>";
				str += "<td>"+highscores[i].player+"</td>";
				str += "<td>"+highscores[i].score+"</td>";
		  	str += "</tr>"
		  	$("#leaderboard").append(str);		
			}
		},
		error: function(error) {
	    console.log("Error: " + error.code + " " + error.message);
	    $("#leaderboard").html("Error loading leaderboard.");	  }
	});
}

function compare(a,b) {
  if (a.score < b.score)
     return 1;
  if (a.score > b.score)
    return -1;
  return 0;
}
function compareTime(a, b) {
	if (a.createdAt < b.createdAt)
		return 1;
	if (a.createdAt > b.createdAt)
		return -1;
	return 0;
}


function rand(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var $top = $("#top");
var search = $("#search");
var box = $("#searchbox");
box.hide();
var recent = $("#recent");

recent.click(function () {
	if (recent.hasClass("select"))
		return;
	$top.removeClass("select");
	search.removeClass("select");
	recent.addClass("select");
	box.hide();
	getRecentGames();
});

$top.click(function() {
	if ($top.hasClass("select"))
		return;
	$top.addClass("select");
	search.removeClass("select");
	recent.removeClass("select");
	box.hide();
	getTopGames();
});

search.click(function() {
	if (search.hasClass("select"))
		return;
	$top.removeClass("select");
	search.addClass("select");
	recent.removeClass("select");
	box.show();
});

box.keypress(function (e) {
  if (e.which == 13) {
  	e.preventDefault();
    getPlayer(box.val());
  }
});

getRecentGames();