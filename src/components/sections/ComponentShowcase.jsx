import React from 'react';
import { useState } from 'react';
import { C } from '../../constants/colors.js';
import useInView from '../../hooks/useInView.jsx';

export default function ComponentShowcase(){
  const[ref,vis]=useInView(.08);const[hov,setHov]=useState(null);
  const comps=[
    {name:'Data Grid',icon:'▤',desc:'Virtualized table — sort, filter, paginate at 60fps',c:C.ind,why:'Renders 100K rows without lag'},
    {name:'Form Builder',icon:'⊟',desc:'Dynamic reactive forms with async validators',c:C.vio,why:'Zero boilerplate for complex forms'},
    {name:'Chart Suite',icon:'◈',desc:'Real-time D3/Canvas wrappers — 1000+/sec updates',c:C.em,why:'Financial-grade data rendering'},
    {name:'Nav System',icon:'≡',desc:'Role-based, keyboard accessible, mobile-first nav',c:C.amb,why:'Works for any user, any device'},
    {name:'Dialog Stack',icon:'◻',desc:'Overlay portal with animation queuing',c:C.cya,why:'Zero z-index conflicts, ever'},
    {name:'Auth Guards',icon:'◉',desc:'JWT refresh, role matrix, silent auth renewal',c:C.ros,why:'Users never see a login loop'},
  ];
  return(
    <section style={{padding:'80px 32px',zIndex:1,position:'relative'}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div ref={ref} className="rv" style={vis?{opacity:1,transform:'none'}:{}}>
          <div style={{textAlign:'center',marginBottom:40}}>
            <div className="label" style={{marginBottom:12}}>Reusable Component System</div>
            <h2 className="display" style={{fontSize:'clamp(1.8rem,3.5vw,2.8rem)',color:'#f1f5f9'}}>
              40+ Modules. <span className="g-ind">One Design System.</span>
            </h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))',gap:14}}>
            {comps.map((c,i)=>(
              <div key={i} className="comp-card" style={{background:'rgba(16,21,46,.97)',borderRadius:14,padding:'22px',cursor:'default',opacity:vis?1:0,transform:vis?'none':'translateY(16px)',transition:`opacity .5s ease ${i*.07}s, transform .5s ease ${i*.07}s, all .32s cubic-bezier(.4,0,.2,1)`}}
                onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:14}}>
                  <div style={{width:42,height:42,borderRadius:10,background:`${c.c}12`,border:`1px solid ${c.c}22`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,color:c.c}}>{c.icon}</div>
                  <div className="status-live" style={{fontSize:8,padding:'2px 7px'}}><span style={{width:4,height:4,borderRadius:'50%',background:C.em,display:'inline-block'}}/>LIVE</div>
                </div>
                <div style={{fontWeight:700,color:'#e2e8f0',fontSize:14,marginBottom:5}}>{c.name}</div>
                <div style={{color:'#64748b',fontSize:12,lineHeight:1.6,marginBottom:10}}>{c.desc}</div>
                <div style={{padding:'7px 10px',background:`${c.c}08`,border:`1px solid ${c.c}12`,borderRadius:7,opacity:hov===i?1:.45,transition:'opacity .25s'}}>
                  <span className="mono" style={{fontSize:9,color:`${c.c}77`}}>→ {c.why}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}