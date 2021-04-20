'use strict' 

class AI {
	ai = playerB.pieceColor.slice(0,1);
	opp = playerA.pieceColor.slice(0,1);
	MAX = 1000000;
	MIN = -1000000;
	timestamp = Date.now();      
	
	constructor (prop) {
	    this.state = prop.state;
	    this.depth = prop.depth;
	    this.moves = prop.moves;
    } 
    
    // Evaluation function 
    evaluate = async (state) => {
    	let no = 0;
    	let initNo = 0;
        let ai = 0, human = 0;
        let initAI = 0, initHuman = 0;
        let half = Game.boardSize / 2 - 1;
        
        for(let i = 0; i < Game.boardSize; i++) {
            for(let j = 0; j < Game.boardSize; j++) {
                let piece = state[i][j];
                if(piece.includes(this.ai)) {
                    if(piece.includes("M")) {
                        ai += 1; // value to piece
                    } 
                    if(piece.includes("K")) {
                        ai += 2; // value to piece
                    } 
                } 
                else if(piece.includes(this.opp)) {
                    if(piece.includes("M")) {
                        human += 1; // value to piece
                    } 
                    if(piece.includes("K")) {
                        human += 2; // value to piece
                    } 
                } 
                piece = this.state[i][j];
                if(piece.includes(this.ai)) {
                    if(piece.includes("M")) {
                        initAI += 1; // value to piece
                    } 
                    if(piece.includes("K")) {
                        initAI += 2; // value to piece
                    } 
                } 
                else if(piece.includes(this.opp)) {
                    if(piece.includes("M")) {
                        initHuman += 1; // value to piece
                    } 
                    if(piece.includes("K")) {
                        initHuman += 2; // value to piece
                    } 
                } 
            } 
        } 
        
        let absoluteValue = initAI - initHuman;
        let currentValue = ai - human;
        let relativeValue = currentValue - absoluteValue;
        return Prms(relativeValue);
    } 
    
    move = async (state, move) => { try {
        let i = parseInt(move.cell.slice(0,1)), 
            j = parseInt(move.cell.slice(1,2)),
            m = parseInt(move.empty.slice(0,1)),
            n = parseInt(move.empty.slice(1,2)),
            cap = move.capture, 
            continuousJump = [], 
            crowned = false, 
            id;
            
        id = state[i][j];
        state[i][j] = "IP"; // INITIAL-POSITION
        if(!id.includes("K") && (id.includes(playerA.pieceColor.slice(0,1)) && m === 0 || id.includes(playerB.pieceColor.slice(0,1)) && m === Game.boardSize - 1)) {
            id = id.replace("M", "K");
            crowned = true;
        } 
        
        if(cap != undefined) {
            let a = parseInt(cap.slice(0,1)), 
                b = parseInt(cap.slice(1,2));
                
            state[a][b] = "EC";
            if(!crowned || crowned && (Game.version === "russian" || Game.version === "kenyan" || Game.version === "international" || Game.version === "nigerian")) {
            	id = crowned && (Game.version === "kenyan" || Game.version === "international" || Game.version === "nigerian")? id.replace("K", "M"): id;
            	state[m][n] = id;
	            continuousJump = await AssesCaptures({id, i: m, j: n, state});
				if(continuousJump.length > 0)
	            	continuousJump = await RemoveUnwantedCells({captures: continuousJump, state});
				else if(crowned) {
					id = id.replace("M", "K");
				} 
            } 
        } 
        state[m][n] = id;
        return Prms({state, continuousJump});
        } catch (error) {document.write("AI move Error!<br/>" + error);} 
    } 
    
    correct = (state) => {
        for(let i = 0; i < Game.boardSize; i++) {
            for(let j = 0; j < Game.boardSize; j++) {
                if(state[i][j] === "IP") {
                    state[i][j] = "EC";
                } 
            } 
        } 
        return Prms(state);
    } 
    
    minimax = async (state, moves, depth, isMax, alpha, beta, isContJump) => { 
    	
        if(!moves.length || depth === -1) {
        	let leafScore = !moves.length? (isMax? -10: 10): 0;
        	let actualDepth = this.depth - depth;
        	let score = await this.evaluate(state);
        	score = score + leafScore;
            return Prms(score); 
        } 
        else {
        	let best = isMax? this.MIN: this.MAX; // infinity
        	let isFoundMove = false;
            let opp = isMax? this.opp: this.ai;
            let id = isMax? this.ai: this.opp;
            if(moves.length > 1) {
            	moves = await KillerMove.sort(moves);
            } 
            
            for(let i = 0; i < moves.length; i++) {
                if(state[parseInt(moves[i].cell.slice(0,1))][parseInt(moves[i].cell.slice(1,2))].includes(id) &&
				   state[parseInt(moves[i].empty.slice(0,1))][parseInt(moves[i].empty.slice(1,2))] === "EC") {
                	let cloneState = JSON.parse(JSON.stringify(state));
                	let move = moves[i];
                	let value;
                	let res = await this.move(cloneState, moves[i]); // make move
	                    cloneState = res.state;
					
                    if(res.continuousJump.length === 0) {
                    	cloneState = await this.correct(cloneState); // Removing the ip cells
	                    let moves2 = await Iterate({id: opp, state: cloneState, func: AssesCaptures});
	                    if(moves2.length === 0) {
	                        moves2 = await Iterate({id: opp, state: cloneState, func: AssesMoves});
	                    } else {
	                        moves2 = await RemoveUnwantedCells({captures: moves2, state: cloneState});
	                    } 
						
	                    value = await this.minimax(cloneState, moves2, (isContJump? depth: depth-1), !isMax, alpha, beta, false); // first branch
					} 
					else {
						let moves2 = res.continuousJump;
						
						value = await this.minimax(cloneState, moves2, (isContJump? depth: depth-1), isMax, alpha, beta, true);
					} 
					
					if(isMax) {
						best = Math.max(best, value);
						alpha = Math.max(best, alpha); // adjust search window 
					} 
					else {
						best = Math.min(best, value);
						beta = Math.min(best, beta);
					} 
					
					if(alpha >= beta) {
						KillerMove.add(move, this.timestamp);
						return Prms(alpha); // alpha cut-off
					} 
				} 
				else {
					console.log(state[parseInt(moves[i].cell.slice(0,1))][parseInt(moves[i].cell.slice(1,2))], " == ", id);
				} 
            }
            return Prms(best);
        } 
    } 
    
    findBestMove = async (state, moves) => {
        let isMax = (Game.whiteTurn && playerB.pieceColor === "White" || !Game.whiteTurn && playerB.pieceColor === "Black")? true: false; // false == playerA while true == playerB
        let opp = isMax? this.opp: this.ai;
        let infinite = isMax? this.MIN: this.MAX;
        let bestValue = infinite;
        let bestMove;
        let bestPossibleMoves = [];
        let worker;
        let count = 0;
        let sleep = new Sleep();
        
        if(moves.length > 1 && this.depth > 1) { 
        	if(window.Worker && (this.depth > 4 || Game.version == "international" || Game.version == "nigerian")) {
        		worker = new Worker("Checkers Web Worker.js");
        		worker.onmessage = message;
        		for(let i = 0; i < moves.length; i++) {
		            let cloneState = JSON.parse(JSON.stringify(state));
		            let move = moves[i];
		            let res = await this.move(cloneState, move); // making move
		            cloneState = res.state;
		                
		            if(res.continuousJump.length === 0) {
		            	cloneState = await this.correct(cloneState);
			            let moves2 = await Iterate({id: opp, state: cloneState, func: AssesCaptures});
			            if(moves2.length === 0) {
			                moves2 = await Iterate({id: opp, state: cloneState, func: AssesMoves});
			            } 
			            else {
			                moves2 = await RemoveUnwantedCells({captures: moves2, state: cloneState});
			            } 
			            worker.postMessage([this.state, move, cloneState, moves2, this.depth, !isMax, this.MIN, this.MAX, false]);
					} 
					else {
						let moves2 = res.continuousJump;
						worker.postMessage([this.state, move, cloneState, moves2, this.depth, isMax, this.MIN, this.MAX, true]);
					}
		        } 
        		await sleep.start();
        		worker.terminate();
        		let random = Math.round(Math.random() * (bestPossibleMoves.length - 1));
		        bestMove = bestPossibleMoves[random];
        		return Prms(bestMove);
       	 } 
        	else {
        		for(let i = 0; i < moves.length; i++) {
		            let cloneState = JSON.parse(JSON.stringify(state));
		            let move = JSON.parse(JSON.stringify(moves[i]));
		            let res = await this.move(cloneState, move); // making move
		            cloneState = res.state;
		                
		            let value;
		            if(res.continuousJump.length === 0) {
		            	cloneState = await this.correct(cloneState);
			            let moves2 = await Iterate({id: opp, state: cloneState, func: AssesCaptures});
			            if(moves2.length === 0) {
			                moves2 = await Iterate({id: opp, state: cloneState, func: AssesMoves});
			            } 
			            else {
			                moves2 = await RemoveUnwantedCells({captures: moves2, state: cloneState});
			            } 
						
			            value = await this.minimax(cloneState, moves2, this.depth, !isMax, this.MIN, this.MAX, false);
					} 
					else {
						let moves2 = res.continuousJump;
						value = await this.minimax(cloneState, moves2, this.depth, isMax, this.MIN, this.MAX, true);
					}
					
		            if(isMax && bestValue <= value) {
		                if(bestValue < value) {
		                    bestValue = value;
		                    bestPossibleMoves.splice(0, bestPossibleMoves.length, move);
		                } 
		                else if(bestValue === value) {
		                    bestPossibleMoves.push(move);
		                } 
		            } 
		            else if(!isMax && bestValue >= value) {
		            	if(bestValue > value) {
		            		bestValue = value;
		            		bestPossibleMoves.splice(0, bestPossibleMoves.length, move);
		            	} 
		            	else if(bestValue === value) {
		                    bestPossibleMoves.push(move);
		                } 
		            } 
		        } 
				
		        let random = Math.round(Math.random() * (bestPossibleMoves.length - 1));
		        bestMove = bestPossibleMoves[random];
		        return Prms(bestMove);
			} 
		} 
		else if(moves.length > 1 && this.depth == 1) {
			let random = Math.round(Math.random() * (moves.length - 1));
	        bestMove = moves[random];
	        return Prms(bestMove);
		} 
		else {
			return Prms(moves[0]);
		} 
        
        async function message (e) {
        	let value = e.data.value;
        	let move = e.data.move;
        	count++;
        	// evaluating 
            if(isMax && bestValue <= value) {
                if(bestValue < value) {
                    bestValue = value;
                    bestPossibleMoves.splice(0, bestPossibleMoves.length, move);
                } 
                else if(bestValue === value) {
                    bestPossibleMoves.push(move);
                } 
            } 
            else if(!isMax && bestValue >= value) {
            	if(bestValue > value) {
            		bestValue = value;
            		bestPossibleMoves.splice(0, bestPossibleMoves.length, move);
            	} 
            	else if(bestValue === value) {
                    bestPossibleMoves.push(move);
                } 
            } 
            
            if(count == this.MAX || count == moves.length) {
				sleep.end();
            } 
        } 
    } 
    
    makeMove = async (returnable = false) => { //try {
    	Game.thinking = true;
        let state = JSON.parse(JSON.stringify(this.state));
        let moves = this.moves;
        let bestMove = await this.findBestMove(state, moves);
        let i = parseInt(bestMove.cell.slice(0,1));
        let j = parseInt(bestMove.cell.slice(1,2));
        let m = parseInt(bestMove.empty.slice(0,1));
        let n = parseInt(bestMove.empty.slice(1,2));
        
        other.aiPath.push({i, j, m, n});
        
        if(bestMove.capture != undefined) {
            state = JSON.parse(JSON.stringify(this.state));
            let id = state[i][j];
            let crowned = false;
            state[i][j] = "IP"; // INITIAL-POSITION
            if(!id.includes("K") && (id.includes(playerA.pieceColor.slice(0,1)) && m === 0 || id.includes(playerB.pieceColor.slice(0,1)) && m === Game.boardSize - 1)) {
                id = id.replace("M", "K");
                crowned = true;
            } 
            state[m][n] = id;
            state[parseInt(bestMove.capture.slice(0,1))][parseInt(bestMove.capture.slice(1,2))] = "EC";
            
            moves = [];
            if(!crowned || crowned && (Game.version === "russian" || Game.version === "kenyan" || Game.version === "international" || Game.version === "nigerian")) {
            	id = crowned && (Game.version === "kenyan" || Game.version === "international" || Game.version === "nigerian")? id.replace("K", "M"): id;
                moves = await AssesCaptures({id, i: m, j: n, state});
            } 
                
            if(moves.length > 0) {
                moves = await RemoveUnwantedCells({captures: moves, state});
                this.state = state;
                this.moves = moves;
                await this.makeMove(returnable);
                return;
            } 
        } 
        if(returnable) return;
        let table = $("#table");
		let preSelectedCells = $$("#table .valid, #table .pre_valid, #table .hint, .helper_empty, .helper_filled");
        for(let cell of preSelectedCells) { 
            cell.classList.remove("valid");
            cell.classList.remove("pre_valid");
            cell.classList.remove("hint");
            cell.classList.remove("helper_empty");
            cell.classList.remove("helper_filled");
        } 
        
        for(let cell of other.aiPath) {
            table.rows[cell.i].cells[cell.j].classList.add("valid");
            table.rows[cell.m].cells[cell.n].classList.add("valid");
        } 
        
    	//return;
    	if($("#play-window").style.display == "grid") 
        await setTimeout( async () => {
        	let cell1 = other.aiPath[0];
        	let cell = table.rows[cell1.i].cells[cell1.j];
	        await ValidateMove({cell, i: cell1.i, j: cell1.j, isComputer: true});
        	for(let cell2 of other.aiPath) {
	            cell = table.rows[cell2.m].cells[cell2.n];
	            ValidateMove({cell, i: cell2.m, j: cell2.n, isComputer: true});
			} 
			other.aiPath = [];
        }, 250);
        this.moves = [];
        Game.thinking = false;
        return;
        
        //} catch (error) {}
    } 
}

class HashTable {
	static ZobristTable = [];
	static random = (min, max) => {
		let rand = Math.round(Math.random() * (max - min) + min);
		return rand;
	} 
	static index = (piece) => {
		let index = -1;
		switch (piece) {
			case "MB":
			index = 0;
			break;
			
			case "KB":
			index = 1;
			break;
			
			case "MW":
			index = 2;
			break;
			
			case "KW":
			index = 3;
			break;
		} 
		return index;
	} 
	static initTable = () => {
		this.ZobristTable = [];
		for(let i = 0; i < Game.boardSize; i++) {
			this.ZobristTable.push([]);
			for(let j = 0; j < Game.boardSize; j++) {
				this.ZobristTable[i].push([]);
				for(let k = 0; k < 8; k++) {
					this.ZobristTable[i][j].push([]); 
					this.ZobristTable[i][j][k] = this.random(2, Number.MAX_SAFE_INTEGER); // 2**31-1 => maximum integer of bitwise operation
				} 
			} 
		} 
	} 
	static computeHash = (array, isBoard = true) => {
		let hash = 0n;
		if(isBoard) {
			for(let i = 0; i < Game.boardSize; i++) {
				for(let j = 0; j < Game.boardSize; j++) {
					let piece = array[i][j];
					let index = this.index(piece);
					if(Boolean(~index)) {
						let zobristKey = this.ZobristTable[i][j][index];
						hash ^= BigInt(zobristKey);
					} 
				} 
			} 
		} 
		else {
			array = !Array.isArray(array)? [array]: array;
			for(let i in array) {
				let string = array[i].cell + array[i].empty;
				for(let j in string) {
					let index = parseInt(string.charAt(j));
					let zobristKey = this.ZobristTable[i%Game.boardSize][j%Game.boardSize][index];
					hash ^= BigInt(zobristKey);
				} 
			} 
		} 
		return Prms(hash);
	} 
} 

Array.prototype.getPosition = function (pst) {
	let hash = HashTable.computeHash(pst);
	let key = Number(hash % BigInt(this.length));
	let value = this[key];
	if(value && JSON.stringify(value.position) == JSON.stringify(pst)) return value;
	else if(value) {
		let pos = key+1;
		for(;;pos++) {
			value = this[pos];
			if(value && JSON.stringify(value.position) == JSON.stringify(pst) || !value || pos == key) {
				break;
			} 
			if(pos >= this.length - 1) 
				pos = -1;
		} 
	} 
	return value;
}

Array.prototype.addPosition = function (pst, value, depth, timestamp) {
	let hash = HashTable.computeHash(pst);
	let key = Number(hash % BigInt(this.length));
	
	if(!this[key]) {
		this[key] = {position: pst, value, depth, timestamp};
	} 
	else if(JSON.stringify(this[key].position) != JSON.stringify(pst)) {
		if(this[key].timestamp > timestamp)  {
			this[key] = {position: pst, value, depth, timestamp};
		} 
		else {
			let pos = key+1;
			for(;;pos++) {
				if(this[pos] && this[pos].timestamp > timestamp || !this[pos] && pos < this.length || pos == key) {
					break;
				} 
				if(pos >= this.length - 1) 
					pos = -1;
			} 
			if(pos == key)
				alert("Table is full");
			else 
				this[pos] = {position: pst, value, depth, timestamp};
		} 
	} 
	else {
		if(this[key].value.score <= value.score || this[key].depth >= depth || this[key].timestamp > timestamp) 
			this[key] = {position: pst, value, depth, timestamp};
	} 
} 

class KillerMove {
	static queue = [];
	static moves = new Array(1_597_957);
	static add = (move, timestamp) => {
		this.queue.push({move, timestamp});
		if(this.queue.length == 1) 
			this.addMove();
	} 
	static addMove = async () => {
		while(this.queue[0]) {
			let obj = this.queue[0];
			let move = obj.move;
			let timestamp = obj.timestamp;
			let hash = await HashTable.computeHash(move, false);
			let key = Number(hash % BigInt(this.moves.length));
			
			if(!this.moves[key]) {
				this.moves[key] = {move, timestamp};
			} 
			else if(JSON.stringify(this.moves[key].move) != JSON.stringify(move)) {
				if(this.moves[key].timestamp < timestamp) {
					this.moves[key] = {move, timestamp};
				} 
				else {
					let pos = key+1;
					for(;;pos++) {
						if(!this.moves[pos] && pos < this.moves.length || pos == key) {
							break;
						} 
						if(pos >= this.moves.length - 1) {
							pos = -1;
						} 
					} 
					if(pos == key) 
						alert("Table is full");
					else
						this.moves[pos] = {move, timestamp};
				} 
			} 
			else {
				if(this.moves[key].timestamp < timestamp) {
					this.moves[key] = {move, timestamp};
				} 
			} 
			this.queue.shift();
		} 
	} 
	static sort = async (moves) => {
		let km = [];
		await moves.forEach(async (move, index) => {
			let hash = await HashTable.computeHash(move, false);
			let key = Number(hash % BigInt(this.moves.length));
			let value = this.moves[key];
			if(value && JSON.stringify(value.move) == JSON.stringify(move)) {
				await km.push(move);
				await moves.splice(index, 1);
				return;
			} 
			else if(value) {
				let pos = key+1;
				for(;;pos++) {
					value = this.moves[pos];
					if(value && JSON.stringify(value.move) == JSON.stringify(move)) {
						await km.push(move);
						await moves.splice(index, 1);
						return;
					} 
					if(!value || pos == key) 
						break;
					if(pos >= self.moves.length - 1)
						pos = -1;
				} 
			} 
		});
		return km.concat(moves);
	} 
} 

class Sleep {
	i = 0;
	j = 1_000;
	start = () => {
		let self = this;
		return new Promise((resolve, reject) => {
			const it = setInterval(() => {
				self.i++;
				if(self.i >= self.j) {
					resolve("Done");
					self.i = 0;
					clearInterval(it);
				} 
			}, 1000);
		});
	} 
	end = () => {
		this.i = this.j;
	} 
	wait = async (sec) => {
		this.j = sec;
		await this.start();
		return "done";
	} 
} 


