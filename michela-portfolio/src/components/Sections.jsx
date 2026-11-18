import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { EASE, parseWords, plain } from '../lib/util'
import { sitio } from '../data/sitio'
import { proyectos } from '../lib/datos'
import { Reveal, SplitWords, Etiqueta, Boton, Magnetic } from './motion'
import Media from './Media'

const contenedor = 'mx-auto w-full max-w-[1600px] px-5 md:px-10'

/* ---------- Cinta en movimiento ---------- */
export function Cinta() {
  const items = [...sitio.cinta, ...sitio.cinta]
  return (
    <div className="relative z-10 -rotate-[1.5deg] overflow-hidden bg-burdeo py-4 text-crema md:py-5" aria-label={sitio.cinta.join(', ')}>
      <div className="cinta flex w-max items-center whitespace-nowrap" aria-hidden="true">
        {items.map((t, i) => (
          <span key={i} className="flex items-center text-2xl md:text-4xl">
            <span className={i % 2 ? 'font-serif italic' : 'font-medium tracking-tight'}>{t}</span>
            <span className="mx-6 text-base text-crema/50 md:mx-10">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- Imagen con parallax discreto ---------- */
export function ParallaxMedia({ className = '', ...props }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const quieto = reduce || props.ajuste === 'contain' // piezas completas: sin recorte
  const y = useTransform(scrollYProgress, [0, 1], quieto ? ['0%', '0%'] : ['-7%', '7%'])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, scale: quieto ? 1 : 1.16 }} className="h-full w-full">
        <Media {...props} className="h-full w-full" />
      </motion.div>
    </div>
  )
}

/* ---------- Sobre mí ---------- */
export function SobreMi() {
  const s = sitio.sobreMi
  return (
    <section id="sobre-mi" className="py-28 md:py-44">
      <div className={`${contenedor} grid gap-14 md:grid-cols-12 md:gap-10`}>
        <div className="md:col-span-5">
          {s.foto && (
            <Reveal className="mb-6">
              <ParallaxMedia src={s.foto} alt={`Retrato de ${sitio.nombre}`} className="aspect-[4/5] w-full max-w-[520px]" tono="#E2D6CC" />
            </Reveal>
          )}
          <Reveal delay={0.1} className={`max-w-[520px] border-t border-tinta/15 pt-5 ${s.foto ? '' : 'md:sticky md:top-32'}`}>
            <p className="text-[13px] uppercase tracking-[0.18em] text-gris">Formación</p>
            <p className="mt-2 text-xl leading-tight tracking-tight">{s.formacion.titulo}</p>
            <p className="mt-1 text-gris">
              {s.formacion.institucion} · <span className="font-serif text-lg italic text-burdeo">{s.formacion.distincion}</span>
            </p>
            {s.estudios?.length > 0 && (
              <ul className="mt-5 space-y-3 border-t border-tinta/10 pt-4">
                {s.estudios.map((e) => (
                  <li key={e.titulo}>
                    <p className="leading-snug tracking-tight">{e.titulo}</p>
                    <p className="text-[14px] text-gris">{e.institucion}{e.periodo && ` · ${e.periodo}`}</p>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Etiqueta n="01">Sobre mí</Etiqueta>
          <h2 className="mt-8 text-[clamp(2.1rem,4.6vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.035em]">
            <SplitWords text={s.titulo} />
          </h2>
          <div className="mt-10 grid gap-6 text-lg leading-relaxed text-tinta/75 md:grid-cols-2 md:gap-8">
            {s.parrafos.map((p, i) => (
              <Reveal key={i} delay={i * 0.12}><p>{p}</p></Reveal>
            ))}
          </div>

          <ul className="mt-16 grid gap-x-8 sm:grid-cols-2">
            {s.ejes.map((e, i) => (
              <Reveal as="li" key={e.titulo} delay={(i % 2) * 0.08} className="group border-t border-tinta/15 py-5">
                <div className="flex gap-4">
                  <span className="font-serif text-lg italic text-burdeo-2">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="font-medium tracking-tight transition-colors duration-500 group-hover:text-burdeo">{e.titulo}</p>
                    <p className="mt-1 text-[15px] leading-snug text-gris">{e.texto}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12">
            <p className="text-[13px] uppercase tracking-[0.18em] text-gris">Herramientas</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.herramientas.map((h) => (
                <li key={h} className="rounded-full border border-tinta/20 px-4 py-2 text-[15px] transition-all duration-500 ease-[var(--ease-editorial)] hover:-translate-y-0.5 hover:border-burdeo hover:bg-burdeo hover:text-crema">
                  {h}
                </li>
              ))}
            </ul>
            {s.idiomas?.length > 0 && (
              <>
                <p className="mt-8 text-[13px] uppercase tracking-[0.18em] text-gris">Idiomas</p>
                <p className="mt-3 text-[15px]">{s.idiomas.join('  ·  ')}</p>
              </>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------- Frase que se ilumina con el scroll (scroll narrativo) ---------- */
function Palabra({ w, progress, range }) {
  const reduce = useReducedMotion()
  const opacity = useTransform(progress, range, reduce ? [1, 1] : [0.14, 1])
  return (
    <motion.span style={{ opacity }} className={w.acento ? 'acento' : ''}>
      {w.t}{w.punt}{' '}
    </motion.span>
  )
}

export function Frase() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = parseWords(sitio.frase)
  return (
    <section ref={ref} className="bg-crema-2/60 py-28 md:py-44" aria-label="Frase destacada">
      <div className={contenedor}>
        <p className="sr-only">{plain(sitio.frase)}</p>
        <p aria-hidden="true" className="max-w-[1250px] text-[clamp(2rem,5.2vw,5rem)] font-medium leading-[1.05] tracking-[-0.035em]">
          {words.map((w, i) => (
            <Palabra key={i} w={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
        </p>
      </div>
    </section>
  )
}

/* ---------- Experiencia ---------- */
export function Experiencia({ onOpen }) {
  return (
    <section id="experiencia" className="py-28 md:py-44">
      <div className={contenedor}>
        <Etiqueta n="02">Experiencia</Etiqueta>
        <h2 className="mt-8 max-w-4xl text-[clamp(2.1rem,4.6vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.035em]">
          <SplitWords text="Experiencia entre *agencia* y *empresa*." />
        </h2>

        <div className="mt-20 space-y-24 md:space-y-32">
          {sitio.experiencia.map((x, idx) => {
            const rel = x.proyectos.map((s) => proyectos.find((p) => p.slug === s)).filter(Boolean)
            return (
              <article key={x.empresa} className="relative">
                <motion.div
                  className="h-px origin-left bg-tinta/25"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.4, ease: EASE }}
                />
                <div className="grid gap-10 pt-8 md:grid-cols-12">
                  <div className="md:col-span-5">
                    <Reveal y={20} className="flex items-baseline gap-4 text-gris">
                      <span className="font-serif text-lg italic text-burdeo-2">{String.fromCharCode(65 + idx)}.</span>
                      <span className="text-[13px] uppercase tracking-[0.18em]">{x.tipo}</span>
                    </Reveal>
                    <h3 className="mt-4 text-[clamp(2.6rem,6.4vw,6.2rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
                      <SplitWords text={x.empresa} stagger={0.08} />
                    </h3>
                    <Reveal delay={0.2} className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-gris">
                      {x.cargo && <span className="text-tinta">{x.cargo}</span>}
                      {x.periodo && <span className="font-serif text-lg italic">{x.periodo}</span>}
                    </Reveal>
                    {x.contratacion && <Reveal delay={0.25}><p className="mt-2 text-[14px] text-gris">{x.contratacion}</p></Reveal>}
                  </div>

                  <div className="md:col-span-6 md:col-start-7">
                    <Reveal><p className="text-xl leading-snug tracking-tight md:text-2xl">{x.descripcion}</p></Reveal>
                    <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                      {x.puntos.map((p, i) => (
                        <Reveal as="li" key={p} delay={i * 0.04} y={14} className="flex gap-3 border-b border-tinta/10 py-3 text-[15px] text-tinta/80">
                          <span className="mt-[9px] h-px w-3 shrink-0 bg-burdeo" aria-hidden="true" />
                          {p}
                        </Reveal>
                      ))}
                    </ul>
                    {x.marcas && (
                      <Reveal className="mt-6 text-[15px] text-gris">
                        <span className="text-[13px] uppercase tracking-[0.18em]">Cuentas y marcas · </span>
                        <span className="text-tinta">{x.marcas}</span>
                      </Reveal>
                    )}
                    {rel.length > 0 && (
                      <Reveal className="mt-10">
                        <p className="text-[13px] uppercase tracking-[0.18em] text-gris">Proyectos relacionados</p>
                        <ul className="mt-3">
                          {rel.map((p) => (
                            <li key={p.slug}>
                              <a
                                href={`#proyecto-${p.slug}`}
                                onClick={(e) => { e.preventDefault(); onOpen(p.slug) }}
                                className="group flex items-center justify-between gap-4 border-b border-tinta/10 py-3 transition-colors duration-500 hover:text-burdeo"
                              >
                                <span className="text-lg tracking-tight transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-2">{p.titulo}</span>
                                <span aria-hidden="true" className="transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:-rotate-45">→</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Inteligencia artificial ---------- */
export function IA() {
  const ia = sitio.ia
  return (
    <section id="ia" className="py-28 md:py-44">
      <div className={`${contenedor} grid gap-14 md:grid-cols-12`}>
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <Etiqueta n="04">IA aplicada</Etiqueta>
            <h2 className="mt-8 text-[clamp(2.1rem,4.2vw,4rem)] font-medium leading-[1.02] tracking-[-0.035em]">
              <SplitWords text={ia.titulo} />
            </h2>
            <Reveal delay={0.1}><p className="mt-8 max-w-md text-lg leading-relaxed text-tinta/75">{ia.intro}</p></Reveal>
            <Reveal delay={0.2}><p className="mt-6 max-w-md font-serif text-2xl italic leading-snug text-burdeo">{ia.nota}</p></Reveal>
          </div>
        </div>

        <ol className="md:col-span-7">
          {ia.usos.map((u, i) => (
            <Reveal as="li" key={u.titulo} delay={i * 0.06} className="group relative overflow-hidden border-t border-tinta/15 last:border-b">
              <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-burdeo transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-y-100" />
              <div className="relative grid grid-cols-[3rem_1fr] gap-4 px-1 py-7 transition-colors duration-500 group-hover:text-crema md:grid-cols-[4rem_1fr_auto] md:px-4 md:py-9">
                <span className="font-serif text-2xl italic text-burdeo-2 transition-colors duration-500 group-hover:text-crema/70">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-2xl font-medium tracking-tight md:text-3xl">{u.titulo}</p>
                  <p className="mt-2 max-w-lg text-[15px] leading-snug text-gris transition-colors duration-500 group-hover:text-crema/80">{u.texto}</p>
                </div>
                <span aria-hidden="true" className="hidden self-center text-2xl transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-1 group-hover:-rotate-45 md:block">→</span>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------- Contacto (cierre) ---------- */
export function Contacto() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.25'] })
  const inset = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [5, 0])
  const radius = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [48, 0])
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(0% ${i}% 0% ${i}% round ${r}px ${r}px 0 0)`)
  const c = sitio.contacto
  const letras = sitio.cierre.titulo.split('')

  return (
    <motion.section id="contacto" ref={ref} style={{ clipPath }} className="relative bg-tinta text-crema">
      <div className={`${contenedor} pb-10 pt-28 md:pt-40`}>
        <Etiqueta n="05" claro>Contacto</Etiqueta>

        <h2 className="mt-10 whitespace-nowrap text-[clamp(4rem,18vw,18rem)] font-semibold leading-[0.82] tracking-[-0.06em]" aria-label={sitio.cierre.titulo}>
          <motion.span aria-hidden="true" className="block overflow-hidden pb-[0.05em]" initial="h" whileInView="s" viewport={{ once: true, amount: 0.4 }} transition={{ staggerChildren: 0.06 }}>
            {letras.map((l, i) => (
              <motion.span
                key={i}
                className={`inline-block ${l === '.' ? 'text-burdeo-2' : ''}`}
                variants={{ h: { y: reduce ? 0 : '105%', opacity: reduce ? 0 : 1 }, s: { y: 0, opacity: 1, transition: { duration: 1.1, ease: EASE } } }}
              >
                {l}
              </motion.span>
            ))}
          </motion.span>
        </h2>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="text-xl leading-snug text-crema/80 md:text-2xl">{sitio.cierre.texto}</p>
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="text-[13px] uppercase tracking-[0.18em] text-crema/50">Escríbeme</p>
              <a href={`mailto:${c.email}`} className="subrayado mt-3 inline-block break-all text-[clamp(1.6rem,3.6vw,3.2rem)] font-medium tracking-tight transition-colors duration-500 hover:text-[#E5899F]">
                {c.email}
              </a>
            </Reveal>
            <Reveal delay={0.12} className="mt-10 flex flex-wrap gap-3">
              <Magnetic><Boton variante="claro" href={c.linkedin} target="_blank" rel="noopener noreferrer" icono="↗">LinkedIn</Boton></Magnetic>
              <Magnetic><Boton variante="claroContorno" href={c.cv} download icono="↓">Descargar CV</Boton></Magnetic>
            </Reveal>
          </div>
        </div>

        <footer className="mt-28 flex flex-col gap-4 border-t border-crema/15 pt-6 text-[13px] text-crema/50 md:mt-40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {sitio.nombre}. Todos los derechos reservados.</p>
          <p className="font-serif text-base italic">{sitio.disciplinas.join(' · ')}</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })} className="subrayado self-start text-crema/80 md:self-auto">
            Volver arriba ↑
          </button>
        </footer>
      </div>
    </motion.section>
  )
}
