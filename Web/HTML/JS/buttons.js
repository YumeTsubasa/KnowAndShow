// buttons.js
// Main game logic, popover handling, lives/points

import { loadQuestions, getQuestionData } from "./data.js";
import { buildQuestionContent, createBranchContent, createGameoverContent, createMultiContent } from "./contentBuilder.js";

console.log("🟢 buttons.js loaded");

document.addEventListener('DOMContentLoaded', async () => {

  // -----------------------------
  // Global game state (shared between boards)
  // -----------------------------
  let storedLives = localStorage.getItem('livesCounter');
  let livesCounter = storedLives !== null ? parseInt(storedLives) : 1;
  
  let storedPoints = localStorage.getItem('pointsCounter');
  let pointsCounter = storedPoints !== null ? parseInt(storedPoints) : 0;
  
  let playerName = localStorage.getItem('playerName') || "Player";

  const livesDisplay = document.querySelector('.lives img');
  const pointsDisplay = document.querySelector('.points h1');
  const gameoverPopover = document.querySelector('.gameover_popover');

  const livesImages = { 1: "img/misc/safe.png", 0: "img/misc/danger.png" };

  const mainBGM = document.getElementById('bgMain'); // <audio id="bgMain" src="...">
  if (mainBGM) mainBGM.loop = true;
  mainBGM?.play().catch(() => {});


  // Load JSON questions first
if (window.location.href.includes("Risky.html")) {
  window.GAME_MODE = "risky";
  await loadQuestions("JSON/qRisky.json"); // <-- different file
} else {
  window.GAME_MODE = "normal";
  await loadQuestions("JSON/qNormal.json");
}

  // -----------------------------
  // Restore disabled tiles (global)
  // -----------------------------
  const savedDisabledTiles = JSON.parse(localStorage.getItem('disabledTiles')) || [];
  savedDisabledTiles.forEach(id => {
    const tileBtn = document.querySelector(`.tileBtn[popovertarget="${id}"]`);
    if (tileBtn) {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);pointer-events:none;';
      tileBtn.style.position = 'relative';
      tileBtn.appendChild(overlay);
      tileBtn.disabled = true;
    }
  });

  // -----------------------------
  // Display updates
  // -----------------------------
  function updateLivesDisplay() {
    if (livesCounter > 1) livesCounter = 1;
    if (livesCounter < -1) livesCounter = -1;
    if (livesDisplay) livesDisplay.src = livesImages[livesCounter > 0 ? 1 : 0];
    localStorage.setItem('livesCounter', livesCounter);
    if (livesCounter === -1) {
		setTimeout(() => {
			showGameOver();
		}, 1750); // delay in ms, same as your feedback delay
}

  }

  function updatePointsDisplay() {
    if (pointsDisplay) pointsDisplay.textContent = `${playerName}: ${pointsCounter}`;
    localStorage.setItem('pointsCounter', pointsCounter);
  }

function awardPoints() {
  console.trace("awardPoints called");
  const multiplier = (window.GAME_MODE === "risky") ? 2 : 1;
  pointsCounter += multiplier;
  updatePointsDisplay();
}



  // -----------------------------
  // Save individual tile to localStorage
  // -----------------------------
  function saveDisabledTiles(tileId) {
    let disabledTiles = JSON.parse(localStorage.getItem('disabledTiles')) || [];
    if (!disabledTiles.includes(tileId)) disabledTiles.push(tileId);
    localStorage.setItem('disabledTiles', JSON.stringify(disabledTiles));
  }

// -----------------------------
// Popover container
// -----------------------------
let popoverContainer = document.getElementById("popoverContainer");
if (!popoverContainer) {
    popoverContainer = document.createElement("div");
    popoverContainer.id = "popoverContainer";
    document.body.appendChild(popoverContainer);
}

// -----------------------------
// Game over handling
// -----------------------------
function showGameOver() {
    if (!popoverContainer) return;

    // --- Stop main BGM ---
    if (mainBGM && !mainBGM.paused) {
        mainBGM.pause();
        mainBGM.currentTime = 0;
    }

	const fade = document.querySelector('.gameover_fade');
	if (fade) {
	  setTimeout(() => fade.classList.add('fade-20'), 10);
	  setTimeout(() => { fade.classList.remove('fade-20'); fade.classList.add('fade-40'); }, 110);
	  setTimeout(() => { fade.classList.remove('fade-40'); fade.classList.add('fade-60'); }, 210);
	  setTimeout(() => { fade.classList.remove('fade-60'); fade.classList.add('fade-80'); }, 310);
	  setTimeout(() => { fade.classList.remove('fade-80'); fade.classList.add('fade-100'); }, 410);
	  //setTimeout(() => { fade.classList.remove('fade-100'); fade.classList.add('fade-80'); }, 1410);
	  //setTimeout(() => { fade.classList.remove('fade-80'); fade.classList.add('fade-60'); }, 1610);
	  //setTimeout(() => { fade.classList.remove('fade-60'); fade.classList.add('fade-40'); }, 1810);
	  //setTimeout(() => { fade.classList.remove('fade-40'); fade.classList.add('fade-20'); }, 2010);
	  //setTimeout(() => { fade.classList.remove('fade-20'); }, 2210);
}


    let gameoverPopover = document.getElementById('gameoverPopover');
    if (!gameoverPopover) {
        gameoverPopover = createGameoverContent({ id: 'gameoverPopover' });
        popoverContainer.appendChild(gameoverPopover);
    }

    // Inject dynamic content directly
    const scoreDiv = gameoverPopover.querySelector('.gameover_popover_score h2');
    if (scoreDiv) {
        scoreDiv.textContent = `Player ${playerName} has scored ${pointsCounter} points`;
    }
    
    // Save the score in localStorage
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    const existingIndex = scores.findIndex(s => s.player === playerName);
    if (existingIndex >= 0) {
        scores[existingIndex].points = pointsCounter;
    } else {
        scores.push({ player: playerName, points: pointsCounter });
    }
    localStorage.setItem('scores', JSON.stringify(scores));



    // Show popover after 2s delay
    setTimeout(() => {
        gameoverPopover.classList.add('show');
		    // Reset counters
		localStorage.removeItem('livesCounter');
		localStorage.removeItem('pointsCounter');
		livesCounter = 1;
		pointsCounter = 0;
    }, 3500);

    // Add button event listeners
    const restartBtn = gameoverPopover.querySelector('.restartBtn');
    if (restartBtn) restartBtn.addEventListener('click', () => window.location.href = 'Name.html');

    const scoresBtn = gameoverPopover.querySelector('.scoresBtn');
    if (scoresBtn) scoresBtn.addEventListener('click', () => window.location.href = 'Scores.html');

	const dismissBtn = gameoverPopover.querySelector('.dismissBtn');
	if (dismissBtn) {
	  dismissBtn.addEventListener('click', () => {
		gameoverPopover.classList.remove('show');
		if (mainBGM && mainBGM.paused) {
		  mainBGM.play().catch(() => {});
		}
		fade.classList.remove('fade-100');
	  });
	}
}

  updateLivesDisplay();
  updatePointsDisplay();

// -----------------------------
// Multi-choice question handling (2x2 layout, non-clickable, borderless)
// -----------------------------
function setupMultiChoice(popover, questionData) {
    if (!popover || !questionData) return;

    // Create answers container and answer button if not already in DOM
    let answersContainer = popover.querySelector('.popover_multi_answers');
    if (!answersContainer) {
        answersContainer = document.createElement("div");
        answersContainer.classList.add("popover_multi_answers");
        popover.appendChild(answersContainer);
    }

    let answerBtn = popover.querySelector('.answerMultiBtn');
    if (!answerBtn) {
        answerBtn = document.createElement("button");
        answerBtn.classList.add("answerMultiBtn");
        answerBtn.textContent = "Show Answer";
        popover.appendChild(answerBtn);
    }

    // Clear previous content
    answersContainer.innerHTML = "";

    // Wrapper for 2x2 grid
    const wrapper = document.createElement("div");
    wrapper.style.display = "grid";
    wrapper.style.gridTemplateColumns = "1fr 1fr"; // 2 columns
    wrapper.style.gridGap = "10px";               // spacing
    answersContainer.appendChild(wrapper);

    // Populate answers dynamically
    questionData.answers.forEach((ans, i) => {
        const ansDiv = document.createElement("div");
        ansDiv.textContent = `${String.fromCharCode(65 + i)}: ${ans.text || "No answer provided"}`;
        ansDiv.dataset.correct = ans.correct;
        ansDiv.style.color = "";           
        ansDiv.style.textAlign = "left";   
        wrapper.appendChild(ansDiv);
    });

    // Answer button: highlight correct answer
    answerBtn.onclick = () => {
        wrapper.querySelectorAll("div").forEach(ansDiv => {
            if (ansDiv.dataset.correct === "true") ansDiv.style.color = "green";
        });
        answerBtn.style.display = "none";
    };
}

// -----------------------------
// Tile buttons (dynamic popovers)
// -----------------------------
document.querySelectorAll('.tileBtn[popovertarget]').forEach(tileBtn => {
    tileBtn.addEventListener('click', () => {
        const tileId = tileBtn.getAttribute('popovertarget');
        const questionData = getQuestionData(tileId);
        if (!questionData) return;

        let popoverContainer = document.querySelector('#popoverContainer');
        if (!popoverContainer) return;

        let popover;

        // -----------------------------
        // Use switch to handle different question types
        // -----------------------------
        switch (questionData.type) {
            // -------------------
            // Branch tile handling
            // -------------------
            case "branch":
                popover = createBranchContent(questionData);
                popover.id = tileId;
                popoverContainer.innerHTML = "";
                popoverContainer.appendChild(popover);

                document.querySelectorAll(".popover.show").forEach(p => {
                    if (p !== popover) p.classList.remove("show");
                });
                popover.classList.add('show');

                // Pause main BGM if needed
                if (mainBGM && !mainBGM.paused) mainBGM.pause();
                window.lastPopoverID = tileId;

                // Setup branch buttons dynamically
                ["A", "B", "C", "D", "E"].forEach(letter => {
                    const btn = popover.querySelector(`.branch${letter}Btn`);
                    if (btn) {
                        btn.onclick = () => {
                            popover.classList.remove('show');
                            popoverContainer.innerHTML = "";

                            const newPopover = buildQuestionContent(questionData[`branch${letter}`]);
                            popoverContainer.appendChild(newPopover);
                            setupPopoverButtons(newPopover);
                            newPopover.classList.add('show');
                            window.lastPopoverID = tileId;
                        };
                    }
                });

                break;

            // -------------------
            // Multi-choice handling
            // -------------------
case "multi":
    // Create popover structure using contentBuilder
    popover = createMultiContent(questionData);

    // Now populate the 2x2 answers via buttons.js
    setupMultiChoice(popover, questionData);

    popoverContainer.innerHTML = "";
    popoverContainer.appendChild(popover);
    break;





            // -------------------
            // Normal question tiles
            // -------------------
            default:
                popover = buildQuestionContent(questionData);
                popover.id = tileId;
                popoverContainer.innerHTML = "";
                popoverContainer.appendChild(popover);
                break;
        }


      document.querySelectorAll(".popover.show").forEach(p => { if (p !== popover) p.classList.remove("show"); });
      popover.classList.add('show');
	  
	  // Pause main BGM
		if (mainBGM && !mainBGM.paused) mainBGM.pause();

		// Play question-specific music (if any)
	const qAudio = popover.querySelector('.qAudio'); // <audio class="qMusic" src="...">
		if (qAudio) {
		qAudio.currentTime = 0;
		qAudio.play().catch(() => {});
	}

      window.lastPopoverID = tileId;

      setupPopoverButtons(popover);
    });
  });

  // -----------------------------
  // Non-tile popovers (Name.html etc)
  // -----------------------------
  document.querySelectorAll('[popovertarget]').forEach(btn => {
    if (btn.classList.contains('tileBtn')) return;
    const targetId = btn.getAttribute('popovertarget');
    const popover = document.getElementById(targetId);
    if (!popover) return;

    btn.addEventListener('click', () => {
      if (targetId === 'InputOK') {
        const playerInput = document.getElementById('playerNameInput');
        const popoverText = popover.querySelector('h1');
        const nameValue = playerInput ? playerInput.value.trim() : '';
        if (!nameValue) return alert('Please enter a name.');
        if (popoverText) popoverText.textContent = `Do you choose "${nameValue}" as your name?`;
      }

      document.querySelectorAll(".popover.show").forEach(p => { if (p !== popover) p.classList.remove("show"); });
      popover.classList.add('show');
      window.lastPopoverID = targetId;
    });
  });

  // Simple redirect function
function goToPage(url) {
  window.location.href = url;
}

  // Redirect button (DOM already ready here)
const board2Btn = document.getElementById("board2Btn");

if (board2Btn) {
  board2Btn.addEventListener("click", () => {
    goToPage("Normal2.html");
  });
}

  // -----------------------------
  // Popover buttons
  // -----------------------------
  function setupPopoverButtons(popover) {
    const wrongBtn = popover.querySelector('.wrongBtn');
    const rightBtn = popover.querySelector('.rightBtn');
    const answerBtn = popover.querySelector('.answerBtn');
    const skipBtn = popover.querySelector('.skipBtn');
	const successDiv = popover.querySelector('.popover_success');
    const failureDiv = popover.querySelector('.popover_failure');
	const answerDiv = popover.querySelector('.popover_answer');
	const hint1Div = popover.querySelector('.popover_hint1');
    const hint1Btn = popover.querySelector('.hint1Btn');
    const hint2Div = popover.querySelector('.popover_hint2');
    const hint2Btn = popover.querySelector('.hint2Btn');
    const hint3Div = popover.querySelector('.popover_hint3');
    const hint3Btn = popover.querySelector('.hint3Btn');
    const solo2Div = popover.querySelector('.popover_solo2');
    const solo2Btn = popover.querySelector('.solo2Btn');
    const host1Div = popover.querySelector('.popover_host1');
    const host1Btn = popover.querySelector('.host1Btn');
    const host2Div = popover.querySelector('.popover_host2');
    const host2Btn = popover.querySelector('.host2Btn');
	const host3Div = popover.querySelector('.popover_host3');
    const host3Btn = popover.querySelector('.host3Btn');
    const decision1Div = popover.querySelector('.popover_decision1');
    const decision1Btn = popover.querySelector('.decision1Btn');
    const decision2Div = popover.querySelector('.popover_decision2');
    const decision2Btn = popover.querySelector('.decision2Btn');
	const decision3Div = popover.querySelector('.popover_decision3');
    const decision3Btn = popover.querySelector('.decision3Btn');
    const riskyYesBtn = popover.querySelector('.riskyYesBtn');
    const riskyNoBtn = popover.querySelector('.riskyNoBtn');
	const shortBtn = popover.querySelector('.shortBtn');
	const shortDiv = popover.querySelector('.popover_question_text_short2');
	const answerCharacterBtn = popover.querySelector('.answerCharacterBtn');
	const characterRevealDiv = popover.querySelector('.popover_character_reveal');

    // -----------------------------
    // Disable tile after use
    // -----------------------------
    function disableTileAfterUse() {
      const popoverID = window.lastPopoverID;
      if (!popoverID) return;
      const tileBtn = document.querySelector(`.tileBtn[popovertarget="${popoverID}"]`);
      if (tileBtn && !tileBtn.disabled) {
        tileBtn.disabled = true;
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.5);pointer-events:none;';
        tileBtn.style.position = 'relative';
        tileBtn.appendChild(overlay);
        saveDisabledTiles(popoverID); // ← pass ID here
      }
      window.lastPopoverID = null;
    }

    // --- Attach standard button events ---
	if (answerCharacterBtn && answerDiv && characterRevealDiv) {
	  answerCharacterBtn.addEventListener('click', () => { 
		answerDiv.classList.add('show');
		answerCharacterBtn.parentElement.classList.add('hidden');
		characterRevealDiv.classList.add('show');
	  });
	}

	
	if (answerBtn && answerDiv) answerBtn.addEventListener('click', () => { 
      answerDiv.classList.add('show'); 
      answerBtn.parentElement.classList.add('hidden'); 
    });
	
	if (shortBtn && shortDiv) shortBtn.addEventListener('click', () => { 
      shortDiv.classList.add('show');
    });

    if (skipBtn) skipBtn.addEventListener('click', () => { 
      disableTileAfterUse(); 
      popover.classList.remove('show'); 
	  	const audio = skipBtn.querySelector('audio');
		if (qAudio && !qAudio.paused) {
			qAudio.pause();
			qAudio.currentTime = 0;
			}
		if (mainBGM && mainBGM.paused) mainBGM.play().catch(() => {});
    });
	
if (wrongBtn) wrongBtn.addEventListener('click', () => {
	// 1️⃣ Apply game consequence immediately
		livesCounter--;
		updateLivesDisplay();
		disableTileAfterUse();
		failureDiv.classList.add('show');
		const audio = wrongBtn.querySelector('audio');
			if (audio) {
			audio.currentTime = 0;
			audio.volume = 0.5;
			audio.play().catch(() => {});
			}
		if (qAudio && !qAudio.paused) {
			qAudio.pause();
			qAudio.currentTime = 0;
			}
  
	// 3️⃣ Delay popover close so feedback + sound can play
  
	setTimeout(() => {
	  // Only resume main BGM if the player still has lives left
	  if (livesCounter >= 0 && mainBGM && mainBGM.paused) {
		mainBGM.play().catch(() => {});
	  }

	  popover.classList.remove('show');

	  // Optionally show game over after removing popover
	  if (livesCounter === -1) {
		showGameOver();
	  }
	}, 1700);

		});


if (rightBtn) rightBtn.addEventListener('click', () => {

  // ✅ Award points (normal = 1, risky = 2)
  awardPoints();

  disableTileAfterUse();
  successDiv.classList.add('show');

  const audio = rightBtn.querySelector('audio');
  if (audio) {
    audio.currentTime = 0;
    audio.volume = 0.5;
    audio.play().catch(() => {});
  }

  if (qAudio && !qAudio.paused) {
    qAudio.pause();
    qAudio.currentTime = 0;
  }

  // ⏳ Delay popover close so feedback + sound can play
  setTimeout(() => {
    if (mainBGM && mainBGM.paused) mainBGM.play().catch(() => {});
    popover.classList.remove('show');
  }, 2500);

});

// -----------------------------
// Multi-choice question handling (2x2 layout, non-clickable, borderless)
// -----------------------------
function setupMultiChoice(popover) {
  if (!popover) return;
	
	console.log("MULTI popover id:", popover.id);
console.log("MULTI question data:", getQuestionData(popover.id));


  // Grab container and answer button
  const answersContainer = popover.querySelector('.popover_multi_answers');
  const answerBtn = popover.querySelector('.answerMultiBtn');
  if (!answersContainer || !answerBtn) return;

  // Get question data from JSON
  const questionData = getQuestionData(popover.id);
  if (!questionData || !questionData.answers) return;

  const answers = questionData.answers;

  // Clear previous content
  answersContainer.innerHTML = "";

  // Wrapper for 2x2 grid
  const wrapper = document.createElement("div");
  wrapper.style.display = "grid";
  wrapper.style.gridTemplateColumns = "1fr 1fr"; // 2 columns
  wrapper.style.gridGap = "10px";               // spacing
  answersContainer.appendChild(wrapper);

  // Populate answers dynamically
  answers.forEach((ans, i) => {
    const ansDiv = document.createElement("div");
    ansDiv.textContent = `${String.fromCharCode(65 + i)}: ${ans.text || "No answer provided"}`;
    ansDiv.dataset.correct = ans.correct; // track correctness
    ansDiv.style.color = "";               // reset color
    ansDiv.style.textAlign = "left";     // center text
    wrapper.appendChild(ansDiv);
  });

  // Answer button: highlight correct answer
  answerBtn.addEventListener("click", () => {
    wrapper.querySelectorAll("div").forEach(ansDiv => {
      if (ansDiv.dataset.correct === "true") {
        ansDiv.style.color = "green";
      } //else {
        //ansDiv.style.color = "red"; // optional
		//}
    });

    // Hide button after press
    answerBtn.style.display = "none";
  });
}

// ---------------------------------
// Minefield minigame state
// ---------------------------------
let minefieldActive = false;
let minefieldFinalized = false; // guard to prevent double-finalize
let selectedTiles = [];
let nonSelectedTiles = [];
let minefieldResult = null; // stores result for close button

const proceedMineBtn = popover.querySelector('.proceedMineBtn');
const proceedMine2Btn = popover.querySelector('.proceedMine2Btn');
const closeBtnMine = popover.querySelector('.closeBtnMine');

// ---------------------------------
// Start new minefield
// ---------------------------------
function startMinefield() {
  minefieldActive = true;
  minefieldFinalized = false;
  selectedTiles = [];
  minefieldResult = null;

  if (proceedMineBtn) proceedMineBtn.disabled = true;
  if (proceedMine2Btn) proceedMine2Btn.disabled = true;
  if (closeBtnMine) closeBtnMine.disabled = true;

  const tiles = Array.from(popover.querySelectorAll('.minefieldTile'));
  tiles.forEach(tileBtn => {
    tileBtn.disabled = false;
    tileBtn.classList.remove('used-safe','used-mine','selected','last-selected');
    tileBtn.style.backgroundColor = "";
  });

  return tiles;
}

const tiles = startMinefield();

// ---------------------------------
// Helper: desaturate color
// ---------------------------------
function desaturateColor(color, factor = 0.50) {
  let hsl;
  switch (color) {
    case "red": hsl = [0, 80, 50]; break;
    case "lime": hsl = [120, 80, 50]; break;
    default: return color;
  }
  hsl[1] = hsl[1] * factor;
  return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
}

// ---------------------------------
// Tile click handling
// ---------------------------------
tiles.forEach(tileBtn => {
  tileBtn.addEventListener('click', () => {
    if (!minefieldActive || minefieldFinalized) return;

    tiles.forEach(t => t.classList.remove('last-selected'));

    if (selectedTiles.includes(tileBtn)) {
      tileBtn.classList.remove('selected');
      tileBtn.style.backgroundColor = "";
      selectedTiles = selectedTiles.filter(t => t !== tileBtn);
      if (proceedMineBtn) proceedMineBtn.disabled = selectedTiles.length !== 4;
      return;
    }

    if (selectedTiles.length < 4) {
      selectedTiles.push(tileBtn);
      tileBtn.classList.add('selected','last-selected');
      tileBtn.style.backgroundColor = "#4dd0e1";
    }

    if (selectedTiles.length === 4 && proceedMineBtn) {
      proceedMineBtn.disabled = false;
    }

    const lastTile = selectedTiles[selectedTiles.length - 1];
    lastTile.classList.add('last-selected');
    lastTile.style.backgroundColor = "#4dd0e1";
  });
});

// ---------------------------------
// Proceed button #1: reveal selected tiles
// ---------------------------------
if (proceedMineBtn) {
  proceedMineBtn.addEventListener('click', () => {
    if (selectedTiles.length !== 4 || minefieldFinalized) return;

    minefieldActive = false;
    proceedMineBtn.disabled = true;
    if (proceedMine2Btn) proceedMine2Btn.disabled = true;

    tiles.forEach(t => t.disabled = true);

    if (proceedMine2Btn) setTimeout(() => proceedMine2Btn.disabled = false, 4000);

    nonSelectedTiles = tiles.filter(t => !selectedTiles.includes(t));
    nonSelectedTiles.sort(() => Math.random() - 0.5);

    const safeRevealSound = new Audio("audio/main/mine_right.wav");
    const mineRevealSound = new Audio("audio/main/mine_wrong.wav");
    safeRevealSound.volume = 0.65;
    mineRevealSound.volume = 0.65;

    let selIdx = 0;
    function revealSelected() {
      if (selIdx >= selectedTiles.length) return;
      const tile = selectedTiles[selIdx];
      const isMine = tile.dataset.type === 'mine';
      tile.style.backgroundColor = isMine ? "red" : "lime";
      tile.classList.add(isMine ? 'used-mine' : 'used-safe');

      const sound = isMine ? mineRevealSound : safeRevealSound;
      sound.currentTime = 0;
      sound.play().catch(() => {});

      selIdx++;
      setTimeout(revealSelected, 1000);
    }

    revealSelected();
  });
}

// ---------------------------------
// Proceed button #2: reveal non-selected tiles
// ---------------------------------
if (proceedMine2Btn) {
  proceedMine2Btn.addEventListener('click', () => {
    if (minefieldFinalized) return;
    proceedMine2Btn.disabled = true;

    const safeRevealSound = new Audio("audio/main/mine_right.wav");
    const mineRevealSound = new Audio("audio/main/mine_wrong.wav");
    safeRevealSound.volume = 0.65;
    mineRevealSound.volume = 0.65;

    let idx = 0;
    function revealNonSelected() {
		// After all non-selected tiles are revealed
		if (idx >= nonSelectedTiles.length) {
		  // Calculate result
		  minefieldResult = finalizeMinefield();

		  // Show message box immediately (text + hide cat)
		  const safeCount = selectedTiles.filter(t => t.dataset.type !== 'mine').length;
		  const pointsEarned = 0; // placeholder, actual points applied on close
		  const lifeLost = minefieldResult.resultType === "lifeLost";
		  showMinefieldResult({ safeCount, pointsEarned, lifeLost, resultType: minefieldResult.resultType });

		  // Enable close button immediately
		  if (closeBtnMine) closeBtnMine.disabled = false;

		  return;
		}

      const tile = nonSelectedTiles[idx];
      const isMine = tile.dataset.type === 'mine';
      const baseColor = isMine ? "red" : "lime";
      tile.style.backgroundColor = desaturateColor(baseColor, 0.75);
      tile.classList.add(isMine ? 'used-mine' : 'used-safe');

      const sound = isMine ? mineRevealSound : safeRevealSound;
      sound.currentTime = 0;
      sound.play().catch(() => {});

      idx++;
      setTimeout(revealNonSelected, 750);
    }

    revealNonSelected();
  });
}

// ---------------------------------
// Calculate minefield result (no lives/points yet)
function finalizeMinefield() {
  if (minefieldFinalized) return null;
  minefieldFinalized = true;

  const safeCount = selectedTiles.filter(t => t.dataset.type !== 'mine').length;
  let resultType = "";
  if (safeCount < 2) resultType = "lifeLost";
  else if (safeCount === 2 || safeCount === 3) resultType = "smallWin";
  else if (safeCount === 4) resultType = "bigWin";

  return { safeCount, resultType };
}

// ---------------------------------
// Result popover UI
// ---------------------------------
function showMinefieldResult({ safeCount, pointsEarned, lifeLost, resultType }) {
  const resultBox = document.querySelector('.popover_resultMine');
  if (!resultBox) return;

  const textContainer = resultBox.querySelector('.popover_resultTextMine');
  if (!textContainer) return;

  const titleEl = textContainer.querySelector('.mine-result-title');
  const messageEl = textContainer.querySelector('.mine-result-text');

  let title = "Minefield Complete";
  let message = "";

  switch (resultType) {
    case "lifeLost":
      title = "Boom 💥";
      message = `You revealed only ${safeCount} safe tile${safeCount !== 1 ? 's' : ''}. You lose 1 life.`;
      break;
    case "smallWin":
      message = `You revealed ${safeCount} safe tiles and earned +1 point.`;
      break;
    case "bigWin":
      title = "Perfect Run!";
      message = `All 4 tiles were safe! You earned +2 points.`;
      break;
  }

  if (titleEl) titleEl.textContent = title;
  if (messageEl) messageEl.textContent = message;

  // Hide cat image immediately
  const catImg = popover.querySelector('.popover_cat_img');
  if (catImg) catImg.classList.add('hidden');

  // Show the message box immediately
  resultBox.classList.add('show');

  // -----------------------------
  // Delayed result audio & div display
  // -----------------------------
  setTimeout(() => {
    let resultDiv = null;
    const successDiv = popover.querySelector('.popover_success');
    const failureDiv = popover.querySelector('.popover_failure');
    const flawlessDiv = popover.querySelector('.popover_flawless');

    if (resultType === "lifeLost") resultDiv = failureDiv;
    if (resultType === "smallWin") resultDiv = successDiv;
    if (resultType === "bigWin") resultDiv = flawlessDiv;

    // Stop Minefield BGM
    const qAudio = document.querySelector('#qAudio');
    if (qAudio) {
      qAudio.pause();
      qAudio.currentTime = 0;
    }

    // Play result sound
    if (resultDiv) {
      const resultAudio = new Audio(
        resultType === "lifeLost" ? "audio/main/failure.mp3" :
        resultType === "smallWin" ? "audio/main/success.mp3" :
        "audio/main/flawless.mp3"
      );
      resultAudio.volume = 0.4;
      resultAudio.play().catch(() => {});
      resultDiv.classList.add('show');
    }
  }, 5000); // 5 second delay
}


// Enable close button immediately after non-selected reveal finishes
if (closeBtnMine) {
  closeBtnMine.disabled = false;

  // Only add the click listener here once
  if (!closeBtnMine.dataset.listenerAdded) {
    closeBtnMine.dataset.listenerAdded = "true"; // prevent double listeners
    closeBtnMine.addEventListener('click', () => {
      if (!minefieldResult) return;

      const { safeCount, resultType } = minefieldResult;

      // ---------- Life deduction ----------
      if (resultType === "lifeLost") {
        livesCounter--;
        updateLivesDisplay();
      }

      // ---------- Points ----------
      if (resultType === "smallWin" || resultType === "bigWin") {
        const pointMultiplier = (window.GAME_MODE === "risky") ? 2 : 1;
        const pointsGained = resultType === "smallWin" ? 1 * pointMultiplier : 2 * pointMultiplier;
        pointsCounter += pointsGained;
        updatePointsDisplay();
      }

      // ---------- Game Over ----------
      if (livesCounter < 0) {
        showGameOver();
      }

      // ---------- Cleanup ----------
      minefieldActive = false;
      tiles.forEach(t => t.disabled = true);
	  disableTileAfterUse();

      if (popover) popover.classList.remove('show');
      if (mainBGM && mainBGM.paused && livesCounter >= 0) mainBGM.play().catch(() => {});
    });
  }
}




	// Hint System specific buttons
	
	if (hint1Btn && hint1Div) hint1Btn.addEventListener('click', () => { 
      hint1Div.classList.add('show'); 
      hint1Btn.parentElement.classList.add('hidden'); 
    });
	
    if (hint2Btn && hint2Div) hint2Btn.addEventListener('click', () => { 
      hint2Div.classList.add('show'); 
      hint2Btn.parentElement.classList.add('hidden'); 
    });

    if (hint3Btn && hint3Div) hint3Btn.addEventListener('click', () => { 
      hint3Div.classList.add('show'); 
      hint3Btn.parentElement.classList.add('hidden'); 
    });

	// Solo System specific buttons
	
    if (solo2Btn && solo2Div) solo2Btn.addEventListener('click', () => { 
      solo2Div.classList.add('show'); 
      solo2Btn.parentElement.classList.add('hidden'); 
    });

	// Host System specific buttons

    if (host1Btn && host2Btn && host3Btn && host1Div) host1Btn.addEventListener('click', () => { 
      host1Div.classList.add('show');
      host1Btn.parentElement.classList.add('hidden');
      host2Btn.parentElement.classList.add('hidden');
	  host3Btn.parentElement.classList.add('hidden');
    });

    if (host1Btn && host2Btn && host3Btn && host2Div) host2Btn.addEventListener('click', () => { 
      host2Div.classList.add('show'); 
      host1Btn.parentElement.classList.add('hidden');
      host2Btn.parentElement.classList.add('hidden'); 
	  host3Btn.parentElement.classList.add('hidden');
    });
	
	if (host1Btn && host2Btn && host3Btn && host3Div) host3Btn.addEventListener('click', () => { 
      host3Div.classList.add('show'); 
      host1Btn.parentElement.classList.add('hidden');
      host2Btn.parentElement.classList.add('hidden');
	  host3Btn.parentElement.classList.add('hidden');
    });

	// Decision System specific buttons

    if (decision1Btn && decision2Btn && decision3Btn && decision1Div) decision1Btn.addEventListener('click', () => { 
      decision1Div.classList.add('show');
      decision1Btn.parentElement.classList.add('hidden');
      decision2Btn.parentElement.classList.add('hidden'); 
	  decision3Btn.parentElement.classList.add('hidden'); 
    });

    if (decision1Btn && decision2Btn && decision3Btn && decision2Div) decision2Btn.addEventListener('click', () => { 
      decision2Div.classList.add('show'); 
      decision1Btn.parentElement.classList.add('hidden');
      decision2Btn.parentElement.classList.add('hidden');
	  decision3Btn.parentElement.classList.add('hidden');
    });
	
	if (decision1Btn && decision2Btn && decision3Btn && decision1Div) decision3Btn.addEventListener('click', () => { 
      decision3Div.classList.add('show');
      decision1Btn.parentElement.classList.add('hidden');
      decision2Btn.parentElement.classList.add('hidden'); 
	  decision3Btn.parentElement.classList.add('hidden'); 
    });

if (riskyYesBtn) {
    const fade = document.querySelector('.risky_fade');
    const audio = document.querySelector("#rAccept"); // button audio

    riskyYesBtn.addEventListener('click', () => {
        disableTileAfterUse();

        // Step fade
        if (fade) {
            setTimeout(() => fade.classList.add('fade-20'), 600);
            setTimeout(() => { fade.classList.replace('fade-20', 'fade-40'); }, 1200);
            setTimeout(() => { fade.classList.replace('fade-40', 'fade-60'); }, 1800);
            setTimeout(() => { fade.classList.replace('fade-60', 'fade-80'); }, 2400);
            setTimeout(() => { fade.classList.replace('fade-80', 'fade-100'); }, 3000);
        }

        // Stop question BGM
        if (qAudio && !qAudio.paused) {
            qAudio.pause();
            qAudio.currentTime = 0;
        }

        // Play button audio
        if (audio) {
            audio.currentTime = 0;
            audio.volume = 0.5;
            audio.play().catch(() => {});
        }

        // Navigate after fade
        setTimeout(() => {
            window.location.href = 'Risky.html';
        }, 4000);
    });
}


    if (riskyNoBtn) {
      riskyNoBtn.addEventListener('click', () => { 
        disableTileAfterUse(); 
        popover.classList.remove('show'); 
	if (qAudio && !qAudio.paused) {
		qAudio.pause();
		qAudio.currentTime = 0;
	if (mainBGM && mainBGM.paused) mainBGM.play().catch(() => {});
  }

  // ⏳ Delay popover close so feedback + sound can play
  setTimeout(() => {
    if (mainBGM && mainBGM.paused) mainBGM.play().catch(() => {});
    popover.classList.remove('show');
  }, 2500);
      });
    }

    const audioBtn = popover.querySelector('.popover_audio_btn');
    if (audioBtn) {
      const audio = audioBtn.querySelector('audio');
      if (audio) {
        audioBtn.addEventListener('click', () => {
          audio.currentTime = 0;
          audio.play();
        });
      }
    }

// -----------------------------
// QTE DOM references
// -----------------------------
const qteGoContainer = popover.querySelector('.popover_btnGo'); // container of Go button
const qtegobtn = popover.querySelector('.qtegobtn');
const answerqteBtn = popover.querySelector('.answerqteBtn');
const rightqteBtn = popover.querySelector('.rightqteBtn');
const wrongqteBtn = popover.querySelector('.wrongqteBtn');
const answerDivQTE = popover.querySelector('.popover_answerQTE'); // container for answer display
const displayText = popover.querySelector('.popover_item_display h2'); // where JSON text appears
const qteItems = getQuestionData(popover.id)?.qteItems || [];
const closeBtn = popover.querySelector('.closeBtn');

// -----------------------------
// QTE state
// -----------------------------
let currentIndex = 0;
let qteScore = 0;
let qteResults = [];

// -----------------------------
// 5-step QTE result reveal
// -----------------------------
async function revealQTEResultsSequential(popover, qteResults, score, livesLost = false, pointsGained = 0) {
  if (!popover) return;

  const resultBox = popover.querySelector('.popover_resultQTE');
  if (!resultBox) return;

  const placeholders = [
    popover.querySelector('.popover_resultA1QTE img'),
    popover.querySelector('.popover_resultA2QTE img'),
    popover.querySelector('.popover_resultA3QTE img'),
    popover.querySelector('.popover_resultA4QTE img'),
    popover.querySelector('.popover_resultA5QTE img')
  ];

  const qteCompleteText = popover.querySelector('.popover_resultTextQTE'); // container
  const titleEl = qteCompleteText ? qteCompleteText.querySelector('.qte-result-title') : null;
  const textEl  = qteCompleteText ? qteCompleteText.querySelector('.qte-result-text') : null;

  // --- Reset placeholders and hide complete text ---
  resultBox.classList.add('show');
  const catImg = popover.querySelector('.popover_cat_img');
  if (catImg) catImg.classList.add('hidden');

  placeholders.forEach(img => {
    if (img && img.parentElement) img.parentElement.classList.add('show');
    if (img) img.src = "img/misc/qteBlank.png";
  });

  if (qteCompleteText) qteCompleteText.classList.remove('show');
  if (titleEl) titleEl.textContent = "";
  if (textEl) textEl.textContent = "";

  // --- Wait 1 second before starting sequential reveal ---
  await new Promise(resolve => setTimeout(resolve, 1000));

  const qteSound = new Audio();
  qteSound.preload = "auto";

  if (answerDivQTE) answerDivQTE.classList.remove('show');

  // --- Reveal each placeholder sequentially ---
  for (let i = 0; i < placeholders.length; i++) {
    const img = placeholders[i];
    if (!img) continue;

    const isRight = qteResults[i] === "Right";

    img.src = isRight
      ? "img/misc/qteRight.png"
      : "img/misc/qteWrong.png";

    // 🔊 Play sound
    qteSound.src = isRight
      ? "audio/main/qte_right.wav"
      : "audio/main/qte_wrong.wav";

    qteSound.currentTime = 0;
    qteSound.volume = 0.2;
    qteSound.play().catch(() => {});

    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // --- Wait 1 second after last placeholder ---
  await new Promise(resolve => setTimeout(resolve, 1000));

  // --- Fill in text feedback (without applying points/lives yet) ---
  if (titleEl) {
    titleEl.textContent = livesLost ? "Oops 💥" : "QTE Complete";
  }
  if (textEl) {
    let message = `You scored ${score} point${score !== 1 ? 's' : ''} in the QTE minigame.\n`;
    if (livesLost) message += "You lost a life.\n";
    else if (pointsGained) message += `You gained ${pointsGained} point${pointsGained !== 1 ? 's' : ''}.\n`;
    textEl.textContent = message;
  }

  if (qteCompleteText) qteCompleteText.classList.add('show');

  // --- Wait 5 seconds before final result audio ---
  await new Promise(resolve => setTimeout(resolve, 5000));

  const qAudio = popover.querySelector('#qAudio');
  if (qAudio) {
    qAudio.pause();
    qAudio.currentTime = 0;
  }

  // --- Decide result div and play result sound ---
  let resultSound = "";
  let resultDiv = null;

  const successDiv = popover.querySelector('.popover_success');
  const failureDiv = popover.querySelector('.popover_failure');
  const flawlessDiv = popover.querySelector('.popover_flawless');

  if (score <= 2) {
    resultSound = "audio/main/failure.mp3";
    resultDiv = failureDiv;
  } else if (score === 3 || score === 4) {
    resultSound = "audio/main/success.mp3";
    resultDiv = successDiv;
  } else if (score === 5) {
    resultSound = "audio/main/flawless.mp3";
    resultDiv = flawlessDiv;
  }

  if (resultSound) {
    const resultAudio = new Audio(resultSound);
    resultAudio.volume = 0.4;
    resultAudio.play().catch(() => {});
  }

  if (resultDiv) resultDiv.classList.add('show');
}

// -----------------------------
// Helper: show next JSON item
// -----------------------------
function updateDisplayForNextItem() {
  if (currentIndex < qteItems.length) {
    displayText.textContent = qteItems[currentIndex].text;
    answerDivQTE.classList.remove('show');
    if (answerqteBtn && answerqteBtn.parentElement) {
      answerqteBtn.parentElement.classList.remove('hidden');
    }
  } else {
    displayText.textContent = "";
  }
}

// -----------------------------
// Helper: check end-of-QTE
// -----------------------------
function checkQTEEnd() {
  if (currentIndex >= qteItems.length) {
    if (rightqteBtn) rightqteBtn.disabled = true;
    if (wrongqteBtn) wrongqteBtn.disabled = true;
    if (answerqteBtn) answerqteBtn.disabled = true;

    // Determine "would happen" for display only
    const livesLost = qteScore <= 2;
    const basePoints = qteScore > 2 ? 1 : 0;
    const pointMultiplier = (window.GAME_MODE === "risky") ? 2 : 1;
    const pointsGained = basePoints * pointMultiplier;

    // Trigger reveal (text reflects what would happen)
    revealQTEResultsSequential(popover, qteResults, qteScore, livesLost, pointsGained);
  }
}

// -----------------------------
// Close button: apply points/lives/game over
// -----------------------------
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    let livesLost = false;
    if (qteScore <= 2) {
      livesCounter--;
      updateLivesDisplay();
      livesLost = true;
    }

    let pointsGained = 0;
    if (qteScore > 2) {
      const pointMultiplier = (window.GAME_MODE === "risky") ? 2 : 1;
      pointsGained = 1 * pointMultiplier;
      pointsCounter += pointsGained;
      updatePointsDisplay();
    }

    if (livesCounter < 0) {
     showGameOver();
    }

    minefieldActive = false;
    tiles.forEach(t => (t.disabled = true));
    disableTileAfterUse();
	
	if (livesCounter >= 0) {
    if (mainBGM && mainBGM.paused) mainBGM.play().catch(() => {});
    }

    if (popover) popover.classList.remove('show');
  });
}

// -----------------------------
// Go button: start QTE
// -----------------------------
if (qtegobtn && qteGoContainer && displayText && qteItems.length > 0) {
  qtegobtn.addEventListener('click', () => {
    qteGoContainer.classList.add('hidden');

    currentIndex = 0;
    qteScore = 0;
    qteResults = [];

    const resultBox = popover.querySelector('.popover_resultQTE');
    if (resultBox) {
      resultBox.classList.remove('show');
      const titleEl = resultBox.querySelector('.qte-result-title');
      const textEl  = resultBox.querySelector('.qte-result-text');
      if (titleEl) titleEl.textContent = "";
      if (textEl) textEl.textContent = "";
    }

    displayText.classList.remove('hidden');
    displayText.textContent = qteItems[currentIndex].text;

    if (rightqteBtn) rightqteBtn.disabled = false;
    if (wrongqteBtn) wrongqteBtn.disabled = false;
    if (answerqteBtn) answerqteBtn.disabled = false;
  });
}

// -----------------------------
// Answer button: shows text from JSON
// -----------------------------
if (answerqteBtn) {
  const answerH1 = answerDivQTE.querySelector("h1");

  answerqteBtn.addEventListener('click', () => {
    const item = qteItems[currentIndex];
    if (item && answerH1) {
      answerH1.textContent = item.display || "No answer provided";
      answerDivQTE.classList.add('show');
    }
    if (answerqteBtn && answerqteBtn.parentElement) {
      answerqteBtn.parentElement.classList.add('hidden');
    }
  });
}

// -----------------------------
// Right button: manual choice
// -----------------------------
if (rightqteBtn) {
  rightqteBtn.addEventListener('click', () => {
    qteScore++;
    qteResults.push("Right");
    currentIndex++;
    updateDisplayForNextItem();
    checkQTEEnd();
  });
}

// -----------------------------
// Wrong button: manual choice
// -----------------------------
if (wrongqteBtn) {
  wrongqteBtn.addEventListener('click', () => {
    qteResults.push("Wrong");
    currentIndex++;
    updateDisplayForNextItem();
    checkQTEEnd();
  });
}


// -----------------------------
// Keyboard shortcuts
// -----------------------------
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const currentPopover =
  document.querySelector(".popover.show")
  if (!currentPopover) return;

event.stopImmediatePropagation();
event.preventDefault();



const currentType = currentPopover.dataset.type;

switch (currentType) {
  case "qte":
    switch (key) {
      case "r": currentPopover.querySelector(".rightqteBtn")?.click(); break;
      case "w": currentPopover.querySelector(".wrongqteBtn")?.click(); break;
      case "a": currentPopover.querySelector(".answerqteBtn")?.click(); break;
      case "g": currentPopover.querySelector(".qtegobtn")?.click(); break;
	  case "c": currentPopover.querySelector(".closeBtn")?.click(); break;
      default: break;
    }
    break;

  case "normal":
  case undefined: // fallback for normal popovers without data-type
    switch (key) {
      case "r": currentPopover.querySelector(".rightBtn")?.click(); break;
      case "w": currentPopover.querySelector(".wrongBtn")?.click(); break;
      case "a": currentPopover.querySelector(".answerBtn")?.click(); break;
	  case "s": currentPopover.querySelector(".skipBtn")?.click(); break;
      default: break;
    }
    break;
	
case "mine": // fallback for normal popovers without data-type
    switch (key) {
	  case "c": currentPopover.querySelector(".closeBtnMine")?.click(); break;
	  case "g": currentPopover.querySelector(".proceedMineBtn")?.click(); break;
	  case "p": currentPopover.querySelector(".proceedMine2Btn")?.click(); break;
	  case "s": currentPopover.querySelector(".skipBtn")?.click(); break;
      default: break;
    }
    break;

 case "character":
      switch (key) {
      case "r": currentPopover.querySelector(".rightBtn")?.click(); break;
      case "w": currentPopover.querySelector(".wrongBtn")?.click(); break;
      case "a": currentPopover.querySelector(".answerCharacterBtn")?.click(); break;
	  case "s": currentPopover.querySelector(".skipBtn")?.click(); break;
      default: break;
    }
      break;

 case "audio":
      switch (key) {
      case "r": currentPopover.querySelector(".rightBtn")?.click(); break;
      case "w": currentPopover.querySelector(".wrongBtn")?.click(); break;
      case "a": currentPopover.querySelector(".answerBtn")?.click(); break;
	  case "s": currentPopover.querySelector(".skipBtn")?.click(); break;
	  case "m": currentPopover.querySelector(".audioBtn")?.click(); break;
      default: break;
    }
      break;
 
  case "jukebox":
      switch (key) {
      case "r": currentPopover.querySelector(".rightBtn")?.click(); break;
      case "w": currentPopover.querySelector(".wrongBtn")?.click(); break;
      case "a": currentPopover.querySelector(".answerBtn")?.click(); break;
	  case "s": currentPopover.querySelector(".skipBtn")?.click(); break;
	  case "m": currentPopover.querySelector(".audioBtn")?.click(); break;
      default: break;
    }
      break;
 
  case "multi":
    switch (key) {
      case "r": currentPopover.querySelector(".rightBtn")?.click(); break;
      case "w": currentPopover.querySelector(".wrongBtn")?.click(); break;
      case "a": currentPopover.querySelector(".answerMultiBtn")?.click(); break;
	  case "s": currentPopover.querySelector(".skipBtn")?.click(); break;
      default: break;
    }
    break;

  case "solo":
    switch (key) {
      case "r": currentPopover.querySelector(".rightBtn")?.click(); break;
      case "w": currentPopover.querySelector(".wrongBtn")?.click(); break;
      case "p": currentPopover.querySelector(".shortBtn")?.click(); break;
	  case "s": currentPopover.querySelector(".skipBtn")?.click(); break;
      default: break;
    }
    break;
	
  case "audience":
    switch (key) {
      case "r": currentPopover.querySelector(".rightBtn")?.click(); break;
      case "w": currentPopover.querySelector(".wrongBtn")?.click(); break;
      case "p": currentPopover.querySelector(".shortBtn")?.click(); break;
	  case "s": currentPopover.querySelector(".skipBtn")?.click(); break;
      default: break;
    }
    break;

  case "team":
    switch (key) {
      case "r": currentPopover.querySelector(".rightBtn")?.click(); break;
      case "w": currentPopover.querySelector(".wrongBtn")?.click(); break;
      case "p": currentPopover.querySelector(".shortBtn")?.click(); break;
	  case "s": currentPopover.querySelector(".skipBtn")?.click(); break;
      default: break;
    }
    break;

  case "trust":
    switch (key) {
      case "r": currentPopover.querySelector(".rightBtn")?.click(); break;
      case "w": currentPopover.querySelector(".wrongBtn")?.click(); break;
      case "p": currentPopover.querySelector(".shortBtn")?.click(); break;
	  case "s": currentPopover.querySelector(".skipBtn")?.click(); break;
      default: break;
    }
    break;
	
  case "riskyStrats":
    switch (key) {
      case "r": currentPopover.querySelector(".riskyYesBtn")?.click(); break;
      case "w": currentPopover.querySelector(".riskyNoBtn")?.click(); break;
      default: break;
    }
    break;
	
    default:
      break;
  }
}, true);

  }

  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) return;
    if (document.querySelector(".popover.show")) return;

    switch (key) {
      case "i": pointsCounter++; updatePointsDisplay(); break;
      case "k": if (pointsCounter > 0) { pointsCounter--; updatePointsDisplay(); } break;
      case "o": if (livesCounter < 1) { livesCounter++; updateLivesDisplay(); } break;
      case "l": livesCounter--; updateLivesDisplay(); break;
    }
  });

  updateLivesDisplay();
  updatePointsDisplay();
});


document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    // --- Step 1: Determine which popover is active ---
    let currentPopover = document.querySelector('.popover.show');

    // --- Step 2: Special case: if gameover popover exists and is shown ---
    const gameoverPopover = document.getElementById('gameoverPopover');
    if (gameoverPopover && gameoverPopover.classList.contains('show')) {
        currentPopover = gameoverPopover;
    }

    if (!currentPopover) return; // nothing to act on

    const currentType = currentPopover.dataset.type;

    // --- Step 3: Handle keyboard shortcuts ---
    switch (currentType) {
        case "gameover":
            switch (key) {
                case "n": currentPopover.querySelector(".restartBtn")?.click(); break;
                case "b": currentPopover.querySelector(".scoresBtn")?.click(); break;
                case "c": currentPopover.querySelector(".dismissBtn")?.click(); break;
                default: break;
            }
            break;

        // ...other popover cases as you already have them...
    }
}, true);