'use strict' 

const Iterate = async (prop) => {
    let func = prop.func, 
        id = prop.id, 
        state = prop.state,
        returnObj = [];
    
    for(let i = 0; i < Game.boardSize; i++) {
        for(let j = 0; j < Game.boardSize; j++) {
            let piece = state[i][j];
            if(piece.includes(id)) {
                let movesObj = await func({id: piece, i, j, state});
                
                for(let moveObj of movesObj) {
                    returnObj.push(moveObj);
                } 
            } 
        } 
    } 
    return Prms(returnObj); // returns single dimension array
} 

const AssesMoves = async (prop) => { try {
    //concept based on Assess Captures function 
    let id = prop.id,
        i = prop.i,
        j = prop.j,
        state = prop.state,
        m = [], 
        moves = [];
    let r = id.includes(playerA.pieceColor.slice(0,1))? -1: 1;
    
    if(Game.version === "american" || Game.version === "kenyan") {
        m = await getMoves(i, j, i+r, j-1, r, -1);
        for(let cell of m) {
            moves.push({cell: `${i}${j}`, empty: `${cell.x}${cell.y}`});
        } 
        m = await getMoves(i, j, i+r, j+1, r, 1);
        for(let cell of m) {
            moves.push({cell: `${i}${j}`, empty: `${cell.x}${cell.y}`});
        } 
        
        if(id.includes('K')) {
            r = 0-r;
            m = await getMoves(i, j, i+r, j-1, r, -1);
            for(let cell of m) {
                moves.push({cell: `${i}${j}`, empty: `${cell.x}${cell.y}`});
            } 
            m = await getMoves(i, j, i+r, j+1, r, 1);
            for(let cell of m) {
                moves.push({cell: `${i}${j}`, empty: `${cell.x}${cell.y}`});
            } 
        } 
    } 
    else if(Game.version === "international" || Game.version === "nigerian" || Game.version === "russian" || Game.version === "pool") {
        if(id.includes('M')) {
            m = await getMoves(i, j, i+r, j-1, r, -1);
            for(let cell of m) {
                moves.push({cell: `${i}${j}`, empty: `${cell.x}${cell.y}`});
            } 
            m = await getMoves(i, j, i+r, j+1, r, 1);
            for(let cell of m) {
                moves.push({cell: `${i}${j}`, empty: `${cell.x}${cell.y}`});
            } 
        } 
        else if(id.includes('K')) {
            m = await getMoves(i, j, Game.boardSize, Game.boardSize, r, -1);
            for(let cell of m) {
                moves.push({cell: `${i}${j}`, empty: `${cell.x}${cell.y}`});
            } 
            m = await getMoves(i, j, Game.boardSize, Game.boardSize, r, 1);
            for(let cell of m) {
                moves.push({cell: `${i}${j}`, empty: `${cell.x}${cell.y}`});
            } 
            
            // opposite direction
            r = 0-r;
            m = await getMoves(i, j, Game.boardSize, Game.boardSize, r, -1);
            for(let cell of m) {
                moves.push({cell: `${i}${j}`, empty: `${cell.x}${cell.y}`});
            } 
            m = await getMoves(i, j, Game.boardSize, Game.boardSize, r, 1);
            for(let cell of m) {
                moves.push({cell: `${i}${j}`, empty: `${cell.x}${cell.y}`});
            } 
        } 
    } 
    
    function getMoves (startX, startY, endX, endY, r, c) {
        let x = startX + r;
        let y = startY + c;
        let row = null;
        let m = [];
        for(;; x+=r, y+=c) {
            row = state[x];
            
            if(row != undefined) {
                if(row[y] === undefined || row[y] != "EC") {
                    break;
                } 
                else if(row[y] === "EC") {
                    m.push({x, y});
                } 
                
                if(x === endX || y === endY) {
                    break;
                } 
            } 
            else {
                break;
            } 
        } 
        return Prms(m);
    } 
    
    return Prms(moves);
    } catch (error) {console.log(error);}
} 

const AssesCaptures = async (prop) => { try {
    let id = prop.id, // id to mark the current piece type
        op = (id.includes("W"))? "B": "W", // op for an opponent
        you = id.replace(/[KM]/g, ""), // you
        i = prop.i, // i for row
        j = prop.j, // j for column
        state = prop.state, // state of the game to examine
        m = [], // to store current moves
        captures = []; // array to store found captures
    let r = id.includes(playerA.pieceColor.slice(0,1))? -1: 1;
        
    if(Game.version === "american") {
        m = await getCaptures(i, j, i+r, j-1, 1, 1, r, -1);
        for(let cell of m) {
            captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
        } 
        m = await getCaptures(i, j, i+r, j+1, 1, 1, r, 1);
        for(let cell of m) {
            captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
        } 
        
        if(id.includes('K')) {
            r = 0-r;
            m = await getCaptures(i, j, i+r, j-1, 1, 1, r, -1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
            m = await getCaptures(i, j, i+r, j+1, 1, 1, r, 1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
        } 
    } 
    else if(Game.version === "kenyan") {
        if(id.includes('M')) {
            m = await getCaptures(i, j, i+r, j-1, 1, 1, r, -1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
            m = await getCaptures(i, j, i+r, j+1, 1, 1, r, 1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
            r = 0-r;
            m = await getCaptures(i, j, i+r, j-1, 1, 1, r, -1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
            m = await getCaptures(i, j, i+r, j+1, 1, 1, r, 1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
        } 
        else if('K') {
            m = await getCaptures(i, j, Game.boardSize, Game.boardSize, 1, 1, r, -1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
            m = await getCaptures(i, j, Game.boardSize, Game.boardSize, 1, 1, r, 1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
            
            r = 0-r;
            m = await getCaptures(i, j, Game.boardSize, Game.boardSize, 1, 1, r, -1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
            m = await getCaptures(i, j, Game.boardSize, Game.boardSize, 1, 1, r, 1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
        } 
    } 
    else if(Game.version === "international" || Game.version === "nigerian" || Game.version === "russian" || Game.version === "pool") {
        if(id.includes('M')) {
            m = await getCaptures(i, j, i+r, j-1, 1, 1, r, -1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
            m = await getCaptures(i, j, i+r, j+1, 1, 1, r, 1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
            
            r = 0-r;
            m = await getCaptures(i, j, i+r, j-1, 1, 1, r, -1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
            m = await getCaptures(i, j, i+r, j+1, 1, 1, r, 1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
        } 
        else if(id.includes('K')) {
            m = await getCaptures(i, j, Game.boardSize, Game.boardSize, 0, 0, r, -1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
            m = await getCaptures(i, j, Game.boardSize, Game.boardSize, 0, 0, r, 1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
            
            r = 0-r;
            m = await getCaptures(i, j, Game.boardSize, Game.boardSize, 0, 0, r, -1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
            m = await getCaptures(i, j, Game.boardSize, Game.boardSize, 0, 0, r, 1);
            for(let cell of m) {
                captures.push({cell: `${i}${j}`, capture: `${cell.x1}${cell.y1}`, empty: `${cell.x2}${cell.y2}`});
            } 
        } 
    } 
    
    function getCaptures (startX, startY, endX1, endY1, endX2, endY2, r, c) {
        let x = startX + r;
        let y = startY + c;
        let row = null;
        let enemy = null;
        let m = [];
        for(;; x+=r, y+=c) {
            row = state[x];
            
            if(row != undefined) {
                if(row[y] === undefined || row[y] == "IP" || row[y] !== "EC" && enemy || row[y].includes(you) && !enemy) {
                    break;
                } 
                if(!enemy && row[y].includes(op)) {
                    enemy = {x, y};
                    if(endX2 === 1 && endY2 === 1) {
                        endX2 = x+r;
                        endY2 = y+c;
                    } 
                } 
                if(enemy && row[y] === "EC") {
                    m.push({x1: enemy.x, y1: enemy.y, x2: x, y2: y});
                } 
                if(!enemy && (x === endX1 || y === endY1) || enemy && (x === endX2 || y === endY2)) {
                    break;
                } 
            } 
            else {
                break;
            } 
        } 
        return Prms(m);
    } 
    
    return Prms(captures);
    } catch (error) {console.log(error);}
}

const RemoveUnwantedCells = async (prop, isPath) => {
    let captures = Copy(prop.captures);
    let state = Copy(prop.state);
    let newCaps = [];
    let ref;
    
    let ids = captures.filter((cap, n) => {
        if(n == 0 || cap.cell !== ref.cell || cap.capture !== ref.capture) {
            ref = cap;
            return cap;
        } 
    });
    
    let sorted = [];
    
    for(let id of ids) {
        let caps = captures.filter((cap, n) => {
            if(cap.cell === id.cell && cap.capture === id.capture) {
                return cap;
            } 
        });
        sorted.push(caps);
    } 
    
    for(let a = 0; a < sorted.length; a++) {
        let arr = sorted[a];
        let wanted = [];
        for(let b = 0; b < arr.length; b++) {
            let move = arr[b];
            let i = parseInt(move.cell.slice(0,1));
            let j = parseInt(move.cell.slice(1,2));
            let k = parseInt(move.capture.slice(0,1));
            let l = parseInt(move.capture.slice(1,2));
            let m = parseInt(move.empty.slice(0,1));
            let n = parseInt(move.empty.slice(1,2));
            let crowned = false;
            
            let cloneState = Copy(state);
            let id = cloneState[i][j];
            cloneState[i][j] = "EC";
            if(!id.includes("K") && (Game.version === "american" || Game.version === "kenyan" || Game.version === "russian" || Game.version === "pool") && (id.includes(playerA.pieceColor.slice(0,1)) && m === 0 || id.includes(playerB.pieceColor.slice(0,1)) && m === Game.boardSize - 1)) {
                id = id.replace("M", "K");
                crowned = true;
            } 
            cloneState[m][n] = id;
            cloneState[k][l] = "EC";
            let moves = [];
            if(!crowned || crowned && Game.version === "russian")
                moves = await AssesCaptures({id, i: m, j: n, state: cloneState});
            
            if(moves.length > 0) {
                wanted.push(move);
            } 
        }
        
        if(wanted.length > 0)
        for(let cap of wanted)
            newCaps.push(cap);
        else 
        for(let cap of arr) 
            newCaps.push(cap);
    } 
    
    return Prms(newCaps);
} 

const SortCaptures = (moves) => {
	let sorted = [];
	for(let move of moves) {
		let hasMove;
		for(let sort of sorted) { //push if it belongs to the same path
			hasMove = sort[sort.length-1].empty == move.cell;
			if(hasMove) 
				sort.push(move);
		} 
		if(!hasMove && move.source) // otherwise if the move is source create new path
			sorted.push([move]);
		else if(!hasMove) { // otherwise check if the move already exits in the paths and if so, pick the moves prior to the current move and add to the new path
			let i = 0, j = 0;
			for(; i < sorted.length; i++) {
				let sort = sorted[i];
				for(; j < sort.length; j++) {
					if(sort[j].cell == move.cell) {
						hasMove = true;
						break;
					} 
				} 
				if(hasMove) break;
			} 
			if(hasMove) {
				sorted.push([]);
				for(let sort of sorted[i].slice(0,j))
					sorted[sorted.length-1].push(sort);
				sorted[sorted.length-1].push(move);
			} 
		} 
	} 
	return Prms(sorted);
} 

