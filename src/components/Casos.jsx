import { useEffect, useRef, useState } from 'react'
import { motion, animate, useInView, useReducedMotion } from 'motion/react'
import { EASE } from '../lib/util'
import { sitio } from '../data/sitio'
import { casos, proyectos } from '../lib/datos'
import { Reveal, SplitWords, Magnetic } from './motion'
import { Icono, Destello } from './Iconos'
import { Enfasis } from './Sections'
import { BadgeProvisional } from './Proyectos'
import Media from './Media'

const contenedor = 'mx-auto w-full max-w-[1280px] px-5 md:px-10'
const tiene = (x) => (Array.isArray(x) ? x.length > 0 : typeof x === 'string' ? x.trim() !== '' : !!x)
const num = (n) => (typeof n === 'number' ? n.toLocaleString('es-CL', { maximumFractionDigits: 1 }) : n)
const cumplimiento = (k) => (typeof k.meta === 'number' && k.meta > 0 && typeof k.resultado === 'number' ? (k.resultado / k.meta) * 100 : null)
const variacion = (k) => (typeof k.anterior === 'number' && k.anterior !== 0 && typeof k.resultado === 'number' ? ((k.resultado - k.anterior) / Math.abs(k.anterior)) * 100 : null)
const TIPOS = { actividad: 'Actividad', 'desempeño': 'Desempeño', desempeno: 'Desempeño', impacto: 'Impacto' }

/** Cifra que cuenta hasta el valor real al entrar en pantalla */
function Cifra({ valor, sufijo = '' }) {
  const ref = useRef(null)
  const visto = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [v, setV] = useState(reduce ? valor : 0)
  useEffect(() => {
    if (!visto || typeof valor !== 'number') return
    if (reduce) { setV(valor); return }
    const c = animate(0, valor, { duration: 1.4, ease: EASE, onUpdate: setV })
    return () => c.stop()
  }, [visto, valor, reduce])
  const decimales = Number.isInteger(valor) ? 0 : 1
  return <span ref={ref}>{typeof valor === 'number' ? Number(v).toLocaleString('es-CL', { minimumFractionDigits: decimales, maximumFractionDigits: decimales }) : valor}{sufijo}</span>
}

/** Encabezado de sección dentro de un caso */
function Seccion({ letra, titulo, children, className = '' }) {
  return (
    <section className={`border-t border-burdeo/15 pt-10 ${className}`}>
      <Reveal className="flex items-center gap-3">
        <span className="font-serif text-[15px] italic text-burdeo">{letra}</span>
        <h2 className="font-serif text-[1.6rem] leading-tight">{titulo}</h2>
        <span className="h-px w-10 bg-burdeo" aria-hidden="true" />
      </Reveal>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function Chips({ items }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((t) => <li key={t} className="rounded-full border border-burdeo/25 bg-white/50 px-3 py-1 text-[13px]">{t}</li>)}
    </ul>
  )
}

function ListaCheck({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t} className="flex gap-2.5 text-[15px] leading-snug">
          <span className="mt-[3px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-burdeo text-[9px] text-crema" aria-hidden="true">✓</span>
          {t}
        </li>
      ))}
    </ul>
  )
}

/* ---------- KPI ---------- */
function TarjetaKpi({ k, i }) {
  const ref = useRef(null)
  const visto = useInView(ref, { once: true, amount: 0.5 })
  const c = cumplimiento(k)
  const v = variacion(k)
  const esPct = k.unidad === '%'
  return (
    <Reveal delay={i * 0.06} y={18}>
      <div ref={ref} className="tarjeta-suave flex h-full flex-col rounded-2xl p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-rosa px-2.5 py-0.5 text-[11px] uppercase tracking-[0.12em] text-burdeo">{TIPOS[k.tipo] || 'Indicador'}</span>
          {k.periodo && <span className="text-[12px] text-gris">{k.periodo}</span>}
        </div>
        <p className="mt-3 text-[14px] leading-snug text-tinta/80">{k.nombre}</p>
        <p className="mt-1 font-serif text-[2.2rem] leading-none text-burdeo">
          <Cifra valor={k.resultado} sufijo={esPct ? '%' : ''} />
          {k.unidad && !esPct && <span className="ml-1.5 font-sans text-[14px] text-gris">{k.unidad}</span>}
        </p>
        {typeof k.meta === 'number' && (
          <div className="mt-4">
            <div className="flex justify-between text-[12.5px] text-gris">
              <span>Meta: {num(k.meta)}{esPct ? '%' : ''}</span>
              {c !== null && <span className="font-semibold text-tinta">{num(Math.round(c * 10) / 10)}% de cumplimiento</span>}
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-burdeo/10" role="progressbar" aria-valuenow={Math.round(c ?? 0)} aria-valuemin={0} aria-valuemax={100} aria-label={`Cumplimiento ${k.nombre}`}>
              <motion.div
                className="h-full rounded-full bg-burdeo"
                initial={{ width: 0 }}
                animate={{ width: visto ? `${Math.min(100, c ?? 0)}%` : 0 }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
              />
            </div>
          </div>
        )}
        {v !== null && (
          <p className={`mt-3 text-[13px] ${v >= 0 ? 'text-[#2f7a4f]' : 'text-burdeo'}`}>
            {v >= 0 ? '▲' : '▼'} {num(Math.abs(Math.round(v * 10) / 10))}% vs. período anterior ({num(k.anterior)}{esPct ? '%' : ''})
          </p>
        )}
        {k.nota && <p className="mt-2 text-[12.5px] italic text-gris">{k.nota}</p>}
      </div>
    </Reveal>
  )
}

/** Gráfico de barras simple y animado */
function Grafico({ h }) {
  const ref = useRef(null)
  const visto = useInView(ref, { once: true, amount: 0.4 })
  const max = Math.max(...h.puntos.map((p) => p.valor), 1)
  return (
    <Reveal className="tarjeta-suave mt-5 rounded-2xl p-5">
      <p className="font-serif text-[17px]">{h.titulo}</p>
      <div ref={ref} className="mt-4 flex h-44 items-end gap-2 sm:gap-3" role="img" aria-label={`${h.titulo}: ${h.puntos.map((p) => `${p.periodo} ${p.valor}`).join(', ')}`}>
        {h.puntos.map((p, i) => (
          <div key={p.periodo} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <span className="text-[11.5px] text-gris">{num(p.valor)}</span>
            <motion.div
              className="w-full max-w-[44px] rounded-t-md bg-burdeo"
              style={{ opacity: 0.55 + (0.45 * (i + 1)) / h.puntos.length }}
              initial={{ height: 0 }}
              animate={{ height: visto ? `${(p.valor / max) * 78}%` : 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.06 }}
            />
            <span className="text-[11.5px] text-tinta/80">{p.periodo}</span>
          </div>
        ))}
      </div>
      {h.unidad && <p className="mt-2 text-[12px] text-gris">Unidad: {h.unidad}</p>}
    </Reveal>
  )
}

/* ---------- Tarjeta de caso (listado) ---------- */
function TarjetaCaso({ c, n, onAbrir }) {
  const invertida = n % 2 === 1
  const destacados = [
    ...(c.resultadoPrincipal && typeof c.resultadoPrincipal.valor === 'number' ? [{ nombre: c.resultadoPrincipal.titulo, resultado: c.resultadoPrincipal.valor, prefijo: c.resultadoPrincipal.prefijo, sufijo: c.resultadoPrincipal.sufijo }] : []),
    ...(c.destacados || []).filter((d) => typeof d.valor === 'number').map((d) => ({ nombre: d.titulo, resultado: d.valor, prefijo: d.prefijo, sufijo: d.sufijo })),
    ...(c.kpis || []).filter((k) => typeof k.resultado === 'number').map((k) => ({ ...k, sufijo: k.unidad === '%' ? '%' : '' })),
  ].slice(0, 2)
  return (
    <Reveal y={36}>
      <article className="tarjeta-suave group grid overflow-hidden rounded-[26px] md:grid-cols-12">
        <button
          onClick={() => onAbrir(c.id)}
          data-cursor="Explorar"
          aria-label={`Explorar caso: ${c.titulo}`}
          className={`relative overflow-hidden md:col-span-5 ${invertida ? 'md:order-2' : ''}`}
        >
          <Media src={c.imagen} alt="" className="aspect-[16/10] h-full w-full md:aspect-auto md:min-h-[300px]" imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-editorial)] group-hover:scale-[1.06]" />
          <span className="absolute left-4 top-4 font-serif text-[2.4rem] italic leading-none text-burdeo/80">{String(n + 1).padStart(2, '0')}</span>
        </button>
        <div className={`flex flex-col justify-center p-6 md:col-span-7 md:p-9 ${invertida ? 'md:order-1' : ''}`}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] uppercase tracking-[0.14em] text-gris">
            <span>{c.categoria}</span><span aria-hidden="true">·</span><span>{c.anio}</span>
            {c.provisional && <BadgeProvisional />}
          </div>
          <h3 className="mt-3 font-serif text-[clamp(1.45rem,2.2vw,1.9rem)] leading-tight transition-colors duration-500 group-hover:text-burdeo">{c.titulo}</h3>
          <p className="mt-1 font-serif italic text-burdeo">{c.cliente}</p>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-tinta/80">{c.resumen}</p>
          {destacados.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-6">
              {destacados.map((k) => (
                <div key={k.nombre}>
                  <p className="font-serif text-[1.7rem] leading-none text-burdeo">{k.prefijo}<Cifra valor={k.resultado} sufijo={k.sufijo || ''} /></p>
                  <p className="mt-1 text-[12.5px] text-gris">{k.nombre}</p>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => onAbrir(c.id)} className="mt-6 inline-flex items-center gap-2 self-start rounded-lg border border-burdeo/60 px-5 py-2.5 font-serif text-[15.5px] text-tinta transition-colors duration-500 hover:bg-burdeo hover:text-crema">
            Explorar caso <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </article>
    </Reveal>
  )
}

/* ---------- Página: listado de casos ---------- */
export function CasosPagina({ onAbrir }) {
  return (
    <main className="pt-28 md:pt-32">
      <div className={contenedor}>
        <div className="relative max-w-3xl">
          <p className="text-[12px] uppercase tracking-[0.18em] text-gris">Casos de estudio</p>
          <h1 className="mt-3 font-serif text-[clamp(2.4rem,4.6vw,3.9rem)] leading-[1.04]">
            <SplitWords text={sitio.casos.titulo} animateOnMount delay={0.45} />
          </h1>
          <Destello className="absolute -top-2 right-0 hidden h-9 w-9 text-burdeo md:block" />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease: EASE }}
            className="mt-5 max-w-2xl text-[17px] leading-relaxed text-tinta/80"
          >
            {sitio.casos.subtitulo}
          </motion.p>
          <motion.div className="mt-6 h-px w-14 origin-left bg-burdeo" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.1, duration: 0.9, ease: EASE }} />
        </div>

        <div className="mt-12 space-y-8 md:mt-14 md:space-y-10">
          {casos.map((c, n) => <TarjetaCaso key={c.id} c={c} n={n} onAbrir={onAbrir} />)}
        </div>
      </div>
    </main>
  )
}

/* ---------- Página: detalle de un caso ---------- */
export function CasoPagina({ id, onAbrir, onVolver, onProyecto }) {
  const reduce = useReducedMotion()
  const idx = casos.findIndex((c) => c.id === id)
  const c = casos[idx]
  const sig = casos[(idx + 1) % casos.length]
  const ant = casos[(idx - 1 + casos.length) % casos.length]
  useEffect(() => { document.title = `${c.titulo} · Casos de estudio · ${sitio.nombre}` }, [c.titulo])

  const ctx = c.contexto || {}
  const obj = c.objetivos || {}
  const est = c.estrategia || {}
  const val = c.valor || {}
  const relacionados = (c.proyectos || []).map((s) => proyectos.find((p) => p.slug === s)).filter(Boolean)
  const kpis = (c.kpis || []).filter((k) => typeof k.resultado === 'number')
  // Ordenados: actividad → desempeño → impacto (cada tarjeta indica su tipo)
  const orden = { actividad: 0, 'desempeño': 1, desempeno: 1, impacto: 2 }
  const ordenados = [...kpis].sort((a, b) => (orden[a.tipo] ?? 3) - (orden[b.tipo] ?? 3))

  const bloquesEstrategia = [
    ['usuario', 'Públicos', est.publicos],
    ['grafico', 'Variables de segmentación', est.variables],
    ['megafono', 'Canales', est.canales],
    ['chat', 'Temas de campaña', est.temas],
    ['chat', 'Mensajes principales', est.mensajes],
  ].filter(([, , v]) => tiene(v))
  const hayKpis = kpis.length > 0 || !!c.resultadoPrincipal || tiene(c.destacados) || !!c.resultadoDestacado || tiene(c.otrosIndicadores) || c.historico?.puntos?.length > 0

  const tarjetasContexto = [
    { t: 'Situación inicial', v: ctx.situacion, i: 'calendario' },
    { t: 'Problema o necesidad', v: ctx.problema, i: 'etiqueta' },
    { t: 'Oportunidad de mejora', v: ctx.oportunidad, i: 'destellos' },
    { t: 'Público involucrado', v: ctx.publico, i: 'usuario' },
  ].filter((x) => tiene(x.v))

  let letra = 0
  const L = () => String.fromCharCode(65 + letra++) + '.'

  return (
    <main className="pt-20 md:pt-24">
      <div className={contenedor}>
        <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} aria-label="Ruta" className="text-[14px]">
          <button onClick={onVolver} className="font-serif italic text-burdeo hover:underline">Casos de estudio</button>
          <span className="mx-2.5 text-gris" aria-hidden="true">›</span>
          <span className="text-tinta/80">{c.titulo}</span>
        </motion.nav>

        {/* A. Presentación */}
        <div className="mt-5 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            {c.provisional && <div className="mb-3"><BadgeProvisional /></div>}
            <p className="text-[12px] uppercase tracking-[0.16em] text-gris">{L()} Presentación del caso</p>
            <h1 className="mt-2 font-serif text-[clamp(1.7rem,2.6vw,2.3rem)] leading-[1.12]">
              <SplitWords text={c.titulo} animateOnMount delay={0.45} stagger={0.04} />
            </h1>
            <motion.div initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.9, ease: EASE }}>
              <p className="mt-2 font-serif text-[17px] italic text-burdeo">{c.cliente}</p>
              <dl className="mt-4 grid grid-cols-1 gap-y-2.5 border-y border-burdeo/10 py-3 sm:grid-cols-3 sm:gap-x-3">
                {[['calendario', 'Período', c.anio], ['etiqueta', 'Categoría', c.categoria], ['capas', 'Área', c.area]].filter(([, , v]) => tiene(v)).map(([ic, k, v], n) => (
                  <div key={k} className={`flex items-start gap-2 ${n > 0 ? 'sm:border-l sm:border-burdeo/10 sm:pl-3' : ''}`}>
                    <Icono nombre={ic} size={16} className="mt-0.5 shrink-0 text-burdeo" />
                    <div><dt className="text-[11px] uppercase tracking-[0.12em] text-gris">{k}</dt><dd className="text-[13.5px] leading-snug">{v}</dd></div>
                  </div>
                ))}
              </dl>
              {tiene(c.resumen) && <p className="mt-4 text-[15.5px] leading-relaxed text-tinta/85">{c.resumen}</p>}
              {tiene(c.resumenDetalle) && <p className="mt-2.5 text-[14.5px] leading-relaxed text-tinta/75">{c.resumenDetalle}</p>}
            </motion.div>
          </div>
          <motion.div
            className="relative min-w-0 lg:col-span-5"
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1, ease: EASE }}
          >
            <div aria-hidden="true" className="absolute -top-3 left-[35%] h-1/4 w-2/5 rotate-3 rounded-[20px] bg-burdeo" />
            <Destello className="absolute -top-7 right-4 h-7 w-7 text-burdeo" />
            <Media src={c.imagen} alt="" className="relative aspect-[4/3] w-full rounded-[22px] shadow-[0_26px_50px_-30px_rgba(60,20,30,0.6)]" priority />
          </motion.div>
        </div>

        <div className="mt-12 space-y-12">
          {/* B. Contexto y desafío */}
          {(tarjetasContexto.length > 0 || tiene(ctx.desafios)) && (
            <Seccion letra={L()} titulo="Contexto y desafío">
              {tarjetasContexto.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {tarjetasContexto.map((x, i) => (
                    <Reveal key={x.t} delay={i * 0.05} y={16}>
                      <div className="tarjeta-suave h-full rounded-2xl p-5">
                        <p className="flex items-center gap-2 font-serif text-[17px]"><Icono nombre={x.i} size={18} className="text-burdeo" />{x.t}</p>
                        <p className="mt-2 text-[15px] leading-relaxed text-tinta/85">{x.v}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
              {tiene(ctx.desafios) && (
                <Reveal className="mt-5 rounded-2xl bg-rosa p-5">
                  <p className="font-serif text-[17px] italic text-burdeo">{ctx.desafios.length === 1 ? 'El desafío' : 'Principales desafíos'}</p>
                  <div className="mt-3"><ListaCheck items={ctx.desafios} /></div>
                </Reveal>
              )}
            </Seccion>
          )}

          {/* C. Objetivos */}
          {(tiene(obj.estrategicos) || tiene(obj.metas)) && (
            <Seccion letra={L()} titulo="Objetivos">
              <div className="grid gap-6 md:grid-cols-2">
                {tiene(obj.estrategicos) && (
                  <Reveal>
                    <p className="text-[12px] uppercase tracking-[0.14em] text-gris">Objetivos estratégicos</p>
                    <div className="mt-3"><ListaCheck items={obj.estrategicos} /></div>
                  </Reveal>
                )}
                {tiene(obj.metas) && (
                  <Reveal delay={0.08}>
                    <p className="text-[12px] uppercase tracking-[0.14em] text-gris">Metas cuantificables</p>
                    <ul className="mt-3 space-y-2">
                      {obj.metas.map((m) => (
                        <li key={m} className="flex items-center gap-3 rounded-xl border border-burdeo/15 bg-white/50 px-4 py-2.5 text-[15px]">
                          <Icono nombre="grafico" size={18} className="shrink-0 text-burdeo" />{m}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}
              </div>
            </Seccion>
          )}

          {/* D. Estrategia */}
          {(tiene(est.enfoque) || tiene(est.etapas) || bloquesEstrategia.length > 0) && (
            <Seccion letra={L()} titulo="Estrategia">
              {tiene(est.enfoque) && (
                <Reveal className="rounded-2xl bg-burdeo px-6 py-5 text-crema md:px-8">
                  <p className="text-[11.5px] uppercase tracking-[0.16em] text-crema/70">Enfoque estratégico</p>
                  <p className="mt-2 font-serif text-[clamp(1.1rem,1.6vw,1.35rem)] italic leading-snug">{est.enfoque}</p>
                  {tiene(est.flujo) && (
                    <ol className="mt-5 flex flex-wrap items-center gap-2" aria-label="Proceso">
                      {est.flujo.map((paso, i) => (
                        <li key={paso} className="flex items-center gap-2">
                          <motion.span
                            className="rounded-full bg-crema px-4 py-1.5 font-serif text-[15px] text-burdeo"
                            initial={{ opacity: 0, scale: 0.85 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.15, duration: 0.5, ease: EASE }}
                          >
                            {paso}
                          </motion.span>
                          {i < est.flujo.length - 1 && <span aria-hidden="true" className="text-crema/70">→</span>}
                        </li>
                      ))}
                    </ol>
                  )}
                </Reveal>
              )}

              {bloquesEstrategia.length > 0 && (
                <div className={`mt-5 grid gap-3 ${bloquesEstrategia.length > 1 ? 'md:grid-cols-2' : ''} ${bloquesEstrategia.length > 2 ? 'lg:grid-cols-3' : ''}`}>
                  {bloquesEstrategia.map(([ic, t, v], i) => (
                    <Reveal key={t} delay={i * 0.06} y={16}>
                      <div className="tarjeta-suave h-full rounded-2xl p-5">
                        <p className="mb-3 flex items-center gap-2 font-serif text-[17px]"><Icono nombre={ic} size={18} className="text-burdeo" />{t}</p>
                        <Chips items={v} />
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}

              {tiene(est.etapas) && (
                <div className="mt-8">
                  <p className="text-[12px] uppercase tracking-[0.14em] text-gris">{est.etapasTitulo || 'Acciones implementadas'}</p>
                  <ol className="relative mt-4 grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                    <span aria-hidden="true" className="absolute left-[18px] right-6 top-[18px] hidden h-px bg-burdeo/25 md:block" />
                    {est.etapas.map((e, i) => (
                      <Reveal as="li" key={e.titulo} delay={i * 0.08} y={16} className="relative">
                        <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full bg-burdeo font-serif text-[15px] italic text-crema">{String(i + 1).padStart(2, '0')}</span>
                        <p className="mt-3 font-serif text-[17px] leading-tight">{e.titulo}</p>
                        {e.texto && <p className="mt-1 text-[14px] leading-snug text-tinta/80">{e.texto}</p>}
                      </Reveal>
                    ))}
                  </ol>
                </div>
              )}

              {(tiene(est.decisiones) || tiene(est.criterios)) && (
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {tiene(est.decisiones) && <Reveal><p className="mb-3 font-serif text-[17px]">Decisiones comunicacionales</p><ListaCheck items={est.decisiones} /></Reveal>}
                  {tiene(est.criterios) && <Reveal delay={0.08}><p className="mb-3 font-serif text-[17px]">Criterios de optimización</p><ListaCheck items={est.criterios} /></Reveal>}
                </div>
              )}
            </Seccion>
          )}

          {/* E. Mi aporte */}
          {tiene(c.aporte) && (
            <Seccion letra={L()} titulo="Mi aporte">
              {tiene(c.aporteIntro) && <Reveal><p className="-mt-1 mb-2 max-w-3xl text-[15.5px] leading-relaxed text-tinta/85">{c.aporteIntro}</p></Reveal>}
              <Reveal><p className="mb-5 text-[13.5px] italic text-gris">Mi contribución personal, diferenciada de los resultados del equipo.</p></Reveal>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {c.aporte.map((a, i) => (
                  <Reveal key={a.titulo + i} delay={(i % 3) * 0.06} y={16}>
                    <div className="group flex h-full gap-3 rounded-2xl bg-white/55 p-4 ring-1 ring-burdeo/10 transition-colors duration-500 hover:bg-burdeo hover:text-crema">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-rosa text-burdeo transition-colors group-hover:bg-crema">
                        <Icono nombre={a.icono || 'lapiz'} size={19} />
                      </span>
                      <div>
                        <p className="font-serif text-[16.5px] leading-snug">{a.titulo}</p>
                        {a.texto && <p className="mt-1 text-[14px] leading-snug text-tinta/75 transition-colors group-hover:text-crema/85">{a.texto}</p>}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Seccion>
          )}

          {/* F. KPIs */}
          {hayKpis && (
            <Seccion letra={L()} titulo={c.kpiTitulo || 'KPIs y cumplimiento de metas'}>
              {tiene(c.kpiIntro) && <Reveal><p className="-mt-1 mb-6 max-w-3xl text-[15.5px] leading-relaxed text-tinta/85">{c.kpiIntro}</p></Reveal>}

              {c.resultadoPrincipal ? (
                <div className="grid gap-4 lg:grid-cols-12">
                  <Reveal className="lg:col-span-5" y={20}>
                    <div className="flex h-full flex-col justify-between rounded-[22px] bg-burdeo p-7 text-crema">
                      <div>
                        <p className="text-[11.5px] uppercase tracking-[0.16em] text-crema/70">Resultado principal</p>
                        <p className="mt-3 font-serif text-[clamp(3.4rem,6vw,4.8rem)] leading-none">
                          {c.resultadoPrincipal.prefijo}<Cifra valor={c.resultadoPrincipal.valor} sufijo={c.resultadoPrincipal.sufijo || ''} />
                        </p>
                        <p className="mt-3 font-serif text-[1.3rem] leading-tight">{c.resultadoPrincipal.titulo}</p>
                        {c.resultadoPrincipal.texto && <p className="mt-2 text-[14.5px] leading-relaxed text-crema/85">{c.resultadoPrincipal.texto}</p>}
                      </div>
                      {c.resultadoPrincipal.nota && <p className="mt-5 border-t border-crema/20 pt-3 text-[12.5px] italic leading-snug text-crema/70">{c.resultadoPrincipal.nota}</p>}
                    </div>
                  </Reveal>
                  {tiene(c.destacados) && (
                    <ul className="grid gap-3 lg:col-span-7">
                      {c.destacados.map((d, i) => (
                        <Reveal as="li" key={d.titulo} delay={0.1 + i * 0.08} y={16}>
                          <div className="tarjeta-suave flex h-full items-center gap-5 rounded-2xl px-5 py-4">
                            <p className="w-[6.5rem] shrink-0 font-serif text-[2.1rem] leading-none text-burdeo">
                              {typeof d.valor === 'number' ? <>{d.prefijo}<Cifra valor={d.valor} sufijo={d.sufijo || ''} /></> : d.cifra}
                            </p>
                            <div className="border-l border-burdeo/15 pl-5">
                              <p className="font-serif text-[17px] leading-tight">{d.titulo}</p>
                              {d.texto && <p className="mt-1 text-[13.5px] leading-snug text-tinta/75">{d.texto}</p>}
                            </div>
                          </div>
                        </Reveal>
                      ))}
                    </ul>
                  )}
                </div>
              ) : tiene(c.destacados) && (
                <>
                  <p className="mb-3 text-[12px] uppercase tracking-[0.14em] text-gris">Impacto y medición de campañas</p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {c.destacados.map((d, i) => (
                      <Reveal key={d.titulo} delay={i * 0.08} y={18}>
                        <div className={`flex h-full flex-col rounded-2xl p-6 ${i === 0 && typeof d.valor === 'number' ? 'bg-burdeo text-crema' : 'tarjeta-suave'}`}>
                          <p className={`font-serif text-[clamp(2.4rem,4vw,3.2rem)] leading-none ${i === 0 && typeof d.valor === 'number' ? 'text-crema' : 'text-burdeo'}`}>
                            {typeof d.valor === 'number' ? <>{d.prefijo}<Cifra valor={d.valor} sufijo={d.sufijo || ''} /></> : d.cifra}
                          </p>
                          <p className="mt-3 font-serif text-[18px] leading-tight">{d.titulo}</p>
                          {d.texto && <p className={`mt-1 text-[14px] leading-snug ${i === 0 && typeof d.valor === 'number' ? 'text-crema/80' : 'text-tinta/70'}`}>{d.texto}</p>}
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </>
              )}

              {c.resultadoDestacado && (
                <Reveal className="mt-5 rounded-2xl bg-rosa p-6 md:p-7">
                  <p className="font-serif text-[18px] italic text-burdeo">{c.resultadoDestacado.titulo}</p>
                  <p className="mt-2 max-w-3xl text-[15.5px] leading-relaxed text-tinta/85">{c.resultadoDestacado.texto}</p>
                  {c.resultadoDestacado.lectura && <p className="mt-2 max-w-3xl text-[14.5px] leading-relaxed text-tinta/70">{c.resultadoDestacado.lectura}</p>}
                </Reveal>
              )}

              {ordenados.length > 0 && (
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {ordenados.map((k, i) => <TarjetaKpi key={k.nombre + i} k={k} i={i} />)}
                </div>
              )}
              {c.historico?.puntos?.length > 0 && <Grafico h={c.historico} />}

              {tiene(c.otrosIndicadores) && (
                <Reveal className="mt-6">
                  <p className="mb-3 text-[12px] uppercase tracking-[0.14em] text-gris">Otros indicadores gestionados</p>
                  <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {c.otrosIndicadores.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 rounded-xl border border-burdeo/15 bg-white/50 px-4 py-2.5 text-[14px] leading-snug">
                        <Icono nombre="grafico" size={16} className="mt-0.5 shrink-0 text-burdeo" />{t}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
              {tiene(c.kpiNota) && <p className="mt-4 text-[12.5px] italic text-gris">{c.kpiNota}</p>}
            </Seccion>
          )}

          {/* G. Valor generado */}
          {(tiene(val.parrafos) || tiene(val.cierre) || tiene(val.demostrado) || tiene(val.esperado) || tiene(c.aprendizajes)) && (
            <Seccion letra={L()} titulo="Valor generado">
              {tiene(val.parrafos) && (
                <div className="grid gap-4 md:grid-cols-3">
                  {val.parrafos.map((t, i) => (
                    <Reveal key={i} delay={i * 0.07} y={16}>
                      <p className="h-full border-l-2 border-burdeo/30 pl-4 text-[15px] leading-relaxed text-tinta/85">{t}</p>
                    </Reveal>
                  ))}
                </div>
              )}
              {tiene(val.cierre) && (
                <Reveal className="mt-8 rounded-2xl bg-burdeo px-6 py-6 text-center md:px-12">
                  <p className="mx-auto max-w-3xl font-serif text-[clamp(1.15rem,1.9vw,1.5rem)] italic leading-snug text-crema">“{val.cierre}”</p>
                </Reveal>
              )}
              <div className={`grid gap-4 md:grid-cols-2 ${tiene(val.demostrado) || tiene(val.esperado) ? 'mt-5' : ''}`}>
                {tiene(val.demostrado) && (
                  <Reveal className="rounded-2xl bg-burdeo p-6 text-crema">
                    <p className="font-serif text-[18px]">Beneficios demostrados</p>
                    <ul className="mt-3 space-y-2">{val.demostrado.map((t) => <li key={t} className="flex gap-2.5 text-[15px] leading-snug"><span aria-hidden="true">✓</span>{t}</li>)}</ul>
                  </Reveal>
                )}
                {tiene(val.esperado) && (
                  <Reveal delay={0.08} className="rounded-2xl border border-dashed border-burdeo/40 p-6">
                    <p className="font-serif text-[18px]">Beneficios esperados <span className="text-[13px] italic text-gris">(aún no medidos)</span></p>
                    <ul className="mt-3 space-y-2">{val.esperado.map((t) => <li key={t} className="flex gap-2.5 text-[15px] leading-snug"><span aria-hidden="true" className="text-burdeo">○</span>{t}</li>)}</ul>
                  </Reveal>
                )}
              </div>
              {tiene(c.aprendizajes) && (
                <Reveal className="mt-5 rounded-2xl bg-rosa p-6">
                  <p className="font-serif text-[18px] italic text-burdeo">Aprendizajes</p>
                  <div className="mt-3"><ListaCheck items={c.aprendizajes} /></div>
                </Reveal>
              )}
            </Seccion>
          )}

          {/* H. Evidencia */}
          {relacionados.length > 0 && (
            <Seccion letra={L()} titulo="Evidencia y trabajos relacionados">
              <div className={`grid gap-4 sm:grid-cols-2 ${relacionados.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
                {relacionados.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.06} y={16}>
                    <button onClick={() => onProyecto(p.slug)} className="tarjeta-suave group block w-full overflow-hidden rounded-2xl text-left" data-cursor="Ver">
                      <Media src={p.portada} alt={p.titulo} ajuste={p.ajustePortada} fondo={p.fondoPortada} tono={p.tono} className="aspect-[16/10] w-full" imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-editorial)] group-hover:scale-105" />
                      <div className="flex items-center justify-between gap-3 px-4 py-3">
                        <span className="font-serif text-[15.5px] leading-snug">{p.titulo}</span>
                        <span className="shrink-0 font-serif text-[13.5px] italic text-burdeo">Ver piezas →</span>
                      </div>
                    </button>
                  </Reveal>
                ))}
              </div>
            </Seccion>
          )}
        </div>

        {/* Navegación entre casos */}
        {casos.length > 1 && (
          <nav className="mt-16 border-t border-burdeo/15 pt-8" aria-label="Más casos">
            <div className="grid gap-8 md:grid-cols-2">
              <button onClick={() => onAbrir(ant.id)} className="group text-left" data-cursor="Anterior">
                <p className="text-[13px] uppercase tracking-[0.18em] text-gris">← Caso anterior</p>
                <p className="mt-2 font-serif text-xl leading-tight transition-colors duration-500 group-hover:text-burdeo">{ant.titulo}</p>
              </button>
              <button onClick={() => onAbrir(sig.id)} className="group text-left md:text-right" data-cursor="Siguiente">
                <p className="text-[13px] uppercase tracking-[0.18em] text-gris">Caso siguiente →</p>
                <p className="mt-2 font-serif text-xl leading-tight transition-colors duration-500 group-hover:text-burdeo">{sig.titulo}</p>
              </button>
            </div>
          </nav>
        )}
        <div className="mt-10 flex justify-center pb-8">
          <Magnetic>
            <button onClick={onVolver} className="group inline-flex items-center gap-3 rounded-lg border border-burdeo/70 px-7 py-3 font-serif text-[16px] transition-colors duration-500 hover:bg-burdeo hover:text-crema">
              <span aria-hidden="true" className="transition-transform duration-500 group-hover:-translate-x-1">←</span> Volver a casos de estudio
            </button>
          </Magnetic>
        </div>
      </div>
    </main>
  )
}

/* ---------- Invitación en el inicio ---------- */
export function InvitacionCasos({ onVer }) {
  if (casos.length === 0) return null
  return (
    <section className="pb-6 md:pb-10">
      <div className={contenedor}>
        <Reveal>
          <div className="relative flex flex-col items-start gap-5 overflow-hidden rounded-[26px] bg-rosa px-6 py-7 md:flex-row md:items-center md:justify-between md:px-10">
            <div>
              <h2 className="font-serif text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight"><Enfasis texto={sitio.casos.invitacionTitulo} /></h2>
              <p className="mt-2 max-w-xl text-[15.5px] leading-relaxed text-tinta/80">{sitio.casos.invitacionTexto}</p>
            </div>
            <Magnetic>
              <button onClick={onVer} className="group inline-flex shrink-0 items-center gap-3 rounded-lg bg-burdeo px-6 py-3 font-serif text-[16px] text-crema transition-colors duration-500 hover:bg-burdeo-2">
                Ver casos de estudio <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </button>
            </Magnetic>
            <Destello className="absolute right-4 top-3 h-7 w-7 text-burdeo/60" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
