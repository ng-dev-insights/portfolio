import React from 'react';
import { useState } from 'react';
import { C } from '../../constants/colors.js';

export default function EmailBtn({style:extraStyle}){
  const[copied,setCopied]=useState(false);
  const EMAIL='sanket.d.bhor@gmail.com';
  const doCopy=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    const doFallback=()=>{
      try{const el=document.createElement('textarea');el.value=EMAIL;el.style.cssText='position:fixed;opacity:0;top:-9999px';document.body.appendChild(el);el.select();document.execCommand('copy');document.body.removeChild(el);}catch(ex){}
      setCopied(true);setTimeout(()=>setCopied(false),2200);
    };
    if(navigator.clipboard){navigator.clipboard.writeText(EMAIL).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2200);}).catch(doFallback);}
    else{doFallback();}
  };
  return(
    <div style={{display:'inline-flex',alignItems:'center',...(extraStyle||{})}}>
      {/* Pure mailto link — no JS whatsoever, always opens mail app */}
      <a href={'mailto:'+EMAIL}
        style={{padding:'11px 14px 11px 16px',borderRadius:'10px 0 0 10px',
          border:'1px solid '+C.ind+'33',borderRight:'none',
          background:C.ind+'0d',color:C.ind,fontSize:13,fontWeight:600,
          textDecoration:'none',display:'inline-flex',alignItems:'center',gap:8,
          transition:'background .2s',fontFamily:'inherit',whiteSpace:'nowrap'}}
        onMouseEnter={e=>e.currentTarget.style.background=C.ind+'1a'}
        onMouseLeave={e=>e.currentTarget.style.background=C.ind+'0d'}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
        {EMAIL}
      </a>
      {/* Separate copy-to-clipboard button — explicit preventDefault so it never triggers href */}
      <button onClick={doCopy} title={copied?'Copied!':'Copy email address'}
        style={{padding:'11px 12px',borderRadius:'0 10px 10px 0',
          border:'1px solid '+(copied?C.em+'44':C.ind+'33'),
          background:copied?C.em+'14':C.ind+'0d',
          color:copied?C.em:C.ind,cursor:'pointer',
          display:'inline-flex',alignItems:'center',
          transition:'all .25s',fontFamily:'inherit'}}>
        {copied
          ?<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          :<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        }
      </button>
    </div>
  );
}