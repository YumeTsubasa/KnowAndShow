// contentBuilder.js
// Builds HTML popovers based on question type

console.log("🟢 contentBuilder.js loaded");

// Main builder function
export function buildQuestionContent(data) {
  if (!data || !data.type) return createDefaultContent(data);

  const type = data.type.toLowerCase();
  const handler = typeHandlers[type];
  if (!handler) return createDefaultContent(data);

  return handler(data);
}

// Define handlers for question types
const typeHandlers = {
  easy: createEasyContent,
  multi: createMultiContent,
  brutal: createBrutalContent,
  screen: createScreenContent,
};

// ====================
// Easy type handler
// ====================
function createEasyContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal_2.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/easy.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1>${data.question || "No question found"}</h1>
      </div>

      <div class="popover_answer">
        <h1>${data.answer || "No answer provided"}</h1>
      </div>
		
      <div class="popover_btnAnswer">
        <button class="answerBtn" type="button">
          <img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>

      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>

      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>

      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>
  `;
  return wrapper;
}

// ====================
// Multi type handler
// ====================
function createMultiContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal_2.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/multi.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h2>${data.question || "No question found"}</h2>
      </div>

	  <div class="popover_answer_multiA">
		<h2>A: ${data.answerA || "No answer provided"}</h2>
	  </div>
	  <div class="popover_answer_multiB">
		<h2>B: ${data.answerB || "No answer provided"}</h2>
	  </div>
	  <div class="popover_answer_multiC">
		<h2>C: ${data.answerC || "No answer provided"}</h2>
	  </div>
	  <div class="popover_answer_multiD">
	    <h2>D: ${data.answerD || "No answer provided"}</h2>
	  </div>
	  
      <div class="popover_answer">
        <h1>${data.answer || "No answer provided"}</h1>
      </div>

      <div class="popover_btnAnswer">
        <button class="answerBtn" type="button">
          <img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>

      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>

      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>
  `;
  return wrapper;
}

// ====================
// Brutal type handler
// ====================
function createBrutalContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal_2.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/brutal.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1>${data.question || "No question found"}</h1>
      </div>

      <div class="popover_answer">
        <h1>${data.answer || "No answer provided"}</h1>
      </div>

      <div class="popover_btnAnswer">
        <button class="answerBtn" type="button">
          <img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>

      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>

      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>
  `;
  return wrapper;
}

// ====================
// Screen type handler
// ====================
function createScreenContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal_2.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/screen.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h2>${data.question || "No question found"}</h2>
      </div>

      <div class="popover_answer">
        <h1>${data.answer || "No answer provided"}</h1>
      </div>

      <div class="popover_btnAnswer">
        <button class="answerBtn" type="button">
          <img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>

      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>

      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>

    <div class="popover_screenshot">
      <img src="${data.img || ''}">
    </div>
  `;
  return wrapper;
}

// ====================
// Helper function to fade in screenshot after delay
// ====================
export function showScreenQuestion(popover, data) {
    if (!popover) return;

    const imgEl = popover.querySelector('.popover_screenshot img');
    if (!imgEl) return;

    setTimeout(() => {
        // Here you can also play animation/sfx
        console.log('Animation/SFX placeholder for screen question');

        imgEl.classList.add('show'); // triggers CSS fade-in
    }, 5000);
}

// ====================
// Default fallback content
// ====================
function createDefaultContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.innerHTML = `<div class="popover_question_text"><h1>Unknown type: ${data ? data.type : "none"}</h1></div>`;
  return wrapper;
}
