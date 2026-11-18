import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { EASE } from '../lib/util'
import { sitio } from '../data/sitio'
import { proyectos } from '../lib/datos'
import { Reveal, SplitWords, Magnetic } from './motion'
import { Icono, Monograma, Destello } from './Iconos'
import Media from './Media'
import { formacion, cursos } from '../data/formacion'

const contenedor = 'mx-auto w-full max-w-[1280px] px-5 md:px-10'

/** Texto con *frases destacadas* en cursiva burdeo */
export function Enfasis({ texto }) {
  return texto.split(/(\*[^*]+\*)/g).map((t, i) =>
    t.startsWith('*') ? <em key={i} className="font-serif italic text-burdeo">{t.slice(1, -1)}</em> : <span key={i}>{t}</span>,
  )
}

/** Título de sección con línea burdeo */
export function TituloSeccion({ children, as: Tag = 'h2', className = '', destello = false }) {
  return (
    <Reveal className={`flex items-center gap-5 ${className}`}>
      <Tag className="font-serif text-[clamp(1.9rem,3.2vw,2.7rem)] leading-tight">{children}</Tag>
      <span className="h-px w-14 bg-burdeo" aria-hidden="true" />
      {destello && <Destello className="-ml-2 h-7 w-7 -translate-y-3 text-burdeo" />}
    </Reveal>
  )
}

/* ---------- Imagen con parallax discreto ---------- */
export function ParallaxMedia({ className = '', ...props }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const quieto = reduce || props.ajuste === 'contain'
  const y = useTransform(scrollYProgress, [0, 1], quieto ? ['0%', '0%'] : ['-7%', '7%'])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, scale: quieto ? 1 : 1.16 }} className="h-full w-full">
        <Media {...props} className="h-full w-full" />
      </motion.div>
    </div>
  )
}

/** Retrato con formas burdeo (o monograma si aún no hay foto) */
export function Retrato({ className = '' }) {
  const foto = sitio.sobreMi.foto
  return (
    <div className={`relative ${className}`}>
      <div aria-hidden="true" className="absolute -right-2 -top-5 h-1/3 w-3/4 rotate-3 rounded-[26px] bg-burdeo" />
      <div aria-hidden="true" className="absolute -bottom-4 -left-4 h-1/4 w-1/3 rounded-[22px] bg-burdeo-2/80" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] shadow-[0_30px_60px_-30px_rgba(60,20,30,0.6)]">
        {foto ? (
          <img src={foto} alt={`Retrato de ${sitio.nombre}`} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: sitio.sobreMi.fotoPosicion || 'center 25%' }} />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#8d2a45] via-burdeo to-[#4e0d20]">
            <Monograma className="w-1/2 text-crema/90" />
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- Sobre mí ---------- */
export function SobreMi() {
  const s = sitio.sobreMi
  return (
    <section id="sobre-mi" className="py-20 md:py-28">
      <div className={`${contenedor} grid items-start gap-12 lg:grid-cols-12 lg:gap-10`}>
        {/* Texto */}
        <div className="lg:col-span-4">
          <h2 className="font-serif text-[clamp(2.6rem,4.6vw,4rem)] leading-none">
            <SplitWords text="Sobre mí" />
          </h2>
          <Reveal><div className="mt-5 h-px w-14 bg-burdeo" /></Reveal>
          {s.parrafos.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="mt-5 text-[16.5px] leading-relaxed text-tinta/85"><Enfasis texto={p} /></p>
            </Reveal>
          ))}

          {s.idiomas?.length > 0 && (
            <Reveal delay={0.15} className="mt-6 border-t border-burdeo/15 pt-4">
              <p className="text-[14px] text-gris"><span className="text-tinta">Idiomas:</span> {s.idiomas.join(' · ')}</p>
            </Reveal>
          )}
        </div>

        {/* Retrato */}
        <Reveal className="mx-auto w-full max-w-[380px] lg:col-span-4 lg:max-w-none">
          <Retrato />
        </Reveal>

        {/* Herramientas */}
        <div className="lg:col-span-4">
          <Reveal className="flex items-start gap-2">
            <h3 className="font-serif text-[clamp(1.5rem,2.2vw,1.9rem)] leading-tight">Mis herramientas y habilidades</h3>
            <Destello className="h-7 w-7 shrink-0 -translate-y-2 text-burdeo" />
          </Reveal>
          <ul className="mt-6 grid grid-cols-2 gap-3">
            {s.herramientas.map((h, i) => (
              <Reveal as="li" key={h.nombre} delay={i * 0.04} y={14}>
                <div className="tarjeta-suave group flex h-full items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-500 hover:-translate-y-0.5 hover:border-burdeo/30">
                  <Icono nombre={h.icono} className="shrink-0 text-burdeo transition-transform duration-500 group-hover:scale-110" />
                  <span className="font-serif text-[16px] leading-tight">{h.nombre}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
      <Formacion />
    </section>
  )
}

/* ---------- Formación académica ---------- */
function VisorCertificado({ doc, onCerrar }) {
  const esPdf = /\.pdf($|\?)/i.test(doc?.src || '')
  useEffect(() => {
    if (!doc) return
    const esc = (e) => e.key === 'Escape' && onCerrar()
    window.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [doc, onCerrar])
  return (
    <AnimatePresence>
      {doc && (
        <motion.div
          role="dialog" aria-modal="true" aria-label={`Certificado: ${doc.titulo}`}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-tinta/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
          onClick={onCerrar}
        >
          <motion.div
            className="flex h-[86vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-crema shadow-2xl"
            initial={{ y: 30, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.98 }} transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-burdeo/15 px-5 py-3">
              <p className="font-serif text-[16px]">{doc.titulo}</p>
              <div className="flex items-center gap-4 text-[14px]">
                <a href={doc.src} target="_blank" rel="noopener noreferrer" className="subrayado text-burdeo">Abrir en pestaña nueva ↗</a>
                <button onClick={onCerrar} className="subrayado" autoFocus>Cerrar ✕</button>
              </div>
            </div>
            <div className="flex-1 bg-white">
              {esPdf ? <iframe src={doc.src} title={doc.titulo} className="h-full w-full" /> : <img src={doc.src} alt={doc.titulo} className="h-full w-full object-contain" />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function TarjetaFormacion({ f, i, onVer }) {
  return (
    <Reveal delay={i * 0.08} y={24} className="h-full">
      <article className="tarjeta-suave group flex h-full flex-col overflow-hidden rounded-2xl">
        <div className="relative aspect-[16/8] overflow-hidden" style={{ backgroundColor: f.fondoLogo || '#F0E4E2' }}>
          {f.foto ? (
            <>
              <img src={f.foto} alt={`${f.institucion}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-editorial)] group-hover:scale-[1.06]" />
              {f.logo && (
                <span className="absolute bottom-3 left-3 grid h-11 place-items-center rounded-lg px-2 shadow-sm" style={{ backgroundColor: f.fondoLogo || '#fff' }}>
                  <img src={f.logo} alt="" className="h-8 w-auto max-w-[110px] object-contain" />
                </span>
              )}
            </>
          ) : (
            <img src={f.logo} alt={`Logo ${f.institucion}`} loading="lazy" className="h-full w-full object-contain px-8 py-6 transition-transform duration-[1200ms] ease-[var(--ease-editorial)] group-hover:scale-[1.06]" />
          )}
          <span className="absolute left-3 top-3 rounded-full bg-crema/95 px-2.5 py-0.5 text-[11px] uppercase tracking-[0.12em] text-burdeo shadow-sm">{f.tipo}</span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h4 className="font-serif text-[1.12rem] leading-snug">{f.institucion}</h4>
          <p className="mt-0.5 text-[13px] text-gris">{[f.pais, f.fechas].filter(Boolean).join(' · ')}</p>
          <ul className="mt-3 space-y-2">
            {f.programas.map((p) => (
              <li key={p.nombre}>
                <p className="text-[11px] uppercase tracking-[0.12em] text-gris">{p.etiqueta}</p>
                <p className="font-serif text-[1.05rem] leading-snug text-burdeo">{p.nombre}</p>
              </li>
            ))}
          </ul>
          {(f.distincion || f.detalle) && (
            <div className="mt-3 space-y-1 border-t border-burdeo/10 pt-3 text-[13.5px]">
              {f.distincion && <p className="flex items-center gap-1.5 font-serif italic text-burdeo"><span aria-hidden="true">✦</span>{f.distincion}</p>}
              {f.detalle && <p className="text-tinta/75">{f.detalle}</p>}
            </div>
          )}
          {f.certificado && (
            <button onClick={() => onVer({ src: f.certificado, titulo: `${f.programas[0]?.nombre} · ${f.institucion}` })} className="mt-auto inline-flex items-center gap-2 self-start pt-4 font-serif text-[14.5px] italic text-burdeo">
              <Icono nombre="documento" size={17} /> <span className="subrayado">Ver certificado</span>
            </button>
          )}
        </div>
      </article>
    </Reveal>
  )
}

export function Formacion() {
  const [doc, setDoc] = useState(null)
  return (
    <div className={`${contenedor} mt-16`} id="formacion">
      <TituloSeccion as="h3">Formación académica</TituloSeccion>
      <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {formacion.map((f, i) => <TarjetaFormacion key={f.institucion} f={f} i={i} onVer={setDoc} />)}
      </div>
      {cursos.length > 0 && (
        <Reveal className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl bg-rosa/70 px-5 py-3.5 text-[14px]">
          <span className="text-[11px] uppercase tracking-[0.14em] text-gris">Otros cursos</span>
          {cursos.map((c) => (
            <span key={c.nombre} className="inline-flex items-center gap-2">
              <span className="font-serif">{c.nombre}</span>
              <span className="text-gris">· {[c.institucion, c.fecha].filter(Boolean).join(' · ')}</span>
              {c.certificado && <button onClick={() => setDoc({ src: c.certificado, titulo: c.nombre })} className="subrayado font-serif italic text-burdeo">Ver certificado</button>}
            </span>
          ))}
        </Reveal>
      )}
      <VisorCertificado doc={doc} onCerrar={() => setDoc(null)} />
    </div>
  )
}

/* ---------- Experiencia ---------- */
function TarjetaExperiencia({ x, onOpen }) {
  const [abierta, setAbierta] = useState(false)
  const rel = x.proyectos.map((s) => proyectos.find((p) => p.slug === s)).filter(Boolean)
  return (
    <article className="tarjeta-suave relative flex h-full flex-col overflow-hidden rounded-2xl sm:flex-row">
      <div className="relative h-40 shrink-0 sm:h-auto sm:w-[38%]">
        {x.imagen ? (
          <img src={x.imagen} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#efdcdc] to-[#e2c6c8]">
            <span className="px-4 text-center font-serif text-[clamp(1.4rem,2.2vw,1.9rem)] italic leading-tight text-burdeo/80">{x.empresa}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-serif text-[1.45rem] leading-tight">{x.empresa}</h3>
        {x.cargo && <p className="mt-1 font-serif italic text-burdeo">{x.cargo}</p>}
        <p className="mt-1 text-[14px] text-gris">{x.periodo}{x.contratacion && ` · ${x.contratacion}`}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-tinta/85">{x.descripcion}</p>

        <AnimatePresence initial={false}>
          {abierta && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-1.5 border-t border-burdeo/10 pt-4">
                {x.puntos.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[14.5px] text-tinta/85">
                    <span className="mt-[9px] h-px w-3 shrink-0 bg-burdeo" aria-hidden="true" />{p}
                  </li>
                ))}
              </ul>
              {x.marcas && <p className="mt-3 text-[14px] text-gris"><span className="text-tinta">Cuentas y marcas:</span> {x.marcas}</p>}
              {rel.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {rel.map((p) => (
                    <li key={p.slug}>
                      <button onClick={() => onOpen(p.slug)} className="rounded-full border border-burdeo/25 px-3 py-1 text-[13px] text-burdeo transition-colors hover:bg-burdeo hover:text-crema">
                        {p.titulo} →
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setAbierta((v) => !v)}
          aria-expanded={abierta}
          className="mt-4 inline-flex items-center gap-2 self-start font-serif text-[15px] italic text-burdeo"
        >
          <span className="subrayado">{abierta ? 'Ver menos' : 'Ver funciones y proyectos'}</span>
          <motion.span animate={{ rotate: abierta ? 180 : 0 }} aria-hidden="true">⌄</motion.span>
        </button>
      </div>
    </article>
  )
}

export function Experiencia({ onOpen }) {
  return (
    <section id="experiencia" className="pb-20 md:pb-28">
      <div className={contenedor}>
        <TituloSeccion>Mi experiencia</TituloSeccion>
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
          {sitio.experiencia.map((x, i) => (
            <Reveal key={x.empresa} delay={(i % 2) * 0.1}>
              <TarjetaExperiencia x={x} onOpen={onOpen} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Inteligencia artificial ---------- */
export function IA() {
  const ia = sitio.ia
  return (
    <section id="ia" className="pb-20 md:pb-28">
      <div className={contenedor}>
        <div className="rounded-[28px] bg-rosa/70 p-6 md:p-10">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <TituloSeccion destello>IA aplicada</TituloSeccion>
              <Reveal><p className="mt-5 text-[16px] leading-relaxed text-tinta/85">{ia.intro}</p></Reveal>
              <Reveal delay={0.1}><p className="mt-4 font-serif text-[17px] italic leading-snug text-burdeo">{ia.nota}</p></Reveal>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
              {ia.usos.map((u, i) => (
                <Reveal as="li" key={u.titulo} delay={i * 0.05} y={16}>
                  <div className="group flex h-full gap-4 rounded-2xl bg-white/60 p-4 transition-colors duration-500 hover:bg-burdeo hover:text-crema">
                    <span className="font-serif text-xl italic text-burdeo transition-colors group-hover:text-crema/80">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="font-serif text-[17px] leading-snug">{u.titulo}</p>
                      <p className="mt-1 text-[14px] leading-snug text-gris transition-colors group-hover:text-crema/80">{u.texto}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Contacto (cierre) ---------- */
export function Contacto() {
  const c = sitio.contacto
  const reduce = useReducedMotion()
  const linkedinCorto = c.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
  const tarjetas = [
    { icono: 'correo', titulo: 'Email', texto: c.email, href: `mailto:${c.email}` },
    { icono: 'linkedin', titulo: 'LinkedIn', texto: linkedinCorto, href: c.linkedin, externo: true },
    { icono: 'documento', titulo: 'CV', texto: 'Descargar CV', href: c.cv, descarga: true },
  ]
  return (
    <section id="contacto" className="relative overflow-hidden pb-10 pt-16 md:pt-24">
      <div className={contenedor}>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative inline-block">
              <h2 className="font-serif text-[clamp(2.8rem,6vw,5rem)] leading-none">
                <SplitWords text={sitio.cierre.titulo} />
              </h2>
              <Destello className="absolute -right-10 -top-5 h-9 w-9 text-burdeo" />
            </div>
            <Reveal><p className="mt-6 max-w-md text-[17px] leading-relaxed text-tinta/85"><Enfasis texto={sitio.cierre.texto} /></p></Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-[1.45fr_1.25fr_0.8fr]">
              {tarjetas.map((t, i) => (
                <Reveal key={t.titulo} delay={i * 0.08} y={20}>
                  <a
                    href={t.href}
                    {...(t.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...(t.descarga ? { download: true } : {})}
                    className="tarjeta-suave group flex h-full flex-col items-center gap-1.5 rounded-2xl px-4 py-5 text-center transition-all duration-500 hover:-translate-y-1 hover:border-burdeo/30"
                  >
                    {t.icono === 'linkedin' ? (
                      <span className="font-serif text-[26px] font-bold leading-none text-burdeo">in</span>
                    ) : (
                      <Icono nombre={t.icono} size={28} className="text-burdeo transition-transform duration-500 group-hover:scale-110" />
                    )}
                    <span className="mt-1 font-serif text-[18px]">{t.titulo}</span>
                    <span className="text-[13.5px] text-gris [overflow-wrap:anywhere]">{t.texto}</span>
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2} className="mt-6 flex flex-wrap justify-center gap-3">
              <Magnetic>
                <a href={`mailto:${c.email}`} className="group inline-flex items-center gap-3 rounded-lg bg-burdeo px-8 py-3.5 font-serif text-[17px] text-crema transition-colors duration-500 hover:bg-burdeo-2">
                  Escribirme <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href={c.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-lg border border-burdeo/70 px-8 py-3.5 font-serif text-[17px] transition-colors duration-500 hover:bg-burdeo hover:text-crema">
                  <span className="font-bold">in</span> Ver LinkedIn
                </a>
              </Magnetic>
            </Reveal>
          </div>
        </div>

        <footer className="mt-20 flex flex-col gap-3 border-t border-burdeo/15 pt-6 text-[13px] text-gris md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {sitio.nombre}</p>
          <p className="font-serif italic">{sitio.disciplinas.join(' · ')}</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })} className="subrayado self-start md:self-auto">
            Volver arriba ↑
          </button>
        </footer>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-burdeo/10 blur-2xl" />
    </section>
  )
}
