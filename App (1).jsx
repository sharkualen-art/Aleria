import { useState, useEffect, useRef } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwkGuv86j1u1eFhA75L1K4PVz4sg4f3iE",
  authDomain: "aleria-app.firebaseapp.com",
  projectId: "aleria-app",
};
const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const dark = {
  bg:"#08080f", bgGrad:"radial-gradient(ellipse at 20% 0%, #1a0a2e 0%, #08080f 60%)",
  card:"rgba(255,255,255,0.05)", cardBorder:"rgba(255,255,255,0.10)",
  accent:"#8b7fff", accent2:"#e879a0", accentGrad:"linear-gradient(135deg,#8b7fff,#e879a0)",
  accentSoft:"rgba(139,127,255,0.12)", text:"#f0f0fa", textSoft:"rgba(240,240,250,0.7)",
  muted:"rgba(240,240,250,0.35)", green:"#34d399", yellow:"#fbbf24", red:"#fb7185",
  glass:"rgba(8,8,15,0.78)", glassBorder:"rgba(255,255,255,0.08)",
  inputBg:"rgba(255,255,255,0.06)", shadow:"0 8px 32px rgba(0,0,0,0.4)",
};
const light = {
  bg:"#f0f0f8", bgGrad:"radial-gradient(ellipse at 20% 0%, #e8e0ff 0%, #f0f0f8 60%)",
  card:"rgba(255,255,255,0.72)", cardBorder:"rgba(255,255,255,0.9)",
  accent:"#6c5fff", accent2:"#d0407a", accentGrad:"linear-gradient(135deg,#6c5fff,#d0407a)",
  accentSoft:"rgba(108,95,255,0.10)", text:"#18182e", textSoft:"rgba(24,24,46,0.7)",
  muted:"rgba(24,24,46,0.38)", green:"#059669", yellow:"#d97706", red:"#e11d48",
  glass:"rgba(240,240,248,0.82)", glassBorder:"rgba(255,255,255,0.7)",
  inputBg:"rgba(0,0,0,0.04)", shadow:"0 8px 32px rgba(108,95,255,0.10)",
};

function IcoTest({size=22,color="currentColor"}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;}
function IcoNote({size=22,color="currentColor"}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;}
function IcoQ({size=22,color="currentColor"}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;}
function IcoTask({size=22,color="currentColor"}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>;}
function IcoAnn({size=22,color="currentColor"}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;}
function IcoPlus(){return <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;}
function IcoSun(){return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;}
function IcoMoon(){return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;}
function IcoChevL(){return <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;}
function IcoChevR(){return <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;}
function IcoHeart(){return <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;}
function IcoChat(){return <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;}
function IcoShare(){return <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;}
function IcoCheck(){return <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>;}
function IcoPDF(){return <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/></svg>;}
function IcoImage(){return <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;}
function IcoCamera(){return <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;}
function IcoX(){return <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;}

const QUESTIONS=[];
const NOTES=[];
const TESTS=[];
const INIT_ASSIGN={};
const ANNOUNCEMENTS=[];

const ALL_SUBJECTS=["Mathematics","Physics","Chemistry","Biology","Literature","History","Geography","English","Computer Science","Economics","Art","Music","Physical Education","Philosophy","Psychology","Sociology","Foreign Language","Other"];

const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
const WDAYS=["Su","Mo","Tu","We","Th","Fr","Sa"];
const SUB_COLORS={Mathematics:"#8b7fff",Physics:"#38bdf8",Chemistry:"#f97316",Biology:"#4ade80",Literature:"#f472b6",History:"#fbbf24",Geography:"#34d399",English:"#60a5fa","Computer Science":"#a78bfa",Economics:"#fb923c",Art:"#e879a0",Music:"#c084fc","Physical Education":"#4ade80",Philosophy:"#94a3b8",Psychology:"#f472b6",Sociology:"#fbbf24","Foreign Language":"#38bdf8",Other:"#fb7185"};
const TAG_COLORS={Important:"#fb7185",Info:"#8b7fff",Event:"#34d399",Reminder:"#fbbf24"};
const getSC=(s)=>SUB_COLORS[s]||"#8b7fff";
const getDays=(d)=>Math.ceil((new Date(d)-new Date())/86400000);
const getUrg=(d)=>d<=1?"high":d<=3?"mid":"low";

const TABS=[
  {key:"tests",label:"Tests",Ico:IcoTest},
  {key:"notes",label:"Notes",Ico:IcoNote},
  {key:"questions",label:"Questions",Ico:IcoQ},
  {key:"assignments",label:"Tasks",Ico:IcoTask},
];

export default function Aleria(){
  const prefersDark=window.matchMedia?.("(prefers-color-scheme: dark)").matches??true;
  const [isDark,setIsDark]=useState(prefersDark);
  const C=isDark?dark:light;
  const [screen,setScreen]=useState("splash");
  const [onbStep,setOnbStep]=useState(0);
  const [tab,setTab]=useState("questions");
  const [user,setUser]=useState({name:"",school:"",grade:"Grade 9",cls:"9A"});
  const [form,setForm]=useState({});
  const [questions,setQuestions]=useState(QUESTIONS);
  const [notes,setNotes]=useState(NOTES);
  const [tests,setTests]=useState(TESTS);
  const [assign,setAssign]=useState(INIT_ASSIGN);
  const [announcements,setAnnouncements]=useState(ANNOUNCEMENTS);
  const [modal,setModal]=useState(null);
  const [notifs,setNotifs]=useState([]);
  const [viewNote,setViewNote]=useState(null);
  const today=new Date();
  const [calY,setCalY]=useState(today.getFullYear());
  const [calM,setCalM]=useState(today.getMonth());
  const [selDay,setSelDay]=useState(today.getDate());

  useEffect(()=>{const t=setTimeout(()=>setScreen("onboarding"),2200);return()=>clearTimeout(t);},[]);



  const notify=(msg)=>{
    const id=Date.now();
    setNotifs(n=>[...n,{id,msg}]);
    setTimeout(()=>setNotifs(n=>n.filter(x=>x.id!==id)),3000);
  };

  const calKey=(d)=>`${calY}-${String(calM+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  const selKey=calKey(selDay);
  const selAssign=assign[selKey]||[];
  const daysInM=new Date(calY,calM+1,0).getDate();
  const firstD=new Date(calY,calM,1).getDay();
  const ff=(k,v)=>setForm(p=>({...p,[k]:v}));

  const glassCard={background:C.card,border:`1px solid ${C.cardBorder}`,borderRadius:20,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",boxShadow:C.shadow,padding:18,marginBottom:10};
  const inp={width:"100%",background:C.inputBg,border:`1px solid ${C.glassBorder}`,borderRadius:14,padding:"13px 16px",color:C.text,fontSize:15,outline:"none",boxSizing:"border-box",marginBottom:12,fontFamily:"inherit"};
  const lbl={fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6,display:"block"};
  const primaryBtn={width:"100%",padding:"15px",borderRadius:16,border:"none",background:C.accentGrad,color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit",marginTop:8,boxShadow:"0 4px 20px rgba(139,127,255,0.3)"};
  const outlineBtn={width:"100%",padding:"13px",borderRadius:16,border:`1px solid ${C.glassBorder}`,background:C.card,backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",color:C.textSoft,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginTop:8};

  // ── SPLASH ────────────────────────────────────────────────────────────────
  if(screen==="splash") return(
    <div style={{background:C.bg,backgroundImage:C.bgGrad,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Outfit',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
      <div style={{fontSize:62,fontWeight:200,letterSpacing:"0.08em",background:C.accentGrad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"fadeUp 1s ease both"}}>aleria</div>
      <div style={{fontSize:13,fontWeight:300,color:C.muted,marginTop:14,letterSpacing:"0.15em",fontStyle:"italic",animation:"fadeUp 1s 0.25s ease both",opacity:0}}>
        {user.name ? `Welcome, ${user.name}` : "Your class, connected."}
      </div>
    </div>
  );

  // ── ONBOARDING ────────────────────────────────────────────────────────────
  if(screen==="onboarding"){
    const wrap={minHeight:"100vh",background:C.bg,backgroundImage:C.bgGrad,fontFamily:"'Outfit',sans-serif",color:C.text,padding:"64px 24px 48px",boxSizing:"border-box",overflowY:"auto"};
    const h1={fontSize:32,fontWeight:800,letterSpacing:"-0.5px",lineHeight:1.15,marginBottom:8};
    const sub={fontSize:14,color:C.muted,lineHeight:1.7,marginBottom:24};
    const stepLbl={fontSize:12,color:C.accent,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12};
    const errStyle={background:"rgba(251,113,133,0.12)",border:"1px solid rgba(251,113,133,0.3)",borderRadius:12,padding:"12px 14px",fontSize:13,color:C.red,marginBottom:14,lineHeight:1.5};

    // ── WELCOME (step 0) ──
    if(onbStep===0) return(
      <div style={wrap}>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <div style={{fontSize:44,fontWeight:200,letterSpacing:"0.1em",background:C.accentGrad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:6,lineHeight:1}}>aleria</div>
        <div style={{fontSize:13,fontStyle:"italic",color:C.muted,marginBottom:32}}>Your class, connected.</div>
        <div style={h1}>Your school,<br/>organised.</div>
        <div style={sub}>Notes, tests, questions and announcements — all in one place, made by students for students.</div>
        <button style={primaryBtn} onClick={()=>setOnbStep(1)}>Create Account</button>
        <button style={outlineBtn} onClick={()=>setOnbStep("login")}>Log In</button>
      </div>
    );

    // ── LOGIN ──
    if(onbStep==="login") return(
      <div style={wrap}>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <div style={{fontSize:44,fontWeight:200,letterSpacing:"0.1em",background:C.accentGrad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:32,lineHeight:1}}>aleria</div>
        <div style={h1}>Welcome back</div>
        <div style={sub}>Sign in to your account.</div>
        {form.authError&&<div style={errStyle}>{form.authError}</div>}
        {form.authInfo&&<div style={{...errStyle,background:"rgba(139,127,255,0.12)",borderColor:"rgba(139,127,255,0.3)",color:C.accent}}>{form.authInfo}</div>}
        <label style={lbl}>Email</label>
        <input style={inp} type="email" placeholder="your@email.com" value={form.email||""} onChange={e=>ff("email",e.target.value)}/>
        <label style={lbl}>Password</label>
        <input style={inp} type="password" placeholder="Your password" value={form.password||""} onChange={e=>ff("password",e.target.value)}/>
        <button style={primaryBtn} disabled={form.authLoading} onClick={async()=>{
          ff("authLoading",true); ff("authError",null);
          try{
            const cred=await signInWithEmailAndPassword(auth,form.email,form.password);
            const u=cred.user;
            setUser({name:u.displayName||form.email.split("@")[0],email:u.email,school:"",grade:"Grade 9",cls:"A"});
            setScreen("app");
            notify(`Welcome back, ${u.displayName||form.email.split("@")[0]}`);
          }catch(e){
            ff("authError",
              e.code==="auth/invalid-credential"?"Wrong email or password.":
              e.code==="auth/user-not-found"?"No account found with this email.":
              e.code==="auth/wrong-password"?"Incorrect password.":
              e.message||"Something went wrong. Please try again."
            );
          }finally{ff("authLoading",false);}
        }}>{form.authLoading?"Signing in…":"Sign In"}</button>
        <button style={outlineBtn} onClick={()=>setOnbStep(0)}>Back</button>
      </div>
    );

    // ── REGISTER step 1 ──
    if(onbStep===1) return(
      <div style={wrap}>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <div style={stepLbl}>Step 1 of 3</div>
        <div style={h1}>Create your account</div>
        <div style={sub}>Join thousands of students on Aleria.</div>
        {form.authError&&<div style={errStyle}>{form.authError}</div>}
        {[["name","Full Name","Your full name","text"],["email","Email","your@email.com","email"],["password","Password","Min. 8 characters","password"],["birthdate","Date of Birth","","date"]].map(([k,lb,ph,t])=>(
          <div key={k}><label style={lbl}>{lb}</label><input style={inp} type={t} placeholder={ph} value={form[k]||""} onChange={e=>ff(k,e.target.value)}/></div>
        ))}
        <label style={lbl}>Gender</label>
        <select style={{...inp,appearance:"none"}} value={form.gender||""} onChange={e=>ff("gender",e.target.value)}>
          <option value="">Select</option><option>Male</option><option>Female</option><option>Prefer not to say</option>
        </select>
        <label style={lbl}>Nationality</label>
        <input style={inp} placeholder="Your nationality" value={form.nationality||""} onChange={e=>ff("nationality",e.target.value)}/>
        <button style={primaryBtn} onClick={()=>{
          if(!form.name||!form.email||!form.password){ff("authError","Please fill in all required fields.");return;}
          if(form.password.length<8){ff("authError","Password must be at least 8 characters.");return;}
          ff("authError",null);
          setOnbStep(2);
        }}>Continue</button>
        <button style={outlineBtn} onClick={()=>setOnbStep(0)}>Back</button>
      </div>
    );

    // ── REGISTER step 2 ──
    if(onbStep===2) return(
      <div style={wrap}>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <div style={stepLbl}>Step 2 of 3</div>
        <div style={h1}>Join your school</div>
        <div style={sub}>Enter your school's unique code to connect with your classmates.</div>
        <label style={lbl}>School Code</label>
        <input style={{...inp,fontSize:28,fontWeight:800,letterSpacing:"0.4em",textAlign:"center"}} placeholder="ALB-001" maxLength={7} value={form.schoolCode||""} onChange={e=>ff("schoolCode",e.target.value.toUpperCase())}/>
        <label style={lbl}>Or create a new school</label>
        <input style={inp} placeholder="School name" value={form.school||""} onChange={e=>ff("school",e.target.value)}/>
        <button style={primaryBtn} onClick={()=>{
          if(!form.schoolCode&&!form.school){ff("authError","Enter a school code or create a new school.");return;}
          const sn=form.school||(form.schoolCode?"School "+form.schoolCode:"My School");
          setUser(u=>({...u,...form,school:sn,name:form.name||u.name}));
          setOnbStep(3);
        }}>Continue</button>
        <button style={outlineBtn} onClick={()=>setOnbStep(1)}>Back</button>
      </div>
    );

    // ── REGISTER step 3 ──
    if(onbStep===3) return(
      <div style={wrap}>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <div style={stepLbl}>Step 3 of 3</div>
        <div style={h1}>Pick your grade & class</div>
        <div style={sub}>You'll only see content from your class. If you're the first, you'll create it.</div>
        {form.authError&&<div style={errStyle}>{form.authError}</div>}
        <label style={lbl}>Grade</label>
        <select style={{...inp,appearance:"none"}} value={form.grade||""} onChange={e=>ff("grade",e.target.value)}>
          <option value="">Select grade</option>
          {[7,8,9,10,11,12].map(g=><option key={g}>Grade {g}</option>)}
        </select>
        <label style={lbl}>Class</label>
        <select style={{...inp,appearance:"none"}} value={form.cls||""} onChange={e=>ff("cls",e.target.value)}>
          <option value="">Select class</option>
          {["A","B","C","D"].map(c=><option key={c} value={c}>Class {c}</option>)}
          <option value="new">+ Create new class</option>
        </select>
        <button style={primaryBtn} disabled={form.authLoading} onClick={async()=>{
          ff("authLoading",true); ff("authError",null);
          try{
            const cred=await createUserWithEmailAndPassword(auth,form.email,form.password);
            await updateProfile(cred.user,{displayName:form.name});
            await sendEmailVerification(cred.user);
            setUser(u=>({...u,grade:form.grade||"Grade 9",cls:form.cls||"A",name:form.name}));
            setScreen("app");
            notify(`Welcome, ${form.name}! Check your email to verify.`);
          }catch(e){
            ff("authError",
              e.code==="auth/email-already-in-use"?"An account with this email already exists.":
              e.code==="auth/invalid-email"?"Please enter a valid email address.":
              e.code==="auth/weak-password"?"Password must be at least 8 characters.":
              e.message||"Something went wrong. Please try again."
            );
          }finally{ff("authLoading",false);}
        }}>{form.authLoading?"Creating account…":"Create Account"}</button>
        <button style={outlineBtn} onClick={()=>setOnbStep(2)}>Back</button>
      </div>
    );
  }

  // ── APP ───────────────────────────────────────────────────────────────────
  const uName=user.name||"";
  const uSchool=user.school||"My School";
  const uGC=`${user.grade||"Grade 9"} · ${user.cls||"A"}`;

  return(
    <div style={{background:C.bg,backgroundImage:C.bgGrad,minHeight:"100vh",maxWidth:430,margin:"0 auto",fontFamily:"'Outfit',sans-serif",color:C.text,position:"relative"}}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <style>{`
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
        input,select,textarea{font-family:'Outfit',sans-serif}
        ::-webkit-scrollbar{display:none}
        @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .pressable{transition:opacity 0.15s,transform 0.15s}
        .pressable:active{opacity:0.7;transform:scale(0.96)}
        input::placeholder,textarea::placeholder{color:rgba(150,150,180,0.45)}
      `}</style>

      {/* Notifications */}
      <div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",zIndex:99,width:"88%",maxWidth:380,display:"flex",flexDirection:"column",gap:8}}>
        {notifs.map(n=>(
          <div key={n.id} style={{background:C.accentGrad,color:"#fff",borderRadius:16,padding:"13px 18px",fontSize:13,fontWeight:600,boxShadow:"0 8px 24px rgba(139,127,255,0.35)",animation:"fadeIn 0.3s ease"}}>{n.msg}</div>
        ))}
      </div>

      {/* Header */}
      <div style={{padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:C.glass,backdropFilter:"blur(28px) saturate(180%)",WebkitBackdropFilter:"blur(28px) saturate(180%)",zIndex:10,borderBottom:`1px solid ${C.glassBorder}`}}>
        <div style={{fontSize:24,fontWeight:200,letterSpacing:"0.08em",background:C.accentGrad,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>aleria</div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>setIsDark(d=>!d)} className="pressable" style={{background:C.inputBg,border:`1px solid ${C.glassBorder}`,borderRadius:10,padding:"6px 8px",cursor:"pointer",color:C.textSoft,display:"flex",alignItems:"center"}}>
            {isDark?<IcoSun/>:<IcoMoon/>}
          </button>
          <div style={{background:C.card,border:`1px solid ${C.cardBorder}`,borderRadius:14,padding:"6px 13px",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)"}}>
            <div style={{fontSize:11,fontWeight:700,color:C.accent,maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{uSchool.length>18?uSchool.slice(0,18)+"…":uSchool}</div>
            <div style={{fontSize:10,color:C.muted,marginTop:1}}>{uGC}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{padding:"18px 18px 140px"}}>

        {tab==="questions"&&<>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:14}}>Class Questions</div>
          {questions.length===0&&(
            <div style={{...glassCard,textAlign:"center",padding:"40px 20px"}}>
              <div style={{fontSize:32,marginBottom:12,opacity:0.3}}>💬</div>
              <div style={{fontSize:15,fontWeight:700,color:C.muted,marginBottom:6}}>No questions yet</div>
              <div style={{fontSize:13,color:C.muted}}>Be the first to ask something.</div>
            </div>
          )}
          {questions.map((q,idx)=>(
            <div key={q.id} className="pressable" style={{...glassCard,animation:`fadeUp 0.4s ${idx*0.06}s ease both`}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:11}}>
                <div style={{width:38,height:38,borderRadius:12,background:C.accentGrad,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff",flexShrink:0}}>{q.av}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:700}}>{q.author}</div>
                  <div style={{fontSize:11,color:C.muted}}>{q.time}</div>
                </div>
                <div style={{padding:"3px 9px",borderRadius:9,fontSize:11,fontWeight:600,background:getSC(q.subject)+"18",color:getSC(q.subject),border:`1px solid ${getSC(q.subject)}30`}}>{q.subject}</div>
              </div>
              <div style={{fontSize:14,lineHeight:1.65,color:C.textSoft,marginBottom:13}}>{q.text}</div>
              <div style={{display:"flex",gap:16,alignItems:"center"}}>
                <button onClick={()=>setQuestions(qs=>qs.map(x=>x.id===q.id?{...x,likes:x.likes+(x.liked?-1:1),liked:!x.liked}:x))} style={{background:"none",border:"none",cursor:"pointer",color:q.liked?C.accent2:C.muted,fontSize:12,display:"flex",alignItems:"center",gap:5,padding:0,fontFamily:"inherit",transition:"color 0.2s"}}><IcoHeart/> {q.likes}</button>
                <button onClick={()=>setQuestions(qs=>qs.map(x=>x.id===q.id?{...x,showReply:!x.showReply}:x))} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:12,display:"flex",alignItems:"center",gap:5,padding:0,fontFamily:"inherit"}}><IcoChat/> {q.answers}</button>
                <button onClick={()=>{if(navigator.share){navigator.share({title:"Aleria",text:q.text});}else{navigator.clipboard?.writeText(q.text);notify("Copied to clipboard");}}} style={{background:"none",border:"none",cursor:"pointer",color:C.muted,fontSize:12,display:"flex",alignItems:"center",gap:5,padding:0,marginLeft:"auto",fontFamily:"inherit"}}><IcoShare/> Share</button>
              </div>
              {q.showReply&&(
                <div style={{marginTop:12,display:"flex",gap:8}}>
                  <input style={{...inp,marginBottom:0,flex:1,fontSize:13,padding:"10px 14px"}} placeholder="Write a reply..." value={q.replyText||""} onChange={e=>setQuestions(qs=>qs.map(x=>x.id===q.id?{...x,replyText:e.target.value}:x))}/>
                  <button onClick={()=>{if(!q.replyText?.trim())return;setQuestions(qs=>qs.map(x=>x.id===q.id?{...x,answers:x.answers+1,replyText:"",showReply:false}:x));notify("Reply posted");}} style={{background:C.accentGrad,border:"none",borderRadius:12,padding:"0 16px",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:13,fontFamily:"inherit",flexShrink:0}}>Post</button>
                </div>
              )}
            </div>
          ))}
        </>}

        {tab==="notes"&&<>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:14}}>Shared Notes</div>
          {notes.length===0&&(
            <div style={{...glassCard,textAlign:"center",padding:"40px 20px"}}>
              <div style={{fontSize:32,marginBottom:12,opacity:0.3}}>📄</div>
              <div style={{fontSize:15,fontWeight:700,color:C.muted,marginBottom:6}}>No notes shared yet</div>
              <div style={{fontSize:13,color:C.muted}}>Upload a PDF or photo to share with your class.</div>
            </div>
          )}
          {notes.map((n,idx)=>(
            <div key={n.id} className="pressable" onClick={()=>n.preview&&setViewNote(n)} style={{...glassCard,display:"flex",gap:13,alignItems:"center",animation:`fadeUp 0.4s ${idx*0.06}s ease both`,cursor:n.preview?"pointer":"default"}}>
              <div style={{width:52,height:52,borderRadius:14,background:getSC(n.subject)+"18",border:`1px solid ${getSC(n.subject)}30`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,overflow:"hidden"}}>
                {n.preview&&n.type==="photo"
                  ?<img src={n.preview} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  :<div style={{color:getSC(n.subject)}}>{n.type==="pdf"?<IcoPDF/>:<IcoImage/>}</div>
                }
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:15,fontWeight:700,marginBottom:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{n.title}</div>
                <div style={{display:"inline-block",padding:"2px 8px",borderRadius:8,fontSize:11,fontWeight:600,background:getSC(n.subject)+"18",color:getSC(n.subject),border:`1px solid ${getSC(n.subject)}28`,marginBottom:5}}>{n.subject}</div>
                <div style={{fontSize:11,color:C.muted}}>by {n.author} · {n.pages} · {n.time}</div>
              </div>
              <div style={{fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",background:C.inputBg,borderRadius:8,padding:"4px 8px",border:`1px solid ${C.glassBorder}`,flexShrink:0}}>{n.type==="pdf"?"PDF":"IMG"}</div>
            </div>
          ))}
        </>}

        {tab==="tests"&&<>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:14}}>Upcoming Tests</div>
          {tests.length===0&&(
            <div style={{...glassCard,textAlign:"center",padding:"40px 20px"}}>
              <div style={{fontSize:32,marginBottom:12,opacity:0.3}}>📅</div>
              <div style={{fontSize:15,fontWeight:700,color:C.muted,marginBottom:6}}>No tests added yet</div>
              <div style={{fontSize:13,color:C.muted}}>Add a test and let your class vote on what's coming.</div>
            </div>
          )}
          {tests.map((t,idx)=>{
            const days=getDays(t.date);
            const u=getUrg(days);
            const uc=u==="high"?C.red:u==="mid"?C.yellow:C.green;
            return(
              <div key={t.id} className="pressable" style={{...glassCard,border:`1px solid ${uc}35`,animation:`fadeUp 0.4s ${idx*0.06}s ease both`,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${uc},transparent)`}}/>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                  <div style={{fontSize:17,fontWeight:800}}>{t.subject}</div>
                  <div style={{padding:"4px 12px",borderRadius:10,fontSize:11,fontWeight:700,background:uc+"18",color:uc,border:`1px solid ${uc}30`}}>{days<=0?"Today":days===1?"Tomorrow":`${days} days`}</div>
                </div>
                <div style={{fontSize:13,color:C.muted,marginBottom:16}}>{t.topic} · {t.date}</div>
                <div style={{fontSize:11,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10}}>Class Predictions</div>
                {t.predictions.map((p,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:9}}>
                    <div style={{fontSize:12,color:C.textSoft,minWidth:138,lineHeight:1.3}}>{p.t}</div>
                    <div style={{flex:1,height:5,background:isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)",borderRadius:10,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${p.p}%`,background:i===0?C.red:i===1?C.yellow:C.accent,borderRadius:10}}/>
                    </div>
                    <div style={{fontSize:12,fontWeight:700,color:C.muted,minWidth:30,textAlign:"right"}}>{p.p}%</div>
                  </div>
                ))}
              </div>
            );
          })}
        </>}

        {tab==="assignments"&&<>
          <div style={{...glassCard,marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
              <button className="pressable" onClick={()=>{if(calM===0){setCalM(11);setCalY(y=>y-1);}else setCalM(m=>m-1);}} style={{background:C.inputBg,border:`1px solid ${C.glassBorder}`,borderRadius:10,padding:"6px 8px",cursor:"pointer",color:C.textSoft,display:"flex",alignItems:"center"}}><IcoChevL/></button>
              <div style={{fontWeight:700,fontSize:15}}>{MONTHS[calM]} {calY}</div>
              <button className="pressable" onClick={()=>{if(calM===11){setCalM(0);setCalY(y=>y+1);}else setCalM(m=>m+1);}} style={{background:C.inputBg,border:`1px solid ${C.glassBorder}`,borderRadius:10,padding:"6px 8px",cursor:"pointer",color:C.textSoft,display:"flex",alignItems:"center"}}><IcoChevR/></button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",marginBottom:8}}>
              {WDAYS.map(d=><div key={d} style={{textAlign:"center",fontSize:11,fontWeight:700,color:C.muted,paddingBottom:6}}>{d}</div>)}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
              {Array(firstD).fill(null).map((_,i)=><div key={"e"+i}/>)}
              {Array(daysInM).fill(null).map((_,i)=>{
                const d=i+1;
                const key=calKey(d);
                const isToday=d===today.getDate()&&calM===today.getMonth()&&calY===today.getFullYear();
                const isSel=d===selDay;
                const has=!!assign[key]?.length;
                return <div key={d} onClick={()=>setSelDay(d)} className="pressable" style={{aspectRatio:"1",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:10,fontSize:13,fontWeight:isSel?800:500,cursor:"pointer",background:isSel?C.accentGrad:isToday?C.accentSoft:"transparent",color:isSel?"#fff":isToday?C.accent:C.text,border:has&&!isSel?`1.5px solid ${C.accent}40`:"1.5px solid transparent"}}>{d}</div>;
              })}
            </div>
          </div>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:12}}>{MONTHS[calM]} {selDay}</div>
          {selAssign.length===0
            ?<div style={{...glassCard,textAlign:"center",color:C.muted,fontSize:14,padding:"24px"}}>Nothing due — enjoy the break.</div>
            :selAssign.map(a=>(
              <div key={a.id} className="pressable" style={{...glassCard,display:"flex",alignItems:"center",gap:13}}>
                <div onClick={()=>setAssign(prev=>{const c={...prev};c[selKey]=c[selKey].map(x=>x.id===a.id?{...x,done:!x.done}:x);return c;})} style={{width:26,height:26,borderRadius:8,border:`1.5px solid ${a.done?C.green:C.glassBorder}`,background:a.done?C.green:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,transition:"all 0.2s"}}>
                  {a.done&&<IcoCheck/>}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:600,textDecoration:a.done?"line-through":"none",color:a.done?C.muted:C.text}}>{a.title}</div>
                  <div style={{fontSize:11,color:C.muted}}>{a.subject}</div>
                </div>
              </div>
            ))
          }
        </>}

        {tab==="announcements"&&<>
          <div style={{fontSize:11,fontWeight:700,color:C.muted,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:14}}>School Announcements</div>
          {announcements.map((a,idx)=>{
            const tc=TAG_COLORS[a.tag]||C.accent;
            return(
              <div key={a.id} className="pressable" style={{...glassCard,animation:`fadeUp 0.4s ${idx*0.06}s ease both`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div style={{padding:"3px 10px",borderRadius:9,fontSize:11,fontWeight:700,background:tc+"18",color:tc,border:`1px solid ${tc}30`}}>{a.tag}</div>
                  <div style={{fontSize:11,color:C.muted}}>{a.time}</div>
                </div>
                <div style={{fontSize:16,fontWeight:800,marginBottom:8,lineHeight:1.3}}>{a.title}</div>
                <div style={{fontSize:13,color:C.textSoft,lineHeight:1.65,marginBottom:10}}>{a.body}</div>
                <div style={{fontSize:11,color:C.muted}}>— {a.author}</div>
              </div>
            );
          })}
        </>}
      </div>

      {/* FAB */}
      <button onClick={()=>setModal(tab)} className="pressable" style={{position:"fixed",bottom:92,right:18,width:52,height:52,borderRadius:16,background:C.accentGrad,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 6px 24px rgba(139,127,255,0.4)",zIndex:15}}>
        <IcoPlus/>
      </button>

      {/* Bottom Nav */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:C.glass,backdropFilter:"blur(28px) saturate(180%)",WebkitBackdropFilter:"blur(28px) saturate(180%)",borderTop:`1px solid ${C.glassBorder}`,display:"flex",padding:"10px 4px 28px",zIndex:20}}>
        {TABS.map(({key,label,Ico})=>{
          const active=tab===key;
          return(
            <div key={key} className="pressable" onClick={()=>setTab(key)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer",opacity:active?1:0.35}}>
              <Ico size={22} color={active?C.accent:C.muted}/>
              <div style={{fontSize:9,fontWeight:700,color:active?C.accent:C.muted,letterSpacing:"0.06em",textTransform:"uppercase"}}>{label}</div>
              {active&&<div style={{width:16,height:2,borderRadius:2,background:C.accentGrad,marginTop:1}}/>}
            </div>
          );
        })}
      </div>

      {/* Note image viewer */}
      {viewNote&&(
        <div onClick={()=>setViewNote(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:50,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)"}}>
          <button onClick={()=>setViewNote(null)} style={{position:"absolute",top:20,right:20,background:"rgba(255,255,255,0.12)",border:"none",borderRadius:12,padding:"8px",cursor:"pointer",color:"#fff",display:"flex",alignItems:"center"}}><IcoX/></button>
          <img src={viewNote.preview} alt={viewNote.title} style={{maxWidth:"92%",maxHeight:"80vh",borderRadius:16,objectFit:"contain"}}/>
        </div>
      )}

      {/* Modal */}
      {modal&&(
        <div onClick={()=>setModal(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:30,display:"flex",alignItems:"flex-end",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:C.card,backdropFilter:"blur(32px) saturate(200%)",WebkitBackdropFilter:"blur(32px) saturate(200%)",border:`1px solid ${C.cardBorder}`,borderRadius:"28px 28px 0 0",padding:"24px 22px 48px",width:"100%",maxWidth:430,margin:"0 auto",animation:"slideUp 0.32s ease",maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{width:36,height:4,background:C.muted,borderRadius:4,margin:"0 auto 20px",opacity:0.4}}/>
            {modal==="questions"&&<PostForm title="Ask a question" C={C} inp={inp} lbl={lbl} primaryBtn={primaryBtn} outlineBtn={outlineBtn} fields={[{k:"text",lb:"Question",ph:"What would you like to ask your class?",multi:true},{k:"subject",lb:"Subject",type:"sel",opts:ALL_SUBJECTS}]} onSubmit={d=>{if(!d.text?.trim())return;setQuestions(qs=>[{id:Date.now(),author:uName,av:uName.slice(0,2).toUpperCase(),time:"Just now",text:d.text,likes:0,answers:0,subject:d.subject||"Other",liked:false},...qs]);setModal(null);notify("Question posted");}} onClose={()=>setModal(null)}/>}
            {modal==="notes"&&<NoteForm C={C} inp={inp} lbl={lbl} primaryBtn={primaryBtn} outlineBtn={outlineBtn} glassCard={glassCard} subjects={ALL_SUBJECTS} onSubmit={d=>{if(!d.title?.trim())return;setNotes(ns=>[{id:Date.now(),title:d.title,subject:d.subject||"Other",author:uName,time:"Just now",pages:"1 file",type:d.type||"pdf",preview:d.preview||null},...ns]);setModal(null);notify("Note shared");}} onClose={()=>setModal(null)}/>}
            {modal==="tests"&&<TestForm C={C} inp={inp} lbl={lbl} primaryBtn={primaryBtn} outlineBtn={outlineBtn} glassCard={glassCard} subjects={ALL_SUBJECTS} onSubmit={d=>{if(!d.subject||!d.date)return;setTests(ts=>[...ts,{id:Date.now(),subject:d.subject,topic:d.topic||"",date:d.date,predictions:d.predictions||[]}]);setModal(null);notify("Test added");}} onClose={()=>setModal(null)}/>}
            {modal==="assignments"&&<PostForm title="Add assignment" C={C} inp={inp} lbl={lbl} primaryBtn={primaryBtn} outlineBtn={outlineBtn} fields={[{k:"title",lb:"Assignment",ph:"Describe the assignment"},{k:"subject",lb:"Subject",type:"sel",opts:ALL_SUBJECTS}]} onSubmit={d=>{if(!d.title?.trim())return;setAssign(prev=>{const c={...prev};if(!c[selKey])c[selKey]=[];c[selKey]=[...c[selKey],{id:Date.now(),title:d.title,subject:d.subject||"Other",done:false}];return c;});setModal(null);notify("Assignment added");}} onClose={()=>setModal(null)}/>}
          </div>
        </div>
      )}
    </div>
  );
}

function NoteForm({onSubmit,onClose,C,inp,lbl,primaryBtn,outlineBtn,glassCard,subjects}){
  const [data,setData]=useState({type:"pdf"});
  const [preview,setPreview]=useState(null);
  const [fileName,setFileName]=useState(null);
  const pdfRef=useRef();
  const imgRef=useRef();
  const camRef=useRef();

  const handleFile=(file,type)=>{
    if(!file)return;
    setData(d=>({...d,type,title:d.title||file.name.replace(/\.[^.]+$/,"")}));
    setFileName(file.name);
    if(type==="photo"){const reader=new FileReader();reader.onload=e=>setPreview(e.target.result);reader.readAsDataURL(file);}
    else setPreview(null);
  };

  const uploadBtn=(active)=>({flex:1,padding:"14px 8px",borderRadius:14,border:`1.5px solid ${active?C.accent:C.glassBorder}`,background:active?C.accentSoft:"transparent",color:active?C.accent:C.muted,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:700,display:"flex",flexDirection:"column",alignItems:"center",gap:6,transition:"all 0.2s"});

  return(<>
    <div style={{fontSize:20,fontWeight:800,marginBottom:20}}>Share a note</div>
    <label style={lbl}>Note Title</label>
    <input style={inp} placeholder="Note title" value={data.title||""} onChange={e=>setData(d=>({...d,title:e.target.value}))}/>
    <label style={lbl}>Subject</label>
    <select style={{...inp,appearance:"none"}} value={data.subject||""} onChange={e=>setData(d=>({...d,subject:e.target.value}))}>
      <option value="">Select subject</option>
      {(subjects||[]).map(o=><option key={o}>{o}</option>)}
    </select>
    <label style={lbl}>Upload</label>
    <div style={{display:"flex",gap:8,marginBottom:14}}>
      <button style={uploadBtn(data.type==="pdf"&&!!fileName)} onClick={()=>pdfRef.current.click()}><IcoPDF/>PDF</button>
      <input ref={pdfRef} type="file" accept="application/pdf" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0],"pdf")}/>
      <button style={uploadBtn(data.type==="photo"&&!!fileName)} onClick={()=>imgRef.current.click()}><IcoImage/>Photo</button>
      <input ref={imgRef} type="file" accept="image/png,image/jpeg,image/jpg,image/heic,image/webp" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0],"photo")}/>
      <button style={uploadBtn(false)} onClick={()=>camRef.current.click()}><IcoCamera/>Camera</button>
      <input ref={camRef} type="file" accept="image/*" capture="user" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0],"photo")}/>
    </div>
    {(fileName||preview)&&(
      <div style={{...glassCard,marginBottom:14,padding:14}}>
        {preview?<img src={preview} alt="preview" style={{width:"100%",borderRadius:10,maxHeight:180,objectFit:"cover"}}/>
          :<div style={{display:"flex",alignItems:"center",gap:10}}><div style={{color:C.accent}}><IcoPDF/></div><div style={{fontSize:13,color:C.textSoft,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>{fileName}</div></div>}
      </div>
    )}
    <button style={primaryBtn} onClick={()=>onSubmit({...data,preview})}>Share Note</button>
    <button style={outlineBtn} onClick={onClose}>Cancel</button>
  </>);
}

function TestForm({onSubmit,onClose,C,inp,lbl,primaryBtn,outlineBtn,glassCard,subjects}){
  const [data,setData]=useState({});
  const [predInput,setPredInput]=useState("");
  const [predictions,setPredictions]=useState([]);

  const addPrediction=()=>{
    if(!predInput.trim())return;
    setPredictions(p=>[...p,{t:predInput.trim(),p:0,votes:0}]);
    setPredInput("");
  };

  const vote=(i)=>{
    setPredictions(prev=>{
      const updated=prev.map((p,idx)=>idx===i?{...p,votes:p.votes+1}:p);
      const total=updated.reduce((s,p)=>s+p.votes,0);
      return updated.map(p=>({...p,p:total>0?Math.round((p.votes/total)*100):0}));
    });
  };

  return(<>
    <div style={{fontSize:20,fontWeight:800,marginBottom:20}}>Add a test</div>
    <label style={lbl}>Subject</label>
    <select style={{...inp,appearance:"none"}} value={data.subject||""} onChange={e=>setData(d=>({...d,subject:e.target.value}))}>
      <option value="">Select subject</option>
      {(subjects||[]).map(o=><option key={o}>{o}</option>)}
    </select>
    <label style={lbl}>Topic (optional)</label>
    <input style={inp} placeholder="What is the test about?" value={data.topic||""} onChange={e=>setData(d=>({...d,topic:e.target.value}))}/>
    <label style={lbl}>Test Date</label>
    <input style={inp} type="date" value={data.date||""} onChange={e=>setData(d=>({...d,date:e.target.value}))}/>
    <label style={lbl}>What could come up? (predictions)</label>
    <div style={{display:"flex",gap:8,marginBottom:10}}>
      <input style={{...inp,marginBottom:0,flex:1}} placeholder="Add a topic..." value={predInput} onChange={e=>setPredInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addPrediction()}/>
      <button onClick={addPrediction} style={{background:C.accentGrad,border:"none",borderRadius:12,padding:"0 16px",color:"#fff",fontWeight:700,cursor:"pointer",fontSize:18,fontFamily:"inherit",flexShrink:0}}>+</button>
    </div>
    {predictions.length>0&&(
      <div style={{marginBottom:14}}>
        {predictions.map((p,i)=>(
          <div key={i} style={{...glassCard,padding:"12px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:10}}>
            <div style={{flex:1,fontSize:13,fontWeight:600}}>{p.t}</div>
            <div style={{flex:1,height:5,background:C.inputBg,borderRadius:10,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${p.p}%`,background:C.accentGrad,borderRadius:10,transition:"width 0.3s"}}/>
            </div>
            <div style={{fontSize:12,color:C.muted,minWidth:30,textAlign:"right"}}>{p.p}%</div>
            <button onClick={()=>vote(i)} style={{background:C.accentSoft,border:`1px solid ${C.accent}30`,borderRadius:8,padding:"4px 10px",color:C.accent,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",flexShrink:0}}>Vote</button>
          </div>
        ))}
      </div>
    )}
    <button style={primaryBtn} onClick={()=>onSubmit({...data,predictions})}>Add Test</button>
    <button style={outlineBtn} onClick={onClose}>Cancel</button>
  </>);
}

function PostForm({title,fields,onSubmit,onClose,C,inp,lbl,primaryBtn,outlineBtn}){
  const [data,setData]=useState({});
  const f=(k,v)=>setData(p=>({...p,[k]:v}));
  return(<>
    <div style={{fontSize:20,fontWeight:800,marginBottom:20}}>{title}</div>
    {fields.map(field=>(
      <div key={field.k}>
        <label style={lbl}>{field.lb}</label>
        {field.multi?<textarea style={{...inp,minHeight:86,resize:"none"}} placeholder={field.ph} value={data[field.k]||""} onChange={e=>f(field.k,e.target.value)}/>
        :field.type==="sel"?<select style={{...inp,appearance:"none"}} value={data[field.k]||""} onChange={e=>f(field.k,e.target.value)}><option value="">Select {field.lb}</option>{field.opts.map(o=><option key={o}>{o}</option>)}</select>
        :<input style={inp} type={field.type||"text"} placeholder={field.ph} value={data[field.k]||""} onChange={e=>f(field.k,e.target.value)}/>}
      </div>
    ))}
    <button style={primaryBtn} onClick={()=>onSubmit(data)}>Post</button>
    <button style={outlineBtn} onClick={onClose}>Cancel</button>
  </>);
}
