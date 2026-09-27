import {notFound} from 'next/navigation';
import {Header,Footer,Effects} from '@/components/exhibition/shell';
import {categories,projects} from '@/lib/exhibition';

export function generateStaticParams(){return projects.map(p=>({slug:p.id}))}

export default async function Project({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const p=projects.find(project=>project.id===slug);
  if(!p)notFound();
  const category=categories.find(c=>c.id===p.category)!;
  const galleryImageCount=p.sections.reduce((count,section)=>count+1+(section.additionalImages?.length??0),0);

  return <>
    <Header/>
    <main>
      <section className="project-cover">
        <img src={p.image} alt={`${p.title} 프로젝트 대표 이미지`} fetchPriority="high" decoding="async"/>
        <div className="cover-shade"/>
        <div className="cover-copy">
          <span className="cover-view">VIEW PROJECT ↗</span>
          <p className="eyebrow">{category.english.toUpperCase()} · {p.number}</p>
          <h1>{p.title}</h1>
          <p>{p.subtitle}</p>
        </div>
        <a href="#project-story" className="cover-scroll" aria-label="작품 소개로 이동">↓</a>
      </section>

      <section id="project-story" className="section project-story" data-reveal>
        <div className="section-label">
          <span>PROJECT {p.number}</span>
          <a href={`/projects?category=${p.category}`}>모든 프로젝트 ↗</a>
        </div>
        <div className="story-grid">
          <div>
            <p className="eyebrow project-category-label">{category.name}</p>
            <h2 className="project-story-title">{p.title}</h2>
            <p className="project-story-subtitle">{p.subtitle}</p>
            <p>지도교수 · {category.professor}</p>
            {p.members.length>0&&<p className="project-members">참여 디자이너 · {p.members.join(' · ')}</p>}
          </div>
          <div className="project-story-copy">
            <h3>{p.tagline}</h3>
            <p>{p.description}</p>
          </div>
        </div>

        {p.sections.length>0&&<div className="project-gallery">
          <div className="project-gallery-heading" data-reveal="line">
            <span>PROJECT SCENES</span>
            <span>{String(galleryImageCount).padStart(2,'0')} IMAGES</span>
          </div>
          {p.sections.map((section,index)=><figure className={`project-gallery-item${p.id === 'on-gil' || p.id === 'dalgureungteo' ? ' project-gallery-item-centered-copy' : ''}`} data-reveal key={`${section.image}-${index}`}>
            <div className={`project-gallery-visual${section.additionalImages?.length ? ' project-gallery-visual-stacked' : ''}`}>
              <img src={section.image} alt={section.title?`${p.title} — ${section.title}`:`${p.title} 공간 이미지 ${index+1}`} loading="lazy" decoding="async"/>
              {section.additionalImages?.map((image, imageIndex) => (
                <img src={image} alt={section.title?`${p.title} — ${section.title} ${imageIndex+2}`:`${p.title} 공간 이미지 ${index+1}-${imageIndex+2}`} loading="lazy" decoding="async" key={image}/>
              ))}
            </div>
            {(section.title||section.description)&&<figcaption>
              {section.title&&<h3>{section.title}</h3>}
              {section.description&&<p>{section.description}</p>}
            </figcaption>}
          </figure>)}
        </div>}

        <a className="text-link project-back-link" href={`/projects?category=${p.category}`}>프로젝트 목록으로 <span>↗</span></a>
      </section>
    </main>
    <Footer/><Effects/>
  </>;
}
