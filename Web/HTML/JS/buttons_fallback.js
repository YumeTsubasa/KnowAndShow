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

  // 🔹 Handle all popovers (ready button + tiles)
  document.querySelectorAll('[popovertarget]').forEach(btn => {
    const targetId = btn.getAttribute('popovertarget');
    const popover = document.getElementById(targetId);
    if (!popover) return;

    btn.addEventListener('click', () => {
      // Ready button special case: update text
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

      // Hide other popovers first
      document.querySelectorAll('.popover_name.show, .popover.show').forEach(p => {
        if (p !== popover) p.classList.remove('show');
      });

      // Show this popover
      popover.classList.add('show');
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
        popover.classList.remove('show');  // hide popover
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener('click', () => {
        pointsCounter += 1;
        updatePointsDisplay();
        popover.classList.remove('show');  // hide popover
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
  const popoverName = document.getElementById('InputOK');
  const popoverText = popoverName ? popoverName.querySelector('h1') : null;
  const btnCheck = popoverName ? popoverName.querySelector('.btnCheck') : null;
  const btnCross = popoverName ? popoverName.querySelector('.btnCross') : null;

  if (readyBtn && playerInput && popoverName && popoverText && btnCheck && btnCross) {

    // Cancel → hide popover
    btnCross.addEventListener('click', () => {
      popoverName.classList.remove('show');
    });

    // OK → save name and go to main page
    btnCheck.addEventListener('click', () => {
      playerName = playerInput.value.trim();
      localStorage.setItem('playerName', playerName);
      window.location.href = 'Main_New.html';
    });
  }
});
