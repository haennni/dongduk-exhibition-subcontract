import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer, Effects } from '@/components/exhibition/shell';
import { designers, projects } from '@/lib/exhibition';

const profilePath = (name: string) =>
  `/assets/profiles/${encodeURIComponent(name)}.${name === '허윤지' ? 'png' : 'jpg'}`;

export default function Designers() {
  const sortedDesigners = [...designers].sort((a, b) => a.name.localeCompare(b.name, 'ko'));

  return (
    <>
      <Header />
      <main className="inner-page designers-page">
        <div className="page-intro">
          <p className="eyebrow blue">THE PEOPLE BEHIND THE DOTS</p>
          <h1>
            Designers<span className="blue">.</span>
            <sup>20</sup>
          </h1>
          <p>각자의 좌표에서 시작해, 함께 새로운 공간을 만듭니다.</p>
        </div>

        <div className="designer-heading">
          <span>PARTICIPATING DESIGNERS</span>
          <span>이름순 · 가나다</span>
        </div>

        <div className="designer-grid">
          {sortedDesigners.map((designer, index) => {
            const environmentProject = projects.find(
              (project) =>
                project.category === 'environment' && project.members.includes(designer.name),
            );
            const graduationProject = projects.find(
              (project) =>
                project.category === 'graduation' && project.members.includes(designer.name),
            );

            return (
              <article className="designer-card" id={designer.name} key={designer.name}>
                <div className="designer-portrait">
                  <Image
                    src={profilePath(designer.name)}
                    alt={`${designer.name} 디자이너 프로필`}
                    fill
                    sizes="(max-width: 800px) 46vw, (max-width: 1050px) 29vw, 20vw"
                    loading="lazy"
                  />
                  <span className="designer-number">
                    DOT {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="portrait-caption">DONGDUK INTERIOR DESIGN</span>
                </div>

                <div className="designer-name">
                  <h2>{designer.name}</h2>
                  <span>
                    {designer.group} · {designer.role}
                  </span>
                </div>

                <div className="designer-projects" aria-label={`${designer.name} 참여 프로젝트`}>
                  {environmentProject && (
                    <Link href={`/projects/${environmentProject.id}`}>
                      <small>전시환경디자인</small>
                      <span>{environmentProject.title}</span>
                      <b aria-hidden="true">↗</b>
                    </Link>
                  )}
                  {graduationProject && (
                    <Link href={`/projects/${graduationProject.id}`}>
                      <small>졸업프로젝트</small>
                      <span>{graduationProject.title}</span>
                      <b aria-hidden="true">↗</b>
                    </Link>
                  )}
                </div>

                <p className="designer-status">47TH GRADUATE EXHIBITION</p>
              </article>
            );
          })}
        </div>

        <div className="designer-end">
          <p>20개의 점이 만나 완성하는 하나의 전시.</p>
          <Link className="text-link" href="/projects">
            프로젝트 둘러보기 ↗
          </Link>
        </div>
      </main>
      <Footer />
      <Effects />
    </>
  );
}
