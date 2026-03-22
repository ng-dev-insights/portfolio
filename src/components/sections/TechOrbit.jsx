import React from 'react';
import { C } from '../../constants/colors.js';
import { INNER, OUTER } from '../../constants/data.js';
import useInView from '../../hooks/useInView.jsx';

export default function TechOrbit(){
  const[ref,vis]=useInView(.1);
  const IR=128,OR=208;
  return(
    <section id="skills" className="sec-alt2" style={{padding:'100px 32px',zIndex:1,position:'relative'}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div ref={ref} className="rv" style={vis?{opacity:1,transform:'none'}:{}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <div className="label" style={{marginBottom:12}}>Technical Expertise</div>
            <h2 className="display" style={{fontSize:'clamp(2rem,4vw,3.2rem)',color:'#f1f5f9'}}>
              Tech <span className="g-ind">Orbit System</span>
            </h2>
            <p style={{color:'#64748b',marginTop:12,fontSize:14,maxWidth:500,margin:'12px auto 0'}}>
              Tools I use to design, optimize, and scale enterprise-grade Angular applications. Angular at the core — proximity signals mastery depth.
            </p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'center'}}>
            {/* Orbit — desktop full, mobile simplified */}
            <div className="orbit-wrap" style={{display:'flex',justifyContent:'center'}}>
              <div className="will-t" style={{position:'relative',width:448,height:448}}>
                {/* Ring paths */}
                <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none'}}>
                  <div style={{position:'absolute',width:IR*2+76,height:IR*2+76,borderRadius:'50%',border:'1px dashed rgba(99,102,241,.1)'}}/>
                  <div style={{position:'absolute',width:OR*2+76,height:OR*2+76,borderRadius:'50%',border:'1px dashed rgba(99,102,241,.06)'}}/>
                </div>
                {/* Center */}
                <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:5}}>
                  <div className="will-t" style={{width:82,height:82,borderRadius:'50%',background:`linear-gradient(135deg,${C.ind}22,${C.vio}22)`,border:`2px solid ${C.ind}55`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',boxShadow:`0 0 40px ${C.ind}44,inset 0 0 20px ${C.ind}0e`,animation:'node-pulse 3s ease-in-out infinite'}}>
                    <span style={{fontSize:12,fontWeight:900,color:C.ind,letterSpacing:'.04em',fontFamily:'Plus Jakarta Sans,sans-serif'}}>CORE</span>
                    <span className="mono" style={{fontSize:7,color:'#4338ca',marginTop:1}}>Angular 2-18</span>
                  </div>
                </div>
                {/* Inner orbit */}
                <div className="will-t" style={{position:'absolute',top:'50%',left:'50%',width:0,height:0,animation:'orbit-cw 14s linear infinite'}}>
                  {INNER.map((t,i)=>{const a=(i/INNER.length)*2*Math.PI;const x=Math.cos(a)*IR;const y=Math.sin(a)*IR;return(
                    <div key={t.name} className="will-t" style={{position:'absolute',left:x-29,top:y-29,width:58,height:58,animation:'orbit-ccw 14s linear infinite'}}>
                      <div style={{width:'100%',height:'100%',borderRadius:'50%',background:`${t.color}10`,border:`1px solid ${t.color}32`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',transition:'all .3s',cursor:'default'}}
                        onMouseEnter={e=>{e.currentTarget.style.background=`${t.color}20`;e.currentTarget.style.boxShadow=`0 0 18px ${t.color}44`;}}
                        onMouseLeave={e=>{e.currentTarget.style.background=`${t.color}10`;e.currentTarget.style.boxShadow='none';}}>
                        <span style={{fontSize:8,fontWeight:800,color:t.color,textAlign:'center',fontFamily:'Plus Jakarta Sans,sans-serif',lineHeight:1.2}}>{t.name}</span>
                        <span className="mono" style={{fontSize:7,color:`${t.color}55`,marginTop:2}}>{t.level}%</span>
                      </div>
                    </div>
                  );})}
                </div>
                {/* Outer orbit */}
                <div className="will-t" style={{position:'absolute',top:'50%',left:'50%',width:0,height:0,animation:'orbit-ccw 22s linear infinite'}}>
                  {OUTER.map((t,i)=>{const a=(i/OUTER.length)*2*Math.PI;const x=Math.cos(a)*OR;const y=Math.sin(a)*OR;return(
                    <div key={t.name} className="will-t" style={{position:'absolute',left:x-32,top:y-32,width:64,height:64,animation:'orbit-cw 22s linear infinite'}}>
                      <div style={{width:'100%',height:'100%',borderRadius:11,background:`${t.color}0d`,border:`1px solid ${t.color}24`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',cursor:'default'}}
                        onMouseEnter={e=>{e.currentTarget.style.background=`${t.color}1c`;e.currentTarget.style.borderColor=`${t.color}48`;}}
                        onMouseLeave={e=>{e.currentTarget.style.background=`${t.color}0d`;e.currentTarget.style.borderColor=`${t.color}24`;}}>
                        <span style={{fontSize:8,fontWeight:700,color:t.color,textAlign:'center',fontFamily:'Plus Jakarta Sans,sans-serif',lineHeight:1.2,padding:'0 4px'}}>{t.name}</span>
                        <span className="mono" style={{fontSize:7,color:`${t.color}44`,marginTop:2}}>{t.level}%</span>
                      </div>
                    </div>
                  );})}
                </div>
              </div>
            </div>
            {/* Skill bars */}
            <div>
              <div className="mono" style={{fontSize:10,color:'#64748b',marginBottom:20}}>// Proficiency · Production experience</div>
              {[...INNER,...OUTER].sort((a,b)=>b.level-a.level).map((t,i)=>(
                <div key={t.name} style={{marginBottom:14,opacity:vis?1:0,transform:vis?'none':'translateX(18px)',transition:`opacity .5s ease ${i*.055}s, transform .5s ease ${i*.055}s`}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                    <span style={{color:'#a5b4fc',fontSize:13,fontWeight:500}}>{t.name}</span>
                    <span className="mono" style={{fontSize:11,color:t.color}}>{t.level}%</span>
                  </div>
                  <div style={{height:4,background:'rgba(255,255,255,.04)',borderRadius:2,overflow:'hidden'}}>
                    <div style={{height:'100%',borderRadius:2,background:`linear-gradient(90deg,${t.color},${t.color}55)`,width:vis?`${t.level}%`:'0%',transition:`width 1.3s cubic-bezier(.4,0,.2,1) ${i*.07+.25}s`}}/>
                  </div>
                </div>
              ))}
              <div style={{marginTop:24,padding:'16px',background:'rgba(99,102,241,.04)',border:'1px solid rgba(99,102,241,.1)',borderRadius:12}}>
                <div className="mono" style={{fontSize:9,color:'#64748b',marginBottom:8}}>ADDITIONAL CAPABILITIES</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                  {['Angular Material','esbuild','Standalone Components','Signals API','@defer','Storybook','Lazy Loading','commitlint','ESLint'].map(it=><span key={it} className="ttag">{it}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}