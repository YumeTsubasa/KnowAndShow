document.addEventListener("DOMContentLoaded", async () => {
  console.log("🟢 data.js loaded — fetching qNormal.json...");

  try {
    // Load the JSON file relative to the HTML page
    const response = await fetch("JSON/qNormal.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const jsonData = await response.json();

    jsonData.forEach(entry => {
      const id = entry.id;
      const type = entry.type ? entry.type.trim().toLowerCase() : "";
      const popover = document.getElementById(id);
      if (!popover) return;

      // 🟩 Update question and answer text
      const qText = popover.querySelector(".popover_question_text h1");
      const aText = popover.querySelector(".popover_answer h1");
      if (qText) qText.textContent = entry.question || "No question found.";
      if (aText) aText.textContent = entry.answer || "No answer provided.";

      // 🟩 Update category image based on type (case-insensitive)
      const catImg = popover.querySelector(".popover_cat_img img");
      if (catImg && type) {
        catImg.src = `img/categories/${type}.png`;
      }

      // 🟩 Optional: question image (normalize slashes)
      const questionImg = entry.img ? entry.img.replace(/\\/g, "/") : "";
      if (questionImg) {
        const qImage = popover.querySelector(".popover_question_image img");
        if (qImage) qImage.src = questionImg;
      }
    });

    console.log("✅ JSON data applied successfully.");
  } catch (error) {
    console.error("❌ Failed to load or parse qNormal.json:", error);
  }
});
