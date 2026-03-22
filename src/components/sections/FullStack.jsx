import React from 'react';
import { C } from '../../constants/colors.js';
import useInView from '../../hooks/useInView.jsx';

export default function FullStack(){
  const[ref,vis]=useInView(.1);
  return(
    <section style={{padding:'80px 32px',zIndex:1,position:'relative'}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div ref={ref} className="rv" style={vis?{opacity:1,transform:'none'}:{}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <div className="label" style={{marginBottom:12}}>Beyond the Frontend</div>
            <h2 className="display" style={{fontSize:'clamp(1.8rem,3.5vw,2.8rem)',color:'#f1f5f9'}}>
              Full Stack <span className="g-em">Capability</span>
            </h2>
            <p style={{color:'#64748b',marginTop:12,fontSize:14,maxWidth:520,margin:'12px auto 0'}}>
              Frontend is my craft — but I speak backend fluently. I've built and shipped the full chain from database to browser.
            </p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:16}}>
            {[
              { icon:'🟢', title:'Node.js & Express', color:C.em,
                items:['REST API design and versioning','Event-driven architecture with queues','Circuit breaker and retry patterns','Real-time streaming via WebSocket','JWT auth and token refresh middleware'],
                note:'Built backend services for Voice Logger (financial-grade) and TEN Platform' },
              { icon:'🗄️', title:'Data & Storage', color:C.cya,
                items:['MySQL — relational schema design','MongoDB — document modeling at scale','Caching strategies (in-memory, CDN)','Query optimization and indexing','Data pipeline integration'],
                note:'Designed data layers for platforms handling 1000+ concurrent users' },
              { icon:'☁️', title:'Cloud & Infra', color:C.amb,
                items:['AWS deployment and configuration','GitHub Actions CI/CD pipelines','TeamCity build automation','Docker containerization basics','Monitoring and observability'],
                note:'Set up CI/CD infrastructure for 4 enterprise client environments at TEN' },
              { icon:'🧩', title:'System Design', color:C.vio,
                items:['Microservices integration patterns','Load balancing and failover','API gateway orchestration','Performance profiling end-to-end','Architecture documentation (RFCs)'],
                note:'Authored architecture RFCs adopted across the engineering org' },
            ].map((c,i)=>(
              <div key={i} style={{background:'rgba(15,20,42,.9)',border:'1px solid rgba(255,255,255,.06)',borderRadius:14,padding:'22px',opacity:vis?1:0,transform:vis?'none':'translateY(16px)',transition:'opacity .5s ease '+(i*.09+.2)+'s, transform .5s ease '+(i*.09+.2)+'s, border-color .3s'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=c.color+'33'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,.06)'}>
                <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
                  <span style={{fontSize:20}}>{c.icon}</span>
                  <span style={{fontWeight:700,color:'#e2e8f0',fontSize:15}}>{c.title}</span>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:6,marginBottom:14}}>
                  {c.items.map((it,j)=>(
                    <div key={j} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                      <span style={{color:c.color,fontSize:10,flexShrink:0,marginTop:3}}>▸</span>
                      <span style={{color:'#64748b',fontSize:12,lineHeight:1.5}}>{it}</span>
                    </div>
                  ))}
                </div>
                <div style={{padding:'8px 12px',background:c.color+'08',borderRadius:8,border:'1px solid '+c.color+'14'}}>
                  <span className="mono" style={{fontSize:9,color:c.color+'99'}}>{c.note}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Balance statement */}
          <div style={{marginTop:24,padding:'20px 24px',background:'rgba(99,102,241,.04)',border:'1px solid rgba(99,102,241,.1)',borderRadius:14,display:'flex',flexWrap:'wrap',gap:24,alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <div className="mono" style={{fontSize:10,color:C.ind,marginBottom:6}}>HONEST SELF-ASSESSMENT</div>
              <div style={{color:'#e2e8f0',fontWeight:600,fontSize:14}}>Frontend-specialist who can own the full stack when needed.</div>
              <div style={{color:'#64748b',fontSize:13,marginTop:4}}>I don't claim to be a backend engineer — but I've shipped enough backend to understand what I'm integrating with and design the frontend layer correctly.</div>
            </div>
            <div style={{display:'flex',gap:12,flexWrap:'wrap',flexShrink:0}}>
              {[{l:'Frontend',v:'Expert',c:C.ind},{l:'Backend',v:'Proficient',c:C.em},{l:'Infra/DevOps',v:'Competent',c:C.amb}].map(m=>(
                <div key={m.l} style={{textAlign:'center',padding:'10px 14px',background:m.c+'0a',border:'1px solid '+m.c+'22',borderRadius:10}}>
                  <div style={{fontWeight:800,color:m.c,fontSize:13}}>{m.v}</div>
                  <div className="mono" style={{fontSize:9,color:'#64748b',marginTop:2}}>{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}