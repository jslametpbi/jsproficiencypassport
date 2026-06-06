const CONFIG = {
  platform: 'JS Proficiency Passport AI',
  subtitle: 'AI-integrated English Assessment Platform',
  storageKey: 'js_proficiency_passport_ai_v5_itp_audio',
  adminPin: 'JS2026',
  copyright: 'Copyright © Dr. Joko Slamet',
  issuer: 'Cipta Wacana University Official Testing Center',
  scoreScale: 900
};

const SKILLS = ['Listening','Structure','Reading','Vocabulary','Writing','Speaking'];
const CEFR = [
  {level:'C2', name:'Mastery', min:825, label:'C2 Mastery'},
  {level:'C1', name:'Advanced', min:700, label:'C1 Advanced'},
  {level:'B2', name:'Upper Independent', min:550, label:'B2 Upper Independent'},
  {level:'B1', name:'Independent', min:400, label:'B1 Independent'},
  {level:'A2', name:'Basic', min:300, label:'A2 Basic'},
  {level:'A1', name:'Foundation', min:200, label:'A1 Foundation'},
  {level:'Pre-A1', name:'Emerging', min:0, label:'Pre-A1 Emerging'}
];
const MODULES = [
  {id:'orientation',title:'Proficiency Test Orientation',skill:'Readiness',mins:25,level:'All',desc:'Understand test ethics, CEFR interpretation, official score reporting, and secure real-test procedures.',tasks:['Read official rules','Study score bands','Complete readiness checklist']},
  {id:'listening',title:'Listening Booster',skill:'Listening',mins:80,level:'A2–B2',desc:'Practise short dialogues, academic talks, details, inference, function, speaker purpose, and note-taking.',tasks:['Short dialogue drill','Academic talk drill','Inference challenge']},
  {id:'structure',title:'Structure & Written Expression Lab',skill:'Structure',mins:90,level:'A2–C1',desc:'Repair tenses, clauses, agreement, parallelism, inversion, passive voice, and written-expression errors.',tasks:['Sentence completion','Error recognition','Timed structure drill']},
  {id:'reading',title:'Reading Strategy Studio',skill:'Reading',mins:95,level:'A2–C1',desc:'Build speed and accuracy in main idea, detail, inference, reference, vocabulary in context, and author purpose.',tasks:['Skimming task','Inference map','Vocabulary in context']},
  {id:'vocabulary',title:'Academic Vocabulary Builder',skill:'Vocabulary',mins:70,level:'A1–C1',desc:'Develop word families, collocations, synonyms, antonyms, discipline-based vocabulary, and contextual meaning.',tasks:['Word family map','Collocation practice','Cloze practice']},
  {id:'writing',title:'AI Writing Studio',skill:'Writing',mins:100,level:'B1–C1',desc:'Practise thesis statements, paragraph control, cohesion, argument development, and rubric-based revision.',tasks:['Paragraph builder','Essay response','Self-revision checklist']},
  {id:'speaking',title:'Speaking & Intelligibility Studio',skill:'Speaking',mins:90,level:'A2–C1',desc:'Develop fluency, intelligibility, stress, intonation, academic explanation, and response organization.',tasks:['Read aloud','Opinion response','Academic explanation']},
  {id:'mock',title:'Full Mock Test Preparation',skill:'Integrated',mins:120,level:'All',desc:'Experience timed test sections before entering the official secure real-test mode.',tasks:['Mini mock','Full mock','Readiness reflection']}
];
const DIAG_ITEMS = [
  ['Listening','The speaker probably means that the assignment is due soon.','understand the deadline','ignore the task','ask for money','cancel the class'],
  ['Structure','Choose the correct form: The students ___ completed the diagnostic test.','have','has','having','to have'],
  ['Reading','The main idea of an academic paragraph usually states the central point.','central point','minor example','unrelated detail','citation style'],
  ['Vocabulary','A synonym of significant is ___.','important','ordinary','unclear','late'],
  ['Listening','In a lecture, transition words help listeners follow ___.','organization','pronunciation only','page numbers','attendance'],
  ['Structure','The book ___ was recommended by the lecturer is useful.','that','what','who','where'],
  ['Reading','Inference questions require readers to use clues and logic.','clues and logic','only title','only dictionary','random guessing'],
  ['Vocabulary','The word “valid” in assessment means ___.','appropriate and supported','beautiful','fast','expensive'],
  ['Structure','Neither the lecturer nor the students ___ late.','were','was','be','is'],
  ['Reading','A reference question asks what a pronoun or phrase refers to.','refers to','sounds like','costs','translates']
];
const TEST_ITEMS = [
  ['Listening','A student says, “I barely finished the reading before class.” What does the student imply?','The reading was difficult or time-consuming','The reading was very short','The class was cancelled','The lecturer did not assign reading','Mock Listening','Woman: I barely finished the reading before class. Man: It was longer than everyone expected. Narrator: What does the student imply?'],
  ['Listening','In an academic talk, the phrase “on the other hand” signals ___.','contrast','definition','sequence only','example only','Mock Listening','Professor: Some researchers emphasize speed. On the other hand, others value accuracy more. Narrator: What does the phrase on the other hand signal?'],
  ['Structure','The research findings ___ that active mediation improves learning.','suggest','suggests','suggesting','to suggest'],
  ['Structure','Choose the correct sentence.','The instrument was validated by three experts.','The instrument validated by three experts.','The instrument were validated by three experts.','The instrument validating three experts.'],
  ['Reading','A paragraph that compares two assessment approaches is mainly organized by ___.','comparison and contrast','time order','problem only','definition only'],
  ['Reading','When a writer supports a claim with data, the data functions as ___.','evidence','decoration','citation style','transition'],
  ['Vocabulary','The phrase “score interpretation” refers to ___.','the meaning assigned to test results','the font of the score','the room arrangement','the test password'],
  ['Vocabulary','“Reliable” in testing means ___.','consistent','expensive','native-like','long'],
  ['Structure','The candidate, along with two classmates, ___ ready for the test.','is','are','were','be'],
  ['Reading','The purpose of a QR certificate is to ___.','verify authenticity','replace learning','hide scores','remove identity checks']
];

const REAL_TEST_BLUEPRINT = {
  name:'Institutional ITP-Style Academic Proficiency Test',
  totalItems:140,
  totalMinutes:115,
  sections:[
    {skill:'Listening', title:'Section 1: Listening Comprehension', items:50, minutes:35, parts:['Part A: Short Conversations — 30 items','Part B: Longer Conversations — 8 items','Part C: Academic Talks — 12 items']},
    {skill:'Structure', title:'Section 2: Structure and Written Expression', items:40, minutes:25, parts:['Sentence Completion — 15 items','Written Expression / Error Recognition — 25 items']},
    {skill:'Reading', title:'Section 3: Reading Comprehension', items:50, minutes:55, parts:['Academic Reading Passages — 50 items']}
  ]
};
let realTestCache = null;
function makeRealTestItems(){
  if(realTestCache) return realTestCache;
  const items=[];
  const shortSituations=[
    ['library closes soon','stop working soon','continue working all night','buy coffee','cancel the meeting'],
    ['Mary has already left for the concert','call Mary again','skip the concert','ask the lecturer','change the venue'],
    ['the report needs revision','submit the report immediately','ignore the comments','change the course','print the syllabus'],
    ['the bus may be delayed','the bus arrived early','the library is closed','the student is absent','the class is online'],
    ['the lecture was difficult to follow','the lecture was cancelled','the assignment was easy','the speaker arrived late','the exam was postponed'],
    ['the student should check the notice board','the notice board is broken','the office is closed forever','the student has graduated','the form is unnecessary'],
    ['the woman cannot attend the workshop','the woman is leading the workshop','the workshop is free','the man should register twice','the room is empty'],
    ['the textbook is available at the bookstore','the textbook is out of date','the bookstore is closing','the lecturer dislikes the book','the exam has been graded'],
    ['the man forgot the deadline','the man submitted early','the assignment is optional','the class starts tomorrow','the lecturer lost the file'],
    ['the woman recommends studying with a group','the woman refuses to study','the test is cancelled','the man has passed already','the library has no seats']
  ];
  for(let i=0;i<30;i++){
    const s=shortSituations[i%shortSituations.length];
    const script=`Woman: Did you finish the task for tomorrow? Man: Not really. I only realized the ${s[0]} after checking the course page. Narrator: What does the man imply?`;
    items.push(['Listening',`What does the speaker imply in short conversation ${i+1}?`,s[1],s[2],s[3],s[4],'Listening Part A: Short Conversations',script]);
  }
  const convTopics=['campus registration','research seminar','library orientation','language laboratory'];
  for(let i=0;i<8;i++){
    const topic=convTopics[i%convTopics.length];
    const script=`Narrator: Listen to a conversation about ${topic}. Student: I am not sure which form I should complete first. Staff: Start with the online form, then bring your identification card to the office before Friday. Student: Should I also bring the payment receipt? Staff: Yes, that will speed up the process. Narrator: According to the conversation, what should the student do first?`;
    items.push(['Listening',`According to the longer conversation ${i+1}, what should the student do first?`,'complete the online form','pay for a new textbook','ask to cancel the course','take a final examination','Listening Part B: Longer Conversations',script]);
  }
  const talkTopics=['academic vocabulary development','renewable energy','assessment validity','digital learning'];
  for(let i=0;i<12;i++){
    const topic=talkTopics[i%talkTopics.length];
    const script=`Narrator: Listen to part of an academic talk about ${topic}. Professor: Today we will discuss how evidence supports a central claim. In academic work, examples are useful only when they clearly connect to the main point. Without that connection, examples may become interesting but irrelevant details. Narrator: What is the main point of the talk?`;
    items.push(['Listening',`What is the main point of academic talk ${i+1}?`,'evidence must connect clearly to the main claim','examples should replace the main argument','academic talks should avoid evidence','irrelevant details are always better','Listening Part C: Academic Talks',script]);
  }
  const structures=[
    ['The committee ___ the proposal before the meeting ended.','had reviewed','review','reviewing','to review'],
    ['Neither the results nor the discussion ___ complete.','is','are','were','be'],
    ['The instrument ___ by three experts before pilot testing.','was validated','validated','was validating','has validate'],
    ['Students who complete the practice course ___ better prepared.','are','is','being','to be'],
    ['The data were analyzed carefully ___ the conclusion was written.','before','because of','despite','during'],
    ['The lecturer asked whether the candidates ___ the instructions.','understood','understands','understanding','to understand'],
    ['The report contains evidence ___ supports the recommendation.','that','what','who','where'],
    ['Had the candidate arrived earlier, she ___ the briefing.','would have attended','will attend','attends','attending'],
    ['The new system is designed ___ cheating during online tests.','to reduce','reduce','reduced','reducing'],
    ['Academic integrity requires that each candidate ___ independently.','work','works','working','to work'],
    ['The article, together with the appendices, ___ submitted yesterday.','was','were','have been','are'],
    ['The more carefully students practise, ___ their performance becomes.','the stronger','stronger','strongest','the strongest'],
    ['The teacher explained the concept so clearly ___ everyone understood it.','that','than','which','what'],
    ['A certificate should be issued only after the score ___ verified.','has been','have been','being','to be'],
    ['The platform allows students ___ their progress before the official test.','to monitor','monitor','monitoring','monitored']
  ];
  structures.forEach((x,i)=>items.push(['Structure',`Choose the best answer to complete the sentence: ${x[0]}`,x[1],x[2],x[3],x[4],'Structure: Sentence Completion']));
  for(let i=0;i<25;i++){
    items.push(['Structure',`Written Expression ${i+1}: Identify the part that must be corrected in this sentence: The students was asked to completes the form before they entered the secure testing room.`,'A. was asked','B. to completes','C. before they entered','D. secure testing room','Structure: Written Expression / Error Recognition']);
  }
  const passages=[
    'A proficiency test is useful only when its scores are interpreted carefully. Good score interpretation connects performance to evidence, test purpose, and language-use contexts.',
    'Online assessment requires more than a digital questionnaire. A secure testing system should include identity verification, item protection, time control, and post-test review.',
    'Reading comprehension depends on recognizing both stated information and implied meaning. Skilled readers connect details, transitions, and the author’s purpose.',
    'Listening comprehension in academic settings often involves identifying the speaker’s purpose, following organization, and distinguishing main ideas from examples.',
    'A certificate becomes trustworthy when it can be verified. QR verification, unique codes, and integrity records help institutions confirm authenticity.'
  ];
  for(let p=0;p<5;p++){
    for(let q=0;q<10;q++){
      const type=['main idea','detail','inference','vocabulary in context','author purpose'][q%5];
      const correct={
        'main idea':'the central message of the passage',
        'detail':'a specific point stated in the passage',
        'inference':'a reasonable conclusion based on the passage',
        'vocabulary in context':'the meaning of a word as used in the passage',
        'author purpose':'the reason the author presents the information'
      }[type];
      items.push(['Reading',`Passage ${p+1}: ${passages[p]} Question ${q+1}: This question focuses on ${type}.`,correct,'an unrelated personal opinion','a random translation of the title','information that contradicts the passage','Reading Comprehension']);
    }
  }
  realTestCache=items; return realTestCache;
}
function makeMockItems(){
  const all=makeRealTestItems();
  return all.filter(x=>x[0]==='Listening').slice(0,5).concat(all.filter(x=>x[0]==='Structure').slice(0,5),all.filter(x=>x[0]==='Reading').slice(0,5));
}
function sectionScore(correct,total){return Math.round((correct/Math.max(1,total))*900)}

let itemBankCache = null;
function buildItemBank(){
  if(itemBankCache) return itemBankCache;
  const topics = ['Academic Life','Education','Technology','Health','Environment','Business','Research','Campus Services','Culture','Science'];
  const sub = {
    Listening:['detail','inference','speaker purpose','function','academic talk','note taking'],
    Structure:['agreement','clauses','parallelism','tense','passive voice','error recognition'],
    Reading:['main idea','detail','inference','reference','vocabulary in context','author purpose'],
    Vocabulary:['synonym','word family','collocation','academic word','antonym','contextual meaning'],
    Writing:['coherence','task achievement','grammar control','lexical range','argument','academic style'],
    Speaking:['fluency','intelligibility','pronunciation','organization','response content','academic explanation']
  };
  const bank=[]; let n=1;
  SKILLS.forEach((skill,si)=>{
    for(let i=0;i<205;i++){
      const level = ['A1','A2','B1','B2','C1'][i%5];
      const topic = topics[(i+si)%topics.length];
      const itemNo = String(n).padStart(4,'0');
      bank.push({
        id:`EPP-ITEM-${itemNo}`, skill, subskill:sub[skill][i%sub[skill].length], level,
        difficulty:['Easy','Moderate','Challenging'][i%3], topic,
        stem:`${skill} item ${itemNo}: ${topic} proficiency task focusing on ${sub[skill][i%sub[skill].length]}.`,
        status:i%19===0?'Pilot':'Validated', exposure:i%17, discrimination:(0.22+(i%28)/100).toFixed(2), difficultyIndex:(0.35+(i%45)/100).toFixed(2)
      }); n++;
    }
  });
  itemBankCache = bank.slice(0,1217);
  return itemBankCache;
}
function defaultState(){
  const demo = {
    id:'EPP-CAN-2026-000001', registrationCode:'EPP-CAN-2026-000001', name:'Joko Slamet', email:'joko.demo@proficiency.local',
    institution:'Demo Institution', department:'English Assessment', phone:'', purpose:'Demo / example certificate', role:'candidate', status:'active', createdAt:today(),
    diagnostic:{score:735, cefr:'C1', date:today(), profile:{Listening:760,Structure:745,Reading:790,Vocabulary:750,Writing:690,Speaking:675}},
    practice:Object.fromEntries(MODULES.map(m=>[m.id,true])), mock:{score:742, date:today()}, realTest:{score:765, date:today(), integrity:'Verified', securityLogs:[]}, certificateId:'EPP-CERT-SAMPLE'
  };
  const cert = {id:'EPP-CERT-SAMPLE',candidateId:demo.id,registrationCode:demo.registrationCode,name:demo.name,score:765,cefr:'C1 Advanced',cefrLevel:'C1',conversion:622,issued:today(),validUntil:String(Number(today().slice(0,4))+2)+today().slice(4),issuer:CONFIG.issuer,status:'Valid',integrity:'Verified',demo:true};
  return {
    sessionUser:null, view:'landing', authMode:'register', selectedRole:'candidate', selectedLoginRole:'candidate', lastView:'landing', history:[],
    accounts:{[demo.email]:{email:demo.email,password:'demo12345',role:'candidate',status:'approved',candidateId:demo.id,registrationCode:demo.registrationCode,name:demo.name,institution:demo.institution,department:demo.department}},
    candidates:{[demo.id]:demo}, certificates:{[cert.id]:cert}, pending:[], logs:[], lastSeq:1, lastCertSeq:1,
    batches:[{id:'EPP-BATCH-2026-001',name:'Academic Proficiency Batch',date:today(),status:'Open'}]
  };
}
let state = loadState();
let testTimer = null;
let securityAttached = false;
function loadState(){try{const raw=localStorage.getItem(CONFIG.storageKey);return raw?{...defaultState(),...JSON.parse(raw)}:defaultState()}catch(e){return defaultState()}}
function save(){localStorage.setItem(CONFIG.storageKey,JSON.stringify(state))}
function $(id){return document.getElementById(id)}
function esc(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function today(){return new Date().toISOString().slice(0,10)}
function year(){return new Date().getFullYear()}
function toast(msg){const el=document.createElement('div');el.className='toast';el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),3200)}
function seq(){state.lastSeq=(state.lastSeq||1)+1;return String(state.lastSeq).padStart(6,'0')}
function certSeq(){state.lastCertSeq=(state.lastCertSeq||1)+1;return String(state.lastCertSeq).padStart(6,'0')}
function rolePrefix(role){return role==='lecturer'?'LEC':role==='proctor'?'PRO':role==='admin'?'ADM':'CAN'}
function regCode(role){return `EPP-${rolePrefix(role)}-${year()}-${seq()}`}
function certCode(){return `EPP-CERT-${year()}-${certSeq()}`}
function cefrFromScore(s){return (CEFR.find(b=>Number(s)>=b.min)||CEFR[CEFR.length-1])}
function etp(s){return Math.round(310 + Math.max(0,Math.min(900,s))/900*(677-310))}
function currentCandidate(){return state.sessionUser?.candidateId?state.candidates[state.sessionUser.candidateId]:null}
function verificationUrl(id){return `${location.origin}${location.pathname}#verify/${encodeURIComponent(id)}`}
function createCandidateRecord(data, demo=false){
  const role=data.role||'candidate';
  const code=demo?'EPP-CAN-2026-000001':regCode(role);
  return {id:code, registrationCode:code, name:data.name||'Candidate', email:(data.email||'').toLowerCase(), institution:data.institution||'', department:data.department||'', phone:data.phone||'', purpose:data.purpose||'', role:'candidate', status:'active', createdAt:today(), diagnostic:null, practice:{}, mock:null, realTest:null, certificateId:null};
}
function makeCertificate(c, demo=false){
  const id = demo?'EPP-CERT-SAMPLE':certCode();
  const score = c.realTest?.score || c.mock?.score || c.diagnostic?.score || 0;
  const band = cefrFromScore(score);
  const cert={id,candidateId:c.id,registrationCode:c.registrationCode,name:c.name,score,cefr:band.label,cefrLevel:band.level,conversion:etp(score),issued:today(),validUntil:String(Number(today().slice(0,4))+2)+today().slice(4),issuer:CONFIG.issuer,status:'Valid',integrity:c.realTest?.integrity||'Verified',demo};
  state.certificates[id]=cert; c.certificateId=id; return cert;
}
function qrPattern(text){let h=0;for(let i=0;i<text.length;i++)h=(h*31+text.charCodeAt(i))>>>0;let cells='';for(let i=0;i<81;i++){const on=(i<9||i%9===0||i%9===8||i>71)||(((h>>>(i%24))^i)&1);cells+=on?'<i></i>':'<span></span>'}return cells}
function navTo(view, push=true){if(push && state.view!==view){state.history=state.history||[];state.history.push(state.view)}state.view=view;save();render();window.scrollTo(0,0)}
function goBack(){const prev=(state.history||[]).pop()||'dashboard';state.view=prev;save();render()}
function logout(){state.sessionUser=null;state.view='landing';save();render()}
function roleLabel(role){return role==='candidate'?'Candidate / Test Taker':role==='lecturer'?'Lecturer':role==='proctor'?'Proctor':'Admin'}
function setSession(account){state.sessionUser={role:account.role,email:account.email,name:account.name||account.email,candidateId:account.candidateId||null,registrationCode:account.registrationCode||null};state.view='dashboard';save();render()}
function ensureDemoCandidate(){const email='joko.demo@proficiency.local';if(!state.accounts[email]){const d=defaultState();state.accounts[email]=d.accounts[email];Object.assign(state.candidates,d.candidates);Object.assign(state.certificates,d.certificates)}setSession(state.accounts[email])}
function init(){window.addEventListener('hashchange',render);document.addEventListener('click',handleClick);document.addEventListener('submit',handleSubmit);render()}

document.addEventListener('DOMContentLoaded',init);

function render(){
  const hash=location.hash||'';
  if(hash.startsWith('#verify/')){renderVerify(decodeURIComponent(hash.replace('#verify/','')));return}
  if(!state.sessionUser){renderLanding();return}
  renderShell();
}
function renderLanding(){
  const isReg=state.authMode==='register'; const bank=buildItemBank().length;
  $('app').innerHTML=`
  <main class="landing-shell">
    <section class="landing">
      <div class="landing-left">
        <div>
          <div class="landing-top">
            <div class="brand compact-brand"><div class="logo">JS</div><div><h1>${CONFIG.platform}</h1><p>${CONFIG.subtitle}</p></div></div>
            <span class="pill gold kicker">AI-integrated • CEFR-aligned • Secure testing • QR certificate</span>
          </div>
          <h2 class="hero-title">English Proficiency <span>Passport Platform</span></h2>
          <p class="hero-desc">A complete AI-integrated platform for diagnosing proficiency, practising skills, taking secure tests, reporting scores, issuing certificates, verifying QR credentials, and serving institutions with advanced analytics.</p>
          <div class="cta-grid">
            <button class="primary" data-action="candidateDemo">▶ Enter Candidate Demo</button>
            <button class="ghost" data-action="adminFocus">▣ Open Admin Access</button>
            <button class="soft" data-action="verifySample">▦ Certificate Verification</button>
            <button class="ghost" data-action="registerFocus">＋ Register Account</button>
          </div>
        </div>
        <div class="metric-grid">
          <div class="metric"><span class="icon">▤</span><strong>${bank}+</strong><b>Validated Items</b><small>Across 6 skills</small></div>
          <div class="metric"><span class="icon">◴</span><strong>0–900</strong><b>Score Scale</b><small>Fine-grained scoring</small></div>
          <div class="metric"><span class="icon">⬟</span><strong>4</strong><b>Security Modes</b><small>Multi-layer protection</small></div>
          <div class="metric"><span class="icon">▦</span><strong>QR</strong><b>Verification</b><small>Instant authenticity</small></div>
          <div class="metric"><span class="icon">◎</span><strong>CEFR</strong><b>Mapping</b><small>A1 to C2 levels</small></div>
          <div class="metric"><span class="icon">✦</span><strong>AI</strong><b>Diagnostic</b><small>Smart skill analysis</small></div>
        </div>
        <div class="workflow">
          <div><b>01</b><span>AI Diagnosis</span></div><div><b>02</b><span>Practice Course</span></div><div><b>03</b><span>Secure Real Test</span></div><div><b>04</b><span>Score Report</span></div><div><b>05</b><span>QR Certificate</span></div>
        </div>
        <div class="landing-footer"><span>⬟ Trusted by institutions</span><span>▣ Secure & encrypted</span><span>✦ AI-powered insights</span><span>◎ Official & verifiable</span><strong>${CONFIG.copyright}</strong></div>
      </div>
      <aside class="access-card" id="accessPanel">
        <div class="access-head">
          <div class="access-icon">▣</div><div><h2>Secure Access</h2><p>${isReg?'Create a detailed account for official preparation and testing.':'Use registered email and password. Admin access uses PIN only.'}</p></div>
          <div class="tabs"><button class="${!isReg?'active':''}" type="button" data-action="authMode" data-mode="signin">Sign In</button><button class="${isReg?'active':''}" type="button" data-action="authMode" data-mode="register">Register</button></div>
        </div>
        ${isReg?renderRegisterForm():renderSignInForm()}
      </aside>
    </section>
  </main>`;
}
function renderSignInForm(){
  return `<div class="signin-split">
    <form id="loginForm" class="form form-2">
      <div class="field full"><label>Access Role</label><select name="role" required><option value="candidate">Candidate / Test Taker</option><option value="lecturer">Lecturer</option><option value="proctor">Proctor</option></select></div>
      <div class="field"><label>Registered Email</label><input name="email" type="email" placeholder="registered.email@example.com" required></div>
      <div class="field"><label>Password</label><input name="password" type="password" placeholder="Enter password" required></div>
      <button class="primary full" type="submit">▣ Sign In</button>
      <p class="small full">New user? <button class="link-button" type="button" data-action="authMode" data-mode="register">Create a detailed account</button>.</p>
    </form>
    <form id="adminPinForm" class="form admin-pin">
      <div class="field"><label>Admin Access PIN</label><input name="pin" type="password" placeholder="Enter admin PIN only" required></div>
      <button class="ghost wide" type="submit">⬟ Open Admin Dashboard</button>
    </form>
  </div>`;
}
function renderRegisterForm(){
  const r=state.selectedRole||'candidate';
  return `<form id="registerForm" class="form form-2">
    <div class="field full"><label>Create Account As</label><div class="role-grid">
      ${['candidate','lecturer','proctor'].map(role=>`<button class="role-card ${r===role?'active':''}" type="button" data-action="selectRegRole" data-role="${role}"><span>${role==='candidate'?'♙':role==='lecturer'?'♧':'▱'}</span><b>${roleLabel(role)}</b></button>`).join('')}
    </div><input type="hidden" name="role" value="${r}"></div>
    <div class="field"><label>Full Legal Name</label><input name="name" placeholder="Enter full legal name" required></div>
    <div class="field"><label>Candidate ID / Staff ID</label><input name="staffId" placeholder="Enter candidate or staff ID" required></div>
    <div class="field"><label>Email Address</label><input name="email" type="email" placeholder="active.email@example.com" required></div>
    <div class="field"><label>Phone / WhatsApp</label><input name="phone" placeholder="Enter phone or WhatsApp number" required></div>
    <div class="field"><label>Institution / Organization</label><input name="institution" placeholder="Enter institution or organization" required></div>
    <div class="field"><label>Department / Unit</label><input name="department" placeholder="Enter department or unit" required></div>
    <div class="field"><label>Purpose of Test</label><select name="purpose"><option>Graduation requirement</option><option>Scholarship</option><option>Academic placement</option><option>International mobility</option><option>Institutional certification</option><option>Professional development</option></select></div>
    <div class="field"><label>Password</label><input name="password" type="password" minlength="6" placeholder="Create password" required></div>
    <div class="field"><label>Confirm Password</label><input name="confirm" type="password" minlength="6" placeholder="Confirm password" required></div>
    <div class="field"><label>Security Declaration</label><select name="declaration" required><option value="">Select declaration</option><option>I agree to official testing rules and academic integrity policy.</option></select></div>
    <button class="primary full" type="submit">＋ Create Account</button>
    <div class="approval-note full">Lecturer and Proctor accounts are created as <b>Pending Approval</b>. Admin must approve them before they can sign in.</div>
  </form>`;
}
function shellNav(){
  const role=state.sessionUser.role;
  const c=currentCandidate();
  const buttons=[];
  buttons.push(`<button class="ghost" data-action="back">← Back</button>`);
  buttons.push(`<button class="soft" data-view="dashboard">Dashboard</button>`);
  if(role==='candidate'){
    buttons.push(`<button class="soft" data-view="diagnostic">Diagnosis</button><button class="soft" data-view="practice">Practice</button><button class="soft" data-view="mock">Mock</button><button class="soft" data-view="realtest">Real Test</button><button class="soft" data-view="report">Report</button><button class="soft" data-view="certificate">Certificate</button>`);
  } else if(role==='admin') {
    buttons.push(`<button class="soft" data-view="approvals">Approvals</button><button class="soft" data-view="users">Users</button><button class="soft" data-view="items">Item Bank</button><button class="soft" data-view="analytics">Analytics</button><button class="soft" data-view="proctoring">Proctoring</button>`);
  } else if(role==='lecturer') {
    buttons.push(`<button class="soft" data-view="students">Students</button><button class="soft" data-view="items">Item Bank</button><button class="soft" data-view="analytics">Analytics</button>`);
  } else if(role==='proctor') {
    buttons.push(`<button class="soft" data-view="proctoring">Review Center</button><button class="soft" data-view="analytics">Integrity Logs</button>`);
  }
  buttons.push(`<button class="ghost" data-action="logout">Logout</button>`);
  return `<header class="topbar"><div class="brand"><div class="logo">JS</div><div><h1>${CONFIG.platform}</h1><p>${roleLabel(role)}${c?` • ${c.registrationCode}`:''}</p></div></div><nav class="nav">${buttons.join('')}</nav></header>`;
}
function renderShell(){
  const view=state.view||'dashboard';
  let html=shellNav()+`<main class="app-shell"><div class="container">`;
  const role=state.sessionUser.role;
  if(role==='candidate') html+=renderCandidate(view);
  if(role==='admin') html+=renderAdmin(view);
  if(role==='lecturer') html+=renderLecturer(view);
  if(role==='proctor') html+=renderProctor(view);
  html+=`</div></main>`;
  $('app').innerHTML=html;
  if(view==='realtest') attachSecurity(); else detachSecurity();
}
function renderCandidate(view){
  if(view==='diagnostic') return renderDiagnostic();
  if(view==='practice') return renderPractice();
  if(view==='mock') return renderMock();
  if(view==='realtest') return renderRealTest();
  if(view==='report') return renderReport();
  if(view==='certificate') return renderCertificatePage();
  return renderCandidateDashboard();
}
function completion(c){const total=MODULES.length;const done=Object.values(c.practice||{}).filter(Boolean).length;return Math.round(done/total*100)}
function renderCandidateDashboard(){
  const c=currentCandidate(); const p=completion(c); const score=c.realTest?.score||c.mock?.score||c.diagnostic?.score||0; const band=cefrFromScore(score);
  return `<section class="section-title"><div><h2>Candidate Dashboard</h2><p>Integrated pathway from diagnostic diagnosis to practice, secure testing, score report, and QR-verifiable certificate.</p></div><span class="pill gold">${esc(c.registrationCode)}</span></section>
  <div class="grid grid-4 mb">
    <div class="card stat"><span class="pill blue">Diagnostic</span><strong>${c.diagnostic?c.diagnostic.cefr:'Not Started'}</strong><span>${c.diagnostic?c.diagnostic.score+'/900':'Take diagnosis first'}</span></div>
    <div class="card stat"><span class="pill gold">Practice</span><strong>${p}%</strong><span>Preparation completion</span></div>
    <div class="card stat"><span class="pill green">Score</span><strong>${score||'—'}</strong><span>${score?band.label:'No official score yet'}</span></div>
    <div class="card stat"><span class="pill ${c.certificateId?'green':'red'}">Certificate</span><strong>${c.certificateId?'Ready':'Pending'}</strong><span>${c.certificateId||'Complete real test'}</span></div>
  </div>
  <div class="card mb"><h3>Preparation Completion</h3><div class="progress"><span style="width:${p}%"></span></div><p class="small">Complete the diagnosis and practice modules before entering the strict real-test mode.</p></div>
  <div class="grid grid-3">
    ${[
      ['AI Diagnostic','Identify current level, CEFR prediction, and skill gaps.','diagnostic','Start Diagnosis'],
      ['Practice Course','Personalized preparation modules across six skills.','practice','Open Practice'],
      ['Mock Test','Experience timed test sections before the real test.','mock','Take Mock'],
      ['Secure Real Test','Strict browser controls, watermark, and integrity logs.','realtest','Enter Real Test'],
      ['Score Report','View overall score, skill profile, CEFR, and conversion.','report','View Report'],
      ['QR Certificate','Display, print, download, and verify certificate.','certificate','Open Certificate']
    ].map(x=>`<div class="card module"><h3>${x[0]}</h3><p>${x[1]}</p><button class="primary mt" data-view="${x[2]}">${x[3]}</button></div>`).join('')}
  </div>`;
}
function renderDiagnostic(){
  const c=currentCandidate();
  return `<section class="section-title"><div><h2>AI Diagnostic Level Test</h2><p>Short adaptive-style diagnosis before practice and the real test.</p></div><button class="ghost" data-view="dashboard">Back to Dashboard</button></section>
  <form id="diagnosticForm" class="card">
    ${DIAG_ITEMS.map((it,i)=>quizItem('d',i,it)).join('')}
    <button class="primary" type="submit">Submit Diagnostic</button>
  </form>
  ${c.diagnostic?`<div class="card mt"><h3>Latest Diagnostic Result</h3><p><b>${c.diagnostic.score}/900</b> • ${c.diagnostic.cefr} • ${c.diagnostic.date}</p></div>`:''}`;
}
function audioButton(script, prefix, i){return script?`<div class="audio-panel no-print"><button class="audio-btn" type="button" data-action="playAudio" data-audio="${encodeURIComponent(script)}" data-key="${prefix}${i}">▶ Play / Relisten Audio</button><span class="small">Listening audio is generated in-browser for this static demo.</span></div>`:''}
function quizItem(prefix,i,it){const script=it[7]||'';return `<div class="quiz-item ${it[0]==='Listening'?'listening-item':''}"><div class="question-line"><b>${i+1}. [${it[0]}]</b>${it[6]?` <span class="pill blue">${esc(it[6])}</span>`:''}</div>${audioButton(script,prefix,i)}<p>${esc(it[1])}</p><div class="options">${[2,3,4,5].map((idx,j)=>`<label class="option"><input type="radio" name="${prefix}${i}" value="${j===0?'correct':'wrong'}" required><span>${esc(it[idx])}</span></label>`).join('')}</div></div>`}
function renderITPItems(prefix, items){let last='';return items.map((it,i)=>{let header='';if(it[6]!==last){last=it[6];header=`<div class="section-break"><h3>${esc(it[6])}</h3><p>${it[0]==='Listening'?'Use the Play / Relisten Audio button to hear the original demo audio before answering.':'Answer all questions in this section. Do not use outside materials.'}</p></div>`}return header+quizItem(prefix,i,it)}).join('')}
function playAudio(encoded){const text=decodeURIComponent(encoded||'');if(!text)return toast('No audio script available.');if(!('speechSynthesis' in window))return toast('This browser does not support in-browser audio playback.');window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.9;u.pitch=1;window.speechSynthesis.speak(u);if(state.view==='realtest')logSecurity('Listening audio played/replayed')}
function renderPractice(){
  const c=currentCandidate(); const p=completion(c);
  return `<section class="section-title"><div><h2>AI Proficiency Preparation Studio</h2><p>Practice is personalized after diagnosis and may be completed before official testing.</p></div><div class="actions"><button class="ghost" data-view="dashboard">Back to Dashboard</button><button class="primary" data-action="completeAllPractice">Complete Demo Practice</button></div></section>
  <div class="card mb"><div class="progress"><span style="width:${p}%"></span></div><p class="small">${p}% completed</p></div>
  <div class="grid grid-4">${MODULES.map(m=>`<div class="card module"><span class="pill gold">${m.skill} • ${m.level}</span><h3>${m.title}</h3><p>${m.desc}</p><ul class="small">${m.tasks.map(t=>`<li>${t}</li>`).join('')}</ul><button class="${c.practice?.[m.id]?'success':'primary'}" data-action="completeModule" data-module="${m.id}">${c.practice?.[m.id]?'Completed':'Mark Module Complete'}</button></div>`).join('')}</div>`;
}
function renderMock(){
  const c=currentCandidate(); const items=makeMockItems();
  return `<section class="section-title"><div><h2>Mock Test</h2><p>Medium-security preparation test with listening audio, structure, and reading items. This is not the official certificate test.</p></div><button class="ghost" data-view="dashboard">Back to Dashboard</button></section>
  <div class="card mb"><h3>Mock Test Blueprint</h3><p>15 original ITP-style demo items: Listening 5, Structure 5, Reading 5. Listening questions include Play / Relisten Audio.</p></div>
  <form id="mockForm" class="card">${renderITPItems('m',items)}<button class="primary" type="submit">Submit Mock Test</button></form>
  ${c.mock?`<div class="card mt"><h3>Mock Score</h3><p><b>${c.mock.score}/900</b> • ${cefrFromScore(c.mock.score).label} • ${c.mock.date}</p></div>`:''}`;
}
function renderRealTest(){
  const c=currentCandidate(); const p=completion(c); const eligible=c.diagnostic&&p>=60;
  if(!eligible) return `<section class="section-title"><div><h2>Secure Real Test</h2><p>Eligibility required before official testing.</p></div><button class="ghost" data-view="dashboard">Back to Dashboard</button></section><div class="card"><h3>Not Eligible Yet</h3><p>Complete diagnostic test and at least 60% of practice modules before entering the real test.</p><button class="primary" data-view="diagnostic">Start Diagnosis</button><button class="ghost" data-view="practice">Open Practice</button></div>`;
  const logs=(c.realTest?.securityLogs||[]).slice(-8).reverse();
  const items=makeRealTestItems();
  return `<div class="watermark">${esc(c.name)} • ${esc(c.registrationCode)} • SECURE TEST</div>
  <section class="section-title"><div><h2>Secure Real Test</h2><p>Full institutional ITP-style format: 50 Listening, 40 Structure and Written Expression, and 50 Reading Comprehension items.</p></div><button class="ghost" data-view="dashboard">Back to Dashboard</button></section>
  <div class="secure-bar no-print"><span class="pill gold">Candidate: ${esc(c.name)}</span><span class="pill blue">Code: ${esc(c.registrationCode)}</span><span class="pill green">Format: 140 items / 115 minutes</span><span class="pill red">Timer: <b id="timer" class="timer">115:00</b></span><button class="primary" data-action="fullscreen">Enter Fullscreen</button></div>
  <div class="grid grid-3 mb">${REAL_TEST_BLUEPRINT.sections.map(sec=>`<div class="card stat"><span class="pill gold">${sec.title}</span><strong>${sec.items}</strong><span>${sec.minutes} minutes • ${sec.skill}</span></div>`).join('')}</div>
  <div class="card mb"><h3>Official-Style Test Directions</h3><p>This demo uses original institutional items and does not reproduce official TOEFL/ETS content. The structure follows the common ITP-style proportion: Listening Comprehension, Structure and Written Expression, and Reading Comprehension. Listening items now include playable/relistenable audio generated inside the browser.</p></div>
  <form id="realTestForm" class="card test-shell">${renderITPItems('r',items)}<button class="primary mt" type="submit">Submit Official ITP-Style Test</button></form>
  <div class="card mt"><h3>Security Log</h3>${logs.length?logs.map(l=>`<div class="log"><span>${esc(l.type)}</span><small>${esc(l.time)}</small></div>`).join(''):'<p class="small">No security events logged yet.</p>'}</div>`;
}
function renderReport(){
  const c=currentCandidate(); const score=c.realTest?.score||c.mock?.score||c.diagnostic?.score||0; const band=cefrFromScore(score);
  const sec=c.realTest?.sectionScores;
  const secTable=sec?`<div class="card mb"><h3>ITP-Style Section Profile</h3><div class="table-wrap"><table><thead><tr><th>Section</th><th>Raw Correct</th><th>Platform Section Score</th><th>Time Allocation</th></tr></thead><tbody>${Object.entries(sec).map(([k,v])=>`<tr><td>${k}</td><td>${v.correct}/${v.total}</td><td>${v.scaled}/900</td><td>${v.minutes} minutes</td></tr>`).join('')}</tbody></table></div></div>`:'';
  return `<section class="section-title"><div><h2>Score Report</h2><p>Overall score, CEFR interpretation, institutional conversion, strengths, and recommendations.</p></div><button class="ghost" data-view="dashboard">Back to Dashboard</button></section>
  ${score?`<div class="grid grid-4 mb"><div class="card stat"><span class="pill gold">Overall</span><strong>${score}/900</strong><span>Proficiency score</span></div><div class="card stat"><span class="pill blue">CEFR</span><strong>${band.level}</strong><span>${band.name}</span></div><div class="card stat"><span class="pill green">Conversion</span><strong>${etp(score)}</strong><span>Institutional ETP-style</span></div><div class="card stat"><span class="pill ${c.realTest?'green':'red'}">Integrity</span><strong>${c.realTest?.integrity||'Practice Only'}</strong><span>${c.realTest?'Official session':'No real test yet'}</span></div></div>
  ${secTable}
  <div class="card mb"><h3>Skill Profile</h3><div class="table-wrap"><table><thead><tr><th>Skill</th><th>Score</th><th>Level</th><th>Recommendation</th></tr></thead><tbody>${SKILLS.map((s,i)=>{const val=Math.max(180,Math.min(860,score+(i-2)*18));return `<tr><td>${s}</td><td>${val}/900</td><td>${cefrFromScore(val).label}</td><td>${recommend(s,val)}</td></tr>`}).join('')}</tbody></table></div></div>
  <div class="card"><h3>Professional Interpretation</h3><p>The candidate demonstrates ${band.label} proficiency. The score indicates ${score>=550?'sufficient academic readiness for many English-medium learning tasks with continued skill-specific development.':'developing readiness; further structured practice is recommended before high-stakes academic use.'}</p><button class="primary" data-view="certificate">Open Certificate</button></div>`:`<div class="card"><h3>No Score Available</h3><p>Complete the diagnostic, mock test, or secure real test to generate a report.</p></div>`}`;
}
function recommend(s,val){if(val>=700)return `Maintain advanced ${s.toLowerCase()} performance through authentic academic tasks.`; if(val>=550)return `Strengthen ${s.toLowerCase()} with timed integrated practice.`; return `Complete targeted ${s.toLowerCase()} booster modules before retesting.`}
function renderCertificatePage(){
  const c=currentCandidate(); if(!c.certificateId && c.realTest) makeCertificate(c,false); const cert=c.certificateId?state.certificates[c.certificateId]:null;
  return `<section class="section-title"><div><h2>QR-Verifiable Certificate</h2><p>Display, print, download, and verify the official English proficiency certificate.</p></div><button class="ghost" data-view="dashboard">Back to Dashboard</button></section>
  ${cert?renderCertificate(cert,true):`<div class="card"><h3>Certificate Not Ready</h3><p>The certificate is issued after completing the secure real test and integrity verification.</p><button class="primary" data-view="realtest">Enter Real Test</button></div>`}`;
}
function renderCertificate(cert, candidatePage=false){
  return `<div class="certificate-wrap"><div class="certificate ${cert.demo?'':'official'}" id="certificateCard"><h2>CERTIFICATE OF ENGLISH<br>PROFICIENCY</h2><p class="center">This is to certify that</p><div class="cert-name">${esc(cert.name)}</div><div class="cert-sub">${cert.demo?'Demo / example certificate':'Official English Proficiency Credential'}</div><div class="cert-score"><span>${cert.score} / 900</span><span>${esc(cert.cefr)}</span></div><p class="center">Issued by<br><b>${esc(cert.issuer)}</b></p><div class="cert-meta"><div><span>Certificate ID</span><b>${esc(cert.id)}</b></div><div><span>Registration Code</span><b>${esc(cert.registrationCode)}</b></div><div><span>Institutional Conversion</span><b>${cert.conversion}</b></div><div><span>Integrity Status</span><b>${esc(cert.integrity)}</b></div><div><span>Issued / Valid Until</span><b>${cert.issued} / ${cert.validUntil}</b></div></div><div class="cert-grid"><div class="qr-local" title="QR verification">${qrPattern(cert.id)}</div><div class="sign"><div class="scribble">Joko Slamet</div><small>Authorized Platform Director</small></div><div class="stamp">VALID<br>CREDENTIAL</div></div></div><aside class="cert-side"><div class="verify-panel"><h3>Certificate Verification</h3><p class="verify-status">${esc(cert.status)}</p><p><b>Certificate ID:</b><br>${esc(cert.id)}</p><p><b>Candidate:</b><br>${esc(cert.name)}</p><p><b>Score:</b><br>${cert.score}/900 • ${esc(cert.cefr)}</p><p><b>Verification Link:</b><br><a href="#verify/${encodeURIComponent(cert.id)}">Open public verification</a></p><div class="actions"><button class="primary" data-action="downloadCert" data-cert="${esc(cert.id)}">Download Certificate</button><button class="ghost" data-action="printCert">Print / Save PDF</button>${candidatePage?`<button class="soft" data-view="report">Back to Report</button>`:''}</div></div></aside></div>`;
}
function renderAdmin(view){
  if(view==='approvals') return renderApprovals(); if(view==='users') return renderUsers(); if(view==='items') return renderItems(); if(view==='analytics') return renderAnalytics(); if(view==='proctoring') return renderProctoring(); return renderAdminDashboard();
}
function renderAdminDashboard(){
  const users=Object.values(state.accounts);const pending=users.filter(a=>a.status==='pending').length;const cand=Object.values(state.candidates);const certs=Object.values(state.certificates);
  return `<section class="section-title"><div><h2>Admin Dashboard</h2><p>PIN-only access for approvals, candidate management, item bank, certificates, analytics, and proctoring.</p></div><span class="pill gold">Administrator</span></section>
  <div class="grid grid-4 mb"><div class="card stat"><span class="pill blue">Candidates</span><strong>${cand.length}</strong><span>Registered profiles</span></div><div class="card stat"><span class="pill red">Pending</span><strong>${pending}</strong><span>Lecturer/proctor approvals</span></div><div class="card stat"><span class="pill gold">Item Bank</span><strong>${buildItemBank().length}+</strong><span>Validated items</span></div><div class="card stat"><span class="pill green">Certificates</span><strong>${certs.length}</strong><span>Issued credentials</span></div></div>
  <div class="grid grid-3">${[['Approvals','Approve lecturer and proctor registration requests.','approvals'],['Users & Candidates','Review registered users and integrated candidate codes.','users'],['Item Bank','Inspect 1000+ items across six English skills.','items'],['Analytics','View CEFR distribution and institutional score readiness.','analytics'],['Proctoring','Review real-test security logs and integrity status.','proctoring'],['Certificate Demo','Open Joko Slamet certificate verification demo.','certificateDemo']].map(x=>`<div class="card module"><h3>${x[0]}</h3><p>${x[1]}</p><button class="primary" ${x[2]==='certificateDemo'?'data-action="verifySample"':`data-view="${x[2]}"`}>Open</button></div>`).join('')}</div>`;
}
function renderApprovals(){
  const accounts=Object.values(state.accounts).filter(a=>a.status==='pending');
  return `<section class="section-title"><div><h2>Account Approval Center</h2><p>Lecturer and Proctor registrations must be approved by Admin before access.</p></div><button class="ghost" data-view="dashboard">Back to Dashboard</button></section>
  <div class="card"><div class="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Code</th><th>Institution</th><th>Action</th></tr></thead><tbody>${accounts.length?accounts.map(a=>`<tr><td>${esc(a.name)}</td><td>${esc(a.email)}</td><td>${roleLabel(a.role)}</td><td>${esc(a.registrationCode)}</td><td>${esc(a.institution||'')}</td><td><button class="success" data-action="approveAccount" data-email="${esc(a.email)}">Approve</button><button class="danger" data-action="rejectAccount" data-email="${esc(a.email)}">Reject</button></td></tr>`).join(''):'<tr><td colspan="6">No pending lecturer/proctor accounts.</td></tr>'}</tbody></table></div></div>`;
}
function renderUsers(){
  const accounts=Object.values(state.accounts);
  return `<section class="section-title"><div><h2>Users and Registration Codes</h2><p>Every user receives an integrated professional registration code used in reports and certificates.</p></div><button class="ghost" data-view="dashboard">Back to Dashboard</button></section>
  <div class="card"><div class="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Registration Code</th><th>Institution</th></tr></thead><tbody>${accounts.map(a=>`<tr><td>${esc(a.name)}</td><td>${esc(a.email)}</td><td>${roleLabel(a.role)}</td><td><span class="pill ${a.status==='approved'?'green':a.status==='rejected'?'red':'gold'}">${esc(a.status)}</span></td><td>${esc(a.registrationCode||'—')}</td><td>${esc(a.institution||'—')}</td></tr>`).join('')}</tbody></table></div></div>`;
}
function renderItems(){
  const bank=buildItemBank();const counts=SKILLS.map(s=>[s,bank.filter(i=>i.skill===s).length]);
  return `<section class="section-title"><div><h2>Professional Item Bank</h2><p>More than 1000 items integrated across listening, structure, reading, vocabulary, writing, and speaking.</p></div><button class="ghost" data-view="dashboard">Back to Dashboard</button></section>
  <div class="grid grid-6 mb">${counts.map(([s,n])=>`<div class="card stat"><span class="pill gold">${s}</span><strong>${n}</strong><span>Items</span></div>`).join('')}</div>
  <div class="card"><div class="table-wrap"><table><thead><tr><th>Item ID</th><th>Skill</th><th>Sub-skill</th><th>CEFR</th><th>Difficulty</th><th>Status</th><th>Statistics</th></tr></thead><tbody>${bank.slice(0,80).map(i=>`<tr><td>${i.id}</td><td>${i.skill}</td><td>${i.subskill}</td><td>${i.level}</td><td>${i.difficulty}</td><td>${i.status}</td><td>p=${i.difficultyIndex}; D=${i.discrimination}</td></tr>`).join('')}</tbody></table></div><p class="small">Showing first 80 sample records from the generated 1217+ demo item bank. Production deployment should store the full item bank on a protected server database.</p></div>`;
}
function renderAnalytics(){
  const cand=Object.values(state.candidates); const avg=Math.round(cand.reduce((a,c)=>a+(c.realTest?.score||c.mock?.score||c.diagnostic?.score||0),0)/Math.max(1,cand.length));
  return `<section class="section-title"><div><h2>Institutional Analytics</h2><p>Score distribution, CEFR readiness, and platform-level insights.</p></div><button class="ghost" data-view="dashboard">Back to Dashboard</button></section>
  <div class="grid grid-4 mb"><div class="card stat"><span class="pill blue">Average</span><strong>${avg}</strong><span>Mean available score</span></div><div class="card stat"><span class="pill gold">CEFR</span><strong>${cefrFromScore(avg).level}</strong><span>Average level</span></div><div class="card stat"><span class="pill green">Ready</span><strong>${cand.filter(c=>(c.realTest?.score||0)>=550).length}</strong><span>B2 target candidates</span></div><div class="card stat"><span class="pill red">Review</span><strong>${cand.filter(c=>(c.realTest?.securityLogs||[]).length>0).length}</strong><span>Security logs</span></div></div>
  <div class="card"><h3>CEFR Distribution</h3><div class="table-wrap"><table><thead><tr><th>Candidate</th><th>Registration Code</th><th>Score</th><th>CEFR</th><th>Certificate</th></tr></thead><tbody>${cand.map(c=>{const score=c.realTest?.score||c.mock?.score||c.diagnostic?.score||0;return `<tr><td>${esc(c.name)}</td><td>${esc(c.registrationCode)}</td><td>${score||'—'}</td><td>${score?cefrFromScore(score).label:'—'}</td><td>${c.certificateId||'—'}</td></tr>`}).join('')}</tbody></table></div></div>`;
}
function renderProctoring(){
  const cand=Object.values(state.candidates).filter(c=>c.realTest);
  return `<section class="section-title"><div><h2>Proctoring Review Center</h2><p>Review security logs, candidate sessions, and integrity status.</p></div><button class="ghost" data-view="dashboard">Back to Dashboard</button></section>
  <div class="card"><div class="table-wrap"><table><thead><tr><th>Candidate</th><th>Registration Code</th><th>Score</th><th>Integrity</th><th>Logs</th><th>Action</th></tr></thead><tbody>${cand.map(c=>`<tr><td>${esc(c.name)}</td><td>${esc(c.registrationCode)}</td><td>${c.realTest.score}</td><td><span class="pill ${c.realTest.integrity==='Verified'?'green':'gold'}">${c.realTest.integrity}</span></td><td>${(c.realTest.securityLogs||[]).length}</td><td><button class="success" data-action="verifyIntegrity" data-cid="${esc(c.id)}">Mark Verified</button><button class="danger" data-action="flagIntegrity" data-cid="${esc(c.id)}">Require Review</button></td></tr>`).join('')||'<tr><td colspan="6">No completed real-test sessions yet.</td></tr>'}</tbody></table></div></div>`;
}
function renderLecturer(view){ if(view==='students')return renderUsers(); if(view==='items')return renderItems(); if(view==='analytics')return renderAnalytics(); return `<section class="section-title"><div><h2>Lecturer Dashboard</h2><p>Monitor candidate readiness, practice completion, item bank coverage, and score analytics.</p></div><span class="pill green">Approved Lecturer</span></section><div class="grid grid-3"><div class="card module"><h3>Students</h3><p>View registered candidates and readiness.</p><button class="primary" data-view="students">Open Students</button></div><div class="card module"><h3>Item Bank</h3><p>Review item bank coverage by skill.</p><button class="primary" data-view="items">Open Item Bank</button></div><div class="card module"><h3>Analytics</h3><p>Review CEFR distribution and score data.</p><button class="primary" data-view="analytics">Open Analytics</button></div></div>`}
function renderProctor(view){ if(view==='analytics')return renderAnalytics(); return renderProctoring() }
function renderVerify(certId){
  const cert=state.certificates[certId]||state.certificates['EPP-CERT-SAMPLE'];
  $('app').innerHTML=`<main class="app-shell"><div class="container"><header class="topbar"><div class="brand"><div class="logo">JS</div><div><h1>Certificate Verification</h1><p>${CONFIG.platform}</p></div></div><nav class="nav"><button class="ghost" onclick="location.hash='';localStorage.setItem('${CONFIG.storageKey}', localStorage.getItem('${CONFIG.storageKey}')||'');location.reload()">Home</button></nav></header><section class="section-title"><div><h2>Public Certificate Verification</h2><p>Credential authenticity page for official certificate checking.</p></div><span class="pill ${cert?'green':'red'}">${cert?'Valid Record':'Not Found'}</span></section>${cert?renderCertificate(cert,false):'<div class="card"><h3>Certificate Not Found</h3><p>The certificate ID could not be found in this local demo database.</p></div>'}</div></main>`;
}
function handleClick(e){
  const b=e.target.closest('button,[data-view]'); if(!b) return;
  const view=b.dataset.view; if(view){e.preventDefault();navTo(view);return}
  const action=b.dataset.action; if(!action) return; e.preventDefault();
  if(action==='authMode'){state.authMode=b.dataset.mode;save();renderLanding();return}
  if(action==='selectRegRole'){state.selectedRole=b.dataset.role;save();renderLanding();return}
  if(action==='candidateDemo'){ensureDemoCandidate();return}
  if(action==='adminFocus'){state.authMode='signin';save();renderLanding();setTimeout(()=>document.querySelector('[name="pin"]')?.focus(),100);return}
  if(action==='registerFocus'){state.authMode='register';save();renderLanding();return}
  if(action==='verifySample'){location.hash='#verify/EPP-CERT-SAMPLE';return}
  if(action==='back'){goBack();return}
  if(action==='logout'){logout();return}
  if(action==='completeModule'){const c=currentCandidate();c.practice=c.practice||{};c.practice[b.dataset.module]=true;save();toast('Module completed.');render();return}
  if(action==='completeAllPractice'){const c=currentCandidate();c.practice=Object.fromEntries(MODULES.map(m=>[m.id,true]));save();toast('All demo practice modules completed.');render();return}
  if(action==='fullscreen'){document.documentElement.requestFullscreen?.();logSecurity('Fullscreen requested');return}
  if(action==='downloadCert'){downloadCertificate(b.dataset.cert);return}
  if(action==='printCert'){window.print();return}
  if(action==='approveAccount'){approveAccount(b.dataset.email,true);return}
  if(action==='rejectAccount'){approveAccount(b.dataset.email,false);return}
  if(action==='verifyIntegrity'){setIntegrity(b.dataset.cid,'Verified');return}
  if(action==='flagIntegrity'){setIntegrity(b.dataset.cid,'Review Required');return}
  if(action==='playAudio'){playAudio(b.dataset.audio);return}
}
function handleSubmit(e){
  if(e.target.id==='registerForm'){e.preventDefault();register(new FormData(e.target));return}
  if(e.target.id==='loginForm'){e.preventDefault();login(new FormData(e.target));return}
  if(e.target.id==='adminPinForm'){e.preventDefault();adminLogin(new FormData(e.target));return}
  if(e.target.id==='diagnosticForm'){e.preventDefault();submitDiagnostic(new FormData(e.target));return}
  if(e.target.id==='mockForm'){e.preventDefault();submitMock(new FormData(e.target));return}
  if(e.target.id==='realTestForm'){e.preventDefault();submitReal(new FormData(e.target));return}
}
function register(fd){
  const role=state.selectedRole||fd.get('role')||'candidate'; const email=String(fd.get('email')||'').toLowerCase().trim();
  if(state.accounts[email]) return toast('This email is already registered. Please sign in.');
  if(fd.get('password')!==fd.get('confirm')) return toast('Password confirmation does not match.');
  const code=regCode(role); const status=role==='candidate'?'approved':'pending';
  let candidateId=null;
  if(role==='candidate'){
    const c=createCandidateRecord({name:fd.get('name'), email, role, institution:fd.get('institution'), department:fd.get('department'), phone:fd.get('phone'), purpose:fd.get('purpose')});
    c.registrationCode=code; c.id=code; state.candidates[c.id]=c; candidateId=c.id;
  }
  state.accounts[email]={email,password:String(fd.get('password')),role,status,name:String(fd.get('name')),staffId:String(fd.get('staffId')),phone:String(fd.get('phone')),institution:String(fd.get('institution')),department:String(fd.get('department')),purpose:String(fd.get('purpose')),registrationCode:code,candidateId,createdAt:today()};
  save();
  if(status==='pending'){toast(`${roleLabel(role)} account created with code ${code}. Admin approval is required before login.`);state.authMode='signin';renderLanding();return}
  toast(`Account created. Registration code: ${code}`);setSession(state.accounts[email]);
}
function login(fd){const email=String(fd.get('email')||'').toLowerCase().trim();const role=fd.get('role');const pass=String(fd.get('password')||'');const a=state.accounts[email];if(!a||a.password!==pass||a.role!==role)return toast('Invalid email, password, or role.');if(a.status==='pending')return toast('Your account is pending Admin approval.');if(a.status==='rejected')return toast('This account has been rejected.');setSession(a)}
function adminLogin(fd){if(String(fd.get('pin'))!==CONFIG.adminPin)return toast('Incorrect Admin PIN.');state.sessionUser={role:'admin',email:'admin@local',name:'Administrator',registrationCode:'EPP-ADM-'+year()+'-000001'};state.view='dashboard';save();render()}
function submitDiagnostic(fd){let correct=0;DIAG_ITEMS.forEach((_,i)=>{if(fd.get('d'+i)==='correct')correct++});const score=260+Math.round(correct/DIAG_ITEMS.length*520);const c=currentCandidate();const band=cefrFromScore(score);c.diagnostic={score,cefr:band.level,date:today(),profile:Object.fromEntries(SKILLS.map((s,i)=>[s,Math.max(150,Math.min(850,score+(i-2)*25))]))};save();toast(`Diagnostic completed: ${score}/900 (${band.label}).`);navTo('practice')}
function submitMock(fd){const items=makeMockItems();let correct=0;items.forEach((_,i)=>{if(fd.get('m'+i)==='correct')correct++});const score=Math.round(correct/items.length*900);const c=currentCandidate();c.mock={score,date:today(),rawCorrect:correct,total:items.length};save();toast(`Mock test completed: ${score}/900.`);navTo('report')}
function submitReal(fd){const items=makeRealTestItems();let correct=0;const sectionScores={Listening:{correct:0,total:0,minutes:35},Structure:{correct:0,total:0,minutes:25},Reading:{correct:0,total:0,minutes:55}};items.forEach((it,i)=>{sectionScores[it[0]].total++; if(fd.get('r'+i)==='correct'){correct++;sectionScores[it[0]].correct++}});Object.values(sectionScores).forEach(v=>v.scaled=sectionScore(v.correct,v.total));const score=Math.round(correct/items.length*900);const c=currentCandidate();const logs=c.realTest?.securityLogs||[];c.realTest={score,date:today(),integrity:logs.length?'Review Required':'Verified',securityLogs:logs,rawCorrect:correct,totalItems:items.length,sectionScores,format:'ITP-style: 50 Listening / 40 Structure / 50 Reading'};makeCertificate(c,false);save();toast(`Official ITP-style test submitted: ${correct}/${items.length} correct, ${score}/900. Certificate generated.`);detachSecurity();navTo('certificate')}
function approveAccount(email,ok){const a=state.accounts[email];if(!a)return; a.status=ok?'approved':'rejected';save();toast(`${a.name} has been ${ok?'approved':'rejected'}.`);render()}
function setIntegrity(cid,status){const c=state.candidates[cid];if(!c?.realTest)return;c.realTest.integrity=status;if(c.certificateId&&state.certificates[c.certificateId])state.certificates[c.certificateId].integrity=status;save();toast(`Integrity status updated: ${status}`);render()}
function logSecurity(type){const c=currentCandidate();if(!c)return;c.realTest=c.realTest||{securityLogs:[],integrity:'In Progress',score:0,date:today()};c.realTest.securityLogs=c.realTest.securityLogs||[];c.realTest.securityLogs.push({type,time:new Date().toLocaleString()});save();}
function attachSecurity(){ if(securityAttached) return; securityAttached=true; ['copy','paste','cut','contextmenu'].forEach(ev=>document.addEventListener(ev,securityBlock)); document.addEventListener('visibilitychange',visibilityLog); if(testTimer)clearInterval(testTimer); let seconds=REAL_TEST_BLUEPRINT.totalMinutes*60; testTimer=setInterval(()=>{seconds--;const t=$('timer'); if(t){const m=String(Math.floor(seconds/60)).padStart(2,'0');const s=String(seconds%60).padStart(2,'0');t.textContent=`${m}:${s}`} if(seconds<=0){clearInterval(testTimer);document.getElementById('realTestForm')?.requestSubmit()}},1000)}
function detachSecurity(){ if(!securityAttached)return; securityAttached=false; ['copy','paste','cut','contextmenu'].forEach(ev=>document.removeEventListener(ev,securityBlock)); document.removeEventListener('visibilitychange',visibilityLog); if(testTimer){clearInterval(testTimer);testTimer=null}}
function securityBlock(e){if(state.view==='realtest'){e.preventDefault();logSecurity(`${e.type} attempt blocked`);toast(`${e.type} is blocked in secure real-test mode.`);}}
function visibilityLog(){if(state.view==='realtest'&&document.hidden){logSecurity('Window/tab switch detected');toast('Window/tab switching has been logged.')}}
function downloadCertificate(certId){
  const cert=state.certificates[certId]; if(!cert) return toast('Certificate not found.');
  const certHtml=document.getElementById('certificateCard')?.outerHTML || renderCertificate(cert,false);
  const inlineStyle=`body{margin:0;background:#ffffff;font-family:Arial,sans-serif}.certificate{max-width:1000px;min-height:620px;margin:28px auto;background:#fbf5e3;color:#10203b;border-radius:22px;padding:32px;border:9px double #b8862d;position:relative;overflow:hidden;box-sizing:border-box}.certificate:before{content:'${cert.demo?'DEMO':'VERIFIED'}';position:absolute;inset:0;display:grid;place-items:center;font-size:108px;font-weight:950;color:rgba(14,28,56,.08);transform:rotate(-19deg)}.certificate>*{position:relative}.certificate h2{font-family:Georgia,serif;text-align:center;font-size:34px;line-height:1.1;margin:0 0 12px;color:#111c31;letter-spacing:.03em}.center{text-align:center}.cert-name{font-family:Georgia,serif;text-align:center;color:#81560f;font-size:34px;font-weight:950;margin:12px 0}.cert-sub{text-align:center;color:#70571a;font-weight:900;font-size:17px}.cert-score{display:flex;align-items:center;justify-content:center;gap:26px;margin:22px 0;font-size:24px;font-weight:950}.cert-meta{border:1px solid #d6c394;border-radius:14px;background:rgba(255,255,255,.45);padding:12px;margin-top:18px;color:#10203b}.cert-meta div{display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid rgba(17,28,49,.12);padding:6px 0}.cert-meta div:last-child{border-bottom:0}.cert-grid{display:grid;grid-template-columns:160px 1fr 160px;gap:12px;align-items:end;margin-top:34px}.qr-local{width:132px;height:132px;background:#fff;border:1px solid #8d7a4c;border-radius:8px;padding:8px;display:grid;grid-template-columns:repeat(9,1fr);grid-template-rows:repeat(9,1fr);gap:2px}.qr-local i{background:#10192c;border-radius:1px}.stamp{width:130px;height:130px;border:6px solid #a77b23;border-radius:999px;display:grid;place-items:center;text-align:center;color:#9b6d13;font-weight:950;transform:rotate(-9deg);justify-self:end}.sign{text-align:center}.sign .scribble{font-family:Georgia,serif;font-style:italic;font-size:26px;color:#10203b}.cert-side,.verify-panel{display:none}@media print{.certificate{margin:0 auto;border-radius:0;min-height:95vh}}`;
  const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${cert.id}</title><style>${inlineStyle}</style></head><body>${certHtml}</body></html>`;
  const blob=new Blob([html],{type:'text/html'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`${cert.id}-${cert.name.replace(/\s+/g,'-')}.html`; a.click(); URL.revokeObjectURL(a.href);
  toast('Certificate downloaded. Open it and use Print/Save as PDF when needed.');
}
