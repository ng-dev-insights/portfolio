import React from 'react';
import { C } from '../../constants/colors.js';
import EmailBtn from '../ui/EmailBtn.jsx';

export default function Footer(){
  return(
    <footer id="contact" style={{borderTop:'1px solid rgba(99,102,241,.12)',padding:'80px 32px 36px',background:'rgba(6,10,20,.8)',zIndex:1,position:'relative'}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:52}}>
          <div className="label" style={{marginBottom:14}}>Let's Build Together</div>
          <h2 className="display" style={{fontSize:'clamp(2rem,4.5vw,3.8rem)',color:'#f1f5f9',marginBottom:14}}>
            Ready to Architect<br/><span className="g-ind">Something Great?</span>
          </h2>
          <div className="sig-statement" style={{maxWidth:600,margin:'0 auto 40px',display:'inline-block',textAlign:'left'}}>
            <span className="mono" style={{fontSize:13,color:'#64748b'}}>
              "Frontend architecture is not about components —<br/>it's about <span style={{color:C.ind,fontWeight:600}}>systems, performance, and scale.</span>"
            </span>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:10,marginBottom:40}}>
            <EmailBtn/>
            {[
              {ico:<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
                label:'WhatsApp',href:'https://wa.me/919561527671?text=Hi+Sanket,+I+saw+your+portfolio',c:C.em},
              {ico:<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                label:'LinkedIn',href:'https://linkedin.com/in/sanket-bhor',c:C.cya},
              {ico:<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
                label:'GitHub',href:'https://github.com/sanketbhor1992',c:C.amb},
              {ico:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
                label:'Resume',href:'#resume-link-here',c:'#a78bfa'},
            ].map((l,i)=>(
              <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{padding:'11px 20px',borderRadius:10,background:`${l.c}0d`,border:`1px solid ${l.c}22`,color:l.c,fontSize:12,fontWeight:600,textDecoration:'none',transition:'all .25s',display:'flex',alignItems:'center',gap:8,fontFamily:'Plus Jakarta Sans,sans-serif'}}
                onMouseEnter={e=>{e.currentTarget.style.background=`${l.c}1c`;e.currentTarget.style.transform='translateY(-2px)';}}
                onMouseLeave={e=>{e.currentTarget.style.background=`${l.c}0d`;e.currentTarget.style.transform='none';}}>
                {l.ico}{l.label}
              </a>
            ))}
          </div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12,paddingTop:20,borderTop:'1px solid rgba(255,255,255,.04)'}}>
          <span className="mono" style={{color:'#64748b',fontSize:11}}>Sanket Bhor · Senior Frontend Architect · Navi Mumbai</span>
          <div style={{display:'flex',gap:12}}>
            {['Angular','TypeScript','RxJS','Node.js','8+ Years'].map(t=><span key={t} className="mono" style={{color:'#64748b',fontSize:10}}>{t}</span>)}
          </div>
          <span className="mono" style={{color:'#64748b',fontSize:11}}>sys.status: <span style={{color:C.em}}>operational</span></span>
        </div>
        <div style={{height:2,background:`linear-gradient(90deg,transparent,${C.ind}88,${C.cya}66,transparent)`,marginTop:20}}/>
      </div>
    </footer>
  );
}