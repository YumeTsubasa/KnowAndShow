document.addEventListener('DOMContentLoaded', () => { 
  let livesCounter = 1;
  let pointsCounter = 0;

  const livesDisplay = document.querySelector('.lives h1');
  const pointsDisplay = document.querySelector('.points h1');

  // initialize counters
  livesDisplay.textContent = `Lives: ${livesCounter}`;
  pointsDisplay.textContent = `Points: ${pointsCounter}`;

  // get all toggle buttons for popovers
  const toggleButtons = document.querySelectorAll('[popovertarget]');
  toggleButtons.forEach(btn => {
    const targetId = btn.getAttribute('popovertarget');
    const popover = document.getElementById(targetId);
    if (!popover) return;

    const answerBtn = popover.querySelector('.answerBtn');
    const answerDiv = popover.querySelector('.popover_answer');

	// toggle popover on click
	btn.addEventListener('click', () => {
		document.querySelectorAll('.popover.show').forEach(p => {
			if (p !== popover) p.classList.remove('show');
		});

	// reset answer state each time the popover is opened
	if (!popover.classList.contains('show')) {
		const answerDiv = popover.querySelector('.popover_answer');
		const answerBtn = popover.querySelector('.answerBtn');

		if (answerDiv) answerDiv.classList.remove('show');
		if (answerBtn && answerBtn.parentElement) {
			answerBtn.parentElement.style.display = 'block'; // 🔹 restore container
		}
	}

	popover.classList.toggle('show');
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
        livesCounter = Math.max(0, livesCounter - 1); // clamp to 0
        livesDisplay.textContent = `Lives: ${livesCounter}`;
        popover.classList.remove('show');
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener('click', () => {
        pointsCounter += 1;
        pointsDisplay.textContent = `Points: ${pointsCounter}`;
        popover.classList.remove('show');
      });
    }

	if (answerBtn && answerDiv) {
		answerBtn.addEventListener('click', () => {
			answerDiv.classList.add('show');                  // show the answer
			answerBtn.parentElement.style.display = 'none';   // hide the entire container div
		});
	}
  });
});