import React from 'react';
import { C } from '../../constants/colors.js';

export default function CaseDiagram({type, color}){
  const fc='rgba(255,255,255,.06)',ft='rgba(255,255,255,.08)',fl='#64748b',fh='#94a3b8';
  const box=(x,y,w,h,label,sub,accent)=>(
    <g key={label}>
      <rect x={x} y={y} width={w} height={h} rx={7} fill={accent?`${color}14`:fc} stroke={accent?`${color}55`:ft} strokeWidth={accent?1.5:1}/>
      <text x={x+w/2} y={y+h/2-(sub?5:0)} textAnchor="middle" dominantBaseline="middle" fontSize={10} fontWeight={accent?700:500} fill={accent?'#e2e8f0':fh} fontFamily="Plus Jakarta Sans,sans-serif">{label}</text>
      {sub&&<text x={x+w/2} y={y+h/2+8} textAnchor="middle" fontSize={8} fill={fl} fontFamily="IBM Plex Mono,monospace">{sub}</text>}
    </g>
  );
  const arr=(x1,y1,x2,y2)=>{
    const dx=x2-x1,dy=y2-y1,len=Math.sqrt(dx*dx+dy*dy);
    const nx=dx/len,ny=dy/len;
    const ax=x2-nx*8,ay=y2-ny*8;
    return(
      <g>
        <line x1={x1} y1={y1} x2={ax} y2={ay} stroke={`${color}44`} strokeWidth="1.2" strokeDasharray="4 3" style={{animation:'flow 2s linear infinite'}}/>
        <polygon points={`${x2-ny*4-nx*8},${y2+nx*4-ny*8} ${x2+ny*4-nx*8},${y2-nx*4-ny*8} ${x2},${y2}`} fill={`${color}66`}/>
      </g>
    );
  };
  if(type==='comp') return(
    <svg viewBox="0 0 500 170" style={{width:'100%'}}>
      {['Team A','Team B','Team C'].map((t,i)=>box(20+i*160,10,120,30,t,null,false))}
      {[80,240,400].map((x,i)=>arr(x,40,x,72))}
      {box(20,72,460,48,'Component Library','40+ Modules · Storybook · Design Tokens',true)}
      {[80,240,400].map((x,i)=>arr(x,120,x,148))}
      {['Product A','Product B','Product C'].map((p,i)=>box(20+i*160,148,120,18,p,null,false))}
    </svg>
  );
  if(type==='rtdata') return(
    <svg viewBox="0 0 580 90" style={{width:'100%'}}>
      {[['WebSocket','Feed'],['RxJS','bufferTime(16ms)'],['Web Worker','Transform'],['OnPush','Component'],['Virtual','60fps DOM']].map(([l,s],i)=>box(8+i*114,18,108,52,l,s,i===4))}
      {[0,1,2,3].map(i=>arr(116+i*114,44,122+i*114,44))}
    </svg>
  );
  if(type==='api') return(
    <svg viewBox="0 0 480 200" style={{width:'100%'}}>
      {box(165,5,150,34,'Frontend',null,false)}
      {arr(240,39,240,68)}
      {box(140,68,200,36,'API Gateway',null,true)}
      {[[20,140],[120,140],[220,140],[320,140]].map(([x],i)=>{
        const sx=140+(i+.5)*50,sy=104;
        return(<g key={i}>{arr(sx,sx===140?104:104,x+40,140)}{box(x,140,80,32,`Svc ${i+1}`,null,false)}</g>);
      })}
      {[arr(180,104,70,140),arr(210,104,160,140),arr(240,104,260,140),arr(270,104,360,140)]}
      {box(130,185,90,14,'Failure: Cache',null,false)}
      {arr(240,104,175,185)}
    </svg>
  );
  if(type==='micro') return(
    <svg viewBox="0 0 520 160" style={{width:'100%'}}>
      {box(185,5,150,34,'Frontend',null,false)}
      {arr(260,39,260,68)}
      {box(150,68,220,36,'Load Balancer',null,true)}
      {[0,1,2,3,4].map(i=>{ const x=20+i*98; return(<g key={i}>{arr(190+i*20-20,104,x+46,128)}{box(x,128,92,28,`Service ${i+1}`,null,false)}</g>); })}
      {box(170,5,180,28,'Event Bus ↔ Async',null,false)}
    </svg>
  );
  if(type==='cicd') return(
    <svg viewBox="0 0 520 180" style={{width:'100%'}}>
      {box(185,5,150,30,'PR Commit',null,false)}
      {arr(260,35,260,58)}
      {box(155,58,210,30,'GitHub Actions',null,true)}
      {arr(260,88,260,108)}
      <rect x={20} y={108} width={480} height={46} rx={8} fill={`${color}09`} stroke={`${color}22`} strokeWidth="1"/>
      <text x={260} y={122} textAnchor="middle" fontSize={9} fill={fl} fontFamily="IBM Plex Mono,monospace">TEST MATRIX — 4 Clients × 3 Devices = 12 Parallel Jobs</text>
      {[0,1,2,3,4,5].map(i=><rect key={i} x={28+i*80} y={128} width={72} height={18} rx={4} fill={`${color}15`} stroke={`${color}33`} strokeWidth="1"/>)}
      {arr(260,154,260,166)}
      {box(155,166,210,12,'Fan-in Gate ✓ Branch Protection',null,false)}
    </svg>
  );
  return null;
}