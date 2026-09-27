'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { Header, Footer, Effects } from '@/components/exhibition/shell';
import { designers, projects } from '@/lib/exhibition';

const profilePath = (name: string) =>
  `/assets/profiles/${encodeURIComponent(name)}.webp`;

export default function Designers() {
  const sortedDesigners = [...designers].sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const selectedDesigner = designers.find((designer) => designer.name === selectedName);
  const selectedEnvironment = projects.find((project) =>
    project.category === 'environment' && project.members.includes(selectedName ?? ''),
  );
  const selectedGraduation = projects.find((project) =>
    project.category === 'graduation' && project.members.includes(selectedName ?? ''),
  );

  useEffect(() => {
    if (!selectedName) return;
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setSelectedName(null);
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', close);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', close);
    };
  }, [selectedName]);

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
                <button
                  className="designer-portrait designer-portrait-trigger"
                  type="button"
                  onClick={() => setSelectedName(designer.name)}
                  aria-label={`${designer.name} 디자이너 상세 보기`}
                >
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
                </button>

                <div className="designer-name">
                  <h2>{designer.name}</h2>
                  <span>
                    {designer.group} · {designer.role}
                  </span>
                </div>

                <div className="designer-projects" aria-label={`${designer.name} 참여 프로젝트`}>
                  {environmentProject && (
                    <a href={`/projects/${environmentProject.id}`}>
                      <small>전시환경디자인</small>
                      <span>{environmentProject.title}</span>
                      <b aria-hidden="true">↗</b>
                    </a>
                  )}
                  {graduationProject && (
                    <a href={`/projects/${graduationProject.id}`}>
                      <small>졸업프로젝트</small>
                      <span>{graduationProject.title}</span>
                      <b aria-hidden="true">↗</b>
                    </a>
                  )}
                </div>

                <p className="designer-status">47TH GRADUATE EXHIBITION</p>
              </article>
            );
          })}
        </div>

        {selectedDesigner && (
          <div className="designer-modal" role="dialog" aria-modal="true" aria-labelledby="designer-modal-name">
            <button className="designer-modal-backdrop" type="button" onClick={() => setSelectedName(null)} aria-label="팝업 닫기" />
            <div className="designer-modal-panel">
              <button className="designer-modal-close" type="button" onClick={() => setSelectedName(null)} aria-label="닫기">
                <X size={21} strokeWidth={1.4} />
              </button>
              <div className="designer-modal-portrait">
                <Image src={profilePath(selectedDesigner.name)} alt={`${selectedDesigner.name} 디자이너 프로필`} fill sizes="(max-width: 760px) 88vw, 42vw" priority />
                <span>DOT {String(sortedDesigners.findIndex((item) => item.name === selectedDesigner.name) + 1).padStart(2, '0')}</span>
                <small>DONGDUK INTERIOR DESIGN</small>
              </div>
              <div className="designer-modal-info">
                <p className="designer-modal-kicker">PARTICIPATING DESIGNER</p>
                <div className="designer-modal-identity">
                  <h2 id="designer-modal-name">{selectedDesigner.name}</h2>
                  <p>{selectedDesigner.group} · {selectedDesigner.role}</p>
                </div>
                <div className="designer-modal-projects">
                  <p>PROJECTS</p>
                  {selectedEnvironment && (
                    <a href={`/projects/${selectedEnvironment.id}`}>
                      <small>전시환경디자인</small>
                      <strong>{selectedEnvironment.title}</strong>
                      <span>{selectedEnvironment.subtitle}</span>
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  )}
                  {selectedGraduation && (
                    <a href={`/projects/${selectedGraduation.id}`}>
                      <small>졸업프로젝트</small>
                      <strong>{selectedGraduation.title}</strong>
                      <span>{selectedGraduation.subtitle}</span>
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  )}
                </div>
                <p className="designer-modal-foot">47TH DONGDUK INTERIOR DESIGN GRADUATE EXHIBITION</p>
              </div>
            </div>
          </div>
        )}

        <div className="designer-end">
          <p>20개의 점이 만나 완성하는 하나의 전시.</p>
          <a className="text-link" href="/projects">
            프로젝트 둘러보기 ↗
          </a>
        </div>
      </main>
      <Footer />
      <Effects />
    </>
  );
}
