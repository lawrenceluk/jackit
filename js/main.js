Parse.initialize("BfmnSmdPaA2ajZtBgQqrRJZBFoYOuQBMFNKdCxnh", "BAwATQqLbGSkurEnTL1qf6sEVNlMHO8lphpb8f30");    
var Game = Parse.Object.extend("Game");

function addRow() {
	var g = new Game();
	  g.save(
	  	{p1: "Josh",
	  	 p2: "Ankush",
	  	 p1score: 500,
	  	 p2score: 500
	  	}, 
	  {
	  success: function(object) {
	  	console.log("win: "+JSON.stringify(object, null, 4));
	  },
	  error: function(model, error) {
	    console.log("no: "+error);
	  }
	});
}