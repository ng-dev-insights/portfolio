import React from 'react';
import { useState } from 'react';
import { C } from '../../constants/colors.js';
import { CODE_SNIPPETS, hlLine } from '../../constants/codeSnippets.js';
import useInView from '../../hooks/useInView.jsx';

export default function DevDepth(){
  const[ref,vis]=useInView(.08);
  const[active,setActive]=useState(0);
  const snip=CODE_SNIPPETS[active];

  return(
    <section id="code" style={{padding:'80px 32px',zIndex:1,position:'relative'}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div ref={ref} className="rv" style={vis?{opacity:1,transform:'none'}:{}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <div className="label" style={{marginBottom:12}}>Code and Implementation</div>
            <h2 className="display" style={{fontSize:'clamp(2rem,4vw,3.2rem)',color:'#f1f5f9'}}>
              Architect who <span className="g-ind">actually codes</span>
            </h2>
            <p style={{color:'#64748b',marginTop:12,fontSize:14,maxWidth:540,margin:'12px auto 0'}}>
              I design the systems and implement the hardest parts. Real patterns from production code.
            </p>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'200px 1fr',gap:20,alignItems:'start'}}>
            {/* Tab selector */}
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {CODE_SNIPPETS.map((s,i)=>(
                <button key={i} onClick={()=>setActive(i)} style={{
                  padding:'12px 14px',borderRadius:10,textAlign:'left',cursor:'pointer',fontFamily:'inherit',
                  background:active===i ? s.color+'18' : 'rgba(255,255,255,.03)',
                  border:'1px solid '+(active===i ? s.color+'44' : 'rgba(255,255,255,.06)'),
                  color:active===i ? s.color : '#64748b',
                  fontSize:12,fontWeight:600,transition:'all .25s',
                  boxShadow:active===i ? '0 0 20px '+s.color+'18' : 'none',
                }}>
                  {s.label}
                </button>
              ))}
              <div style={{marginTop:12,padding:'12px 14px',background:'rgba(99,102,241,.04)',borderRadius:10,border:'1px solid rgba(99,102,241,.1)'}}>
                <div className="mono" style={{fontSize:9,color:'#64748b',marginBottom:8}}>ALSO BUILT WITH</div>
                {['Jasmine','Karma','Angular CDK','Zone.js','SCSS Modules','Webpack','esbuild'].map(t=>(
                  <div key={t} className="mono" style={{fontSize:9,color:'#64748b',padding:'2px 0'}}>{'·'} {t}</div>
                ))}
              </div>
            </div>

            {/* Code block */}
            <div key={active} style={{borderRadius:16,overflow:'hidden',border:'1px solid '+snip.color+'28',boxShadow:'0 0 40px '+snip.color+'0a',animation:'slide-up .35s ease both'}}>
              {/* Mac-style title bar */}
              <div style={{background:'rgba(10,13,28,.98)',borderBottom:'1px solid '+snip.color+'18',padding:'11px 18px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{display:'flex',gap:7}}>
                  {['#ff5f56','#febc2e','#27c840'].map(c=>(
                    <div key={c} style={{width:11,height:11,borderRadius:'50%',background:c,opacity:.75}}/>
                  ))}
                </div>
                <span className="mono" style={{fontSize:10,color:snip.color}}>{snip.label}</span>
                <span className="mono" style={{fontSize:10,color:'#64748b'}}>{'.'}{snip.lang}</span>
              </div>

              {/* Code lines */}
              <div style={{background:'rgba(8,11,22,.98)',padding:'22px 26px',overflowX:'auto'}}>
                <pre className="mono" style={{fontSize:12,lineHeight:1.8,margin:0,whiteSpace:'pre'}}>
                  {snip.lines.map((line,li)=>{
                    if(line==='') return <div key={li} style={{height:'0.5em'}}/>;
                    const spans=hlLine(line);
                    return(
                      <div key={li}>
                        {spans.map((sp,si)=>(
                          <span key={si} style={{color:sp.c}}>{sp.t}</span>
                        ))}
                      </div>
                    );
                  })}
                </pre>
              </div>

              {/* Footer */}
              <div style={{background:'rgba(10,13,28,.98)',borderTop:'1px solid '+snip.color+'18',padding:'8px 18px',display:'flex',gap:20}}>
                {[['Pattern','production-tested'],['Context','enterprise-scale'],['Ownership','end to end']].map(([k,v])=>(
                  <div key={k} style={{display:'flex',gap:5,alignItems:'center'}}>
                    <span className="mono" style={{fontSize:9,color:'#64748b'}}>{k}:</span>
                    <span className="mono" style={{fontSize:9,color:snip.color}}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Depth signals */}
          <div style={{marginTop:28,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:14}}>
            {[
              {icon:'⚡',title:'Performance-First Coding',desc:'OnPush, memoization, virtual scroll, Web Workers — applied where they matter, not everywhere.'},
              {icon:'🧪',title:'Test-Driven Mindset',desc:'Unit tests with Jest, E2E with Playwright, SCSS safeguards with custom tokenizers.'},
              {icon:'🔁',title:'Reactive Architecture',desc:'RxJS pipelines designed for composability — no memory leaks, no subscriptions left open.'},
              {icon:'🏗️',title:'Strict TypeScript',desc:'Strict mode, discriminated unions, generic constraints — bugs caught at compile time, not in prod.'},
            ].map((c,i)=>(
              <div key={i} style={{padding:'18px',background:'rgba(99,102,241,.04)',border:'1px solid rgba(99,102,241,.1)',borderRadius:12,opacity:vis?1:0,transform:vis?'none':'translateY(12px)',transition:'opacity .5s ease '+(i*.08+.3)+'s, transform .5s ease '+(i*.08+.3)+'s'}}>
                <div style={{fontSize:20,marginBottom:8}}>{c.icon}</div>
                <div style={{fontWeight:700,color:'#e2e8f0',fontSize:13,marginBottom:5}}>{c.title}</div>
                <div style={{color:'#64748b',fontSize:12,lineHeight:1.6}}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}