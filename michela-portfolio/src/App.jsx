import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react'
import { EASE, scrollToId } from './lib/util'
import { proyectos, casos } from './lib/datos'
import { sitio } from './data/sitio'
import { Nav, ScrollProgress, Cursor } from './components/Chrome'
import Hero from './components/Hero'
import { SobreMi, Experiencia, IA, Contacto } from './components/Sections'
import Proyectos, { TodosProyectos } from './components/Proyectos'
import ProyectoPagina from './components/ProyectoPagina'
import { CasosPagina, CasoPagina, InvitacionCasos } from './components/Casos'

const TITULO_BASE = 'Michela Angelini · Marketing, Comunicaciones y Contenido Creativo'

/* Vistas por enlace (funciona en cualquier hosting):
   (sin #)               → inicio
   #proyectos            → todos los proyectos
   #proyecto-<slug>      → un proyecto                                     */
function vistaDesdeHash() {
  try {
    const h = decodeURIComponent(window.location.hash.slice(1))
    if (h === 'proyectos') return { tipo: 'todos' }
    if (h === 'casos-de-estudio' && casos.length) return { tipo: 'casos' }
    if (h.startsWith('caso-')) {
      const id = h.slice(5)
      if (casos.some((c) => c.id === id)) return { tipo: 'caso', id }
    }
    if (h.startsWith('proyecto-')) {
      const slug = h.slice(9)
      if (proyectos.some((p) => p.slug === slug)) return { tipo: 'proyecto', slug }
    }
  } catch { /* sin hash */ }
  return { tipo: 'inicio' }
}
const clave = (v) => (v.tipo === 'proyecto' ? `p-${v.slug}` : v.tipo === 'caso' ? `c-${v.id}` : v.tipo)
const hashDe = (v) => ({ todos: '#proyectos', casos: '#casos-de-estudio', proyecto: `#proyecto-${v.slug}`, caso: `#caso-${v.id}` })[v.tipo] || ''

/** Cortina de transición entre páginas */
function Pagina({ children, onEnter }) {
  useLayoutEffect(() => { onEnter?.() }, []) // eslint-disable-line
  return (
    <motion.div initial="cubierto" animate="abierto" exit="cerrando" variants={{ cerrando: { opacity: 1, transition: { duration: 0.65 } } }}>
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80] bg-burdeo"
        variants={{
          cubierto: { scaleY: 1, originY: 0 },
          abierto: { scaleY: 0, originY: 0, transition: { duration: 0.8, ease: EASE, delay: 0.1 } },
          cerrando: { scaleY: [0, 1], originY: 1, transition: { duration: 0.6, ease: EASE } },
        }}
      />
    </motion.div>
  )
}

export default function App() {
  const reduce = useReducedMotion()
  const [vista, setVista] = useState(vistaDesdeHash)
  const [filtro, setFiltro] = useState('Todos')
  const vistaRef = useRef(vista)
  const pendiente = useRef(null)
  const scrollInicio = useRef(0)

  const sincronizar = useCallback((nueva) => {
    const prev = vistaRef.current
    if (clave(prev) === clave(nueva)) return
    if (prev.tipo === 'inicio') scrollInicio.current = window.scrollY
    if (!pendiente.current) pendiente.current = nueva.tipo === 'inicio' ? { tipo: 'restaurar' } : { tipo: 'arriba' }
    vistaRef.current = nueva
    setVista(nueva)
  }, [])

  useEffect(() => {
    const on = () => sincronizar(vistaDesdeHash())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [sincronizar])

  useEffect(() => {
    if (vista.tipo === 'inicio') document.title = TITULO_BASE
    if (vista.tipo === 'todos') document.title = `Proyectos · ${sitio.nombre}`
    if (vista.tipo === 'casos') document.title = `Casos de estudio · ${sitio.nombre}`
  }, [vista])

  const irA = (nueva, accion) => {
    if (clave(vistaRef.current) === clave(nueva)) {
      if (accion?.tipo === 'seccion') scrollToId(accion.id, reduce)
      else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
      return
    }
    pendiente.current = accion || null
    try {
      const h = hashDe(nueva)
      if (h) window.location.hash = h.slice(1)
      else window.history.pushState(null, '', window.location.pathname + window.location.search)
    } catch { /* entorno sin historial */ }
    sincronizar(nueva)
  }

  const abrir = (slug) => irA({ tipo: 'proyecto', slug })
  const verTodos = (f) => { if (typeof f === 'string') setFiltro(f); irA({ tipo: 'todos' }) }
  const verCasos = () => irA({ tipo: 'casos' })
  const abrirCaso = (id) => irA({ tipo: 'caso', id })

  const navegar = (id) => {
    if (id === 'proyectos') return verTodos()
    if (id === 'casos') return verCasos()
    if (id === 'contacto') return scrollToId('contacto', reduce)
    if (id === 'inicio') return irA({ tipo: 'inicio' }, { tipo: 'arriba' })
    return irA({ tipo: 'inicio' }, { tipo: 'seccion', id })
  }

  const alEntrar = () => {
    const p = pendiente.current
    pendiente.current = null
    if (!p) return
    if (p.tipo === 'arriba') window.scrollTo({ top: 0, behavior: 'instant' })
    if (p.tipo === 'restaurar') window.scrollTo({ top: scrollInicio.current, behavior: 'instant' })
    if (p.tipo === 'seccion') {
      const el = document.getElementById(p.id)
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'instant' })
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="grano">
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-tinta focus:px-4 focus:py-2 focus:text-crema">
          Saltar al contenido
        </a>
        <ScrollProgress />
        <Cursor />
        <Nav onNavigate={navegar} vista={vista.tipo} />

        <div id="contenido">
          <AnimatePresence mode="wait">
            <Pagina key={clave(vista)} onEnter={alEntrar}>
              {vista.tipo === 'inicio' && (
                <main>
                  <Hero
                    onNavigate={(id) => (id === 'trabajos' ? scrollToId('trabajos', reduce) : navegar(id))}
                    onArea={(f) => verTodos(f)}
                  />
                  <Proyectos onOpen={abrir} filtro={filtro} setFiltro={setFiltro} onTodos={() => verTodos('Todos')} />
                  <InvitacionCasos onVer={verCasos} />
                  <SobreMi />
                  <Experiencia onOpen={abrir} />
                  <IA />
                </main>
              )}
              {vista.tipo === 'todos' && <TodosProyectos onOpen={abrir} filtro={filtro} setFiltro={setFiltro} />}
              {vista.tipo === 'proyecto' && <ProyectoPagina slug={vista.slug} onOpen={abrir} onVolver={() => verTodos()} />}
              {vista.tipo === 'casos' && <CasosPagina onAbrir={abrirCaso} />}
              {vista.tipo === 'caso' && <CasoPagina id={vista.id} onAbrir={abrirCaso} onVolver={verCasos} onProyecto={abrir} />}
              <Contacto />
            </Pagina>
          </AnimatePresence>
        </div>
      </div>
      <span className="sr-only" aria-live="polite">
        {vista.tipo === 'proyecto' ? `Proyecto: ${proyectos.find((p) => p.slug === vista.slug)?.titulo}` : vista.tipo === 'caso' ? `Caso: ${casos.find((c) => c.id === vista.id)?.titulo}` : vista.tipo === 'todos' ? 'Proyectos' : vista.tipo === 'casos' ? 'Casos de estudio' : sitio.nombre}
      </span>
    </MotionConfig>
  )
}
