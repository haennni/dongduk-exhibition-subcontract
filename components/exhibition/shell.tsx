'use client';
import {usePathname} from 'next/navigation';
import {useEffect,useRef,useState} from 'react';
import {Search,ArrowUpRight} from 'lucide-react';
import {Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {designers,projects} from '@/lib/exhibition';
export function Header(){
  const path=usePathname();
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  const [social,setSocial]=useState(false);
  const [q,setQ]=useState('');
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>70);fn();window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn)},[]);
  const light=(path==='/'&&!scrolled)||Boolean(path?.startsWith('/projects/')&&!scrolled);
  const query=q.trim().toLowerCase();
  return <header className={`site-header ${light?'light':'solid'} ${scrolled?'scrolled':''}`}>
    <a href="/" className="brand" aria-label="Dot to Dot 홈"><img src="/assets/university.png" alt="47th Dongduk W. Univ Interior Design Graduation Exhibition" width="214" height="49"/></a>
    <nav aria-label="주 메뉴">
      <a href="/" aria-current={path==='/'?'page':undefined}>HOME</a>
      <div className="nav-project-menu">
        <a href="/projects" aria-current={path?.startsWith('/projects')?'page':undefined}>PROJECT</a>
        <div className="project-submenu" aria-label="프로젝트 분야">
          <a href="/projects?category=environment"><span>01</span>전시환경디자인</a>
          <a href="/projects?category=graduation"><span>02</span>졸업프로젝트</a>
        </div>
      </div>
      <a href="/designers" aria-current={path?.startsWith('/designers')?'page':undefined}>DESIGNER</a>
      <Dialog open={social} onOpenChange={setSocial}><DialogTrigger className="nav-button">INSTAGRAM <ArrowUpRight size={11}/></DialogTrigger><DialogContent className="search-dialog"><DialogTitle>전시 소식을 만나는 곳</DialogTitle><DialogDescription>공식 인스타그램 계정은 추후 연결될 예정입니다.</DialogDescription></DialogContent></Dialog>
    </nav>
    <Dialog open={open} onOpenChange={setOpen}><DialogTrigger className="search-button" aria-label="전시 검색"><Search size={22} strokeWidth={1.5}/></DialogTrigger><DialogContent className="search-dialog"><DialogTitle>Find your dot.</DialogTitle><DialogDescription>프로젝트 또는 참여 디자이너를 검색해 보세요.</DialogDescription><label className="sr-only" htmlFor="exhibition-search">검색어</label><input id="exhibition-search" value={q} onChange={e=>setQ(e.target.value)} placeholder="프로젝트, 디자이너 이름" className="search-input"/><div className="search-results">{query? <>{projects.filter(p=>(p.title+p.subtitle).toLowerCase().includes(query)).map(p=><a key={p.id} href={`/projects/${p.id}`} onClick={()=>setOpen(false)}><small>PROJECT</small>{p.title} ↗</a>)}{designers.filter(d=>d.name.includes(query)||d.group.includes(query)).map(d=><a key={d.name} href={`/designers#${encodeURIComponent(d.name)}`} onClick={()=>setOpen(false)}><small>{d.group}</small>{d.name} ↗</a>)}{!projects.some(p=>(p.title+p.subtitle).toLowerCase().includes(query))&&!designers.some(d=>d.name.includes(query)||d.group.includes(query))&&<p>검색 결과가 없습니다. 다른 이름으로 검색해 주세요.</p>}</>:<p>20개의 점, 서로 다른 시작을 만나보세요.</p>}</div></DialogContent></Dialog>
  </header>
}
export function Footer(){return <footer><a href="/">DOT TO DOT © 2026</a><span>DONGDUK WOMEN’S UNIVERSITY · INTERIOR DESIGN</span></footer>}
export function Effects(){const cursor=useRef<HTMLDivElement>(null);const path=usePathname();useEffect(()=>{if(!matchMedia('(pointer:fine)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;const fn=(e:PointerEvent)=>{if(!cursor.current)return;const zoom=Number.parseFloat(getComputedStyle(document.body).zoom)||1;cursor.current.style.transform=`translate3d(${e.clientX/zoom}px,${e.clientY/zoom}px,0)`;cursor.current.style.opacity='1';cursor.current.classList.toggle('over',Boolean((e.target as HTMLElement).closest('a,button,input,.project-image,.designer-card')))};const leave=()=>{if(cursor.current)cursor.current.style.opacity='0'};window.addEventListener('pointermove',fn);document.addEventListener('pointerleave',leave);return()=>{window.removeEventListener('pointermove',fn);document.removeEventListener('pointerleave',leave)}},[]);useEffect(()=>{if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('[data-reveal]').forEach(e=>observer.observe(e));return()=>observer.disconnect()},[path]);return <div ref={cursor} className="exhibition-cursor" aria-hidden="true"><i/><b/></div>}
