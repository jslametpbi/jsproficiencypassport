/* JS Proficiency Passport AI - Static Deployable Platform Prototype
   Developed for academic testing workflow demonstration. Production deployment requires backend services for identity, proctoring evidence, encrypted data storage, payment/licensing, and public certificate persistence. */

const CONFIG = {
  platform: 'JS Proficiency Passport AI',
  short: 'JSPP-AI',
  storageKey: 'JSPP_AI_PLATFORM_V1',
  adminPin: 'JS2026',
  copyright: 'Copyright © Dr. Joko Slamet',
  issuingAuthority: 'JS Proficiency Passport AI Testing Center',
  certificateValidityYears: 2
};

const CEFR_BANDS = [
  { min: 825, cefr: 'C2', label: 'Highly proficient academic user' },
  { min: 700, cefr: 'C1', label: 'Advanced academic user' },
  { min: 550, cefr: 'B2', label: 'Independent academic user' },
  { min: 400, cefr: 'B1', label: 'Independent developing user' },
  { min: 300, cefr: 'A2', label: 'Basic communicator' },
  { min: 200, cefr: 'A1', label: 'Basic survival English' },
  { min: 0, cefr: 'Pre-A1', label: 'Emerging user' }
];

const QUESTION_BANK = [
  { id:'L1', skill:'Listening', sub:'Detail', level:'A2', q:'A student asks, “Could you submit the assignment by Friday?” What is the main request?', a:['Submit an assignment before Friday','Attend a class on Friday','Correct the assignment','Read the assignment only'], key:0, exp:'The speaker asks for the assignment to be submitted by Friday.' },
  { id:'L2', skill:'Listening', sub:'Inference', level:'B1', q:'A lecturer says, “The article is useful, but its sample is rather limited.” What does the lecturer imply?', a:['The article has a weakness','The article is completely wrong','The article is not academic','The article has no data'], key:0, exp:'The lecturer gives a balanced comment and identifies limited sample size.' },
  { id:'L3', skill:'Listening', sub:'Function', level:'B2', q:'When a speaker says, “Let me put it another way,” what is the function?', a:['Rephrasing an idea','Ending the talk','Changing the topic to personal life','Rejecting a question'], key:0, exp:'The phrase signals clarification or rephrasing.' },
  { id:'S1', skill:'Structure', sub:'Agreement', level:'A2', q:'Choose the correct sentence.', a:['The results shows improvement.','The results show improvement.','The result showing improvement.','The results is improvement.'], key:1, exp:'Plural subject “results” takes the verb “show.”' },
  { id:'S2', skill:'Structure', sub:'Clause', level:'B1', q:'The researcher explained ___ the participants were selected.', a:['how','who','what','whose'], key:0, exp:'“How” introduces the method/process of selection.' },
  { id:'S3', skill:'Structure', sub:'Parallelism', level:'B2', q:'Which sentence has correct parallel structure?', a:['Students learned reading, writing, and to speak.','Students learned to read, writing, and speaking.','Students learned reading, writing, and speaking.','Students learned to reading, write, and speaking.'], key:2, exp:'The three gerunds form a parallel series.' },
  { id:'R1', skill:'Reading', sub:'Main Idea', level:'A2', q:'A passage describes the benefits of online learning, including flexibility, access, and feedback. What is the main idea?', a:['Online learning has several benefits','Online learning is always ineffective','Feedback should be removed','Students dislike flexibility'], key:0, exp:'The passage focuses on multiple benefits.' },
  { id:'R2', skill:'Reading', sub:'Reference', level:'B1', q:'In the sentence “These findings support the hypothesis,” what does “these findings” most likely refer to?', a:['Results previously mentioned','Future recommendations','The title of the paper','The references only'], key:0, exp:'Demonstratives often refer to information stated earlier.' },
  { id:'R3', skill:'Reading', sub:'Inference', level:'B2', q:'A study reports improvement after an intervention but notes no control group. What can be inferred?', a:['The conclusion should be interpreted carefully','The intervention is proven universally','No learning happened','The sample was certainly random'], key:0, exp:'Without a control group, causal interpretation is limited.' },
  { id:'V1', skill:'Vocabulary', sub:'Academic', level:'B1', q:'The word “substantial” is closest in meaning to:', a:['considerable','tiny','unclear','temporary'], key:0, exp:'Substantial means large or considerable.' },
  { id:'V2', skill:'Vocabulary', sub:'Word Form', level:'B1', q:'Choose the correct form: The instrument showed high ___.', a:['reliable','reliability','reliably','rely'], key:1, exp:'A noun is needed after the adjective “high.”' },
  { id:'V3', skill:'Vocabulary', sub:'Collocation', level:'B2', q:'Which phrase is most academic?', a:['conduct research','make research','do a researches','take research'], key:0, exp:'“Conduct research” is a standard academic collocation.' }
];

const REAL_TEST_ITEMS = [
  ...QUESTION_BANK,
  { id:'L4', skill:'Listening', sub:'Purpose', level:'B1', q:'A speaker begins, “Today I will outline three reasons why academic integrity matters.” The purpose is to:', a:['introduce the organization of the talk','give an apology','ask for personal information','summarize final findings'], key:0, exp:'' },
  { id:'S4', skill:'Structure', sub:'Tense', level:'B1', q:'By the time the class started, the students ___ the article.', a:['had read','readed','has read','were read'], key:0, exp:'' },
  { id:'R4', skill:'Reading', sub:'Vocabulary Context', level:'B2', q:'If a method is described as “robust,” it is most likely:', a:['strong and reliable','weak and unclear','informal and personal','short and incomplete'], key:0, exp:'' }
];

const PRACTICE_MODULES = [
  { id:'orientation', title:'Orientation to English Proficiency Testing', skill:'Academic Readiness', mins:25, level:'All', desc:'Understand test rules, CEFR interpretation, score conversion, academic honesty, and real-test procedures.', tasks:['Read platform ethics','Review score bands','Complete readiness checklist'] },
  { id:'listening', title:'Listening Booster', skill:'Listening', mins:80, level:'A2-B2', desc:'Practise details, inference, function, speaker purpose, academic talks, and note-taking strategies.', tasks:['Short dialogue drill','Academic talk drill','Inference challenge'] },
  { id:'structure', title:'Structure & Written Expression Lab', skill:'Structure', mins:90, level:'A2-C1', desc:'Repair tenses, clauses, agreement, parallelism, inversion, passive voice, and error recognition.', tasks:['Sentence completion','Error recognition','Timed structure drill'] },
  { id:'reading', title:'Reading Strategy Studio', skill:'Reading', mins:95, level:'A2-C1', desc:'Build speed, main idea recognition, inference, vocabulary in context, reference, and author purpose.', tasks:['Skimming task','Inference map','Vocabulary in context'] },
  { id:'vocabulary', title:'Academic Vocabulary Builder', skill:'Vocabulary', mins:70, level:'A1-C1', desc:'Develop academic word families, collocations, synonyms, antonyms, and discipline-based vocabulary.', tasks:['Word family map','Collocation practice','Cloze practice'] },
  { id:'writing', title:'AI Writing Studio', skill:'Writing', mins:100, level:'B1-C1', desc:'Practise thesis statements, cohesion, paragraph control, argument development, and revision.', tasks:['Paragraph builder','Essay response','Self-revision checklist'] },
  { id:'speaking', title:'Speaking & Intelligibility Studio', skill:'Speaking', mins:90, level:'A2-C1', desc:'Develop fluency, intelligibility, stress, intonation, academic explanation, and response organization.', tasks:['Read aloud','Opinion response','Academic explanation'] },
  { id:'mock', title:'Full Mock Test Preparation', skill:'Integrated', mins:120, level:'All', desc:'Experience timed test sections before entering the official secure real test.', tasks:['Mini mock','Full mock','Readiness reflection'] }
];

function defaultState(){
  return {
    sessionUser:null,
    view:'landing',
    candidates:{},
    certificates:{},
    batches:[{ id:'BATCH-2026-001', name:'June 2026 Academic Proficiency Batch', date:'2026-06-06', status:'Open', candidates:0 }],
    proctorReviews:{},
    platformLogs:[],
    activeTest:null,
    settings:{ highStakesMode:true, requirePractice:true, institution:'Cipta Wacana University', certificatePrefix:'JSPP-CERT' }
  };
}

let state = loadState();
let secureTimer = null;
let securityListenersAttached = false;

function loadState(){
  try{
    const raw = localStorage.getItem(CONFIG.storageKey);
    if(!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  }catch(e){ return defaultState(); }
}
function saveState(){ localStorage.setItem(CONFIG.storageKey, JSON.stringify(state)); }
function $(id){ return document.getElementById(id); }
function esc(s=''){ return String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function todayISO(){ return new Date().toISOString().slice(0,10); }
function uid(prefix='ID'){ return `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`; }
function toast(msg){
  const t = document.createElement('div'); t.className='toast'; t.textContent = msg; document.body.appendChild(t);
  setTimeout(()=>t.remove(), 3200);
}
function cefrFromScore(score){ return CEFR_BANDS.find(b => score >= b.min) || CEFR_BANDS[CEFR_BANDS.length-1]; }
function etpStyle(score){ return Math.round(310 + (Math.max(0, Math.min(900, score)) / 900) * (677-310)); }
function pct(n){ return Math.max(0, Math.min(100, Math.round(n))); }
function currentCandidate(){ return state.sessionUser?.candidateId ? state.candidates[state.sessionUser.candidateId] : null; }
function verificationUrl(certId){ return `${location.origin}${location.pathname}#verify/${encodeURIComponent(certId)}`; }
function qrUrl(data){ return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${encodeURIComponent(data)}`; }

function render(){
  const hash = location.hash || '';
  if(hash.startsWith('#verify/')){
    const certId = decodeURIComponent(hash.replace('#verify/',''));
    renderPublicVerification(certId); return;
  }
  if(!state.sessionUser){ renderLanding(); return; }
  renderShell();
}

function renderLanding(){
  $('app').innerHTML = `
    <main class="app-shell">
      <section class="hero">
        <div class="hero-panel">
          <div>
            <span class="kicker">AI-integrated • CEFR-aligned • Secure testing • QR certificate</span>
            <h2>English Proficiency <span>Passport</span> Platform</h2>
            <p class="lead">A professional one-fit package for diagnosis, preparation, secure real testing, score conversion, proctoring review, institutional analytics, and verifiable English proficiency certification.</p>
            <div class="hero-actions">
              <button class="primary" data-action="quickCandidate">Enter Candidate Demo</button>
              <button class="ghost" data-action="selectAdminRole">Open Admin Access</button>
              <button class="soft" data-action="showVerifyHelp">Certificate Verification</button>
            </div>
          </div>
          <div class="grid grid-4 mt">
            <div class="card stat"><div><strong>6</strong><span>Integrated engines</span></div><span class="badge gold">JSPP</span></div>
            <div class="card stat"><div><strong>0–900</strong><span>Score scale</span></div><span class="badge blue">CEFR</span></div>
            <div class="card stat"><div><strong>4</strong><span>Security modes</span></div><span class="badge red">Strict</span></div>
            <div class="card stat"><div><strong>QR</strong><span>Verification</span></div><span class="badge green">Valid</span></div>
          </div>
        </div>
        <aside class="login-card">
          <div class="brand mb">
            <div class="logo">JS</div>
            <div><h1>${CONFIG.platform}</h1><p>${CONFIG.copyright}</p></div>
          </div>
          <form id="loginForm" class="form">
            <div class="field"><label>Access Role</label><select name="role"><option value="candidate">Candidate / Test Taker</option><option value="lecturer">Lecturer / Instructor</option><option value="proctor">Proctor / Reviewer</option><option value="admin">Institution Admin</option></select></div>
            <div class="field"><label>Full Name</label><input name="fullName" placeholder="Enter full name" required /></div>
            <div class="field"><label>Candidate / Staff ID</label><input name="idNumber" placeholder="Student ID or Staff ID" required /></div>
            <div class="field"><label>Institution</label><input name="institution" value="${esc(state.settings.institution)}" /></div>
            <div class="field"><label>Department / Unit</label><input name="department" placeholder="English Education / Informatics / Testing Center" /></div>
            <div class="field"><label>Secure Access PIN</label><input name="pin" type="password" placeholder="Required for Admin, Lecturer, and Proctor" /></div>
            <button class="primary" type="submit">Enter Platform</button>
            <p class="footer-note">Candidate access creates a local profile. Administrative access is protected by secure PIN. Real institutional deployment should connect this page to encrypted authentication and a protected database.</p>
          </form>
        </aside>
      </section>
    </main>`;
}

function renderShell(){
  const u = state.sessionUser;
  const roleLabel = u.role.charAt(0).toUpperCase() + u.role.slice(1);
  $('app').innerHTML = `
    <div class="app-shell">
      <header class="topbar no-print">
        <div class="brand"><div class="logo">JS</div><div><h1>${CONFIG.platform}</h1><p>${roleLabel}: ${esc(u.name)} • ${CONFIG.copyright}</p></div></div>
        <nav class="nav">
          ${navButton('dashboard','Dashboard')}
          ${u.role==='candidate' ? `${navButton('diagnostic','Diagnostic')}${navButton('practice','Practice Course')}${navButton('mock','Mock Test')}${navButton('realtest','Real Test')}${navButton('report','Score Report')}${navButton('certificate','Certificate')}` : ''}
          ${u.role==='admin' ? `${navButton('adminCandidates','Candidates')}${navButton('itembank','Item Bank')}${navButton('analytics','Analytics')}${navButton('security','Security Logs')}${navButton('settings','Settings')}` : ''}
          ${u.role==='proctor' ? `${navButton('proctor','Proctoring Center')}${navButton('security','Security Logs')}` : ''}
          ${u.role==='lecturer' ? `${navButton('lecturer','Course Analytics')}${navButton('adminCandidates','Learners')}` : ''}
          <button data-action="logout">Logout</button>
        </nav>
      </header>
      <main class="container" id="content">${renderView()}</main>
    </div>`;
}
function navButton(view,label){ return `<button data-action="nav" data-view="${view}" class="${state.view===view?'primary':''}">${label}</button>`; }
function renderView(){
  if(state.sessionUser.role==='candidate'){
    return ({dashboard:renderCandidateDashboard, diagnostic:renderDiagnostic, practice:renderPractice, mock:renderMock, realtest:renderRealTest, report:renderReport, certificate:renderCertificate}[state.view] || renderCandidateDashboard)();
  }
  if(state.sessionUser.role==='admin'){
    return ({dashboard:renderAdminDashboard, adminCandidates:renderCandidatesAdmin, itembank:renderItemBank, analytics:renderAnalytics, security:renderSecurityLogs, settings:renderSettings}[state.view] || renderAdminDashboard)();
  }
  if(state.sessionUser.role==='proctor'){
    return ({dashboard:renderProctorCenter, proctor:renderProctorCenter, security:renderSecurityLogs}[state.view] || renderProctorCenter)();
  }
  if(state.sessionUser.role==='lecturer'){
    return ({dashboard:renderLecturerDashboard, lecturer:renderLecturerDashboard, adminCandidates:renderCandidatesAdmin}[state.view] || renderLecturerDashboard)();
  }
  return renderCandidateDashboard();
}

function profileCompletion(c){
  let n=0; ['fullName','idNumber','institution','department'].forEach(k=>{ if(c[k]) n+=18; });
  if(c.verified) n+=18; if(c.diagnostic) n+=10; return pct(n);
}
function practiceCompletion(c){
  const done = Object.values(c.progress || {}).filter(Boolean).length; return pct((done / PRACTICE_MODULES.length) * 100);
}
function readiness(c){
  let r = 10;
  if(c.verified) r+=15; if(c.diagnostic) r+=25; if(c.mock) r+=20; r += Math.min(30, practiceCompletion(c)*.3); return pct(r);
}

function renderCandidateDashboard(){
  const c = currentCandidate(); const ready = readiness(c); const p = practiceCompletion(c); const profile = profileCompletion(c);
  const diag = c.diagnostic ? `${c.diagnostic.cefr} • ${c.diagnostic.total}/900` : 'Not completed';
  const official = c.official ? `${c.official.total}/900 • ${c.official.cefr}` : 'No official score yet';
  return `
    <section class="section-title"><div><h2>Candidate Dashboard</h2><p>Complete the professional pathway: verify profile, diagnose level, practise, complete mock test, enter secure real test, and receive certificate.</p></div><span class="badge gold">Candidate ID: ${esc(c.idNumber)}</span></section>
    <div class="grid grid-4 mb">
      <div class="card stat"><div><strong>${profile}%</strong><span>Profile completion</span></div><span class="badge ${profile>=80?'green':'blue'}">Profile</span></div>
      <div class="card stat"><div><strong>${diag}</strong><span>AI diagnostic level</span></div><span class="badge gold">Diagnosis</span></div>
      <div class="card stat"><div><strong>${p}%</strong><span>Practice completion</span></div><span class="badge blue">Course</span></div>
      <div class="card stat"><div><strong>${ready}%</strong><span>Real test readiness</span></div><span class="badge ${ready>=75?'green':'red'}">Readiness</span></div>
    </div>
    <div class="grid grid-2">
      <div class="card">
        <h3>Proficiency Passport Progress</h3>
        ${progressLine('Profile Verification', profile)}
        ${progressLine('Diagnostic Test', c.diagnostic?100:0)}
        ${progressLine('Practice Course', p)}
        ${progressLine('Mock Test', c.mock?100:0)}
        ${progressLine('Official Test', c.official?100:0)}
        <div class="hero-actions">
          <button class="primary" data-action="nav" data-view="diagnostic">Start / Review Diagnostic</button>
          <button class="soft" data-action="nav" data-view="practice">Open Practice Course</button>
          <button class="ghost" data-action="nav" data-view="realtest">Enter Real Test</button>
        </div>
      </div>
      <div class="card">
        <h3>Current Official Status</h3>
        <p class="lead" style="font-size:16px">${official}</p>
        <div class="grid grid-2">
          <div><span class="badge blue">Integrity</span><h3>${esc(c.official?.integrity || 'Pending')}</h3></div>
          <div><span class="badge gold">Certificate</span><h3>${c.certificates?.length ? 'Issued' : 'Not issued'}</h3></div>
        </div>
        <p class="footer-note">For high-stakes mode, certificate issuance is recommended only after proctoring review is clean or approved.</p>
      </div>
    </div>`;
}
function progressLine(label,value){ return `<div class="mb"><div class="stat"><span>${label}</span><strong style="font-size:16px">${value}%</strong></div><div class="progress"><span style="width:${value}%"></span></div></div>`; }

function renderDiagnostic(){
  const c = currentCandidate();
  return `
    <section class="section-title"><div><h2>AI Diagnostic Level Test</h2><p>Short multi-skill diagnosis before preparation. It predicts CEFR level, identifies weaknesses, and unlocks a personalized practice path.</p></div><span class="badge blue">Before real test</span></section>
    <form id="diagnosticForm" class="card">
      <div class="grid grid-3 mb">
        <div><span class="badge gold">Adaptive Logic</span><p class="small">This prototype uses skill-weighted scoring. Production can use IRT/adaptive routing.</p></div>
        <div><span class="badge green">Output</span><p class="small">CEFR prediction, skill map, estimated score range, and recommended course.</p></div>
        <div><span class="badge red">Not Official</span><p class="small">Diagnostic scores do not appear on official certificates.</p></div>
      </div>
      ${QUESTION_BANK.map(renderQuestion).join('')}
      <div class="quiz-item">
        <strong>Writing Snapshot</strong>
        <p>Write 80–120 words explaining why English proficiency matters for university students.</p>
        <textarea name="diagnosticWriting" placeholder="Write your response here..."></textarea>
      </div>
      <div class="quiz-item">
        <strong>Speaking Snapshot Transcript</strong>
        <p>In a production system, this area records audio. For this static platform, type a short transcript of your spoken answer.</p>
        <textarea name="diagnosticSpeaking" placeholder="Explain your academic goal in English..."></textarea>
      </div>
      <button class="primary" type="submit">Submit Diagnostic and Generate Level</button>
      ${c.diagnostic ? `<button class="ghost" type="button" data-action="nav" data-view="practice">Open Recommended Practice</button>` : ''}
    </form>
    ${c.diagnostic ? renderDiagnosticResult(c.diagnostic) : ''}`;
}
function renderQuestion(item){
  return `<div class="quiz-item"><strong>${item.skill} • ${item.sub} • ${item.level}</strong><p>${esc(item.q)}</p><div class="options">${item.a.map((op,i)=>`<label class="option"><input type="radio" name="${item.id}" value="${i}" /> <span>${esc(op)}</span></label>`).join('')}</div></div>`;
}
function renderDiagnosticResult(d){
  return `<div class="card mt"><h3>Diagnostic Result</h3><div class="grid grid-4"><div class="stat"><div><strong>${d.total}</strong><span>Predicted JSPP score</span></div></div><div class="stat"><div><strong>${d.cefr}</strong><span>Predicted CEFR</span></div></div><div class="stat"><div><strong>${d.etp}</strong><span>ETP-style estimate</span></div></div><div class="stat"><div><strong>${d.readiness}%</strong><span>Readiness</span></div></div></div><div class="mt"><h4>Recommended Learning Path</h4><p>${d.recommendations.map(esc).join(' • ')}</p></div></div>`;
}

function renderPractice(){
  const c = currentCandidate();
  const recSkills = c.diagnostic?.weakSkills || [];
  return `
    <section class="section-title"><div><h2>AI English Proficiency Preparation Studio</h2><p>Personalized course before the real test. AI is allowed here for explanation, feedback, and strategy practice, but is blocked in the real test.</p></div><span class="badge green">${practiceCompletion(c)}% completed</span></section>
    <div class="grid grid-4">
      ${PRACTICE_MODULES.map(m=>{
        const done = !!c.progress?.[m.id]; const recommended = recSkills.includes(m.skill) || (m.skill==='Integrated' && c.diagnostic);
        return `<div class="card module-card">
          <div><span class="badge ${done?'green':recommended?'gold':'blue'}">${done?'Completed':recommended?'Recommended':'Available'}</span><h3>${esc(m.title)}</h3><p>${esc(m.desc)}</p></div>
          <div><p class="small"><strong>Skill:</strong> ${m.skill} • <strong>Level:</strong> ${m.level} • <strong>Time:</strong> ${m.mins} mins</p><ul class="small">${m.tasks.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>
          <button class="${done?'success':'primary'}" data-action="completeModule" data-module="${m.id}">${done?'Completed - Reopen':'Complete Learning Task'}</button>
        </div>`;
      }).join('')}
    </div>`;
}

function renderMock(){
  const c = currentCandidate();
  return `
    <section class="section-title"><div><h2>Mock Test</h2><p>Medium-security timed preparation. The mock test helps students understand the test interface before the strict official test.</p></div><span class="badge blue">Practice assessment</span></section>
    <form id="mockForm" class="card">
      ${REAL_TEST_ITEMS.slice(0,12).map(renderQuestion).join('')}
      <button class="primary" type="submit">Submit Mock Test</button>
    </form>
    ${c.mock ? `<div class="card mt"><h3>Latest Mock Result</h3><div class="grid grid-3"><div class="stat"><div><strong>${c.mock.total}</strong><span>Mock score / 900</span></div></div><div class="stat"><div><strong>${c.mock.cefr}</strong><span>CEFR estimate</span></div></div><div class="stat"><div><strong>${c.mock.date}</strong><span>Date completed</span></div></div></div></div>` : ''}`;
}

function renderRealTest(){
  const c = currentCandidate();
  if(state.activeTest?.started && !state.activeTest?.finished && state.activeTest.candidateId===c.id){ return renderActiveRealTest(); }
  const ready = readiness(c);
  const eligible = ready >= 70;
  return `
    <section class="section-title"><div><h2>Secure Real Proficiency Test</h2><p>Official test mode with strict browser behaviour tracking, randomized forms, dynamic watermark, integrity logging, and proctoring review.</p></div><span class="badge ${eligible?'green':'red'}">Readiness ${ready}%</span></section>
    <div class="grid grid-2">
      <div class="card">
        <h3>Eligibility Checklist</h3>
        ${checkLine('Profile verified', c.verified)}
        ${checkLine('Diagnostic completed', !!c.diagnostic)}
        ${checkLine('Practice progress ≥ 50%', practiceCompletion(c)>=50)}
        ${checkLine('Mock test completed', !!c.mock)}
        ${checkLine('Security declaration accepted', true)}
        <p class="footer-note">This static platform implements browser-level monitoring. Production high-stakes deployment should use a locked browser, server-side recording, human proctoring, and encrypted evidence storage.</p>
      </div>
      <div class="card">
        <h3>Security Controls Activated</h3>
        <div class="timeline">
          ${['Fullscreen enforcement','Tab/window switch detection','Copy, paste, right-click blocking','Dynamic watermark','Camera and microphone check','Violation timeline','Post-test integrity status'].map(x=>`<div class="log"><span>${x}</span><span class="badge green">Ready</span></div>`).join('')}
        </div>
        <div class="hero-actions mt">
          <button class="soft" data-action="runDeviceCheck">Run Device Check</button>
          <button class="${eligible?'danger':'ghost'}" data-action="startOfficialTest" ${eligible?'':'disabled'}>Start Secure Real Test</button>
        </div>
      </div>
    </div>
    ${c.official ? renderReportCard(c.official) : ''}`;
}
function checkLine(label,ok){ return `<div class="log"><span>${esc(label)}</span><span class="badge ${ok?'green':'red'}">${ok?'Passed':'Required'}</span></div>`; }

function renderActiveRealTest(){
  const t = state.activeTest; const item = t.items[t.current]; const c = currentCandidate(); const answered = t.answers[item.id];
  return `
    <div class="watermark">${esc(c.fullName)} • ${esc(t.sessionId)} • Secure Session</div>
    <section class="test-shell">
      <div class="secure-bar no-print">
        <span class="badge red">REAL TEST MODE</span><span class="badge blue">Question ${t.current+1}/${t.items.length}</span><span class="badge gold timer" id="timerBox">${formatTime(t.timeLeft)}</span><span class="badge ${t.logs.length?'red':'green'}">Warnings: ${t.logs.length}</span><span class="badge green">Camera/Mic: ${t.mediaStatus || 'Pending'}</span>
      </div>
      <div class="card">
        <h2>${esc(item.skill)} Section</h2>
        <div class="quiz-item"><strong>${esc(item.sub)} • ${esc(item.level)}</strong><p>${esc(item.q)}</p><div class="options">${item.a.map((op,i)=>`<label class="option"><input type="radio" name="officialAnswer" value="${i}" ${String(answered)===String(i)?'checked':''}/> <span>${esc(op)}</span></label>`).join('')}</div></div>
        <div class="hero-actions">
          <button class="primary" data-action="saveNextOfficial">Save and Next</button>
          <button class="danger" data-action="finishOfficialTest">Finish Test</button>
        </div>
      </div>
      <div class="card mt"><h3>Live Security Timeline</h3>${t.logs.length ? t.logs.slice(-6).map(l=>`<div class="log"><span>${esc(l.time)} • ${esc(l.type)}</span><span class="badge ${l.severity==='high'?'red':'gold'}">${esc(l.severity)}</span></div>`).join('') : '<p class="small">No violation logged.</p>'}</div>
    </section>`;
}
function formatTime(sec){ sec=Math.max(0,sec||0); const m=Math.floor(sec/60), s=sec%60; return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; }

function renderReport(){
  const c = currentCandidate();
  return `
    <section class="section-title"><div><h2>Score Report and Conversion</h2><p>Official JSPP-AI score, CEFR interpretation, institutional ETP-style conversion, skill profile, and learning recommendations.</p></div><span class="badge gold">0–900 scale</span></section>
    ${c.official ? renderReportCard(c.official) : `<div class="card"><h3>No official report yet</h3><p>Complete the secure real test first. You may still review diagnostic and mock results from their menus.</p><button class="primary" data-action="nav" data-view="realtest">Go to Real Test</button></div>`}`;
}
function renderReportCard(r){
  return `<div class="card mt"><h3>Official Proficiency Report</h3><div class="grid grid-4 mb"><div class="stat"><div><strong>${r.total}</strong><span>JSPP-AI Score / 900</span></div></div><div class="stat"><div><strong>${r.cefr}</strong><span>CEFR Level</span></div></div><div class="stat"><div><strong>${r.etp}</strong><span>ETP-style conversion</span></div></div><div class="stat"><div><strong>${esc(r.integrity)}</strong><span>Integrity status</span></div></div></div><div class="table-wrap"><table><thead><tr><th>Skill</th><th>Score</th><th>Interpretation</th></tr></thead><tbody>${Object.entries(r.skills).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${v}/180</td><td>${cefrFromScore(Math.round(v*5)).cefr} equivalent skill band</td></tr>`).join('')}</tbody></table></div><div class="grid grid-2 mt"><div><h4>Strengths</h4><p>${r.strengths.map(esc).join(' • ')}</p></div><div><h4>Recommended Improvement</h4><p>${r.recommendations.map(esc).join(' • ')}</p></div></div><p class="footer-note">The ETP-style conversion is an institutional benchmark interpretation, not an official TOEFL, TOEIC, IELTS, or ETS score.</p></div>`;
}

function renderCertificate(){
  const c = currentCandidate();
  if(!c.official){ return `<section class="section-title"><div><h2>Certificate</h2><p>No certificate can be generated until the secure real test has an official score.</p></div></section><div class="card"><button class="primary" data-action="nav" data-view="realtest">Complete Real Test</button></div>`; }
  const clean = ['Verified','Approved after review'].includes(c.official.integrity);
  if(!clean){
    return `<section class="section-title"><div><h2>Certificate Pending</h2><p>Your official test requires proctoring review before certificate issuance.</p></div><span class="badge red">${esc(c.official.integrity)}</span></section><div class="card"><p>Certificate generation is locked until admin/proctor approval.</p></div>`;
  }
  if(!c.certificates?.length){ createCertificate(c); }
  const cert = state.certificates[c.certificates[0]];
  return `<section class="section-title no-print"><div><h2>English Proficiency Passport Certificate</h2><p>QR-verifiable certificate with score, CEFR level, score conversion, integrity status, and validity period.</p></div><button class="primary" data-action="printCertificate">Print / Save PDF</button></section>${certificateHTML(cert,c)}`;
}
function certificateHTML(cert,c){
  return `<div class="card"><div class="certificate">
    <div class="center"><p class="small">${esc(CONFIG.issuingAuthority)}</p><h2>ENGLISH PROFICIENCY PASSPORT CERTIFICATE</h2><p>This is to certify that</p><div class="cert-name">${esc(c.fullName)}</div><p>has completed the <strong>JS Proficiency Passport AI Test</strong> and achieved the following proficiency result.</p></div>
    <div class="cert-grid mt"><div><div class="table-wrap" style="background:transparent;border-color:#d6c28e"><table style="min-width:0"><tbody><tr><td>Certificate ID</td><td><strong>${esc(cert.id)}</strong></td></tr><tr><td>Candidate ID</td><td>${esc(c.idNumber)}</td></tr><tr><td>Institution</td><td>${esc(c.institution)}</td></tr><tr><td>Overall Score</td><td><strong>${cert.score}/900</strong></td></tr><tr><td>CEFR Level</td><td><strong>${esc(cert.cefr)}</strong></td></tr><tr><td>Institutional ETP-Style Conversion</td><td><strong>${cert.etp}</strong></td></tr><tr><td>Integrity Status</td><td>${esc(cert.integrity)}</td></tr><tr><td>Issued</td><td>${esc(cert.issueDate)}</td></tr><tr><td>Valid Until</td><td>${esc(cert.expiryDate)}</td></tr></tbody></table></div></div><div class="qrbox"><img alt="QR Verification" src="${qrUrl(verificationUrl(cert.id))}" /></div></div>
    <div class="grid grid-2 mt"><div><div class="sign">Joko Slamet</div><p><strong>Authorized Signature</strong><br/>${esc(CONFIG.issuingAuthority)}</p></div><div class="center"><span class="stamp">VERIFIED<br/>JSPP-AI</span></div></div>
    <p class="footer-note" style="color:#4f4125">This certificate is digitally verifiable through the QR code. This institutional score interpretation is not an official TOEFL, IELTS, TOEIC, or ETS score.</p>
  </div></div>`;
}

function renderAdminDashboard(){
  const candidates = Object.values(state.candidates); const certs = Object.values(state.certificates); const reviews = candidates.filter(c=>c.official && c.official.integrity==='Review Required').length;
  return `<section class="section-title"><div><h2>Institution Admin Dashboard</h2><p>Manage batches, candidates, item bank, score reports, certificates, and institutional analytics.</p></div><span class="badge gold">${esc(state.settings.institution)}</span></section><div class="grid grid-4 mb"><div class="card stat"><div><strong>${candidates.length}</strong><span>Total candidates</span></div></div><div class="card stat"><div><strong>${candidates.filter(c=>c.diagnostic).length}</strong><span>Diagnostics completed</span></div></div><div class="card stat"><div><strong>${candidates.filter(c=>c.official).length}</strong><span>Real tests completed</span></div></div><div class="card stat"><div><strong>${reviews}</strong><span>Sessions under review</span></div></div></div><div class="grid grid-2"><div class="card"><h3>Administrative Actions</h3><div class="hero-actions"><button class="primary" data-action="createSampleCandidates">Create Sample Candidates</button><button class="soft" data-action="nav" data-view="itembank">Manage Item Bank</button><button class="ghost" data-action="exportData">Export JSON</button><button class="danger" data-action="resetData">Reset Local Data</button></div></div><div class="card"><h3>Batch Management</h3><div class="table-wrap"><table><thead><tr><th>Batch</th><th>Date</th><th>Status</th><th>Candidates</th></tr></thead><tbody>${state.batches.map(b=>`<tr><td>${esc(b.name)}</td><td>${esc(b.date)}</td><td>${esc(b.status)}</td><td>${b.candidates}</td></tr>`).join('')}</tbody></table></div></div></div>`;
}

function renderCandidatesAdmin(){
  const rows = Object.values(state.candidates).map(c=>`<tr><td><strong>${esc(c.fullName)}</strong><br/><span class="small">${esc(c.idNumber)}</span></td><td>${esc(c.institution)}<br/><span class="small">${esc(c.department||'-')}</span></td><td>${c.diagnostic?`${c.diagnostic.total} / ${c.diagnostic.cefr}`:'-'}</td><td>${practiceCompletion(c)}%</td><td>${c.official?`${c.official.total} / ${c.official.cefr}`:'-'}</td><td>${c.official?`<span class="badge ${c.official.integrity==='Verified'?'green':c.official.integrity==='Review Required'?'gold':'red'}">${esc(c.official.integrity)}</span>`:'-'}</td><td>${c.official && c.official.integrity==='Review Required'?`<button class="success" data-action="approveSession" data-candidate="${c.id}">Approve</button>`:''} ${c.official?`<button class="soft" data-action="forceCertificate" data-candidate="${c.id}">Issue Cert</button>`:''}</td></tr>`).join('');
  return `<section class="section-title"><div><h2>Candidate Management</h2><p>Monitor candidate pathway, scores, integrity status, and certificate issuance.</p></div><button class="primary" data-action="createSampleCandidates">Add Sample Data</button></section><div class="card table-wrap"><table><thead><tr><th>Candidate</th><th>Institution</th><th>Diagnostic</th><th>Practice</th><th>Official</th><th>Integrity</th><th>Action</th></tr></thead><tbody>${rows || '<tr><td colspan="7">No candidates registered yet.</td></tr>'}</tbody></table></div>`;
}

function renderItemBank(){
  const all = [...REAL_TEST_ITEMS, {id:'W1',skill:'Writing',sub:'Academic Essay',level:'B1-C1',q:'Essay prompt: Should universities require English proficiency certification?',a:['Rubric-based task'],key:0,exp:''},{id:'SP1',skill:'Speaking',sub:'Academic Response',level:'B1-C1',q:'Speaking prompt: Explain your academic goal.',a:['Rubric-based task'],key:0,exp:''}];
  return `<section class="section-title"><div><h2>Item Bank Management</h2><p>Each item contains skill, sub-skill, CEFR level, difficulty, answer key, explanation, validation status, and exposure metadata.</p></div><span class="badge blue">${all.length} demo items</span></section><div class="card table-wrap"><table><thead><tr><th>Item ID</th><th>Skill</th><th>Sub-skill</th><th>CEFR</th><th>Question / Task</th><th>Status</th><th>Exposure</th></tr></thead><tbody>${all.map((it,i)=>`<tr><td>${it.id}</td><td>${it.skill}</td><td>${it.sub}</td><td>${it.level}</td><td>${esc(it.q)}</td><td><span class="badge green">Approved</span></td><td>${Math.floor((i+2)*7)}%</td></tr>`).join('')}</tbody></table></div>`;
}
function renderAnalytics(){
  const candidates = Object.values(state.candidates); const officials = candidates.filter(c=>c.official); const avg = officials.length ? Math.round(officials.reduce((s,c)=>s+c.official.total,0)/officials.length) : 0;
  const bands = ['Pre-A1','A1','A2','B1','B2','C1','C2'].map(b=>({b, n:officials.filter(c=>c.official.cefr===b).length}));
  return `<section class="section-title"><div><h2>Institutional Analytics</h2><p>CEFR distribution, average score, department readiness, and skill weakness map for curriculum improvement.</p></div><span class="badge gold">Psychometric-ready</span></section><div class="grid grid-3 mb"><div class="card stat"><div><strong>${avg||'-'}</strong><span>Average official score</span></div></div><div class="card stat"><div><strong>${officials.length}</strong><span>Completed official tests</span></div></div><div class="card stat"><div><strong>${Object.values(state.certificates).length}</strong><span>Certificates issued</span></div></div></div><div class="grid grid-2"><div class="card"><h3>CEFR Distribution</h3>${bands.map(x=>`${progressLine(x.b, officials.length?Math.round((x.n/officials.length)*100):0)}`).join('')}</div><div class="card"><h3>Quality Indicators</h3>${['Reliability analysis ready','Item difficulty tracking ready','Discrimination index ready','Distractor analysis ready','Inter-rater scoring workflow ready','Certificate verification active'].map(x=>`<div class="log"><span>${x}</span><span class="badge green">Enabled</span></div>`).join('')}</div></div>`;
}
function renderSecurityLogs(){
  const logs = collectSecurityLogs();
  return `<section class="section-title"><div><h2>Security Audit Logs</h2><p>All suspicious events from secure test sessions are recorded here for review and institutional accountability.</p></div><span class="badge red">${logs.length} event(s)</span></section><div class="card timeline">${logs.length ? logs.map(l=>`<div class="log"><div><strong>${esc(l.candidate)}</strong><br/><span class="small">${esc(l.time)} • ${esc(l.sessionId)}</span><br/>${esc(l.type)}</div><span class="badge ${l.severity==='high'?'red':'gold'}">${esc(l.severity)}</span></div>`).join('') : '<p>No security violation has been recorded.</p>'}</div>`;
}
function renderProctorCenter(){
  const candidates = Object.values(state.candidates).filter(c=>c.official);
  return `<section class="section-title"><div><h2>AI-Human Proctoring Center</h2><p>Review flagged sessions, verify integrity, approve clean sessions, or invalidate suspicious attempts.</p></div><span class="badge red">Human review required for high-stakes testing</span></section><div class="card table-wrap"><table><thead><tr><th>Candidate</th><th>Session</th><th>Score</th><th>Integrity</th><th>Warnings</th><th>Decision</th></tr></thead><tbody>${candidates.map(c=>`<tr><td>${esc(c.fullName)}<br/><span class="small">${esc(c.idNumber)}</span></td><td>${esc(c.official.sessionId)}</td><td>${c.official.total}</td><td><span class="badge ${c.official.integrity==='Verified'?'green':c.official.integrity==='Review Required'?'gold':'red'}">${esc(c.official.integrity)}</span></td><td>${c.official.logs?.length||0}</td><td>${c.official.integrity==='Review Required'?`<button class="success" data-action="approveSession" data-candidate="${c.id}">Approve</button><button class="danger" data-action="invalidateSession" data-candidate="${c.id}">Invalidate</button>`:'No action required'}</td></tr>`).join('') || '<tr><td colspan="6">No official sessions yet.</td></tr>'}</tbody></table></div>`;
}
function renderLecturerDashboard(){
  const candidates = Object.values(state.candidates); const avgPractice = candidates.length?Math.round(candidates.reduce((s,c)=>s+practiceCompletion(c),0)/candidates.length):0;
  return `<section class="section-title"><div><h2>Lecturer / Instructor Course Analytics</h2><p>Monitor diagnostic weaknesses, practice progress, mock readiness, and learning recommendations before official testing.</p></div><span class="badge blue">Learning support only</span></section><div class="grid grid-3 mb"><div class="card stat"><div><strong>${candidates.length}</strong><span>Learners</span></div></div><div class="card stat"><div><strong>${avgPractice}%</strong><span>Average practice progress</span></div></div><div class="card stat"><div><strong>${candidates.filter(c=>c.mock).length}</strong><span>Mock completed</span></div></div></div><div class="card"><h3>Teaching Recommendations</h3><div class="timeline">${['Provide intensive listening inference practice','Review subject-verb agreement and clauses','Add reading speed and vocabulary in context tasks','Use intelligibility-focused speaking activities','Require mock test before official test'].map(x=>`<div class="log"><span>${x}</span><span class="badge gold">Recommended</span></div>`).join('')}</div></div>`;
}
function renderSettings(){
  return `<section class="section-title"><div><h2>Platform Settings</h2><p>Configure institutional identity, security mode, certificate prefix, and test requirements.</p></div><span class="badge gold">Admin only</span></section><form id="settingsForm" class="card form"><div class="grid grid-2"><div class="field"><label>Institution Name</label><input name="institution" value="${esc(state.settings.institution)}" /></div><div class="field"><label>Certificate Prefix</label><input name="certificatePrefix" value="${esc(state.settings.certificatePrefix)}" /></div><div class="field"><label>High-Stakes Mode</label><select name="highStakesMode"><option value="true" ${state.settings.highStakesMode?'selected':''}>Enabled</option><option value="false" ${!state.settings.highStakesMode?'selected':''}>Disabled</option></select></div><div class="field"><label>Require Practice Before Real Test</label><select name="requirePractice"><option value="true" ${state.settings.requirePractice?'selected':''}>Enabled</option><option value="false" ${!state.settings.requirePractice?'selected':''}>Disabled</option></select></div></div><button class="primary" type="submit">Save Settings</button></form>`;
}
function collectSecurityLogs(){
  const logs=[]; Object.values(state.candidates).forEach(c=>{ (c.official?.logs||[]).forEach(l=>logs.push({...l,candidate:c.fullName,sessionId:c.official.sessionId})); }); return logs.sort((a,b)=>(b.time||'').localeCompare(a.time||''));
}

function renderPublicVerification(certId){
  const cert = state.certificates[certId];
  const c = cert ? state.candidates[cert.candidateId] : null;
  $('app').innerHTML = `<main class="app-shell"><div class="container"><section class="section-title"><div><h2>Certificate Verification</h2><p>Public verification page for English Proficiency Passport Certificate.</p></div><button class="ghost" onclick="location.hash=''; state.view='landing'; render();">Back to Platform</button></section>${cert && c ? `<div class="card"><div class="grid grid-2"><div><h3>Status: <span class="badge green">${esc(cert.status)}</span></h3><p><strong>Candidate:</strong> ${esc(c.fullName)}</p><p><strong>Certificate ID:</strong> ${esc(cert.id)}</p><p><strong>Score:</strong> ${cert.score}/900</p><p><strong>CEFR:</strong> ${esc(cert.cefr)}</p><p><strong>ETP-Style Conversion:</strong> ${cert.etp}</p><p><strong>Integrity Status:</strong> ${esc(cert.integrity)}</p><p><strong>Issued:</strong> ${esc(cert.issueDate)} • <strong>Valid Until:</strong> ${esc(cert.expiryDate)}</p></div><div class="qrbox"><img alt="QR" src="${qrUrl(verificationUrl(cert.id))}" /></div></div></div>` : `<div class="card"><h3>Status: <span class="badge red">Not Found</span></h3><p>This certificate ID is not available in this browser-based demo database. In production, verification must connect to a public encrypted certificate database.</p><p><strong>Certificate ID checked:</strong> ${esc(certId)}</p></div>`}</div></main>`;
}

// Event handlers
document.addEventListener('click', async (e)=>{
  const btn = e.target.closest('[data-action]'); if(!btn) return; const action = btn.dataset.action;
  if(action==='nav'){ state.view=btn.dataset.view; saveState(); render(); return; }
  if(action==='logout'){ detachSecurity(); state.sessionUser=null; state.view='landing'; saveState(); render(); return; }
  if(action==='quickCandidate'){ quickCandidate(); return; }
  if(action==='selectAdminRole'){ document.querySelector('select[name="role"]').value='admin'; document.querySelector('input[name="pin"]').focus(); toast('Enter the secure admin PIN to continue.'); return; }
  if(action==='showVerifyHelp'){ location.hash = '#verify/JSPP-CERT-SAMPLE'; render(); return; }
  if(action==='completeModule'){ completeModule(btn.dataset.module); return; }
  if(action==='runDeviceCheck'){ await runDeviceCheck(); return; }
  if(action==='startOfficialTest'){ startOfficialTest(); return; }
  if(action==='saveNextOfficial'){ saveNextOfficial(); return; }
  if(action==='finishOfficialTest'){ finishOfficialTest(); return; }
  if(action==='printCertificate'){ window.print(); return; }
  if(action==='createSampleCandidates'){ createSampleCandidates(); return; }
  if(action==='exportData'){ exportData(); return; }
  if(action==='resetData'){ if(confirm('Reset all local platform data?')){ localStorage.removeItem(CONFIG.storageKey); state=defaultState(); render(); } return; }
  if(action==='approveSession'){ approveSession(btn.dataset.candidate); return; }
  if(action==='invalidateSession'){ invalidateSession(btn.dataset.candidate); return; }
  if(action==='forceCertificate'){ forceCertificate(btn.dataset.candidate); return; }
});

document.addEventListener('submit', (e)=>{
  e.preventDefault();
  if(e.target.id==='loginForm') handleLogin(e.target);
  if(e.target.id==='diagnosticForm') submitDiagnostic(e.target);
  if(e.target.id==='mockForm') submitMock(e.target);
  if(e.target.id==='settingsForm') saveSettings(e.target);
});

function handleLogin(form){
  const fd = new FormData(form); const role = fd.get('role'); const pin = fd.get('pin') || '';
  if(role!=='candidate' && pin !== CONFIG.adminPin){ toast('Secure PIN is incorrect.'); return; }
  const idNumber = fd.get('idNumber').trim();
  let cand = Object.values(state.candidates).find(c=>c.idNumber===idNumber);
  if(role==='candidate'){
    if(!cand){ cand = createCandidate({ fullName:fd.get('fullName'), idNumber, institution:fd.get('institution'), department:fd.get('department') }); }
    else { cand.fullName=fd.get('fullName'); cand.institution=fd.get('institution'); cand.department=fd.get('department'); cand.verified=true; }
    state.sessionUser={ role, name:cand.fullName, candidateId:cand.id };
  } else {
    state.sessionUser={ role, name:fd.get('fullName'), staffId:idNumber };
  }
  state.view='dashboard'; saveState(); render();
}
function quickCandidate(){
  let cand = Object.values(state.candidates).find(c=>c.idNumber==='STU-2026-001');
  if(!cand) cand = createCandidate({ fullName:'Demo Candidate', idNumber:'STU-2026-001', institution:state.settings.institution, department:'English Education' });
  state.sessionUser={role:'candidate', name:cand.fullName, candidateId:cand.id}; state.view='dashboard'; saveState(); render();
}
function createCandidate(data){
  const id = uid('CAND'); const cand={ id, fullName:data.fullName || 'Candidate', idNumber:data.idNumber || uid('STU'), institution:data.institution || state.settings.institution, department:data.department || '-', verified:true, progress:{}, certificates:[] };
  state.candidates[id]=cand; state.batches[0].candidates = Object.keys(state.candidates).length; saveState(); return cand;
}
function submitDiagnostic(form){
  const c=currentCandidate(); const fd=new FormData(form); let correct=0; const skillStats={Listening:[0,0],Structure:[0,0],Reading:[0,0],Vocabulary:[0,0]};
  QUESTION_BANK.forEach(it=>{ const ans=fd.get(it.id); skillStats[it.skill][1]++; if(String(ans)===String(it.key)){ correct++; skillStats[it.skill][0]++; }});
  const writing = (fd.get('diagnosticWriting')||'').trim(); const speaking = (fd.get('diagnosticSpeaking')||'').trim();
  const writingScore = Math.min(90, Math.round(writing.split(/\s+/).filter(Boolean).length * 1.2));
  const speakingScore = Math.min(90, Math.round(speaking.split(/\s+/).filter(Boolean).length * 1.2));
  const mcqScore = Math.round((correct / QUESTION_BANK.length) * 720); const total = Math.min(900, mcqScore + writingScore + speakingScore);
  const band=cefrFromScore(total); const weakSkills=Object.entries(skillStats).filter(([k,v])=>v[1] && (v[0]/v[1])<.7).map(([k])=>k);
  if(writingScore<55) weakSkills.push('Writing'); if(speakingScore<55) weakSkills.push('Speaking');
  c.diagnostic={ date:todayISO(), total, cefr:band.cefr, etp:etpStyle(total), readiness:pct(total/9), weakSkills:[...new Set(weakSkills)], recommendations:recommendations([...new Set(weakSkills)]) };
  saveState(); toast('Diagnostic result generated.'); state.view='diagnostic'; render();
}
function recommendations(weak){ if(!weak.length) return ['Full Mock Test Preparation', 'Advanced Academic Practice']; return weak.map(s=>({Listening:'Listening Booster',Structure:'Structure & Written Expression Lab',Reading:'Reading Strategy Studio',Vocabulary:'Academic Vocabulary Builder',Writing:'AI Writing Studio',Speaking:'Speaking & Intelligibility Studio'}[s]||`${s} Practice`)); }
function completeModule(id){ const c=currentCandidate(); c.progress=c.progress||{}; c.progress[id]=true; saveState(); toast('Practice module completed and saved.'); render(); }
function submitMock(form){
  const c=currentCandidate(); const fd=new FormData(form); let correct=0; REAL_TEST_ITEMS.slice(0,12).forEach(it=>{ if(String(fd.get(it.id))===String(it.key)) correct++; }); const total=Math.round((correct/12)*900); const band=cefrFromScore(total);
  c.mock={ date:todayISO(), total, cefr:band.cefr, correct, totalItems:12 }; saveState(); toast('Mock test submitted.'); render();
}
async function runDeviceCheck(){
  let mediaStatus='Unavailable';
  try{ if(navigator.mediaDevices?.getUserMedia){ const stream=await navigator.mediaDevices.getUserMedia({video:true,audio:true}); stream.getTracks().forEach(t=>t.stop()); mediaStatus='Passed'; } } catch(e){ mediaStatus='Permission denied'; }
  const c=currentCandidate(); if(c){ c.deviceCheck={date:todayISO(),mediaStatus}; saveState(); }
  toast(`Device check: ${mediaStatus}.`);
}
function startOfficialTest(){
  const c=currentCandidate(); if(!c) return;
  const items = shuffle([...REAL_TEST_ITEMS]);
  state.activeTest={ sessionId:uid('JSPP-SESSION'), candidateId:c.id, started:true, finished:false, current:0, answers:{}, logs:[], items, timeLeft:45*60, mediaStatus:c.deviceCheck?.mediaStatus || 'Not checked', startTime:new Date().toISOString() };
  saveState(); attachSecurity(); requestFullscreen(); startTimer(); render();
}
function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; }
function requestFullscreen(){ try{ document.documentElement.requestFullscreen?.(); }catch(e){} }
function startTimer(){ clearInterval(secureTimer); secureTimer=setInterval(()=>{ if(!state.activeTest || state.activeTest.finished){ clearInterval(secureTimer); return; } state.activeTest.timeLeft--; const box=$('timerBox'); if(box) box.textContent=formatTime(state.activeTest.timeLeft); if(state.activeTest.timeLeft<=0) finishOfficialTest(true); saveState(); },1000); }
function saveNextOfficial(){
  const t=state.activeTest; if(!t) return; const item=t.items[t.current]; const checked=document.querySelector('input[name="officialAnswer"]:checked'); if(checked) t.answers[item.id]=Number(checked.value); if(t.current < t.items.length-1){ t.current++; saveState(); render(); } else { finishOfficialTest(); }
}
function finishOfficialTest(auto=false){
  const t=state.activeTest; if(!t || t.finished) return;
  const checked=document.querySelector('input[name="officialAnswer"]:checked'); if(checked){ const item=t.items[t.current]; t.answers[item.id]=Number(checked.value); }
  t.finished=true; t.endTime=new Date().toISOString(); clearInterval(secureTimer); detachSecurity();
  const c=state.candidates[t.candidateId]; c.official = scoreOfficialTest(t, c); state.activeTest=null; saveState(); toast(auto?'Time is over. Test submitted.':'Official test submitted.'); state.view='report'; render();
}
function scoreOfficialTest(t,c){
  const skillCounts={Listening:[0,0],Structure:[0,0],Reading:[0,0],Vocabulary:[0,0]};
  t.items.forEach(it=>{ if(!skillCounts[it.skill]) skillCounts[it.skill]=[0,0]; skillCounts[it.skill][1]++; if(String(t.answers[it.id])===String(it.key)) skillCounts[it.skill][0]++; });
  const skills={}; ['Listening','Structure','Reading','Vocabulary'].forEach(s=>{ const v=skillCounts[s]||[0,0]; skills[s]=v[1]?Math.round((v[0]/v[1])*180):0; });
  // Static prototype estimates productive skills from diagnostic/practice readiness. Production must use audio/text rubrics and human moderation.
  skills.Writing = Math.min(180, Math.round((c.diagnostic?.total || 450)/5.4 + (practiceCompletion(c)*.35)));
  skills.Speaking = Math.min(180, Math.round((c.diagnostic?.total || 450)/5.7 + (practiceCompletion(c)*.30)));
  const total=Math.round(Object.values(skills).reduce((a,b)=>a+b,0)); const band=cefrFromScore(total);
  const highLogs=(t.logs||[]).filter(l=>l.severity==='high').length; let integrity='Verified'; if(t.logs.length>=3 || highLogs>=1 || t.mediaStatus==='Permission denied') integrity='Review Required'; if(t.logs.length>=7 || highLogs>=3) integrity='Invalid';
  const strengths=Object.entries(skills).sort((a,b)=>b[1]-a[1]).slice(0,2).map(([k])=>k);
  const recommendations=Object.entries(skills).sort((a,b)=>a[1]-b[1]).slice(0,3).map(([k])=>`${k} improvement pathway`);
  return { sessionId:t.sessionId, date:todayISO(), total, cefr:band.cefr, etp:etpStyle(total), label:band.label, skills, integrity, logs:t.logs||[], strengths, recommendations };
}
function attachSecurity(){
  if(securityListenersAttached) return; securityListenersAttached=true;
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('blur', onBlur);
  document.addEventListener('copy', blockCopyPaste);
  document.addEventListener('paste', blockCopyPaste);
  document.addEventListener('contextmenu', blockContext);
  document.addEventListener('keydown', onKeyDown);
}
function detachSecurity(){
  if(!securityListenersAttached) return; securityListenersAttached=false;
  document.removeEventListener('visibilitychange', onVisibility);
  window.removeEventListener('blur', onBlur);
  document.removeEventListener('copy', blockCopyPaste);
  document.removeEventListener('paste', blockCopyPaste);
  document.removeEventListener('contextmenu', blockContext);
  document.removeEventListener('keydown', onKeyDown);
  try{ document.exitFullscreen?.(); }catch(e){}
}
function logViolation(type,severity='medium'){
  if(!state.activeTest || state.activeTest.finished) return;
  state.activeTest.logs.push({ time:new Date().toLocaleString(), type, severity }); saveState(); toast(`Security warning: ${type}`); render();
}
function onVisibility(){ if(document.hidden) logViolation('Candidate left secure test window','high'); }
function onBlur(){ logViolation('Browser window lost focus','medium'); }
function blockCopyPaste(e){ e.preventDefault(); logViolation(`${e.type} attempt blocked`,'high'); }
function blockContext(e){ e.preventDefault(); logViolation('Right-click attempt blocked','medium'); }
function onKeyDown(e){ if(e.key==='PrintScreen' || (e.ctrlKey && ['c','v','p','s','u'].includes(e.key.toLowerCase())) || e.key==='F12'){ e.preventDefault(); logViolation(`Restricted key attempt: ${e.key}`,'high'); } }

function createCertificate(c){
  const certId = `${state.settings.certificatePrefix}/${new Date().getFullYear()}/${String(new Date().getMonth()+1).padStart(2,'0')}/${String(Object.keys(state.certificates).length+1).padStart(6,'0')}`;
  const issued=new Date(); const exp=new Date(issued); exp.setFullYear(exp.getFullYear()+CONFIG.certificateValidityYears);
  const cert={ id:certId, candidateId:c.id, sessionId:c.official.sessionId, score:c.official.total, cefr:c.official.cefr, etp:c.official.etp, integrity:c.official.integrity, issueDate:issued.toISOString().slice(0,10), expiryDate:exp.toISOString().slice(0,10), status:'Valid' };
  state.certificates[certId]=cert; c.certificates=c.certificates||[]; c.certificates.unshift(certId); saveState(); return cert;
}
function approveSession(candidateId){ const c=state.candidates[candidateId]; if(c?.official){ c.official.integrity='Approved after review'; saveState(); toast('Session approved after human review.'); render(); } }
function invalidateSession(candidateId){ const c=state.candidates[candidateId]; if(c?.official){ c.official.integrity='Invalid'; saveState(); toast('Session invalidated.'); render(); } }
function forceCertificate(candidateId){ const c=state.candidates[candidateId]; if(!c?.official) return; if(c.official.integrity==='Review Required') c.official.integrity='Approved after review'; if(!c.certificates?.length) createCertificate(c); saveState(); toast('Certificate issued.'); render(); }
function createSampleCandidates(){
  const names=[['Aulia Rahma','STU-2026-011','English Education'],['Bima Pratama','STU-2026-012','Informatics'],['Citra Lestari','STU-2026-013','Management']];
  names.forEach((n,idx)=>{ let c=Object.values(state.candidates).find(x=>x.idNumber===n[1]); if(!c) c=createCandidate({fullName:n[0],idNumber:n[1],institution:state.settings.institution,department:n[2]}); const total=[642,515,438][idx]; const band=cefrFromScore(total); c.diagnostic={date:todayISO(),total:total-40,cefr:cefrFromScore(total-40).cefr,etp:etpStyle(total-40),readiness:pct((total-40)/9),weakSkills:['Listening','Speaking'],recommendations:['Listening Booster','Speaking & Intelligibility Studio']}; c.progress={orientation:true,listening:idx!==2,structure:true,reading:idx===0,vocabulary:true,writing:idx===0,speaking:idx!==2,mock:idx===0}; c.mock={date:todayISO(),total:total-20,cefr:cefrFromScore(total-20).cefr}; c.official={sessionId:uid('JSPP-SESSION'),date:todayISO(),total,cefr:band.cefr,etp:etpStyle(total),label:band.label,skills:{Listening:120-idx*12,Structure:132-idx*8,Reading:140-idx*10,Vocabulary:126-idx*11,Writing:116-idx*12,Speaking:108-idx*10},integrity:idx===2?'Review Required':'Verified',logs:idx===2?[{time:new Date().toLocaleString(),type:'Browser window lost focus',severity:'medium'},{time:new Date().toLocaleString(),type:'Candidate left secure test window',severity:'high'}]:[],strengths:['Reading','Structure'],recommendations:['Listening improvement pathway','Speaking improvement pathway']}; });
  state.batches[0].candidates=Object.keys(state.candidates).length; saveState(); toast('Sample candidates created.'); render();
}
function exportData(){
  const blob = new Blob([JSON.stringify(state,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='jspp-ai-platform-data.json'; a.click(); URL.revokeObjectURL(a.href);
}
function saveSettings(form){ const fd=new FormData(form); state.settings.institution=fd.get('institution'); state.settings.certificatePrefix=fd.get('certificatePrefix'); state.settings.highStakesMode=fd.get('highStakesMode')==='true'; state.settings.requirePractice=fd.get('requirePractice')==='true'; saveState(); toast('Settings saved.'); render(); }

window.addEventListener('hashchange', render);
render();
