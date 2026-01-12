document.addEventListener("DOMContentLoaded", () => {
  // Get the scores array from localStorage
  const scores = JSON.parse(localStorage.getItem("scores")) || [];

  // Find the <h2> inside the .Scores container
  const scoreHeading = document.querySelector(".Scores h2");

  if (!scoreHeading) {
    console.error("No <h2> found inside .Scores container.");
    return;
  }



  // Enable multi-column flow when content grows
  scoreHeading.style.columnCount = 2;          // 👈 adjust if needed
  scoreHeading.style.columnGap = "40px";
  scoreHeading.style.whiteSpace = "normal";
  scoreHeading.style.columnWidth = "680px";

  // If there are no stored scores
  if (scores.length === 0) {
    scoreHeading.textContent = "No scores yet.";
    return;
  }

  // Sort scores by points descending
  scores.sort((a, b) => b.points - a.points);

  // Build HTML
  let scoreHTML = "";
  scores.forEach(entry => {
    scoreHTML += `${entry.player}: ${entry.points} points<br>`;
  });

  scoreHeading.innerHTML = scoreHTML;
});
