import React from 'react';
export default function Ticker(){
  const row='● 40% BUNDLE REDUCTION  ·  ● 60 FPS RENDERING  ·  ● 99.9% SYSTEM UPTIME  ·  ● 250K+ LOC MIGRATED  ·  ● 85% TEST COVERAGE  ·  ● 5 ENGINEERS MENTORED  ·  ● ANGULAR 17 ARCHITECT  ·  ● NAVI MUMBAI · GLOBALLY READY  ·  ● OPEN TO LEAD/ARCHITECT ROLES  ';
  return(
    <div style={{borderTop:'1px solid rgba(99,102,241,.1)',borderBottom:'1px solid rgba(99,102,241,.1)',background:'rgba(6,10,20,.98)',overflow:'hidden',padding:'11px 0',zIndex:5,position:'relative'}}>
      <div className="mono" style={{fontSize:10,color:'#2d5070',letterSpacing:'.14em',whiteSpace:'nowrap',display:'flex',animation:'ticker 35s linear infinite'}}>
        {[row,row].map((t,i)=><span key={i} style={{paddingRight:60}}>{t}</span>)}
      </div>
    </div>
  );
}