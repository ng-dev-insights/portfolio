import React from 'react';
import { useState, useEffect } from 'react';
import { C } from '../../constants/colors.js';
import useInView from '../../hooks/useInView.jsx';
import useCounter from '../../hooks/useCounter.jsx';

export default function PerfDashboard(){
  const[ref,vis]=useInView(.1);
  const fps=useCounter(60,2000,vis);
  const bAfter=useCounter(60,1800,vis);
  const latAfter=useCounter(98,1800,vis);
  const latBefore=useCounter(820,1800,vis);
  const uptime=useCounter(99,2000,vis);
  return(
    <section id="performance" className="sec-alt calm-zone" style={{padding:'100px 32px',zIndex:1,position:'relative'}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div ref={ref} className="rv" style={vis?{opacity:1,transform:'none'}:{}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <div className="label" style={{marginBottom:12}}>Performance Engineering</div>
            <h2 className="display" style={{fontSize:'clamp(2rem,4vw,3.2rem)',color:'#f1f5f9'}}>
              Production <span className="g-em">Metrics</span>
            </h2>
            <p style={{color:'#64748b',marginTop:12,fontSize:14}}>Every number below came from real systems I built, optimized, and shipped to production.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:18}}>
            {/* Bundle */}
            <div className="glass-bright" style={{borderRadius:18,padding:'26px',border:'1px solid rgba(99,102,241,.18)',boxShadow:'inset 0 1px 0 rgba(99,102,241,.08)'}}>
              <div className="label" style={{marginBottom:18,color:'#94a3b8',fontSize:10,letterSpacing:'.1em'}}>Bundle Optimization</div>
              <div style={{display:'flex',alignItems:'flex-end',gap:14,height:110,justifyContent:'center',marginBottom:14}}>
                {[{label:'Before',v:100,h:88,c:'rgba(244,63,94,.45)'},{label:'After',v:bAfter,h:53,c:`rgba(99,102,241,.85)`}].map((b,i)=>(
                  <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:5}}>
                    <span className="mono" style={{fontSize:11,color:b.c.includes('244')?C.ind:C.ros}}>{b.v}KB</span>
                    <div className="will-t" style={{width:42,height:b.h,background:b.c,borderRadius:'5px 5px 2px 2px',transformOrigin:'bottom',animation:vis?`bar-rise 1.4s cubic-bezier(.4,0,.2,1) ${i*.2}s both`:'none',boxShadow:`0 0 18px ${b.c}`}}/>
                    <span className="mono" style={{fontSize:9,color:'#64748b'}}>{b.label}</span>
                  </div>
                ))}
              </div>
              <div style={{textAlign:'center',padding:'10px',background:'rgba(99,102,241,.06)',borderRadius:8,border:'1px solid rgba(99,102,241,.12)'}}>
                <span className="display" style={{fontSize:'1.8rem',color:C.ind}}>40%</span>
                <span style={{color:'#64748b',fontSize:12,marginLeft:8}}>size reduction</span>
              </div>
            </div>
            {/* FPS */}
            <div className="glass-bright" style={{borderRadius:18,padding:'26px',border:'1px solid rgba(16,185,129,.12)'}}>
              <div className="label" style={{marginBottom:18,color:'#64748b',fontSize:10}}>Real-Time Rendering</div>
              <div style={{display:'flex',justifyContent:'center',marginBottom:14}}>
                <svg viewBox="0 0 180 100" style={{width:170}}>
                  <path d="M18 90 A72 72 0 0 1 162 90" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="10" strokeLinecap="round"/>
                  <path d="M18 90 A72 72 0 0 1 162 90" fill="none" stroke={C.em} strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${vis?(fps/60)*227:0} 227`} style={{transition:'stroke-dasharray 2s cubic-bezier(.4,0,.2,1)',filter:`drop-shadow(0 0 6px ${C.em}88)`}}/>
                  <text x="90" y="84" textAnchor="middle" fontSize="26" fontWeight="800" fill="#e2e8f0" fontFamily="Plus Jakarta Sans,sans-serif">{fps}</text>
                  <text x="90" y="97" textAnchor="middle" fontSize="9" fill="#334155" fontFamily="IBM Plex Mono,monospace">FPS STABLE</text>
                </svg>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                {[{v:'OnPush',l:'Change Detection'},{v:'Web Workers',l:'Heavy Computation'},{v:'Virtual Scroll',l:'Large Datasets'},{v:'<100ms',l:'Response Time'}].map(m=>(
                  <div key={m.l} style={{background:'rgba(16,185,129,.05)',border:'1px solid rgba(16,185,129,.12)',borderRadius:8,padding:'8px',textAlign:'center'}}>
                    <div style={{fontSize:11,fontWeight:700,color:C.em,fontFamily:'Plus Jakarta Sans,sans-serif'}}>{m.v}</div>
                    <div className="mono" style={{fontSize:8,color:'#64748b',marginTop:2}}>{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Latency */}
            <div className="glass-bright" style={{borderRadius:18,padding:'26px',border:'1px solid rgba(245,158,11,.12)'}}>
              <div className="label" style={{marginBottom:18,color:'#64748b',fontSize:10}}>API Latency Improvement</div>
              <div style={{marginBottom:18}}>
                {[{label:'Before',v:latBefore,c:C.ros},{label:'After Circuit Breakers',v:latAfter,c:C.amb}].map((b,i)=>(
                  <div key={i} style={{marginBottom:13}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                      <span style={{fontSize:11,color:'#64748b'}}>{b.label}</span>
                      <span className="mono" style={{fontSize:11,color:b.c}}>{b.v}ms</span>
                    </div>
                    <div style={{height:7,background:'rgba(255,255,255,.04)',borderRadius:4,overflow:'hidden'}}>
                      <div className="will-t" style={{height:'100%',width:vis?`${(b.v/820)*100}%`:'0%',background:`linear-gradient(90deg,${b.c},${b.c}77)`,borderRadius:4,transition:`width 1.5s cubic-bezier(.4,0,.2,1) ${i*.2}s`,boxShadow:`0 0 8px ${b.c}55`}}/>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{textAlign:'center',padding:'12px',background:'rgba(245,158,11,.06)',borderRadius:8,border:'1px solid rgba(245,158,11,.14)'}}>
                <span className="display" style={{fontSize:'1.8rem',color:C.amb}}>8.4×</span>
                <span style={{color:'#64748b',fontSize:12,marginLeft:8}}>faster response</span>
              </div>
            </div>
            {/* Reliability */}
            <div className="glass-bright" style={{borderRadius:18,padding:'26px',border:'1px solid rgba(6,182,212,.12)'}}>
              <div className="label" style={{marginBottom:18,color:'#64748b',fontSize:10}}>System Reliability</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
                {[{v:`${uptime}.9%`,l:'System Uptime',c:C.cya},{v:'85%',l:'Test Coverage',c:C.ind},{v:'−65%',l:'Regression Bugs',c:C.em},{v:'+25%',l:'Team Velocity',c:C.amb}].map((m,i)=>(
                  <div key={i} style={{background:`${m.c}07`,border:`1px solid ${m.c}16`,borderRadius:10,padding:'14px 10px',textAlign:'center',opacity:vis?1:0,transition:`opacity .5s ease ${i*.1+.3}s`}}>
                    <div className="display" style={{fontSize:'1.35rem',color:m.c}}>{m.v}</div>
                    <div className="mono" style={{fontSize:8,color:'#64748b',marginTop:3}}>{m.l}</div>
                  </div>
                ))}
              </div>
              <div className="mono" style={{fontSize:9,color:'#64748b',textAlign:'center',borderTop:'1px solid rgba(255,255,255,.04)',paddingTop:12}}>// all production systems · verified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}