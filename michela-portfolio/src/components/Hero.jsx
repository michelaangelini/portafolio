import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion } from 'motion/react'
import { EASE, useFinePointer } from '../lib/util'
import { sitio } from '../data/sitio'
import { Boton, Magnetic } from './motion'

/** Revelado tipográfico letra por letra (animación protagonista nº 1) */
function Letras({ texto, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <span className={`-mx-[0.08em] block overflow-hidden px-[0.08em] pb-[0.06em] ${className}`} aria-hidden="true">
      {texto.split('').map((l, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          initial={{ y: reduce ? 0 : '108%', rotate: reduce ? 0 : 6, opacity: reduce ? 0 : 1 }}
          animate={{ y: '0%', rotate: 0, opacity: 1 }}
          transition={{ duration: 1.25, ease: EASE, delay: delay + i * 0.045 }}
        >
          {l}
        </motion.span>
      ))}
    </span>
  )
}

/** Sello circular giratorio que lleva a proyectos */
function Sello({ onClick }) {
  const texto = 'Ver proyectos · Ver proyectos · '
  return (
    <button onClick={onClick} data-cursor="Ir" aria-label="Ver proyectos" className="group relative grid h-28 w-28 place-items-center md:h-36 md:w-36">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite] motion-reduce:animate-none" aria-hidden="true">
        <defs><path id="circulo" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
        <text className="fill-tinta text-[8.6px] uppercase"><textPath href="#circulo" textLength="236" lengthAdjust="spacing">{texto}</textPath></text>
      </svg>
      <span className="grid h-11 w-11 place-items-center rounded-full bg-burdeo text-crema transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-125 md:h-14 md:w-14">↓</span>
    </button>
  )
}

export default function Hero({ onNavigate }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const parallax = fine && !reduce

  // Parallax con el mouse
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 50, damping: 18 })
  const sy = useSpring(my, { stiffness: 50, damping: 18 })
  const l1x = useTransform(sx, (v) => v * -12)
  const l2x = useTransform(sx, (v) => v * 18)
  const l1y = useTransform(sy, (v) => v * -6)
  const l2y = useTransform(sy, (v) => v * 8)
  const fx = useTransform(sx, (v) => v * -34)
  const fy = useTransform(sy, (v) => v * -22)

  const onMove = (e) => {
    if (!parallax) return
    mx.set((e.clientX / window.innerWidth - 0.5) * 2)
    my.set((e.clientY / window.innerHeight - 0.5) * 2)
  }

  // Cambio de composición al salir de la portada
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const nombreY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140])
  const contenidoO = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0])

  const d = 0.55 // espera a que se abra la cortina inicial

  return (
    <section id="inicio" ref={ref} onPointerMove={onMove} className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-24 md:px-10 md:pb-10 md:pt-32">
      {/* Fila superior */}
      <motion.div
        style={{ opacity: contenidoO }}
        className="mx-auto flex w-full max-w-[1600px] items-center justify-between text-[13px] uppercase tracking-[0.18em] text-gris"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 0.8, duration: 1 }}
      >
        <span>Portafolio</span>
        <span className="flex items-center gap-2 normal-case tracking-normal">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-burdeo-2 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-burdeo" />
          </span>
          {sitio.estado}
        </span>
      </motion.div>

      {/* Nombre */}
      <motion.div style={{ y: nombreY }} className="relative mx-auto mt-auto w-full max-w-[1600px] pt-10">
        <h1 className="relative select-none uppercase leading-[0.8]">
          <span className="sr-only">{sitio.nombre}</span>
          <motion.span style={{ x: l1x, y: l1y }} className="block text-[clamp(3.6rem,21vw,17.5rem)] font-semibold tracking-[-0.055em]">
            <Letras texto={sitio.nombreLinea1} delay={d} />
          </motion.span>
          <motion.span style={{ x: l2x, y: l2y }} className="block text-right text-[clamp(3.2rem,18vw,14.5rem)] font-serif italic tracking-[-0.03em] text-burdeo md:-mt-[0.04em]">
            <Letras texto={sitio.nombreLinea2} delay={d + 0.25} />
          </motion.span>
        </h1>

        {/* Elemento flotante */}
        <motion.div
          style={{ x: fx, y: fy }}
          className="absolute left-[3%] top-[58%] hidden md:block lg:left-[7%]"
          initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: EASE, delay: d + 0.9 }}
        >
          <Sello onClick={() => onNavigate('proyectos')} />
        </motion.div>
      </motion.div>

      {/* Fila inferior */}
      <motion.div style={{ opacity: contenidoO }} className="mx-auto mt-10 grid w-full max-w-[1600px] grid-cols-1 gap-8 md:mt-14 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <motion.p
            className="text-[13px] uppercase tracking-[0.2em] text-tinta md:text-sm"
            initial={{ clipPath: reduce ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)', opacity: reduce ? 0 : 1 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: d + 0.9 }}
          >
            {sitio.disciplinas.map((t, i) => (
              <span key={t}>{t}{i < sitio.disciplinas.length - 1 && <span className="mx-2 text-burdeo">·</span>}{' '}</span>
            ))}
          </motion.p>
        </div>

        <motion.div
          className="md:col-span-5 md:col-start-7"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: d + 1.1 }}
        >
          <p className="max-w-md text-lg leading-snug text-tinta/80 md:text-xl">{sitio.presentacion}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Magnetic><Boton href="#proyectos" onClick={(e) => { e.preventDefault(); onNavigate('proyectos') }}>Ver proyectos</Boton></Magnetic>
            <Magnetic><Boton variante="contorno" href="#experiencia" onClick={(e) => { e.preventDefault(); onNavigate('experiencia') }} icono="↘">Mi experiencia</Boton></Magnetic>
          </div>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.button
          onClick={() => onNavigate('sobre-mi')}
          aria-label="Bajar a la siguiente sección"
          className="hidden flex-col items-center gap-3 justify-self-end text-[11px] uppercase tracking-[0.25em] text-gris md:col-span-1 md:col-start-12 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: d + 1.5 }}
        >
          <span className="[writing-mode:vertical-rl]">Scroll</span>
          <span className="relative h-16 w-px overflow-hidden bg-tinta/15">
            <motion.span
              className="absolute left-0 top-0 h-6 w-px bg-burdeo"
              animate={reduce ? {} : { y: ['-100%', '280%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </motion.button>
      </motion.div>
    </section>
  )
}
