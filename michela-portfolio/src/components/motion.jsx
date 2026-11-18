import { useRef } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring } from 'motion/react'
import { EASE, parseWords, plain, useFinePointer } from '../lib/util'

/** Aparición suave al entrar en pantalla */
export function Reveal({ children, delay = 0, y = 32, className = '', amount = 0.2, as = 'div' }) {
  const reduce = useReducedMotion()
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </M>
  )
}

/** Título que se revela palabra por palabra con máscara */
export function SplitWords({ text, className = '', delay = 0, stagger = 0.055, animateOnMount = false }) {
  const reduce = useReducedMotion()
  const words = parseWords(text)
  const trigger = animateOnMount
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.4 } }
  return (
    <span className={className}>
      <span className="sr-only">{plain(text)}</span>
      <motion.span aria-hidden="true" {...trigger} transition={{ staggerChildren: stagger, delayChildren: delay }}>
        {words.map((w, i) => (
          <span key={i}>
            <span className="inline-block overflow-hidden align-top pb-[0.12em] -mb-[0.12em] pr-[0.04em]">
              <motion.span
                className={`inline-block ${w.acento ? 'acento' : ''}`}
                variants={{
                  hidden: { y: reduce ? 0 : '110%', opacity: reduce ? 0 : 1 },
                  show: { y: 0, opacity: 1, transition: { duration: 1, ease: EASE } },
                }}
              >
                {w.t}
              </motion.span>
              {w.punt}
            </span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

/** Efecto magnético discreto (solo escritorio con mouse) */
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })
  const active = fine && !reduce
  const move = (e) => {
    if (!active) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const leave = () => { x.set(0); y.set(0) }
  return (
    <motion.div ref={ref} onPointerMove={move} onPointerLeave={leave} style={{ x, y }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  )
}

/** Botón con relleno que barre desde abajo + flecha que se desplaza */
export function Boton({ children, href, onClick, variante = 'solido', icono = '→', className = '', ...rest }) {
  const base =
    'group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-[15px] font-medium tracking-tight transition-colors duration-500 ease-[var(--ease-editorial)]'
  const estilos = {
    solido: 'bg-tinta text-crema hover:text-crema',
    contorno: 'border border-tinta/25 text-tinta hover:text-crema hover:border-burdeo',
    claro: 'bg-crema text-tinta hover:text-crema',
    claroContorno: 'border border-crema/30 text-crema hover:border-burdeo-2',
  }
  const Tag = href ? 'a' : 'button'
  return (
    <Tag href={href} onClick={onClick} className={`${base} ${estilos[variante]} ${className}`} {...rest}>
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-y-[101%] rounded-full bg-burdeo transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-y-0"
      />
      <span className="relative">{children}</span>
      {icono && (
        <span aria-hidden="true" className="relative inline-block overflow-hidden">
          <span className="block transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-[130%]">{icono}</span>
          <span className="absolute inset-0 block -translate-x-[130%] transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-0">{icono}</span>
        </span>
      )}
    </Tag>
  )
}

/** Etiqueta de sección tipo revista: 01 — Sobre mí */
export function Etiqueta({ n, children, claro = false }) {
  return (
    <Reveal y={12} className={`flex items-center gap-3 text-[13px] uppercase tracking-[0.18em] ${claro ? 'text-crema/60' : 'text-gris'}`}>
      <span className="font-serif text-lg italic normal-case tracking-normal text-burdeo-2">{n}</span>
      <span className={`h-px w-10 ${claro ? 'bg-crema/30' : 'bg-tinta/25'}`} />
      <span>{children}</span>
    </Reveal>
  )
}
