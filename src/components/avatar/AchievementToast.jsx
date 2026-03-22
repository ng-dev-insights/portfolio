import React from 'react';
import { useState, useEffect } from 'react';
import { C } from '../../constants/colors.js';

export default function AchievementToast({ach, onDone}){
  const[out,setOut]=useState(false);
  useEffect(()=>{
    const t=setTimeout(()=>{setOut(true);setTimeout(onDone,400);},3200);
    return()=>clearTimeout(t);
  },[]);
  return(
    <div className={'achievement-toast'+(out?' out':'')} style={{
      position:'fixed',top:80,right:20,zIndex:500,
      display:'flex',alignItems:'center',gap:12,
      padding:'12px 16px',borderRadius:14,
      background:'rgba(13,18,32,.97)',
      border:'1px solid rgba(99,102,241,.35)',
      boxShadow:'0 8px 32px rgba(0,0,0,.6),0 0 24px rgba(99,102,241,.15)',
      backdropFilter:'blur(20px)',
      minWidth:220,
    }}>
      <div style={{fontSize:22,flexShrink:0}}>{ach.icon}</div>
      <div>
        <div style={{fontWeight:700,color:'#e2e8f0',fontSize:13}}>{ach.label}</div>
        <div className="mono" style={{fontSize:9,color:'#64748b',marginTop:2}}>{ach.desc}</div>
      </div>
      <div className="mono" style={{fontSize:8,color:C.ind,marginLeft:'auto',flexShrink:0}}>UNLOCKED</div>
    </div>
  );
}