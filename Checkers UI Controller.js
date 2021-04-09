'use strict' 

// object to store the most needed images 
const Icons = {
    alertIcon: "", 
    confirmIcon: "", 
    winnerIcon: "", 
    loserIcon: "", 
    drawIcon: "",
    loadIcon: ""
}
// object to store the most needed audio 
const Sound = { 
    click: "",
    capture: "",
    king: "", 
    collect: "", 
    game_win: "", 
    game_lose: "", 
    muted: false
}
// for caching purposes 
var storage = null;
try {
    storage = localStorage;
    //storage.clear();
} catch (error) {}
// srcs to load the resources needed
// images srcs
let srcs = ["https://dl.dropbox.com/s/jjtjli844vi9psx/flag.jpeg?raw=1;", 
              //"@english flag.jpeg",
              "https://dl.dropbox.com/s/u2rq5zwir1wb1j1/kenyan%20flag.jpeg?raw=1",
              //"@kenyan flag.jpeg",
              "https://dl.dropbox.com/s/0xnacehchqt3mae/international%20flags.jpeg?raw=1",
              //"@international flags.jpeg",
              "https://dl.dropbox.com/s/31xm9xed0gy0y75/pool%20flag.jpeg?raw=1",
              //"@pool flag.jpeg",
              "https://dl.dropbox.com/s/cbrkmi4elainqhm/russian%20flag.jpeg?raw=1",
              //"@russian flag.jpeg",
              "https://dl.dropbox.com/s/j17subkdm2xa30u/nigerian%20flag.jpeg?raw=1",
              //"@nigerian flag.jpeg",
              "https://dl.dropbox.com/s/ftqfb07zf6mc9x0/background.jpeg?raw=1",
              //"@background.jpeg", 
              "https://dl.dropbox.com/s/ml8j2a06pz5l8h2/black%20cell.jpeg?raw=1", 
              //"@black cell.jpeg", 
              "https://dl.dropbox.com/s/qao4ol91lj9rvpq/white%20cell.jpeg?raw=1", 
              //"@white cell.jpeg",
              "https://dl.dropbox.com/s/pz5bbjkxwe44mak/hint.png?raw=1", 
              //"@hint.png", 
              "https://dl.dropbox.com/s/mxjhrg0irv814j4/menu.png?raw=1", 
              //"@menu.png", 
              "https://dl.dropbox.com/s/xfy094x0tr2a9m8/restart.png?raw=1", 
              //"@restart.png", 
              "https://dl.dropbox.com/s/5hl8fugh6t9vfl4/undo.png?raw=1", 
              //"@undo.png", 
              "https://dl.dropbox.com/s/ytscnq3xjwrdr3b/about.png?raw=1", 
              //"@about.png",
              "https://dl.dropbox.com/s/ullk2lgeshwiuad/black%20piece%20port1.png?raw=1", 
              //"@black piece port1.png",
              "https://dl.dropbox.com/s/ogl5dcxs53fthos/white%20piece%20port.png?raw=1",
              //"@white piece port.png", 
              "https://dl.dropbox.com/s/ndb82h0g81sqb88/black%20crown.png?raw=1", 
              //"@black crown.png", 
              "https://dl.dropbox.com/s/yqdlxnhvael2kbq/white%20crown.png?raw=1",
              //"@white crown.png",
              "https://dl.dropbox.com/s/7wot2yjnfguwyex/send.png?raw=1",
              //"@send.png", 
              "https://dl.dropbox.com/s/vwnk6afe6143fq5/cancel.png?raw=1",
              //"@cancel.png",
              "https://dl.dropbox.com/s/ajtw9ggxe9lnmjh/alert.png?raw=1",
              //"@alert.png",
              "https://dl.dropbox.com/s/08spxvjodm00uuk/confirm.png?raw=1", 
              //"@confirm.png", 
              "https://dl.dropbox.com/s/tkpm3yk20py5lvi/winner.png?raw=1",
              //"@winner.png",
              "https://dl.dropbox.com/s/rdhm3zyqxizf4t7/loser.png?raw=1", 
              //"@loser.png", 
              "https://dl.dropbox.com/s/ahlbn4wh3gbgkgf/draw.png?raw=1", 
              //"@draw.png",
              "https://dl.dropbox.com/s/1vbgc9s51ss560x/load.png?raw=1", 
              //"@load.png",
              "https://dl.dropbox.com/s/gd8hma5lxmcpj6g/lock.png?raw=1",
              //"@lock.png", 
              "https://dl.dropbox.com/s/k1useykdiptx6vu/star.png?raw=1"
              //"@star.png"
              ];
// audio srcs 
let sounds = [//"@button_click_003.mp3",
                "https://dl.dropbox.com/s/9g9buga12ei8fyw/button_click_003.mp3?raw=1", 
                //"@capture.mp3", 
                "https://dl.dropbox.com/s/dabo10r11k98s7y/capture.mp3?raw=1", 
                //"@king.mp3", 
                "https://dl.dropbox.com/s/pbj9avbzmquc9xh/king.mp3?raw=1", 
                //"@collect.mp3",
                "https://dl.dropbox.com/s/qiyucvychewpiwk/collect.mp3?raw=1",
                //"@game win.mp3", 
                "https://dl.dropbox.com/s/z9wf6nxyyrxx9cq/game%20win.mp3?raw=1", 
                //"@game lose.mp3"
                "https://dl.dropbox.com/s/uchjgfosuf17kkk/game%20lose.mp3?raw=1"
               ];
// to access audio object keys
let soundProps = Object.keys(Sound);
// to access css values and image keys
let imageProps = ["--english-flag",
                    "--kenyan-flag",
                    "--international-flags",
                    "--pool-flag",
                    "--russian-flag",
                    "--nigerian-flag", 
                    "--bg", 
                    "--black-cell", 
                    "--white-cell", 
                    "--hint",
                    "--menu", 
                    "--restart", 
                    "--undo", 
                    "--about",
                    "--black-piece", 
                    "--white-piece", 
                    "--black-crown", 
                    "--white-crown",
                    "--send-btn",
                    "--cancel",
                    Object.keys(Icons)[0],
                    Object.keys(Icons)[1], 
                    Object.keys(Icons)[2],
                    Object.keys(Icons)[3], 
                    Object.keys(Icons)[4],
                    Object.keys(Icons)[5]
                    ];
// use recursive function to load the images in srcs and updating the progress bar
let i, bar, width;
try {
	i = 0;
	bar = document.querySelector(".bar"); // Loading bar
	width = parseInt(window.getComputedStyle(bar, null).getPropertyValue("width"));
} catch {}

load(srcs[i]);

async function load (src) { try {
    src = src.replace('@', '');
    let response = await fetch(src);
    if(response.status === 200) {
        let arrBuff = await response.arrayBuffer();
        if(arrBuff.byteLength > 0) {
            if(!src.includes(".mp3")) {
                src = await URL.createObjectURL(new Blob([arrBuff], {type: "image/png"}));
                srcs.splice(i, 1, src);
                if(i < imageProps.length - Object.keys(Icons).length) {
                    document.documentElement.style.setProperty(imageProps[i], `url(${src})`);
                }
                else if(i < imageProps.length) {
                    Icons[imageProps[i]] = src;
                }
            } 
            else {
                src = await URL.createObjectURL(new Blob([arrBuff], {type: "audio/mp3"}));
                let audio = new Audio(src);
                Sound[soundProps[i - srcs.length]] = audio;
            } 
            bar.children[0].style.width = ((i+1) * width / (srcs.length + sounds.length)) + "px";
            bar.children[0].innerHTML = (parseInt(window.getComputedStyle(bar.children[0], null).getPropertyValue("width")) / width * 100).toFixed(0) + "%";
            i++;
            if(i < srcs.length) {
                load(srcs[i]);
            }
            else if(i < srcs.length + sounds.length) {
                load(sounds[i - srcs.length]);
            }
            else {
                setTimeout(LoadingDone, 100);
            } 
        }
        else {
            alert("BUFFERING ERROR!\nFailed to buffer fetched data to an array data.");
        } 
    }
    else {
        alert("LOADING ERROR!\nFailed to load AppShellFiles. Either you have bad network or you have lost internet connection.\n" + src);
    } 
    } catch (error) {alert("load error: " + error.message)}
} 

var other = {
    initialX: 0,
    initialY: 0,
    currentX: 0,
    currentY: 0,
    xOffset: 0,
    yOffset: 0,
    active: false, 
    
    orientation: 'natural', 
    initialLoading: true,
    fullscreenSupport: false, 
    default: "linear-gradient(rgba(0, 152, 25, 0.9), rgba(0, 112, 0, 0.9))", 
    disabled: "linear-gradient(rgba(110, 110, 110, 0.9), rgba(70, 70, 70, 0.9))", 
    background: "linear-gradient(rgba(40, 40, 40, 0.9), rgba(0, 0, 0, 0.9))", 
    selected: "", 
    level: "",
    capturePath: [], 
    helperPath: [], 
    aiPath: []
}

async function LoadingDone () {
	imageProps = null;
	soundProps = null;
	sounds = null;
	bar = null;
	width = null;
	i = null;
	srcs.slice(6, srcs.length - 8);
	HashTable.initTable();
	
    document.documentElement.style.setProperty("--star", `url(${srcs[srcs.length-1]})`);
    document.body.style.backgroundImage = `var(--bg)`;
    $("#load-window").style.display = "none";
    $("#main-window").style.display = "grid";
    clearInterval(intervalID);
    intervalID = null;
    
    $("#chat-icon").addEventListener("touchstart", DragStart, false);
    $("#chat-icon").addEventListener("touchend", DragEnd, false);
    $("#chat-icon").addEventListener("touchmove", Drag, false);
    $("#chat-icon").addEventListener("click", DragEnd, false);
   
    $("#chat-icon").addEventListener("mousedown", DragStart, false);
    $("#chat-icon").addEventListener("mouseup", DragEnd, false);
    $("#chat-icon").addEventListener("mousemove", Drag, false);
    
    Disable($("#two-players-window #playerB .white"), other.disabled, "#B4B4B4");
    other.selected = $("#main .default");
    other.level = $("#nav .default");
    
    let btns = $$("#main-window #levels #nav div");
    let btn = null;
    let p = null;
    
    if(storage === null || storage.getItem("versions") === null) {
        for(btn of btns) {
            p = btn.children[1];
            if(btn.children[0].innerHTML != "LOCKED") {
                p.children[0].classList.add("not_achieved");
                p.children[1].classList.add("not_achieved");
                p.children[2].classList.add("not_achieved");
            } 
            else {
                p.style.filter = "grayscale(0%) invert(0%) brightness(100%)";
                p.style.backgroundImage = `url(${srcs[srcs.length-2]})`;
            } 
        }
        if(storage) {
            storage.setItem("versions", JSON.stringify(Game.versions));
            storage.setItem("version", Game.version);
        } 
    }
    else {
        try {
            Game.versions = JSON.parse(storage.getItem("versions"));
            let version = storage.getItem("version");
            Game.version = version;
            for(let h2 of $$(".version h2")) {
                if(h2.innerHTML.includes(version.toUpperCase())) {
                    version = h2.parentNode;
                    break;
                } 
            }
            Version(version, undefined, false);
        } catch (error) {alert("Version Initialization Error: " + error.message + "\nVersion: " + storage.getItem("version"))}
        
        Game.stats = JSON.parse(storage.getItem("stats")) || [];
        
        let length = Game.stats.length;
        let mainSec = $("#games-window #games");
        try {
            //alert(length);
        for(let i = 0; i < length; i++) {
            let no = i;
            let stat = Game.stats[no];
            let subSec = $$$("section");
            subSec.classList.add("sub_item");
            p = $$$("p");
            p.innerHTML = `${stat.playerName[0]} [${stat.pieceColor[0]}] VS ${stat.playerName[1]} [${stat.pieceColor[1]}] ${(stat.level != undefined)? "<br/><br/> " + stat.version + ": " + stat.level: ""}`;
            let btn = $$$("button");
            btn.classList.add("default", "middle_top");
            btn.innerHTML = "SEE STATS";
            btn.addEventListener("click", () => GetStats(no), false);
            subSec.appendChild(p);
            subSec.appendChild(btn);
            mainSec.appendChild(subSec);
        }
        } catch (error) {/*alert(error + "" + JSON.parse(storage.getItem("stats")).length);*/}
    }
    
    //check if has notch
    other.notch = await HasNotch();
    
    window.addEventListener("orientationchange", () => {
        setTimeout(() => {play(true);}, 300);
    });
    
    UpdateOnlineStatus();
    window.addEventListener("online", UpdateOnlineStatus, false);
    window.addEventListener("offline", UpdateOnlineStatus, false);
   
    await setTimeout( () => {
		if(!window.matchMedia('(display-mode: standalone)').matches) {
		    Notify({action: "alert",
					header: "App Shortcut",
					message: "Hello, thanks for playing this game. However, you can make accessibility of this game much simpler by adding it to homescreen and make it act like a native app.<br><br>To do this, just go to your browser menu and select <b><em>Add to Home screen</em></b> or <b><em>Add shortcut</em></b> option and you will be done. Happy Gaming.<br><br><b>Ignore this if you have already added.</b>"
					});
		}
	}, 1000);
}

const DragStart = (e) => {
    if (e.type === "touchstart") {
        other.initialX = e.touches[0].clientX - other.xOffset;
        other.initialY = e.touches[0].clientY - other.yOffset;
    } else {
        other.initialX = e.clientX - other.xOffset;
        other.initialY = e.clientY - other.yOffset;
    }
    
    let dragItem = $("#chat-icon");
    if(e.target === dragItem) {
        other.active = true;
    } 
}

const DragEnd = async (e) => {
    if(e.type === "touchend") {
        e.target.style.transition = "transform 0.5s ease";
        if(other.currentX < (65 - window.innerWidth)/2) {
            await SetTranslate((65 - window.innerWidth), other.currentY, e.target);
            other.currentX = (65 - window.innerWidth);
        }
        if(other.currentX > (65 - window.innerWidth)/2) {
            await SetTranslate(5, other.currentY, e.target);
            other.currentX = 5;
        }
        if(other.currentY < -5) {
            await SetTranslate(other.currentX, -5, e.target);
            other.currentY = -5;
        }
        if(other.currentY > (window.innerHeight - 65)) {
            await SetTranslate(other.currentX, (window.innerHeight - 65), e.target);
            other.currentY = (window.innerHeight - 65);
        }
        e.target.style.transition = "transform 0s ease";
        other.initialX = other.currentX;
        other.initialY = other.currentY;
        other.xOffset = other.currentX;
        other.yOffset = other.currentY;
        
        other.active = false;
    }
    else
        ShowChat();
}

const Drag = (e) => {
    if(other.active) {
        e.preventDefault();
        
        if (e.type === "touchmove") {
            other.currentX = e.touches[0].clientX - other.initialX;
            other.currentY = e.touches[0].clientY - other.initialY;
        } else {
            other.currentX = e.clientX - other.initialX;
            other.currentY = e.clientY - other.initialY;
        }
       
        other.xOffset = other.currentX;
        other.yOffset = other.currentY;
       
        SetTranslate(other.currentX, other.currentY, e.target);
    } 
}

const SetTranslate = (x, y, elem) => {
    elem.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
}

const HideChat = () => {
    $("#chat-window").style.display = "none";
    $("#chat-icon").style.display = "block";
    
    let unreadBubble = $(".center_bubble");
    if(unreadBubble != null) {
        unreadBubble.parentNode.removeChild(unreadBubble);
    } 
}

const ShowChat = () => {
    $("#chat-icon").style.display = "none";
    $("#chat-window").style.display = "flex";
   
    let badge = $(".badge");
    if(parseInt(badge.innerHTML) > 0) {
        $(".center_bubble").scrollIntoView({block: "start", behavior: "smooth"});
    } 
    
    badge.innerHTML = 0;
    badge.style.display = "none";
} 
    
const HasNotch = () => {
    let proceed = false;
    let top = 0;
    if(CSS.supports("padding-top: constant(safe-area-inset-top)")) {
        proceed = true;
        top = parseInt(GetValue(document.documentElement, "--satc"));
    } 
    else if(CSS.supports("padding-top: env(safe-area-inset-top)")) {
        proceed = true;
        top = parseInt(GetValue(document.documentElement, "--sat"));
    } 
    
    let vh = document.documentElement.clientHeight || window.innerHeight || window.screen.availHeight;
    if(proceed) {
        if(top > 0) //for iPhone X
        return {has: true, top};
        else {
            if(window.screen.height - vh >= 84 || window.screen.height - vh >= 30)
            return {has: true, top: 30};
        } 
    } 
    else {
        if(window.screen.height - vh >= 84 || window.screen.height - vh >= 30)
            return {has: true, top: 30};
    } 
    return {has: false, top: 0};
} 

const LoadBoard = (playerAPieceColor, playerBPieceColor) => {
	let board = $("#table");
	let tre = board.rows;
	let isEmpty = Game.state.length === 0? true: false;
    for(let i = 0; i < Game.boardSize; i++) {
        let tr = tre[i] || $$$("tr");
        if(tr.parentNode === null) 
            tr.classList.add("tr");
        if(isEmpty) 
        Game.state.push([]);
        
        for(let j=0; j < Game.boardSize; j++) {
            let td = tr.cells[j] || $$$("td");
            if(td.parentNode === null) 
                td.classList.add("cell");
            
            if(Game.version != "nigerian" && (j%2 == 1 && i%2 == 0 || j%2 == 0 && i%2 == 1) || Game.version === "nigerian" && (j%2 == 0 && i%2 == 0 || j%2 == 1 && i%2 == 1)) {
                if(td.parentNode === null) {
                    td.classList.add("cell_black");
                    td.addEventListener('click', () => {ValidateMove({cell: td, i, j}); }, true);
                }
                if(isEmpty) {
	                if(i < Game.rowNo) {
	                    let div = $$$("div");
	                    //change color of the piece where according to the choice of the player
	                    if(playerBPieceColor === "Black") {
	                        div.classList.add("piece_black");
	                        Game.state[i].push("MB"); // pushing MEN-BLACK
	                    } 
	                    else if(playerBPieceColor === "White") {
	                        div.classList.add("piece_white");
	                        Game.state[i].push("MW"); // pushing MEN-WHITE
	                    } 
	                    td.appendChild(div);
	                } 
	                else if(i > Game.boardSize - Game.rowNo - 1) {
	                    let div = $$$("div");
	                    //change color of the piece where according to the choice of the player
	                    if(playerAPieceColor === "White") {
	                        div.classList.add("piece_white");
	                        Game.state[i].push("MW"); // pushing MEN-WHITE
	                    } 
	                    else if(playerAPieceColor === "Black") {
	                        div.classList.add("piece_black");
	                        Game.state[i].push("MB"); // pushing MEN-BLACK
	                    } 
	                    td.appendChild(div);
	                } 
	                else {
	                    Game.state[i].push("EC"); // pushing EMPTY-CELL
	                }
				}
				else {
					if(Game.state[i][j].includes("B")) {
						let div = $$$("div");
						div.classList.add("piece_black");
						if(Game.state[i][j] == "KB")
						div.classList.add("crown_black");
						td.appendChild(div);
					}
					else if(Game.state[i][j].includes("W")) {
						let div = $$$("div");
						div.classList.add("piece_white");
						if(Game.state[i][j] == "KW")
						div.classList.add("crown_white");
						td.appendChild(div);
					} 
				} 
            }
            else {
                if(td.parentNode === null) {
                    td.classList.add("cell_white");
                }
                if(isEmpty)
                Game.state[i].push("NA"); // pushing NOT-AVAILABLE
            } 
            
            if(td.parentNode === null)
                tr.appendChild(td);
        } 
        if(tr.parentNode === null)
            board.appendChild(tr);
    }
} 

const Refresh = async (restart = false, color = playerA.pieceColor) => {
    // remove all the temporary css classes 
    let pieces = $$("#table tr td div, #transmitter .outer, .valid, .pre_valid, .hint, .helper_empty, .helper_filled");
    for(let piece of pieces) {
        if(piece.parentNode != null) {
            piece.classList.remove("helper_empty");
            piece.classList.remove("helper_filled");
            piece.classList.remove("hint");
            if(piece.className.includes("valid"))
                piece.classList.remove("valid");
            if(piece.className.includes("pre_valid"))
                piece.classList.remove("pre_valid");
            if(piece.tagName.toLowerCase() === "div")
                piece.parentNode.removeChild(piece);
        } 
    }
   
    $("#table").innerHTML = "";
   
    // reset all the game states and players states 
    BackState.moves = [];
    Game.state = /*[["NA", "EC", "NA", "EC", "NA", "EC", "NA", "EC"],
				  ["EC", "NA", "EC", "NA", "EC", "NA", "EC", "NA"],
				  ["NA", "EC", "NA", "EC", "NA", "EC", "NA", "EC"],
				  ["EC", "NA", "EC", "NA", "EC", "NA", "EC", "NA"],
				  ["NA", "EC", "NA", "EC", "NA", "EC", "NA", "EC"],
				  ["EC", "NA", "EC", "NA", "EC", "NA", "EC", "NA"],
				  ["NA", "EC", "NA", "EC", "NA", "EC", "NA", "EC"],
				  ["EC", "NA", "EC", "NA", "EC", "NA", "EC", "NA"]];*/[];
    Game.track = [];
    Game.possibleCaptures = [];
    Game.possibleMoves = [];
    Game.over = false;
    Game.pieceSelected = false;
    Game.validForHint = true;
    Game.prop = null;
    Game.count = 1;
    Game.countMoves = 0;
    other.aiPath = [];
    other.helperPath = [];
    other.capturePath = [];
    playerA.kings = 0;
    playerA.moves = 0;
    playerA.captures = 0;
    playerA.longestCapture = 0;
    playerB.kings = 0;
    playerB.moves = 0;
    playerB.captures = 0;
    playerB.longestCapture = 0;
    $("#transmitter").style.display = "none";
    $("#play-window .footer_section p label:last-of-type").style.backgroundImage = "none";
    $("#play-window .header_section h2").innerHTML = Game.version.toUpperCase() + " CHECKERS";
    
    if(restart && Game.mode != "two-player-online") {
        start();
        return;
    }
    else if(restart) {
        await LoadBoard(playerA.pieceColor, playerB.pieceColor);
        await UpdatePiecesStatus();
        if(Game.firstMove) {
            //Notify(Game.whiteTurn);
            let id = playerA.pieceColor.slice(0,1);
            Game.possibleMoves = await Iterate({id, state: Game.state, func: AssesMoves});
            await Helper(Game.possibleMoves, JSON.parse(JSON.stringify(Game.state)));
        } 
    } 
    
    async function start () {
        let res = null;
        let btns = $$("#settings-window .three_items button");
        if(Game.rollDice) {
            res = await RollDice();
            Game.whiteTurn = (playerA.pieceColor.includes("White"))? res: !res;
        }
        else {
            Game.whiteTurn = (GetValue(btns[0], "background-image") == other.default);
        } 
        await LoadBoard(playerA.pieceColor, playerB.pieceColor);
        await UpdatePiecesStatus();
        Game.baseState = JSON.parse(JSON.stringify(Game.state));
        if(Game.mode === "single-player") {
            //Notify("AMERICAN CHECKERS<br/>---------------------------------------<br/>" + Game.levels[Game.level-1].level);
            if(Game.whiteTurn && playerB.pieceColor === "White" || !Game.whiteTurn && playerB.pieceColor === "Black") {
            	await Notify({action: "alert_special", 
							  header: "Please Wait!", 
							  message: "Loading..."});
                setTimeout(aiStart, 100);
            }
            else if(Game.helper) {
                let id = playerA.pieceColor.slice(0,1);
                Game.possibleMoves = await Iterate({id, state: Game.state, func: AssesMoves});
                await Helper(Game.possibleMoves, JSON.parse(JSON.stringify(Game.state)));
            } 
        }
        else if(Game.helper && Game.mode === "two-player-offline") {
            let id = (Game.whiteTurn && playerA.pieceColor === "White" || !Game.whiteTurn && playerA.pieceColor === "Black")? playerA.pieceColor.slice(0,1): playerB.pieceColor.slice(0,1);
            Game.possibleMoves = await Iterate({id, state: Game.state, func: AssesMoves});
            await Helper(Game.possibleMoves, JSON.parse(JSON.stringify(Game.state)));
        }
        else if(Game.helper && (Game.whiteTurn && playerA.pieceColor === "White" || !Game.whiteTurn && playerA.pieceColor === "Black")) {
            let id = playerA.pieceColor.slice(0,1);
            Game.possibleMoves = await Iterate({id, state: Game.state, func: AssesMoves});
            await Helper(Game.possibleMoves, JSON.parse(JSON.stringify(Game.state)));
        } 
        
        if(Game.rollDice) {
            if(Game.mode === "single-player") {
                if(res) 
                Notify({action: "alert", 
                        header: "Congrats!", 
                        message: "You've won dice roll. Make the first move"});
                else if(!res) 
                Notify({action: "alert", 
                        header: "Oops!", 
                        message: "You've lost dice roll. wait for your opponent to start."});
            } 
            else {
                let name;
                if(res) 
                    name = playerA.name;
                else
                    name = playerB.name;
                    
                name += "!";
                    
                Notify({action: "alert", 
                        header: "Congrats " + name, 
                        message: "You've won dice roll. Make the first move"});
            } 
        } 
    } 
        
    async function aiStart () {
    	Cancel();
    	for(let cell of $$("#table .valid, #table .pre_valid, #table .hint, .helper_empty, .helper_filled")) { 
            cell.classList.remove("valid");
            cell.classList.remove("pre_valid");
            cell.classList.remove("hint");
            cell.classList.remove("helper_empty");
            cell.classList.remove("helper_filled");
        } 
        let state = Game.state;
    	let id = playerB.pieceColor.substring(0,1);
        let moves = await Iterate({id, state, func: AssesMoves});
        let chosen = (Math.random()*(moves.length - 1)).toFixed(0);
        
        let bestMove = moves[chosen];
        let i = parseInt(bestMove.cell.slice(0,1));
        let j = parseInt(bestMove.cell.slice(1,2));
        let m = parseInt(bestMove.empty.slice(0,1));
        let n = parseInt(bestMove.empty.slice(1,2));
        
        setTimeout( async () => {
            await ValidateMove({cell: $("#table").rows[i].cells[j], i, j, isComputer: true});
            await ValidateMove({cell: $("#table").rows[m].cells[n], i: m, j: n, isComputer: true});
        }, 250);
        return;
    } 
} 

const Alternate = async (color) => {
    //Notify(color);
    playerA.pieceColor = color;
    if(playerA.pieceColor == "White") {
        playerA.pieceColor = 'Black';
        playerB.pieceColor = 'White';
        
        if(playerA.pieceColor == 'White') {
            await Alternate();
        } 
    } 
    else if(playerA.pieceColor == "Black") {
        playerA.pieceColor = 'White';
        playerB.pieceColor = 'Black';
        
        if(playerA.pieceColor == 'Black') {
            await Alternate();
        } 
    } 
    //setTimeout(() => Notify(playerA.pieceColor), 2000);
} 

const RollDice = () => {
    //use while loop indefinitely to get the right value of the roll
    while(true) {
        let res = Math.round(Math.random()*7) + Math.round(Math.random()*7);
        if(res == 7 || res == 11)
        return true; 
        else if(res == 2 || res == 3 || res == 12) 
        return false;
    } 
}

const BackState = {
    state: [], 
    moves: []
} 

// Game object 
const Game = {
	worker: new Worker("Checkers Web Worker.js"), 
    mode: "single-player",
    version: "american",
    versions: {american: [{score: 3, validForHint: true}],
               kenyan: [{score: 3, validForHint: true}],
               international: [{score: 3, validForHint: true}],
               pool: [{score: 3, validForHint: true}],
               russian: [{score: 3, validForHint: true}],
               nigerian: [{score: 3, validForHint: true}]
               }, 
    boardSize: 8,
    rowNo: 3,
    level: 1,
    count: 1,
    countMoves: 0,
    top: -5,
    path: {index: 0},
    pieceSelected: false, 
    thinking: false,
    alternatePlayAs: false, 
    whiteTurn: false,
    mandatoryCapture: true, 
    helper: true, 
    capturesHelper: false, 
    over: false, 
    validForHint: true, 
    prop: null, 
    levels: [{level: "BEGINNER LEVEL", validForHint: true, score: 0}, 
             {level: "EASY LEVEL", validForHint: true, score: 0}, 
             {level: "MEDIUM LEVEL", validForHint: true, score: 0}, 
             {level: "HARD LEVEL", validForHint: true, score: 0}, 
             {level: "ADVANCED LEVEL", validForHint: true, score: 0}, 
             {level: "EXPERT LEVEL", validForHint: true, score: 0}, 
             {level: "CANDIDATE MASTER", validForHint: true, score: 0}, 
             {level: "MASTER LEVEL", validForHint: true, score: 0}, 
             {level: "GRAND MASTER", validForHint: true, score: 0}], 
    state: [], 
    baseState: [], 
    possibleMoves: [], 
    possibleCaptures: [], 
    track: [], 
    stats: []
} 

const Player = function () {
    this.name = "";
    this.pieces = (Game.boardSize / 2) * Game.rowNo;
    this.pieceColor = "";
    this.kings = 0;
    this.moves = 0;
    this.captures = 0;
    this.longestCapture = 0;
} 
const playerA = new Player();
const playerB = new Player();
// Initializing players details 
playerA.pieceColor = "White";
playerA.name = "You";
playerB.pieceColor = "Black";
playerB.name = "AI";

function Prms (value) {
	return new Promise(resolve => {return resolve(value)});
} 
const GetValue = function (elem, value, pseudo = null) {
    return window.getComputedStyle(elem, pseudo).getPropertyValue(value);
}

const RGBValueOf = (hex) => {
    hex = hex.replace("#", "");
    if(hex.length === 3) {
        let newHex = "";
        for(let x of hex) {
            newHex += x + x;
        }
        hex = newHex;
    }
    
    rgb = "rgb(";
    
    rgb += parseInt(hex.slice(0,2), 16) + ", ";
    rgb += parseInt(hex.slice(2,4), 16) + ", ";
    rgb += parseInt(hex.slice(4,6), 16) + ")";
    
    return rgb;
}

const GetPosition = function (child, parent = document.body) {
    parent = child.parentNode;
    
    let childTop = parseInt(GetValue(child, "margin-top")), //+ (0.75 * (Game.boardSize - parent.parentNode.rowIndex - 1)), 
        childLeft  = parseInt(GetValue(child, "margin-left")), //+ (0.75 * (Game.boardSize - parent.cellIndex - 1)), 
        parentTop = getOffset(true, parent.parentNode.rowIndex),
        parentLeft  = getOffset(false, parent.parentNode.rowIndex, parent.cellIndex), 
        apparentTop = parentTop + childTop, 
        apparentLeft  = parentLeft + childLeft;
        
    //apparentTop = apparentTop / $("#table").clientHeight * 100;
    //apparentLeft = apparentLeft / $("#table").clientWidth * 100;
    
    this.top = apparentTop; 
    this.left = apparentLeft;
    
    //alert(apparentTop + "\n" + apparentLeft + "\nTable size: " + $("#table").clientHeight);
   
    function getOffset(isRow, m, n) {
        let rows = $("#table").rows;
        let offset = 0;
        let length = 0;
        let i = 0;
        if(isRow) {
            while(i < Game.boardSize) {
                if(i < m) 
                    offset += rows[i].clientHeight;
                length += rows[i].clientHeight;
                i++;
            } 
        }
        else {
            let cells = rows[m].cells;
            while(i < Game.boardSize) {
                if(i < n) 
                    offset += cells[i].clientWidth;
                length += rows[i].clientHeight;
                i++;
            } 
        }
        
        // due to unexplained reasons, chrome total length of the cells is greater by 2 pixels on the actual width of the table 
        if(length > $("#table").clientWidth && screen.orientation.type.toLowerCase().includes("portrait")) {
            if(isRow) {
                offset = length / Game.boardSize * m;
                offset -= m > Game.boardSize / 2? 0.5 * (m - (Game.boardSize / 2)): 0;
            } 
            else {
                offset = length / Game.boardSize * n;
                offset -= n > Game.boardSize / 2? 0.5 * (n - (Game.boardSize / 2)): 0;
            } 
        }
        else if(screen.orientation.type.toLowerCase().includes("landscape")) {
            //offset += 0.5;
        } 
        return offset;
    } 
} 

const Move = async (prop) => {
    let scene = $("#transmitter");
    let moving = $$("#transmitter .outer");
    let root = document.documentElement;
    
    if(moving.length === 0 && prop.select) {
        select(prop);
        return;
    }
    else if(moving.length === 0 && prop.movePiece) {
        makePath(prop);
    } 
    else if(moving.length === 0 && prop.capture) { 
    	select(prop);
    	return;
    }
    else if(moving.length === 0 && prop.captureMove) {
    	let final = false;
    	let validMove = false;
    	// Remove Helper cells for filtering purposes 
    	for(let cell of $$("#table .helper_empty, #table .pre_valid")) {
    		cell.classList.remove("helper_empty");
    		cell.classList.remove("pre_valid");
    	} 
    	for(let sort of prop.sorted) {
    		for(let move of sort) {
    			let empty = `${prop.i}${prop.j}`;
    			if((!Game.path.sort || JSON.stringify(Game.path.sort.slice(0, Game.path.sort.indexOf(move))) == JSON.stringify(sort.slice(0, sort.indexOf(move)))) && move.empty == empty) {
    				Game.path = {sort, index: sort.indexOf(move)};
    				validMove = true;
					for(let move2 of sort.slice(0, sort.indexOf(move) + 1)) {
						let cell = $("#table").rows[parseInt(move2.empty.slice(0,1))].cells[parseInt(move2.empty.slice(1,2))];
						cell.classList.remove("helper_empty");
						cell.classList.remove("pre_valid");
						cell.classList.remove("invalid");
				        cell.classList.add("valid");
						cell.style.pointerEvents = "none";
						if(cell.lastChild)
							cell.removeChild(cell.lastChild);
					}
    				$$(".controls")[1].style.pointerEvents = "none";
                    $$(".horiz_controls")[1].style.pointerEvents = "none";
					
    				if(sort.indexOf(move) != sort.length-1) {
    					let clone = Game.prop.cell.lastChild.cloneNode(true);
	    				clone.style.opacity = "0.5";
				        prop.cell.appendChild(clone);
						Game.prop.cell.style.pointerEvents = "none";
						
    					if(Game.mode === "two-player-online" && (Game.whiteTurn && playerA.pieceColor === "White" || !Game.whiteTurn && playerA.pieceColor === "Black") ) {
				            Publish({channel: Lobby.CHANNEL, message: {title: "Moved", content: {i: prop.i, j: prop.j} } });
				        }
    				} 
    				else {
						final = true;
    				} 
    			}
    			//Filter helper cells
    			if(!(Game.mode == "single-player" && (Game.whiteTurn && playerB.pieceColor == "White" || !Game.whiteTurn && playerB.pieceColor == "Black")) && (!Game.path.sort || (Game.helper || Game.capturesHelper) && sort.indexOf(move) > Game.path.index && JSON.stringify(Game.path.sort.slice(0, Game.path.sort.indexOf(move))) == JSON.stringify(sort.slice(0, sort.indexOf(move))))) {
    				let m = parseInt(move.empty.slice(0,1));
					let n = parseInt(move.empty.slice(1,2));
					let cell = $("#table").rows[m].cells[n];
					if(Game.helper || Game.capturesHelper) 
						cell.classList.add("helper_empty");
					else
						cell.classList.add("pre_valid");
    			} 
    		}
			if(final) {
				for(let move of Game.path.sort) {
					let i = parseInt(move.empty.slice(0,1));
					let j = parseInt(move.empty.slice(1,2));
					let cell1 = $("#table").rows[i].cells[j];
					let clone = cell1.lastChild;
					if(!cell1.lastChild) {
						clone = Game.prop.cell.lastChild.cloneNode(true);
						clone.style.opacity = "0";
			        	cell1.appendChild(clone);
					} 
					
					let m = parseInt(move.cell.slice(0,1));
					let n = parseInt(move.cell.slice(1,2));
					let cell2 = $("#table").rows[m].cells[n];
					cell2.style.pointerEvents = "none";
					
					await select({cell: cell2, i: m, j: n}, true);
					let track2 = await makePath({cell: cell1, piece: clone, i, j}, true);
					track2.a = parseInt(move.capture.slice(0,1));
					track2.b = parseInt(move.capture.slice(1,2));
					Game.track.push([Game.prop, track2]);
				}
				// removing valid cell states
				for(let move of Game.path.sort) {
					let i = parseInt(move.empty.slice(0,1));
					let j = parseInt(move.empty.slice(1,2));
					let cell1 = $("#table").rows[i].cells[j];
					cell1.classList.remove("valid");
				} 
				startMoving();
				break;
			} 
    	}
    	return validMove;
    }
   
   async function startMoving(n = 0) {
   	Game.prop = Game.track[n][0];
   	let prop = Game.track[n][1];
   	prop.n = n;
   	if(n == Game.track.length-1) {
   		Game.path = {index: 0};
   		prop.final = true;
   	} 
   	attachToScene(prop, true);
   }
        
        
    async function select (prop, capture = false) { //try {
        if(Game.mode === "two-player-online" && (Game.whiteTurn && playerA.pieceColor === "White" || !Game.whiteTurn && playerA.pieceColor === "Black") ) {
            Publish({channel: Lobby.CHANNEL, message: {title: "Moved", content: {i: prop.i, j: prop.j} } });
        }
        
        if(moving.length > 0) {
            await DetachFromScene();
        } 
       
        if(!capture)
	        for(let cell of $$("#table .valid, #table .pre_valid, #table .hint, .helper_empty, .helper_filled")) {
	            cell.classList.remove("valid");
	            cell.classList.remove("pre_valid");
	            cell.classList.remove("hint");
	            cell.classList.remove("helper_empty");
	            cell.classList.remove("helper_filled");
	        } 
        
        
        scene.style.display = "table";
        let piece = prop.cell.lastChild;
        let pos = new GetPosition(piece, $("#table"));
        let x1 = pos.left;
        let y1 = pos.top;
        let h1 = piece.offsetHeight; 
        let w1 = piece.offsetWidth; 
        scene.style.display = "none";
        Game.pieceSelected = true;
        Game.prop = {cell: prop.cell, x1, y1, h1, w1, i: prop.i, j: prop.j};
        
        prop.cell.classList.add("valid");
        return Prms(true);
        //} catch (error) {Notify({action: "alert", header: "Error 0!", message: error});} 
    } 
    
    function makePath (prop, capture = false) { //try {
        scene.style.display = "table";
        if(!capture) 
        	Game.prop.cell.classList.remove("valid");
        let clone = prop.cell.lastChild || Game.prop.cell.lastChild.cloneNode(true);
        if(prop.cell.children.length == 0) {
	        clone.style.opacity = "0.5";
	        prop.cell.appendChild(clone);
		} 
        
        let pos = new GetPosition(clone, $("#table"));
        let x2 = pos.left - Game.prop.x1;
        let y2 = pos.top - Game.prop.y1;
        scene.style.display = "none";
        if(!capture)
            attachToScene({cell1: Game.prop.cell, cell2: prop.cell, x2, y2, i: prop.i, j: prop.j});
        else {
        	return {cell1: Game.prop.cell, cell2: prop.cell, x2, y2, i: prop.i, j: prop.j};
        } 
        //} catch (error) {Notify({action: "alert", header: "Error 1!", message: error});} 
    } 
    
    function attachToScene (prop, capture = false) { //try {
        let piece = Game.prop.cell.lastChild;
        Game.prop.cell.removeChild(piece);
        scene.style.display = "table";
        scene.appendChild(piece);
        piece.classList.add("outer");
        piece.style.height = Game.prop.h1.toFixed(16) + "px";
        piece.style.width = Game.prop.w1.toFixed(16) + "px";
        piece.style.margin = "0px";
        piece.style.top = `${Game.prop.y1}px`;
        piece.style.left = `${Game.prop.x1}px`;
        piece.style.boxShadow = piece.className.includes("black")? `0 var(--shadow-width) 0 0 #1A1A1A`: `0 var(--shadow-width) 0 0 #999999`;
        root.style.setProperty('--ept', prop.y2.toFixed(16) + "px");
        root.style.setProperty('--epl', prop.x2.toFixed(16) + "px");
        let mt = 0.4;
        let id = Game.state[Game.prop.i][Game.prop.j].substring(1,2);
        let angle = parseInt(GetValue(root, "--angleZ" + id));
        root.style.setProperty("--angleZP", angle + "deg");
        
        if(capture) {
        	let increase = mt * 0.25;
        	let no_of_cells = Math.abs(Game.prop.i - prop.i);
        	for(let i = 1; i < no_of_cells; i++) {
        		mt += increase;
        	} 
        	root.style.setProperty("--mt", mt + "s");
        } 
        else {
        	root.style.setProperty("--mt", mt + "s");
        } 
       
        if(screen.orientation.type.toLowerCase().includes("landscape")) {
        	mt += mt * 0.25;
        	root.style.setProperty("--mt", mt + "s");
        } 
        
        prop.cell2.removeChild(prop.cell2.lastChild);
        
        other.prop = prop;
        other.capture = capture;
        
        piece.addEventListener('animationend', detachFromScene, false);
        piece.classList.remove("move");
        void piece.offsetWidth;
        void piece.offsetHeight;
        piece.classList.add("move");
        
        //} catch (error) {Notify({action: "alert", header: "Error 2!", message: error});} 
    } 
    
    async function detachFromScene () { 
        let prop = other.prop;
        Game.pieceSelected = false;
        //try {
        if(Game.prop != null && prop != null) {
            for(let cell of $$("#table .valid, #table .pre_valid, #table .hint, .helper_empty, .helper_filled")) {
                cell.classList.remove("valid");
                cell.classList.remove("pre_valid");
                cell.classList.remove("hint");
                cell.classList.remove("helper_empty");
                cell.classList.remove("helper_filled");
            } 
            other.helperPath = [];
            let piece = scene.lastChild;
            scene.removeChild(piece);
            scene.style.display = "none";
            piece.classList.remove("move", "outer"); 
            piece.removeEventListener("animationend", detachFromScene, false);
            void piece.offsetWidth;
            void piece.offsetHeight;
           
            prop.cell2.appendChild(piece);
            piece.style.height = "var(--piece_size)";
            piece.style.width  = "var(--piece_size)";
            piece.style.margin = "auto";
            piece.style.marginTop = "calc(calc(100% - var(--piece_size)) / 2 - var(--shadow-width))";
            
            if(screen.orientation.type.toLowerCase().includes("landscape")) {
                root.style.setProperty("--piece_size", "80%");
            }
            else {
                root.style.setProperty("--piece_size", "85%");
            }
            
            prop.cell = prop.cell2;
            prop.piece = piece;
            
            // Updating moves made by the player
            if(!other.capture || prop.final) {
                if(piece.className.includes(playerA.pieceColor.toLowerCase())) 
                	playerA.moves++;
                else
                	playerB.moves++;
            } 
            
            if((Game.version !== "russian" && prop.final || Game.version === "russian" && other.capture || Game.version === "pool" && other.capture || !other.capture) && !piece.className.includes("crown") && (prop.i === 0 && piece.className.includes(playerA.pieceColor.toLowerCase()) || prop.i === Game.boardSize - 1 && piece.className.includes(playerB.pieceColor.toLowerCase()))) {
                if(piece.className.includes("white")) {
                    piece.classList.add("crown_white");
                } 
                else {
                    piece.classList.add("crown_black");
                }
               
                prop.piece = piece;
                prop.king = true; 
                
                // Updating players kings made stats
                if(piece.className.includes(playerA.pieceColor.toLowerCase()))
                playerA.kings++;
                else
                playerB.kings++;
            }  
            
            if((other.capture && prop.final || !other.capture) && Game.mode === "two-player-online" && (Game.whiteTurn && playerA.pieceColor === "White" || !Game.whiteTurn && playerA.pieceColor === "Black") ) {
                Publish({channel: Lobby.CHANNEL, message: {title: "Moved", content: {i: prop.i, j: prop.j} } });
            } 
            
            // Updating Game state
            piece = Game.state[Game.prop.i][Game.prop.j];
            if(!piece.includes("K") && ((Game.version !== "russian" && prop.final || Game.version === "russian" && other.capture || Game.version === "pool" && other.capture || !other.capture))) 
                piece = await (prop.i === 0 && piece.includes(playerA.pieceColor.slice(0,1)) || prop.i === Game.boardSize - 1 && piece.includes(playerB.pieceColor.slice(0,1)))? piece.replace("M", "K"): piece;
            Game.state[Game.prop.i][Game.prop.j] = "EC";
            Game.state[prop.i][prop.j] = piece;
            
            if(!other.capture) {
                // Changing turn
                Game.whiteTurn = !Game.whiteTurn;
                let id;
                id = (piece.includes("W"))? "B":"W";
                let initProp = Game.prop;
                
                id = id.replace(/[MK]/g, "");
                let over = await isOver(id);
                if(over)
                    return;
                else { // Game not over
                    BackState.moves.push([initProp, prop]);
                    if(Game.helper) {
                        prop.cell1.classList.add("valid");
                        prop.cell2.classList.add("valid");
					} 
                    if(prop.king) {
                        Play("king", 1);
                    } 
                    else {
                        Play("click", 0.1);
                    } 
                    
                    if(Game.mode === "single-player" && (Game.whiteTurn && playerB.pieceColor === "White" || !Game.whiteTurn && playerB.pieceColor === "Black") ) {
                        UpdatePiecesStatus("thinking...");
                        setTimeout( async () => {
                            let id = playerB.pieceColor.substring(0,1);
                            let state = JSON.parse(JSON.stringify(Game.state));
                            let moves = Game.possibleCaptures;
                            if(moves.length == 0)
                                moves = Game.possibleMoves;
                            
                            let ai = new AI({state, moves, depth: Game.level});
                            await ai.makeMove();
                            ai = null;
                        }, 1);
                    }
                    if(Game.possibleCaptures.length) {
                    	if(!Game.mandatoryCapture) {
                    		Game.possibleMoves = await Iterate({id, state: Game.state, func: AssesMoves});
                    		await Helper(Game.possibleMoves.concat(Game.possibleCaptures), JSON.parse(JSON.stringify(Game.state)));
                    		await Helper(Game.possibleCaptures, JSON.parse(JSON.stringify(Game.state)));
                    	}
                    	else
                    		Helper(Game.possibleCaptures, JSON.parse(JSON.stringify(Game.state)));
                    }
                    else if(Game.mode == "two-player-offline" || (Game.mode === "single-player" || Game.mode === "two-player-online") && Game.whiteTurn && playerA.pieceColor === "White" || !Game.whiteTurn && playerA.pieceColor === "Black") {
                    	Helper(Game.possibleMoves, JSON.parse(JSON.stringify(Game.state)));
                    } 
                } // End of else if isOver 
            } // End of if other.capture
            else {
                if(!prop.final) {
                    // Getting the table position to aid undo in the array
                    let i = prop.a;
                    let j = prop.b;
                    
                    // Removing the captured piece
                    let id = Game.state[i][j];
                    Game.state[i][j] = "EC";
                    
                    if(!prop.king) {
                        Play("capture", 1);
                    }
                    
                    setTimeout (_=> startMoving(prop.n+1), 1);
                } 
                else if(prop.final) {
                    //Enabling the undo buttons
                    $$(".controls")[1].style.pointerEvents = "auto";
                    $$(".horiz_controls")[1].style.pointerEvents = "auto";
                    
                    // Getting the table position to aid undo in the array
                    let i = prop.a;
                    let j = prop.b;
                    
                    // Removing the captured piece
                    let id = Game.state[i][j];
                    Game.state[i][j] = "EC";
                    
                    // Updating player's Longest capture stats 
                    if(piece.includes(playerA.pieceColor.slice(0,1)))
                        playerA.longestCapture = Math.max(Game.track.length, playerA.longestCapture);
                    else
                        playerB.longestCapture = Math.max(Game.track.length, playerB.longestCapture);
                    
                    // Changing turn
                    Game.whiteTurn = !Game.whiteTurn;
                    
                    // Checking if Game is over
                    id = (piece.includes("W"))? "B":"W";
                    let over = await isOver(id);
                    if(over)
                        return;
                    else {
                        // Marking the initial steps including the initial place the piece was marked
                        let captures = [];
                        for(let track of Game.track) {
                            //marking the moves made
                            if(Game.helper || Game.capturesHelper) {
                                track[0].cell.classList.add("valid");
                                track[1].cell.classList.add("valid");
							} 
                            track[0].cell.style.pointerEvents = "auto";
                            track[1].cell.style.pointerEvents = "auto";
                            // Getting the table position to aid undo in the array
                            i = track[1].a;
                            j = track[1].b;
                            let capturedPiece = $("#table").rows[i].cells[j].firstChild;
                            
                            id = (capturedPiece.className.includes("white"))? "W": "B";
                            id = ((capturedPiece.className.includes("crown"))? "K": "M") + id;
                            // storing information for undo purposes 
                            captures.push([capturedPiece, i, j, id]);
                            
                            // adding fading animation effect to the captured piece
                            capturedPiece.addEventListener("animationend", End, false);
                            capturedPiece.classList.add("captured");
                        } 
                        
                        BackState.moves.push([Game.track[0][0], prop, captures]);
                        
                        //Playing audios
                        if(!prop.king && Game.track.length > 1) {
                            Play("collect", 0.5);
                        } 
                        else if(!prop.king) {
                            Play("capture", 1);
                        } 
                        else {
                            Play("king", 1);
                        } 
                            
                        Game.track = [];
                        
                        if(Game.mode === "single-player" && (Game.whiteTurn && playerB.pieceColor === "White" || !Game.whiteTurn && playerB.pieceColor === "Black") ) {
                            UpdatePiecesStatus("thinking...");
                            setTimeout( async () => {
                                let id = playerB.pieceColor.substring(0,1);
                                let state = JSON.parse(JSON.stringify(Game.state));
                                let moves = Game.possibleCaptures;
                                if(moves.length == 0)
                                    moves = Game.possibleMoves;
                                
                                let ai = new AI({state, moves, depth: Game.level});
                                await ai.makeMove();
                                ai = null;
                            }, 1);
                        }
                        
                        if(Game.possibleCaptures.length) {
                        	if(!Game.mandatoryCapture) {
                        		Game.possibleMoves = await Iterate({id, state: Game.state, func: AssesMoves});
                        		await Helper(Game.possibleMoves.concat(Game.possibleCaptures), JSON.parse(JSON.stringify(Game.state)));
                        		await Helper(Game.possibleCaptures, JSON.parse(JSON.stringify(Game.state)));
                        	}
                        	else
                        		Helper(Game.possibleCaptures, JSON.parse(JSON.stringify(Game.state)));
                        }
                        else if(Game.mode == "two-player-offline" || (Game.mode === "single-player" || Game.mode === "two-player-online") && Game.whiteTurn && playerA.pieceColor === "White" || !Game.whiteTurn && playerA.pieceColor === "Black") {
                        	Helper(Game.possibleMoves, JSON.parse(JSON.stringify(Game.state)));
                        } 
                    } // end of else if isOver
                } // end of if is prop.final
            } // End of if other.capture
        } 
        return;
        //} catch (error) {Notify({action: "alert", header: "Error 3!", message: error});} 
    } 
    
    async function isOver (id) {
        Game.possibleCaptures = await Iterate({id, state: Game.state, func: AssesCaptures});
        
        if(Game.possibleCaptures.length > 0) {
            Game.possibleCaptures = await RemoveUnwantedCells({captures: Game.possibleCaptures, state: Game.state});
            
            if(Game.mandatoryCapture) 
            await UpdatePiecesStatus("Mandatory Capture!");
            else
            await UpdatePiecesStatus("Captures Available!");
            Game.countMoves = playerA.moves;
        } 
        else {
            //Calling this method to update the players pieces to help ascertain if game is over
            await UpdatePiecesStatus();
            // Checking if its a draw
            if((playerA.moves - Game.countMoves) == 2) { 
                if(JSON.stringify(Game.baseState) == JSON.stringify(Game.state)) {
                    if(Game.count === 2) {
                        GameOver(true);
                        return;
                    } 
                    else 
                        Game.count++;
                } 
                else {
                    Game.count = 1;
                    Game.baseState = JSON.parse(JSON.stringify(Game.state));
                } 
                Game.countMoves = playerA.moves;
            } 
            // Checking if game is over
            Game.possibleMoves = await Iterate({id, state: Game.state, func: AssesMoves});
            if(playerA.pieces === 0 || playerB.pieces === 0 || Game.possibleMoves.length === 0) {
                GameOver();
                return Prms(true);
            } 
        } 
        return Prms(false);
    } 
} 

const ValidateMove = async (prop) => {
    /** To determine turn taking, will use Game.whiteTurn property of the Game object
      * If true is white's turn else black's turn
      * Will confirm possible captures and moves and game x1 and y1 to validate piece selections for move
      **/
    if(!Game.over) {
    	let isEmpty = prop.cell.lastChild && prop.cell.lastChild.className.includes("captured") || prop.cell.children.length == 0;
        let valid = isEmpty && Game.pieceSelected || !isEmpty && (Game.mode === "two-player-offline" && (Game.whiteTurn && prop.cell.lastChild.className.includes("piece_white") || !Game.whiteTurn && prop.cell.lastChild.className.includes("piece_black")) || prop.isComputer && prop.cell.lastChild.className.includes(playerB.pieceColor.toLowerCase()) || Game.whiteTurn && prop.cell.lastChild.className.includes("piece_white") && playerA.pieceColor == "White" || !Game.whiteTurn && prop.cell.lastChild.className.includes("piece_black") && playerA.pieceColor == "Black");
        
        if(valid) {
            let id = Game.state[prop.i][prop.j];
            let posId = `${prop.i}${prop.j}`; //posId for position identifier
            
            if(Game.possibleCaptures.length > 0 && !isEmpty) {
                for(let type of Game.possibleCaptures) {
                    if(type.cell == posId) {
                        prop.capture = true;
                        Move(prop);
                        if(other.helperPath.length > 0) { 
                            let indices = [], 
                                startIndex = -1,
                                lastIndex = -1;
                            for(let cell of other.helperPath) {
                                if(cell.source) 
                                indices.push(other.helperPath.indexOf(cell));
                            } 
                            for(let index of indices) {
                                if(startIndex != -1 && other.helperPath[index].cell !== type.cell) {
                                    lastIndex = index
                                    break;
                                } 
                                if(startIndex == -1 && other.helperPath[index].cell === type.cell) {
                                    startIndex = index;
                                } 
                            } 
                            lastIndex = (lastIndex === -1)? other.helperPath.length: lastIndex;
                            other.capturePath = JSON.parse(JSON.stringify(other.helperPath.slice(startIndex, lastIndex)));
                            if(Game.helper || Game.capturesHelper) 
	                            if(Game.mode == "two-player-offline" || (Game.mode == "single-player" || Game.mode == "two-player-online") && Game.whiteTurn && playerA.pieceColor === "White" || !Game.whiteTurn && playerA.pieceColor === "Black") {
		                            for(let cell of other.capturePath) {
		                                $("#table").rows[cell.m].cells[cell.n].classList.add("helper_empty");
		                            }
								}
                            return;
                        } 
                    } 
                } 
                if(Game.mandatoryCapture) {
                    if(!isEmpty) {
                        /**
                          * resetting animation 
                          **/
                        prop.cell.classList.remove("invalid");
                        void prop.cell.offsetWidth;
                        prop.cell.classList.add("invalid");
                        Notify("You must capture");
                        setTimeout(() => {
							prop.cell.classList.remove("invalid");
						}, 750);
                    } 
                    return;
                } 
            } 
           else if(Game.possibleCaptures.length > 0 && isEmpty) {
           	prop.sorted = await SortCaptures(other.capturePath);
           	prop.captureMove = true;
           	let validMove = await Move(prop);
           	if(validMove) return;
           } 
            
           if(!isEmpty) {
                Game.possibleMoves = await AssesMoves({id, i: prop.i, j: prop.j, state: Game.state});
                if(Game.possibleMoves.length > 0) {
                	prop.select = true;
                    Move(prop);
                    return;
                } 
            } 
            else {
                for(let type of Game.possibleMoves) {
                    if(type.empty == posId && type.cell == `${Game.prop.i}${Game.prop.j}`) {
                    	prop.movePiece = true;
                        Move(prop);
                        return;
                    } 
                } 
            } 
            if(!isEmpty) {
                /**
                  * resetting animation 
                  **/
                prop.cell.classList.remove("invalid");
                void prop.cell.offsetWidth;
                prop.cell.classList.add("invalid");
                setTimeout(() => {
					prop.cell.classList.remove("invalid");
				}, 500);
            } 
        } 
    } 
    else {
        GameOver();
    } 
} 

const UpdatePiecesStatus = (string = null) => {
    let barA = $("#play-window .footer_section pre"); // bar representing the status bar on portrait mode
    let barB = $(".face_bottom pre"); // status bar for landscape mode
    if(string != null) {
        barA.innerHTML = string;
        barB.innerHTML = string;
    } 
    else {
        countPieces();
        if(Game.mode === "single-player") { try {
            let label = $$("#play-window .footer_section p label");
            if(Game.validForHint) {
               let threshold = Math.floor((Game.boardSize / 2 * Game.rowNo) / 4);
               if(playerA.pieces < threshold) {
                   label[0].classList.remove("not_achieved", "achieved");
                   label[1].classList.remove("not_achieved", "achieved");
                   label[2].classList.remove("not_achieved", "achieved");
                   label[0].classList.add("not_achieved");
                   label[1].classList.add("not_achieved");
                   label[2].classList.add("not_achieved");
               }
               else if(playerA.pieces >= threshold && playerA.pieces < threshold * 2) {
                   label[0].classList.remove("not_achieved", "achieved");
                   label[1].classList.remove("not_achieved", "achieved");
                   label[2].classList.remove("not_achieved", "achieved");
                   label[0].classList.add("achieved");
                   label[1].classList.add("not_achieved");
                   label[2].classList.add("not_achieved");
               }
               else if(playerA.pieces >= threshold * 2 && playerA.pieces < threshold * 3) {
                   label[0].classList.remove("not_achieved", "achieved");
                   label[1].classList.remove("not_achieved", "achieved");
                   label[2].classList.remove("not_achieved", "achieved");
                   label[0].classList.add("achieved");
                   label[1].classList.add("achieved");
                   label[2].classList.add("not_achieved");
               }
               else if(playerA.pieces >= threshold * 3) {
                   label[0].classList.remove("not_achieved", "achieved");
                   label[1].classList.remove("not_achieved", "achieved");
                   label[2].classList.remove("not_achieved", "achieved");
                   label[0].classList.add("achieved");
                   label[1].classList.add("achieved");
                   label[2].classList.add("achieved");
               }
            }
            else {
                label[0].classList.remove("not_achieved", "achieved");
                label[1].classList.remove("not_achieved", "achieved");
                label[2].classList.remove("not_achieved", "achieved");
                label[0].classList.add("not_achieved");
                label[1].classList.add("not_achieved");
               label[2].classList.add("not_achieved");
            } } catch (error) {Notify(error + "");}
            barA.innerHTML = `${playerA.pieceColor}: ${playerA.pieces}        ${playerB.pieceColor}: ${playerB.pieces}`
            barB.innerHTML = `${playerA.pieceColor}: ${playerA.pieces}        ${playerB.pieceColor}: ${playerB.pieces}`
        } 
        else {
            barA.innerHTML = `${playerA.name} (${playerA.pieceColor.toUpperCase()}): ${playerA.pieces}        ${playerB.name} (${playerB.pieceColor.toUpperCase()}): ${playerB.pieces}`;
            barB.innerHTML = `${playerA.pieceColor.toUpperCase()}: ${playerA.pieces}        ${playerB.pieceColor.toUpperCase()}: ${playerB.pieces}`;
        }
    } 
    
    function countPieces () {
        let id1 = playerA.pieceColor.slice(0,1);
        let id2 = playerB.pieceColor.slice(0,1);
        playerA.pieces = playerB.pieces = 0;
        
        for(let row of Game.state) {
            for(let id of row) {
                if(id.includes(id1)) 
                playerA.pieces++;
                else if(id.includes(id2))
                playerB.pieces++;
            } 
        } 
    } 
} 

const GameOver = async (isDraw = false) => { try {
    /** Based on the property whiteTurn of the Game object, we can compare it against the player's piece color to identify whose turn was. 
      * The player identified is the loser
      */
    let name = (Game.whiteTurn && playerA.pieceColor.includes("White") || !Game.whiteTurn && playerA.pieceColor.includes("Black"))? playerA.name: playerB.name;
    isDraw = (playerA.pieces === playerB.pieces && playerA.pieces === Game.boardSize / 2 * Game.rowNo)? true: isDraw;
    other.pressed = false;
    
    if(Game.mode === "single-player") {
        if(!Game.over && !isDraw) {
            if(name === playerA.name) {
                Play("game_lose", 1);
            } 
            else {
                Play("game_win", 1);
            } 
        } 
        if(name === playerA.name && !isDraw)
            Notify({action: "confirm", 
                    header: "YOU LOSE!", 
                    message: "Try Again :-)", 
                    type: "MENU/REPLAY", 
                    icon: Icons.loserIcon, 
                    iconType: "loser", 
                    onResponse: GameOverOption});
        else if(isDraw) {
            if(playerA.pieces != Game.boardSize / 2 * Game.rowNo) {
                Notify({action: "other", 
                        header: "DRAW!", 
                        message: "If you don't accept, press continue", 
                        type: "MENU/CONTINUE/REPLAY", 
                        icon: Icons.drawIcon, 
                        iconType: "draw", 
                        onResponse: GameOverOption});
            } 
            else {
                Notify({action: "confirm", 
                    header: "DRAW!", 
                    message: "Try Again :-)", 
                    type: "MENU/REPLAY", 
                    icon: Icons.drawIcon,
                    iconType: "draw", 
                    onResponse: GameOverOption});
            } 
        } 
        else { 
            if(Game.validForHint) {
                let labels = $$("#levels #nav div")[Game.level-1].children[1].children;
                let score = Game.levels[Game.level-1].score;
                
                // only change when there is an improvement
                if(score < playerA.pieces) {
                    let threshold = Math.floor((Game.boardSize / 2 * Game.rowNo) / 4);
                    if(playerA.pieces >= threshold && playerA.pieces < threshold * 2) {
                        labels[2].classList.remove("not_achieved", "achieved");
                        labels[2].classList.add("achieved");
                    }
                    else if(playerA.pieces >= threshold * 2 && playerA.pieces < threshold * 3) {
                        labels[2].classList.remove("not_achieved", "achieved");
                        labels[1].classList.remove("not_achieved", "achieved");
                        labels[2].classList.add("achieved");
                        labels[1].classList.add("achieved");
                    }
                    else if(playerA.pieces >= threshold * 3) {
                        labels[2].classList.remove("not_achieved", "achieved");
                        labels[1].classList.remove("not_achieved", "achieved");
                        labels[0].classList.remove("not_achieved", "achieved");
                        labels[2].classList.add("achieved");
                        labels[1].classList.add("achieved");
                        labels[0].classList.add("achieved");
                    }
                }
                
                score = Math.max(playerA.pieces, score);
                Game.levels[Game.level-1].score = score;
            }
            let level = Game.level;
            await Level(false);
            Notify({action: (level < Game.levels.length)? "other": "confirm", 
                    header: "YOU WIN!", 
                    message: "Congratulations!",
                    type: (level < Game.levels.length)? "MENU/REPLAY/NEXT LEVEL": "MENU/REPLAY", 
                    icon: Icons.winnerIcon,
                    iconType: "winner", 
                    onResponse: GameOverOption});
        }
    } 
    else if(Game.mode === "two-player-offline") {
        if(!Game.over && !isDraw)
            Play("game_win", 1);
        
        if(!isDraw) {
            Notify({action: "confirm", 
                    header: (name === playerA.name)? playerB.name.toUpperCase(): playerA.name.toUpperCase() + " WINS!", 
                    message: "Congratulations!",
                    type: "MENU/REPLAY", 
                    icon: Icons.winnerIcon,
                    iconType: "winner", 
                    onResponse: GameOverOption});
        }
        else if(!isDraw) {
            if(playerA.pieces != playerB.pieces) {
                Notify({action: "other", 
                        header: "DRAW!", 
                        message: "If you don't accept, press continue", 
                        type: "MENU/CONTINUE/REPLAY", 
                        icon: Icons.drawIcon,
                        iconType: "draw", 
                        onResponse: GameOverOption});
            } 
            else {
                Notify({action: "confirm", 
                    header: "DRAW!", 
                    message: "Try Again :-)", 
                    type: "MENU/REPLAY", 
                    icon: Icons.drawIcon,
                    iconType: "draw", 
                    onResponse: GameOverOption});
            } 
        }
    } 
    else if(Game.mode === "two-player-online") {
        if(!Game.over && !isDraw) {
            if(name === playerA.name) {
                Play("game_lose", 1);
            } 
            else {
                Play("game_win", 1);
            } 
        } 
        if(name === playerA.name && !isDraw)
            Notify({action: "confirm", 
                    header: "YOU LOSE!", 
                    message: "You might want to rematch :-)", 
                    type: "MENU/REPLAY", 
                    icon: Icons.loserIcon, 
                    iconType: "loser", 
                    onResponse: GameOverOption});
        else if(isDraw) {
            if(playerA.pieces != playerB.pieces) {
                Notify({action: "other", 
                        header: "DRAW!", 
                        message: "If you don't accept, press continue.", 
                        type: "MENU/CONTINUE/REPLAY", 
                        icon: Icons.drawIcon,
                        iconType: "draw", 
                        onResponse: GameOverOption});
            } 
            else {
                Notify({action: "confirm", 
                    header: "DRAW!", 
                    message: "You might want to rematch :-)", 
                    type: "MENU/REPLAY", 
                    icon: Icons.drawIcon,
                    iconType: "draw", 
                    onResponse: GameOverOption});
            } 
        } 
        else 
            Notify({action: "confirm", 
                    header: "YOU WIN!", 
                    message: "Congratulations!",
                    type: (Game.level < Game.levels.length)? "MENU/REPLAY": "MENU/REPLAY", 
                    icon: Icons.winnerIcon,
                    iconType: "winner", 
                    onResponse: GameOverOption});
    }
    
    if(!Game.over) {
        await UpdatePiecesStatus("Game Over!");
        Game.levels[Game.level-1].validForHint = Game.validForHint;
        playerA.captures = Game.boardSize / 2 * Game.rowNo - playerB.pieces;
        playerB.captures = Game.boardSize / 2 * Game.rowNo - playerA.pieces;
        // Caching stats
        Game.stats.push({playerName: [playerA.name, playerB.name],
                         pieceColor: [playerA.pieceColor.toUpperCase(), playerB.pieceColor.toUpperCase()],
                         gameStatus: [(name === playerA.name)? "LOST": "WON", (name === playerB.name)? "LOST": "WON"], 
                         piecesRemaining: [playerA.pieces, playerB.pieces], 
                         kingsMade: [playerA.kings, playerB.kings], 
                         movesMade: [playerA.moves, playerB.moves],
                         capturesMade: [playerA.captures, playerB.captures], 
                         longestCapture: [playerA.longestCapture, playerB.longestCapture]
                        });
        // Updating Games window 
        let length = Game.stats.length;
        let mainSec = $("#games-window #games");   
        let subSec = $$$("section");
        subSec.classList.add("sub_item");
        let p = $$$("p");
        p.innerHTML = `${playerA.name} [${playerA.pieceColor.toUpperCase()}] VS ${playerB.name} [${playerB.pieceColor.toUpperCase()}] ${(Game.mode === "single-player")? "<br/><br/> " + Game.version.substring(0,3).toUpperCase() + ": " + Game.levels[Game.level-1].level: ""}`;
        let btn = $$$("button");
        btn.classList.add("default", "middle_top");
        btn.innerHTML = "SEE STATS";
        btn.addEventListener("click", () => GetStats(length - 1), false);
        subSec.appendChild(p);
        subSec.appendChild(btn);
        mainSec.appendChild(subSec);
       
        try {
            if(Game.mode === "single-player") {
                Game.stats[length-1].level = Game.levels[Game.level-1].level;
                Game.stats[length-1].version = Game.version.substring(0,3).toUpperCase();
            }
            
            storage.setItem("stats", JSON.stringify(Game.stats));
        } catch (error) {} 
    } 
    
    if(!isDraw || playerA.pieces === playerB.pieces && playerA.pieces === Game.boardSize / 2 * Game.rowNo)
    Game.over = true;
    
    async function GameOverOption (choice) {
        if(!other.pressed) {
            if(choice === "MENU") {
                if(isDraw) {
                    Game.stats[Game.stats.length-1].gameStatus[0] = "DRAW";
                    Game.stats[Game.stats.length-1].gameStatus[1] = "DRAW";
                } 
                Cancel();
                back();
                return;
            } 
            else if(choice === "REPLAY") {
                if(Game.mode === "two-player-online") {
                    if(Game.alternatePlayAs) {
                        let color = playerA.pieceColor;
                        setTimeout( () => Alternate(color), 100);
                    }
                    if(Game.rollDice) {
                        Game.firstMove = await RollDice();
                        Game.whiteTurn = (Game.firstMove && playerA.pieceColor === "White" || !Game.firstMove && playerA.pieceColor === "Black")? true: false;
                    }
                    else {
                        btns = $$("#settings-window #main-section .inner_item:nth-of-type(3) button");
                        Game.whiteTurn = (GetValue(btns[0], "background-image") == other.default);
                        Game.firstMove = Game.whiteTurn;
                    }
                   
                    Notify("Rematch request has been sent to " + playerB.name);
                    Notify({action: "alert_special", 
                            header: "Please Wait!",
                            message: "Wait for opponent's feedback."});
                    let gameSettings = {firstMove: !Game.firstMove, mandatoryCapture: Game.mandatoryCapture, version: Game.version};
                    Publish({channel: Lobby.CHANNEL, message: {title: 'RequestReplay', content: gameSettings}});
                    return;
                } 
                await Refresh(true);
                Cancel();
                return;
            } 
            else if(choice === "NEXT LEVEL") {
                await Level(true);
                Cancel();
            } 
            else if(choice === "CONTINUE") {
                Game.count = 1;
                Game.countMoves = playerA.moves;
                Game.baseState = JSON.parse(JSON.stringify(Game.state));
                if(Game.mode === "single-player" && (Game.whiteTurn && playerB.pieceColor.includes("W") || !Game.whiteTurn && playerB.pieceColor.includes("B")) ) {
                    let id = playerB.pieceColor.substring(0,1);
                    let state = JSON.parse(JSON.stringify(Game.state));
                    let moves = await Iterate({id, state, func: AssesMoves});
                    let ai = new AI({state, moves, depth: Game.level});
                    await ai.makeMove(false);
                } 
                Cancel();
            }
            other.pressed = true;
        }
        else
            return;
    }
    } catch (error) {alert(error)}
} 

const Play = (tone, vol) => {
    if(!Sound.muted) { 
        try {
            Sound[tone].muted = false;
            Sound[tone].volume = vol;
            if(Sound[tone].paused) {
                let promise = Sound[tone].play();
                if(promise != undefined) {
                    promise.then(() => {
                        //Notify("SUCCESS");
                    }).catch((error) => {
                        /*Notify({action: "alert", 
                                header: "Audio Error", 
                                message: error});*/
                    });
                } 
            } 
            else {
                Sound[tone].pause();
                Sound[tone].currentTime = 0;
                Sound[tone].play();
            } 
        } catch (error) {Notify(error + "");}
    } 
} 

const Clicked = async (elem, parent, click = true) => { try {
    if(click) 
        Play("click", 0.1);
    if(elem != undefined && !elem.innerHTML.includes("LOCKED") || elem != undefined && !click) {
        let btns = parent.children;
        for(let btn of btns) {
            if(parent.id !== "vc" && btn.tagName.toLowerCase() == "div" || parent.id !== "vc" && btn.tagName.toLowerCase() == "button") {
                btn.style.background = other.background;
            }
            else if(parent.id === "vc") {
                btn.classList.remove("default");
            } 
        } 
        
        
        if(parent.id === "nav") {
            $(`#${parent.parentNode.id} h2`).innerHTML = elem.children[0].innerHTML.replace("<br>", " ");
        } 
        else if(parent.id === "main") { 
            $(`#${parent.id} h2`).innerHTML = elem.innerHTML.split("<br>").join(" ");
            
            if(elem.innerHTML == "SINGLE PLAYER") 
                $("#main-window #levels h2").style.color = "#000";
            else
                $("#main-window #levels h2").style.color = "#6C6C6C";
        } 
        
        //setting background to green
        if(parent.id !== "vc") 
            elem.style.background = other.default; //"rgba(0, 152, 25, 0.9)";
        else {
            elem.classList.add("default");
            await Scroll(elem, {block: "nearest", inline: "center", behavior: "smooth"}, elem.parentNode.parentNode);
            //alert("Version scr: " + scr);
        } 
        //alert("done");
        
        if(parent.id == "main" || parent.id == "nav") {
            for(let btn of btns) {
                if(!btn.tagName.includes("H")) {
                    btn.style.color = "#fff";
                } 
            } 
            
            if(elem.innerHTML === "SINGLE PLAYER" || parent.id === "nav") {
                if(parent.id === "nav") other.level = elem;
                await Enable($("#main-window #levels #nav"), other.background, "#fff");
            } 
            else {
                await Disable($("#main-window #levels #nav"), other.disabled, "#B4B4B4");
            }
        }
    }
    else if(elem != undefined && elem.innerHTML.includes("LOCKED")) {
        //resetting size
        clearTimeout(other.timeout);
        elem.children[1].style.backgroundSize = "calc(calc(.2 * var(--W) ) - 5px)";
        //restarting
        let size = GetValue(elem.children[1], "background-size");
        elem.children[1].style.backgroundSize = (parseInt(size) + 8) + "px";
        other.timeout = setTimeout(() => {
			elem.children[1].style.backgroundSize = "calc(calc(.2 * var(--W) ) - 5px)";
			Notify("To unlock this level, you must win the previous level.");
		}, 300);
        return;
    } 
    
    if(click && screen.orientation.type.toLowerCase() != other.orientation || click && other.initialLoading) {
        await orientationLocking(document.documentElement, other.orientation);
        other.initialLoading = false;
    } 
    } catch (error) {alert("Click error: " + error.message);}
}

const Scroll = async (elem, options, parent) => {
    const startScroll = new Promise((resolve, reject) => {
        let tm = null;
        let scrLeft = elem.scrollLeft;
        if(elem instanceof Element) {	
            try {
                clearTimeout(tm);
                parent.removeEventListener("scroll", check, false);
                elem.scrollIntoView(options);
                parent.addEventListener("scroll", check, false);
                check();
            } catch (error) {alert("Scroll Error: " + error.message)}
        }
        else {
            reject("Argument Error: elem must be of type Element");
        }
       
        function check () {
            clearTimeout(tm);
            tm = setTimeout(() => {
                //alert(parent.scrollLeft);
                parent.removeEventListener("scroll", check, false);
                resolve(true);
            }, 300);
        }
    });
   
    return startScroll;
} 

const Disable = async (parent, bgColor, color = "#7C7C7C") => {
    let children = parent.children;
    children = (!children.length)? [parent]:children;
    
    for(let child of children) {
        if(parent.id != "main") {
            if(GetValue(child, "background-image") === other.default) { 
                other.selected = child;
                //other.classList.remove("default");
            } 
                
            if(child.tagName.toLowerCase() != "p" && child.tagName.toLowerCase() != "h2") {
                child.style.background = bgColor;
                child.style.color = color;
            } 
                
            if(child.children.length > 0) {
                child.children[0].style.color = color;
                if(!child.children[1].className.includes('disabled')) {
                    child.children[1].classList.remove("disabled");
                    child.children[1].children[0].classList.remove("disabled");
                    child.children[1].children[1].classList.remove("disabled");
                    child.children[1].children[2].classList.remove("disabled");
                    
                    child.children[1].classList.add("disabled");
                    child.children[1].children[0].classList.add("disabled");
                    child.children[1].children[1].classList.add("disabled");
                    child.children[1].children[2].classList.add("disabled");
                } 
            } 
            
            //disable the level buttons
            child.style.pointerEvents = "none";
        } 
        else {
            if(child.children.length > 0) {
                child.children[0].style.color = color;
                child.children[1].style.filter = "grayscale(100%) brightness(50%)";
            } 
            child.style.pointerEvents = "none";
        } 
    } 
} 

const Enable = async (parent, bgColor, color) => { try {
    let children = parent.children;
    children = (!children.length)? [parent]:children;
    
    for(let child of children) {
        if(parent.id != "nav" && child === other.selected || child === other.level) {
            child.style.background = other.default;
        } 
        else if(child.tagName.toLowerCase() != "p" && child.tagName.toLowerCase() != "h2") {
            child.style.background = bgColor;
            child.style.color = color;
        } 
        
        if(child.children.length > 0) {
            if(child.children[0].innerHTML === "LOCKED") {
                child.style.background = other.disabled;
            } 
            
            child.children[0].style.color = color;
            child.children[1].classList.remove("disabled");
            child.children[1].children[0].classList.remove("disabled");
            child.children[1].children[1].classList.remove("disabled");
            child.children[1].children[2].classList.remove("disabled");
        } 
        
        //enable the level buttons
        child.style.pointerEvents = "auto";
    }
    
    if(parent.id == "nav") {
        await Scroll(other.level, {block: "nearest", inline: "center", behavior: "smooth"}, other.level.parentNode);
    }
    
    } catch (error) {Notify(error + "")} 
} 

const Mute = (mute) => {
    Sound.muted = mute;
} 

const Edit = (elem, extreme = false) => {
    if(extreme) {
        let preEdited = elem.value;
        let channel = preEdited.replace('https://www.checkers.com/', "");
        let isLink = /^(\d+%)+\d+$$/.test(channel);
        if(!isLink) {
            elem.value = preEdited.replace(/[.,*:\/\\\s]/g, '');
            elem.maxLength = "20";
        }
        else {
            elem.value = preEdited;
        } 
    } 
    else {
        elem.value = elem.value.replace(/\s+/g, ' ');
    } 
} 

const Submit = (event) => {
    event.preventDefault();
    $("#two-players-window .footer_section .right_btn").focus();
    let isOnlineForm = GetValue($("#online"), "display") == "grid";
    if(isOnlineForm) {
        if(navigator.onLine)
            ChannelFunction();
        else
            Notify("You are offline, please turn on your device internet connection and try again.");
    } 
    else {
        let playerA_name = $("#offline #playerA #playerA-name").value.trim();
        let playerB_name = $("#offline #playerB #playerB-name").value.trim();
        if(playerA_name != "" && playerB_name != "") {
            //player 1 name
            playerA.name = playerA_name.replace(/^\w|\s\w/g, t => t.toUpperCase());
        
            //player 2 name
            playerB.name = playerB_name.replace(/^\w|\s\w/g, t => t.toUpperCase());
            
            Notify("Names submitted successfully!");
        } 
        else {
            Notify("You have not provided any name for either <b><em>Player 1</em></b> or <b><em>Player 2</em></b> or both.");
        } 
    } 
} 

const AboutOnline = () => {
    Notify({action: "alert", 
            header: "HOW TO CONNECT ONLINE CHANNEL", 
            message: "To successfully play the online match, you are required to enter the name of the channel you wish to join in the text field provided and submit it. If the channel is full, you will be required to create new one of your own preference. After successful creation, share the channel name with your opponent to invite him/her.<span>Note</span><ul><li>Any full channel contains only two players at any particular time.</li><li>Leaving the channel while the game is still on, will cost you the game.</li><li>You can not join more than one channel at any time.</li><li>If both players leave the channel, it will be closed</li></ul>"});
}

const Restart = async (option) => {
	if(Game.thinking) {
		Notify("Please wait for opponent's move");
		return;
	} 
    if(!Game.over) {
        Notify({action: "confirm", 
                header: "Restart Game!", 
                message: "Do you really want to restart this game?",
                type: "CANCEL/RESTART", 
                onResponse: RestartOption});
        
        async function RestartOption (choice) {
            if(choice === "RESTART") {
                if(Game.mode === "two-player-online") {
                    if(Game.alternatePlayAs) {
                        let color = playerA.pieceColor;
                        setTimeout( () => Alternate(color), 100);
                    }
                    if(Game.rollDice) {
                        Game.firstMove = await RollDice();
                        Game.whiteTurn = (Game.firstMove && playerA.pieceColor === "White" || !Game.firstMove && playerA.pieceColor === "Black")? true: false;
                    }
                    else {
                        btns = $$("#settings-window #main-section .inner_item:nth-of-type(3) button");
                        Game.whiteTurn = (GetValue(btns[0], "background-image") == other.default);
                        Game.firstMove = Game.whiteTurn;
                    }
                   
                    Notify("Restart request has been sent to " + playerB.name);
                    Notify({action: "alert_special", 
                            header: "Please Wait!",
                            message: "Wait for opponent's feedback."});
                    let gameSettings = {firstMove: !Game.firstMove, mandatoryCapture: Game.mandatoryCapture, version: Game.version};
                    Publish({channel: Lobby.CHANNEL, message: {title: 'RequestRestart', content: gameSettings}});
                    return;
                } 
                
                if(Game.alternatePlayAs) {
                    let color = playerA.pieceColor;
                    setTimeout( () => Alternate(color), 100);
                    setTimeout(async () => await Refresh(true), 200);
                }
                else {
                   await Refresh(true);
                } 
                Cancel();
            } 
            else if(choice === "CANCEL") {
                Cancel();
            } 
        } 
    } 
    else {
        GameOver();
    } 
} 

const Hint = async (elem, state=JSON.parse(JSON.stringify(Game.state))) => {
	if(Game.thinking) {
		Notify("Please wait for opponent's move");
		return;
	}
    if(!Game.over) { try {
        // if player won previous level without using hints and undo
        // is allowed to use hint
        if(Game.mode === "two-player-offline" || Game.mode === "two-player-online" && (Game.whiteTurn && playerA.pieceColor === "White" || !Game.whiteTurn && playerA.pieceColor === "Black") || Game.mode === "single-player" && (Game.level === 1 || Game.levels[Game.level-2].validForHint)) {
        	if(Game.mode === "single-player") {
				Game.validForHint = false;
				$("#play-window .footer_section p label:last-of-type").style.backgroundImage = "var(--hint)";
				UpdatePiecesStatus();
		    } 
	        elem.style.backgroundSize = "25px 25px";
	        elem.style.backgroundImage = `url('${Icons.loadIcon}')`;
			elem.style.pointerEvents = "none";
			other.hintPath = [];
			await setTimeout( () => getHint(elem, state), 100);
		}
		else if (Game.mode === "single-player") { 
            //resetting size
            clearTimeout(other.timeout);
            elem.style.backgroundSize = "25px 30px";
            //restarting
            elem.style.backgroundSize = "33px 38px";
            other.timeout = setTimeout(() => {
				elem.style.backgroundSize = "25px 30px";
				Notify("Please win the previous level without using the hint and undo buttons");
			}, 300);
        }
        else {
            Notify("Please wait for your turn.");
            //alert(Game.whiteTurn + "\n" + playerA.pieceColor);
        } 
        } catch (error) {Notify(error + "")} 
    } 
    else {
        GameOver();
    }
   
    async function getHint(elem, state) {
        let id = (Game.mode !== "two-player-offline")? playerA.pieceColor.substring(0,1): (Game.whiteTurn && playerA.pieceColor === "White" || !Game.whiteTurn && playerA.pieceColor === "Black")? playerA.pieceColor.slice(0,1): playerB.pieceColor.slice(0,1);
        let moves = await Iterate({id, state, func: AssesCaptures});
        if(moves.length === 0)
            moves = await Iterate({id, state, func: AssesMoves});
        else
        	moves = await RemoveUnwantedCells({captures: moves, state});
        
        let ai = new AI({state, moves, depth: (Game.level < 4? 4: Game.level)});
        await ai.makeMove(true);
       
        let cell = other.aiPath[0];
        await ValidateMove({cell: $("#table").rows[cell.i].cells[cell.j], i: cell.i, j: cell.j});
        
        if(other.aiPath.length === 1)
            $("#table").rows[cell.m].cells[cell.n].classList.add("hint");
        else if(other.aiPath.length > 1 && !Game.helper && !Game.capturesHelper) {
            for(cell of other.aiPath) {
                $("#table").rows[cell.m].cells[cell.n].classList.add("hint");
            } 
        } 
        other.aiPath = [];
        elem.style.backgroundSize = "30px 25px";
        elem.style.backgroundImage = `var(--hint)`;
        elem.style.pointerEvents = "auto";
        return;
    } 
} 

const Exit = () => { try {
    if(BackState.moves.length > 0 && !Game.over) {
        Notify({action: "confirm", 
                header: "Do you really want to exit?", 
                message: "The current game process will be lost!",
                type: "CANCEL/EXIT", 
                onResponse: Option });
                
        function Option (choice)  {
            if(choice == "EXIT") {
                if(Game.mode === "two-player-online") {
                    Publish({channel: Lobby.CHANNEL, message: {title: "ExitedGame", content: playerA.name} });
                } 
                Cancel();
                back();
                return;
            } 
            else if(choice == "CANCEL") {
                Cancel();
            } 
        }
    } 
    else if(!Game.over) {
        if(Game.mode === "two-player-online") {
            Publish({channel: Lobby.CHANNEL, message: {title: "ExitedGame", content: playerA.name} });
        } 
        back();
    } 
    else {
        GameOver();
    } 
    } catch (error) {Notify(error + "");}
} 

const AboutCheckers = () => {
    if(!Game.over) {
        let src = null;
        let message = "";
        let version = Game.version.toUpperCase() + " CHECKERS";
        let root = document.documentElement;
        switch(Game.version) {
            case "american":
                message = "American Checkers also known as English/Standard Checkers is played on 8x8 board with each player having 12 pieces at the start of the game. Men (uncrowned pieces) are only allowed to move forwards. When there is multiple capturing sequence, one is expected to choose only one and not necessarily the one that will result in multiple captures. All the captures in the chosen sequence should be made. Kings (crowned pieces) can capture and move both forwards and backwards. However, they can move only one square.";
                src = srcs[0];
                break;
            case "kenyan":
                message = "Kenyan Checkers is played on 8x8 board with each player having 12 pieces at the start of the game. Men (uncrowned pieces) can only move or capture one or two squares forward respectively. Kings (crowned pieces) can move and capture both forwards and backwards. However in the event of a capture, a king can jump multiple steps and land only to the immediate square after the captured piece. Incase of multiple captures, one should make sure all the captures in the chosen path are made.";
                src = srcs[1];
                break;
            case "international":
                message = "International Checkers is played on 10x10 board with each player having 20 pieces at the start of the game. Men (uncrowned pieces) can only move one square forward. However they can capture both forwards and backwards. In the event of capture, a piece reaches the far end of the board and there are more captures to be made, the piece will continue uncrowned. Kings (crowned pieces) can move and capture multiple steps both forwards and backwards. They are also called flying kings. Incase of multiple captures, you can only choose one that favors your game. However, all the captures in the chosen path should be made exhaustively.";
                src = srcs[2];
                break;
            case "pool":
                message = "Pool Checkers is played on 8x8 board with each player having 12 pieces at the start of the game. Men (uncrowned pieces) can only move one square forward. However, they can capture both forwards and backwards. In the event of capture, a piece reaches the far end of the board and there are more captures to be made, the piece stops and becomes crowned. Kings (crowned pieces) can move and capture multiple steps both forwards and backwards. They are also called flying kings. Incase of multiple captures, you can only choose one that favors your game. However, all the captures in the chosen path should be made exhaustively";
                src = srcs[3];
                break;
            case "russian":
                message = "Russian Checkers is played on 8x8 board with each player having 12 pieces at the start of the game. Men (uncrowned pieces) can only move one square forward. However, they can capture both forwards and backwards. In the event of capture, a piece reaches the far end of the board and there are more captures to be made, the piece is crowned and continues as a king. Kings (crowned pieces) can move and capture multiple steps both forwards and backwards. They are also called flying kings. Incase of multiple captures, you can only choose one that favors your game. However all the captures in the chosen path should be made exclusively.";
                src = srcs[4];
                break;
            case "nigerian":
                message = "Nigerian Checkers is similar to international checkers with the difference being, the longest diagonal is align to the right of the players. The game is played on 10x10 board with each player having 20 pieces at the start of the game. Men (uncrowned pieces) can only move one square forward. However they can capture both forwards and backwards. In the event of capture, a piece reaches the far end of the board and there are more captures to be made, the piece will continue uncrowned. Kings (crowned pieces) can move and capture multiple steps both forwards and backwards. They are also called flying kings. Incase of multiple captures, you can only choose one that favors your game. However, all the captures in the chosen path should be made exhaustively.";
                src = srcs[5];
                break;
        }
        //alert(src);
        Notify({action: "alert", 
                header: `<img style="height: 100%; width: 50px; margin-right: 15px;" src=${src}> ${version}`, 
                message});
    } 
    else
    GameOver();
} 


const Helper = async (moves, state, isMultJump = false) => { 
    for(let cell of $$("#table .valid, #table .pre_valid, #table .hint, #table .helper_empty, #table .helper_filled")) {
        cell.classList.remove("hint");
        cell.classList.remove("helper_empty");
        cell.classList.remove("helper_filled");
    } 
    // check if moves is an attack move or not
    if(moves[0].capture === undefined && !isMultJump) {
    	if(!(Game.mode == "single-player" && (Game.whiteTurn && playerB.pieceColor == "White" || !Game.whiteTurn && playerB.pieceColor == "Black")) && Game.helper) 
	        for(let move of moves) {
	            let i = parseInt(move.cell.slice(0,1));
	            let j = parseInt(move.cell.slice(1,2));
	            let m = parseInt(move.empty.slice(0,1));
	            let n = parseInt(move.empty.slice(1,2));
	            $("#table").rows[i].cells[j].classList.add("pre_valid");
	        }
		return;
    }
    
    for(let k = 0; k < moves.length; k++) {
    	let move = moves[k];
        let i = parseInt(move.cell.slice(0,1));
        let j = parseInt(move.cell.slice(1,2));
        let m = parseInt(move.empty.slice(0,1));
        let n = parseInt(move.empty.slice(1,2));
        let crowned = false;
        if(!isMultJump) 
        	other.helperPath.push({i, j, m, n, cell: move.cell, capture: move.capture, empty: move.empty, source: true});
        else
        	other.helperPath.push({i, j, m, n, cell: move.cell, capture: move.capture, empty: move.empty, source: false});
        // Check if its a capture
        if(move.capture != undefined) {
            let cloneState = JSON.parse(JSON.stringify(state));
            let id = cloneState[i][j];
            let a = parseInt(move.capture.slice(0,1)), 
                b = parseInt(move.capture.slice(1,2));
            cloneState[a][b] = "EC";
            cloneState[i][j] = "IP";
            if(!id.includes("K") && (id.includes(playerA.pieceColor.slice(0,1)) && m === 0 || id.includes(playerB.pieceColor.slice(0,1)) && m === Game.boardSize - 1)) {
                id = id.replace("M", "K");
                crowned = true;
            }
            let moves2 = [];
            if(!crowned || crowned && (Game.version === "russian" || Game.version === "kenyan" || Game.version === "international" || Game.version === "nigerian")) {
            	id = crowned && (Game.version === "kenyan" || Game.version === "international" || Game.version === "nigerian")? id.replace("K", "M"): id;
            	cloneState[m][n] = id;
            	moves2 = await AssesCaptures({id, i: m, j: n, state: cloneState});
				if(moves2.length > 0) {
	            	moves2 = await RemoveUnwantedCells({captures: moves2, state: cloneState});
					await Helper(moves2, cloneState, true);
				} 
				else if(crowned)
					id = id.replace("M", "K"); 
            } 
            
            cloneState[m][n] = id;
    	} 
    }
    
    if(isMultJump) {
        return Prms(true);
    }
   
    if((Game.helper || Game.capturesHelper) && Game.mandatoryCapture && (Game.mode == "two-player-offline" || (Game.mode == "single-player" || Game.mode == "two-player-online") && Game.whiteTurn && playerA.pieceColor === "White" || !Game.whiteTurn && playerA.pieceColor === "Black")) {
	    let i = other.helperPath[0].i,
	        j = other.helperPath[0].j, 
	        isSingleCell = true;
	        
	    for(let cell of other.helperPath) {
	        if(cell.source && (cell.i !== i || cell.j !== j)) {
	            isSingleCell = false;
	            break;
	        }
	    } 
	    
	    if(isSingleCell) {
	        await ValidateMove({cell: $("#table").rows[i].cells[j], i, j, isComputer: true});
	        return;
	    } 
	    else if(Game.helper || Game.capturesHelper) {
	        for(let cell of other.helperPath) {
	            if(cell.source)
	            $("#table").rows[cell.i].cells[cell.j].classList.add("helper_filled");
	        } 
	        return;
	    }
	} 
} 

const PlayAs = (elem) => { try {
    if(elem.parentNode.id == "playerA") {
        if(elem.innerHTML != "ALTERNATE") {
            let num = elem.classList.length - 1;
            Disable($(`#playerB .${elem.classList[num]}`), other.disabled, "#B4B4B4");
            Enable($(`#playerB button:not(.${elem.classList[num]})`), other.default, "#fff");
            let btns = $$("#settings-window #main-section .inner_item:nth-of-type(4) button");
            for(let btn of btns) {
            	if(btn.innerHTML.toLowerCase() === elem.classList[num]) {
            	    Clicked(btn, btn.parentNode);
                    break;
            	} 
            }
        }
        else {
            Game.alternatePlayAs = true;
            let btns = $$("#main-section .inner_item:nth-of-type(4) .third_item")[0];
            Clicked(btns, btns.parentNode, false);
           
            btns = $$("#playerB button");
            for(let btn of btns) {
               if(GetValue(btn, "background-image") === other.default) {
                   Disable(btn, other.disabled, "#B4B4B4");
                   break;
               } 
            } 
        } 
    } 
    if(elem.innerHTML.toLowerCase() != "alternate") {
        Game.alternatePlayAs = false;
        let playAsWhite = (elem.innerHTML == "WHITE");
        playerA.pieceColor = (playAsWhite)? "White": "Black";
        playerB.pieceColor = (playAsWhite)? "Black": "White";
        
        if(elem.parentNode.id !== "playerA") {
            let btns = $$("#playerA button");
            for(let btn of btns) {
            	if(btn.innerHTML === elem.innerHTML) {
            	    Clicked(btn, btn.parentNode, false);
                    let num = btn.classList.length - 1;
                    Disable($(`#playerB .${btn.classList[num]}`), other.disabled, "#B4B4B4");
                    Enable($(`#playerB button:not(.${btn.classList[num]})`), other.default, "#fff");
                    break;
            	} 
            } 
        } 
    } 
    else {
        Game.alternatePlayAs = true;
        let btns = $$("#playerA .third_item")[0];
        Clicked(btns, btns.parentNode, false);
        btns = $$("#playerB button");
        for(let btn of btns) {
           if(GetValue(btn, "background-image") === other.default) {
               Disable(btn, other.disabled, "#B4B4B4");
               break;
           } 
        } 
    }
    } catch (error) {Notify("" + error);}
} 

const Contact = () => {
    window.location.href = "mailto:marxeto8@gmail.com? &subject=Checkers%20Support%20Feedback";
} 

const Attribute = () => {
    Notify({action: "alert", 
            header: "ATTRIBUTES", 
            message: "<span>Audio</span><ul><li>Special thanks goes to zapslat.com for powering audio in this game. Checkout the link below for more info.<br/><a href='https://www.zapsplat.com/sound-effect-categories/'>www.zapslat.com</a></li></ul><span>Online Gaming</span><ul><li>This one goes to PubNub for enabling instant communication between internet connected devices.</li></ul>"});
} 

const FollowUp = () => {
    BackState.state.push(["#settings-window", "#follow-up-window"]);
    $("#settings-window").style.display = "none";
    $("#follow-up-window").style.display = "grid";
} 

const GetGames = () => {
    if(Game.stats.length > 0) {
        BackState.state.push(["#main-window", "#games-window"]);
        $("#main-window").style.display = "none";
        $("#games-window").style.display = "grid";
    } 
    else 
        Notify("No games played yet.");
}

const ClearGames = () => {
	Clicked();
	if(Game.stats.length > 0) {
		$("#games").innerHTML = "";
		Game.stats = [];
		if(storage) {
			storage.removeItem("stats");
		} 
	} else {
		Notify("No games played yet.");
	}
} 

const GetStats = (no) => { try {
    let props = $$(".figures");
    let stats = Game.stats[no];
    props[0].innerHTML = stats.pieceColor[0];
    props[1].innerHTML = stats.pieceColor[1];
    props[2].innerHTML = stats.gameStatus[0];
    props[3].innerHTML = stats.gameStatus[1];
    props[4].innerHTML = stats.piecesRemaining[0];
    props[5].innerHTML = stats.piecesRemaining[1];
    props[6].innerHTML = stats.kingsMade[0];
    props[7].innerHTML = stats.kingsMade[1];
    props[8].innerHTML = stats.movesMade[0];
    props[9].innerHTML = stats.movesMade[1];
    props[10].innerHTML = stats.capturesMade[0];
    props[11].innerHTML = stats.capturesMade[1];
    props[12].innerHTML = stats.longestCapture[0];
    props[13].innerHTML = stats.longestCapture[1];
    Clicked();
    
    BackState.state.push(["#games-window", "#stats-window"]);
    $("#games-window").style.display = "none";
    $("#stats-window").style.display = "grid";
    } catch (error) {alert(error + "\n" + no + "\nGet starts error")}
} 

const Mode = async (type, click = true) => {
    if(type == 2) {
        Game.mode = "two-player-offline";
        playerA.name = $("#playerA-name").value;
        playerB.name = $("#playerB-name").value;
        $("#two-players-window h2").innerHTML = "TWO PLAYERS OFFLINE";
        $$("#settings-window #main-section .inner_item")[3].style.display = "none";
        $("#online").style.display = "none";
        $("#offline").style.display = "grid";
      
        let elem = $("#main div:nth-of-type(2)");
        await Clicked(elem, elem.parentNode, click);
    } 
    else if(type == 3) {
        Game.mode = "two-player-online";
        playerA.name = $$("#online .player_name")[0].innerHTML;
        playerB.name = $$("#online .player_name")[1].innerHTML;
        $("#two-players-window h2").innerHTML = "TWO PLAYERS ONLINE";
        $$("#settings-window #main-section .inner_item")[3].style.display = "grid";
        $("#online").style.display = "grid";
        $("#offline").style.display = "none";
       
        let elem = $("#main div:nth-of-type(3)");
        await Clicked(elem, elem.parentNode, click);
    } 
    else if(type == 1) { 
        Game.mode = "single-player";
        playerA.name = "You";
        playerB.name = "AI";
        $$("#settings-window #main-section .inner_item")[3].style.display = "grid";
       
        let elem = $$("#main div")[0];
        await Clicked(elem, elem.parentNode, click);
    }
   
    if(click && type != 1) {
        BackState.state.push(["#main-window", "#two-players-window"]);
        $("#main-window").style.display = "none";
        $("#two-players-window").style.display = "grid";
    } 
} 

const Settings = (elem) => {
    let modes = $$("#main-window #main div");
    let previousMode;
    for(let mode of modes) {
        if(GetValue(mode, "background-image") === other.default) { 
            previousMode = mode;
            break;
        } 
    } 
    Clicked(elem, elem.parentNode);
    BackState.state.push(["#main-window", "#settings-window", previousMode]);
    $("#main-window").style.display = "none";
    $("#settings-window").style.display = "grid"; 
} 

const Cancel = () => {
    $("#notification-window").style.display = "none";
} 

const Confirm = async (option, callBack) => {
    await callBack(option);
    return;
} 


const Notify = (data) => {
    if(typeof data === "object") {
        let note_window = $("#notification-window"), 
            note_main = $("#note"), 
            note_image = $(".note_img"), 
            note_head = $(".note_header"), 
            note_body = $(".note_body"), 
            note_footer = $(".note_footer"), 
            note_buttons = note_footer.children;
            
        note_head.innerHTML = data.header;
        note_body.innerHTML = data.message;
        if(data.action == "alert") {
            note_image.src = Icons.alertIcon;
            note_image.style.height = "60px";
            note_image.style.width = "60px";
            note_buttons[0].style.display = "none";
            note_buttons[1].style.display = "none";
            note_buttons[2].style.display = "inline-block";
            note_buttons[2].innerHTML = "OK";
            note_buttons[2].addEventListener("click", Cancel, true);
            note_window.addEventListener("click", Cancel, true);
            
            note_buttons[1].removeEventListener("click", other.Handler1, true);
            note_buttons[2].removeEventListener("click", other.Handler2, true);
            $("#note .close_btn").style.pointerEvents = "auto";
        }
        else if(data.action === "alert_special") {
            note_image.src = Icons.loadIcon;
            note_image.style.height = "60px";
            note_image.style.width = "60px";
            note_buttons[0].style.display = "none";
            note_buttons[1].style.display = "none";
            note_buttons[2].style.display = "none";
            $("#note .close_btn").style.pointerEvents = "none";
        } 
        else if(data.action == "confirm") {
            note_image.style.height = "60px";
            note_image.style.width = "60px";
            if(data.icon === undefined) 
                note_image.src = Icons.confirmIcon;
            else {
                if(data.iconType == "winner")
                note_image.style.height = "80px";
                else if(data.iconType == "draw")
                note_image.style.width = "80px";
                note_image.src = data.icon;
            } 
            other.Handler1 = () => {Confirm(note_buttons[1].innerHTML, data.onResponse);}
            other.Handler2 = () => {Confirm(note_buttons[2].innerHTML, data.onResponse);}
            note_buttons[0].style.display = "none";
            note_buttons[1].style.display = "inline-block";
            note_buttons[2].style.display = "inline-block";
            note_buttons[1].innerHTML = data.type.split("/")[0];
            note_buttons[2].innerHTML = data.type.split("/")[1];
            note_buttons[1].addEventListener("click", other.Handler1, true);
            note_buttons[2].addEventListener("click", other.Handler2, true);
            
            note_buttons[2].removeEventListener("click", Cancel, true);
            note_window.removeEventListener("click", Cancel, true);
            $("#note .close_btn").style.pointerEvents = "auto";
        }
        else if(data.action == "other") {
            note_buttons[1].removeEventListener("click", other.Handler1, true);
            note_buttons[2].removeEventListener("click", other.Handler2, true);
            note_buttons[2].removeEventListener("click", Cancel, true);
            note_window.removeEventListener("click", Cancel, true);
            
            note_image.src = data.icon;
            if(data.iconType == "winner") {
                note_image.style.width = "60px";
                note_image.style.height = "80px";
            } 
            else if(data.iconType == "draw") {
                note_image.style.width = "80px";
                note_image.style.height = "60px";
            } 
            other.Handler0 = () => {Confirm(note_buttons[0].innerHTML, data.onResponse);}
            other.Handler1 = () => {Confirm(note_buttons[1].innerHTML, data.onResponse);}
            other.Handler2 = () => {Confirm(note_buttons[2].innerHTML, data.onResponse);}
            note_buttons[0].style.display = "inline-block";
            note_buttons[1].style.display = "inline-block";
            note_buttons[2].style.display = "inline-block";
            note_buttons[0].innerHTML = data.type.split("/")[0];
            note_buttons[1].innerHTML = data.type.split("/")[1];
            note_buttons[2].innerHTML = data.type.split("/")[2];
            note_buttons[0].addEventListener("click", other.Handler0, true);
            note_buttons[1].addEventListener("click", other.Handler1, true);
            note_buttons[2].addEventListener("click", other.Handler2, true);
            $("#note .close_btn").style.pointerEvents = "auto";
        }
        
        note_window.style.display = "flex";
    } 
    else {
        let popUpNote = $("#pop-up-note");
        popUpNote.innerHTML = data;
        popUpNote.style.display = "block";
        popUpNote.classList.remove("pop");
        void popUpNote.offsetWidth;
        popUpNote.classList.add("pop");
    } 
}

const Version = async (elem, index, click = true) => { try {
    elem.parentNode.classList.add("disabled_container");
    $("#footer .left_btn").style.pointerEvents = "none";
    $("#nav").classList.add("disabled_levels");
    let levels = $$("#nav div");
    if(click) {
        let scores = [];
        levels.forEach((level, index) => {
            if(level.children[0].innerHTML !== "LOCKED") {
                let score = 3;
                for(let i = 0; i < level.children[1].children.length; i++) {
                    let label = level.children[1].children[i];
                    if(!label.className.includes("not_achieved")) {
                        score = i;
                        break;
                    } 
                }
                let validForHint = Game.levels[index].validForHint;
                scores.push({score, validForHint});
            } 
        });
        Game.versions[Game.version] = scores;
        let version = elem.children[1].innerHTML.toLowerCase().split(/<br>/g)[0];
        Game.version = version;
        $(".header_div:last-of-type h2").innerHTML = Game.version.toUpperCase() + " CHECKERS";
        await Clicked(elem, elem.parentNode, click);
        
        
        if(storage) {
            storage.setItem("versions", JSON.stringify(Game.versions));
            storage.setItem("version", version);
        }
        await loop();
    }
    else {
        $(".header_div:last-of-type h2").innerHTML = Game.version.toUpperCase() + " CHECKERS";
        await Clicked(elem, elem.parentNode, click);
        await loop();
    } 
    
    async function loop (m = 0) { try {
        if(m === levels.length) {
            if(Game.mode === "single-player") {
                await Clicked(levels[Game.versions[Game.version].length-1], levels[Game.versions[Game.version].length-1].parentNode, false);
            }
            else {
                other.level = levels[Game.versions[Game.version].length-1];
            }
            await loopingDone();
            elem.parentNode.classList.remove("disabled_container");
            $("#nav").classList.remove("disabled_levels");
            $("#footer .left_btn").style.pointerEvents = "auto";
            return;
        } 
        
        let level = levels[m];
        
        if(m < Game.versions[Game.version].length) {
            Game.level = m;
            await Level(false, "version");
            
            Game.levels[Game.level].validForHint = Game.versions[Game.version][m].validForHint;
            if(Game.levels[Game.level].validForHint === undefined)
            	Game.levels[Game.level].validForHint = true;
            
            let score = Game.versions[Game.version][m].score; 
			if(score === undefined) 
				Game.versions[Game.version][m];
            
            for(let i = 0; i < 3; i++) {
                level.children[1].children[i].classList.remove("achieved", "not_achieved");
                
                if(i >= score) {
                    level.children[1].children[i].classList.add("achieved");
                }
                else {
                    level.children[1].children[i].classList.add("not_achieved");
                } 
            }
        }
        else {
            level.children[0].innerHTML = "LOCKED";
            level.children[1].style.filter = "grayscale(0) invert(0) brightness(1)";
            level.style.backgroundImage = other.disabled;
            level.children[1].style.backgroundImage = `url(${srcs[srcs.length-2]})`;

            for(let label of level.children[1].children) {
                label.classList.remove("achieved", "not_achieved");
            } 
        }
       
        if(Game.mode !== "single-player") {
            await Disable(level.parentNode, other.disabled, "#B4B4B4");
        } 
        
        await loop(m+1);
       } catch (error) {alert ("Looping Error: " + error.message)} 
    }
    function loopingDone () {
        if(Game.version != "international" && Game.version != "nigerian") {
            Game.boardSize = 8;
            Game.rowNo = 3;
        } 
        else {
            Game.boardSize = 10;
            Game.rowNo = 4;
        }
        document.documentElement.style.setProperty("--board-size", Game.boardSize);
        // Since m in the loop above started at 0, we increment Game level by one
        Game.level += 1;
    } 
    } catch (error) {alert("Version error: " + error.message);}
}

const RestartLevels = async () => { try {
	await Notify({action: "alert_special", 
			header: "Please Wait!", 
			message: "Resetting levels..."});
	
	Object.keys(Game.versions).map((key) => {
		Game.versions[key] = [{score: 3, validForHint: true}];
	});
	if(storage) {
        storage.setItem("versions", JSON.stringify(Game.versions));
        storage.setItem("version", Game.version);
    }
    let version = Game.version;
    for(let h2 of $$(".version h2")) {
        if(h2.innerHTML.includes(version.toUpperCase())) {
            version = h2.parentNode;
            break;
        } 
    }
    await Version(version, undefined, false);
    Cancel();
    } catch(error) {alert("Restart Error!\n" + error.message)}
} 

const Level = async (elem, index, click = true) => {
    if(typeof elem === "object") {
        await Clicked(elem, elem.parentNode, click);
        if(!elem.innerHTML.includes("LOCKED")) {
            try {
                let level = index;
                storage.setItem("currentLevel", (level).toString());
            } catch (error) {} 
            Game.level = (index + 1);
            //Notify(Game.level);
        }
    } 
    else if(elem) { try {
        let level = $$("#levels #nav div")[Game.level];
        await Clicked(level, level.parentNode, false);
        $("#play-window .header_section h3").innerHTML = `${$("#levels h2").innerHTML}`;
        $(".face_bottom #level").innerHTML = `${$("#levels h2").innerHTML}`;
        for(level of Game.levels) {
            if(level.level === $("#levels h2").innerHTML) {
                Game.level = Game.levels.indexOf(level) + 1;
                break;
            } 
        } 
        //alert($("#levels h2").innerHTML);
        if(Game.levels[Game.level-2].validForHint) {
            $("#play-window .middle_section .horiz_controls:nth-of-type(3)").style.backgroundImage = "var(--hint)";
            $("#play-window .controls_section .controls:nth-of-type(3)").style.backgroundImage = "var(--hint)";
            $("#play-window .controls_section .controls:nth-of-type(3)").style.backgroundSize = "30px 25px";
            $("#play-window .middle_section .horiz_controls:nth-of-type(3)").style.backgroundSize = "30px 25px";
        } 
        else if(!Game.levels[Game.level-2].validForHint) {
            $("#play-window .middle_section .horiz_controls:nth-of-type(3)").style.backgroundImage = `url(${srcs[srcs.length-2]})`;
            $("#play-window .controls_section .controls:nth-of-type(3)").style.backgroundImage = `url(${srcs[srcs.length-2]})`;
            $("#play-window .controls_section .controls:nth-of-type(3)").style.backgroundSize = "25px 30px";
            $("#play-window .middle_section .horiz_controls:nth-of-type(3)").style.backgroundSize = "25px 30px";
        } 
        if(Game.alternatePlayAs) {
            let color = playerA.pieceColor;
            await setTimeout( () => Alternate(color), 100);
        } 
        await setTimeout(() => Refresh(true), 200);
        index = 0;
        } catch (error) {Notify(error + "");}
    } 
    else {
        let level = $$("#levels #nav div")[Game.level];
        if(level.children[0].innerHTML === "LOCKED") {
            level.style.backgroundImage = other.background;
            level.children[0].innerHTML = Game.levels[Game.level].level.replace(" ", "<br/>");
            level.children[1].style.filter = "grayscale(0) invert(0) brightness(1)";
            level.children[1].style.backgroundImage = `none`;
    
            if(level.children[1].children[0].className === "" || !level.children[1].children[0].className.includes("achieved")) {
                level.children[1].children[0].classList.add("not_achieved");
                level.children[1].children[1].classList.add("not_achieved");
                level.children[1].children[2].classList.add("not_achieved");
            }
        } 
    } 
    
    if(storage && index != "version") {
        let levels = $$("#nav div");
        let scores = [];
        levels.forEach((level, index) => {
            if(level.children[0].innerHTML !== "LOCKED") {
                let score = 3;
                for(let i = 0; i < level.children[1].children.length; i++) {
                    let label = level.children[1].children[i];
                    if(!label.className.includes("not_achieved")) {
                        score = i;
                        break;
                    } 
                }
                let validForHint = Game.levels[index].validForHint;
                scores.push({score, validForHint});
            } 
        });
        Game.versions[Game.version] = scores;
        storage.setItem("versions", JSON.stringify(Game.versions));
        storage.setItem("version", Game.version);
    }
    return;
} 

const End = (event) => {
    if(event.animationName === "pop-out") {
        let popUpNote = $("#pop-up-note");
        popUpNote.style.display = "none";
    } 
    else if(event.animationName === "fade-out") { try {
            event.target.classList.remove("captured");
            event.target.parentNode.removeChild(event.target);
        } catch (error) {}
    } 
} 

const AdjustScreen = (orientation) => { try {
    let vh = document.documentElement.clientHeight || window.innerHeight || window.screen.availHeight;
    let h = window.screen.height;
    
    if(orientation.includes("portrait")) {
        if(other.notch.has && h == vh)
            document.documentElement.style.setProperty("--border-top",  `${other.notch.top}px` );
    } 
    else if(orientation.includes("landscape")) {
        document.documentElement.style.setProperty("--border-top", "0");
    } 
    
    } catch (error) {alert (error)}
} 

const Home = async () => {
    if(GetValue($("#main-window"), "display") === "none") {
        let length = BackState.state.length;
        if(length > 0) { try {
            let current_state = BackState.state[length-1];
            await BackState.state.pop();
            
            if(current_state.length > 2) {
                await Clicked(current_state[2], current_state[2].parentNode);
            } 
            $(current_state[1]).style.display = "none";
            $(current_state[0]).style.display = "grid"; } catch (error) {document.write(error)}
        } 
        await Home();
    }
    
    return true;
}

async function play (isAutoRotate = false, accepted = false) { 
    if(Lobby != undefined && Lobby.isConnected && Game.mode === "two-player-online" || Game.mode === "single-player") {
        if(GetValue($("#play-window"), "display") == "none" && !isAutoRotate || accepted) {
        	// If game mode is online, request consent from opponent, otherwise just display the play window
            if(Game.mode === "two-player-online" && !accepted) {
                if(Game.alternatePlayAs) {
                    let color = playerA.pieceColor;
                    setTimeout( () => Alternate(color), 100);
                }
                setTimeout(async () => {
                    if(Game.rollDice) {
                        Game.firstMove = await RollDice();
                        //Notify(Game.firstMove);
                        Game.whiteTurn = (Game.firstMove)? playerA.pieceColor === "White": playerB.pieceColor === "White";
                    }
                    else {
                        let btns = $$("#settings-window #main-section .inner_item:nth-of-type(3) button");
                        Game.whiteTurn = (GetValue(btns[0], "background-image") == other.default);
                        Game.firstMove = (Game.whiteTurn && playerA.pieceColor === "White" || !Game.whiteTurn && playerA.pieceColor === "Black")? true: false;
                    }
                	
                    Notify("Play request has been sent to " + playerB.name);
                    let gameSettings = {firstMove: !Game.firstMove, mandatoryCapture: Game.mandatoryCapture, version: Game.version};
                    Publish({channel: Lobby.CHANNEL, message: {title: 'RequestPlay', content: gameSettings}});
                    Cancel();
                }, 200);
                return;
            }
            else if(Game.mode === "two-player-online" && accepted) {
                $("#play-window .footer_section p").style.display = "none";
                await setTimeout(async () => await Refresh(true), 200);
            } 
            
            if(Game.mode !== "two-player-online") {
                $("#play-window .footer_section p").style.display = "flex";
                if(Game.alternatePlayAs) {
                    let color = playerA.pieceColor;
                    setTimeout( () => Alternate(color), 100);
                } 
                setTimeout(async () => await Refresh(true), 200);
            }
           
            // choosing whether to display the hint button or not
            if(Game.mode === "two-player-online" || Game.level === 1 || Game.levels[Game.level-2].validForHint) {
                $("#play-window .middle_section .horiz_controls:nth-of-type(3)").style.backgroundImage = "var(--hint)";
                $("#play-window .controls_section .controls:nth-of-type(3)").style.backgroundImage = "var(--hint)";
                $("#play-window .controls_section .controls:nth-of-type(3)").style.backgroundSize = "30px 25px";
                $("#play-window .middle_section .horiz_controls:nth-of-type(3)").style.backgroundSize = "30px 25px";
            } 
            else if(!Game.levels[Game.level-2].validForHint) {
                $("#play-window .middle_section .horiz_controls:nth-of-type(3)").style.backgroundImage = `url(${srcs[srcs.length-2]})`;
                $("#play-window .controls_section .controls:nth-of-type(3)").style.backgroundImage = `url(${srcs[srcs.length-2]})`;
                $("#play-window .controls_section .controls:nth-of-type(3)").style.backgroundSize = "25px 30px";
                $("#play-window .middle_section .horiz_controls:nth-of-type(3)").style.backgroundSize = "25px 30px";
            }
            
            await Home();
            BackState.state.push(["#main-window", "#play-window"]);
            $("#main-window").style.display = "none";
            $("#play-window").style.display = "grid";
        }
        if(GetValue($("#play-window"), "display") == "grid") {
            let board = $(".board");
            let root = document.documentElement;
            root.style.setProperty("--angleZ", "0deg");
            root.style.setProperty("--angleZ" + playerB.pieceColor.slice(0,1), "0deg");
            
            if(Game.mode === "single-player") {
                $("#play-window .header_section h3").innerHTML = `${$("#levels h2").innerHTML}`;
                $(".face_bottom #level").innerHTML = `${$("#levels h2").innerHTML}`;
                for(let level of Game.levels) {
                    if(level.level === $("#levels h2").innerHTML) {
                        Game.level = Game.levels.indexOf(level) + 1;
                    } 
                } 
            } 
            else {
                $("#play-window .header_section h3").innerHTML = `${playerA.name} VS ${playerB.name}`;
                $(".face_bottom #level").innerHTML = `${playerA.name} VS ${playerB.name}`;
            } 
            
            if(screen.orientation.type.toLowerCase().includes("landscape")) {
                let vh = document.documentElement.clientHeight || window.innerHeight || window.screen.availHeight;
                let vw = document.documentElement.clientWidth || window.innerWidth || window.screen.availWidth;
                let height = Math.max(vh, vw);
                let width = Math.min(vh, vw);
                let ratio = Math.round(width/height);
                let top = -5;
                let bg_top = -15.5; 
                top += ((ratio > 0)? (ratio - 2.5): 0);
                bg_top += ((ratio > 0)? (ratio - 3): 0);
               
                Game.top = top;
                root.style.setProperty("--top", `${top}vh`);
                $(".perspective_background").style.top = `${bg_top}vh`;
                
                let shadowWidth = (width * 2.5)/276;
                root.style.setProperty("--angleX", "33deg"); 
                root.style.setProperty("--length", "112vmin");
                root.style.setProperty("--shadow-width", `${shadowWidth}px`);
                root.style.setProperty("--piece_size", "80%");
                
            } 
            else if(screen.orientation.type.toLowerCase().includes("portrait")) {
                //Game.top = 0;
                root.style.setProperty("--top", `0vmin`);
                
                root.style.setProperty("--angleX", "0deg"); 
                root.style.setProperty("--length", "calc(100vmin - 10px)");
                root.style.setProperty("--shadow-width", "0px");
                root.style.setProperty("--piece_size", "85%");
            } 
        }
    } 
    else if(Game.mode === "two-player-offline" && playerA.name != "You" && playerA.name !== "" && playerB.name != "AI" && playerB.name !== "") { try {
        let board = $(".board");
        let root = document.documentElement;
        $("#play-window .header_section h3").innerHTML = `${playerA.name} VS ${playerB.name}`;
        root.style.setProperty("--top", `0vh`);
        root.style.setProperty("--angleX", "0deg"); 
        root.style.setProperty("--length", "calc(100vmin - 10px)");
        root.style.setProperty("--shadow-width", "0px");
        root.style.setProperty("--piece_size", "85%");
        
        if(screen.orientation.type.toLowerCase().includes("landscape")) {
            root.style.setProperty("--angleZ", "0deg");
            root.style.setProperty("--angleZ" + playerB.pieceColor.slice(0,1), "180deg");
        } 
        else if(screen.orientation.type.toLowerCase().includes("portrait")) {
            root.style.setProperty("--angleZ", "90deg");
            root.style.setProperty("--angleZ" + playerB.pieceColor.slice(0,1), "180deg");
        } 
        
        if(!isAutoRotate) {
            $("#play-window .footer_section p").style.display = "none";
            if(Game.alternatePlayAs) {
                let color = playerA.pieceColor;
                setTimeout( () => Alternate(color), 100);
            } 
            setTimeout(async () => await Refresh(true), 200);
            
            $("#play-window .middle_section .horiz_controls:nth-of-type(3)").style.backgroundImage = "var(--hint)";
            $("#play-window .controls_section .controls:nth-of-type(3)").style.backgroundImage = "var(--hint)";
            $("#play-window .controls_section .controls:nth-of-type(3)").style.backgroundSize = "30px 25px";
            $("#play-window .middle_section .horiz_controls:nth-of-type(3)").style.backgroundSize = "30px 25px";
            
            BackState.state.push(["#main-window", "#play-window"]);
            $("#main-window").style.display = "none";
            $("#play-window").style.display = "grid";
        } 
        } catch (error) {document.write (error);} 
    } 
    else if(!isAutoRotate) {
        if(Game.mode === 'two-player-online')
            Notify("Can't play, you have no opponent. Please wait or invite one or join another channel.");
        else if(Game.mode === 'two-player-offline')
            Notify("Can't play, you haven't filled out players details. Fill them out and try again.");
    } 
} 

async function orientationLocking (elem, orientation) {
    Sound.capture.muted = true;
    Sound.king.muted = true;
    Sound.collect.muted = true;
    Sound.game_win.muted = true;
    Sound.game_lose.muted = true;
    Sound.capture.play();
    Sound.king.play();
    Sound.collect.play();
    Sound.game_win.play();
    Sound.game_lose.play();
    try {
        let isFullScreen = () => {
            if(document.fullscreenElement !== undefined) return document.fullscreenElement;
            if(document.webkitFullscreenElement !== undefined) return document.webkitFullscreenElement;
            if(document.mozFullscreenElement !== undefined) return document.mozFullscreenElement;
            if(document.msFullscreenElement !== undefined) return document.msFullscreenElement;
        } 
        let method = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.mozRequestFullscreen || elem.msRequestFullscreen;
       
        other.fullscreenSupport = method? true: false;
        
        if(method && !isFullScreen()) {
            await method.call(elem);
            screen.orientation.lock(orientation).then(() => {
                let viewBtns = $("#settings-window #main-section #item1").children;
                if(screen.orientation.type.toLowerCase().includes("portrait")) {
                    viewBtns[2].style.background = other.default;
                    viewBtns[1].style.background = other.background;
                    other.orientation = "portrait";
                    
                    setTimeout(() => {AdjustScreen("portrait");}, 1500);
                } 
                else if(screen.orientation.type.toLowerCase().includes("landscape")) {
                    viewBtns[1].style.background = "rgba(0, 152, 25, 0.9)";
                    viewBtns[2].style.background = other.background;
                    other.orientation = "landscape";
                    
                    setTimeout(() => {AdjustScreen("landscape");}, 1500);
                }
            }).catch((error) => {
                if(other.orientation === "natural") {
                    $$("#settings-window #main-section .inner_item")[0].style.display = "none";
                    if(screen.orientation.type.toLowerCase().includes("portrait")) {
	                    setTimeout(() => {AdjustScreen("portrait");}, 1500);
	                }
	                else if(screen.orientation.type.toLowerCase().includes("landscape")) {
	                    setTimeout(() => {AdjustScreen("landscape");}, 1500);
	                } 
                } 
            });
        } 
        else if(method && isFullScreen() && orientation != "natural") {
            screen.orientation.lock(orientation).then(() => {
                if(screen.orientation.type.toLowerCase().includes("portrait")) {
                    other.orientation = "portrait";
                }
                else if(screen.orientation.type.toLowerCase().includes("landscape")) {
                    other.orientation = "landscape";
                } 
                setTimeout(() => {AdjustScreen(orientation);}, 1500);
            }).catch((error) => {
                //$$("#settings-window #main-section .inner_item")[0].style.display = "none";
            });
        } 
    } catch (error) {
        if(other.orientation === "natural") 
            $$("#settings-window #main-section .inner_item")[0].style.display = "none";
    }
} 

async function back (undo = false, isComp = false) {
	if(Game.thinking && undo) {
		Notify("Please wait for opponent's move");
		return;
	} 
    if(!undo) {
        let btns = $("#settings-window #main-section #item1").children;
        for(let btn of btns) {
            if(GetValue(btn, "background-image") == other.default) { 
                if(btn.innerHTML == "HORIZ." && screen.orientation.type.toLowerCase().includes("portrait")) {
                    await orientationLocking(document.documentElement, "landscape-primary"); 
                    other.orientation = "landscape-primary";
                    break;
                } 
                else if(btn.innerHTML == "VERT." && screen.orientation.type.toLowerCase().includes("landscape")) {
                    await orientationLocking(document.documentElement, "portrait-primary");
                    other.orientation = "portrait-primary";
                    break;
                } 
            } 
        } 
        
        btns = $$("#settings-window #main-section .inner_item:nth-of-type(3) button");
        for(let btn of btns) {
            if(GetValue(btn, "background-image") == other.default) { 
                if(btn.innerHTML != "ROLL DICE") {
                    Game.whiteTurn = btn.innerHTML == "WHITE";
                    Game.rollDice = false;
                } 
                else
                    Game.rollDice = true;
                    
                break;
            } 
        } 
        
        btns = $$("#settings-window #main-section .inner_item:nth-of-type(5) button");
        for(let btn of btns) {
            if(GetValue(btn, "background-image") == other.default) { 
                Game.mandatoryCapture = btn.innerHTML === "ON";
                break;
            } 
        } 
        
        btns = $$("#settings-window #main-section .inner_item:nth-of-type(6) button");
        for(let btn of btns) {
            if(GetValue(btn, "background-image") === other.default) {
                if(btn.id === "active") {
                    Game.helper = true;
                    Game.capturesHelper = true;
                    break;
                } 
                else if(btn.id === "inactive") {
                    Game.helper = false;
                    Game.capturesHelper = false;
                    break;
                }
                else {
                    Game.capturesHelper = true;
                    Game.helper = false;
                    break;
                } 
            } 
        } 
        
        let length = BackState.state.length;
        if(length > 0) { try {
            let current_state = BackState.state[length-1];
            await BackState.state.pop();
            
            if(current_state.length > 2) {
                await Clicked(current_state[2], current_state[2].parentNode);
            } 
            $(current_state[1]).style.display = "none";
            $(current_state[0]).style.display = "grid"; } catch (error) {document.write(error)}
        } 
    } 
    else if(!Game.over) { 
        let moving = $$("#transmitter .outer");
        if(moving.length == 0) {
            let length = BackState.moves.length;
            if(length > 0 && Game.mode === "two-player-offline" || length > 0 && Game.mode === "two-player-online" && (Game.whiteTurn && playerB.pieceColor === "White" || !Game.whiteTurn && playerB.pieceColor === "Black" || isComp) || Game.mode === "single-player" && (length > 1 && (Game.whiteTurn && playerA.pieceColor === "White" || !Game.whiteTurn && playerA.pieceColor === "Black") || length > 0 && (Game.whiteTurn && playerB.pieceColor === "White" || !Game.whiteTurn && playerB.pieceColor === "Black"))) {
                let move = BackState.moves[length-1];
                await BackState.moves.pop();
                Undo.move(move);
               
                for(let move of BackState.moves) {
                    if(move.length === 3) { try {
                        let piece = move[1].piece || move[0].cell.firstChild;
                        if(piece.className.includes(playerA.pieceColor.toLowerCase()))
                            playerA.longestCapture = Math.max(move[2].length, playerA.longestCapture);
                        else
                            playerB.longestCapture = Math.max(move[2].length, playerB.longestCapture);
						} catch (error) {console.log(move[1].piece)}
                    } 
                } 
               
                for(let cell of $$("#table .valid, #table .pre_valid, #table .hint, .helper_empty, .helper_filled")) {
	                cell.classList.remove("valid");
	                cell.classList.remove("pre_valid");
	                cell.classList.remove("hint");
	                cell.classList.remove("helper_empty");
	                cell.classList.remove("helper_filled");
	            }
				
                Game.whiteTurn = !Game.whiteTurn;
                if(Game.mode === "single-player" && (Game.whiteTurn && playerB.pieceColor === "White" || !Game.whiteTurn && playerB.pieceColor === "Black")) {
                    Game.validForHint = false;
                    $("#play-window .footer_section p label:last-of-type").style.backgroundImage = "var(--undo)";
                    await back(true, true);
                    return;
                }
                else if(Game.mode === "two-player-online" && (Game.whiteTurn && playerA.pieceColor === "White" || !Game.whiteTurn && playerA.pieceColor === "Black")) {
                    Publish({channel: Lobby.CHANNEL, message: {title: "Undone", content: {} } });
                }
                // To avoid clushing due to multiple click events will use setTimeout function. 
                clearTimeout(other.timeout);
                other.timeout = setTimeout(async _ => {
                	other.helperPath = [];
	                let id = Game.whiteTurn && playerA.pieceColor === "White" || !Game.whiteTurn && playerA.pieceColor === "Black"? playerA.pieceColor.charAt(0): playerB.pieceColor.charAt(0);
	                Game.possibleCaptures = await Iterate({id, state: Game.state, func: AssesCaptures});
	                Game.possibleMoves = await Iterate({id, state: Game.state, func: AssesMoves});
	                if(Game.possibleCaptures.length) {
	                	if(!Game.mandatoryCapture) {
	                		await Helper(Game.possibleMoves.concat(Game.possibleCaptures), JSON.parse(JSON.stringify(Game.state)));
	                		await Helper(Game.possibleCaptures, JSON.parse(JSON.stringify(Game.state)));
	                	}
	                	else
	                		await Helper(Game.possibleCaptures, JSON.parse(JSON.stringify(Game.state)));
	                }
	                else if(Game.mode == "two-player-offline" || (Game.mode === "single-player" || Game.mode === "two-player-online") && Game.whiteTurn && playerA.pieceColor === "White" || !Game.whiteTurn && playerA.pieceColor === "Black") {
	                	await Helper(Game.possibleMoves, JSON.parse(JSON.stringify(Game.state)));
	                }
                    await UpdatePiecesStatus();
				}, 100);
            } 
            else {
                Notify("No moves made yet");
            } 
        }
        else {
            // nothing much here
        }
    }
    else {
        GameOver();
    } 
}

class Undo {
	static moves = [];
	static move = (move) => {
		// To avoid clush during undo will use a queue.
		
		this.moves.push(move);
		if(this.moves.length == 1)
			this.undo();
	}
	static undo = async () => {
		let table = $("#table");
		while(this.moves.length > 0) {
			let move = this.moves[0];
			let i = move[1].i;
			let j = move[1].j;
			let m = move[0].i;
			let n = move[0].j;
			let piece = move[1].piece;
			let id = Game.state[i][j];
			await piece.classList.remove("captured");
			if(move[1].king) {
	            if(piece.className.includes("white")) {
	                piece.classList.remove("crown_white");
	            } 
	            else {
	                piece.classList.remove("crown_black");
	            } 
	            
	            if(piece.className.includes(playerA.pieceColor.toLowerCase()))
	            playerA.kings--;
	            else
	            playerB.kings--;
	            
	            id = id.replace("K", "M");
			}
			//Updating moves made by each player
			if(piece.className.includes(playerA.pieceColor.toLowerCase()))
            	playerA.moves--;
            else
            	playerB.moves--;
            
			try{table.rows[i].cells[j].removeChild(piece);} catch(error) {};
			table.rows[m].cells[n].appendChild(piece);
			Game.state[i][j] = "EC";
			Game.state[m][n] = id;
			
			if(move.length === 3) {
                for(let caps of move[2]) {
                	await caps[0].classList.remove("captured");
                    i = caps[1];
                    j = caps[2];
                    $("#table").rows[i].cells[j].appendChild(caps[0]);
                    Game.state[i][j] = caps[3];
                } 
            }
            this.moves.shift();
		} 
	} 
} 