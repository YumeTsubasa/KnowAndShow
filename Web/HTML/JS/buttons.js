document.addEventListener('DOMContentLoaded', () => {
  let livesCounter = 1;   // start at safe
  let pointsCounter = 0;

  // 🔹 Player name placeholder
  let playerName = localStorage.getItem('playerName') || "Player";

  const livesDisplay = document.querySelector('.lives img');
  const pointsDisplay = document.querySelector('.points h1');

  // image paths for lives states
  const livesImages = {
    1: "img/misc/safe.png",
    0: "img/misc/danger.png",
    "-1": "img/lives/gameover.png"
  };

  // helper to update lives image
  function updateLivesDisplay() {
    if (livesCounter >= 1) livesCounter = 1;
    else if (livesCounter <= -1) livesCounter = -1;
    if (livesDisplay) livesDisplay.src = livesImages[livesCounter];
  }

  // helper for updating points display
  function updatePointsDisplay() {
    if (pointsDisplay) pointsDisplay.textContent = `${playerName}: ${pointsCounter}`;
  }

  // init displays
  updateLivesDisplay();
  updatePointsDisplay();

  // get all toggle buttons for normal popovers
  const toggleButtons = document.querySelectorAll('[popovertarget]');
  toggleButtons.forEach(btn => {
    const targetId = btn.getAttribute('popovertarget');
    const popover = document.getElementById(targetId);
    if (!popover) return;

    btn.addEventListener('click', () => {
      // Only update player name in the popover if relevant
      if (targetId === 'InputOK') {
        const playerInput = document.getElementById('playerNameInput');
        const placeholderName = popover.querySelector('h1');
        if (playerInput && placeholderName) {
          const nameValue = playerInput.value.trim();
          if (nameValue === '') {
            alert('Please enter a name.');
            return;
          }
          placeholderName.textContent = `Do you choose "${nameValue}" as your name?`;
        }
      }
      // Show/hide popovers handled by CSS
    });
  });

  // set up counters + hidden containers once per popover
  document.querySelectorAll('.popover').forEach(popover => {
    const wrongBtn = popover.querySelector('.wrongBtn');
    const rightBtn = popover.querySelector('.rightBtn');
    const answerBtn = popover.querySelector('.answerBtn');
    const answerDiv = popover.querySelector('.popover_answer');

    if (wrongBtn) {
      wrongBtn.addEventListener('click', () => {
        livesCounter -= 1;
        updateLivesDisplay();
        popover.classList.remove('show');
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener('click', () => {
        pointsCounter += 1;
        updatePointsDisplay();
        popover.classList.remove('show');
      });
    }

    if (answerBtn && answerDiv) {
      answerBtn.addEventListener('click', () => {
        answerDiv.classList.add('show');
        answerBtn.style.display = 'none';
      });
    }
  });

  // 🔹 Player name input + Ready button + confirmation popover
  const playerInput = document.getElementById('playerNameInput');
  const readyBtn = document.querySelector('.readyBtn');
  const popover = document.getElementById('InputOK');
  const popoverText = popover ? popover.querySelector('h1') : null;
  const btnCheck = popover ? popover.querySelector('.btnCheck') : null;
  const btnCross = popover ? popover.querySelector('.btnCross') : null;

  if (readyBtn && playerInput && popover && popoverText && btnCheck && btnCross) {

    // Click Ready → validate input and show popover
    readyBtn.addEventListener('click', () => {
      const nameValue = playerInput.value.trim();
      if (nameValue === '') {
        alert('Please enter a name.');
        return;
      }
      popoverText.textContent = `Do you choose "${nameValue}" as your name?`;
      popover.classList.add('show');
    });

    // Cancel → hide popover
    btnCross.addEventListener('click', () => {
      popover.classList.remove('show');
    });

    // OK → save name and go to main page
    btnCheck.addEventListener('click', () => {
      playerName = playerInput.value.trim();
      localStorage.setItem('playerName', playerName);
      window.location.href = 'Main_New.html';
    });
  }
});
