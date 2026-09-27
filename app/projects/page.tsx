import {Header,Footer,Effects} from '@/components/exhibition/shell';
import {categories,projects} from '@/lib/exhibition';
import {Tabs,TabsList,TabsTrigger,TabsContent} from '@/components/ui/tabs';

type ProjectCategory = 'environment' | 'graduation';

export default async function Projects({searchParams}:{searchParams:Promise<{category?:string}>}){
  const {category}=await searchParams;
  const selected:ProjectCategory=category==='graduation'?'graduation':'environment';

  return <>
    <Header/>
    <main className="inner-page">
      <div className="page-intro">
        <p className="eyebrow blue">OUR POINTS OF VIEW</p>
        <h1>Projects<span className="blue">.</span></h1>
        <p>서로 다른 시선으로, 공간의 다음 가능성을 그립니다.</p>
      </div>
      <Tabs key={selected} defaultValue={selected} className="project-tabs">
        <TabsList variant="line" className="project-tab-list" aria-label="프로젝트 분야">
          {categories.map((c,i)=><TabsTrigger value={c.id} key={c.id}>{c.name}<span>{String(i+1).padStart(2,'0')}</span></TabsTrigger>)}
        </TabsList>
        {categories.map(c=><TabsContent value={c.id} key={c.id}>
          <div className="category-intro">
            <div><h2>{c.name}</h2><p>지도교수 · {c.professor}</p></div>
            <p>{c.description}</p>
          </div>
          <div className="project-grid">
            {projects.filter(p=>p.category===c.id).map(p=><a className="project-card" key={p.id} href={`/projects/${p.id}`}>
              <div className="project-image">
                <img src={p.image} alt={`${p.title} 프로젝트 대표 이미지`} width="1200" height="850" loading="lazy" decoding="async"/>
                <div className="project-overlay">
                  <span>VIEW PROJECT ↗</span>
                  <h3>{p.title}</h3>
                  <p>{p.subtitle}</p>
                </div>
                <span className="project-arrow">↗</span>
              </div>
            </a>)}
          </div>
        </TabsContent>)}
      </Tabs>
    </main>
    <Footer/><Effects/>
  </>;
}
