import React from 'react';
import { C } from '../../constants/colors.js';
import useInView from '../../hooks/useInView.jsx';
import useCounter from '../../hooks/useCounter.jsx';

export default function Leadership(){
  const[ref,vis]=useInView(.1);
  const devRoles=['Senior Eng','Frontend Dev','Full Stack','Angular Dev','QA Engineer'];
  return(
    <section style={{padding:'80px 32px',zIndex:1,position:'relative'}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div ref={ref} className="rv" style={vis?{opacity:1,transform:'none'}:{}}>
          {/* Signature strip */}
          <div style={{textAlign:'center',padding:'28px 32px',background:'linear-gradient(135deg,rgba(99,102,241,.07),rgba(124,58,237,.04))',border:'1px solid rgba(99,102,241,.18)',borderRadius:18,marginBottom:48,boxShadow:'0 0 60px rgba(99,102,241,.06)'}}>
            <div className="label" style={{marginBottom:12}}>Leadership Signal</div>
            <div className="display" style={{fontSize:'clamp(1.2rem,3vw,2rem)',color:'#f1f5f9',marginBottom:8}}>
              I don't just build UIs — I build <span className="g-ind">frontend systems that scale</span><br className="hide-mob"/> and <span style={{color:C.em}}>teams that ship.</span>
            </div>
            <p style={{color:'#64748b',fontSize:14,maxWidth:560,margin:'0 auto'}}>Architecture is about decisions. Leadership is about people. I do both.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'center'}}>
            {/* Team viz */}
            <div style={{display:'flex',justifyContent:'center'}}>
              <div style={{position:'relative',width:300,height:300}}>
                <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:5}}>
                  <div style={{width:68,height:68,borderRadius:'50%',background:`linear-gradient(135deg,${C.ind}22,${C.vio}22)`,border:`2px solid ${C.ind}4a`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',boxShadow:`0 0 36px ${C.ind}44`}}>
                    <span style={{fontSize:16}}>🎯</span>
                    <span className="mono" style={{fontSize:7,color:C.ind,marginTop:1}}>SANKET</span>
                  </div>
                </div>
                {[{angle:330,r:112},{angle:30,r:112},{angle:90,r:112},{angle:150,r:112},{angle:210,r:112}].map((d,i)=>{
                  const a=(d.angle*Math.PI)/180;const x=150+Math.cos(a)*d.r;const y=150+Math.sin(a)*d.r;
                  return(
                    <React.Fragment key={i}>
                      <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
                        {vis&&<line x1={150} y1={150} x2={x} y2={y} stroke={`${C.ind}22`} strokeWidth="1.5" strokeDasharray="4 4" style={{animation:`flow 2.2s linear infinite ${i*.4}s`}}/>}
                      </svg>
                      <div style={{position:'absolute',left:x-24,top:y-24,opacity:vis?1:0,transition:`opacity .5s ease ${i*.1+.4}s`}}>
                        <div style={{width:48,height:48,borderRadius:10,background:'rgba(13,18,38,.97)',border:`1px solid ${C.ind}2a`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:2,boxShadow:`0 0 12px ${C.ind}14`}}>
                          <span style={{fontSize:11}}>👤</span>
                          <span className="mono" style={{fontSize:6,color:'#64748b',textAlign:'center',lineHeight:1.2}}>{devRoles[i]}</span>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
                  <circle cx="150" cy="150" r="112" fill="none" stroke="rgba(99,102,241,.07)" strokeWidth="1" strokeDasharray="4 8"/>
                </svg>
              </div>
            </div>
            {/* Impact metrics */}
            <div>
              <div className="label" style={{marginBottom:20}}>Team Impact</div>
              <div style={{display:'flex',flexDirection:'column',gap:14,marginBottom:28}}>
                {[
                  {v:'+25%',l:'Faster delivery through architecture mentorship & code review culture',c:C.ind},
                  {v:'+40%',l:'Code quality improvement via enforced standards and design patterns',c:C.vio},
                  {v:'5×',l:'Engineers mentored from mid-level to senior practices',c:C.em},
                  {v:'2×',l:'Internal hackathon wins leading cross-functional engineering teams',c:C.amb},
                  {v:'Zero',l:'Downtime during 250K LOC platform migration — planned and executed',c:C.cya},
                ].map((m,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:16,padding:'12px 14px',background:`${m.c}07`,border:`1px solid ${m.c}14`,borderRadius:10,opacity:vis?1:0,transform:vis?'none':'translateX(16px)',transition:`opacity .5s ease ${i*.09+.3}s, transform .5s ease ${i*.09+.3}s`}}>
                    <span className="display" style={{fontSize:'1.5rem',color:m.c,minWidth:52,textAlign:'right',flexShrink:0}}>{m.v}</span>
                    <span style={{color:'#64748b',fontSize:12,lineHeight:1.5}}>{m.l}</span>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                {['Architecture Reviews','RFC Authoring','Tech Roadmap','Code Standards','Team Workshops','Pair Programming'].map(t=><span key={t} className="ttag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}