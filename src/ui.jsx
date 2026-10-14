import { useState } from 'react';

const IMAGE_PROXY = 'https://wsrv.nl/';

const optimizedImage = (src, width) =>
  `${IMAGE_PROXY}?url=${encodeURIComponent(src)}&w=${width}&output=webp&q=72&maxage=1y&we`;

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
  const widths = [320, 480, 640, 960];

  // Si falla la versión optimizada, no se solicita la foto original a tamaño completo.
  // Esto evita que una caída del servicio de imágenes vuelva a disparar el consumo de memoria.
  if (failedSrc === src) {
    return (
      <div className="imgfb" role="img" aria-label={alt}>
        {name}
      </div>
    );
  }

  return (
    <img
      src={optimizedImage(src, 640)}
      srcSet={widths
        .map(width => `${optimizedImage(src, width)} ${width}w`)
        .join(', ')}
      sizes={sizes}
      alt={alt}
      width={w}
      height={h}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      onError={() => setFailedSrc(src)}
      referrerPolicy="no-referrer"
    />
  );
}

export const today = () => new Date().toISOString().slice(0, 10);
