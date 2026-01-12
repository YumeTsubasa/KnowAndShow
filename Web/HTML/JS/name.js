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

    // Move focus into the popover
    setTimeout(() => checkBtn.focus(), 0);
  });

  // Cross hides the popover
  crossBtn.addEventListener('click', () => {
    popoverName.classList.remove('show');
    playerInput.focus(); // optional: return focus to input
  });

  // Check saves the name and redirects
  checkBtn.addEventListener('click', () => {
    playerName = playerInput.value.trim();
    localStorage.setItem('playerName', playerName);
    window.location.href = 'Normal.html';
  });
}

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  const active = document.activeElement;
  const isInputActive = active && active.tagName === "INPUT";

  const popover = document.querySelector(".popover_name.show");

  // -------------------------
  // ENTER while typing name
  // -------------------------
  if (isInputActive && key === "enter" && !popover) {
    event.preventDefault();
    active.blur(); // release input focus
    document.querySelector(".readyBtn")?.click();
    return;
  }

  // -------------------------
  // Block other keys while typing
  // -------------------------
  if (isInputActive) return;

  // -------------------------
  // Popover shortcuts
  // -------------------------
  if (popover) {
    if (key === "r") popover.querySelector(".checkBtn")?.click();
    if (key === "w") popover.querySelector(".crossBtn")?.click();
    return;
  }

  // -------------------------
  // Ready button shortcut
  // -------------------------
  if (key === "l") document.querySelector(".readyBtn")?.click();
});
