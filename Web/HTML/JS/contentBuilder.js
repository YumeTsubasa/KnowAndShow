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
  risky: createRiskyContent
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
    
    <div class="popover_btnSkip">
        <button class="skipBtn" type="button" popovertarget="${data.id}">
          <img src="img/misc/skip.png" width="100%" height="100%" loading="lazy">
        </button>
    </div>

    <div class="popover_screenshot">
      <img src="${data.img || ''}">
    </div>
  `;
  return wrapper;
}

function createJukeboxContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal_2.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/jukebox.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h2>${data.question || "Audio"}</h2>
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

      <div class="popover_audio_btn">
        <img src="img/misc/audio.png" width="100%" height="100%" loading="lazy">
        <audio src="${data.audio || ''}"></audio>
      </div>
    </div>
  `;
  return wrapper;
}

function createAudioContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal_2.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/audio.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h2>${data.question || "Audio"}</h2>
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

      <div class="popover_audio_btn">
        <img src="img/misc/audio.png" width="100%" height="100%" loading="lazy">
        <audio src="${data.audio || ''}"></audio>
      </div>
    </div>
  `;
  return wrapper;
}

// ====================
// 🔥 CHARACTER type handler (NEW)
// ====================
function createCharacterContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal_2.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/character.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h2>${data.question || ""}</h2>
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

    <div class="popover_character">
      <img src="${data.img || ''}">
    </div>
  `;
  return wrapper;
}

function createHintContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal_2.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/hint.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h2>${data.question || ""}</h2>
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
	  <div class="popover_hint1">
		<h2>${data.hint1 || ""}</h2>
	  </div>
	  <div class="popover_btnHint2">
		<button class="hint2Btn" type="button" popovertarget="${data.id}">
		 <img src="img/misc/hint.png" width="100%" height="100%" loading="lazy">
		</button>
	  </div>
	  <div class="popover_hint2">
		<h2>${data.hint2 || ""}</h2>
	  </div>
	  <div class="popover_btnHint3">
		<button class="hint3Btn" type="button" popovertarget="${data.id}">
		 <img src="img/misc/hint.png" width="100%" height="100%" loading="lazy">
		</button>
	  </div>
	  <div class="popover_hint3">
		<h2>${data.hint3 || ""}</h2>
	  </div>
    </div>


  `;
  return wrapper;
}

function createMineContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover", "minefieldPopover"); // Minefield popover
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal_2.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/mine.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h2>${data.question || ""}</h2>
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


  return wrapper;
}


function createSoloContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal_2.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/solo.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h2>${data.challengePart1 || ""}</h2>
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
  return wrapper;
}

function createAudienceContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal_2.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/audience.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h2>${data.question || ""}</h2>
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
  return wrapper;
}

function createTeamContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal_2.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/team.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h2>${data.question || ""}</h2>
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
  return wrapper;
}

function createTrustContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal_2.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/trust.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h2>${data.question || ""}</h2>
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
  return wrapper;
}

function createHostContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal_2.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/host.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h2>${data.question || ""}</h2>
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
		<h2>Box Challenge: ${data.Boxmeister || ""}</h2>
      </div>
	  <div class="popover_btnHost1">
		<button class="host1Btn" type="button" popovertarget="${data.id}">
		 <img src="img/misc/host.png" width="100%" height="100%" loading="lazy">
		</button>
	  </div>
	  <div class="popover_btnHost2">
		<button class="host2Btn" type="button" popovertarget="${data.id}">
		 <img src="img/misc/host.png" width="100%" height="100%" loading="lazy">
		</button>
	  </div>
    </div>
  `;
  return wrapper;
}

function createBranchContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal_2.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/branch.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1>${data.question || ""}</h1>
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
    </div>
  `;
  return wrapper;
}

function createDecisionContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal_2.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/decision.png" loading="lazy">
      </div>
    </div>

    <div class="popover_question_body">
      <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1>${data.question || ""}</h1>
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
    </div>
  `;
  return wrapper;
}

function createRiskyContent(data) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("popover");
  wrapper.id = data.id;

  wrapper.innerHTML = `
    <div class="popover_cat_body">
      <img src="img/layout/catNormal_2.png" width="100%" height="100%">
      <div class="popover_cat_img">
        <img src="img/categories/risky.png" loading="lazy">
      </div>
    </div>
	
	<div class="popover_question_body">
     <img src="img/layout/textNormal.png" width="100%" height="100%">
      <div class="popover_question_text">
        <h1>${data.question || ""}</h1>
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
  createBranchContent,
  createDecisionContent,
  createRiskyContent,
  createEasyContent,
  createMultiContent,
  createBrutalContent,
  createScreenContent,
  createJukeboxContent,
  createAudioContent,
  createCharacterContent,
  createHintContent,
  createSoloContent,
  createAudienceContent,
  createTeamContent,
  createTrustContent,
  createHostContent
};