import { useState, useEffect } from 'react';

export default function useCounter(target,dur=2000,go=false){
  const[n,setN]=useState(0);
  useEffect(()=>{
    if(!go)return;
    let s=0;
    const step=target/(dur/16);
    const t=setInterval(()=>{
      s+=step;
      if(s>=target){setN(target);clearInterval(t);}
      else setN(Math.floor(s));
    },16);
    return()=>clearInterval(t);
  },[target,dur,go]);
  return n;
}
