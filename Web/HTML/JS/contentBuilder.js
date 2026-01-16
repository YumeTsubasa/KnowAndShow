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

// -----------------------------
// Question type → display images
// -----------------------------
const QUESTION_TYPE_IMAGES = {
  easy: "img/branches/easy.png",
  multi: "img/branches/multi.png",
  brutal: "img/branches/brutal.png",
  qte: "img/branches/qte.png",
  screen: "img/branches/screen.png",
  character: "img/branches/character.png",
  jukebox: "img/branches/jukebox.png",    
  audio: "img/branches/audio.png",          
  hint: "img/branches/hint.png",
  mine: "img/branches/mine.png",
  solo: "img/branches/solo.png",
  audience: "img/branches/audience.png",
  team: "img/branches/team.png",
  trust: "img/branches/trust.png",
  host: "img/branches/host.png",
  branch: "img/branches/branch.png",
  decision: "img/branches/decision.png",
  risky: "img/branches/risky.png",
};

const RISKY_QUESTION_TYPE_IMAGES = {
  easy: "img/branches/reasy.png",
  multi: "img/branches/rmulti.png",
  brutal: "img/branches/rbrutal.png",
  qte: "img/branches/rqte.png",
  screen: "img/branches/rscreen.png",
  character: "img/branches/rcharacter.png",
  jukebox: "img/branches/rjukebox.png",    
  audio: "img/branches/raudio.png",          
  hint: "img/branches/rhint.png",
  mine: "img/branches/rmine.png",
  solo: "img/branches/rsolo.png",
  audience: "img/branches/raudience.png",
  team: "img/branches/rteam.png",
  trust: "img/branches/rtrust.png",
  host: "img/branches/rhost.png",
  branch: "img/branches/rbranch.png",
  decision: "img/branches/rdecision.png",
  risky: "img/branches/rrisky.png",
};

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
	<audio id="qAudio" src="audio/main/easy_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/easy.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text_long">
        <h1>${data.question || "No question provided"}</h1>
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
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);

  // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.2; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
  
  // Force render
  wrapper.offsetHeight;

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
	<audio id="qAudio" src="audio/main/easy_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/easy.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text_long">
        <h1>${data.question || "No question provided"}</h1>
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
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);

  // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.2; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
  
  // Force render
  wrapper.offsetHeight;


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
	<audio id="qAudio" src="audio/main/multi_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/multi.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
      </div>
      <div class="popover_multi_answers">
      </div>
      <div class="popover_multi_btnAnswer">
        <button class="answerMultiBtn" type="button">
          <img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>   
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
	</div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;
document.body.appendChild(wrapper);

// --- Reference the audio element ---
const bg = wrapper.querySelector("#qAudio");
if (bg) {
  bg.volume = 0.5;
  bg.currentTime = 0;
  bg.play().catch(() => {});
}

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

// Force render
wrapper.offsetHeight;


return wrapper;
}

// ====================
// MULTI RISKY type handler
// ====================

function createRMultiContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;
  wrapper.dataset.type = "multi";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/multi_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/multi.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
      </div>
      <div class="popover_multi_answers">
      </div>
      <div class="popover_multi_btnAnswer">
        <button class="answerMultiBtn" type="button">
          <img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>   
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
	</div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;
    document.body.appendChild(wrapper);


	// --- Reference the audio element and set JS attributes ---
	const bg = wrapper.querySelector("#qAudio");
		if (bg) {
		bg.volume = 0.5; // works now
		bg.currentTime = 0;
		bg.play().catch(() => {}); // just in case
	}
	
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
	wrapper.classList.add("popover_brutal");
	wrapper.id = data.id;
	wrapper.dataset.type = "brutal";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/brutal_bgm.mp3" loop preload="auto"></audio>
	<audio id="introAudio" src="audio/main/brutal_intro.mp3" preload="auto"></audio>
	<div class="popover_cat_img_brutal">
		<img src="img/categories/brutal.png" loading="lazy">
	</div>
	<div class="brutal_fade">
	</div>
    <div class="popover_cat_body_brutal">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
    </div>
    <div class="popover_question_body_brutal">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text_long">
        <h1>${data.question || "No question provided"}</h1>
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
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>      
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

	document.body.appendChild(wrapper);  // must come first

	const bg = wrapper.querySelector("#qAudio");
	const intro = wrapper.querySelector("#introAudio");
	const fade = wrapper.querySelector('.brutal_fade');
	const cat = wrapper.querySelector(".popover_cat_img_brutal");
	const catbody = wrapper.querySelector(".popover_cat_body_brutal");
	const question = wrapper.querySelector(".popover_question_body_brutal");
	
	if (fade) {
	  setTimeout(() => fade.classList.add('fade-20'), 400);
	  setTimeout(() => { fade.classList.remove('fade-20'); fade.classList.add('fade-40'); }, 800);
	  setTimeout(() => { fade.classList.remove('fade-40'); fade.classList.add('fade-60'); }, 1200);
	  setTimeout(() => { fade.classList.remove('fade-60'); fade.classList.add('fade-80'); }, 1600);
	  setTimeout(() => { fade.classList.remove('fade-80'); fade.classList.add('fade-100'); }, 2000);
	  setTimeout(() => { fade.classList.remove('fade-100'); fade.classList.add('fade-80'); }, 5400);
	  setTimeout(() => { fade.classList.remove('fade-80'); fade.classList.add('fade-60'); }, 5800);
	  setTimeout(() => { fade.classList.remove('fade-60'); fade.classList.add('fade-40'); }, 6200);
	  setTimeout(() => { fade.classList.remove('fade-40'); fade.classList.add('fade-20'); }, 6600);
	  setTimeout(() => { fade.classList.remove('fade-20'); }, 7000);
	}
	
	if (cat) {
	  setTimeout(() => {
		cat.classList.add("show");
	  }, 2500);
	}
	
	if (question) {
	  setTimeout(() => {
		question.classList.add("show");
	  }, 2500);
	}
	
	if (catbody) {
	  setTimeout(() => {
		catbody.classList.add("show");
	  }, 2500);
	}
	  
	if (intro) {
	  intro.volume = 0.23;
	  intro.currentTime = 0;
	  intro.play().catch(() => {});

	  // Start main BGM after a fixed delay
	  if (bg) {
		setTimeout(() => {
		  bg.volume = 0.2;
		  bg.currentTime = 0;
		  bg.play().catch(() => {});
		}, 5000); // delay in ms — adjust to intro length
	  }
	}	
		
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
  wrapper.classList.add("popover_brutal");
  wrapper.id = data.id;
  wrapper.dataset.type = "brutal";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/brutal_bgm.mp3" loop preload="auto"></audio>
	<audio id="introAudio" src="audio/main/brutal_intro.mp3" preload="auto"></audio>
	<div class="popover_cat_img_brutal">
		<img src="img/categories/brutal.png" loading="lazy">
	</div>
	<div class="brutal_fade">
	</div>
    <div class="popover_cat_body_brutal">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
    </div>
    <div class="popover_question_body_brutal">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text_long">
        <h1>${data.question || "No question provided"}</h1>
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
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>      
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

	document.body.appendChild(wrapper);  // must come first

	const bg = wrapper.querySelector("#qAudio");
	const intro = wrapper.querySelector("#introAudio");
	const fade = wrapper.querySelector('.brutal_fade');
	const cat = wrapper.querySelector(".popover_cat_img_brutal");
	const catbody = wrapper.querySelector(".popover_cat_body_brutal");
	const question = wrapper.querySelector(".popover_question_body_brutal");
	
	if (fade) {
	  setTimeout(() => fade.classList.add('fade-20'), 400);
	  setTimeout(() => { fade.classList.remove('fade-20'); fade.classList.add('fade-40'); }, 800);
	  setTimeout(() => { fade.classList.remove('fade-40'); fade.classList.add('fade-60'); }, 1200);
	  setTimeout(() => { fade.classList.remove('fade-60'); fade.classList.add('fade-80'); }, 1600);
	  setTimeout(() => { fade.classList.remove('fade-80'); fade.classList.add('fade-100'); }, 2000);
	  setTimeout(() => { fade.classList.remove('fade-100'); fade.classList.add('fade-80'); }, 5400);
	  setTimeout(() => { fade.classList.remove('fade-80'); fade.classList.add('fade-60'); }, 5800);
	  setTimeout(() => { fade.classList.remove('fade-60'); fade.classList.add('fade-40'); }, 6200);
	  setTimeout(() => { fade.classList.remove('fade-40'); fade.classList.add('fade-20'); }, 6600);
	  setTimeout(() => { fade.classList.remove('fade-20'); }, 7000);
	}
	
	if (cat) {
	  setTimeout(() => {
		cat.classList.add("show");
	  }, 2500);
	}
	
	if (question) {
	  setTimeout(() => {
		question.classList.add("show");
	  }, 2500);
	}
	
	if (catbody) {
	  setTimeout(() => {
		catbody.classList.add("show");
	  }, 2500);
	}
	  
	if (intro) {
	  intro.volume = 0.23;
	  intro.currentTime = 0;
	  intro.play().catch(() => {});

	  // Start main BGM after a fixed delay
	  if (bg) {
		setTimeout(() => {
		  bg.volume = 0.2;
		  bg.currentTime = 0;
		  bg.play().catch(() => {});
		}, 5000); // delay in ms — adjust to intro length
	  }
	}	
		
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
  wrapper.dataset.type = "qte";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/qte_bgm.mp3" loop preload="auto"></audio>
	<audio id="introAudio" src="audio/main/qte_intro.mp3" preload="auto"></audio>
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
	  </div>
	  
    </div>
	<div class="popover_question_body">
		<img src="img/layout/textNormal.png" width="100%" height="100%">
			<div class="popover_question_text_short">
				<h1>${data.question || "No question provided"}</h1>
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
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
	<div class="popover_flawless">
      <img src="img/misc/flawless.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);


	const bg = wrapper.querySelector("#qAudio");
	const intro = wrapper.querySelector("#introAudio");

	if (intro) {
	  intro.volume = 0.3;
	  intro.currentTime = 0;
	  intro.play().catch(() => {});

	  // Start main BGM after a fixed delay
	  if (bg) {
		setTimeout(() => {
		  bg.volume = 0.2;
		  bg.currentTime = 0;
		  bg.play().catch(() => {});
		}, 2500); // delay in ms — adjust to intro length
	  }
	}
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
  wrapper.dataset.type = "qte";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/qte_bgm.mp3" loop preload="auto"></audio>
	<audio id="introAudio" src="audio/main/qte_intro.mp3" preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/qte.png" loading="lazy">
      </div>
      <div class="popover_resultQTE">
	    <img src="img/layout/catRisky.png" width="100%" height="100%">
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
	  </div>
	  
    </div>
	<div class="popover_question_body">
		<img src="img/layout/textRisky.png" width="100%" height="100%">
			<div class="popover_question_text_short">
				<h1>${data.question || "No question provided"}</h1>
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
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
	<div class="popover_flawless">
      <img src="img/misc/flawless.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);


	const bg = wrapper.querySelector("#qAudio");
	const intro = wrapper.querySelector("#introAudio");

	if (intro) {
	  intro.volume = 0.3;
	  intro.currentTime = 0;
	  intro.play().catch(() => {});

	  // Start main BGM after a fixed delay
	  if (bg) {
		setTimeout(() => {
		  bg.volume = 0.2;
		  bg.currentTime = 0;
		  bg.play().catch(() => {});
		}, 2500); // delay in ms — adjust to intro length
	  }
	}
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
	<audio id="qAudio" src="audio/main/screen_bgm.mp3" loop preload="auto"></audio>
	<audio id="introAudio" src="audio/main/screen_sfx.wav" preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/screen.png" loading="lazy">
      </div>
	  <div class="popover_screenshot">
		<img src="${data.img || ''}">
	  </div>
	  <div class="popover_screenshot_flash">
	  </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text_long">
        <h1>${data.question || "No question provided"}</h1>
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
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      </div>
	    <div class="popover_btnSkip">
			<button class="skipBtn" type="button" popovertarget="${data.id}">
			  <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
			</button>
		</div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);

	const bg = wrapper.querySelector("#qAudio");
	const intro = wrapper.querySelector("#introAudio");

	if (bg) {
	  bg.volume = 0.25;
	  bg.currentTime = 0;
	  bg.play().catch(() => {});

	  // Start main BGM after a fixed delay
	  if (intro) {
		setTimeout(() => {
		  intro.volume = 0.4;
		  intro.currentTime = 0;
		  intro.play().catch(() => {});
		}, 2550); // delay in ms — adjust to intro length
	  }
	}
	
	const flash = wrapper.querySelector('.popover_screenshot_flash');
	if (!flash) return;

	if (flash) {

	  setTimeout(() => flash.classList.add('flash-80'), 0);
	  setTimeout(() => {flash.classList.remove('flash-80'); }, 2650);
	  
	}
	
	const screenshot = wrapper.querySelector('.popover_screenshot');
	if (!screenshot) return;

	setTimeout(() => screenshot.classList.add('show'), 2650);

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
	<audio id="qAudio" src="audio/main/screen_bgm.mp3" loop preload="auto"></audio>
	<audio id="introAudio" src="audio/main/screen_sfx.wav" preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/screen.png" loading="lazy">
      </div>
	  <div class="popover_screenshot">
		<img src="${data.img || ''}">
	  </div>
	  <div class="popover_screenshot_flash">
	  </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text_long">
        <h1>${data.question || "No question provided"}</h1>
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
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      </div>
	    <div class="popover_btnSkip">
			<button class="skipBtn" type="button" popovertarget="${data.id}">
			  <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
			</button>
		</div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);

	const bg = wrapper.querySelector("#qAudio");
	const intro = wrapper.querySelector("#introAudio");

	if (bg) {
	  bg.volume = 0.25;
	  bg.currentTime = 0;
	  bg.play().catch(() => {});

	  // Start main BGM after a fixed delay
	  if (intro) {
		setTimeout(() => {
		  intro.volume = 0.4;
		  intro.currentTime = 0;
		  intro.play().catch(() => {});
		}, 2550); // delay in ms — adjust to intro length
	  }
	}
	
	const flash = wrapper.querySelector('.popover_screenshot_flash');
	if (!flash) return;

	if (flash) {

	  setTimeout(() => flash.classList.add('flash-20'), 2150);
	  setTimeout(() => {
		flash.classList.remove('flash-20');
		flash.classList.add('flash-40');
	  }, 2300);
	  setTimeout(() => {
		flash.classList.remove('flash-40');
		flash.classList.add('flash-60');
	  }, 2450);
	  setTimeout(() => {
		flash.classList.remove('flash-60');
		flash.classList.add('flash-80');
	  }, 2600);
	  setTimeout(() => {
		flash.classList.remove('flash-80');
		flash.classList.add('flash-60');
	  }, 2900);
	  setTimeout(() => {
		flash.classList.remove('flash-60');
		flash.classList.add('flash-40');
	  }, 3200);
	  setTimeout(() => {
		flash.classList.remove('flash-40');
		flash.classList.add('flash-20');
	  }, 3500);
	  setTimeout(() => {
		flash.classList.remove('flash-20');
	  }, 3800);
	  
	}
	
	const screenshot = wrapper.querySelector('.popover_screenshot');
	if (!screenshot) return;

	setTimeout(() => screenshot.classList.add('show'), 2650);

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
  wrapper.dataset.type = "character";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/character_bgm.mp3" loop preload="auto"></audio>
	<audio id="introAudio" src="audio/main/character_intro.mp3" preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/character.png" loading="lazy">
      </div>
	  <div class="popover_character">
		<img src="${data.img || ''}">
	  </div>
	  <div class="popover_character_reveal">
		<img src="${data.img_reveal || ''}">
	  </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text_long">
        <h1>${data.question || "No question provided"}</h1>
      </div>
      <div class="popover_btnAnswer">
        <button class="answerCharacterBtn" type="button">
          <img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>	  
	  <div class="popover_answer">
        <h2>Correct answer: ${data.answer || "No answer provided"}</h2>
      </div>
      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);

	const bg = wrapper.querySelector("#qAudio");
	const intro = wrapper.querySelector("#introAudio");

	if (intro) {
	  intro.volume = 0.3;
	  intro.currentTime = 0;
	  intro.play().catch(() => {});

	  // Start main BGM after a fixed delay
	  if (bg) {
		setTimeout(() => {
		  bg.volume = 0.25;
		  bg.currentTime = 0;
		  bg.play().catch(() => {});
		}, 5000); // delay in ms — adjust to intro length
	  }
	}
	
	const character = wrapper.querySelector('.popover_character');
	if (!character) return;

	setTimeout(() => character.classList.add('show'), 1130);
	
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
  wrapper.dataset.type = "character";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/character_bgm.mp3" loop preload="auto"></audio>
	<audio id="introAudio" src="audio/main/character_intro.mp3" preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/character.png" loading="lazy">
      </div>
	  <div class="popover_character">
		<img src="${data.img || ''}">
	  </div>
	  <div class="popover_character_reveal">
		<img src="${data.img_reveal || ''}">
	  </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text_long">
        <h1>${data.question || "No question provided"}</h1>
      </div>
      <div class="popover_btnAnswer">
        <button class="answerCharacterBtn" type="button">
          <img src="img/questions/act.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>	  
	  <div class="popover_answer">
        <h2>Correct answer: ${data.answer || "No answer provided"}</h2>
      </div>
      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);

	const bg = wrapper.querySelector("#qAudio");
	const intro = wrapper.querySelector("#introAudio");

	if (intro) {
	  intro.volume = 0.3;
	  intro.currentTime = 0;
	  intro.play().catch(() => {});

	  // Start main BGM after a fixed delay
	  if (bg) {
		setTimeout(() => {
		  bg.volume = 0.2;
		  bg.currentTime = 0;
		  bg.play().catch(() => {});
		}, 5000); // delay in ms — adjust to intro length
	  }
	}
	
	const character = wrapper.querySelector('.popover_character');
	if (!character) return;

	setTimeout(() => character.classList.add('show'), 1130);
	
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
  wrapper.dataset.type = "jukebox";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/jukebox_intro.mp3" preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/jukebox.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text_long">
        <h1>${data.question || "No question provided"}</h1>
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
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
      <div class="popover_audio_btn">
		<button class="audioBtn" type="button" popovertarget="${data.id}">
            <img src="img/misc/audio.png" width="100%" height="100%" loading="lazy">
			<audio src="${data.audio || ''}"></audio>
        </button>
	  </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);
 // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.2; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
  
  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);

  return wrapper;
}

// ====================
// JUKEBOX RISKY type handler
// ====================

function createRJukeboxContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;
  wrapper.dataset.type = "jukebox";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/jukebox_intro.mp3" preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/jukebox.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text_long">
        <h1>${data.question || "No question provided"}</h1>
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
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
      <div class="popover_audio_btn">
		<button class="audioBtn" type="button" popovertarget="${data.id}">
            <img src="img/misc/audio.png" width="100%" height="100%" loading="lazy">
			<audio src="${data.audio || ''}"></audio>
        </button>
	  </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);
 // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.2; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
  
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
  wrapper.dataset.type = "audio";

  wrapper.innerHTML = `
  <audio id="qAudio" src="audio/main/audio_intro.mp3" preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/audio.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text_long">
        <h1>${data.question || "No question provided"}</h1>
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
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
      <div class="popover_audio_btn">
		<button class="audioBtn" type="button" popovertarget="${data.id}">
            <img src="img/misc/audio.png" width="100%" height="100%" loading="lazy">
			<audio src="${data.audio || ''}"></audio>
        </button>
	  </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);
  
   // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.2; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }

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
  wrapper.dataset.type = "audio";

  wrapper.innerHTML = `
  <audio id="qAudio" src="audio/main/audio_intro.mp3" preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/audio.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text_long">
        <h1>${data.question || "No question provided"}</h1>
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
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
      <div class="popover_audio_btn">
		<button class="audioBtn" type="button" popovertarget="${data.id}">
            <img src="img/misc/audio.png" width="100%" height="100%" loading="lazy">
			<audio src="${data.audio || ''}"></audio>
        </button>
	  </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);
  
   // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.2; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }

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
	<audio id="qAudio" src="audio/main/hint_bgm.mp3" loop preload="auto"></audio>
	<audio id="introAudio" src="audio/main/hint_intro.mp3" preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/hint.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
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
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
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
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);

const intro = wrapper.querySelector("#introAudio");
const hint1Btn = wrapper.querySelector('.hint1Btn'); // or #hint1Btn if you have an ID

if (intro) {
  intro.volume = 0.25;
  intro.currentTime = 0;
  intro.play().catch(() => {});
}

if (hint1Btn) {
  hint1Btn.addEventListener('click', () => {
    // --- Stop intro music immediately ---
    const intro = wrapper.querySelector('#introAudio');
    if (intro && !intro.paused) {
      intro.pause();
      intro.currentTime = 0;
    }

    // --- Start main hint music ---
    const bg = wrapper.querySelector('#qAudio');
    if (bg) {
      bg.currentTime = 0;
      bg.volume = 0.25;
      bg.play().catch(() => {});
    }

    // 🔽 existing hint logic continues below
  });
}


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
	<audio id="qAudio" src="audio/main/hint_bgm.mp3" loop preload="auto"></audio>
	<audio id="introAudio" src="audio/main/hint_intro.mp3" preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/hint.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
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
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
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
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);

const intro = wrapper.querySelector("#introAudio");
const hint1Btn = wrapper.querySelector('.hint1Btn'); // or #hint1Btn if you have an ID

if (intro) {
  intro.volume = 0.3;
  intro.currentTime = 0;
  intro.play().catch(() => {});
}

if (hint1Btn) {
  hint1Btn.addEventListener('click', () => {
    // --- Stop intro music immediately ---
    const intro = wrapper.querySelector('#introAudio');
    if (intro && !intro.paused) {
      intro.pause();
      intro.currentTime = 0;
    }

    // --- Start main hint music ---
    const bg = wrapper.querySelector('#qAudio');
    if (bg) {
      bg.currentTime = 0;
      bg.volume = 0.25;
      bg.play().catch(() => {});
    }

    // 🔽 existing hint logic continues below
  });
}


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
	<audio id="qAudio" src="audio/main/mine_bgm.mp3" loop preload="auto"></audio>
	<audio id="introAudio" src="audio/main/mine_intro.mp3" preload="auto"></audio>
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
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
      </div>
      <div class="popover_mine"></div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
	  <div class="popover_btnMineProceed">
        <button class="proceedMineBtn" type="button" popovertarget="${data.id}">
        </button>
      </div>
	  <div class="popover_btnMineProceed2">
        <button class="proceedMine2Btn" type="button" popovertarget="${data.id}">
        </button>
      </div>
	  <div class="popover_btnClose">
        <button class="closeBtnMine" type="button" popovertarget="${data.id}">
        </button>
      </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
	<div class="popover_flawless">
      <img src="img/misc/flawless.png" loading="lazy">
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

	const bg = wrapper.querySelector("#qAudio");
	const intro = wrapper.querySelector("#introAudio");

	if (intro) {
	  intro.volume = 0.3;
	  intro.currentTime = 0;
	  intro.play().catch(() => {});

	  // Start main BGM after a fixed delay
	  if (bg) {
		setTimeout(() => {
		  bg.volume = 0.35;
		  bg.currentTime = 0;
		  bg.play().catch(() => {});
		}, 1700); // delay in ms — adjust to intro length
	  }
	}

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
  wrapper.dataset.type = "mine";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/mine_bgm.mp3" loop preload="auto"></audio>
	<audio id="introAudio" src="audio/main/mine_intro.mp3" preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/mine.png" loading="lazy">
      </div>
	  <div class="popover_resultMine">
	    <img src="img/layout/catRisky.png" width="100%" height="100%">
			<div class="popover_resultTextMine">
				<h2 class="mine-result-title"></h2>
				<p class="mine-result-text"></p>
			</div>
	  </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
      </div>
      <div class="popover_mine"></div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
	  <div class="popover_btnMineProceed">
        <button class="proceedMineBtn" type="button" popovertarget="${data.id}">
        </button>
      </div>
	  <div class="popover_btnMineProceed2">
        <button class="proceedMine2Btn" type="button" popovertarget="${data.id}">
        </button>
      </div>
	  <div class="popover_btnClose">
        <button class="closeBtnMine" type="button" popovertarget="${data.id}">
        </button>
      </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
	<div class="popover_flawless">
      <img src="img/misc/flawless.png" loading="lazy">
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

	const bg = wrapper.querySelector("#qAudio");
	const intro = wrapper.querySelector("#introAudio");

	if (intro) {
	  intro.volume = 0.3;
	  intro.currentTime = 0;
	  intro.play().catch(() => {});

	  // Start main BGM after a fixed delay
	  if (bg) {
		setTimeout(() => {
		  bg.volume = 0.3;
		  bg.currentTime = 0;
		  bg.play().catch(() => {});
		}, 1700); // delay in ms — adjust to intro length
	  }
	}

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
  wrapper.dataset.type = "solo";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/solo_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/solo.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.challengePart1 || "No question provided"}</h1>
      </div>
	  <div class="popover_question_text_short2">
		<h2>${data.challengePart2 || ""}</h2>
	  </div>
	  <div class="popover_btnShort2">
        <button class="shortBtn" type="button" popovertarget="${data.id}">
        </button>
      </div>
      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);


 // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.2; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
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
  wrapper.dataset.type = "solo";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/solo_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
		<img src="img/categories/solo.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.challengePart1 || "No question provided"}</h1>
      </div>
	  <div class="popover_question_text_short2">
		<h2>${data.challengePart2 || ""}</h2>
	  </div>
	  <div class="popover_btnShort2">
        <button class="shortBtn" type="button" popovertarget="${data.id}">
        </button>
      </div>
      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);


 // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.2; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
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
  wrapper.dataset.type = "audience";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/audience_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/audience.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
      </div>
	  <div class="popover_question_text_short2">
		<h2>${data.challenge || ""}</h2>
	  </div>
	  <div class="popover_btnShort2">
        <button class="shortBtn" type="button" popovertarget="${data.id}">
        </button>
      </div>
      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);


 // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.2; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
  // Force render
  wrapper.offsetHeight;

	// Apply typewriter to the main question
	const h1 = wrapper.querySelector(".typewriter-target");
	typeWriter(h1, data.question || "No question found", speed);

	// Apply typewriter to the challenge text
	const h2 = wrapper.querySelector(".popover_question_text_short2 h2");
	if (h2) {
	  typeWriter(h2, data.challenge || "", speed);
	}

  return wrapper;
}

// ====================
// AUDIENCE RISKY type handler
// ====================

function createRAudienceContent(data, speed = 30) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;
  wrapper.dataset.type = "audience";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/audience_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
	    <img src="img/categories/audience.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
      </div>
	  <div class="popover_question_text_short2">
		<h2>${data.challenge || ""}</h2>
	  </div>
	  <div class="popover_btnShort2">
        <button class="shortBtn" type="button" popovertarget="${data.id}">
        </button>
      </div>
      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);


 // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.2; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
  // Force render
  wrapper.offsetHeight;

	// Apply typewriter to the main question
	const h1 = wrapper.querySelector(".typewriter-target");
	typeWriter(h1, data.question || "No question found", speed);

	// Apply typewriter to the challenge text
	const h2 = wrapper.querySelector(".popover_question_text_short2 h2");
	if (h2) {
	  typeWriter(h2, data.challenge || "", speed);
	}

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
  wrapper.dataset.type = "team";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/team_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/team.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
      </div>
	  <div class="popover_question_text_short2">
		<h2>${data.challenge || ""}</h2>
	  </div>
	  <div class="popover_btnShort2">
        <button class="shortBtn" type="button" popovertarget="${data.id}">
        </button>
      </div>
      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);


 // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.15; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
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
  wrapper.dataset.type = "team";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/team_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/team.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
      </div>
	  <div class="popover_question_text_short2">
		<h2>${data.challenge || ""}</h2>
	  </div>
	  <div class="popover_btnShort2">
        <button class="shortBtn" type="button" popovertarget="${data.id}">
        </button>
      </div>
      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);


 // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.15; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
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
  wrapper.dataset.type = "trust";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/trust_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/trust.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
      </div>
	  <div class="popover_question_text_short2">
		<h2>${data.challenge || ""}</h2>
	  </div>
      <div class="popover_btnShort2">
        <button class="shortBtn" type="button" popovertarget="${data.id}">
        </button>
      </div>
	  <div class="popover_btnShort2">
        <button class="shortBtn" type="button" popovertarget="${data.id}">
        </button>
      </div>
      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);
  
   // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.3; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }

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
  wrapper.dataset.type = "trust";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/trust_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/trust.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
      </div>
	  <div class="popover_question_text_short2">
		<h2>${data.challenge || ""}</h2>
	  </div>
      <div class="popover_btnShort2">
        <button class="shortBtn" type="button" popovertarget="${data.id}">
        </button>
      </div>
	  <div class="popover_btnShort2">
        <button class="shortBtn" type="button" popovertarget="${data.id}">
        </button>
      </div>
      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
      </div>
    </div>
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);
  
   // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.3; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }

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
	<audio id="qAudio" src="audio/main/host_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/host.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
      </div>
      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
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
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);

 // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.15; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
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
	<audio id="qAudio" src="audio/main/host_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/host.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
      </div>
      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
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
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);

 // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.15; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
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
	<audio id="qAudio" src="audio/main/branch_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/branch.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
      </div>
	  <div class="popover_btnBranchA">
		<button class="branchABtn" type="button" popovertarget="${data.id}">
			<img class="branchImg" src="">
		</button>
	  </div>
	  <div class="popover_btnBranchB">
		<button class="branchBBtn" type="button" popovertarget="${data.id}">
			<img class="branchImg" src="">
		</button>
	  </div>
	  <div class="popover_btnBranchC">
		<button class="branchCBtn" type="button" popovertarget="${data.id}">
			<img class="branchImg" src="">
		</button>
	  </div>
	  <div class="popover_btnBranchD">
		<button class="branchDBtn" type="button" popovertarget="${data.id}">
			<img class="branchImg" src="">
		</button>
	  </div>
	  <div class="popover_btnBranchE">
		<button class="branchEBtn" type="button" popovertarget="${data.id}">
			<img class="branchImg" src="">
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

 // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.15; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
  
  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);
  
	
// -----------------------------
// Inject branch-specific visuals
// -----------------------------
const branchMap = [
  { key: "branchA", selector: ".branchABtn" },
  { key: "branchB", selector: ".branchBBtn" },
  { key: "branchC", selector: ".branchCBtn" },
  { key: "branchD", selector: ".branchDBtn" },
  { key: "branchE", selector: ".branchEBtn" }
];

branchMap.forEach(({ key, selector }) => {
  const branchData = data[key];
  if (!branchData) return;

  const btn = wrapper.querySelector(selector);
  if (!btn) return;

  // Image
  const imgEl = btn.querySelector(".branchImg");
  if (imgEl) {
    imgEl.src =
      QUESTION_TYPE_IMAGES[branchData.type] ||
      QUESTION_TYPE_IMAGES.default;
    imgEl.alt = branchData.type;
  }
});



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
	<audio id="qAudio" src="audio/main/branch_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/branch.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
      </div>
	  <div class="popover_btnBranchA">
		<button class="branchABtn" type="button" popovertarget="${data.id}">
			<img class="branchImg" src="">
		</button>
	  </div>
	  <div class="popover_btnBranchB">
		<button class="branchBBtn" type="button" popovertarget="${data.id}">
			<img class="branchImg" src="">
		</button>
	  </div>
	  <div class="popover_btnBranchC">
		<button class="branchCBtn" type="button" popovertarget="${data.id}">
			<img class="branchImg" src="">
		</button>
	  </div>
	  <div class="popover_btnBranchD">
		<button class="branchDBtn" type="button" popovertarget="${data.id}">
			<img class="branchImg" src="">
		</button>
	  </div>
	  <div class="popover_btnBranchE">
		<button class="branchEBtn" type="button" popovertarget="${data.id}">
			<img class="branchImg" src="">
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

 // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.15; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
  
  // Force render
  wrapper.offsetHeight;

  // Apply typewriter
  const h1 = wrapper.querySelector(".typewriter-target");
  typeWriter(h1, data.question || "No question found", speed);
  
	
// -----------------------------
// Inject branch-specific visuals
// -----------------------------
const branchMap = [
  { key: "branchA", selector: ".branchABtn" },
  { key: "branchB", selector: ".branchBBtn" },
  { key: "branchC", selector: ".branchCBtn" },
  { key: "branchD", selector: ".branchDBtn" },
  { key: "branchE", selector: ".branchEBtn" }
];

branchMap.forEach(({ key, selector }) => {
  const branchData = data[key];
  if (!branchData) return;

  const btn = wrapper.querySelector(selector);
  if (!btn) return;

  // Image
  const imgEl = btn.querySelector(".branchImg");
  if (imgEl) {
    imgEl.src =
      RISKY_QUESTION_TYPE_IMAGES[branchData.type] ||
      RISKY_QUESTION_TYPE_IMAGES.default;
    imgEl.alt = branchData.type;
  }
});



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
	<audio id="qAudio" src="audio/main/decision_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/decision.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
      </div>
      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
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
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);

 // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.25; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
  
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
	<audio id="qAudio" src="audio/main/decision_bgm.mp3" loop preload="auto"></audio>
    <div class="popover_cat_body">
      <img src="img/layout/catRisky.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/decision.png" loading="lazy">
      </div>
    </div>
    <div class="popover_question_body">
      <img src="img/layout/textRisky.png" width="100%" height="100%">
      <div class="popover_question_text_short">
        <h1>${data.question || "No question provided"}</h1>
      </div>
      <div class="popover_btnRight">
        <button class="rightBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/mercy.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/success.mp3" preload="auto"></audio>
        </button>
      </div>
      <div class="popover_btnWrong">
        <button class="wrongBtn" type="button" popovertarget="${data.id}">
          <img src="img/questions/fight.png" width="100%" height="100%" loading="lazy">
		  <audio src="audio/main/failure.mp3" preload="auto"></audio>
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
	<div class="popover_success">
      <img src="img/misc/success.png" loading="lazy">
    </div>
	<div class="popover_failure">
      <img src="img/misc/failure.png" loading="lazy">
    </div>
  `;

  document.body.appendChild(wrapper);

 // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.25; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
  
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
  wrapper.dataset.type = "riskyStrats";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/risky_bgm.mp3" loop preload="auto"></audio>
	<div class="risky_fade">
	</div>
    <div class="popover_cat_body">
      <img src="img/layout/catNormal.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/risky.png" loading="lazy">
      </div>
    </div>
	
	<div class="popover_question_body">
     <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text_long">
        <h1>${data.question || "No question provided"}</h1>
      </div>
	 <div class="popover_btnRiskyYes">
	  <button class="riskyYesBtn" type="button" popovertarget="Question21">
		<audio id="rAccept" src="audio/main/risky_accept.mp3" preload="auto"></audio>
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

	const bg = wrapper.querySelector("#qAudio");
	  
	if (bg) {
		bg.volume = 0.33; // works now
		bg.currentTime = 0;
		bg.play().catch(() => {}); // just in case
	}
	
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
  wrapper.dataset.type = "gameover";

  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/game_over.mp3" preload="auto"></audio>
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
		<div class="popover_question_body_gameover">
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
    document.body.appendChild(wrapper);
	
  // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.2; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
	
  return wrapper;
}


// ====================
// GAMEOVER RISKY type handler
// ====================

function createRGameoverContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;
  wrapper.dataset.type = "gameover";
  
  wrapper.innerHTML = `
	<audio id="qAudio" src="audio/main/game_over.mp3" preload="auto"></audio>
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
		<div class="popover_question_body_gameover">
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
    document.body.appendChild(wrapper);
	
  // --- Reference the audio element and set JS attributes ---
  const bg = wrapper.querySelector("#qAudio");
  if (bg) {
    bg.volume = 0.2; // works now
    bg.currentTime = 0;
    bg.play().catch(() => {}); // just in case
  }
	
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
  createGameoverContent,
};