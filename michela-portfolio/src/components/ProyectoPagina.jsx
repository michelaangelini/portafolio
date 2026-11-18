import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { EASE, videoInfo } from '../lib/util'
import { proyectos } from '../lib/datos'
import { SplitWords, Reveal, Boton, Magnetic } from './motion'
import { ParallaxMedia } from './Sections'
import { BadgeAutoria, BadgeProvisional } from './Proyectos'
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
    const forma = formato === 'cuadrado' ? 'mx-auto aspect-square max-w-[640px]' : formato === 'vertical' ? 'mx-auto aspect-[9/16] max-w-[380px]' : 'aspect-video'
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

function Bloque({ n, titulo, children }) {
  return (
    <Reveal className="grid gap-4 border-t border-tinta/15 py-10 md:grid-cols-[5rem_14rem_1fr] md:gap-8">
      <span className="font-serif text-2xl italic text-burdeo-2">{n}</span>
      <h2 className="text-[13px] uppercase tracking-[0.18em] text-gris md:pt-2">{titulo}</h2>
      <div className="max-w-2xl text-lg leading-relaxed text-tinta/85 md:text-xl">{children}</div>
    </Reveal>
  )
}

export default function ProyectoPagina({ slug, onOpen, onVolver }) {
  const reduce = useReducedMotion()
  const idx = proyectos.findIndex((p) => p.slug === slug)
  const p = proyectos[idx]
  const sig = proyectos[(idx + 1) % proyectos.length]
  const ant = proyectos[(idx - 1 + proyectos.length) % proyectos.length]
  const [lb, setLb] = useState(null)
  const reales = p.imagenes.filter((i) => i.src)
  const videos = p.videos || []

  useEffect(() => { document.title = `${p.titulo} · Michela Angelini` }, [p.titulo])

  const secciones = [
    ['Contexto y desafío', p.contexto],
    ['Objetivo', p.objetivo],
    ['Mi participación', p.participacion],
    ['Proceso', p.proceso],
  ].filter(([, t]) => t)

  return (
    <main className="pt-28 md:pt-36">
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
        {/* Encabezado */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="flex flex-wrap items-center gap-2">
          <BadgeAutoria autoria={p.autoria} />
          {p.provisional && <BadgeProvisional />}
        </motion.div>
        <h1 className="mt-8 max-w-6xl text-[clamp(2.6rem,7.5vw,7.6rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
          <SplitWords text={p.titulo} animateOnMount delay={0.45} stagger={0.06} />
        </h1>

        <motion.dl
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: EASE }}
          className="mt-12 grid grid-cols-2 gap-6 border-t border-tinta/15 pt-6 md:grid-cols-4"
        >
          {[
            ['Cliente', p.cliente],
            ['Realizado en', p.empresa],
            ['Año', p.anio || '—'],
            ['Categoría', p.categorias.join(', ')],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[12px] uppercase tracking-[0.18em] text-gris">{k}</dt>
              <dd className="mt-1 text-lg tracking-tight">{v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Portada */}
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.2, ease: EASE }}
        className="mx-auto mt-14 w-full max-w-[1600px] px-5 md:px-10"
      >
        <ParallaxMedia src={p.portada} alt={p.titulo} tono={p.tono} ajuste={p.ajustePortada} fondo={p.fondoPortada} className="aspect-[16/10] w-full rounded-[3px] md:aspect-[16/8]" priority />
      </motion.div>

      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
        {/* Autoría y rol */}
        <Reveal className="mt-20 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-[13px] uppercase tracking-[0.18em] text-gris">Autoría</p>
            <p className="mt-3 text-2xl leading-snug tracking-tight md:text-3xl">{p.detalleAutoria}</p>
            {p.creditos && <p className="mt-3 font-serif text-xl italic text-burdeo">{p.creditos}</p>}
            {p.nota && <p className="mt-4 max-w-xl border-l border-burdeo/40 pl-3 text-[13px] leading-relaxed text-gris">{p.nota}</p>}
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-[13px] uppercase tracking-[0.18em] text-gris">Mi rol</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.rol.map((r) => <li key={r} className="rounded-full border border-tinta/20 px-4 py-1.5 text-[15px]">{r}</li>)}
            </ul>
          </div>
        </Reveal>

        {/* Caso */}
        <div className="mt-20">
          {secciones.map(([t, txt], i) => <Bloque key={t} n={String(i + 1).padStart(2, '0')} titulo={t}>{txt}</Bloque>)}
          {p.resultados?.length > 0 && (
            <Bloque n={String(secciones.length + 1).padStart(2, '0')} titulo="Resultados y entregables">
              <ul className="space-y-3">
                {p.resultados.map((r) => (
                  <li key={r} className="flex gap-3"><span className="mt-[14px] h-px w-4 shrink-0 bg-burdeo" aria-hidden="true" />{r}</li>
                ))}
              </ul>
            </Bloque>
          )}
        </div>

        {/* Galería */}
        {p.imagenes.length > 0 && (
          <section className="mt-24" aria-label="Galería">
            <Reveal className="flex items-baseline justify-between border-t border-tinta/15 pt-6">
              <h2 className="text-[13px] uppercase tracking-[0.18em] text-gris">Galería</h2>
              {reales.length > 0 && <p className="text-[13px] text-gris">Haz clic para ampliar</p>}
            </Reveal>
            {p.nota && <p className="mt-2 text-[13px] text-gris">{p.nota}</p>}
            <div className="mt-8 grid grid-cols-2 items-start gap-4 md:grid-cols-12 md:gap-6">
              {p.imagenes.map((img, i) => {
                const span = img.formato === 'banner'
                  ? 'col-span-2 md:col-span-12 aspect-[39/10]'
                  : img.formato === 'cuadrado'
                  ? 'col-span-2 sm:col-span-1 md:col-span-6 aspect-square'
                  : i % 3 === 0 ? 'col-span-2 md:col-span-12 aspect-[16/9]' : 'col-span-1 md:col-span-6 aspect-[4/5]'
                const realIdx = reales.indexOf(img)
                return (
                  <Reveal key={i} delay={(i % 2) * 0.08} className={span}>
                    {img.src ? (
                      <button onClick={() => setLb(realIdx)} data-cursor="Ampliar" className="group block h-full w-full overflow-hidden rounded-[3px]" aria-label={`Ampliar imagen: ${img.alt || p.titulo}`}>
                        <Media src={img.src} alt={img.alt} ajuste={img.ajuste || 'contain'} fondo={img.fondo || p.fondoPortada} tono="#E9E2D7" className="h-full w-full" imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-editorial)] group-hover:scale-105" />
                      </button>
                    ) : (
                      <Media tono={p.tono} className="h-full w-full rounded-[3px]" />
                    )}
                    {img.pie && <p className="mt-2 text-sm text-gris">{img.pie}</p>}
                  </Reveal>
                )
              })}
            </div>
          </section>
        )}

        {/* Videos */}
        {videos.length > 0 && (
          <section className="mt-24" aria-label="Videos">
            <Reveal className="border-t border-tinta/15 pt-6"><h2 className="text-[13px] uppercase tracking-[0.18em] text-gris">Video</h2></Reveal>
            <div className="mt-8 grid gap-8">
              {videos.map((v, i) => (
                <Reveal key={i}>
                  <Video url={v.url} titulo={v.titulo} tono={p.tono} poster={v.poster} formato={v.formato} />
                  {v.titulo && v.url && <p className={`mt-3 text-sm text-gris ${v.formato ? 'text-center' : ''}`}>{v.titulo}</p>}
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Navegación entre proyectos */}
        <nav className="mt-32 border-t border-tinta/15 pt-8" aria-label="Más proyectos">
          <div className="grid gap-10 md:grid-cols-2">
            <a href={`#proyecto-${ant.slug}`} onClick={(e) => { e.preventDefault(); onOpen(ant.slug) }} className="group block" data-cursor="Anterior">
              <p className="text-[13px] uppercase tracking-[0.18em] text-gris">← Anterior</p>
              <p className="mt-3 text-2xl font-medium leading-tight tracking-tight transition-colors duration-500 group-hover:text-burdeo md:text-4xl">{ant.titulo}</p>
            </a>
            <a href={`#proyecto-${sig.slug}`} onClick={(e) => { e.preventDefault(); onOpen(sig.slug) }} className="group block md:text-right" data-cursor="Siguiente">
              <p className="text-[13px] uppercase tracking-[0.18em] text-gris">Siguiente →</p>
              <p className="mt-3 text-2xl font-medium leading-tight tracking-tight transition-colors duration-500 group-hover:text-burdeo md:text-4xl">{sig.titulo}</p>
            </a>
          </div>
          <div className="mt-16 flex justify-center pb-24">
            <Magnetic><Boton onClick={onVolver} icono="↑">Volver a todos los proyectos</Boton></Magnetic>
          </div>
        </nav>
      </div>

      <Lightbox imagenes={reales} indice={lb} setIndice={setLb} />
    </main>
  )
}
