import {useState,useEffect,lazy,Suspense} from 'react';
import {hero,members,releases,events,OFFICIAL,VERIFIED} from './data.js';
import {fmt,Ext,Img,today} from './ui.jsx';
const L=n=>lazy(()=>import('./pages.jsx').then(m=>({default:m[n]})));
const Members=L('Members'),Disco=L('Disco'),Agenda=L('Agenda'),Time=L('Time'),Social=L('Social'),Search=L('Search');

const useHash=()=>{const g=()=>location.hash.replace(/^#\/?/,'')||'inicio';const[h,s]=useState(g);useEffect(()=>{const f=()=>{s(g());scrollTo(0,0)};addEventListener('hashchange',f);return()=>removeEventListener('hashchange',f)},[]);return h};
const nav=[['inicio','Inicio'],['miembros','Integrantes'],['discografia','Discografía'],['agenda','Agenda'],['cronologia','Cronología'],['redes','Redes']];
function Home(){const up=events.filter(e=>e.date>=today()).slice(0,3);return<>
<section className="hero"><div className="heroimg"><Img src={hero.src} alt={hero.alt} name="aoen" eager sizes="(max-width: 860px) 100vw, 58vw"/></div>
<div className="herotxt"><p className="meta">Enciclopedia fan · 7 integrantes</p><h1>aoen</h1><p className="lede">Siete voces, un mismo azul: el primer capítulo de un grupo que apenas empieza a escribirse.</p>
<div className="cta"><a className="btn" href="#/miembros">Entrar a la enciclopedia</a><a className="btn ghost" href="#/agenda">Próximas fechas</a></div></div></section>
<section className="band"><h2>Siete <em>integrantes</em></h2><div className="strip">{members.map(m=><a key={m.id} href={'#/miembros/'+m.id} className="sm"><Img src={m.img} alt={m.name} name={m.name} sizes="(max-width: 860px) 25vw, 14vw"/><span>{m.name}<small>{m.jp}</small></span></a>)}</div></section>
<section className="band split"><div><h2>Último <em>lanzamiento</em></h2><p className="big">{releases[0].title}</p><p className="meta">{releases[0].type} · {fmt(releases[0].date)}</p><Ext href={releases[0].url}>Ficha oficial</Ext></div>
<div><h2>En <em>gira</em></h2>{up.length?up.map(e=><p key={e.date} className="row"><b>{fmt(e.date)}</b><Ext href={e.url}>Detalle oficial</Ext></p>):<p>Sin fechas futuras verificadas.</p>}<a href="#/agenda">Ver agenda completa →</a></div></section></>}
export default function App(){const h=useHash(),[a,b]=h.split('/');const[open,setOpen]=useState(false),[q,setQ]=useState('');
 useEffect(()=>setOpen(false),[h]);useEffect(()=>{const f=e=>e.key==='Escape'&&setOpen(false);addEventListener('keydown',f);return()=>removeEventListener('keydown',f)},[]);
 const go=e=>{e.preventDefault();if(q.trim())location.hash='#/buscar/'+encodeURIComponent(q.trim())};
 return<><header className="top"><a href="#/inicio" className="logo">aoen<b>WIKI</b></a>
 <button className="burger" aria-expanded={open} aria-controls="nav" onClick={()=>setOpen(!open)}>{open?'Cerrar':'Menú'}</button>
 <nav id="nav" className={open?'open':''} aria-label="Principal">{nav.map(([k,l])=><a key={k} href={'#/'+k} aria-current={a===k?'page':undefined}>{l}</a>)}
 <form onSubmit={go} role="search"><label className="sr" htmlFor="sq">Buscar</label><input id="sq" className="in" placeholder="Buscar…" value={q} onChange={e=>setQ(e.target.value)}/></form></nav></header>
 <main><Suspense fallback={<p className="page meta">Cargando…</p>}>{a==='inicio'&&<Home/>}{a==='miembros'&&<Members id={b}/>}{a==='discografia'&&<Disco/>}{a==='agenda'&&<Agenda/>}{a==='cronologia'&&<Time/>}{a==='redes'&&<Social/>}{a==='buscar'&&<Search q={decodeURIComponent(b||'')}/>}</Suspense></main>
 <footer><p>aoen WIKI es un proyecto fan independiente, no afiliado ni respaldado por aoen ni sus representantes. Imágenes y datos © JCONIC / titulares correspondientes, enlazados desde <Ext href={OFFICIAL}>aoen-official.jp</Ext>. Datos verificados el {fmt(VERIFIED)}.</p><a href="#top" onClick={e=>{e.preventDefault();scrollTo({top:0})}}>Volver arriba ↑</a></footer></>}
