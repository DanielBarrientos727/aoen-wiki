import { useState } from 'react';

export const fmt = d =>
  new Date(d + 'T00:00:00').toLocaleDateString('es', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const age = b => {
  const t = new Date();
  const d = new Date(b);
  let a = t.getFullYear() - d.getFullYear();
  if (t < new Date(t.getFullYear(), d.getMonth(), d.getDate())) a--;
  return a;
};

export const Ext = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="ext">
    {children}
    <span aria-hidden="true"> ↗</span>
  </a>
);

export function Img({
  src,
  alt,
  name,
  eager = false,
  w = 600,
  h = 800,
  sizes = '(max-width: 860px) 50vw, 28vw',
}) {
  const [failedSrc, setFailedSrc] = useState(null);

  // Las fotos se guardan como WebP dentro de public/img.
  // Si falta alguna, mostramos el respaldo en vez de pedir originales enormes.
  if (failedSrc === src) {
    return (
      <div className="imgfb" role="img" aria-label={alt}>
        {name}
      </div>
    );
  }

  let srcSet;
  if (src.endsWith('-640.webp')) {
    srcSet = `${src.replace('-640.webp', '-320.webp')} 320w, ${src} 640w`;
  } else if (src.endsWith('-960.webp')) {
    srcSet = `${src.replace('-960.webp', '-640.webp')} 640w, ${src} 960w`;
  }

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={w}
      height={h}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      onError={() => setFailedSrc(src)}
    />
  );
}

export const today = () => new Date().toISOString().slice(0, 10);
