import React from 'react';
import { useEffect } from 'react';
import { C } from '../../constants/colors.js';
import { CASE_STUDIES } from '../../constants/data.js';
import CaseDiagram from './CaseDiagram.jsx';

export default function CaseStudyModal({nodeId, node, onClose}){
  const cs=CASE_STUDIES[nodeId];
  if(!cs||!node)return null;
  return(
    <div className="cs-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}} style={{position:'fixed',inset:0,zIndex:800,background:'rgba(4,5,10,.92)',backdropFilter:'blur(18px)',WebkitBackdropFilter:'blur(18px)',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div className="cs-panel cs-scroll" style={{background:'#0f1530',border:`1px solid ${node.color}30`,borderRadius:22,padding:'36px',maxWidth:760,width:'100%',maxHeight:'88vh',overflowY:'auto',boxShadow:`0 40px 80px rgba(0,0,0,.85),0 0 80px ${node.color}12`,position:'relative'}}>
        {/* Close */}
        <button onClick={onClose} style={{position:'absolute',top:20,right:20,width:34,height:34,borderRadius:'50%',background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',color:'#64748b',fontSize:18,cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',justifyContent:'center',lineHeight:1,transition:'all .2s'}}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,.12)';e.currentTarget.style.color='#e2e8f0';}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.06)';e.currentTarget.style.color='#64748b';}}>×</button>
        {/* Header */}
        <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:28}}>
          <div style={{width:48,height:48,borderRadius:13,background:`${node.color}18`,border:`1px solid ${node.color}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,color:node.color,flexShrink:0}}>{node.icon}</div>
          <div>
            <div className="label" style={{marginBottom:5,fontSize:9}}>Case Study · Production System</div>
            <h2 className="display" style={{fontSize:'clamp(1.3rem,2.5vw,1.8rem)',color:'#f1f5f9',lineHeight:1}}>{node.short}</h2>
          </div>
        </div>
        {/* Challenge */}
        <div style={{marginBottom:24}}>
          <div className="mono" style={{fontSize:9,color:`${node.color}88`,letterSpacing:'.15em',marginBottom:10}}>01 · THE CHALLENGE</div>
          <p style={{color:'#64748b',fontSize:14,lineHeight:1.85,borderLeft:`2px solid ${node.color}33`,paddingLeft:16}}>{cs.challenge}</p>
        </div>
        {/* Architecture diagram */}
        <div style={{marginBottom:24,padding:'20px',background:'rgba(255,255,255,.02)',border:'1px solid rgba(255,255,255,.06)',borderRadius:14}}>
          <div className="mono" style={{fontSize:9,color:`${node.color}88`,letterSpacing:'.15em',marginBottom:14}}>02 · ARCHITECTURE</div>
          <CaseDiagram type={nodeId} color={node.color}/>
        </div>
        {/* Approach */}
        <div style={{marginBottom:24}}>
          <div className="mono" style={{fontSize:9,color:`${node.color}88`,letterSpacing:'.15em',marginBottom:10}}>03 · THE APPROACH</div>
          <p style={{color:'#64748b',fontSize:14,lineHeight:1.85}}>{cs.approach}</p>
        </div>
        {/* Decisions */}
        <div style={{marginBottom:24}}>
          <div className="mono" style={{fontSize:9,color:`${node.color}88`,letterSpacing:'.15em',marginBottom:12}}>04 · KEY DECISIONS</div>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {cs.decisions.map((d,i)=>(
              <div key={i} className="cs-decision" style={{borderLeftColor:`${node.color}44`,background:`${node.color}06`,opacity:.85+i*.04}}>
                <div style={{fontWeight:700,color:'#e2e8f0',fontSize:13,marginBottom:3}}>{d.t}</div>
                <div style={{color:'#64748b',fontSize:12,lineHeight:1.6}}>→ {d.r}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Outcome */}
        <div style={{padding:'18px 20px',background:`${node.color}0c`,border:`1px solid ${node.color}25`,borderRadius:12}}>
          <div className="mono" style={{fontSize:9,color:`${node.color}88`,letterSpacing:'.15em',marginBottom:8}}>05 · OUTCOME</div>
          <p style={{color:'#e2e8f0',fontSize:14,lineHeight:1.7,fontWeight:500}}>{cs.outcome}</p>
        </div>
        {/* Footer links */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:20,paddingTop:16,borderTop:'1px solid rgba(255,255,255,.05)'}}>
          <span className="mono" style={{fontSize:9,color:'#64748b'}}>// {nodeId}.case-study · production verified</span>
          <a href="https://github.com/sanketbhor1992" target="_blank" style={{display:'flex',alignItems:'center',gap:6,color:`${node.color}88`,fontSize:12,fontWeight:600,textDecoration:'none',fontFamily:'Plus Jakarta Sans,sans-serif',transition:'color .2s'}}
            onMouseEnter={e=>e.currentTarget.style.color=node.color}
            onMouseLeave={e=>e.currentTarget.style.color=`${node.color}88`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            View GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}