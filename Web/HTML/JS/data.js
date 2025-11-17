// data.js
// Handles fetching JSON and returning question data

console.log("🟢 data.js loaded");

let questionData = [];

export async function loadQuestions() {
  try {
    const response = await fetch("JSON/qNormal.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    questionData = await response.json();
    console.log(`✅ Loaded ${questionData.length} questions`);
  } catch (error) {
    console.error("❌ Failed to load qNormal.json:", error);
  }
}

export function getQuestionData(id) {
  return questionData.find(q => q.id === id) || null;
}

export function getAllQuestions() {
  return questionData;
}
