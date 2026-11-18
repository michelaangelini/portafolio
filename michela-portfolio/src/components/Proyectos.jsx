import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'motion/react'
import { EASE } from '../lib/util'
import { proyectos, CATEGORIAS } from '../lib/datos'
import { sitio } from '../data/sitio'
import { Etiqueta, SplitWords, Reveal } from './motion'
import Media from './Media'

export function BadgeAutoria({ autoria, claro = false }) {
  const propio = autoria === 'propio'
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] backdrop-blur ${claro ? 'bg-crema/90 text-tinta' : 'border border-tinta/15 text-tinta'}`}>
      <span className={`h-2 w-2 rounded-full ${propio ? 'bg-burdeo' : 'border border-burdeo'}`} aria-hidden="true" />
      {propio ? 'Diseño propio' : 'Dirección y coordinación'}
    </span>
  )
}

export function BadgeProvisional() {
  if (!sitio.mostrarAvisosProvisionales) return null
  return <span className="rounded-full bg-tinta px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-crema">Contenido provisional</span>
}

// Composición editorial asimétrica
const LAYOUT = [
  { col: 'md:col-span-7', ratio: 'aspect-[4/3]' },
  { col: 'md:col-span-5 md:mt-24', ratio: 'aspect-[4/5]' },
  { col: 'md:col-span-5', ratio: 'aspect-[4/5]' },
  { col: 'md:col-span-7 md:mt-24', ratio: 'aspect-[4/3]' },
]

/** Tarjeta (animación protagonista nº 2: reacciona al cursor) */
function Tarjeta({ p, i, onOpen }) {
  const l = LAYOUT[i % LAYOUT.length]
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.35 } }}
      transition={{ duration: 0.9, ease: EASE, layout: { duration: 0.8, ease: EASE } }}
      className={`col-span-12 ${l.col}`}
    >
      <a href={`#proyecto-${p.slug}`} onClick={(e) => { e.preventDefault(); onOpen(p.slug) }} data-cursor="Ver" className="group block">
        <div className="relative overflow-hidden rounded-[3px] bg-crema-2">
          <Media
            src={p.portada}
            alt={p.titulo}
            tono={p.tono}
            ajuste={p.ajustePortada}
            fondo={p.fondoPortada}
            className={l.ratio}
            imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-editorial)] group-hover:scale-[1.07]"
          />
          {/* Overlay con información */}
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-tinta/85 via-tinta/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 md:block" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-6 p-7 text-crema opacity-0 transition-all duration-700 ease-[var(--ease-editorial)] group-hover:translate-y-0 group-hover:opacity-100 md:block">
            <p className="text-[12px] uppercase tracking-[0.18em] text-crema/70">
              {p.cliente}{p.anio && ` · ${p.anio}`}
            </p>
            <p className="mt-2 max-w-md text-lg leading-snug">{p.resumen}</p>
            <p className="mt-3 text-[13px] text-crema/70">{p.categorias.join(' · ')}</p>
          </div>
          {p.videos?.some((v) => v.url) && (
            <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-tinta/85 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-crema backdrop-blur">
              <span aria-hidden="true">▶</span> Video
            </span>
          )}
          <div className="absolute inset-x-4 top-4 flex flex-wrap items-start justify-between gap-2">
            <BadgeAutoria autoria={p.autoria} claro />
            {p.provisional && <BadgeProvisional />}
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h3 className="text-2xl font-medium leading-tight tracking-tight transition-colors duration-500 group-hover:text-burdeo md:text-[1.75rem]">{p.titulo}</h3>
            <p className="mt-1 text-gris">{p.empresa}{p.cliente !== p.empresa && ` — ${p.cliente}`}</p>
          </div>
          <span aria-hidden="true" className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-tinta/20 transition-all duration-500 ease-[var(--ease-editorial)] group-hover:-rotate-45 group-hover:border-burdeo group-hover:bg-burdeo group-hover:text-crema">→</span>
        </div>
      </a>
    </motion.article>
  )
}

export default function Proyectos({ onOpen, filtro, setFiltro }) {
  const lista = filtro === 'Todos' ? proyectos : proyectos.filter((p) => p.categorias.includes(filtro))
  const filtros = ['Todos', ...CATEGORIAS]
  const cuenta = (f) => (f === 'Todos' ? proyectos.length : proyectos.filter((p) => p.categorias.includes(f)).length)

  return (
    <section id="proyectos" className="py-28 md:py-44">
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Etiqueta n="03">Proyectos</Etiqueta>
            <h2 className="mt-8 text-[clamp(2.6rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
              <SplitWords text="Trabajo *seleccionado*" />
            </h2>
          </div>
          <Reveal className="md:col-span-4 md:col-start-9">
            <p className="text-[15px] leading-relaxed text-gris">
              Diferencio con claridad lo que diseñé o produje yo de lo que dirigí o coordiné con otros equipos.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <BadgeAutoria autoria="propio" />
              <BadgeAutoria autoria="colaboracion" />
            </div>
          </Reveal>
        </div>

        {/* Filtros */}
        <LayoutGroup>
          <Reveal className="sin-scrollbar -mx-5 mt-14 overflow-x-auto px-5 md:mx-0 md:px-0">
            <div role="tablist" aria-label="Filtrar proyectos por categoría" className="flex w-max gap-2 md:w-auto md:flex-wrap">
              {filtros.map((f) => {
                const on = filtro === f
                return (
                  <button
                    key={f}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setFiltro(f)}
                    className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-[15px] transition-colors duration-500 ${on ? 'text-crema' : 'text-tinta hover:text-burdeo'}`}
                  >
                    {on && <motion.span layoutId="filtro-activo" className="absolute inset-0 rounded-full bg-tinta" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                    {!on && <span className="absolute inset-0 rounded-full border border-tinta/15" />}
                    <span className="relative">{f} <sup className="text-[10px] opacity-60">{cuenta(f)}</sup></span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          <motion.div layout className="mt-14 grid grid-cols-12 gap-x-6 gap-y-16 md:gap-x-10 md:gap-y-20">
            <AnimatePresence mode="popLayout">
              {lista.map((p, i) => <Tarjeta key={p.slug} p={p} i={i} onOpen={onOpen} />)}
            </AnimatePresence>
          </motion.div>
          {lista.length === 0 && (
            <p className="mt-10 font-serif text-2xl italic text-gris">Pronto habrá proyectos en esta categoría.</p>
          )}
        </LayoutGroup>
      </div>
    </section>
  )
}
