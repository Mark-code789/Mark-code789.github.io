importScripts("Checkers UI Controller.js");
importScripts("Checkers AI Player.js"); 
importScripts("Checkers Core Engine.js");
				
onmessage = async (e) => { try {
	let state = e.data[0];
	let level = e.data[1];
	let mainMoves = e.data[2];
	let move = e.data[3];
	let cloneState = e.data[4];
	let moves = e.data[5];
	let depth = e.data[6];
	let isMax = e.data[7];
	let alpha = e.data[8];
	let beta = e.data[9];
	let currentPlayer = e.data[10];
	HashTable.ZobristTable = e.data[11];
	let ai = new AI({state, depth: level, moves: mainMoves});
	let value = await ai.minimax(cloneState, moves, depth, isMax, alpha, beta, currentPlayer);
	postMessage({title: "value", content: {move, value}});
	} catch (error) {
		postMessage({title: "error", content: error.stack});
	} 
}

onerror = (e) => {
	e.preventDefault();
	postMessage({title: "error", content: error.stack});
} 
