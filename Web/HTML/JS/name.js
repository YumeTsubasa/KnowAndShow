// -----------------------------
// name.js
// Handles the name input popover logic
// -----------------------------

// Exported variable to be used in buttons.js
export let playerName = localStorage.getItem('playerName') || '';

const playerInput = document.getElementById('playerNameInput');
const readyBtn = document.querySelector('.readyBtn');
const popoverName = document.getElementById('InputOK');
const popoverText = popoverName ? popoverName.querySelector('h1') : null;
const checkBtn = popoverName ? popoverName.querySelector('.checkBtn') : null;
const crossBtn = popoverName ? popoverName.querySelector('.crossBtn') : null;

if (readyBtn && playerInput && popoverName && popoverText && checkBtn && crossBtn) {
  
  // Ready button shows the popover
  readyBtn.addEventListener('click', () => {
    const name = playerInput.value.trim();
    if (!name) return; // ignore empty input
    popoverText.textContent = `Is your name "${name}"?`;
    popoverName.classList.add('show');
  });

  // Cross hides the popover
  crossBtn.addEventListener('click', () => popoverName.classList.remove('show'));

  // Check saves the name and redirects
  checkBtn.addEventListener('click', () => {
    playerName = playerInput.value.trim();
    localStorage.setItem('playerName', playerName);
    window.location.href = 'Normal.html';
  });
}
