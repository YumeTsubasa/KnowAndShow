document.addEventListener("DOMContentLoaded", () => {
  // Get the scores array from localStorage
  const scores = JSON.parse(localStorage.getItem("scores")) || [];

  // Find the <h1> inside the .Scores container
  const scoreHeading = document.querySelector(".Scores h1");

  if (!scoreHeading) {
    console.error("No <h1> found inside .Scores container.");
    return;
  }

  // If there are no stored scores
  if (scores.length === 0) {
    scoreHeading.textContent = "No scores yet.";
    return;
  }

  // 🔹 Sort the scores by points descending
  scores.sort((a, b) => b.points - a.points);

  // 🔹 Build a readable HTML output with <br> after each entry
  let scoreHTML = "";
  scores.forEach(entry => {
    scoreHTML += `${entry.player}: ${entry.points} points<br>`;
  });

  // Replace the existing "Test" text with the sorted scores
  scoreHeading.innerHTML = scoreHTML;
});
