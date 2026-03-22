import React from 'react';
import { useState } from 'react';
import { C } from '../../constants/colors.js';
import { EXP } from '../../constants/data.js';
import useInView from '../../hooks/useInView.jsx';

export default function Timeline(){
  const[open,setOpen]=useState(0);
  const[ref,vis]=useInView(.06);
  return(
    <section id="experience" className="calm-zone" style={{padding:'100px 32px',zIndex:1,position:'relative'}}>
      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <div ref={ref} className="rv" style={vis?{opacity:1,transform:'none'}:{}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <div className="label" style={{marginBottom:12}}>Engineering History</div>
            <h2 className="display" style={{fontSize:'clamp(2rem,4vw,3.2rem)',color:'#f1f5f9'}}>
              8 Years of <span className="g-ind">Ownership</span>
            </h2>
            <p style={{color:'#64748b',marginTop:12,fontSize:14}}>Not just years of experience — years of building systems that scale, fail gracefully, and outlast their authors.</p>
          </div>
          {/* Timeline bar */}
          <div className="hide-mob" style={{display:'flex',alignItems:'center',marginBottom:40,padding:'0 8px'}}>
            {EXP.map((e,i)=>(
              <React.Fragment key={i}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer'}} onClick={()=>setOpen(i)}>
                  <div style={{width:13,height:13,borderRadius:'50%',background:open===i?e.color:'#64748b',border:`2px solid ${e.color}`,transition:'all .3s',boxShadow:open===i?`0 0 14px ${e.color}55`:'none',position:'relative'}}>
                    {open===i&&<div style={{position:'absolute',inset:-4,borderRadius:'50%',border:`2px solid ${e.color}33`,animation:'ping 1.8s ease-out infinite'}}/>}
                  </div>
                  <div className="mono" style={{fontSize:10,color:open===i?e.color:'#64748b',marginTop:5}}>{e.period.split('–')[0].trim()}</div>
                  <div style={{fontSize:11,color:open===i?'#94a3b8':'#1e293b',marginTop:1,fontWeight:600}}>{e.co.split(' ')[0]}</div>
                </div>
                {i<EXP.length-1&&<div style={{flex:1,height:2,margin:'0 4px',marginBottom:38,background:`linear-gradient(90deg,${e.color},${EXP[i+1].color})`,opacity:.25}}/>}
              </React.Fragment>
            ))}
          </div>
          {/* Cards */}
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {EXP.map((e,i)=>(
              <div key={i} style={{background:'rgba(16,21,46,.97)',border:`1px solid ${open===i?e.color+'35':'rgba(255,255,255,.05)'}`,borderRadius:14,overflow:'hidden',transition:'border-color .3s',boxShadow:open===i?`0 16px 48px rgba(0,0,0,.4),0 0 28px ${e.color}09`:'none'}}>
                <div style={{padding:'18px 22px',cursor:'pointer',userSelect:'none',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16}} onClick={()=>setOpen(open===i?-1:i)}>
                  <div style={{display:'flex',alignItems:'center',gap:14,flex:1,minWidth:0}}>
                    <div style={{width:38,height:38,borderRadius:10,background:`${e.color}14`,border:`1px solid ${e.color}22`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <div style={{width:11,height:11,borderRadius:'50%',background:e.color,boxShadow:`0 0 7px ${e.color}`}}/>
                    </div>
                    <div>
                      <div style={{display:'flex',alignItems:'center',gap:9,flexWrap:'wrap',marginBottom:2}}>
                        <span style={{fontWeight:700,color:'#e2e8f0',fontSize:14}}>{e.role}</span>
                        <span className="mono" style={{padding:'2px 7px',borderRadius:20,fontSize:9,fontWeight:700,background:`${e.color}14`,color:e.color,border:`1px solid ${e.color}22`}}>{e.tag==='Current'?'● CURRENT':e.tag}</span>
                      </div>
                      <span style={{color:e.color,fontWeight:600,fontSize:13}}>{e.co}</span>
                      <span className="mono" style={{color:'#64748b',fontSize:11,marginLeft:10}}>{e.period}</span>
                    </div>
                  </div>
                  <div style={{color:'#64748b',fontSize:18,transform:open===i?'rotate(45deg)':'none',transition:'transform .3s',flexShrink:0}}>+</div>
                </div>
                {open===i&&(
                  <div style={{padding:'0 22px 22px',borderTop:'1px solid rgba(255,255,255,.04)',paddingTop:18,animation:'slide-up .3s ease both'}}>
                    <div className="mono" style={{fontSize:10,color:'#64748b',marginBottom:10}}>// {e.scale}</div>
                    <p style={{color:'#64748b',fontSize:13,lineHeight:1.8,marginBottom:18,borderLeft:`2px solid ${e.color}33`,paddingLeft:14}}>{e.highlight}</p>
                    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))',gap:9,marginBottom:18}}>
                      {e.metrics.map(m=>(
                        <div key={m.l} style={{background:`${e.color}09`,border:`1px solid ${e.color}1a`,borderRadius:8,padding:'10px',textAlign:'center'}}>
                          <div style={{fontSize:15,fontWeight:800,color:e.color,fontFamily:'Plus Jakarta Sans,sans-serif'}}>{m.v}</div>
                          <div className="mono" style={{fontSize:9,color:'#64748b',marginTop:2}}>{m.l}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
                      {e.stack.map(s=><span key={s} className="ttag">{s}</span>)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}