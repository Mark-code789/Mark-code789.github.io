importScripts("Checkers UI Controller.js");
importScripts("Checkers AI Player.js"); 
importScripts("Checkers Core Engine.js");
				
onmessage = async (e) => { try {
	let state = e.data[0];
	let move = e.data[1];
	let cloneState = e.data[2];
	let moves = e.data[3];
	let depth = e.data[4];
	let isMax = e.data[5];
	let alpha = e.data[6];
	let beta = e.data[7];
	let currentPlayer= e.data[8];
	let ai = new AI({state, depth});
	let value = await ai.minimax(cloneState, moves, depth, isMax, alpha, beta, currentPlayer);
	postMessage({move, value});
	} catch (error) {
		postMessage(error.message + " at\n " + error.stack);
	} 
}

onerror = (e) => {
	e.preventDefault();
	postMessage(e.message + " at " + e.lineno + " in " + e.filename);
} 
