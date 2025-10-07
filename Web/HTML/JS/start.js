document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ start.js loaded');

  const startBtn = document.querySelector('.startBtn');
  const quitBtn  = document.querySelector('.quitBtn');

  // Start button → clear board state and go to Name.html
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      console.log('▶️ Start clicked');

      // Clear saved board state (tiles) and any counters
      localStorage.removeItem('disabledTiles');  // if used for tiles
      localStorage.removeItem('scores');         // optional: reset scores
      localStorage.removeItem('playerName');     // optional: reset name
      localStorage.removeItem('pointsCounter');  // if points stored separately
      localStorage.removeItem('livesCounter');   // if lives stored separately

      window.location.href = 'HTML/Name.html';
    });
  }

  // Quit button → try to close or fallback
  if (quitBtn) {
    quitBtn.addEventListener('click', () => {
      console.log('❌ Quit clicked');

      // Try closing (works only if window opened via JS)
      window.close();

      // If it didn’t close, show a fallback message
      setTimeout(() => {
        if (!window.closed) {
          document.body.innerHTML = `
            <h1 style="color:#00FF00; text-align:center; margin-top:50px;">
              You can now close this tab.
            </h1>`;
        }
      }, 200);
    });
  }
});
