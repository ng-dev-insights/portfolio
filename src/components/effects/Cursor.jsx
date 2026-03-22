import React from 'react';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export default function Cursor(){
  const dot=useRef(null),ring=useRef(null);
  useEffect(()=>{
    let tx=0,ty=0,rx=0,ry=0;
    const move=e=>{tx=e.clientX;ty=e.clientY;if(dot.current){dot.current.style.left=tx+'px';dot.current.style.top=ty+'px';}};
    let af=requestAnimationFrame(function loop(){
      rx+=(tx-rx)*.13;ry+=(ty-ry)*.13;
      if(ring.current){ring.current.style.left=rx+'px';ring.current.style.top=ry+'px';}
      af=requestAnimationFrame(loop);
    });
    window.addEventListener('mousemove',move);
    const enlarge=()=>{if(ring.current){ring.current.style.width='48px';ring.current.style.height='48px';}};
    const shrink=()=>{if(ring.current){ring.current.style.width='30px';ring.current.style.height='30px';}};
    document.querySelectorAll('a,button,[data-hover]').forEach(el=>{el.addEventListener('mouseenter',enlarge);el.addEventListener('mouseleave',shrink);});
    return()=>{cancelAnimationFrame(af);window.removeEventListener('mousemove',move);};
  },[]);
  return(<><div id="cdot" ref={dot}/><div id="cring" ref={ring}/></>);
}