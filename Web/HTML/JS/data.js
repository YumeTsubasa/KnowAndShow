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
  // check if we are looking inside a main question or a branch, branch have their letter in the id: Question91_B
  let idParts = id.split('_');
  if (idParts.length < 1) {
    console.error(`Invalid format for question id ${id}`);
    return null;
  } else if (idParts.length === 1) {
    return questionData.find(q => q.id === id) || null;
  } else {
    const extractedParentId = idParts[0];
    const branchLetter = idParts[1];
    const parentQuestionData = questionData.find(q => q.id === extractedParentId);
    const subQuestionData = parentQuestionData[`branch${branchLetter}`]
    return subQuestionData? subQuestionData: null;
  }
}

export function getAllQuestions() {
  return questionData;
}

