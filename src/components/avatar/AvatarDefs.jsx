import React from 'react';

export default function AvatarDefs(){
  return(
    <svg style={{position:'absolute',width:0,height:0,overflow:'hidden'}} aria-hidden="true">
      <defs>
        <filter id="av-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="av-soft"><feGaussianBlur stdDeviation="2"/></filter>
      </defs>
    </svg>
  );
}