// buttons.js
// Main game logic, popover handling, lives/points

import { loadQuestions, getQuestionData } from "./data.js";
import { buildQuestionContent, createBranchContent } from "./contentBuilder.js";

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

  // Load JSON questions first
  await loadQuestions();

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
    if (livesCounter === -1) showGameOver();
  }

  function updatePointsDisplay() {
    if (pointsDisplay) pointsDisplay.textContent = `${playerName}: ${pointsCounter}`;
    localStorage.setItem('pointsCounter', pointsCounter);
  }

  function saveDisabledTiles() {
    const disabledTiles = Array.from(document.querySelectorAll('.tileBtn:disabled')).map(btn => btn.getAttribute('popovertarget'));
    localStorage.setItem('disabledTiles', JSON.stringify(disabledTiles));
  }

  // -----------------------------
  // Game over handling
  // -----------------------------
function showGameOver() {
  if (!gameoverPopover) return;

  const gameoverText = gameoverPopover.querySelector('h2');
  if (gameoverText) gameoverText.textContent = `Player ${playerName} scored ${pointsCounter} points`;

  // Save the score
  let scores = JSON.parse(localStorage.getItem('scores')) || [];
  const existingIndex = scores.findIndex(s => s.player === playerName);
  if (existingIndex >= 0) { 
    scores[existingIndex].points = pointsCounter; 
  } else { 
    scores.push({ player: playerName, points: pointsCounter }); 
  }
  localStorage.setItem('scores', JSON.stringify(scores));

  // --- RESET GAME STATE ---
  localStorage.removeItem('livesCounter');
  localStorage.removeItem('pointsCounter');

  livesCounter = 1;
  pointsCounter = 0;

  gameoverPopover.classList.add('show');

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
  // Popover container
  // -----------------------------
  let popoverContainer = document.getElementById("popoverContainer");
  if (!popoverContainer) {
    popoverContainer = document.createElement("div");
    popoverContainer.id = "popoverContainer";
    document.body.appendChild(popoverContainer);
  }

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

  // -----------------------------
  // Popover buttons
  // -----------------------------
  function setupPopoverButtons(popover) {
    const wrongBtn = popover.querySelector('.wrongBtn');
    const rightBtn = popover.querySelector('.rightBtn');
    const answerBtn = popover.querySelector('.answerBtn');
    const skipBtn = popover.querySelector('.skipBtn');
    const answerDiv = popover.querySelector('.popover_answer');
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
    const decision1Div = popover.querySelector('.popover_decision1');
    const decision1Btn = popover.querySelector('.decision1Btn');
    const decision2Div = popover.querySelector('.popover_decision2');
    const decision2Btn = popover.querySelector('.decision2Btn');
    const riskyYesBtn = popover.querySelector('.riskyYesBtn');
    const riskyNoBtn = popover.querySelector('.riskyNoBtn');

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
        saveDisabledTiles();
      }
      window.lastPopoverID = null;
    }

    if (answerBtn && answerDiv) answerBtn.addEventListener('click', () => { 
      answerDiv.classList.add('show'); 
      answerBtn.parentElement.classList.add('hidden'); 
    });

    if (skipBtn) skipBtn.addEventListener('click', () => { 
      disableTileAfterUse(); 
      popover.classList.remove('show'); 
    });

    if (wrongBtn) wrongBtn.addEventListener('click', () => { 
      livesCounter--; 
      updateLivesDisplay(); 
      disableTileAfterUse(); 
      popover.classList.remove('show'); 
    });

    if (rightBtn) rightBtn.addEventListener('click', () => { 
      pointsCounter++; 
      updatePointsDisplay(); 
      disableTileAfterUse(); 
      popover.classList.remove('show'); 
    });

    if (hint2Btn && hint2Div) hint2Btn.addEventListener('click', () => { 
      hint2Div.classList.add('show'); 
      hint2Btn.parentElement.classList.add('hidden'); 
    });

    if (hint3Btn && hint3Div) hint3Btn.addEventListener('click', () => { 
      hint3Div.classList.add('show'); 
      hint3Btn.parentElement.classList.add('hidden'); 
    });

    if (solo2Btn && solo2Div) solo2Btn.addEventListener('click', () => { 
      solo2Div.classList.add('show'); 
      solo2Btn.parentElement.classList.add('hidden'); 
    });

    if (host1Btn && host2Btn && host1Div) host1Btn.addEventListener('click', () => { 
      host1Div.classList.add('show');
      host1Btn.parentElement.classList.add('hidden');
      host2Btn.parentElement.classList.add('hidden'); 
    });

    if (host1Btn && host2Btn && host2Div) host2Btn.addEventListener('click', () => { 
      host2Div.classList.add('show'); 
      host1Btn.parentElement.classList.add('hidden');
      host2Btn.parentElement.classList.add('hidden'); 
    });

    if (decision1Btn && decision2Btn && decision1Div) decision1Btn.addEventListener('click', () => { 
      decision1Div.classList.add('show');
      decision1Btn.parentElement.classList.add('hidden');
      decision2Btn.parentElement.classList.add('hidden'); 
    });

    if (decision1Btn && decision2Btn && decision2Div) decision2Btn.addEventListener('click', () => { 
      decision2Div.classList.add('show'); 
      decision1Btn.parentElement.classList.add('hidden');
      decision2Btn.parentElement.classList.add('hidden'); 
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
  }

  // -----------------------------
  // Player name input logic
  // -----------------------------
  const playerInput = document.getElementById('playerNameInput');
  const readyBtn = document.querySelector('.readyBtn');
  const popoverName = document.getElementById('InputOK');
  const popoverText = popoverName ? popoverName.querySelector('h1') : null;
  const btnCheck = popoverName ? popoverName.querySelector('.btnCheck') : null;
  const btnCross = popoverName ? popoverName.querySelector('.btnCross') : null;

  if (readyBtn && playerInput && popoverName && popoverText && btnCheck && btnCross) {
    btnCross.addEventListener('click', () => popoverName.classList.remove('show'));
    btnCheck.addEventListener('click', () => {
      playerName = playerInput.value.trim();
      localStorage.setItem('playerName', playerName);
      window.location.href = 'Main_New.html';
    });
  }

  // -----------------------------
  // Keyboard shortcuts
  // -----------------------------
  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    const currentPopover = document.querySelector(".popover.show");
    if (!currentPopover) return;

    switch (key) {
      case "r": const rightBtn = currentPopover.querySelector(".rightBtn"); if (rightBtn) rightBtn.click(); break;
      case "w": const wrongBtn = currentPopover.querySelector(".wrongBtn"); if (wrongBtn) wrongBtn.click(); break;
      case "a": case " ": const answerBtn = currentPopover.querySelector(".answerBtn"); if (answerBtn) answerBtn.click(); break;
    }
  });

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
