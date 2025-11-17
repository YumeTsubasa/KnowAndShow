// buttons.js
// Main game logic, popover handling, lives/points

import { loadQuestions, getQuestionData } from "./data.js";
import { buildQuestionContent } from "./contentBuilder.js";

console.log("🟢 buttons.js loaded");

document.addEventListener('DOMContentLoaded', async () => {

  let livesCounter = 1;
  let pointsCounter = 0;
  let playerName = localStorage.getItem('playerName') || "Player";

  const livesDisplay = document.querySelector('.lives img');
  const pointsDisplay = document.querySelector('.points h1');
  const gameoverPopover = document.querySelector('.gameover_popover');

  const livesImages = { 1: "img/misc/safe.png", 0: "img/misc/danger.png" };

  // Load JSON questions first
  await loadQuestions();

  // Restore disabled tiles
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

  function updateLivesDisplay() {
    if (livesCounter > 1) livesCounter = 1;
    if (livesCounter < -1) livesCounter = -1;
    if (livesDisplay) livesDisplay.src = livesImages[livesCounter > 0 ? 1 : 0];
    if (livesCounter === -1) showGameOver();
  }

  function updatePointsDisplay() {
    if (pointsDisplay) pointsDisplay.textContent = `${playerName}: ${pointsCounter}`;
  }

  function saveDisabledTiles() {
    const disabledTiles = Array.from(document.querySelectorAll('.tileBtn:disabled')).map(btn => btn.getAttribute('popovertarget'));
    localStorage.setItem('disabledTiles', JSON.stringify(disabledTiles));
  }

  function showGameOver() {
    if (!gameoverPopover) return;
    const gameoverText = gameoverPopover.querySelector('h2');
    if (gameoverText) gameoverText.textContent = `Player ${playerName} scored ${pointsCounter} points`;

    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    const existingIndex = scores.findIndex(s => s.player === playerName);
    if (existingIndex >= 0) { scores[existingIndex].points = pointsCounter; }
    else { scores.push({ player: playerName, points: pointsCounter }); }
    localStorage.setItem('scores', JSON.stringify(scores));

    saveDisabledTiles();
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

  // Create container for popovers
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
      let questionData = getQuestionData(tileId);

      let popover;

      if (questionData) {
        // JSON-defined question
        popover = buildQuestionContent(questionData);
        popover.id = tileId;
        popoverContainer.innerHTML = "";
        popoverContainer.appendChild(popover);

        // 🔹 SHOW SCREEN QUESTION (ONLY CHANGE ADDED)
        if (questionData.type && questionData.type.toLowerCase() === "screen") {
          const imgEl = popover.querySelector('.popover_screenshot img');
          if (imgEl) {
            setTimeout(() => {
              console.log('Screen question fade-in triggered');
              imgEl.classList.add('show'); // triggers CSS fade-in
            }, 5000);
          }
        }

      } else {
        // 🔹 TEMPORARY FAILOVER: fallback to existing HTML popover
        popover = document.getElementById(tileId);
        if (!popover) {
          console.error("No data for", tileId);
          return;
        }
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

  function setupPopoverButtons(popover) {
    const wrongBtn = popover.querySelector('.wrongBtn');
    const rightBtn = popover.querySelector('.rightBtn');
    const answerBtn = popover.querySelector('.answerBtn');
    const skipBtn = popover.querySelector('.skipBtn');
    const answerDiv = popover.querySelector('.popover_answer');

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

    if (wrongBtn) wrongBtn.addEventListener('click', () => { livesCounter--; updateLivesDisplay(); disableTileAfterUse(); popover.classList.remove('show'); });
    if (skipBtn) skipBtn.addEventListener('click', () => { disableTileAfterUse(); popover.classList.remove('show'); });
    if (rightBtn) rightBtn.addEventListener('click', () => { pointsCounter++; updatePointsDisplay(); disableTileAfterUse(); popover.classList.remove('show'); });
    if (answerBtn && answerDiv) answerBtn.addEventListener('click', () => { answerDiv.classList.add('show'); answerBtn.parentElement.classList.add('hidden'); });
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
