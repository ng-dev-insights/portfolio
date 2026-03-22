import React from 'react';
import { useState, useEffect } from 'react';
import { C } from '../../constants/colors.js';

export default function Nav({onTour, reduced, onReduceMotion}){
  const[sc,setSc]=useState(false);
  useEffect(()=>{const h=()=>setSc(window.scrollY>50);window.addEventListener('scroll',h);return()=>window.removeEventListener('scroll',h);},[]);
  const go=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  return(
    <nav className="nav-glass" style={{position:'fixed',top:0,left:0,right:0,zIndex:200,padding:sc?'11px 32px':'18px 32px',transition:'padding .3s'}}>
      <div style={{maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        {/* Logo */}
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div className="display" style={{fontWeight:900,fontSize:16,color:C.ind,letterSpacing:'-.02em'}}>SB</div>
          <div style={{width:1,height:16,background:'rgba(99,102,241,.25)'}}/>
          <div className="mono" style={{fontSize:11,color:'#475569',letterSpacing:'.06em'}}>sys.arch</div>
        </div>
        <div className="hide-mob" style={{display:'flex',gap:26}}>
          {['systems','experience','skills','performance','contact'].map(s=>(
            <button key={s} className="nav-link" onClick={()=>go(s)}>{s.charAt(0).toUpperCase()+s.slice(1)}</button>
          ))}
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          {/* Reduce Motion toggle — pause/play icon */}
          <button
            onClick={onReduceMotion}
            className="hide-mob"
            title={reduced?'Animations paused — click to enable':'Pause animations'}
            style={{
              width:34,height:34,borderRadius:8,
              border:'1px solid '+(reduced?'rgba(99,102,241,.35)':'rgba(255,255,255,.08)'),
              background:reduced?'rgba(99,102,241,.12)':'transparent',
              color:reduced?C.ind:'#475569',
              cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',
              transition:'all .25s',position:'relative',flexShrink:0,
            }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(99,102,241,.1)';e.currentTarget.style.color=C.ind;}}
            onMouseLeave={e=>{e.currentTarget.style.background=reduced?'rgba(99,102,241,.12)':'transparent';e.currentTarget.style.color=reduced?C.ind:'#475569';}}>
            {/* Show pause bars when animations active, play triangle when paused */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              {reduced
                ? <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                : <g><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></g>
              }
            </svg>
            {/* Active indicator dot */}
            {reduced&&<span style={{position:'absolute',top:4,right:4,width:5,height:5,borderRadius:'50%',background:C.ind,boxShadow:'0 0 6px '+C.ind}}/>}
          </button>
          {/* Resume */}
          <a href="#resume-link-here" target="_blank" className="hide-mob"
            style={{padding:'7px 14px',borderRadius:8,border:'1px solid rgba(16,185,129,.3)',background:'rgba(16,185,129,.07)',color:C.em,fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all .2s',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:6}}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(16,185,129,.15)'}
            onMouseLeave={e=>e.currentTarget.style.background='rgba(16,185,129,.07)'}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Resume
          </a>
          {/* Tour */}
          <button onClick={onTour} className="hide-mob" style={{padding:'7px 14px',borderRadius:8,border:'1px solid rgba(99,102,241,.25)',background:'rgba(99,102,241,.08)',color:C.ind,fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'inherit',transition:'all .2s',display:'inline-flex',alignItems:'center',gap:6}}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(99,102,241,.16)'}
            onMouseLeave={e=>e.currentTarget.style.background='rgba(99,102,241,.08)'}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
            </svg>
            Tour
          </button>
          <div className="status-live"><span style={{width:6,height:6,borderRadius:'50%',background:C.em,display:'inline-block'}}/>AVAILABLE</div>
        </div>
      </div>
    </nav>
  );
}