import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { EASE } from '../lib/util'
import { proyectos, CATEGORIAS } from '../lib/datos'
import { sitio } from '../data/sitio'
import { Reveal } from './motion'
import Media from './Media'
import { Icono, Destello } from './Iconos'

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

const DIRECCION = 'Dirección y coordinación'

/** Filtra por categoría o por tipo de autoría */
export function filtrar(lista, filtro) {
  if (!filtro || filtro === 'Todos') return lista
  if (filtro === DIRECCION) return lista.filter((p) => p.autoria === 'colaboracion')
  return lista.filter((p) => p.categorias.includes(filtro))
}

/** Tarjeta del carrusel (animación protagonista nº 2: reacciona al cursor) */
function Tarjeta({ p, onOpen, pie = false }) {
  const propio = p.autoria === 'propio'
  const tieneVideo = p.videos?.some((v) => v.url)
  return (
    <a
      href={`#proyecto-${p.slug}`}
      onClick={(e) => { e.preventDefault(); onOpen(p.slug) }}
      data-cursor="Ver"
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white/70 shadow-[0_14px_40px_-26px_rgba(60,20,30,0.55)] ring-1 ring-tinta/5 transition-shadow duration-500 hover:shadow-[0_24px_50px_-24px_rgba(60,20,30,0.55)]"
    >
      <div className="relative overflow-hidden">
        <Media
          src={p.portada}
          alt={p.titulo}
          tono={p.tono}
          ajuste={p.ajustePortada}
          fondo={p.fondoPortada}
          className="aspect-[16/10]"
          imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-editorial)] group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-tinta/80 via-tinta/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 md:block" />
        <p className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-4 p-5 text-[15px] leading-snug text-crema opacity-0 transition-all duration-700 ease-[var(--ease-editorial)] group-hover:translate-y-0 group-hover:opacity-100 md:block">
          {p.resumen}
        </p>
        {tieneVideo && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-tinta/80 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-crema backdrop-blur">
            ▶ Video
          </span>
        )}
        {p.provisional && <div className="absolute left-3 top-3"><BadgeProvisional /></div>}
      </div>
      <div className="flex flex-1 items-start justify-between gap-4 px-5 pb-5 pt-4">
        <div>
          <h3 className="font-serif text-[1.25rem] leading-snug transition-colors duration-500 group-hover:text-burdeo">{p.titulo}</h3>
          <p className="mt-1.5 text-[14px] text-gris">{p.rol.slice(0, 3).join(' · ')}</p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] italic text-burdeo">
            <span className={`h-1.5 w-1.5 rounded-full ${propio ? 'bg-burdeo' : 'border border-burdeo'}`} aria-hidden="true" />
            {propio ? 'Diseño propio' : 'Dirección y coordinación'}
          </p>
        </div>
        <Icono nombre="externo" size={20} className="mt-1 shrink-0 text-burdeo transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      {pie && (
        <div className="mx-5 flex justify-end border-t border-burdeo/10 pb-4 pt-3">
          <span className="inline-flex items-center gap-2 font-serif text-[15px] italic text-burdeo">
            Ver proyecto <span aria-hidden="true" className="not-italic transition-transform duration-500 group-hover:translate-x-1">→</span>
          </span>
        </div>
      )}
    </a>
  )
}

export default function Proyectos({ onOpen, filtro, setFiltro, onTodos }) {
  const lista = filtrar(proyectos, filtro)
  const pista = useRef(null)
  const [pos, setPos] = useState({ i: 0, paginas: 1 })

  const filtros = ['Todos', ...CATEGORIAS, ...(proyectos.some((p) => p.autoria === 'colaboracion') ? [DIRECCION] : [])]

  const medir = useCallback(() => {
    const el = pista.current
    if (!el || !el.firstElementChild) return
    const paso = el.firstElementChild.getBoundingClientRect().width + 24
    const visibles = Math.max(1, Math.round((el.clientWidth + 24) / paso))
    const paginas = Math.max(1, lista.length - visibles + 1)
    setPos({ i: Math.min(paginas - 1, Math.round(el.scrollLeft / paso)), paginas, paso })
  }, [lista.length])

  useEffect(() => {
    medir()
    const el = pista.current
    el?.addEventListener('scroll', medir, { passive: true })
    window.addEventListener('resize', medir)
    return () => { el?.removeEventListener('scroll', medir); window.removeEventListener('resize', medir) }
  }, [medir, filtro])

  useEffect(() => { pista.current?.scrollTo({ left: 0 }) }, [filtro])

  const ir = (i) => pista.current?.scrollTo({ left: i * (pos.paso || 0), behavior: 'smooth' })

  return (
    <section id="trabajos" className="py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal className="flex items-center gap-6">
            <h2 className="font-serif text-[clamp(2rem,3.4vw,2.9rem)] leading-tight">Trabajos seleccionados</h2>
            <span className="hidden h-px w-16 bg-burdeo sm:block" aria-hidden="true" />
          </Reveal>
          <Reveal>
            <button onClick={onTodos} className="group inline-flex items-center gap-2 font-serif text-[16px] text-burdeo">
              <span className="subrayado">Ver todos los proyectos</span>
              <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </button>
          </Reveal>
        </div>

        {/* Filtros */}
        <Reveal className="sin-scrollbar -mx-5 mt-6 overflow-x-auto px-5 md:mx-0 md:px-0">
          <div role="tablist" aria-label="Filtrar proyectos" className="flex w-max gap-2 md:w-auto md:flex-wrap">
            {filtros.map((f) => {
              const on = filtro === f
              const n = filtrar(proyectos, f).length
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFiltro(f)}
                  className={`relative whitespace-nowrap rounded-full px-4 py-1.5 text-[14px] transition-colors duration-500 ${on ? 'text-crema' : 'text-tinta hover:text-burdeo'}`}
                >
                  {on && <motion.span layoutId="filtro-activo" className="absolute inset-0 rounded-full bg-burdeo" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  {!on && <span className="absolute inset-0 rounded-full border border-tinta/15" />}
                  <span className="relative">{f} <sup className="text-[10px] opacity-60">{n}</sup></span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Carrusel */}
        <div className="relative mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={filtro}
              ref={pista}
              className="sin-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-10 pt-2 md:-mx-3 md:px-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {lista.map((p) => (
                <div key={p.slug} className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]">
                  <Tarjeta p={p} onOpen={onOpen} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {pos.paginas > 1 && (
            <>
              <button
                onClick={() => ir(pos.i - 1)}
                disabled={pos.i === 0}
                aria-label="Proyecto anterior"
                className="absolute -left-5 top-[38%] hidden h-11 w-11 place-items-center rounded-full border border-burdeo/40 bg-crema text-burdeo shadow-sm transition-all hover:bg-burdeo hover:text-crema disabled:opacity-0 md:grid lg:-left-14"
              >←</button>
              <button
                onClick={() => ir(pos.i + 1)}
                disabled={pos.i >= pos.paginas - 1}
                aria-label="Proyecto siguiente"
                className="absolute -right-5 top-[38%] hidden h-11 w-11 place-items-center rounded-full border border-burdeo/40 bg-crema text-burdeo shadow-sm transition-all hover:bg-burdeo hover:text-crema disabled:opacity-0 md:grid lg:-right-14"
              >→</button>
            </>
          )}
        </div>

        {pos.paginas > 1 && (
          <div className="mt-2 flex justify-center gap-2" role="tablist" aria-label="Posición del carrusel">
            {Array.from({ length: pos.paginas }).map((_, i) => (
              <button
                key={i}
                onClick={() => ir(i)}
                aria-label={`Ir al grupo ${i + 1}`}
                aria-selected={pos.i === i}
                role="tab"
                className={`h-2 rounded-full transition-all duration-500 ${pos.i === i ? 'w-6 bg-burdeo' : 'w-2 bg-tinta/20 hover:bg-tinta/40'}`}
              />
            ))}
          </div>
        )}

        <p className="mt-6 text-center text-[13px] italic text-gris">
          <span className="not-italic text-burdeo">●</span> Diseño propio: piezas creadas por mí. <span className="ml-3 not-italic text-burdeo">○</span> Dirección y coordinación: idea, brief y supervisión; diseño final de terceros.
        </p>
      </div>
    </section>
  )
}

const ICONO_FILTRO = {
  'Marketing digital': 'grafico',
  'Producción audiovisual': 'video',
  'Diseño y contenido gráfico': 'imagen',
  'Redes sociales': 'numeral',
  'Comunicación corporativa': 'capas',
  [DIRECCION]: 'megafono',
}

/** Página "Proyectos": todos los proyectos con filtros */
export function TodosProyectos({ onOpen, filtro, setFiltro }) {
  const lista = filtrar(proyectos, filtro)
  const filtros = ['Todos', ...CATEGORIAS, ...(proyectos.some((p) => p.autoria === 'colaboracion') ? [DIRECCION] : [])]
  return (
    <main className="pt-28 md:pt-32">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h1 className="font-serif text-[clamp(2.6rem,5vw,4.3rem)] leading-[1.02]">
              <span className="block">Proyectos <span aria-hidden="true" className="ml-3 inline-block h-px w-16 translate-y-[-0.3em] bg-burdeo align-middle" /></span>
              <span className="block">seleccionados</span>
            </h1>
            <Reveal><p className="mt-5 max-w-xl text-[17px] leading-relaxed text-tinta/85">{sitio.proyectosIntro}</p></Reveal>
          </div>
          <motion.div
            className="relative hidden lg:col-span-6 lg:block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
          >
            <div aria-hidden="true" className="absolute -top-4 right-16 h-1/3 w-1/2 rotate-2 rounded-[24px] bg-burdeo" />
            <Destello className="absolute -right-2 -top-8 h-10 w-10 text-burdeo" />
            <Media src={sitio.proyectosImagen} alt="" ajuste="contain" fondo="#E9E2D7" className="relative aspect-[16/9] w-full rounded-[28px] shadow-[0_30px_60px_-30px_rgba(60,20,30,0.55)]" priority />
          </motion.div>
        </div>

        {/* Filtros */}
        <div className="sin-scrollbar -mx-5 mt-10 overflow-x-auto px-5 md:mx-0 md:px-0">
          <div role="tablist" aria-label="Filtrar proyectos" className="flex w-max gap-3 md:w-auto md:flex-wrap">
            {filtros.map((f) => {
              const on = filtro === f
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFiltro(f)}
                  className={`relative inline-flex items-center gap-2.5 whitespace-nowrap rounded-lg border px-5 py-2.5 font-serif text-[16px] transition-colors duration-500 ${on ? 'border-burdeo text-crema' : 'border-burdeo/40 text-tinta hover:border-burdeo hover:text-burdeo'}`}
                >
                  {on && <motion.span layoutId="filtro-pagina" className="absolute inset-0 rounded-[7px] bg-burdeo" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  {ICONO_FILTRO[f] && <Icono nombre={ICONO_FILTRO[f]} size={18} className={`relative ${on ? 'text-crema' : 'text-burdeo'}`} />}
                  <span className="relative">{f}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:col-span-9 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {lista.map((p) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <Tarjeta p={p} onOpen={onOpen} pie />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <aside className="lg:col-span-3">
            <Reveal className="rounded-[28px] bg-rosa p-7 lg:sticky lg:top-28">
              <p className="font-serif text-[64px] leading-none text-burdeo" aria-hidden="true">“</p>
              <blockquote className="-mt-4 font-serif text-[1.4rem] italic leading-snug">{sitio.frase}</blockquote>
              <div className="mt-6 h-px w-12 bg-burdeo" />
              <p className="mt-3 font-serif text-burdeo">{sitio.nombre}</p>
            </Reveal>
          </aside>
        </div>
        {lista.length === 0 && <p className="mt-6 font-serif text-xl italic text-gris">Pronto habrá proyectos en esta categoría.</p>}
      </div>
    </main>
  )
}
