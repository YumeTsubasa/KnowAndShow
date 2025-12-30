// buttons.js
// Main game logic, popover handling, lives/points

import { loadQuestions, getQuestionData } from "./data.js";
import { buildQuestionContent, createBranchContent, createGameoverContent } from "./contentBuilder.js";

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

    // Make sure the popover itself is visible
    gameoverPopover.classList.add('show');


    // Save the score in localStorage
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    const existingIndex = scores.findIndex(s => s.player === playerName);
    if (existingIndex >= 0) {
        scores[existingIndex].points = pointsCounter;
    } else {
        scores.push({ player: playerName, points: pointsCounter });
    }
    localStorage.setItem('scores', JSON.stringify(scores));

    // Reset counters
    localStorage.removeItem('livesCounter');
    localStorage.removeItem('pointsCounter');
    livesCounter = 1;
    pointsCounter = 0;

    // Show the popover
    gameoverPopover.classList.add('show');

    // Add button event listeners
    const restartBtn = gameoverPopover.querySelector('.restartBtn');
    if (restartBtn) restartBtn.addEventListener('click', () => window.location.href = 'Name.html');

    const scoresBtn = gameoverPopover.querySelector('.scoresBtn');
    if (scoresBtn) scoresBtn.addEventListener('click', () => window.location.href = 'Scores.html');

    const dismissBtn = gameoverPopover.querySelector('.dismissBtn');
    if (dismissBtn) dismissBtn.addEventListener('click', () => gameoverPopover.classList.remove('show'));
}




  updateLivesDisplay();
  updatePointsDisplay();

  // -----------------------------
  // Tile buttons (dynamic popovers)
  // -----------------------------
  document.querySelectorAll('.tileBtn[popovertarget]').forEach(tileBtn => {
    tileBtn.addEventListener('click', () => {
      const tileId = tileBtn.getAttribute('popovertarget');
      const questionData = getQuestionData(tileId);

      let popover;

      if (questionData) {

        // -------------------
        // Branch tile handling
        // -------------------
        if (questionData.type === "branch") {
          const branchPopover = createBranchContent(questionData);
          branchPopover.id = tileId;
          popoverContainer.innerHTML = "";
          popoverContainer.appendChild(branchPopover);

          document.querySelectorAll(".popover.show").forEach(p => { if (p !== branchPopover) p.classList.remove("show"); });
          branchPopover.classList.add('show');
          window.lastPopoverID = tileId;

          const branchABtn = branchPopover.querySelector('.branchABtn');
          const branchBBtn = branchPopover.querySelector('.branchBBtn');
          const branchCBtn = branchPopover.querySelector('.branchCBtn');
          const branchDBtn = branchPopover.querySelector('.branchDBtn');
          const branchEBtn = branchPopover.querySelector('.branchEBtn');

          if (branchABtn) branchABtn.addEventListener('click', () => {
            branchPopover.classList.remove('show');
            popoverContainer.innerHTML = '';

            const newPopover = buildQuestionContent(questionData.branchA);
            popoverContainer.appendChild(newPopover);
            setupPopoverButtons(newPopover);

            newPopover.classList.add('show');
            window.lastPopoverID = tileId;
          });

          if (branchBBtn) branchBBtn.addEventListener('click', () => {
            branchPopover.classList.remove('show');
            popoverContainer.innerHTML = '';

            const newPopover = buildQuestionContent(questionData.branchB);
            popoverContainer.appendChild(newPopover);
            setupPopoverButtons(newPopover);

            newPopover.classList.add('show');
            window.lastPopoverID = tileId;
          });
		  
		    if (branchCBtn) branchCBtn.addEventListener('click', () => {
            branchPopover.classList.remove('show');
            popoverContainer.innerHTML = '';

            const newPopover = buildQuestionContent(questionData.branchC);
            popoverContainer.appendChild(newPopover);
            setupPopoverButtons(newPopover);

            newPopover.classList.add('show');
            window.lastPopoverID = tileId;
          });
		  
		  if (branchDBtn) branchDBtn.addEventListener('click', () => {
            branchPopover.classList.remove('show');
            popoverContainer.innerHTML = '';

            const newPopover = buildQuestionContent(questionData.branchD);
            popoverContainer.appendChild(newPopover);
            setupPopoverButtons(newPopover);

            newPopover.classList.add('show');
            window.lastPopoverID = tileId;
          });
		  
		  if (branchEBtn) branchEBtn.addEventListener('click', () => {
            branchPopover.classList.remove('show');
            popoverContainer.innerHTML = '';

            const newPopover = buildQuestionContent(questionData.branchE);
            popoverContainer.appendChild(newPopover);
            setupPopoverButtons(newPopover);

            newPopover.classList.add('show');
            window.lastPopoverID = tileId;
          });

          return; // stop normal tile load
        }

        // -------------------
        // Normal tiles
        // -------------------
        popover = buildQuestionContent(questionData);
        popover.id = tileId;
        popoverContainer.innerHTML = "";
        popoverContainer.appendChild(popover);

        // SCREEN fade-in
        if (questionData.type && questionData.type.toLowerCase() === "screen") {
          const imgEl = popover.querySelector('.popover_screenshot img');
          if (imgEl) {
            setTimeout(() => {
              console.log('Screen question fade-in triggered');
              imgEl.classList.add('show');
            }, 5000);
          }
        }
      } else {
        popover = document.getElementById(tileId);
        if (!popover) { console.error("No data for", tileId); return; }
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
    const answerMultiBtn = popover.querySelector('.answerMultiBtn');
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
	const closeBtn = popover.querySelector('.closeBtn');
	const shortBtn = popover.querySelector('.shortBtn');
	const shortDiv = popover.querySelector('.popover_question_text_short2');

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
      pointsCounter++; 
      updatePointsDisplay(); 
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

	// 3️⃣ Delay popover close so feedback + sound can play
	setTimeout(() => {

if (mainBGM && mainBGM.paused) mainBGM.play().catch(() => {});
		popover.classList.remove('show');
		}, 2500); // 2.5 seconds
    });

// -----------------------------
// Multi-choice question handling (2x2 layout, non-clickable, borderless)
// -----------------------------
function setupMultiChoice(popover) {
  if (!popover) return;

  // Grab container and answer button
  const answersContainer = popover.querySelector('.popover_multi_answers h2');
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
  answerBtn.onclick = () => {
    wrapper.querySelectorAll("div").forEach(ansDiv => {
      if (ansDiv.dataset.correct === "true") {
        ansDiv.style.color = "green";
      } //else {
        //ansDiv.style.color = "red"; // optional
		//}
    });

    // Hide button after press
    answerBtn.style.display = "none";
  };
}

// -----------------------------
// Initialize multi-choice popover
// -----------------------------
const multiPopover = document.getElementById('Question2'); // adapt for your popover IDs
if (multiPopover) setupMultiChoice(multiPopover);

// ---------------------------------
// Minefield minigame state
// ---------------------------------
let minefieldPoints = 0;
let minefieldActive = false;
let selectedTiles = [];

const proceedMineBtn = popover.querySelector('.proceedMineBtn');

const resultBox = document.querySelector('.popover_resultMine');
if (resultBox) {
  resultBox.classList.remove('show');

  const titleEl = resultBox.querySelector('.mine-result-title');
  const textEl  = resultBox.querySelector('.mine-result-text');

  if (titleEl) titleEl.textContent = "";
  if (textEl)  textEl.textContent = "";
}

// Start minefield
minefieldPoints = 0;
minefieldActive = true;
selectedTiles = [];
if (proceedMineBtn) proceedMineBtn.disabled = true;

// Collect all minefield tiles
const tiles = Array.from(popover.querySelectorAll('.minefieldTile'));

// Reset all tiles
tiles.forEach(tileBtn => {
  tileBtn.disabled = false;
  tileBtn.classList.remove(
    'used-safe',
    'used-mine',
    'selected',
    'last-selected'
  );
  tileBtn.style.backgroundColor = "";
});

// Grab the dedicated proceed button
if (proceedMineBtn) {
  proceedMineBtn.disabled = true; // disabled until 4 tiles selected
}

// Grab the global close button
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    // Stop minefield
    minefieldActive = false;

    // Disable all tiles
    tiles.forEach(t => (t.disabled = true));
	
	if (mainBGM && mainBGM.paused) mainBGM.play().catch(() => {});

	disableTileAfterUse(); 
    // Hide popover
    if (popover) popover.classList.remove('show');
  });
}

// ---------------------------------
// Tile click handling
// ---------------------------------
tiles.forEach(tileBtn => {
  tileBtn.addEventListener('click', () => {
    if (!minefieldActive) return;

    // Remove last-selected marker
    tiles.forEach(t => t.classList.remove('last-selected'));

    // Toggle selection
    if (selectedTiles.includes(tileBtn)) {
      tileBtn.classList.remove('selected');
      tileBtn.style.backgroundColor = "";
      selectedTiles = selectedTiles.filter(t => t !== tileBtn);

      // Disable proceed if less than 4
      if (proceedMineBtn) proceedMineBtn.disabled = selectedTiles.length !== 4;
      return;
    }

    if (selectedTiles.length < 4) {
      selectedTiles.push(tileBtn);
      tileBtn.classList.add('selected', 'last-selected');
      tileBtn.style.backgroundColor = "#4dd0e1";
    }

    // Enable proceed button once 4 tiles are selected
    if (selectedTiles.length === 4 && proceedMineBtn) {
      proceedMineBtn.disabled = false;
    }

    // Highlight last-selected
    const lastTile = selectedTiles[selectedTiles.length - 1];
    lastTile.classList.add('last-selected');
    lastTile.style.backgroundColor = "#4dd0e1";
  });
});

// ---------------------------------
// Proceed button click
// ---------------------------------
if (proceedMineBtn) {
  proceedMineBtn.addEventListener('click', () => {
    if (selectedTiles.length !== 4) return;

    minefieldActive = false;

    // Disable all tiles
    tiles.forEach(t => (t.disabled = true));

    // Separate non-selected tiles and shuffle
    let nonSelectedTiles = tiles.filter(t => !selectedTiles.includes(t));
    nonSelectedTiles.sort(() => Math.random() - 0.5);

    // 🔊 Minefield reveal sound (one instance, reused)
    const mineRevealSound = new Audio("audio/main/mine_reveal.wav");
    mineRevealSound.preload = "auto";
    mineRevealSound.volume = 0.25;

    // -----------------------------
    // Reveal selected tiles first
    // -----------------------------
    let selIdx = 0;
    function revealSelected() {
      if (selIdx >= selectedTiles.length) {
        revealNonSelected();
        return;
      }

      const tile = selectedTiles[selIdx];
      tile.style.backgroundColor =
        tile.dataset.type === 'mine' ? "red" : "lime";
      tile.classList.add(
        tile.dataset.type === 'mine' ? 'used-mine' : 'used-safe'
      );

      // 🔊 Play reveal sound
      mineRevealSound.currentTime = 0;
      mineRevealSound.play().catch(() => {});

      selIdx++;
      setTimeout(revealSelected, 1000);
    }

    // -----------------------------
    // Reveal non-selected tiles
    // -----------------------------
    let idx = 0;
    function revealNonSelected() {
      if (idx >= nonSelectedTiles.length) {
        finalizeMinefield(); // your existing finalization logic
        return;
      }

      const tile = nonSelectedTiles[idx];
      tile.style.backgroundColor =
        tile.dataset.type === 'mine' ? "red" : "lime";
      tile.classList.add(
        tile.dataset.type === 'mine' ? 'used-mine' : 'used-safe'
      );

      // 🔊 Play reveal sound
      mineRevealSound.currentTime = 0;
      mineRevealSound.play().catch(() => {});

      idx++;
      setTimeout(revealNonSelected, 750);
    }

    revealSelected();
  });
}




// ---------------------------------
// Scoring + result handling
// ---------------------------------
function finalizeMinefield() {
  const safeCount = selectedTiles.filter(
    t => t.dataset.type !== 'mine'
  ).length;

  let pointsEarned = 0;
  let lifeLost = false;
  let resultType = "";

  if (safeCount < 2) {
    // Lose 1 life
    livesCounter = Math.max(0, livesCounter - 1);
    updateLivesDisplay();
    lifeLost = true;
    resultType = "lifeLost";
  }
  else if (safeCount === 2 || safeCount === 3) {
    pointsEarned = 1;
    pointsCounter += pointsEarned;
    updatePointsDisplay();
    resultType = "smallWin";
  }
  else if (safeCount === 4) {
    pointsEarned = 2;
    pointsCounter += pointsEarned;
    updatePointsDisplay();
    resultType = "bigWin";
  }

  showMinefieldResult({
    safeCount,
    pointsEarned,
    lifeLost,
    resultType
  });
}

// ---------------------------------
// Result popover UI
// ---------------------------------
function showMinefieldResult({ safeCount, pointsEarned, lifeLost, resultType }) {
  const resultBox = document.querySelector('.popover_resultMine');
  if (!resultBox) return;

  const textContainer = resultBox.querySelector('.popover_resultTextMine');
  if (!textContainer) return;

  const titleEl   = textContainer.querySelector('.mine-result-title');
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
      message = `All 4 tiles were safe! You earned +4 points.`;
      break;
  }

  if (titleEl) titleEl.textContent = title;
  if (messageEl) messageEl.textContent = message;

  // Show the popover
  resultBox.classList.add('show');
  
// -----------------------------
// Delayed result audio handling
// -----------------------------
setTimeout(() => {

  // Stop Minefield BGM
  const qAudio = document.querySelector('#qAudio');
  if (qAudio) {
    qAudio.pause();
    qAudio.currentTime = 0;
  }

  // Play result sound
  if (resultSound) {
    const resultAudio = new Audio(resultSound);
    resultAudio.volume = 0.4;
    resultAudio.play().catch(() => {});
  }

  // --- Show result graphic ---

  if (showSuccess && successDiv) {
    successDiv.classList.add('show');
  }

  if (!showSuccess && failureDiv) {
    failureDiv.classList.add('show');
  }
  
  	// --- Decide result ---
	let resultSound = "";
	let resultDiv = null; // the div to show

	const successDiv = popover.querySelector('.popover_success');
	const failureDiv = popover.querySelector('.popover_failure');
	const flawlessDiv = popover.querySelector('.popover_flawless');

	if (resultType === "lifeLost") {
	  resultSound = "audio/main/failure.mp3";
	  resultDiv = failureDiv;
	}

	if (resultType === "smallWin") {
	  resultSound = "audio/main/success.mp3";
	  resultDiv = successDiv;
	}

	if (resultType === "bigWin") {
	  resultSound = "audio/main/flawless.mp3";
	  resultDiv = flawlessDiv;
	}

	// --- Play result sound ---
	if (resultSound) {
	  const resultAudio = new Audio(resultSound);
	  resultAudio.volume = 0.4;
	  resultAudio.play().catch(() => {});
	}

	// --- Show the correct div ---
	if (resultDiv) {
	  resultDiv.classList.add('show');
	}

}, 5000); // ⏱ 5 second delay

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
      riskyYesBtn.addEventListener('click', () => {
        disableTileAfterUse(); 
        popover.classList.remove('show'); 
        window.location.href = 'Risky.html';
      });
    }
    if (riskyNoBtn) {
      riskyNoBtn.addEventListener('click', () => { 
        disableTileAfterUse(); 
        popover.classList.remove('show'); 
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
  resultBox.classList.add('show'); // show parent immediately
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

  // Wait before next reveal
  await new Promise(resolve => setTimeout(resolve, 1000));
}


  // --- Wait 0.5s after last placeholder ---
  await new Promise(resolve => setTimeout(resolve, 1000));

  // --- Fill in text feedback (without listing answers) ---
  if (titleEl) {
    titleEl.textContent = livesLost ? "Oops 💥" : "QTE Complete";
  }
  if (textEl) {
    let message = `You scored ${score} point${score !== 1 ? 's' : ''} in the QTE minigame.\n`;
    if (livesLost) message += "You lost a life.\n";
    else if (pointsGained) message += `You gained ${pointsGained} point${pointsGained !== 1 ? 's' : ''}.\n`;
    textEl.textContent = message;
  }

  // --- Show complete text ---
  if (qteCompleteText) qteCompleteText.classList.add('show');
  
  // --- Wait 2s before final result audio ---
  await new Promise(resolve => setTimeout(resolve, 5000));

  // --- Stop QTE background audio ---
  const qAudio = popover.querySelector('#qAudio');
  if (qAudio) {
    qAudio.pause();
    qAudio.currentTime = 0;
  }


	// --- Decide result ---
	let resultSound = "";
	let resultDiv = null; // the div to show

	const successDiv = popover.querySelector('.popover_success');
	const failureDiv = popover.querySelector('.popover_failure');
	const flawlessDiv = popover.querySelector('.popover_flawless');

	if (score <= 2) {
	  resultSound = "audio/main/failure.mp3";
	  resultDiv = failureDiv;
	}

	if (score === 3 || score === 4) {
	  resultSound = "audio/main/success.mp3";
	  resultDiv = successDiv;
	}

	if (score === 5) {
	  resultSound = "audio/main/flawless.mp3";
	  resultDiv = flawlessDiv;
	}

	// --- Play result sound ---
	if (resultSound) {
	  const resultAudio = new Audio(resultSound);
	  resultAudio.volume = 0.4;
	  resultAudio.play().catch(() => {});
	}

	// --- Show the correct div ---
	if (resultDiv) {
	  resultDiv.classList.add('show');
	}

}



// -----------------------------
// Helper: show next JSON item or hide display if done
// -----------------------------
function updateDisplayForNextItem() {
  if (currentIndex < qteItems.length) {
    displayText.textContent = qteItems[currentIndex].text;
    answerDivQTE.classList.remove('show'); // hide answer container
    if (answerqteBtn && answerqteBtn.parentElement) {
      answerqteBtn.parentElement.classList.remove('hidden'); // show answer button
    }
  } else {
    displayText.textContent = ""; // optional: hide text when finished
  }
}

// -----------------------------
// Helper: check end-of-QTE and show results
// -----------------------------
function checkQTEEnd() {
  if (currentIndex >= qteItems.length) {
    let livesLost = false;
    let pointsGained = 0;

    if (qteScore <= 2) {
      livesCounter--;
      updateLivesDisplay();
      livesLost = true;
    } else {
      pointsCounter += 1;
      updatePointsDisplay();
      pointsGained = 1;
    }

    // Disable QTE buttons while result is visible
    if (rightqteBtn) rightqteBtn.disabled = true;
    if (wrongqteBtn) wrongqteBtn.disabled = true;
    if (answerqteBtn) answerqteBtn.disabled = true;

    // --- Trigger sequential 5-step reveal with text ---
    revealQTEResultsSequential(popover, qteResults, qteScore, livesLost, pointsGained);
  }
}

// -----------------------------
// Go button: start QTE
// -----------------------------
if (qtegobtn && qteGoContainer && displayText && qteItems.length > 0) {
  qtegobtn.addEventListener('click', () => {
    qteGoContainer.classList.add('hidden');

    // Reset state
    currentIndex = 0;
    qteScore = 0;
    qteResults = [];

    // Clear previous result popover
    const resultBox = popover.querySelector('.popover_resultQTE');
    if (resultBox) {
      resultBox.classList.remove('show');
      const titleEl = resultBox.querySelector('.qte-result-title');
      const textEl  = resultBox.querySelector('.qte-result-text');
      if (titleEl) titleEl.textContent = "";
      if (textEl)  textEl.textContent = "";
    }

    displayText.classList.remove('hidden');
    displayText.textContent = qteItems[currentIndex].text;

    if (rightqteBtn) rightqteBtn.disabled = false;
    if (wrongqteBtn) wrongqteBtn.disabled = false;
    if (answerqteBtn) answerqteBtn.disabled = false;
  });
}

// -----------------------------
// Answer button: shows Text from JSON
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
      answerqteBtn.parentElement.classList.add('hidden'); // hide Answer button after use
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
// Global close button
// -----------------------------
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    minefieldActive = false;
    tiles.forEach(t => (t.disabled = true));
	
	if (mainBGM && mainBGM.paused) mainBGM.play().catch(() => {});
		
    disableTileAfterUse();
    if (popover) popover.classList.remove('show');
  });
}

// -----------------------------
// Keyboard shortcuts
// -----------------------------
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const currentPopover = document.querySelector(".popover.show");
  if (!currentPopover) return;

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
	  case "c": currentPopover.querySelector(".closeBtn")?.click(); break;
      default: break;
    }
    break;
	
case "mine": // fallback for normal popovers without data-type
    switch (key) {
	  case "c": currentPopover.querySelector(".closeBtn")?.click(); break;
	  case "p": currentPopover.querySelector(".proceedMineBtn")?.click(); break;
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
      default: break;
    }
    break;
	
  case "audience":
    switch (key) {
      case "r": currentPopover.querySelector(".rightBtn")?.click(); break;
      case "w": currentPopover.querySelector(".wrongBtn")?.click(); break;
      case "p": currentPopover.querySelector(".shortBtn")?.click(); break;
      default: break;
    }
    break;

  case "team":
    switch (key) {
      case "r": currentPopover.querySelector(".rightBtn")?.click(); break;
      case "w": currentPopover.querySelector(".wrongBtn")?.click(); break;
      case "p": currentPopover.querySelector(".shortBtn")?.click(); break;
      default: break;
    }
    break;

  case "trust":
    switch (key) {
      case "r": currentPopover.querySelector(".rightBtn")?.click(); break;
      case "w": currentPopover.querySelector(".wrongBtn")?.click(); break;
      case "p": currentPopover.querySelector(".shortBtn")?.click(); break;
      default: break;
    }
    break;

    default:
      break;
  }
});

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
