import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useReducedMotion, useMotionValueEvent } from 'motion/react'
import { EASE, useFinePointer } from '../lib/util'
import { sitio } from '../data/sitio'
import { Monograma } from './Iconos'
import { casos } from '../lib/datos'

/* ---------- Barra de progreso de lectura ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-burdeo" style={{ scaleX }} />
}

/* ---------- Cursor personalizado (solo escritorio) ---------- */
export function Cursor() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const activo = fine && !reduce
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })
  const [estado, setEstado] = useState({ hover: false, label: '' })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!activo) return
    document.documentElement.classList.add('cursor-activo')
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); setVisible(true) }
    const over = (e) => {
      const el = e.target.closest('a, button, [data-cursor]')
      setEstado({ hover: !!el, label: el?.getAttribute('data-cursor') || '' })
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over)
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('cursor-activo')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [activo, x, y])

  if (!activo) return null
  const size = estado.label ? 88 : estado.hover ? 44 : 10
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: size, height: size, opacity: visible ? 1 : 0,
        backgroundColor: estado.label ? 'rgba(122,22,49,0.95)' : estado.hover ? 'rgba(122,22,49,0)' : 'rgba(23,19,17,1)',
      }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <span className="absolute inset-0 rounded-full border border-burdeo" style={{ opacity: estado.hover && !estado.label ? 1 : 0 }} />
      <AnimatePresence>
        {estado.label && (
          <motion.span initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-[12px] font-medium uppercase tracking-[0.15em] text-crema">
            {estado.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ---------- Navegación ---------- */
const LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'proyectos', label: 'Proyectos' },
  ...(casos.length ? [{ id: 'casos', label: 'Casos de estudio' }] : []),
  { id: 'contacto', label: 'Contacto' },
]

export function Nav({ onNavigate, vista }) {
  const [abierto, setAbierto] = useState(false)
  const [oculto, setOculto] = useState(false)
  const [conFondo, setConFondo] = useState(false)
  const [activo, setActivo] = useState('inicio')
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setOculto(v > prev && v > 240 && !abierto)
    setConFondo(v > 20)
  })

  useEffect(() => {
    if (vista !== 'inicio') { setActivo(vista === 'todos' || vista === 'proyecto' ? 'proyectos' : vista === 'casos' || vista === 'caso' ? 'casos' : 'inicio'); return }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActivo(e.target.id === 'trabajos' ? 'inicio' : e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['inicio', 'trabajos', 'sobre-mi', 'contacto'].forEach((id) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [vista])

  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : ''
    const esc = (e) => e.key === 'Escape' && setAbierto(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [abierto])

  const ir = (id) => (e) => { e.preventDefault(); setAbierto(false); onNavigate(id) }

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${abierto ? 'text-crema' : 'text-tinta'} ${conFondo && !abierto ? 'bg-crema/85 shadow-[0_1px_0_rgba(122,22,49,0.08)] backdrop-blur-md' : ''}`}
        animate={{ y: oculto ? '-110%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3.5 md:px-10 md:py-4" aria-label="Principal">
          <a href="#inicio" onClick={ir('inicio')} className="flex items-center gap-4" aria-label={`${sitio.nombre} — inicio`}>
            <Monograma className={`h-11 w-auto ${abierto ? 'text-crema' : 'text-tinta'}`} />
            <span className={`hidden h-8 w-px lg:block ${abierto ? 'bg-crema/40' : 'bg-burdeo/50'}`} aria-hidden="true" />
            <span className="hidden font-serif text-[19px] lg:block">{sitio.nombre}</span>
          </a>

          <ul className="hidden items-center gap-6 font-serif text-[16px] md:flex lg:gap-9 lg:text-[17px]">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={ir(l.id)}
                  className={`relative pb-1.5 transition-colors duration-300 hover:text-burdeo ${activo === l.id ? 'text-burdeo' : ''}`}
                  aria-current={activo === l.id ? 'page' : undefined}
                >
                  {l.label}
                  <span className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left bg-burdeo transition-transform duration-500 ease-[var(--ease-editorial)] ${activo === l.id ? 'scale-x-100' : 'scale-x-0'}`} />
                </a>
              </li>
            ))}
          </ul>

          <button
            className="relative h-10 w-10 md:hidden"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          >
            <motion.span className="absolute left-2 right-2 h-px bg-current" animate={{ top: abierto ? 20 : 15, rotate: abierto ? 45 : 0 }} />
            <motion.span className="absolute left-2 right-2 h-px bg-current" animate={{ top: abierto ? 20 : 25, rotate: abierto ? -45 : 0 }} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {abierto && (
          <motion.div
            id="menu-movil"
            className="fixed inset-0 z-40 flex flex-col justify-end bg-burdeo px-6 pb-12 text-crema md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <ul className="space-y-1">
              {LINKS.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={ir(l.id)}
                    className="block font-serif text-[13vw] leading-[1.1]"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.06 }}
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-sm text-crema/70">{sitio.contacto.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
