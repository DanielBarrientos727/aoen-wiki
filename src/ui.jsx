import {useState} from 'react';
export const fmt=d=>new Date(d+'T00:00:00').toLocaleDateString('es',{day:'numeric',month:'long',year:'numeric'});
export const age=b=>{const t=new Date(),d=new Date(b);let a=t.getFullYear()-d.getFullYear();if(t<new Date(t.getFullYear(),d.getMonth(),d.getDate()))a--;return a};
export const Ext=({href,children})=><a href={href} target="_blank" rel="noopener noreferrer" className="ext">{children}<span aria-hidden> ↗</span></a>;
export function Img({src,alt,name,eager,w=600,h=800}){const[bad,setBad]=useState(null);
 if(bad===src)return<div className="imgfb" role="img" aria-label={alt}>{name}</div>;
 return<img src={src} alt={alt} width={w} height={h} loading={eager?'eager':'lazy'} decoding="async" fetchpriority={eager?'high':'low'} onError={()=>setBad(src)} referrerPolicy="no-referrer"/>}
export const today=()=>new Date().toISOString().slice(0,10);
