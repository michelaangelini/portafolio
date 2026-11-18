/** Imagen con lazy-loading. Si no hay archivo, muestra un marcador provisional
 *  (nunca una pieza inventada). */
export default function Media({ src, alt = '', tono = '#E6DED3', className = '', imgClassName = '', etiqueta = 'Imagen provisional', priority = false, style }) {
  if (src) {
    return (
      <div className={`overflow-hidden ${className}`} style={style}>
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      </div>
    )
  }
  return (
    <div className={`overflow-hidden ${className}`} style={style} role="img" aria-label={`${etiqueta}${alt ? `: ${alt}` : ''}`}>
      <div className={`placeholder-lineas relative flex h-full w-full items-center justify-center ${imgClassName}`} style={{ backgroundColor: tono }}>
        <div className="flex flex-col items-center gap-2 text-center text-tinta/45">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <rect x="3" y="4" width="18" height="16" rx="1.5" />
            <circle cx="9" cy="10" r="1.8" />
            <path d="M3 17l5-5 4 4 3-3 6 6" />
          </svg>
          <span className="text-[11px] uppercase tracking-[0.2em]">{etiqueta}</span>
        </div>
      </div>
    </div>
  )
}
