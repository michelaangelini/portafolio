import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import { EASE, useFinePointer } from '../lib/util'
import { sitio } from '../data/sitio'
import { Magnetic } from './motion'
import { Monograma } from './Iconos'

/** Revelado tipográfico letra por letra (animación protagonista nº 1) */
function Letras({ texto, delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <span className="block overflow-hidden pb-[0.04em]" aria-hidden="true">
      {texto.split('').map((l, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          initial={{ y: reduce ? 0 : '105%', opacity: reduce ? 0 : 1 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.04 }}
        >
          {l === ' ' ? ' ' : l}
        </motion.span>
      ))}
    </span>
  )
}

/** Tarjeta de área: imagen real + título + flecha. Filtra los proyectos. */
function Area({ a, i, onClick, d }) {
  const reduce = useReducedMotion()
  return (
    <motion.button
      onClick={onClick}
      data-cursor="Ver"
      className="group relative block h-full min-h-[92px] w-full overflow-hidden rounded-2xl text-left shadow-[0_10px_30px_-18px_rgba(60,20,30,0.55)]"
      initial={{ opacity: 0, x: reduce ? 0 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: d + 0.5 + i * 0.1 }}
      aria-label={`Ver proyectos de ${a.titulo}`}
    >
      <img
        src={a.imagen}
        alt=""
        loading="eager"
        className="absolute inset-y-0 left-0 h-full w-[48%] object-cover transition-transform duration-[1200ms] ease-[var(--ease-editorial)] group-hover:scale-[1.08]"
        style={{ objectPosition: a.posicion || 'center' }}
      />
      <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(109,74,68,0.05)_0%,rgba(109,74,68,0.55)_36%,rgba(96,62,57,0.97)_50%,#5d3c37_100%)] transition-colors duration-500 group-hover:opacity-0" />
      <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(122,22,49,0.05)_0%,rgba(122,22,49,0.6)_36%,rgba(122,22,49,0.97)_50%,#7A1631_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative flex h-full items-center justify-end gap-3 px-4 py-3">
        <span className="max-w-[52%] text-right font-serif text-[17px] leading-tight text-white lg:text-[19px]">{a.titulo}</span>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[15px] text-tinta transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-1">→</span>
      </span>
    </motion.button>
  )
}

export default function Hero({ onNavigate, onArea }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const parallax = fine && !reduce

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 50, damping: 18 })
  const sy = useSpring(my, { stiffness: 50, damping: 18 })
  const fotoX = useTransform(sx, (v) => v * -10)
  const fotoY = useTransform(sy, (v) => v * -8)
  const formaX = useTransform(sx, (v) => v * 16)
  const formaY = useTransform(sy, (v) => v * 12)

  const onMove = (e) => {
    if (!parallax) return
    mx.set((e.clientX / window.innerWidth - 0.5) * 2)
    my.set((e.clientY / window.innerHeight - 0.5) * 2)
  }

  const d = 0.5
  const foto = sitio.sobreMi.foto

  return (
    <section id="inicio" ref={ref} onPointerMove={onMove} className="relative overflow-hidden px-5 pb-10 pt-28 md:px-10 md:pt-32">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Texto */}
        <div className="lg:col-span-5">
          <h1 className="font-serif text-[clamp(2.7rem,6.4vw,5.4rem)] font-medium uppercase leading-[0.98] tracking-[-0.01em]">
            <span className="sr-only">{sitio.nombre}</span>
            <Letras texto={sitio.nombreLinea1} delay={d} />
            <Letras texto={sitio.nombreLinea2} delay={d + 0.2} />
          </h1>

          <motion.p
            className="mt-4 font-serif text-[clamp(1.05rem,1.6vw,1.4rem)] italic text-burdeo"
            initial={{ clipPath: reduce ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)', opacity: reduce ? 0 : 1 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
            transition={{ duration: 1.3, ease: EASE, delay: d + 0.8 }}
          >
            {sitio.disciplinas.join(' · ')}
          </motion.p>

          <motion.div
            className="mt-6 h-px w-16 origin-left bg-burdeo"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: EASE, delay: d + 1 }}
          />

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: d + 1.05 }}
          >
            <p className="mt-6 max-w-[460px] text-[17px] leading-relaxed text-tinta/85">{sitio.presentacion}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href="#proyectos"
                  onClick={(e) => { e.preventDefault(); onNavigate('proyectos') }}
                  className="group inline-flex items-center gap-3 rounded-lg bg-burdeo px-6 py-3.5 font-serif text-[17px] text-crema shadow-[0_10px_24px_-14px_rgba(122,22,49,0.9)] transition-colors duration-500 hover:bg-burdeo-2"
                >
                  Ver proyectos
                  <span aria-hidden="true" className="transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-1">→</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={sitio.contacto.cv}
                  download
                  className="group inline-flex items-center gap-3 rounded-lg border border-burdeo/70 px-6 py-3.5 font-serif text-[17px] text-tinta transition-colors duration-500 hover:bg-burdeo hover:text-crema"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="transition-transform duration-500 group-hover:translate-y-0.5">
                    <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Descargar CV
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Retrato */}
        <div className="relative mx-auto hidden w-full max-w-[420px] sm:block lg:col-span-4 lg:max-w-none">
          <motion.div style={{ x: formaX, y: formaY }} aria-hidden="true" className="absolute -right-2 -top-5 h-1/3 w-3/4">
            <motion.div
              className="h-full w-full rounded-[26px] bg-burdeo"
              initial={{ opacity: 0, rotate: 0, scale: 0.9 }}
              animate={{ opacity: 1, rotate: 3, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: d + 0.2 }}
            />
          </motion.div>
          <motion.div style={{ x: formaX, y: formaY }} aria-hidden="true" className="absolute -bottom-4 -left-4 h-1/4 w-1/3">
            <motion.div
              className="h-full w-full rounded-[22px] bg-burdeo-2/80"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: d + 0.35 }}
            />
          </motion.div>
          <motion.div
            style={{ x: fotoX, y: fotoY }}
            className="relative aspect-[4/5] overflow-hidden rounded-[26px] shadow-[0_30px_60px_-30px_rgba(60,20,30,0.6)]"
            initial={{ opacity: 0, y: reduce ? 0 : 30, clipPath: reduce ? 'inset(0 0 0 0 round 26px)' : 'inset(100% 0 0 0 round 26px)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0 round 26px)' }}
            transition={{ duration: 1.3, ease: EASE, delay: d + 0.3 }}
          >
            {foto ? (
              <img src={foto} alt={`Retrato de ${sitio.nombre}`} className="h-full w-full object-cover" style={{ objectPosition: sitio.sobreMi.fotoPosicion || 'center 25%' }} />
            ) : (
              <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#8d2a45] via-burdeo to-[#4e0d20]">
                <Monograma className="w-1/2 text-crema/90" />
              </div>
            )}
          </motion.div>
        </div>

        {/* Áreas */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1 lg:grid-rows-4 lg:gap-3 lg:self-stretch lg:py-2">
          {sitio.areas.map((a, i) => (
            <Area key={a.titulo} a={a} i={i} d={d} onClick={() => onArea(a.filtro)} />
          ))}
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.button
        onClick={() => onNavigate('trabajos')}
        className="mx-auto mt-10 flex flex-col items-center gap-1.5 text-[14px] italic text-gris"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 1.6 }}
        aria-label="Bajar a los proyectos"
      >
        <span className="relative h-8 w-5 rounded-full border border-tinta/40">
          <motion.span
            className="absolute left-1/2 top-1.5 h-1.5 w-[2px] -translate-x-1/2 rounded-full bg-burdeo"
            animate={reduce ? {} : { y: [0, 8, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        <span className="font-serif">Desliza para ver más</span>
        <span aria-hidden="true" className="text-tinta/60">⌄</span>
      </motion.button>
    </section>
  )
}
