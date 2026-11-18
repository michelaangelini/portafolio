/* Íconos de línea simples (sin logos de marcas) */
const P = {
  usuario: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5" /></>,
  calendario: <><rect x="4" y="5.5" width="16" height="14" rx="2" /><path d="M4 10h16M8 3.5v4M16 3.5v4" /></>,
  etiqueta: <><path d="M3.5 12.5V4.5h8l8.5 8.5-8 8-8.5-8.5z" /><circle cx="8" cy="9" r="1.3" /></>,
  capas: <><path d="M12 4l8.5 4.5L12 13 3.5 8.5 12 4z" /><path d="M3.5 12.5L12 17l8.5-4.5" /><path d="M3.5 16.5L12 21l8.5-4.5" /></>,
  grafico: <><path d="M5 19V13M10 19V9M15 19v-6M20 19V5" /></>,
  correo: <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="M4 7l8 6 8-6" /></>,
  documento: <><path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10.5a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5z" /><path d="M14 3.5V8h4M9 12h6M9 15.5h6" /></>,
  descarga: <><path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19.5h14" /></>,
  lapiz: <><path d="M15.5 4.5l4 4L9 19l-5 1 1-5L15.5 4.5z" /></>,
  imagen: <><rect x="3.5" y="4.5" width="17" height="15" rx="2" /><circle cx="9" cy="10" r="1.8" /><path d="M4 17l5-5 4 4 2.5-2.5L20 18" /></>,
  pelicula: <><rect x="3.5" y="5" width="17" height="14" rx="2" /><path d="M8 5v14M16 5v14M3.5 9.5H8M3.5 14.5H8M16 9.5h4.5M16 14.5h4.5" /></>,
  video: <><rect x="3.5" y="6.5" width="12" height="11" rx="2" /><path d="M15.5 10.5l5-3v9l-5-3" /></>,
  chat: <><path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 3.5V16.5H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5z" /></>,
  destellos: <><path d="M12 3.5l1.6 4.4L18 9.5l-4.4 1.6L12 15.5l-1.6-4.4L6 9.5l4.4-1.6L12 3.5z" /><path d="M18.5 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" /></>,
  cuadricula: <><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></>,
  megafono: <><path d="M4 10v4h3l7 4V6l-7 4H4z" /><path d="M17.5 9a4 4 0 0 1 0 6" /></>,
  externo: <><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>,
  numeral: <><path d="M9 4l-2 16M17 4l-2 16M4.5 9h16M3.5 15h16" /></>,
  flecha: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
}

export function Icono({ nombre, className = '', size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {P[nombre] || P.etiqueta}
    </svg>
  )
}

/** Monograma MA */
export function Monograma({ className = '' }) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true">
      <text x="6" y="66" fontFamily="'Playfair Display Variable', Georgia, serif" fontStyle="italic" fontWeight="500" fontSize="70" fill="currentColor">M</text>
      <text x="52" y="80" fontFamily="'Playfair Display Variable', Georgia, serif" fontStyle="italic" fontWeight="500" fontSize="62" fill="currentColor" opacity="0.95">A</text>
      <path d="M14 90 C 40 80, 80 72, 112 70" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

/** Trazos decorativos (destello) */
export function Destello({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M8 4l2 9M20 2l-4 11M33 9l-12 8M34 22l-11-1" />
    </svg>
  )
}
