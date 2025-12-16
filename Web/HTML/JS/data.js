// data.js
// Handles fetching JSON and returning question data

console.log("🟢 data.js loaded");

let questionData = [];

export async function loadQuestions(path = "JSON/qNormal.json") {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    questionData = await response.json();
    console.log(`✅ Loaded ${questionData.length} questions from ${path}`);
  } catch (error) {
    console.error(`❌ Failed to load ${path}:`, error);
  }
}

export function getQuestionData(id) {
  return questionData.find(q => q.id === id) || null;
}

export function getAllQuestions() {
  return questionData;
}

