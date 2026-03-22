import React from 'react';
import { useState, useEffect } from 'react';
import { C } from '../../constants/colors.js';

export default function TypedText({text, speed=28}){
  const[shown,setShown]=useState('');
  const[done,setDone]=useState(false);
  useEffect(()=>{
    setShown('');setDone(false);
    let i=0;
    const iv=setInterval(()=>{
      i++;
      setShown(text.slice(0,i));
      if(i>=text.length){clearInterval(iv);setDone(true);}
    },speed);
    return()=>clearInterval(iv);
  },[text]);
  return(
    <span>
      {shown}
      {!done&&<span style={{animation:'blink .7s step-end infinite',color:C.ind}}>|</span>}
    </span>
  );
}