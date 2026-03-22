import React from 'react';
import { useState, useEffect, useCallback } from 'react';

// Constants
import { C } from './constants/colors.js';
import { TOUR_STEPS } from './constants/data.js';
import { speak, stopSpeech, INTRO_SPEECH } from './constants/speech.js';

// Effects
import ParticleCanvas from './components/effects/ParticleCanvas.jsx';
import Cursor from './components/effects/Cursor.jsx';

// Avatar
import AvatarDefs from './components/avatar/AvatarDefs.jsx';
import CharacterLayer from './components/avatar/CharacterLayer.jsx';

// Layout
import Nav from './components/layout/Nav.jsx';
import Ticker from './components/layout/Ticker.jsx';
import Footer from './components/layout/Footer.jsx';

// Hero
import Hero from './components/hero/Hero.jsx';

// Sections
import SystemViz from './components/sections/SystemViz.jsx';
import Timeline from './components/sections/Timeline.jsx';
import TechOrbit from './components/sections/TechOrbit.jsx';
import PerfDashboard from './components/sections/PerfDashboard.jsx';
import ComponentShowcase from './components/sections/ComponentShowcase.jsx';
import Leadership from './components/sections/Leadership.jsx';
import FullStack from './components/sections/FullStack.jsx';
import DevDepth from './components/sections/DevDepth.jsx';

export default function App(){
  const[tourActive,setTourActive]=useState(false);
  const[tourStep,setTourStep]=useState(0);
  const[tourSection,setTourSection]=useState(null);
  const[hoveredNode,setHoveredNode]=useState(null);
  const[activeSection,setActiveSection]=useState('home');
  // Reduce motion — respects OS preference, toggleable in nav
  const[reduced,setReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion:reduce)').matches);
  useEffect(()=>{
    document.body.classList.toggle('reduce-motion',reduced);
    if(reduced){document.getElementById('cdot')?.style&&(document.getElementById('cdot').style.display='none');document.getElementById('cring')?.style&&(document.getElementById('cring').style.display='none');}
    else{document.getElementById('cdot')?.style&&(document.getElementById('cdot').style.display='');document.getElementById('cring')?.style&&(document.getElementById('cring').style.display='');}
  },[reduced]);
  const toggleMotion=()=>setReduced(r=>!r);

  // Scroll reveals
  useEffect(()=>{
    const els=document.querySelectorAll('.rv');
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('v');}),{threshold:.08});
    els.forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);

  // Section detection for assistant messages
  useEffect(()=>{
    const sections=['home','systems','experience','skills','performance','contact'];
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting)setActiveSection(e.target.id||'home');});
    },{threshold:.35});
    sections.forEach(id=>{const el=document.getElementById(id);if(el)obs.observe(el);});
    return()=>obs.disconnect();
  },[]);

  // Auto-start tour after 4s (give assistant time to appear first)
  useEffect(()=>{const t=setTimeout(()=>{setTourActive(true);},4000);return()=>clearTimeout(t);},[]);

  const startTour=()=>{
  setTourStep(0);setTourActive(true);
  // Scroll to top first so character is visible
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(()=>speak(INTRO_SPEECH),800);
};
  const nextTourStep=()=>{
    const next=tourStep+1;
    if(next>=TOUR_STEPS.length){
      setTourActive(false);setTourSection(null);
      stopSpeech();
      speak("That's the full tour! Feel free to explore on your own, or reach out if you'd like to work together.",0.9);
      return;
    }
    setTourStep(next);
    const step=TOUR_STEPS[next];
    const sec=step.section;
    setTourSection(sec);
    // Scroll then speak after brief delay
    if(sec){
      document.getElementById(sec)?.scrollIntoView({behavior:'smooth',block:'start'});
      setTimeout(()=>speak(step.desc,0.92),600);
    } else {
      speak(step.desc,0.92);
    }
  };
  const skipTour=()=>{setTourActive(false);setTourSection(null);stopSpeech();};

  return(
    <>
      <AvatarDefs/>
      <ParticleCanvas/>
      <Cursor/>
      <Nav onTour={startTour} reduced={reduced} onReduceMotion={toggleMotion}/>
      <Hero hoveredNode={hoveredNode}/>
      <Ticker/>
      <SystemViz tourActive={tourActive} tourSection={tourSection} onNodeHover={setHoveredNode}/>
      <div className="divider"/>
      <Timeline/>
      <div className="divider"/>
      <TechOrbit/>
      <div className="divider"/>
      <PerfDashboard/>
      <div className="divider"/>
      <ComponentShowcase/>
      <div className="divider"/>
      <Leadership/>
      <div className="divider"/>
      <FullStack/>
      <div className="divider"/>
      <Footer/>
      <CharacterLayer
        hoveredNode={hoveredNode}
        activeSection={activeSection}
        tourActive={tourActive}
        tourStep={tourStep}
        onNext={nextTourStep}
        onSkip={skipTour}
      />
    </>
  );
}