export const groups = [
 {name:'총괄부',members:[['위원장','권민서'],['부위원장','김미르'],['총무','허지원']]},
 {name:'기획부',members:[['부장','범다현'],['차장','정희수'],['총무','김노하은'],['부원','허윤지']]},
 {name:'제작부',members:[['부장','장은서'],['차장','차영주'],['총무','이하빈'],['부원','임경주'],['부원','이하늘']]},
 {name:'편집부',members:[['부장','강희슬'],['차장','박소윤'],['총무','김희나'],['부원','송유은'],['부원','안정연'],['부원','전솔빈'],['부원','주민재'],['부원','차지은']]}
];
export const designers=groups.flatMap(g=>g.members.map(([role,name])=>({name,role,group:g.name})));
export const categories=[{id:'environment',name:'전시환경디자인',english:'Exhibition Environment',professor:'손희주',description:'전시환경디자인 프로젝트는 공간을 통해 메시지를 전하고 감각을 이끌어내는 비일상적인 경험의 장(場)을 구성하는 데 집중합니다. 어떤 공간이 왜 필요한지, 그 공간이 사람과 사회에 어떤 질문을 던지는지를 탐구합니다.'},{id:'graduation',name:'졸업프로젝트',english:'Graduation Project',professor:'이지영',description:'4년간의 배움을 기반으로 급변하는 사회 속에서 공간이 지녀야 할 본질과 방향성을 고민하고 제안합니다. 학생들은 디자이너이자 기획자, 관찰자, 사용자로서 삶과 공간의 연결 방식을 탐색합니다.'}];
export const projects=categories.map((c,i)=>({id:c.id,title:c.name+' — 시안',subtitle:'공간과 사람의 연결을 탐색하다',category:c.id,number:`0${i+1}`,image:'/assets/project-reference.png',description:'이 화면은 제공된 PDF의 예시 이미지로 구성한 작품 상세 시안입니다. 실제 출품작의 제목, 팀원, 소개문과 작품 이미지는 추후 제공되는 자료로 교체됩니다.'}));
