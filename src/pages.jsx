import {useState,useMemo} from 'react';
import {members,releases,events,timeline,social,OFFICIAL,VERIFIED} from './data.js';
import {fmt,age,Ext,Img,today} from './ui.jsx';
export function Members({id}){const m=members.find(x=>x.id===id);
 if(!m)return<section className="page"><h1>Integrantes</h1><div className="grid">{members.map(x=><a key={x.id} href={'#/miembros/'+x.id} className={'mc c'+x.n}><Img src={x.img} alt={x.name} name={x.name}/><span><small>0{x.n}</small>{x.name}<em>{x.jp}</em></span></a>)}</div></section>;
 const i=members.indexOf(m),p=members[(i+6)%7],n=members[(i+1)%7];
 return<section className="page prof"><nav className="crumbs"><a href="#/inicio">Inicio</a> / <a href="#/miembros">Integrantes</a> / {m.name}</nav>
 <div className="pimg"><Img src={m.img} alt={'Retrato oficial de '+m.name} name={m.name} eager/></div>
 <div><p className="meta">Integrante {m.n} de 7</p><h1>{m.name}</h1><p className="jp">{m.jp}</p>
 <dl><dt>Nacimiento</dt><dd>{fmt(m.birth)} ({age(m.birth)} años)</dd><dt>Origen</dt><dd>{m.origin}</dd><dt>Grupo sanguíneo</dt><dd>{m.blood}</dd></dl>
 <p className="note">Datos del perfil oficial. No se publican aquí posiciones ni rasgos que la fuente no declare.</p><Ext href={m.source}>Fuente: perfil oficial</Ext>
 <div className="pn"><a href={'#/miembros/'+p.id}>← {p.name}</a><a href={'#/miembros/'+n.id}>{n.name} →</a></div></div></section>}
export function Disco(){const[q,setQ]=useState('');const l=releases.filter(r=>(r.title+r.type).toLowerCase().includes(q.toLowerCase()));
 return<section className="page"><h1>Discografía</h1><label className="sr" htmlFor="dq">Buscar lanzamiento</label><input id="dq" className="in" placeholder="Filtrar canciones y lanzamientos…" value={q} onChange={e=>setQ(e.target.value)}/>
 {l.length?<ol className="list">{l.map(r=><li key={r.id}><time>{fmt(r.date)}</time><div><h3>{r.title}</h3><p className="meta">{r.type}</p></div><Ext href={r.url}>Oficial</Ext></li>)}</ol>:<p className="empty">Nada coincide con «{q}».</p>}
 <p className="note">Portadas y listas de canciones: consulta la ficha oficial de cada lanzamiento.</p></section>}
export function Agenda(){const up=events.filter(e=>e.date>=today()),past=events.length-up.length;
 return<section className="page"><h1>Agenda</h1><p className="note">Verificado el {fmt(VERIFIED)} en la agenda oficial. Recintos, ciudades y horas no se transcribieron: están en cada ficha.</p>
 {up.length?<ol className="list">{up.map(e=><li key={e.date}><time>{fmt(e.date)}</time><div><h3>{e.title}</h3><p className="meta">Live / evento · Japón</p></div><Ext href={e.url}>Detalle</Ext></li>)}</ol>:<p className="empty">No hay eventos futuros verificados. <Ext href={OFFICIAL+'/schedule'}>Agenda oficial</Ext></p>}
 {past>0&&<p className="note">{past} fechas ya pasadas se omiten.</p>}<Ext href={OFFICIAL+'/schedule'}>Ver toda la agenda</Ext></section>}
export function Time(){return<section className="page"><h1>Cronología</h1><ol className="tl">{timeline.map(t=><li key={t.date+t.t}><time>{fmt(t.date)}</time><h3>{t.t}</h3><p>{t.d}</p><Ext href={t.url}>Fuente</Ext></li>)}</ol><p className="note">Los orígenes y la etapa de formación no se incluyen hasta contar con fuentes verificadas.</p></section>}
export function Social(){return<section className="page"><h1>Redes oficiales</h1><ul className="soc">{social.map(([n,u])=><li key={n}><Ext href={u}>{n}</Ext></li>)}</ul></section>}
export function Search({q}){const t=q.toLowerCase();const r=useMemo(()=>[...members.filter(m=>(m.name+m.jp+m.origin).toLowerCase().includes(t)).map(m=>({k:'Integrante',l:m.name+' '+m.jp,h:'#/miembros/'+m.id})),...releases.filter(x=>x.title.toLowerCase().includes(t)).map(x=>({k:'Lanzamiento',l:x.title,h:'#/discografia'})),...timeline.filter(x=>(x.t+x.d).toLowerCase().includes(t)).map(x=>({k:'Cronología',l:x.t,h:'#/cronologia'}))],[t]);
 return<section className="page"><h1>Resultados para «{q}»</h1>{r.length?<ul className="list">{r.map((x,i)=><li key={i}><time>{x.k}</time><h3><a href={x.h}>{x.l}</a></h3></li>)}</ul>:<p className="empty">Sin resultados. Prueba con un nombre o título.</p>}</section>}
