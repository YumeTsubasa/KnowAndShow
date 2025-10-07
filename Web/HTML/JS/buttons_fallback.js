document.addEventListener('DOMContentLoaded', () => {
  let livesCounter = 1;   // start safe
  let pointsCounter = 0;
  let playerName = localStorage.getItem('playerName') || "Player";

  const livesDisplay = document.querySelector('.lives img');
  const pointsDisplay = document.querySelector('.points h1');
  const gameoverPopover = document.querySelector('.gameover_popover');

  const livesImages = {
    1: "img/misc/safe.png",
    0: "img/misc/danger.png"
  };

  // 🔹 Restore global board state (disabled tiles + overlays)
  const savedDisabledTiles = JSON.parse(localStorage.getItem('disabledTiles')) || [];
  if (savedDisabledTiles.length > 0) {
    savedDisabledTiles.forEach(id => {
      const tileBtn = document.querySelector(`.tileBtn[popovertarget="${id}"]`);
      if (tileBtn) {
        tileBtn.disabled = true;
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        overlay.style.pointerEvents = 'none';
        tileBtn.style.position = 'relative';
        tileBtn.appendChild(overlay);
      }
    });
  }

  // 🔹 helper: update lives image
  function updateLivesDisplay() {
    if (livesCounter >= 1) {
      livesCounter = 1;
      if (livesDisplay) livesDisplay.src = livesImages[1];
    } else if (livesCounter === 0) {
      if (livesDisplay) livesDisplay.src = livesImages[0];
    } else if (livesCounter < 0) {
      if (livesDisplay) livesDisplay.src = livesImages[0];
      showGameOver();
    }
  }

  // 🔹 helper: update points display
  function updatePointsDisplay() {
    if (pointsDisplay) pointsDisplay.textContent = `${playerName}: ${pointsCounter}`;
  }

  // 🔹 helper: save disabled tile IDs globally
  function saveDisabledTiles() {
    const disabledTiles = Array.from(document.querySelectorAll('.tileBtn:disabled'))
      .map(btn => btn.getAttribute('popovertarget'));
    localStorage.setItem('disabledTiles', JSON.stringify(disabledTiles));
  }

  // 🔹 show Game Over popover
  function showGameOver() {
    if (!gameoverPopover) return;

    const gameoverText = gameoverPopover.querySelector('h2');
    if (gameoverText) {
      gameoverText.textContent = `Player ${playerName} has scored ${pointsCounter} points`;
    }

    // Save this player's score
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ player: playerName, points: pointsCounter });
    localStorage.setItem('scores', JSON.stringify(scores));

    // 🟢 Keep disabled tiles persisted for the next player
    saveDisabledTiles();

    gameoverPopover.classList.add('show');

    const restartBtn = gameoverPopover.querySelector('.gameoverBtn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        window.location.href = 'Name.html'; // back to name input
      });
    }
  }

  updateLivesDisplay();
  updatePointsDisplay();

  // 🔹 handle all popovers
  document.querySelectorAll('[popovertarget]').forEach(btn => {
    const targetId = btn.getAttribute('popovertarget');
    const popover = document.getElementById(targetId);
    if (!popover) return;

    btn.addEventListener('click', () => {
      if (targetId === 'InputOK') {
        const playerInput = document.getElementById('playerNameInput');
        const popoverText = popover.querySelector('h1');
        const nameValue = playerInput.value.trim();
        if (nameValue === '') {
          alert('Please enter a name.');
          return;
        }
        popoverText.textContent = `Do you choose "${nameValue}" as your name?`;
      }

      document.querySelectorAll('.popover_name.show, .popover.show').forEach(p => {
        if (p !== popover) p.classList.remove('show');
      });

      popover.classList.add('show');
      window.lastPopoverID = targetId;
    });
  });

  // 🔹 set up wrong/right/answer buttons
  document.querySelectorAll('.popover').forEach(popover => {
    const wrongBtn = popover.querySelector('.wrongBtn');
    const rightBtn = popover.querySelector('.rightBtn');
    const answerBtn = popover.querySelector('.answerBtn');
    const answerDiv = popover.querySelector('.popover_answer');

    function disableTileAfterUse() {
      const popoverID = window.lastPopoverID;
      if (popoverID) {
        const tileBtn = document.querySelector(`.tileBtn[popovertarget="${popoverID}"]`);
        if (tileBtn && !tileBtn.disabled) {
          tileBtn.disabled = true;
          const overlay = document.createElement('div');
          overlay.style.position = 'absolute';
          overlay.style.top = '0';
          overlay.style.left = '0';
          overlay.style.width = '100%';
          overlay.style.height = '100%';
          overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
          overlay.style.pointerEvents = 'none';
          tileBtn.style.position = 'relative';
          tileBtn.appendChild(overlay);
          saveDisabledTiles(); // persist after each use
        }
        window.lastPopoverID = null;
      }
    }

    if (wrongBtn) {
      wrongBtn.addEventListener('click', () => {
        livesCounter -= 1;
        updateLivesDisplay();
        disableTileAfterUse();
        popover.classList.remove('show');
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener('click', () => {
        pointsCounter += 1;
        updatePointsDisplay();
        disableTileAfterUse();
        popover.classList.remove('show');
      });
    }

// 🔹 Handle showing the answer and hiding the answer button
	if (answerBtn && answerDiv) {
		answerBtn.addEventListener('click', () => {
		// Show the answer text
		answerDiv.classList.add('show');
		// Hide the entire answer button container
		answerBtn.parentElement.classList.add('hidden');
  });
}

  });

  // 🔹 player name logic
  const playerInput = document.getElementById('playerNameInput');
  const readyBtn = document.querySelector('.readyBtn');
  const popoverName = document.getElementById('InputOK');
  const popoverText = popoverName ? popoverName.querySelector('h1') : null;
  const btnCheck = popoverName ? popoverName.querySelector('.btnCheck') : null;
  const btnCross = popoverName ? popoverName.querySelector('.btnCross') : null;

  if (readyBtn && playerInput && popoverName && popoverText && btnCheck && btnCross) {
    btnCross.addEventListener('click', () => {
      popoverName.classList.remove('show');
    });

    btnCheck.addEventListener('click', () => {
      playerName = playerInput.value.trim();
      localStorage.setItem('playerName', playerName);
      // 🟢 keep board state for next player — no reset here
      window.location.href = 'Main_New.html';
    });
  }
});
