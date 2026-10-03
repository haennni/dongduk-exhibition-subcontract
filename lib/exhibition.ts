import environmentProjectsData from './environment-projects.json';
import graduationProjectsData from './graduation-projects.json';

export const groups = [
 {name:'총괄부',members:[['위원장','권민서'],['부위원장','김미르'],['총무','허지원']]},
 {name:'기획부',members:[['부장','범다현'],['차장','정희수'],['총무','김노하은'],['부원','허윤지']]},
 {name:'제작부',members:[['부장','장은서'],['차장','차영주'],['총무','이하빈'],['부원','임경주'],['부원','이하늘']]},
 {name:'편집부',members:[['부장','강희슬'],['차장','박소윤'],['총무','김희나'],['부원','송유은'],['부원','안정연'],['부원','전솔빈'],['부원','주민재'],['부원','차지은']]}
];
const designerEmails:Record<string,string>={
 '강희슬':'wdkhs@naver.com',
 '권민서':'lily677640@naver.com',
 '김노하은':'haeun4872@gmail.com',
 '김미르':'alssm0709@gmail.com',
 '김희나':'heena0818@naver.com',
 '박소윤':'thsymod@gmail.com',
 '범다현':'qegq1206@naver.com',
 '송유은':'dbdms0147@naver.com',
 '안정연':'ajy8971@naver.com',
 '이하늘':'esky030@naver.com',
 '이하빈':'habin1425@gmail.com',
 '임경주':'immgee3053@gmail.com',
 '장은서':'jes7538@naver.com',
 '전솔빈':'solbeen04@naver.com',
 '정희수':'jheesoo02@gmail.com',
 '주민재':'joominjae1205@gmail.com',
 '차영주':'oeioii.day@gmail.com',
 '차지은':'ckwldms60114@naver.com',
 '허윤지':'heo_0311@naver.com',
 '허지원':'ji103155@gmail.com'
};
export const designers=groups.flatMap(g=>g.members.map(([role,name])=>({name,role,group:g.name,email:designerEmails[name]})));
export const categories=[{id:'environment',name:'전시환경디자인',english:'Exhibition Environment',professor:'손희주',description:'전시환경디자인 프로젝트는 공간을 통해 메시지를 전하고 감각을 이끌어내는 비일상적인 경험의 장(場)을 구성하는 데 집중합니다. 어떤 공간이 왜 필요한지, 그 공간이 사람과 사회에 어떤 질문을 던지는지를 탐구합니다.'},{id:'graduation',name:'졸업프로젝트',english:'Graduation Project',professor:'이지영',description:'4년간의 배움을 기반으로 급변하는 사회 속에서 공간이 지녀야 할 본질과 방향성을 고민하고 제안합니다. 학생들은 디자이너이자 기획자, 관찰자, 사용자로서 삶과 공간의 연결 방식을 탐색합니다.'}];
export type ProjectSection={
 image:string;
 additionalImages?:string[];
 title?:string;
 description?:string;
};

export type ExhibitionProject={
 id:string;
 title:string;
 subtitle:string;
 category:'environment'|'graduation';
 number:string;
 image:string;
 members:string[];
 tagline:string;
 description:string;
 sections:ProjectSection[];
};

const environmentProjects=environmentProjectsData as ExhibitionProject[];
const graduationProjects=graduationProjectsData as ExhibitionProject[];

export const projects:ExhibitionProject[]=[...environmentProjects,...graduationProjects];
