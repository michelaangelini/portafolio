import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react'
import { EASE, scrollToId } from './lib/util'
import { proyectos } from './data/proyectos'
import { sitio } from './data/sitio'
import { Nav, ScrollProgress, Cursor } from './components/Chrome'
import Hero from './components/Hero'
import { Cinta, SobreMi, Frase, Experiencia, IA, Contacto } from './components/Sections'
import Proyectos from './components/Proyectos'
import ProyectoPagina from './components/ProyectoPagina'

const TITULO_BASE = 'Michela Angelini · Marketing, Comunicaciones y Contenido Creativo'

// Las vistas de proyecto usan el enlace #proyecto-<slug> (funciona en cualquier hosting)
function slugDesdeHash() {
  try {
    const h = decodeURIComponent(window.location.hash.slice(1))
    const s = h.startsWith('proyecto-') ? h.slice(9) : null
    return s && proyectos.some((p) => p.slug === s) ? s : null
  } catch { return null }
}

/** Cortina de transición entre páginas */
function Pagina({ children, onEnter }) {
  useLayoutEffect(() => { onEnter?.() }, []) // eslint-disable-line
  return (
    <motion.div initial="cubierto" animate="abierto" exit="cerrando" variants={{ cerrando: { opacity: 1, transition: { duration: 0.7 } } }}>
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80] bg-burdeo"
        variants={{
          cubierto: { scaleY: 1, originY: 0 },
          abierto: { scaleY: 0, originY: 0, transition: { duration: 0.85, ease: EASE, delay: 0.1 } },
          cerrando: { scaleY: [0, 1], originY: 1, transition: { duration: 0.65, ease: EASE } },
        }}
      />
    </motion.div>
  )
}

export default function App() {
  const reduce = useReducedMotion()
  const [slug, setSlug] = useState(slugDesdeHash)
  const [filtro, setFiltro] = useState('Todos')
  const slugRef = useRef(slug)
  const pendiente = useRef(null) // qué hacer con el scroll al entrar a la nueva vista
  const scrollInicio = useRef(0)
  const abiertoDesdeSitio = useRef(false)

  const sincronizar = useCallback((nuevo) => {
    const prev = slugRef.current
    if (prev === nuevo) return
    if (!prev && nuevo) scrollInicio.current = window.scrollY
    if (nuevo) pendiente.current = { tipo: 'arriba' }
    else if (!pendiente.current) pendiente.current = { tipo: 'restaurar' }
    slugRef.current = nuevo
    setSlug(nuevo)
  }, [])

  useEffect(() => {
    const on = () => sincronizar(slugDesdeHash())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [sincronizar])

  useEffect(() => {
    if (!slug) document.title = TITULO_BASE
  }, [slug])

  const abrir = (s) => {
    try {
      // Desde el inicio se agrega una entrada al historial; entre proyectos se reemplaza,
      // así "Volver" (o el botón atrás del navegador) siempre regresa a la galería.
      if (slugRef.current) window.location.replace(`#proyecto-${s}`)
      else { window.location.hash = `proyecto-${s}`; abiertoDesdeSitio.current = true }
    } catch { /* entorno sin hash */ }
    sincronizar(s)
  }

  const volver = (seccion) => {
    pendiente.current = seccion ? { tipo: 'seccion', id: seccion } : { tipo: 'restaurar' }
    try {
      if (abiertoDesdeSitio.current) { abiertoDesdeSitio.current = false; window.history.back() }
      else window.history.pushState(null, '', window.location.pathname + window.location.search)
    } catch { /* sin historial */ }
    sincronizar(null)
  }

  const alEntrar = () => {
    const p = pendiente.current
    pendiente.current = null
    if (!p) return
    if (p.tipo === 'arriba') window.scrollTo({ top: 0, behavior: 'instant' })
    if (p.tipo === 'restaurar') window.scrollTo({ top: scrollInicio.current, behavior: 'instant' })
    if (p.tipo === 'seccion') {
      const el = document.getElementById(p.id)
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 20, behavior: 'instant' })
    }
  }

  const navegar = (id) => (slugRef.current ? volver(id) : scrollToId(id, reduce))

  return (
    <MotionConfig reducedMotion="user">
      <div className="grano">
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-tinta focus:px-4 focus:py-2 focus:text-crema">
          Saltar al contenido
        </a>
        <ScrollProgress />
        <Cursor />
        <Nav onNavigate={navegar} enProyecto={!!slug} onVolver={() => volver('proyectos')} />

        <div id="contenido">
          <AnimatePresence mode="wait">
            {slug ? (
              <Pagina key={`p-${slug}`} onEnter={alEntrar}>
                <ProyectoPagina slug={slug} onOpen={abrir} onVolver={() => volver('proyectos')} />
                <Contacto />
              </Pagina>
            ) : (
              <Pagina key="inicio" onEnter={alEntrar}>
                <main>
                  <Hero onNavigate={navegar} />
                  <Cinta />
                  <SobreMi />
                  <Frase />
                  <Experiencia onOpen={abrir} />
                  <Proyectos onOpen={abrir} filtro={filtro} setFiltro={setFiltro} />
                  <IA />
                </main>
                <Contacto />
              </Pagina>
            )}
          </AnimatePresence>
        </div>
      </div>
      <span className="sr-only" aria-live="polite">{slug ? `Proyecto: ${proyectos.find((p) => p.slug === slug)?.titulo}` : sitio.nombre}</span>
    </MotionConfig>
  )
}
