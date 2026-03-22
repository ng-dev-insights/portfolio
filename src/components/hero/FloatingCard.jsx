import React from 'react';
export default function FC({children, style, delay='0s', anim='float'}){
  return(
    <div className="glass-bright will-t" style={{borderRadius:12,padding:'14px 18px',fontSize:12,animation:`${anim} 4s ease-in-out ${delay} infinite`,...style}}>
      {children}
    </div>
  );
}