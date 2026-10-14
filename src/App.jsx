import {useState,useEffect,useMemo} from 'react';
import {hero,members,releases,events,timeline,social,OFFICIAL,VERIFIED} from './data.js';
const fmt=d=>new Date(d+'T00:00:00').toLocaleDateString('es',{day:'numeric',month:'long',year:'numeric'});
const age=b=>{const t=new Date(),d=new Date(b);let a=t.getFullYear()-d.getFullYear();if(t<new Date(t.getFullYear(),d.getMonth(),d.getDate()))a--;return a};
const useHash=()=>{const g=()=>location.hash.replace(/^#\/?/,'')||'inicio';const[h,s]=useState(g);useEffect(()=>{const f=()=>{s(g());scrollTo(0,0)};addEventListener('hashchange',f);return()=>removeEventListener('hashchange',f)},[]);return h};
const Ext=({href,children})=><a href={href} target="_blank" rel="noopener noreferrer" className="ext">{children}<span aria-hidden> ↗</span></a>;
function Img({src,alt,name,eager}){const[bad,setBad]=useState(false);
 if(bad)return<div className="imgfb" role="img" aria-label={alt}>{name}</div>;
 return<img src={src} alt={alt} loading={eager?'eager':'lazy'} onError={()=>setBad(true)} referrerPolicy="no-referrer"/>}
const nav=[['inicio','Inicio'],['miembros','Integrantes'],['discografia','Discografía'],['agenda','Agenda'],['cronologia','Cronología'],['redes','Redes']];
const today=()=>new Date().toISOString().slice(0,10);
function Home(){const up=events.filter(e=>e.date>=today()).slice(0,3);return<>
<section className="hero"><div className="heroimg"><Img src={hero.src} alt={hero.alt} name="aoen" eager/></div>
<div className="herotxt"><p className="meta">Enciclopedia fan · 7 integrantes</p><h1>aoen</h1><p className="lede">Siete voces, un mismo azul: el primer capítulo de un grupo que apenas empieza a escribirse.</p>
<div className="cta"><a className="btn" href="#/miembros">Entrar a la enciclopedia</a><a className="btn ghost" href="#/agenda">Próximas fechas</a></div></div></section>
<section className="band"><h2>Siete <em>integrantes</em></h2><div className="strip">{members.map(m=><a key={m.id} href={'#/miembros/'+m.id} className="sm"><Img src={m.img} alt={m.name} name={m.name}/><span>{m.name}<small>{m.jp}</small></span></a>)}</div></section>
<section className="band split"><div><h2>Último <em>lanzamiento</em></h2><p className="big">{releases[0].title}</p><p className="meta">{releases[0].type} · {fmt(releases[0].date)}</p><Ext href={releases[0].url}>Ficha oficial</Ext></div>
<div><h2>En <em>gira</em></h2>{up.length?up.map(e=><p key={e.date} className="row"><b>{fmt(e.date)}</b><Ext href={e.url}>Detalle oficial</Ext></p>):<p>Sin fechas futuras verificadas.</p>}<a href="#/agenda">Ver agenda completa →</a></div></section></>}
function Members({id}){const m=members.find(x=>x.id===id);
 if(!m)return<section className="page"><h1>Integrantes</h1><div className="grid">{members.map(x=><a key={x.id} href={'#/miembros/'+x.id} className={'mc c'+x.n}><Img src={x.img} alt={x.name} name={x.name}/><span><small>0{x.n}</small>{x.name}<em>{x.jp}</em></span></a>)}</div></section>;
 const i=members.indexOf(m),p=members[(i+6)%7],n=members[(i+1)%7];
 return<section className="page prof"><nav className="crumbs"><a href="#/inicio">Inicio</a> / <a href="#/miembros">Integrantes</a> / {m.name}</nav>
 <div className="pimg"><Img src={m.img} alt={'Retrato oficial de '+m.name} name={m.name} eager/></div>
 <div><p className="meta">Integrante {m.n} de 7</p><h1>{m.name}</h1><p className="jp">{m.jp}</p>
 <dl><dt>Nacimiento</dt><dd>{fmt(m.birth)} ({age(m.birth)} años)</dd><dt>Origen</dt><dd>{m.origin}</dd><dt>Grupo sanguíneo</dt><dd>{m.blood}</dd></dl>
 <p className="note">Datos del perfil oficial. No se publican aquí posiciones ni rasgos que la fuente no declare.</p><Ext href={m.source}>Fuente: perfil oficial</Ext>
 <div className="pn"><a href={'#/miembros/'+p.id}>← {p.name}</a><a href={'#/miembros/'+n.id}>{n.name} →</a></div></div></section>}
function Disco(){const[q,setQ]=useState('');const l=releases.filter(r=>(r.title+r.type).toLowerCase().includes(q.toLowerCase()));
 return<section className="page"><h1>Discografía</h1><label className="sr" htmlFor="dq">Buscar lanzamiento</label><input id="dq" className="in" placeholder="Filtrar canciones y lanzamientos…" value={q} onChange={e=>setQ(e.target.value)}/>
 {l.length?<ol className="list">{l.map(r=><li key={r.id}><time>{fmt(r.date)}</time><div><h3>{r.title}</h3><p className="meta">{r.type}</p></div><Ext href={r.url}>Oficial</Ext></li>)}</ol>:<p className="empty">Nada coincide con «{q}».</p>}
 <p className="note">Portadas y listas de canciones: consulta la ficha oficial de cada lanzamiento.</p></section>}
function Agenda(){const up=events.filter(e=>e.date>=today()),past=events.length-up.length;
 return<section className="page"><h1>Agenda</h1><p className="note">Verificado el {fmt(VERIFIED)} en la agenda oficial. Recintos, ciudades y horas no se transcribieron: están en cada ficha.</p>
 {up.length?<ol className="list">{up.map(e=><li key={e.date}><time>{fmt(e.date)}</time><div><h3>{e.title}</h3><p className="meta">Live / evento · Japón</p></div><Ext href={e.url}>Detalle</Ext></li>)}</ol>:<p className="empty">No hay eventos futuros verificados. <Ext href={OFFICIAL+'/schedule'}>Agenda oficial</Ext></p>}
 {past>0&&<p className="note">{past} fechas ya pasadas se omiten.</p>}<Ext href={OFFICIAL+'/schedule'}>Ver toda la agenda</Ext></section>}
function Time(){return<section className="page"><h1>Cronología</h1><ol className="tl">{timeline.map(t=><li key={t.date+t.t}><time>{fmt(t.date)}</time><h3>{t.t}</h3><p>{t.d}</p><Ext href={t.url}>Fuente</Ext></li>)}</ol><p className="note">Los orígenes y la etapa de formación no se incluyen hasta contar con fuentes verificadas.</p></section>}
function Social(){return<section className="page"><h1>Redes oficiales</h1><ul className="soc">{social.map(([n,u])=><li key={n}><Ext href={u}>{n}</Ext></li>)}</ul></section>}
function Search({q}){const t=q.toLowerCase();const r=useMemo(()=>[...members.filter(m=>(m.name+m.jp+m.origin).toLowerCase().includes(t)).map(m=>({k:'Integrante',l:m.name+' '+m.jp,h:'#/miembros/'+m.id})),...releases.filter(x=>x.title.toLowerCase().includes(t)).map(x=>({k:'Lanzamiento',l:x.title,h:'#/discografia'})),...timeline.filter(x=>(x.t+x.d).toLowerCase().includes(t)).map(x=>({k:'Cronología',l:x.t,h:'#/cronologia'}))],[t]);
 return<section className="page"><h1>Resultados para «{q}»</h1>{r.length?<ul className="list">{r.map((x,i)=><li key={i}><time>{x.k}</time><h3><a href={x.h}>{x.l}</a></h3></li>)}</ul>:<p className="empty">Sin resultados. Prueba con un nombre o título.</p>}</section>}
export default function App(){const h=useHash(),[a,b]=h.split('/');const[open,setOpen]=useState(false),[q,setQ]=useState('');
 useEffect(()=>setOpen(false),[h]);useEffect(()=>{const f=e=>e.key==='Escape'&&setOpen(false);addEventListener('keydown',f);return()=>removeEventListener('keydown',f)},[]);
 const go=e=>{e.preventDefault();if(q.trim())location.hash='#/buscar/'+encodeURIComponent(q.trim())};
 return<><header className="top"><a href="#/inicio" className="logo">aoen<b>WIKI</b></a>
 <button className="burger" aria-expanded={open} aria-controls="nav" onClick={()=>setOpen(!open)}>{open?'Cerrar':'Menú'}</button>
 <nav id="nav" className={open?'open':''} aria-label="Principal">{nav.map(([k,l])=><a key={k} href={'#/'+k} aria-current={a===k?'page':undefined}>{l}</a>)}
 <form onSubmit={go} role="search"><label className="sr" htmlFor="sq">Buscar</label><input id="sq" className="in" placeholder="Buscar…" value={q} onChange={e=>setQ(e.target.value)}/></form></nav></header>
 <main>{a==='inicio'&&<Home/>}{a==='miembros'&&<Members id={b}/>}{a==='discografia'&&<Disco/>}{a==='agenda'&&<Agenda/>}{a==='cronologia'&&<Time/>}{a==='redes'&&<Social/>}{a==='buscar'&&<Search q={decodeURIComponent(b||'')}/>}</main>
 <footer><p>aoen WIKI es un proyecto fan independiente, no afiliado ni respaldado por aoen ni sus representantes. Imágenes y datos © JCONIC / titulares correspondientes, enlazados desde <Ext href={OFFICIAL}>aoen-official.jp</Ext>. Datos verificados el {fmt(VERIFIED)}.</p><a href="#top" onClick={e=>{e.preventDefault();scrollTo({top:0})}}>Volver arriba ↑</a></footer></>}
