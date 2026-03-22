import React from 'react';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export default function ParticleCanvas(){
  const cvs=useRef(null);
  const mouse=useRef({x:-999,y:-999}); // ← ref at component level (not inside useEffect)

  useEffect(()=>{
    const c=cvs.current;
    if(!c)return;
    const ctx=c.getContext('2d');
    let animId,paused=false;

    // Resize handler
    const resize=()=>{c.width=window.innerWidth;c.height=window.innerHeight;};
    resize();
    window.addEventListener('resize',resize);

    // Mouse tracking — updates the ref, no re-renders
    const onMove=e=>{mouse.current={x:e.clientX,y:e.clientY};};
    window.addEventListener('mousemove',onMove);

    // Pause when tab is hidden to save CPU
    const onVis=()=>{
      paused=document.hidden;
      if(!paused){cancelAnimationFrame(animId);draw();}
    };
    document.addEventListener('visibilitychange',onVis);

    const N=40;
    const pts=Array.from({length:N},()=>({
      x:Math.random()*c.width,y:Math.random()*c.height,
      vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,
      r:Math.random()*1.1+.4,
    }));

    function draw(){
      if(paused)return;
      ctx.clearRect(0,0,c.width,c.height);
      const mx=mouse.current.x,my=mouse.current.y; // read live ref value
      pts.forEach(p=>{
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0||p.x>c.width)p.vx*=-1;
        if(p.y<0||p.y>c.height)p.vy*=-1;
        const dx=p.x-mx,dy=p.y-my,d=Math.sqrt(dx*dx+dy*dy);
        if(d<70&&d>0){p.vx+=dx/d*.04;p.vy+=dy/d*.04;}
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle='rgba(99,102,241,.3)';ctx.fill();
      });
      for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<88){
          ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);
          ctx.strokeStyle=`rgba(99,102,241,${.1*(1-d/88)})`;ctx.lineWidth=.5;ctx.stroke();
        }
      }
      animId=requestAnimationFrame(draw);
    }
    draw();

    return()=>{
      cancelAnimationFrame(animId);
      window.removeEventListener('resize',resize);
      window.removeEventListener('mousemove',onMove);
      document.removeEventListener('visibilitychange',onVis);
    };
  },[]);

  return <canvas ref={cvs} style={{position:'fixed',top:0,left:0,zIndex:0,pointerEvents:'none'}}/>;
}