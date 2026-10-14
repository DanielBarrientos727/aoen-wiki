const P='/aoen-wiki/img/';
export const VERIFIED='2026-10-14';
export const OFFICIAL='https://aoen-official.jp';
export const hero={src:P+'hero-960.webp',alt:'Fotografía grupal oficial de aoen',source:OFFICIAL+'/profile'};
export const members=[
['YUJU','優樹','2002-12-20','Saitama','A','yuju'],
['RUKA','琉楓','2003-11-01','Miyazaki','A','ruka'],
['GAKU','雅久','2004-04-25','Nagano','O','gaku'],
['HIKARU','輝','2005-03-28','Gunma','B','hikaru'],
['SOTA','颯太','2005-08-15','Tokio','O','sota'],
['KYOSUKE','京助','2005-09-25','Kanagawa','B','kyosuke'],
['REO','礼央','2007-07-09','Miyagi','A','reo']
].map(([name,jp,birth,origin,blood,slug],i)=>({id:name.toLowerCase(),n:i+1,name,jp,birth,origin,blood,img:P+slug+'-640.webp',source:OFFICIAL+'/profile'}));
export const releases=[
{id:'blue-sun',date:'2025-06-11',type:'Sencillo de debut',title:'青い太陽 (The Blue Sun)',url:OFFICIAL+'/Discography/fae82d4f7e39'},
{id:'seishun',date:'2025-10-15',type:'Sencillo digital',title:'青春インクレディブル',url:OFFICIAL+'/Discography/34d98831cd7d'},
{id:'seishun-mxmm',date:'2025-11-15',type:'Sencillo',title:'青春インクレディブル / MXMM (Remixes)',url:OFFICIAL+'/Discography/1abb26348512'},
{id:'byo',date:'2026-03-18',type:'2.º sencillo',title:'秒で落ちた',url:OFFICIAL+'/Discography/97d934e3f42c'},
{id:'youth-en',date:'2026-06-08',type:'Sencillo digital',title:'Youth (English ver.)',url:OFFICIAL+'/Discography/e148b6f85010'},
{id:'hajimari',date:'2026-07-22',type:'3.er sencillo',title:'ハジマリCOLOR',url:OFFICIAL+'/Discography/d48014d54921'}
].sort((a,b)=>b.date.localeCompare(a.date));
const T='aoen LIVE TOUR 2026 ～青のはじまり 47+1～';
const ev=[['2026-10-25','4bc43b681f19'],['2026-10-30','c8a453c482d0'],['2026-10-31','6f159ddb7ff2'],['2026-11-14','fe6215338f8e'],['2026-11-15','2834155fde3f'],['2026-11-17','f3a779cf984a'],['2026-11-18','5b9e18e590b3'],['2026-11-20','8facffcb7384'],['2026-11-22','2f9d1ca7957d'],['2026-12-26','0b538edc3314']];
export const events=ev.map(([date,h])=>({date,title:T,url:OFFICIAL+'/schedule/'+h}));
export const timeline=[
{date:'2025-06-11',t:'Debut',d:'Lanzamiento del sencillo de debut «青い太陽 (The Blue Sun)».',url:releases.find(r=>r.id==='blue-sun').url},
{date:'2025-10-15',t:'Segunda etapa',d:'Sencillo digital «青春インクレディブル».',url:releases.find(r=>r.id==='seishun').url},
{date:'2025-11-15',t:'Remixes',d:'Publicación de «青春インクレディブル / MXMM (Remixes)».',url:releases.find(r=>r.id==='seishun-mxmm').url},
{date:'2026-03-18',t:'2.º sencillo',d:'Llega «秒で落ちた».',url:releases.find(r=>r.id==='byo').url},
{date:'2026-06-08',t:'Versión en inglés',d:'Sencillo digital «Youth (English ver.)».',url:releases.find(r=>r.id==='youth-en').url},
{date:'2026-07-22',t:'3.er sencillo',d:'Lanzamiento de «ハジマリCOLOR».',url:releases.find(r=>r.id==='hajimari').url},
{date:'2026-10-25',t:'Inicio del tramo de gira listado',d:'Primera fecha futura de «'+T+'» en la agenda oficial consultada.',url:events[0].url}
];
export const social=[['Sitio oficial',OFFICIAL+'/'],['X oficial','https://x.com/aoen_official'],['X integrantes','https://x.com/aoen_members'],['Instagram','https://www.instagram.com/aoen.official/'],['YouTube','https://www.youtube.com/@aoen_official'],['TikTok','https://www.tiktok.com/@aoen_official'],['Weverse','https://weverse.io/aoen/feed'],['LINE','https://page.line.me/aoen_official']];
