import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { EASE, videoInfo } from '../lib/util'
import { proyectos } from '../lib/datos'
import { SplitWords, Reveal, Magnetic } from './motion'
import { BadgeProvisional } from './Proyectos'
import { Icono, Destello } from './Iconos'
import { TituloSeccion } from './Sections'
import Media from './Media'

/* ---------- Visualizador de imágenes ---------- */
function Lightbox({ imagenes, indice, setIndice }) {
  const cerrarRef = useRef(null)
  const abierto = indice !== null
  const total = imagenes.length
  const mover = (d) => setIndice((i) => (i + d + total) % total)

  useEffect(() => {
    if (!abierto) return
    const prevFocus = document.activeElement
    cerrarRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const key = (e) => {
      if (e.key === 'Escape') setIndice(null)
      if (e.key === 'ArrowRight') mover(1)
      if (e.key === 'ArrowLeft') mover(-1)
    }
    window.addEventListener('keydown', key)
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = ''; prevFocus?.focus?.() }
  }, [abierto]) // eslint-disable-line

  const img = abierto ? imagenes[indice] : null
  return (
    <AnimatePresence>
      {abierto && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de imágenes"
          className="fixed inset-0 z-[90] flex flex-col bg-tinta/95 text-crema backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => setIndice(null)}
        >
          <div className="flex items-center justify-between px-5 py-4 text-sm md:px-10">
            <span className="tabular-nums text-crema/70">{String(indice + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
            <button ref={cerrarRef} onClick={() => setIndice(null)} className="subrayado">Cerrar ✕</button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 md:px-20" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait">
              <motion.img
                key={img.src}
                src={img.src}
                alt={img.alt}
                className="max-h-[78vh] max-w-full cursor-grab select-none object-contain active:cursor-grabbing"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: EASE }}
                drag={total > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => { if (info.offset.x < -60) mover(1); else if (info.offset.x > 60) mover(-1) }}
              />
            </AnimatePresence>
            {total > 1 && (
              <>
                <button onClick={() => mover(-1)} aria-label="Imagen anterior" className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-crema/25 transition-colors hover:bg-crema hover:text-tinta md:left-6">←</button>
                <button onClick={() => mover(1)} aria-label="Imagen siguiente" className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-crema/25 transition-colors hover:bg-crema hover:text-tinta md:right-6">→</button>
              </>
            )}
          </div>
          <p className="min-h-14 px-5 pb-6 text-center text-sm text-crema/70" onClick={(e) => e.stopPropagation()}>{img.pie || img.alt}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- Video (se carga solo al hacer clic: más rápido) ---------- */
function Video({ url, titulo, tono, poster, formato }) {
  const [play, setPlay] = useState(false)
  const info = videoInfo(url)
  if (!info) {
    return <Media tono={tono} etiqueta="Video provisional" className="aspect-video rounded-[3px]" />
  }
  if (info.tipo === 'archivo') {
    const forma = formato === 'cuadrado' ? 'mx-auto aspect-square max-w-[520px]' : formato === 'vertical' ? 'mx-auto aspect-[9/16] max-w-[380px]' : 'aspect-video'
    return <video src={info.src} poster={poster} controls preload="metadata" playsInline className={`block w-full rounded-[3px] bg-crema-2 object-contain ${forma}`} title={titulo} />
  }
  return (
    <div className="relative aspect-video overflow-hidden rounded-[3px] bg-tinta">
      {play ? (
        <iframe
          src={info.embed}
          title={titulo || 'Video'}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
        />
      ) : (
        <button onClick={() => setPlay(true)} data-cursor="Play" className="group absolute inset-0 h-full w-full" aria-label={`Reproducir ${titulo || 'video'}`}>
          {info.thumb && <img src={info.thumb} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition-transform duration-[1200ms] ease-[var(--ease-editorial)] group-hover:scale-105" />}
          <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-crema text-tinta transition-all duration-500 group-hover:scale-110 group-hover:bg-burdeo group-hover:text-crema">▶</span>
        </button>
      )}
    </div>
  )
}

/* ---------- Carrusel principal: recorre todas las piezas del proyecto ---------- */
function CarruselPrincipal({ p, reales, videos, onAmpliar }) {
  const reduce = useReducedMotion()
  const slides = [
    ...reales.map((img) => ({ tipo: 'imagen', ...img })),
    ...videos.map((v) => ({ tipo: 'video', ...v })),
  ]
  if (slides.length === 0 && p.portada) slides.push({ tipo: 'imagen', src: p.portada, alt: p.titulo, soloPortada: true })
  const [[i, dir], setEstado] = useState([0, 0])
  const total = slides.length
  const ir = (n) => setEstado(([actual]) => [((n % total) + total) % total, n > actual ? 1 : -1])
  const mover = (d) => setEstado(([actual]) => [(actual + d + total) % total, d])
  const s = slides[i]
  const fondo = p.fondoPortada || '#F0E4E2'
  // Si todas las piezas son banners horizontales, el contenedor es más apaisado
  const proporcion = slides.length && slides.every((x) => x.formato === 'banner') ? 'aspect-[16/9]' : 'aspect-[4/3]'

  const onKey = (e) => {
    if (total < 2) return
    if (e.key === 'ArrowRight') { e.preventDefault(); mover(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); mover(-1) }
  }

  return (
    <div>
      <div
        className={`group/c relative ${proporcion} w-full overflow-hidden rounded-[22px] shadow-[0_26px_50px_-30px_rgba(60,20,30,0.6)]`}
        style={{ backgroundColor: fondo }}
        tabIndex={total > 1 ? 0 : undefined}
        onKeyDown={onKey}
        role="region"
        aria-roledescription="carrusel"
        aria-label={`Piezas del proyecto (${i + 1} de ${total})`}
      >
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={i}
            custom={dir}
            className="absolute inset-0 flex items-center justify-center"
            variants={{
              entra: (d) => ({ opacity: 0, x: reduce ? 0 : d * 40 }),
              centro: { opacity: 1, x: 0 },
              sale: (d) => ({ opacity: 0, x: reduce ? 0 : d * -40 }),
            }}
            initial="entra"
            animate="centro"
            exit="sale"
            transition={{ duration: 0.45, ease: EASE }}
            drag={total > 1 && s.tipo === 'imagen' ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.35}
            onDragEnd={(_, info) => { if (info.offset.x < -50) mover(1); else if (info.offset.x > 50) mover(-1) }}
          >
            {s.tipo === 'imagen' ? (
              <button
                onClick={() => !s.soloPortada && onAmpliar(reales.indexOf(reales.find((r) => r.src === s.src)))}
                data-cursor={s.soloPortada ? undefined : 'Ampliar'}
                className="h-full w-full cursor-zoom-in"
                aria-label={`Ampliar: ${s.alt || p.titulo}`}
                disabled={s.soloPortada}
              >
                <img src={s.src} alt={s.alt || p.titulo} draggable="false" className="h-full w-full select-none object-contain" />
              </button>
            ) : (
              <div className="flex h-full w-full items-center justify-center p-3">
                <div className="h-full max-h-full w-full">
                  <VideoRelleno v={s} tono={p.tono} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {total > 1 && (
          <>
            <button onClick={() => mover(-1)} aria-label="Pieza anterior" className="absolute left-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-crema/90 text-burdeo shadow-sm backdrop-blur transition-all duration-300 hover:bg-burdeo hover:text-crema md:opacity-0 md:group-hover/c:opacity-100 md:focus-visible:opacity-100">←</button>
            <button onClick={() => mover(1)} aria-label="Pieza siguiente" className="absolute right-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-crema/90 text-burdeo shadow-sm backdrop-blur transition-all duration-300 hover:bg-burdeo hover:text-crema md:opacity-0 md:group-hover/c:opacity-100 md:focus-visible:opacity-100">→</button>
            <span className="absolute bottom-3 right-3 z-10 rounded-full bg-tinta/60 px-2.5 py-0.5 text-[12px] tabular-nums text-crema backdrop-blur">{i + 1} / {total}</span>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="sin-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Miniaturas">
          {slides.map((sl, n) => (
            <button
              key={n}
              role="tab"
              aria-selected={n === i}
              aria-label={`Ver pieza ${n + 1}`}
              onClick={() => ir(n)}
              className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg transition-all duration-300 md:h-16 md:w-16 ${n === i ? 'ring-2 ring-burdeo ring-offset-2 ring-offset-crema' : 'opacity-60 hover:opacity-100'}`}
              style={{ backgroundColor: fondo }}
            >
              <img src={sl.tipo === 'imagen' ? sl.src : sl.poster || p.portada} alt="" className="h-full w-full object-contain" loading="lazy" />
              {sl.tipo === 'video' && <span className="absolute inset-0 grid place-items-center bg-tinta/30 text-[13px] text-crema">▶</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/** Video que se adapta al contenedor del carrusel */
function VideoRelleno({ v, tono }) {
  const info = videoInfo(v.url)
  if (info?.tipo === 'archivo') {
    return <video src={info.src} poster={v.poster} controls preload="metadata" playsInline className="h-full w-full rounded-xl object-contain" title={v.titulo} />
  }
  return (
    <div className="flex h-full items-center">
      <div className="w-full"><Video url={v.url} titulo={v.titulo} tono={tono} /></div>
    </div>
  )
}

function Bloque({ titulo, children, className = '' }) {
  return (
    <Reveal className={className}>
      <div className="flex items-center gap-3">
        <h2 className="font-serif text-[1.35rem] leading-tight">{titulo}</h2>
        <span className="h-px w-8 bg-burdeo" aria-hidden="true" />
      </div>
      <div className="mt-2.5 text-[15px] leading-relaxed text-tinta/85">{children}</div>
    </Reveal>
  )
}

const ICONOS_ENTREGABLES = ['grafico', 'correo', 'documento', 'imagen', 'video', 'capas']

export default function ProyectoPagina({ slug, onOpen, onVolver }) {
  const reduce = useReducedMotion()
  const idx = proyectos.findIndex((p) => p.slug === slug)
  const p = proyectos[idx]
  const sig = proyectos[(idx + 1) % proyectos.length]
  const ant = proyectos[(idx - 1 + proyectos.length) % proyectos.length]
  const [lb, setLb] = useState(null)
  const reales = p.imagenes.filter((i) => i.src)
  const videos = (p.videos || []).filter((v) => v.url)
  const propio = p.autoria === 'propio'

  useEffect(() => { document.title = `${p.titulo} · Michela Angelini` }, [p.titulo])

  const meta = [
    { icono: 'usuario', k: 'Cliente', v: p.cliente },
    { icono: 'calendario', k: 'Año', v: p.anio || '—' },
    { icono: 'etiqueta', k: 'Categoría', v: p.categorias.join(', ') },
  ]

  return (
    <main className="pt-20 md:pt-24">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10">
        {/* Migas */}
        <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} aria-label="Ruta" className="text-[14px]">
          <button onClick={onVolver} className="font-serif italic text-burdeo hover:underline">Proyectos</button>
          <span className="mx-2.5 text-gris" aria-hidden="true">›</span>
          <span className="text-tinta/80">{p.titulo}</span>
        </motion.nav>

        {/* Encabezado: carrusel a la izquierda, información a la derecha */}
        <div className="mt-5 grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <motion.div
            className="relative min-w-0 lg:col-span-6"
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1, ease: EASE }}
          >
            <div aria-hidden="true" className="absolute -top-3 left-[40%] h-1/4 w-1/3 rotate-3 rounded-[20px] bg-burdeo" />
            <div aria-hidden="true" className="absolute -left-3 bottom-16 hidden h-1/4 w-1/5 rounded-[18px] bg-burdeo-2/80 sm:block" />
            <Destello className="absolute -top-7 left-[76%] h-7 w-7 text-burdeo" />
            <div className="relative">
              <CarruselPrincipal p={p} reales={reales} videos={videos} onAmpliar={(n) => setLb(n)} />
            </div>
          </motion.div>

          <div className="min-w-0 lg:col-span-6 lg:pt-1">
            {p.provisional && <div className="mb-3"><BadgeProvisional /></div>}
            <h1 className="font-serif text-[clamp(1.6rem,2.5vw,2.2rem)] leading-[1.15]">
              <SplitWords text={p.titulo} animateOnMount delay={0.45} stagger={0.04} />
            </h1>
            <motion.div initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.9, ease: EASE }}>
              {p.bajada && <p className="mt-2 font-serif text-[17px] italic text-burdeo">{p.bajada}</p>}
              <div className="mt-3 h-px w-10 bg-burdeo" />
              <p className="mt-3 text-[15px] leading-relaxed text-tinta/85">{p.resumen}</p>

              <dl className="mt-5 grid grid-cols-1 gap-y-2.5 border-y border-burdeo/10 py-3 sm:grid-cols-3 sm:gap-x-3">
                {meta.map((m, n) => (
                  <div key={m.k} className={`flex items-start gap-2 ${n > 0 ? 'sm:border-l sm:border-burdeo/10 sm:pl-3' : ''}`}>
                    <Icono nombre={m.icono} className="mt-0.5 shrink-0 text-burdeo" size={16} />
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.12em] text-gris">{m.k}</dt>
                      <dd className="text-[13.5px] leading-snug">{m.v}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="mr-1 text-[11px] uppercase tracking-[0.12em] text-gris">Mi rol</span>
                {p.rol.map((r) => <span key={r} className="rounded-full border border-burdeo/25 px-2.5 py-0.5 text-[12px]">{r}</span>)}
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-xl bg-rosa px-4 py-3">
                <Icono nombre={propio ? 'lapiz' : 'megafono'} className="shrink-0 text-burdeo" size={22} />
                <span className="h-8 w-px bg-burdeo/25" aria-hidden="true" />
                <div>
                  <p className="font-serif text-[16px] italic text-burdeo">{propio ? 'Diseño propio' : 'Dirección y coordinación'}</p>
                  <p className="text-[13.5px] leading-snug text-tinta/85">{p.detalleAutoria}</p>
                  {p.creditos && <p className="text-[12.5px] italic text-gris">{p.creditos}</p>}
                </div>
              </div>
              {p.nota && <p className="mt-3 text-[11.5px] italic text-gris">{p.nota}</p>}
            </motion.div>
          </div>
        </div>

        {/* Caso */}
        <div className="mt-12 grid gap-y-8 md:grid-cols-2 md:gap-x-0">
          {p.contexto && <Bloque titulo="Contexto" className="md:border-r md:border-burdeo/15 md:pr-10">{p.contexto}</Bloque>}
          {p.objetivo && <Bloque titulo="Objetivo" className="md:pl-10">{p.objetivo}</Bloque>}
        </div>
        <div className="mt-8 grid gap-y-8 border-t border-burdeo/15 pt-8 md:grid-cols-2">
          {p.participacion && <Bloque titulo="Mi participación" className="md:border-r md:border-burdeo/15 md:pr-10">{p.participacion}</Bloque>}
          {p.proceso && (
            <Bloque titulo="Proceso" className="md:pl-10">
              <ol className="space-y-2">
                {p.proceso.split('→').map((paso, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-serif italic text-burdeo">{String(i + 1).padStart(2, '0')}</span>
                    <span>{paso.trim().charAt(0).toUpperCase() + paso.trim().slice(1)}</span>
                  </li>
                ))}
              </ol>
            </Bloque>
          )}
        </div>

        {/* Galería + entregables */}
        <div className="mt-10 grid gap-8 border-t border-burdeo/15 pt-8 lg:grid-cols-12">
          <section className={reales.length === 0 ? 'hidden' : p.resultados?.length ? 'lg:col-span-8' : 'lg:col-span-12'} aria-label="Galería">
            {reales.length > 0 && (
              <>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-center gap-4">
                    <h2 className="font-serif text-[1.35rem]">Galería</h2>
                    <span className="h-px w-10 bg-burdeo" aria-hidden="true" />
                  </div>
                  <p className="text-[13px] italic text-gris">Haz clic para ampliar</p>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                  {p.imagenes.map((img, i) => {
                    if (!img.src) return null
                    const banner = img.formato === 'banner'
                    return (
                      <Reveal key={i} delay={(i % 3) * 0.06} className={banner ? 'col-span-2 md:col-span-3' : ''}>
                        <button onClick={() => setLb(reales.indexOf(img))} data-cursor="Ampliar" className="group block w-full overflow-hidden rounded-xl" aria-label={`Ampliar imagen: ${img.alt || p.titulo}`}>
                          <Media src={img.src} alt={img.alt} ajuste="contain" fondo={p.fondoPortada || '#F0E4E2'} tono="#F0E4E2" className={banner ? 'aspect-[39/10] w-full' : 'aspect-square w-full'} imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-editorial)] group-hover:scale-105" />
                        </button>
                        {img.pie && <p className="mt-1.5 text-[13px] leading-snug text-gris">{img.pie}</p>}
                      </Reveal>
                    )
                  })}
                </div>
              </>
            )}
          </section>

          {p.resultados?.length > 0 && (
            <Reveal className={reales.length === 0 ? 'lg:col-span-12' : 'lg:col-span-4'}>
              <div className="rounded-[22px] bg-burdeo p-6 text-crema md:p-7 lg:sticky lg:top-28">
                <div className="flex items-center gap-4">
                  <h2 className="font-serif text-[1.35rem]">Entregables</h2>
                  <span className="h-px w-10 bg-crema/50" aria-hidden="true" />
                </div>
                <ul className={`mt-4 grid gap-4 ${reales.length === 0 ? 'md:grid-cols-2' : ''}`}>
                  {p.resultados.map((r, i) => (
                    <li key={r} className="flex gap-3.5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-crema text-burdeo">
                        <Icono nombre={ICONOS_ENTREGABLES[i % ICONOS_ENTREGABLES.length]} size={19} />
                      </span>
                      <span className="text-[14px] leading-snug text-crema/95">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>

        {/* Navegación entre proyectos */}
        <nav className="mt-20 border-t border-burdeo/15 pt-8" aria-label="Más proyectos">
          <div className="grid gap-8 md:grid-cols-2">
            <a href={`#proyecto-${ant.slug}`} onClick={(e) => { e.preventDefault(); onOpen(ant.slug) }} className="group block" data-cursor="Anterior">
              <p className="text-[13px] uppercase tracking-[0.18em] text-gris">← Anterior</p>
              <p className="mt-2 font-serif text-xl leading-tight transition-colors duration-500 group-hover:text-burdeo md:text-2xl">{ant.titulo}</p>
            </a>
            <a href={`#proyecto-${sig.slug}`} onClick={(e) => { e.preventDefault(); onOpen(sig.slug) }} className="group block md:text-right" data-cursor="Siguiente">
              <p className="text-[13px] uppercase tracking-[0.18em] text-gris">Siguiente →</p>
              <p className="mt-2 font-serif text-xl leading-tight transition-colors duration-500 group-hover:text-burdeo md:text-2xl">{sig.titulo}</p>
            </a>
          </div>
          <div className="mt-12 flex justify-center pb-8">
            <Magnetic>
              <button onClick={onVolver} className="group inline-flex items-center gap-3 rounded-lg border border-burdeo/70 px-7 py-3.5 font-serif text-[17px] transition-colors duration-500 hover:bg-burdeo hover:text-crema">
                <span aria-hidden="true" className="transition-transform duration-500 group-hover:-translate-x-1">←</span> Volver a todos los proyectos
              </button>
            </Magnetic>
          </div>
        </nav>
      </div>

      <Lightbox imagenes={reales} indice={lb} setIndice={setLb} />
    </main>
  )
}
