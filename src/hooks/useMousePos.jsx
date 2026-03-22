import { useState, useEffect } from 'react';

export default function useMousePos(){
  const[p,setP]=useState({x:0,y:0});
  useEffect(()=>{
    const h=e=>setP({x:e.clientX,y:e.clientY});
    window.addEventListener('mousemove',h);
    return()=>window.removeEventListener('mousemove',h);
  },[]);
  return p;
}
