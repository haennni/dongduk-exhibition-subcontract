'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {Header,Footer,Effects} from '@/components/exhibition/shell';
import {groups} from '@/lib/exhibition';
export default function Home(){
 const hero=useRef<HTMLElement>(null);
 const stage=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  let frame=0;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const update=()=>{frame=0;if(!hero.current||!stage.current)return;
   const rect=stage.current.getBoundingClientRect();
   const distance=Math.max(stage.current.offsetHeight-hero.current.offsetHeight,1);
   const progress=motion.matches?0:Math.max(0,Math.min(-rect.top/distance,1));
   const eased=progress*progress*(3-2*progress);
   hero.current.style.setProperty('--exit',String(eased));
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
  update();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);motion.addEventListener('change',schedule);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);motion.removeEventListener('change',schedule)};
 },[]);
 return <><Header/><main><div ref={stage} className="hero-stage"><section ref={hero} className="hero" aria-labelledby="hero-title"><div className="hero-glow"/><div className="orbit-scene" aria-hidden="true"><img className="live-orbits" src="/assets/orbits-animated.svg" alt="" width="2000" height="1240"/></div><div className="hero-topline"><span>47TH GRADUATION EXHIBITION</span><span>INTERIOR DESIGN, DONGDUK</span></div><div className="hero-title"><p className="eyebrow">20 POINTS. INFINITE CONNECTIONS.</p><h1 id="hero-title"><img src="/assets/wordmark.png" alt="Dot to Dot" width="1457" height="240"/></h1><p className="hero-description">각자의 점이 만나, 새로운 공간으로.</p></div><div className="hero-bottom"><p>제47회 동덕여자대학교<br/>실내디자인전공 졸업전시회</p><a className="scroll-link" href="#about"><span>SCROLL TO CONNECT</span><span className="down-arrow">↓</span></a><p className="hero-date">2026. 10. 08 — 10. 18<br/><span>DONGDUK DESIGN HUB</span></p></div><span className="hero-coordinate">37°31′ N &nbsp; 127°03′ E</span></section></div><section id="about" className="about section"><div className="section-label"><span>01 / THE EXHIBITION</span><span>점에서 선으로, 선에서 공간으로</span></div><div className="about-grid" data-reveal><div className="about-art"><img src="/assets/orbits.png" alt=""/><img className="about-wordmark" src="/assets/wordmark.png" alt="Dot to Dot"/><span>ONE POINT IS A BEGINNING.</span></div><div className="about-copy"><p className="eyebrow blue">DOT TO DOT</p><h2>하나의 점에서,<br/>무한한 가능성으로<span className="blue">.</span></h2><p className="lead">하나의 점은 고립된 개인처럼 보이지만,<br/>그 자체로 무한한 확장을 내포한 시작점이다.</p><p>“Dot to Dot”은 각자의 삶 속에서 찍어온 고유한 지점들의 점들을 연결하여 새로운 가능성의 지도를 그려나가는 과정입니다. 점이 선이 되고, 선이 면을 향해 손을 뻗는 순간, 누군가를 품을 수 있는 공간으로 진화합니다.</p><p>이 전시에서 20개의 점이 만드는 정교한 발자취를 통해, 혼자서는 상상할 수 없었던 공동체의 입체적인 풍경을 마주하게 됩니다.</p><Link className="text-link" href="/projects">프로젝트 둘러보기 <span>↗</span></Link></div></div></section><section id="visit" className="visit section"><p className="eyebrow">02 / VISIT THE EXHIBITION</p><h2>Meet at the next dot<span>.</span></h2><div className="visit-grid"><p className="visit-dates">10.08 <span>—</span> 10.18<small>2026 · THURSDAY — SUNDAY</small></p><div><h3>동덕여자대학교 디자인 허브</h3><p>서울 강남구 삼성로 762 · 1F, 2F</p><p>10:00 — 20:00<br/>Opening &nbsp; 2026.10.08 · 18:00</p><a className="text-link" href="https://map.naver.com/p/search/동덕여자대학교%20디자인허브" target="_blank" rel="noreferrer">전시장 위치 보기 ↗</a></div></div></section><section className="section floor-section" data-reveal><div className="section-label"><span>03 / INFORMATION</span><span>DESIGN HUB · 1F & 2F</span></div><div className="floor-heading"><h2>공간을 만나는 방법</h2><p>1F · 인포데스크 / 제1 전시장<br/>2F · 전시홀 / 제2 전시장</p></div><img src="/assets/floor-plan.png" alt="디자인 허브 1층과 2층 전시장, 인포데스크, 엘리베이터와 계단 위치를 표시한 안내도" className="floor-plan" loading="lazy"/></section><section className="section participants" data-reveal><div className="section-label"><span>04 / PARTICIPANTS</span><span>20 DOTS, ONE CONNECTION</span></div><h2>함께, 하나의 전시로.</h2><div className="participants-grid">{groups.map(g=><div key={g.name}><h3>{g.name}</h3>{g.members.map(([role,name])=><p key={name}><span>{role}</span><Link href={`/designers#${encodeURIComponent(name)}`}>{name}</Link></p>)}</div>)}</div><div className="instructors"><h3>Instructors</h3>{[['졸업프로젝트','이지영'],['전시환경디자인','손희주'],['전시환경디자인','이용신'],['전시환경디자인','박찬호']].map(([subject,name])=><div className="instructor" key={name}><small>{subject}</small><span>{name} 교수님</span></div>)}</div></section></main><Footer/><Effects/></>
}
