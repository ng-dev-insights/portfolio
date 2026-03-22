import React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { C } from '../../constants/colors.js';
import { NODES, EDGES } from '../../constants/data.js';
import CaseStudyModal from './CaseStudyModal.jsx';
import useInView from '../../hooks/useInView.jsx';

export default function SystemViz({tourActive, tourSection, onNodeHover}){
  const[active,setActive]=useState('api');
  const[caseStudy,setCaseStudy]=useState(null);
  const[ref,vis]=useInView(.07);
  const an=NODES.find(n=>n.id===active);
  const lit=tourActive&&tourSection==='systems';

  // Mobile card view
  function MobileCards(){
    return(
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {NODES.map(n=>(
          <div key={n.id} data-hover onClick={()=>setActive(n.id)} className="mob-tap" style={{padding:'20px',borderRadius:14,background:'rgba(11,16,30,.98)',border:`1px solid ${active===n.id?n.color+'44':'rgba(255,255,255,.06)'}`,cursor:'pointer',transition:'all .3s'}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:active===n.id?12:0}}>
              <div style={{width:38,height:38,borderRadius:10,background:`${n.color}15`,border:`1px solid ${n.color}28`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,color:n.color,flexShrink:0}}>{n.icon}</div>
              <div>
                <div style={{fontWeight:700,color:'#e2e8f0',fontSize:14}}>{n.short}</div>
                <div className="status-live" style={{marginTop:3,fontSize:9,display:'inline-flex'}}><span style={{width:4,height:4,borderRadius:'50%',background:C.em,display:'inline-block'}}/>LIVE</div>
              </div>
            </div>
            {active===n.id&&(
              <div style={{paddingTop:12,borderTop:'1px solid rgba(255,255,255,.05)'}}>
                <p style={{color:'#64748b',fontSize:12,lineHeight:1.7,marginBottom:12}}>{n.why}</p>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:12}}>
                  {n.metrics.map(m=>(
                    <div key={m.l} style={{background:`${n.color}0a`,border:`1px solid ${n.color}18`,borderRadius:8,padding:'8px',textAlign:'center'}}>
                      <div style={{fontSize:14,fontWeight:800,color:n.color,fontFamily:'Plus Jakarta Sans,sans-serif'}}>{m.v}</div>
                      <div className="mono" style={{fontSize:8,color:'#64748b',marginTop:2}}>{m.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
                  {n.tech.map(t=><span key={t} className="ttag" style={{fontSize:10}}>{t}</span>)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return(
    <>
    <section id="systems" className="sec-alt" style={{padding:'100px 32px',position:'relative',zIndex:1}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div ref={ref} className="rv" style={vis?{opacity:1,transform:'none'}:{}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <div className="label" style={{marginBottom:12}}>System Architecture</div>
            <h2 className="display" style={{fontSize:'clamp(2.2rem,4.2vw,3.5rem)',color:'#f1f5f9'}}>
              Live <span className="g-ind">System Map</span>
            </h2>
            <p style={{color:'#64748b',marginTop:12,fontSize:14,maxWidth:520,margin:'12px auto 0'}}>
              Each node is a system I architected end-to-end. Click to inspect impact metrics, tech decisions, and why it matters.
            </p>
          </div>

          {/* Desktop SVG view */}
          <div className="hide-mob" style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:28,alignItems:'start'}}>
            <div className="glass" style={{borderRadius:20,padding:'20px',overflow:'hidden',position:'relative',background:'rgba(8,12,22,.6)',transition:'box-shadow .4s',...(lit?{boxShadow:`0 0 0 2px ${C.ind}44,0 0 60px ${C.ind}18`}:{})}}>
              <div className="holo" style={{position:'absolute',inset:0,pointerEvents:'none',borderRadius:20}}/>
              <svg viewBox="0 0 850 510" style={{width:'100%',height:'auto'}}>
                <defs>
                  <filter id="nf1"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                  <filter id="nf2"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                </defs>
                {[80,160,240,320,400,480,560,640,720].map(x=><line key={x} x1={x} y1="0" x2={x} y2="510" stroke="rgba(255,255,255,.02)" strokeWidth=".5"/>)}
                {[85,170,255,340,425].map(y=><line key={y} x1="0" y1={y} x2="850" y2={y} stroke="rgba(255,255,255,.02)" strokeWidth=".5"/>)}
                {vis&&EDGES.map((e,i)=>{
                  const fn=NODES.find(n=>n.id===e.f),tn=NODES.find(n=>n.id===e.t);
                  if(!fn||!tn)return null;
                  const isAct=active===e.f||active===e.t;
                  const path=`M${fn.x} ${fn.y} L${tn.x} ${tn.y}`;
                  return(
                    <g key={i}>
                      <path d={path} fill="none" stroke={isAct?'rgba(99,102,241,.38)':'rgba(255,255,255,.05)'} strokeWidth={isAct?1.5:.7} strokeDasharray={isAct?'8 4':'4 8'} style={isAct?{animation:'flow 1.8s linear infinite'}:{}}/>
                      {isAct&&<circle r="3" fill={C.ind} opacity=".85" style={{filter:'url(#nf1)'}}><animateMotion dur="2.5s" repeatCount="indefinite" path={path}/></circle>}
                    </g>
                  );
                })}
                {NODES.map(n=>{
                  const isA=active===n.id;
                  return(
                    <g key={n.id} transform={'translate('+n.x+','+n.y+')'} onClick={()=>setActive(n.id)}
                      onMouseEnter={()=>{onNodeHover&&onNodeHover(n);}}
                      onMouseLeave={()=>{onNodeHover&&onNodeHover(null);}}
                      style={{cursor:'pointer'}}>
                      {isA&&<circle r="50" fill={`${n.color}0c`} stroke={`${n.color}1a`} strokeWidth="1" style={{animation:'node-pulse 2s ease-in-out infinite'}}/>}
                      {isA&&<circle r="36" fill={`${n.color}12`} style={{filter:'url(#nf2)'}}/>}
                      <circle r="28" fill="rgba(8,11,20,.97)" stroke={isA?n.color:'rgba(255,255,255,.09)'} strokeWidth={isA?2:1} style={{transition:'all .3s',filter:isA?`drop-shadow(0 0 10px ${n.color}55)`:''}}/>
                      <text textAnchor="middle" dominantBaseline="middle" fontSize="15" fill={isA?n.color:'#6b7280'} style={{transition:'fill .3s',pointerEvents:'none'}}>{n.icon}</text>
                      <circle cx="19" cy="-20" r="4" fill={C.em} style={{filter:`drop-shadow(0 0 4px ${C.em}55)`}}/>
                      {n.label.split('\n').map((l,li)=>(
                        <text key={li} x="0" y={42+li*13} textAnchor="middle" fontSize="10.5" fill={isA?'#e2e8f0':'#334155'} fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight={isA?600:400} style={{transition:'fill .3s',pointerEvents:'none'}}>{l}</text>
                      ))}
                    </g>
                  );
                })}
                <text x="425" y="490" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,.06)" fontFamily="'IBM Plex Mono',monospace" letterSpacing="3">SYSTEM ARCHITECTURE · PRODUCTION</text>
              </svg>
            </div>
            {/* Detail panel */}
            {an&&(
              <div className="glass-bright" key={active} style={{borderRadius:20,padding:'26px',border:`1px solid ${an.color}28`,animation:'slide-up .4s ease both',boxShadow:`0 24px 56px rgba(0,0,0,.65),0 0 48px ${an.color}22`}}>
                <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                  <div style={{width:44,height:44,borderRadius:12,background:`${an.color}18`,border:`1px solid ${an.color}28`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,color:an.color,flexShrink:0}}>{an.icon}</div>
                  <div>
                    <div style={{fontWeight:700,color:'#e2e8f0',fontSize:15,marginBottom:3}}>{an.short}</div>
                    <div className="status-live" style={{fontSize:9,display:'inline-flex'}}><span style={{width:4,height:4,borderRadius:'50%',background:C.em,display:'inline-block'}}/>LIVE SYSTEM</div>
                  </div>
                </div>
                {/* Why it matters */}
                <div style={{padding:'10px 12px',background:`${an.color}08`,borderRadius:8,border:`1px solid ${an.color}14`,marginBottom:14}}>
                  <div className="mono" style={{fontSize:9,color:`${an.color}77`,marginBottom:4}}>// WHY IT MATTERS</div>
                  <div style={{color:'#a5b4fc',fontSize:12,lineHeight:1.6}}>{an.why}</div>
                </div>
                <p style={{color:'#64748b',fontSize:12,lineHeight:1.7,marginBottom:16}}>{an.desc}</p>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:16}}>
                  {an.metrics.map(m=>(
                    <div key={m.l} style={{background:`${an.color}08`,border:`1px solid ${an.color}16`,borderRadius:8,padding:'10px 8px',textAlign:'center'}}>
                      <div style={{fontSize:14,fontWeight:800,color:an.color,fontFamily:'Plus Jakarta Sans,sans-serif'}}>{m.v}</div>
                      <div className="mono" style={{fontSize:8,color:'#64748b',marginTop:2,lineHeight:1.3}}>{m.l}</div>
                    </div>
                  ))}
                </div>
                <div className="mono" style={{fontSize:9,color:'#64748b',marginBottom:8}}>TECH STACK</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
                  {an.tech.map(t=><span key={t} className="ttag" style={{borderColor:`${an.color}1a`,color:`${an.color}88`,fontSize:10}}>{t}</span>)}
                </div>
                <div style={{marginTop:16,paddingTop:12,borderTop:'1px solid rgba(255,255,255,.04)',display:'flex',justifyContent:'space-between'}}>
                  <span className="mono" style={{fontSize:9,color:'#64748b'}}>// node.{active}</span>
                  <span className="mono" style={{fontSize:9,color:C.em}}>operational</span>
                </div>
                {/* Case Study CTA */}
                <button className="cs-btn" onClick={()=>{setCaseStudy(active);window.dispatchEvent(new CustomEvent('avatarEvent',{detail:{type:'caseStudyOpen'}}));}} style={{color:an.color}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  View Deep Dive Case Study →
                </button>
              </div>
            )}
          </div>

          {/* Mobile stacked cards */}
          <div className="show-mob" style={{display:'none'}}><MobileCards/></div>
        </div>
      </div>
    </section>
    {/* Case Study Modal */}
    {caseStudy&&(
      <CaseStudyModal
        nodeId={caseStudy}
        node={NODES.find(n=>n.id===caseStudy)}
        onClose={()=>setCaseStudy(null)}
      />
    )}
    </>
  );
}