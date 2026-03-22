import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { C } from '../../constants/colors.js';
import { ROLES } from '../../constants/data.js';
import useMousePos from '../../hooks/useMousePos.jsx';
import DevCharacter from '../avatar/DevCharacter.jsx';
import FloatingCard from './FloatingCard.jsx';
import EmailBtn from '../ui/EmailBtn.jsx';

export default function Hero({hoveredNode}){
  const mouse=useMousePos();
  const[ri,setRi]=useState(0);const[rk,setRk]=useState(0);
  useEffect(()=>{const iv=setInterval(()=>{setRi(i=>(i+1)%ROLES.length);setRk(k=>k+1);},2800);return()=>clearInterval(iv);},[]);
  const px=f=>({transform:'translate('+(mouse.x*f*.016)+'px,'+(mouse.y*f*.012)+'px)',transition:'transform .55s cubic-bezier(.4,0,.2,1)'});
  const go=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'});

  // Compute look direction: node hover overrides mouse parallax
  const look = useMemo(()=>{
    if(hoveredNode){
      // Node coords are in 850×510 SVG space; map to -1..1
      const dx=(hoveredNode.x-425)/300;
      const dy=(hoveredNode.y-255)/255;
      return{x:Math.max(-1,Math.min(1,dx)),y:Math.max(-1,Math.min(1,dy))};
    }
    // Subtle idle mouse-based look
    const w=window.innerWidth,h=window.innerHeight;
    return{x:(mouse.x-w/2)/(w*.8),y:(mouse.y-h/2)/(h*.8)};
  },[hoveredNode,mouse.x,mouse.y]);
  return(
    <section id="home" className="site-grid" style={{minHeight:'100vh',display:'flex',alignItems:'center',padding:'100px 32px 60px',position:'relative',overflow:'hidden',zIndex:1}}>
      <div style={{maxWidth:1200,margin:'0 auto',width:'100%'}}>
        <div className="hero-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'center'}}>
          {/* LEFT: Avatar zone */}
          <div style={{position:'relative',display:'flex',justifyContent:'center',alignItems:'center',minHeight:440}}>
            {/* Card: Bundle Optimization */}
            <div style={{position:'absolute',top:'4%',left:'-3%',zIndex:10,...px(-1)}}>
              <FloatingCard delay=".3s">
                <div className="label" style={{marginBottom:7,fontSize:9,color:'#64748b'}}>Bundle Optimization</div>
                <div style={{display:'flex',alignItems:'baseline',gap:6}}>
                  <span style={{fontSize:24,fontWeight:900,color:'#e2e8f0',fontFamily:'Plus Jakarta Sans,sans-serif'}}>40%</span>
                  <span style={{color:C.em,fontSize:12,fontWeight:600}}>Size Reduction</span>
                </div>
                <div style={{fontSize:11,color:'#64748b',marginTop:4,fontFamily:'IBM Plex Mono,monospace'}}>250K LOC Migration</div>
                <div style={{height:4,background:'rgba(99,102,241,.12)',borderRadius:2,marginTop:8,overflow:'hidden'}}>
                  <div style={{height:'100%',width:'60%',background:`linear-gradient(90deg,${C.ind},${C.vio})`,borderRadius:2}}/>
                </div>
              </FloatingCard>
            </div>
            {/* Card: Real-Time Rendering */}
            <div style={{position:'absolute',top:'7%',right:'-5%',zIndex:10,...px(1.2)}}>
              <FloatingCard delay="1s" anim="float2">
                <div className="label" style={{marginBottom:7,fontSize:9,color:'#64748b'}}>Real-Time Rendering</div>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{fontSize:22,fontWeight:900,color:'#e2e8f0',fontFamily:'Plus Jakarta Sans,sans-serif'}}>60 FPS</div>
                  <div style={{height:28,width:1,background:'rgba(255,255,255,.06)'}}/>
                  <div style={{fontSize:11,color:'#a5b4fc',fontFamily:'IBM Plex Mono,monospace'}}>{'<'}100ms<br/><span style={{color:'#64748b',fontSize:10}}>response</span></div>
                </div>
              </FloatingCard>
            </div>
            {/* Card: System Reliability */}
            <div style={{position:'absolute',bottom:'10%',right:'-4%',zIndex:10,...px(1.4)}}>
              <FloatingCard delay="1.6s">
                <div className="label" style={{marginBottom:7,fontSize:9,color:'#64748b'}}>System Reliability</div>
                <div style={{fontSize:22,fontWeight:900,color:'#e2e8f0',fontFamily:'Plus Jakarta Sans,sans-serif'}}>99.9%</div>
                <div className="status-live" style={{marginTop:6,fontSize:10}}><span style={{width:5,height:5,borderRadius:'50%',background:C.em,display:'inline-block'}}/>UPTIME · LIVE</div>
              </FloatingCard>
            </div>
            {/* Avatar — hero size */}
            <div className="will-t" style={{position:'relative',zIndex:2,...px(.3)}}>
              {/* Glow backdrop */}
              <div style={{position:'absolute',bottom:20,left:'50%',transform:'translateX(-50%)',width:220,height:120,background:'radial-gradient(ellipse,rgba(99,102,241,.18),transparent 70%)',pointerEvents:'none',borderRadius:'50%',filter:'blur(20px)'}}/>
              <DevCharacter look={look} mode={hoveredNode?'focus':'idle'}/>
            </div>
          </div>

          {/* RIGHT: Copy */}
          <div>
            <div className="label" style={{marginBottom:16,animation:'slide-up .8s both'}}>Frontend Architecture · 8+ Years · Enterprise Scale</div>
            <h1 className="display" style={{fontSize:'clamp(2.8rem,5.2vw,4.8rem)',color:'#f1f5f9',lineHeight:.92,marginBottom:20,animation:'slide-up .8s .1s both',opacity:0}}>
              I build frontend<br/>systems that<br/><span className="g-ind">scale to millions.</span>
            </h1>
            <div style={{height:40,marginBottom:20,overflow:'hidden',animation:'slide-up .8s .25s both',opacity:0}}>
              <div key={rk} style={{animation:'role-flip .4s ease both'}}>
                <span style={{fontSize:'clamp(.95rem,2vw,1.2rem)',color:'#64748b',fontWeight:500}}>{ROLES[ri]}</span>
              </div>
            </div>
            {/* Signature statement */}
            <div className="sig-statement" style={{marginBottom:24,animation:'slide-up .8s .3s both',opacity:0}}>
              <span className="mono" style={{fontSize:13,color:'#64748b',lineHeight:1.6}}>
                "From 250K LOC to 60fps rendering —<br/>
                <span style={{color:C.ind,fontWeight:600}}>frontend architecture is my craft.</span>"
              </span>
            </div>
            <p style={{color:'#64748b',lineHeight:1.8,fontSize:'clamp(13px,1.5vw,15px)',maxWidth:460,marginBottom:32,animation:'slide-up .8s .38s both',opacity:0}}>
              Frontend Architect focused on building high-performance, scalable UI systems for enterprise platforms. I design the architecture, write the critical code, and grow the teams that ship it.
            </p>
            <div style={{display:'flex',flexWrap:'wrap',gap:10,animation:'slide-up .8s .45s both',opacity:0}}>
              {/* Primary CTA — matches footer link style */}
              <button onClick={()=>go('systems')} style={{padding:'12px 24px',borderRadius:10,background:`linear-gradient(135deg,${C.ind},${C.vio})`,color:'#fff',fontWeight:700,fontSize:13,border:'none',cursor:'pointer',fontFamily:'inherit',transition:'all .25s',boxShadow:`0 8px 28px rgba(99,102,241,.35)`,display:'inline-flex',alignItems:'center',gap:8}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=`0 14px 36px rgba(99,102,241,.5)`;}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow=`0 8px 28px rgba(99,102,241,.35)`;}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                Explore Systems
              </button>
              {/* Resume download */}
              <a href="#resume-link-here" target="_blank"
                style={{padding:'12px 20px',borderRadius:10,border:`1px solid ${C.em}33`,background:`${C.em}0d`,color:C.em,fontSize:13,fontWeight:600,textDecoration:'none',transition:'all .25s',display:'inline-flex',alignItems:'center',gap:7}}
                onMouseEnter={e=>{e.currentTarget.style.background=`${C.em}1c`;e.currentTarget.style.transform='translateY(-1px)';}}
                onMouseLeave={e=>{e.currentTarget.style.background=`${C.em}0d`;e.currentTarget.style.transform='none';}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Resume
              </a>
              <EmailBtn/>
            </div>
            {/* Stat row */}
            <div style={{display:'flex',gap:24,marginTop:36,paddingTop:28,borderTop:'1px solid rgba(255,255,255,.05)',animation:'slide-up .8s .55s both',opacity:0}}>
              {[{v:'8+',l:'Years'},{v:'250K+',l:'LOC Owned'},{v:'600+',l:'Components'},{v:'40+',l:'UI Modules'}].map(s=>(
                <div key={s.l}>
                  <div className="display" style={{fontSize:'1.4rem',color:'#e2e8f0'}}>{s.v}</div>
                  <div className="mono" style={{fontSize:9,color:'#64748b',marginTop:2,lineHeight:1.4}}>{s.l}</div>
                </div>
              ))}
            </div>
            {/* Authority signal */}
            <div style={{marginTop:16,display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:'rgba(16,185,129,.04)',border:'1px solid rgba(16,185,129,.12)',borderRadius:9,animation:'slide-up .8s .65s both',opacity:0}}>
              <span style={{color:C.em,fontSize:14,flexShrink:0}}>✓</span>
              <span className="mono" style={{fontSize:11,color:'#64748b',lineHeight:1.5}}>Systems designed for production — serving enterprise clients across fintech, luxury travel, and SaaS.</span>
              <a href="https://github.com/sanketbhor1992" target="_blank" style={{marginLeft:'auto',flexShrink:0,display:'flex',alignItems:'center',gap:5,color:'#64748b',fontSize:11,fontWeight:600,textDecoration:'none',fontFamily:'Plus Jakarta Sans,sans-serif',transition:'color .2s'}}
                onMouseEnter={e=>e.currentTarget.style.color=C.em}
                onMouseLeave={e=>e.currentTarget.style.color='#334155'}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}