import React from 'react';
import { C } from '../../constants/colors.js';

export default function Confetti(){
  const COLORS=['#6366f1','#a78bfa','#10b981','#22d3ee','#f59e0b','#f43f5e'];
  const pieces=Array.from({length:14},(_,i)=>({
    id:i,
    color:COLORS[i%COLORS.length],
    x:Math.random()*120-60,
    size:5+Math.random()*5,
    delay:Math.random()*.5,
    dur:0.8+Math.random()*.6,
    rot:Math.random()*360,
  }));
  return(
    <div style={{position:'absolute',top:-10,left:'50%',width:0,height:0,pointerEvents:'none',zIndex:10}}>
      {pieces.map(p=>(
        <div key={p.id} style={{
          position:'absolute',
          width:p.size,height:p.size,
          background:p.color,
          borderRadius:p.size*.3,
          left:p.x,
          animation:`confetti-drop ${p.dur}s ease-out ${p.delay}s both`,
        }}/>
      ))}
    </div>
  );
}