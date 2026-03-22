import React from 'react';
import { useState, useMemo } from 'react';

/* ═══ DEV CHARACTER — geometric stroke-limb style, clean rotation ═══ */
export default function DevCharacter({look, mode, small, celebrating}){
  const lx = Math.max(-1, Math.min(1, look?.x || 0));
  const ly = Math.max(-1, Math.min(1, look?.y || 0));
  const ex = lx * (small ? 1.5 : 3);
  const ey = ly * (small ? 1.5 : 3);
  const headRot = lx * 4 * (mode==='focus' ? 1.5 : 1);
  const W = small ? 80 : 158;

  const isWalk    = mode==='walk';
  const isPoint   = mode==='focus'||mode==='explain';
  const isWave    = mode==='wave';
  const isJump    = mode==='excited'||celebrating;
  const isPride   = mode==='proud';
  const isCurious = mode==='curious';

  const bodyAnim = celebrating?'celebrate-pop .6s cubic-bezier(.4,0,.2,1) 3'
    :isWalk?'walk-bob .55s ease-in-out infinite'
    :isJump?'char-jump .5s ease-in-out infinite'
    :isCurious?'curious-lean 2s ease-in-out infinite'
    :'breathe 5s ease-in-out infinite';

  // Mouth paths — all well below glasses (glasses end at y≈114, nose at y≈118)
  const smile = (celebrating||isPride||isWave)?'M 84 128 Q 100 143 116 128'
    :isJump?'M 84 128 Q 100 140 116 128'
    :isPoint?'M 87 130 Q 100 136 113 130'
    :isCurious?'M 88 132 Q 100 128 112 130'
    :'M 87 130 Q 100 136 113 130';

  const browUp   = celebrating||isPride||isJump;
  const browDown = isPoint||isCurious;

  return(
    <svg viewBox="0 0 200 340" xmlns="http://www.w3.org/2000/svg"
      style={{width:W,height:'auto',willChange:'transform',display:'block',
        filter:'drop-shadow(0 '+(small?4:14)+'px '+(small?14:36)+'px rgba(0,0,0,'+(small?.38:.5)+')',
      }}>

      {/* Ground shadow */}
      <ellipse cx="100" cy="334" rx={small?24:56} ry="5" fill="rgba(0,0,0,.22)"/>

      <g style={{transformOrigin:'100px 230px',animation:bodyAnim,willChange:'transform'}}>

        {/* ══ LEGS — stroke-based, rotate cleanly ══ */}
        <g style={{transformOrigin:'80px 240px',animation:isWalk?'leg-l .55s ease-in-out infinite':'none'}}>
          <line x1="80" y1="240" x2="80" y2="308" stroke="#1e3a5f" strokeWidth="22" strokeLinecap="round"/>
          <rect x="58" y="304" width="36" height="14" rx="7" fill="#f0f4ff"/>
          <rect x="60" y="313" width="32" height="5" rx="2.5" fill="#cbd5e1"/>
          <path d="M 62,308 L 90,307" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" opacity=".8"/>
        </g>
        <g style={{transformOrigin:'120px 240px',animation:isWalk?'leg-r .55s ease-in-out infinite':'none'}}>
          <line x1="120" y1="240" x2="120" y2="308" stroke="#1e3a5f" strokeWidth="22" strokeLinecap="round"/>
          <rect x="106" y="304" width="36" height="14" rx="7" fill="#f0f4ff"/>
          <rect x="108" y="313" width="32" height="5" rx="2.5" fill="#cbd5e1"/>
          <path d="M 110,308 L 138,307" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" opacity=".8"/>
        </g>

        {/* ══ HOODIE TORSO ══ */}
        {/* Hood flaps behind head */}
        <path d="M 68,142 Q 64,128 68,118 Q 76,132 90,138" fill="#3730a3"/>
        <path d="M 132,142 Q 136,128 132,118 Q 124,132 110,138" fill="#3730a3"/>
        <path d="M 70,122 Q 78,134 92,138" stroke="#818cf8" strokeWidth="1.3" fill="none" opacity=".45"/>
        <path d="M 130,122 Q 122,134 108,138" stroke="#818cf8" strokeWidth="1.3" fill="none" opacity=".45"/>
        {/* Main body */}
        <rect x="60" y="138" width="80" height="108" rx="28" fill="#4338ca"/>
        {/* Side shading */}
        <path d="M 60,155 Q 54,148 62,142 L 70,140 L 65,162 Z" fill="#2e2a8e" opacity=".5"/>
        <path d="M 140,155 Q 146,148 138,142 L 130,140 L 135,162 Z" fill="#2e2a8e" opacity=".5"/>
        {/* Center seam */}
        <line x1="100" y1="140" x2="100" y2="243" stroke="#3730a3" strokeWidth="1.4" opacity=".8"/>
        {/* Drawstrings */}
        <path d="M 89,141 Q 87,162 85,184" stroke="#a5b4fc" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity=".8"/>
        <path d="M 111,141 Q 113,162 115,184" stroke="#a5b4fc" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity=".8"/>
        <ellipse cx="85" cy="186" rx="3.5" ry="5" fill="#818cf8"/>
        <ellipse cx="115" cy="186" rx="3.5" ry="5" fill="#818cf8"/>
        {/* Kangaroo pocket */}
        <path d="M 68,210 Q 100,196 132,210 L 128,236 Q 100,246 72,236 Z" fill="#3730a3" opacity=".7"/>
        <line x1="100" y1="204" x2="100" y2="240" stroke="#2e2a96" strokeWidth="1.3"/>
        {/* </> badge */}
        {!small&&<>
          <rect x="118" y="153" width="26" height="15" rx="4" fill="#4338ca"/>
          <rect x="118" y="153" width="26" height="15" rx="4" fill="none" stroke="#818cf8" strokeWidth=".7" opacity=".6"/>
          <text x="131" y="163" textAnchor="middle" fontSize="7" fontWeight="800" fill="#e0e7ff" fontFamily="'IBM Plex Mono',monospace">{'</>'}</text>
        </>}
        {/* Belt */}
        <rect x="62" y="242" width="76" height="9" rx="3" fill="#0f172a"/>
        <rect x="84" y="243" width="32" height="7" rx="2" fill="#3730a3"/>

        {/* ══ LEFT ARM — stroke line, rotates cleanly ══ */}
        <g style={{
          transformOrigin:'68px 158px',
          animation:isWalk?'arm-l .55s ease-in-out infinite':isWave?'wave-arm .8s ease-in-out infinite':'none',
          transition:'transform .4s ease',
        }}>
          <line x1="68" y1="158" x2="38" y2="228" stroke="#4338ca" strokeWidth="24" strokeLinecap="round"/>
          {/* Wrist */}
          <circle cx="38" cy="232" r="11" fill="#F5C28A"/>
          {/* Coffee mug */}
          <rect x="23" y="208" width="22" height="26" rx="4" fill="#7c2d12"/>
          <rect x="22" y="206" width="24" height="6" rx="3" fill="#b45309"/>
          <rect x="25" y="219" width="18" height="11" rx="2.5" fill="#4338ca"/>
          <text x="34" y="228" textAnchor="middle" fontSize="8" fill="#c7d2fe" fontWeight="700" fontFamily="'IBM Plex Mono',monospace">{'/>'}</text>
          <path d="M 45,214 Q 54,214 54,220 Q 54,226 45,226" fill="none" stroke="#92400e" strokeWidth="3" strokeLinecap="round"/>
          {/* Steam */}
          {[0,1].map(i=>(
            <path key={i} d={'M '+(27+i*7)+' 202 Q '+(28+i*7)+' 195 '+(27+i*7)+' 187'}
              stroke="rgba(255,255,255,.5)" strokeWidth="1.5" fill="none" strokeLinecap="round"
              style={{animation:'steam '+(2+i*.7)+'s ease-out '+(i*.4)+'s infinite'}}/>
          ))}
        </g>

        {/* ══ RIGHT ARM — stroke line, rotates cleanly ══ */}
        <g style={{
          transformOrigin:'132px 158px',
          animation:isWalk?'arm-r .55s ease-in-out infinite':isPoint?'point-arm 1.2s ease-in-out infinite':'none',
          transition:'transform .4s ease',
          transform:(!isWalk&&!isPoint)?(isPride||celebrating?'rotate(-15deg)':'rotate(0deg)'):'none',
        }}>
          <line x1="132" y1="158" x2="162" y2="228" stroke="#4338ca" strokeWidth="24" strokeLinecap="round"/>
          <circle cx="162" cy="232" r="11" fill="#F5C28A"/>
          {/* Pointing finger */}
          {isPoint&&<>
            <line x1="162" y1="232" x2="180" y2="216" stroke="#F5C28A" strokeWidth="8" strokeLinecap="round"/>
            <circle cx="181" cy="215" r="5" fill="#e8a865"/>
          </>}
        </g>

        {/* ══ HEAD GROUP ══ */}
        <g style={{
          transformOrigin:'100px 130px',
          transform:'rotate('+headRot+'deg)',
          transition:'transform 0.35s cubic-bezier(.4,0,.2,1)',
        }}>
          {/* Neck */}
          <rect x="90" y="128" width="20" height="18" rx="6" fill="#e8a865"/>
          {/* Face */}
          <rect x="55" y="44" width="90" height="96" rx="38" fill="#F5C28A"/>
          {/* Cheeks (blush) */}
          <ellipse cx="66" cy="122" rx="14" ry="10" fill="#f4a07a" opacity=".5"/>
          <ellipse cx="134" cy="122" rx="14" ry="10" fill="#f4a07a" opacity=".5"/>
          {/* Ears */}
          <circle cx="53" cy="100" r="12" fill="#F5C28A"/>
          <circle cx="53" cy="100" r="6.5" fill="#e8a865"/>
          <circle cx="147" cy="100" r="12" fill="#F5C28A"/>
          <circle cx="147" cy="100" r="6.5" fill="#e8a865"/>

          {/* ══ HEADPHONES ══ */}
          <path d="M 47,96 C 47,32 153,32 153,96" fill="none" stroke="#1e293b" strokeWidth="8" strokeLinecap="round"/>
          {/* Left cup */}
          <rect x="36" y="79" width="18" height="34" rx="9" fill="#1e293b"/>
          <rect x="40" y="84" width="8" height="24" rx="4" fill="#334155"/>
          <circle cx="44" cy="105" r="3.5" fill="#6366f1" filter="url(#av-glow)"/>
          {/* Right cup */}
          <rect x="146" y="79" width="18" height="34" rx="9" fill="#1e293b"/>
          <rect x="152" y="84" width="8" height="24" rx="4" fill="#334155"/>
          <circle cx="156" cy="105" r="3.5" fill="#6366f1" filter="url(#av-glow)"/>

          {/* ══ BEANIE ══ */}
          <path d="M 56,74 Q 55,26 100,24 Q 145,26 144,74 Z" fill="#6366f1"/>
          {/* Shadow on beanie */}
          <path d="M 56,74 Q 58,50 70,36 Q 66,56 67,74 Z" fill="rgba(0,0,0,.12)"/>
          <rect x="53" y="68" width="94" height="17" rx="8" fill="#3730a3"/>
          {[65,74,83,92,101,110,119,128,137].map(x=>(
            <line key={x} x1={x} y1="70" x2={x} y2="83" stroke="#2e2a8e" strokeWidth="1.8" opacity=".7"/>
          ))}
          {/* Pom-pom */}
          <circle cx="100" cy="20" r="13" fill="#818cf8" filter="url(#av-glow)"/>
          <circle cx="100" cy="20" r="8" fill="#a5b4fc"/>
          <circle cx="96" cy="16" r="3" fill="#c7d2fe" opacity=".7"/>
          {/* SB monogram */}
          {!small&&<text x="100" y="63" textAnchor="middle" fontSize="9" fontWeight="900" fill="#e0e7ff" fontFamily="'Plus Jakarta Sans',sans-serif" letterSpacing="2">SB</text>}

          {/* ══ GLASSES — RECTANGULAR, clean ══ */}
          {/* Left lens */}
          <rect x="64" y="86" width="32" height="26" rx="9" fill="rgba(99,102,241,.12)"/>
          <rect x="64" y="86" width="32" height="26" rx="9" fill="none" stroke="#1e293b" strokeWidth="3.5"/>
          {/* Right lens */}
          <rect x="104" y="86" width="32" height="26" rx="9" fill="rgba(99,102,241,.12)"/>
          <rect x="104" y="86" width="32" height="26" rx="9" fill="none" stroke="#1e293b" strokeWidth="3.5"/>
          {/* Bridge */}
          <line x1="96" y1="99" x2="104" y2="99" stroke="#1e293b" strokeWidth="3.5"/>
          {/* Arms */}
          <line x1="55" y1="95" x2="64" y2="95" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="136" y1="95" x2="145" y2="95" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round"/>
          {/* Lens shine */}
          <path d="M 68,92 Q 71,89 75,92" stroke="rgba(255,255,255,.55)" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M 108,92 Q 111,89 115,92" stroke="rgba(255,255,255,.55)" strokeWidth="2" fill="none" strokeLinecap="round"/>

          {/* ══ EYES ── inside glasses, y≈99 (glasses y=86+13=99 center) ══ */}
          <g style={{animation:'blinkEye 4s ease-in-out infinite',transformOrigin:'80px 99px',transformBox:'fill-box'}}>
            <circle cx={80+ex} cy={99+ey} r="4.5" fill="#0f172a"/>
            <circle cx={81.5+ex} cy={97.5+ey} r="1.8" fill="white" opacity=".9"/>
            <circle cx={79+ex} cy={101.5+ey} r=".8" fill="white" opacity=".3"/>
          </g>
          <g style={{animation:'blinkEye 4s ease-in-out infinite .22s',transformOrigin:'120px 99px',transformBox:'fill-box'}}>
            <circle cx={120+ex} cy={99+ey} r="4.5" fill="#0f172a"/>
            <circle cx={121.5+ex} cy={97.5+ey} r="1.8" fill="white" opacity=".9"/>
            <circle cx={119+ex} cy={101.5+ey} r=".8" fill="white" opacity=".3"/>
          </g>

          {/* ══ EYEBROWS ══ */}
          <path d={browUp?'M 67 78 Q 80 73 92 78':browDown?'M 67 81 Q 80 85 92 81':'M 67 81 Q 80 77 92 81'}
            stroke="#451a03" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d={browUp?'M 108 78 Q 120 73 133 78':browDown?'M 108 81 Q 120 85 133 81':'M 108 81 Q 120 77 133 81'}
            stroke="#451a03" strokeWidth="3.5" fill="none" strokeLinecap="round"/>

          {/* ══ NOSE (below glasses, glasses end at y=112) ══ */}
          <path d="M 97 118 Q 100 123 103 118" stroke="#d4895a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

          {/* ══ MOUTH (well below nose) ══ */}
          <path d={smile} stroke="#9a3412" strokeWidth="3.2" fill="none" strokeLinecap="round"/>
          {(celebrating||isPride||isWave)&&(
            <ellipse cx="100" cy="135" rx="11" ry="5" fill="rgba(255,255,255,.28)"/>
          )}

          {/* Beard stubble (subtle) */}
          <path d="M 72,132 Q 100,146 128,132" stroke="#c8854a" strokeWidth="4.5" fill="none" strokeLinecap="round" opacity=".35"/>
        </g>

      </g>
    </svg>
  );
}