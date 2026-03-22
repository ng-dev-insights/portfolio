import React from 'react';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { C } from '../../constants/colors.js';
import { DIALOGUE, NODE_DIALOGUE, CELEBRATE_MSGS, ACHIEVEMENTS, CHAR_POSES } from '../../constants/dialogue.js';
import { speak, stopSpeech } from '../../constants/speech.js';
import { TOUR_STEPS } from '../../constants/data.js';
import useMousePos from '../../hooks/useMousePos.jsx';
import DevCharacter from './DevCharacter.jsx';
import Confetti from './Confetti.jsx';
import AchievementToast from './AchievementToast.jsx';
import TypedText from './TypedText.jsx';

export default function CharacterLayer({hoveredNode, activeSection, tourActive, tourStep, onNext, onSkip}){
  const[heroGone,setHeroGone]=useState(false);
  const[mode,setMode]=useState('wave');
  const[posX,setPosX]=useState(60);
  const[targetX,setTargetX]=useState(60);
  const[open,setOpen]=useState(false);
  const[dismissed,setDismissed]=useState(false);
  const[msgKey,setMsgKey]=useState(0);
  const[msgText,setMsgText]=useState('');
  const[celebrating,setCelebrating]=useState(false);
  const[pendingAch,setPendingAch]=useState(null);
  const[nodesHovered,setNodesHovered]=useState(new Set());
  const[caseStudyOpened,setCaseStudyOpened]=useState(false);
  const[userDepth,setUserDepth]=useState(0);
  const[proximity,setProximity]=useState(false);
  const prevSection=useRef(activeSection);
  const walkTimer=useRef(null);
  const depthTimer=useRef(null);
  const mouse=useMousePos();

  // Section → mode after walking
  const sectionMode=useMemo(()=>({
    home:'idle',systems:'point',experience:'think',
    skills:'idle',performance:'point',contact:'idle',
  }),[]);

  // Section → X position
  const getSectionX=useCallback(sec=>{
    const w=window.innerWidth;
    if(w<768)return 8; // mobile: always left edge
    return{home:60,systems:Math.min(220,w*.18),experience:Math.max(w-150,280),
           skills:60,performance:Math.max(w-150,280),contact:60}[sec]||60;
  },[]);

  // Pick a random message from DIALOGUE arrays
  const pickMsg=useCallback((sec,node)=>{
    if(node){
      const arr=NODE_DIALOGUE[node.id];
      if(arr)return arr[Math.floor(Math.random()*arr.length)];
      return node.why||'';
    }
    if(tourActive)return TOUR_STEPS[tourStep]?.desc||'';
    const arr=DIALOGUE[sec]||DIALOGUE.home;
    return arr[Math.floor(Math.random()*arr.length)];
  },[tourActive,tourStep]);

  // Hero gone detection
  useEffect(()=>{
    const el=document.getElementById('home');
    if(!el)return;
    const obs=new IntersectionObserver(([e])=>setHeroGone(!e.isIntersecting),{threshold:.12});
    obs.observe(el);
    return()=>obs.disconnect();
  },[]);

  // Auto-open bubble + welcome message
  useEffect(()=>{
    if(heroGone){
      const t=setTimeout(()=>{
        setMsgText(pickMsg(activeSection,null));
        setMsgKey(k=>k+1);
        setOpen(true);
      },800);
      return()=>clearTimeout(t);
    }
  },[heroGone]);

  // Walk when section changes
  useEffect(()=>{
    if(prevSection.current===activeSection)return;
    const newX=getSectionX(activeSection);
    const curX=targetX;
    prevSection.current=activeSection;
    setMode('walk');
    setTargetX(newX);
    const dist=Math.abs(newX-curX);
    const dur=Math.min(1600,Math.max(500,dist*3.5));
    if(walkTimer.current)clearTimeout(walkTimer.current);
    walkTimer.current=setTimeout(()=>{
      setPosX(newX);
      const newMode=sectionMode[activeSection]||'idle';
      setMode(newMode);
      // Update message on arrival
      const newMsg=pickMsg(activeSection,null);
      setMsgText(newMsg);
      setMsgKey(k=>k+1);
    },dur);
    // Deepen user engagement
    setUserDepth(d=>d+1);
  },[activeSection]);

  useEffect(()=>{if(mode!=='walk')setPosX(targetX);},[targetX,mode]);

  // Node hover → focus + look + update message
  useEffect(()=>{
    if(hoveredNode&&mode!=='walk'){
      setMode('focus');
      setMsgText(pickMsg(activeSection,hoveredNode));
      setMsgKey(k=>k+1);
      // Track nodes hovered for achievement
      setNodesHovered(prev=>{
        const next=new Set(prev).add(hoveredNode.id);
        if(next.size>=5&&!pendingAch){
          setTimeout(()=>setPendingAch(ACHIEVEMENTS.explorer),600);
        }
        return next;
      });
    }else if(!hoveredNode&&mode==='focus'){
      setMode(sectionMode[activeSection]||'idle');
      setMsgText(pickMsg(activeSection,null));
      setMsgKey(k=>k+1);
    }
  },[hoveredNode]);

  // Mouse proximity — curious mode
  useEffect(()=>{
    if(!heroGone)return;
    const avatarX=posX+40;
    const avatarY=window.innerHeight-120;
    const dist=Math.hypot(mouse.x-avatarX,mouse.y-avatarY);
    const isNear=dist<130;
    if(isNear!==proximity){
      setProximity(isNear);
      if(isNear&&mode==='idle'){
        setMode('curious');
        const arr=["Oh hey, I see you 👀","You found me! I'm Sanket's portfolio guide.","Poke me again — I react 😄"];
        setMsgText(arr[Math.floor(Math.random()*arr.length)]);
        setMsgKey(k=>k+1);
        if(!open)setOpen(true);
      }else if(!isNear&&mode==='curious'){
        setMode(sectionMode[activeSection]||'idle');
      }
    }
  },[mouse.x,mouse.y,posX,mode,proximity,heroGone]);

  // Depth-based celebration + achievement
  useEffect(()=>{
    if(userDepth>=4&&!celebrating){
      setCelebrating(true);
      const msg=CELEBRATE_MSGS[Math.floor(Math.random()*CELEBRATE_MSGS.length)];
      setMsgText(msg);setMsgKey(k=>k+1);if(!open)setOpen(true);
      setTimeout(()=>setCelebrating(false),2400);
      if(userDepth===4)setTimeout(()=>setPendingAch(ACHIEVEMENTS.thinker),800);
    }
  },[userDepth]);

  // Case study opened achievement
  useEffect(()=>{
    const handler=(e)=>{
      if(e.detail?.type==='caseStudyOpen'){
        setCaseStudyOpened(true);
        setPendingAch(ACHIEVEMENTS.diver);
        setCelebrating(true);
        setMsgText("Nice — you went deep. That's where the real architecture is.");
        setMsgKey(k=>k+1);
        setMode('explain');
        setOpen(true);
        setTimeout(()=>setCelebrating(false),2200);
      }
    };
    window.addEventListener('avatarEvent',handler);
    return()=>window.removeEventListener('avatarEvent',handler);
  },[]);

  // 3-minute engagement achievement
  useEffect(()=>{
    depthTimer.current=setTimeout(()=>{
      if(heroGone)setPendingAch(ACHIEVEMENTS.curious);
    },180000); // 3 min
    return()=>clearTimeout(depthTimer.current);
  },[heroGone]);

  // Layered look: eyes first (full), head follows (60%)
  const look=useMemo(()=>{
    if(hoveredNode){
      const charCX=posX+40;
      const nodeScreenX=window.innerWidth*(hoveredNode.x/850);
      const dx=(nodeScreenX-charCX)/380;
      return{x:Math.max(-1,Math.min(1,dx)),y:-.15};
    }
    // Idle: subtle mouse follow
    const w=window.innerWidth,h=window.innerHeight;
    const mx=(mouse.x-(posX+40))/w;
    const my=(mouse.y-h*.8)/(h*.35);
    return{x:Math.max(-.6,Math.min(.6,mx)),y:Math.max(-.5,Math.min(.5,my))};
  },[hoveredNode,posX,mouse.x,mouse.y]);

  if((!heroGone&&!tourActive)||dismissed)return null;
  const isRightSide=posX>window.innerWidth*.5;

  return(
    <>
      {/* Achievement toast */}
      {pendingAch&&<AchievementToast ach={pendingAch} onDone={()=>setPendingAch(null)}/>}

      <div className="char-layer" style={{left:posX,display:'flex',flexDirection:'column',alignItems:'center'}}>
        {/* Speech bubble */}
        {open&&msgText&&(
          <div key={msgKey} style={{
            position:'relative',
            marginBottom:8,
            width:210,
            alignSelf:isRightSide?'flex-end':'flex-start',
            padding:'12px 14px',
            borderRadius:isRightSide?'14px 14px 4px 14px':'14px 14px 14px 4px',
            background:'rgba(13,18,36,.96)',
            backdropFilter:'blur(22px)',
            border:'1px solid rgba(99,102,241,.3)',
            boxShadow:'0 12px 36px rgba(0,0,0,.6),0 0 24px rgba(99,102,241,.1)',
            animation:'speechIn .35s cubic-bezier(.4,0,.2,1) both',
            pointerEvents:'none',
          }}>
            {/* Mode indicator dot */}
            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:6}}>
              <div style={{width:5,height:5,borderRadius:'50%',background:
                mode==='focus'?C.ind:mode==='proud'?C.amb:mode==='curious'?C.cya:
                mode==='explain'?C.vio:mode==='wave'?C.em:C.ind,
                flexShrink:0,boxShadow:'0 0 6px currentColor'}}/>
              <span className="mono" style={{fontSize:8,color:'#475569',letterSpacing:'.1em'}}>
                {hoveredNode?'// '+hoveredNode.short:tourActive?'TOUR · '+(tourStep+1)+'/'+TOUR_STEPS.length:activeSection.toUpperCase()}
              </span>
            </div>
            {/* Typed text */}
            <p style={{fontSize:11,color:'#94a3b8',lineHeight:1.65,margin:0}}>
              <TypedText text={msgText} speed={celebrating?14:22}/>
            </p>
            {/* Tour buttons */}
            {tourActive&&(
              <div style={{display:'flex',gap:6,marginTop:10,pointerEvents:'all'}}>
                <button onClick={onSkip} style={{padding:'4px 8px',borderRadius:6,border:'1px solid rgba(255,255,255,.1)',background:'transparent',color:'#64748b',fontSize:10,cursor:'pointer',fontFamily:'inherit'}}>Skip</button>
                <button onClick={onNext} style={{padding:'4px 10px',borderRadius:6,background:'linear-gradient(135deg,'+C.ind+','+C.vio+')',color:'#fff',fontSize:10,fontWeight:600,border:'none',cursor:'pointer',fontFamily:'inherit'}}>
                  {tourStep===TOUR_STEPS.length-1?'Done ✓':TOUR_STEPS[tourStep]?.cta||'Next →'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Character + confetti + controls */}
        <div style={{position:'relative',cursor:'pointer'}} onClick={()=>{
          const newOpen=!open;
          setOpen(newOpen);
          if(newOpen){
            const msg=pickMsg(activeSection,hoveredNode);
            setMsgText(msg);setMsgKey(k=>k+1);
            speak(msg);
          } else { stopSpeech(); }
        }}>
          {celebrating&&<Confetti/>}
          <button onClick={e=>{e.stopPropagation();setDismissed(true);}} style={{
            position:'absolute',top:-4,right:-4,width:18,height:18,borderRadius:'50%',
            background:'rgba(20,28,50,.95)',border:'1px solid rgba(255,255,255,.1)',
            color:'#475569',fontSize:11,cursor:'pointer',zIndex:6,
            display:'flex',alignItems:'center',justifyContent:'center',lineHeight:1,
          }}>×</button>
          <DevCharacter look={look} mode={mode} small celebrating={celebrating}/>
        </div>
      </div>
    </>
  );
}