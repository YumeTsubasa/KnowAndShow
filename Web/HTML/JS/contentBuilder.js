// contentBuilder.js
// Builds HTML popovers based on question type

console.log("🟢 contentBuilder.js loaded");

// Main builder function
export function buildQuestionContent(data) {
  if (!data || !data.type) return createDefaultContent(data);

  const type = data.type.toLowerCase();
  const mode = window.GAME_MODE || "normal";

  const handler = typeHandlers[type];
  if (!handler) return createDefaultContent(data);

  return handler(data, mode);
}


// Define handlers for question types
const typeHandlers = {
  easy: createEasyContent,
  multi: createMultiContent,
  brutal: createBrutalContent,
  qte: createQTEContent,
  screen: createScreenContent,
  jukebox: createJukeboxContent,    
  audio: createAudioContent,          
  character: createCharacterContent,
  hint: createHintContent,
  mine: createMineContent,
  solo: createSoloContent,
  audience: createAudienceContent,
  team: createTeamContent,
  trust: createTrustContent,
  host: createHostContent,
  branch: createBranchContent,
  decision: createDecisionContent,
  risky: createRiskyContent,
  gameover: createGameoverContent
};

// ====================
// Typewriter behaviour handler
// ====================

/**
 * Typewriter effect for any text element.
 *
 * @param {HTMLElement} element - The target element to type into.
 * @param {string} text - The text to type.
 * @param {number} speed - Delay per character in milliseconds.
 */
// Global typewriter speed in milliseconds
const TYPEWRITER_SPEED = 30; // adjust this once to change speed everywhere

function typeWriter(element, text) {
  if (!element) return; // Safety check

  element.textContent = "";                  // Clear any existing text
  element.classList.add("typewriter-cursor"); // Add blinking cursor

  let i = 0; // character index

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, TYPEWRITER_SPEED); // use global speed
    } else {
      element.classList.remove("typewriter-cursor"); // Stop cursor at the end
    }
  }

  type();
}


// ====================
// EASY type handler
// ====================

function createEasyContent(data, speed = 30) {
  if (window.GAME_MODE === "risky") {
    return createREasyContent(data);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  // Insert inner HTML
  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/easy.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>

      <div class="popover_answer">
        <h2>Correct answer: ${data.answer || "No answer provided"}</h2>
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

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// EASY RISKY type handler
// ====================

function createREasyContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  // Insert inner HTML
  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/easy.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>

      <div class="popover_answer">
        <h2>Correct answer: ${data.answer || "No answer provided"}</h2>
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

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// MULTI type handler
// ====================

function createMultiContent(data, speed = 30) {
  if (window.GAME_MODE === "risky") {
    return createRMultiContent(data);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;
  wrapper.dataset.type = "multi";


  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/multi.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>
      <div class="popover_multi_answers">
        <h2></h2>
      </div>
      <div class="popover_multi_btnAnswer">
        <button class="answerMultiBtn" type="button">
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
    document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// MULTI RISKY type handler
// ====================

function createRMultiContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/multi.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
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
      
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>
  `;
    document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// BRUTAL type handler
// ====================

function createBrutalContent(data, speed = 30) {
  if (window.GAME_MODE === "risky") {
    return createRBrutalContent(data);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/brutal.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>

      <div class="popover_answer">
        <h2>Correct answer: ${data.answer || "No answer provided"}</h2>
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

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// BRUTAL RISKY type handler
// ====================

function createRBrutalContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/brutal.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>

      <div class="popover_answer">
        <h2>Correct answer: ${data.answer || "No answer provided"}</h2>
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

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// QTE type handler
// ====================

function createQTEContent(data, speed = 30) {
  if (window.GAME_MODE === "risky") {
    return createRQTEContent(data, speed);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;
  
  // -----------------------------
  // Mark this popover as a QTE type
  // -----------------------------
  wrapper.dataset.type = "qte";

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/qte.png" loading="lazy">
      </div>
      <div class="popover_resultQTE">
	    <img src="img/layout/catNormal.png" width="100%" height="100%">
		<div class="popover_resultTextQTE">
			<h2 class="qte-result-title"></h2>
			<p class="qte-result-text"></p>
		</div>
		<div class="popover_resultA1QTE">
			<img src="img/misc/qteBlank.png" loading="lazy">
		</div>
		<div class="popover_resultA2QTE">
			<img src="img/misc/qteBlank.png" loading="lazy">
		</div>
		<div class="popover_resultA3QTE">
			<img src="img/misc/qteBlank.png" loading="lazy">
		</div>
		<div class="popover_resultA4QTE">
			<img src="img/misc/qteBlank.png" loading="lazy">
		</div>
		<div class="popover_resultA5QTE">
			<img src="img/misc/qteBlank.png" loading="lazy">
		</div>
		<div class="popover_btnClose">
			<button class="closeBtn" type="button">
			</button>
		</div>
	  </div>
	  
    </div>
		<div class="popover_question_body">
		<img src="img/layout/textNormal.png" width="100%" height="100%">
			<div class="popover_question_text">
				<h1 class="typewriter-target"></h1>
			</div>
			<div class="popover_btnGo">
				<button class="qtegobtn" type="button">
					<img src="img/misc/go.png" width="100%" height="100%" loading="lazy">
				</button>
			</div>
			<div class="popover_item_display">
				<h2></h2>
			</div>
			<div class="popover_btnAnswerQTE">
				<button class="answerqteBtn" type="button">
					<img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
				</button>
			</div>	
			<div class="popover_answerQTE">
				<h1></h1>
			</div>			
			<div class="popover_btnRightQTE">
				<button class="rightqteBtn" type="button" popovertarget="${data.id}">
					<img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
				</button>
			</div>
			<div class="popover_btnWrongQTE">
				<button class="wrongqteBtn" type="button" popovertarget="${data.id}">
					<img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
				</button>
			</div>
			<div class="popover_btnClose">
				<button class="closeBtn" type="button">
				</button>
			</div>
		</div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// QTE RISKY type handler
// ====================

function createRQTEContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;
  
  // -----------------------------
  // Mark this popover as a QTE type
  // -----------------------------
  wrapper.dataset.type = "qte";

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/qte.png" loading="lazy">
      </div>
    </div>
		<div class="popover_question_body">
		<img src="img/layout/textRisky.png" width="100%" height="100%">
			<div class="popover_question_text">
				<h1 class="typewriter-target"></h1>
			</div>
			<div class="popover_btnGo">
				<button class="qtegobtn" type="button">
					<img src="img/misc/go.png" width="100%" height="100%" loading="lazy">
				</button>
			</div>
			<div class="popover_item_display">
				<h2></h2>
			</div>
			<div class="popover_btnAnswerQTE">
				<button class="answerqteBtn" type="button">
					<img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
				</button>
			</div>	
			<div class="popover_answerQTE">
				<h1></h1>
			</div>			
			<div class="popover_btnRightQTE">
				<button class="rightqteBtn" type="button" popovertarget="${data.id}">
					<img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
				</button>
			</div>
			<div class="popover_btnWrongQTE">
				<button class="wrongqteBtn" type="button" popovertarget="${data.id}">
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

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// SCREEN type handler
// ====================
function createScreenContent(data, speed = 30) {
  if (window.GAME_MODE === "risky") {
    return createRScreenContent(data);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  // Insert inner HTML
  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/screen.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>

      <div class="popover_answer">
        <h2>Correct answer: ${data.answer || "No answer provided"}</h2>
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
    
    <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
    </div>

    <div class="popover_screenshot">
      <img src="${data.img || ''}">
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// SCREEN RISKY type handler
// ====================
function createRScreenContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  // Insert inner HTML
  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/screen.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>

      <div class="popover_answer">
        <h2>Correct answer: ${data.answer || "No answer provided"}</h2>
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
    
    <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
    </div>

    <div class="popover_screenshot">
      <img src="${data.img || ''}">
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// CHARACTER type handler
// ====================
function createCharacterContent(data, speed = 30) {
  if (window.GAME_MODE === "risky") {
    return createRCharacterContent(data);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/character.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>

      <div class="popover_btnAnswer">
        <button class="answerBtn" type="button">
          <img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
	  
	  <div class="popover_answer">
        <h2>Correct answer: ${data.answer || "No answer provided"}</h2>
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

    <div class="popover_character">
      <img src="${data.img || ''}">
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// CHARACTER RISKY type handler
// ====================
function createRCharacterContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/character.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>

      <div class="popover_btnAnswer">
        <button class="answerBtn" type="button">
          <img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
	  
	  <div class="popover_answer">
        <h2>Correct answer: ${data.answer || "No answer provided"}</h2>
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

    <div class="popover_character">
      <img src="${data.img || ''}">
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// JUKEBOX type handler
// ====================

function createJukeboxContent(data, speed = 30) {
  if (window.GAME_MODE === "risky") {
    return createRJukeboxContent(data);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/jukebox.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>

      <div class="popover_btnAnswer">
        <button class="answerBtn" type="button">
          <img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
	  
	  <div class="popover_answer">
        <h2>Correct answer: ${data.answer || "No answer provided"}</h2>
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

      <div class="popover_audio_btn">
        <img src="img/misc/audio.png" width="100%" height="100%" loading="lazy">
        <audio src="${data.audio || ''}"></audio>
      </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// JUKEBOX type handler
// ====================

function createRJukeboxContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/jukebox.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>

      <div class="popover_btnAnswer">
        <button class="answerBtn" type="button">
          <img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
	  
	  <div class="popover_answer">
        <h2>Correct answer: ${data.answer || "No answer provided"}</h2>
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

      <div class="popover_audio_btn">
        <img src="img/misc/audio.png" width="100%" height="100%" loading="lazy">
        <audio src="${data.audio || ''}"></audio>
      </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// AUDIO type handler
// ====================

function createAudioContent(data, speed = 30) {
  if (window.GAME_MODE === "risky") {
    return createRAudioContent(data);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/audio.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>

      <div class="popover_btnAnswer">
        <button class="answerBtn" type="button">
          <img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
	  
	  <div class="popover_answer">
        <h2>Correct answer: ${data.answer || "No answer provided"}</h2>
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

      <div class="popover_audio_btn">
        <img src="img/misc/audio.png" width="100%" height="100%" loading="lazy">
        <audio src="${data.audio || ''}"></audio>
      </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// AUDIO RISKY type handler
// ====================

function createRAudioContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/audio.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>

      <div class="popover_btnAnswer">
        <button class="answerBtn" type="button">
          <img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
	  
	  <div class="popover_answer">
        <h2>Correct answer: ${data.answer || "No answer provided"}</h2>
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

      <div class="popover_audio_btn">
        <img src="img/misc/audio.png" width="100%" height="100%" loading="lazy">
        <audio src="${data.audio || ''}"></audio>
      </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// HINT SYSTEM type handler
// ====================

function createHintContent(data, speed = 30) {
  if (window.GAME_MODE === "risky") {
    return createRHintContent(data);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/hint.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>

      <div class="popover_btnAnswer">
        <button class="answerBtn" type="button">
          <img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
	  
	  <div class="popover_answer">
        <h2>Correct answer: ${data.answer || "No answer provided"}</h2>
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
	  <div class="popover_btnHint1">
		<button class="hint1Btn" type="button" popovertarget="${data.id}">
		 <h2>Hint 1</h2>
		</button>
	  </div>
	  <div class="popover_hint1">
		<h2>${data.hint1 || ""}</h2>
	  </div>
	  <div class="popover_btnHint2">
		<button class="hint2Btn" type="button" popovertarget="${data.id}">
		 <h2>Hint 2</h2>
		</button>
	  </div>
	  <div class="popover_hint2">
		<h2>${data.hint2 || ""}</h2>
	  </div>
	  <div class="popover_btnHint3">
		<button class="hint3Btn" type="button" popovertarget="${data.id}">
		 <h2>Hint 3</h2>
		</button>
	  </div>
	  <div class="popover_hint3">
		<h2>${data.hint3 || ""}</h2>
	  </div>
    </div>


  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// HINT SYSTEM RISKY type handler
// ====================

function createRHintContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/hint.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>

      <div class="popover_btnAnswer">
        <button class="answerBtn" type="button">
          <img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
	  
	  <div class="popover_answer">
        <h2>Correct answer: ${data.answer || "No answer provided"}</h2>
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
	  <div class="popover_btnHint1">
		<button class="hint1Btn" type="button" popovertarget="${data.id}">
		 <h2>Hint 1</h2>
		</button>
	  </div>
	  <div class="popover_hint1">
		<h2>${data.hint1 || ""}</h2>
	  </div>
	  <div class="popover_btnHint2">
		<button class="hint2Btn" type="button" popovertarget="${data.id}">
		 <h2>Hint 2</h2>
		</button>
	  </div>
	  <div class="popover_hint2">
		<h2>${data.hint2 || ""}</h2>
	  </div>
	  <div class="popover_btnHint3">
		<button class="hint3Btn" type="button" popovertarget="${data.id}">
		 <h2>Hint 3</h2>
		</button>
	  </div>
	  <div class="popover_hint3">
		<h2>${data.hint3 || ""}</h2>
	  </div>
    </div>


  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// MINEFIELD type handler
// ====================

function createMineContent(data, speed = 30) {
  if (window.GAME_MODE === "risky") {
    return createRMineContent(data);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover", "minefieldPopover"); // Minefield popover
  wrapper.id = data.id;
  wrapper.dataset.type = "mine";

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/mine.png" loading="lazy">
      </div>
	  <div class="popover_resultMine">
	    <img src="img/layout/catNormal.png" width="100%" height="100%">
			<div class="popover_resultTextMine">
				<h2 class="mine-result-title"></h2>
				<p class="mine-result-text"></p>
			</div>
	  </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>

      <div class="popover_mine"></div>

      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
	  <div class="popover_btnMineProceed">
        <button class="proceedMineBtn" type="button" popovertarget="${data.id}" disabled>
        </button>
      </div>
	  <div class="popover_btnClose">
			<button class="closeBtn" type="button">
			</button>
	  </div>
    </div>
  `;

  const mineContainer = wrapper.querySelector(".popover_mine");

  // Split options into rows of 4 for visual layout
const rowCount = data.tiles.length;

for (let i = 0; i < rowCount; i++) {
  const ol = document.createElement("ol");
  ol.classList.add("carousel-media");
  ol.setAttribute("role", "list");

  data.tiles[i].forEach(tile => {
    const li = document.createElement("li");
    li.classList.add("carousel-item_mine", "minefieldTile");
    li.setAttribute("data-type", tile.correct ? "safe" : "mine");

    const h1 = document.createElement("h1");
    h1.textContent = tile.text;

    li.appendChild(h1);
    ol.appendChild(li);
  });

  mineContainer.appendChild(ol);
}



  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// MINEFIELD RISKY type handler
// ====================

function createRMineContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover", "minefieldPopover"); // Minefield popover
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/mine.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>

      <div class="popover_mine"></div>

      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>
  `;

  const mineContainer = wrapper.querySelector(".popover_mine");

  // Split options into rows of 4 for visual layout
const rowCount = data.tiles.length;

for (let i = 0; i < rowCount; i++) {
  const ol = document.createElement("ol");
  ol.classList.add("carousel-media");
  ol.setAttribute("role", "list");

  data.tiles[i].forEach(tile => {
    const li = document.createElement("li");
    li.classList.add("carousel-item_mine", "minefieldTile");
    li.setAttribute("data-type", tile.correct ? "safe" : "mine");

    const h1 = document.createElement("h1");
    h1.textContent = tile.text;

    li.appendChild(h1);
    ol.appendChild(li);
  });

  mineContainer.appendChild(ol);
}



  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// SOLO CHALLENGE type handler
// ====================

function createSoloContent(data, speed = 30) {
  if (window.GAME_MODE === "risky") {
    return createRSoloContent(data);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/solo.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
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
	  <div class="popover_solo2">
		<h2>${data.challengePart2 || ""}</h2>
	  </div>
	  <div class="popover_btnSolo2">
		<button class="solo2Btn" type="button" popovertarget="Question21">
		 <img src="img/misc/solo.png" width="100%" height="100%" loading="lazy">
		</button>
	  </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.challengePart1 || "No challenge found", speed);

  return wrapper;
}

// ====================
// SOLO CHALLENGE RISKY type handler
// ====================

function createRSoloContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/solo.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
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
	  <div class="popover_solo2">
		<h2>${data.challengePart2 || ""}</h2>
	  </div>
	  <div class="popover_btnSolo2">
		<button class="solo2Btn" type="button" popovertarget="Question21">
		 <img src="img/misc/solo.png" width="100%" height="100%" loading="lazy">
		</button>
	  </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.challengePart1 || "No challenge found", speed);

  return wrapper;
}

// ====================
// AUDIENCE type handler
// ====================

function createAudienceContent(data, speed = 30) {
  if (window.GAME_MODE === "risky") {
    return createRAudienceContent(data);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/audience.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
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
	  <div class="popover_audience">
		<h2>${data.challenge || ""}</h2>
	  </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// AUDIENCE RISKY type handler
// ====================

function createRAudienceContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/audience.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
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
	  <div class="popover_audience">
		<h2>${data.challenge || ""}</h2>
	  </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// TEAM type handler
// ====================

function createTeamContent(data, speed = 30) {
  if (window.GAME_MODE === "risky") {
    return createRTeamContent(data);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/team.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
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
	  <div class="popover_team">
		<h2>${data.challenge || ""}</h2>
	  </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// TEAM RISKY type handler
// ====================

function createRTeamContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/team.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
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
	  <div class="popover_team">
		<h2>${data.challenge || ""}</h2>
	  </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// TRUST type handler
// ====================

function createTrustContent(data, speed = 30) {
  if (window.GAME_MODE === "risky") {
    return createRTrustContent(data);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/trust.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
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
	  <div class="popover_trust">
		<h2>${data.challenge || ""}</h2>
	  </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// TRUST RISKY type handler
// ====================

function createRTrustContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/trust.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
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
	  <div class="popover_trust">
		<h2>${data.challenge || ""}</h2>
	  </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// HOST CHALLENGE type handler
// ====================

function createHostContent(data, speed = 30) {
  if (window.GAME_MODE === "risky") {
    return createRHostContent(data);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/host.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
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
	  <div class="popover_host1">
		<h2>Dubbel Challenge: ${data.DoubleDubbel || ""}</h2>
	  </div>
	  <div class="popover_host2">
		<h2>Boxy Challenge: ${data.Boxy || ""}</h2>
      </div>
	  <div class="popover_host3">
		<h2>Yatogami Challenge: ${data.Yatogami || ""}</h2>
      </div>
	  <div class="popover_btnHost1">
		<button class="host1Btn" type="button" popovertarget="${data.id}">
		 <h1>DoubleDubbel</h1>
		</button>
	  </div>
	  <div class="popover_btnHost2">
		<button class="host2Btn" type="button" popovertarget="${data.id}">
		 <h1>Boxy</h1>
		</button>
	  </div>
	  <div class="popover_btnHost3">
		<button class="host3Btn" type="button" popovertarget="${data.id}">
		 <h1>Yatogami</h1>
		</button>
	  </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// HOST CHALLENGE RISKY type handler
// ====================

function createRHostContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/host.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
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
	  <div class="popover_host1">
		<h2>Dubbel Challenge: ${data.DoubleDubbel || ""}</h2>
	  </div>
	  <div class="popover_host2">
		<h2>Boxy Challenge: ${data.Boxy || ""}</h2>
      </div>
	  <div class="popover_host3">
		<h2>Yatogami Challenge: ${data.Yatogami || ""}</h2>
      </div>
	  <div class="popover_btnHost1">
		<button class="host1Btn" type="button" popovertarget="${data.id}">
		 <h1>DoubleDubbel</h1>
		</button>
	  </div>
	  <div class="popover_btnHost2">
		<button class="host2Btn" type="button" popovertarget="${data.id}">
		 <h1>Boxy</h1>
		</button>
	  </div>
	  <div class="popover_btnHost3">
		<button class="host3Btn" type="button" popovertarget="${data.id}">
		 <h1>Yatogami</h1>
		</button>
	  </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// BRANCHING PATHS type handler
// ====================

function createBranchContent(data, speed = 30) {
  if (window.GAME_MODE === "risky") {
    return createRBranchContent(data);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/branch.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
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
	  <div class="popover_btnBranchA">
		<button class="branchABtn" type="button" popovertarget="${data.id}">
		 <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		</button>
	  </div>
	  <div class="popover_btnBranchB">
		<button class="branchBBtn" type="button" popovertarget="${data.id}">
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

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// BRANCHING PATHS RISKY type handler
// ====================

function createRBranchContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/branch.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
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
	  <div class="popover_btnBranchA">
		<button class="branchABtn" type="button" popovertarget="${data.id}">
		 <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		</button>
	  </div>
	  <div class="popover_btnBranchB">
		<button class="branchBBtn" type="button" popovertarget="${data.id}">
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

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// DECISION TIME type handler
// ====================

function createDecisionContent(data, speed = 30) {
  if (window.GAME_MODE === "risky") {
    return createRDecisionContent(data);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/decision.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
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
	  <div class="popover_decision1">
		<h2>${data.game1desc || ""}</h2>
	  </div>
	  <div class="popover_decision2">
		<h2>${data.game2desc || ""}</h2>
	  </div>
	  /div>
	  <div class="popover_decision3">
		<h2>${data.game3desc || ""}</h2>
	  </div>
	  <div class="popover_btnDecision1">
		<button class="decision1Btn" type="button" popovertarget="Question21">
		 <h2>${data.game1 || ""}</h2>
		</button>
	  </div>
	  <div class="popover_btnDecision2">
		<button class="decision2Btn" type="button" popovertarget="Question21">
		 <h2>${data.game2 || ""}</h2>
		</button>
	  </div>
	  <div class="popover_btnDecision3">
		<button class="decision3Btn" type="button" popovertarget="Question21">
		 <h2>${data.game3 || ""}</h2>
		</button>
	  </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// DECISION TIME RISKY type handler
// ====================

function createRDecisionContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/decision.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
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
	  <div class="popover_decision1">
		<h2>${data.game1desc || ""}</h2>
	  </div>
	  <div class="popover_decision2">
		<h2>${data.game2desc || ""}</h2>
	  </div>
	  /div>
	  <div class="popover_decision3">
		<h2>${data.game3desc || ""}</h2>
	  </div>
	  <div class="popover_btnDecision1">
		<button class="decision1Btn" type="button" popovertarget="Question21">
		 <h2>${data.game1 || ""}</h2>
		</button>
	  </div>
	  <div class="popover_btnDecision2">
		<button class="decision2Btn" type="button" popovertarget="Question21">
		 <h2>${data.game2 || ""}</h2>
		</button>
	  </div>
	  <div class="popover_btnDecision3">
		<button class="decision3Btn" type="button" popovertarget="Question21">
		 <h2>${data.game3 || ""}</h2>
		</button>
	  </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// RISKY STRATS type handler
// ====================

function createRiskyContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/risky.png" loading="lazy">
      </div>
    </div>
	
	<div class="popover_question_body">
     <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1 class="typewriter-target"></h1>
      </div>
	 <div class="popover_btnRiskyYes">
	  <button class="riskyYesBtn" type="button" popovertarget="Question21">
		<img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
	  </button>
	 </div>
	 <div class="popover_btnRiskyNo">
	  <button class="riskyNoBtn" type="button" popovertarget="Question21">
		<img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
	  </button>
	 </div>
	</div>
  `;

  document.body.appendChild(wrapper);

  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// GAMEOVER type handler
// ====================

function createGameoverContent(data) {
  if (window.GAME_MODE === "risky") {
    return createRGameoverContent(data);
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
	<div class="gameover_popover">
		<div class="popover_cat_body">
			<img src="img/layout/catNormal.png" width="100%" height="100%">
				<div class="gameover_popover_header">
					<h1>GAMEOVER</h1>
				</div>
				<div class="gameover_popover_score">
					<h2>Player [playername] has scored [points] points</h2>
				</div>
		</div>
		<div class="popover_question_body">
			<img src="img/layout/textNormal.png" width="100%" height="100%">
				<div class="gameover_popover_gameoverBtn">
					<button class="restartBtn" type="button">
						<img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
					</button>
				</div>
				<div class="gameover_popover_scoresBtn">
					<button class="scoresBtn" type="button">
						<img src="img/misc/score.png" width="100%" height="100%" loading="lazy">
					</button>
				</div>
				<div class="popover_btnDismiss">
					<button class="dismissBtn" type="button">
						<img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
					</button>
				</div>
		</div>
	</div>
  `;
  return wrapper;
}

// ====================
// GAMEOVER RISKY type handler
// ====================

function createRGameoverContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
	<div class="gameover_popover">
		<div class="popover_cat_body">
			<img src="img/layout/catRisky.png" width="100%" height="100%">
				<div class="gameover_popover_header">
					<h1>GAMEOVER</h1>
				</div>
				<div class="gameover_popover_score">
					<h2>Player [playername] has scored [points] points</h2>
				</div>
		</div>
		<div class="popover_question_body">
			<img src="img/layout/textRisky.png" width="100%" height="100%">
				<div class="gameover_popover_gameoverBtn">
					<button class="restartBtn" type="button">
						<img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
					</button>
				</div>
				<div class="gameover_popover_scoresBtn">
					<button class="scoresBtn" type="button">
						<img src="img/misc/score.png" width="100%" height="100%" loading="lazy">
					</button>
				</div>
				<div class="popover_btnDismiss">
					<button class="dismissBtn" type="button">
						<img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
					</button>
				</div>
		</div>
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
        console.log('Animation/SFX placeholder for screen question');
        imgEl.classList.add('show');
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

export {
  createEasyContent,
  createMultiContent,
  createBrutalContent,
  createQTEContent,
  createScreenContent,
  createJukeboxContent,    
  createAudioContent,          
  createCharacterContent,
  createHintContent,
  createMineContent,
  createSoloContent,
  createAudienceContent,
  createTeamContent,
  createTrustContent,
  createHostContent,
  createBranchContent,
  createDecisionContent,
  createRiskyContent,
  createGameoverContent
};