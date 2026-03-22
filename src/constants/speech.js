/* ═══ SPEECH SYNTHESIS — voice introduction ═══ */
export const INTRO_SPEECH = "Hi there! I'm Sanket Bhor, a Frontend Architect with over 8 years of experience. I specialize in building high-performance, scalable UI systems for enterprise platforms. I've worked with Angular, RxJS, TypeScript, and Node.js — designing systems that serve 50 plus enterprise clients. Scroll down to explore my work, or click the Tour button to let me guide you.";

export const speak = (text, rate=0.92, pitch=1.05) => {
  if(!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = rate;
  utt.pitch = pitch;
  utt.volume = 0.85;
  // Prefer a natural voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v=>v.name.includes('Google UK')||v.name.includes('Daniel')||v.name.includes('Alex')||v.lang==='en-GB');
  if(preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
};

export const stopSpeech = () => window.speechSynthesis?.cancel();
