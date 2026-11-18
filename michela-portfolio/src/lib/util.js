import { useEffect, useState } from 'react'

export const EASE = [0.22, 1, 0.36, 1]

export function useMediaQuery(query) {
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches
  const [match, setMatch] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}

/** true solo en escritorio con mouse (no táctil) */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')

/** Convierte 'Hola *mundo*' en partes [{t:'Hola'}, {t:'mundo', acento:true}] por palabra */
export function parseWords(text) {
  return text.split(' ').filter(Boolean).map((w) => {
    const m = w.match(/^\*(.+)\*([.,;:!?]*)$/)
    return m ? { t: m[1], acento: true, punt: m[2] } : { t: w }
  })
}

export const plain = (text) => text.replace(/\*/g, '')

/** Normaliza enlaces de YouTube / Vimeo / mp4 */
export function videoInfo(url = '') {
  if (!url) return null
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) return { tipo: 'youtube', id: yt[1], embed: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`, thumb: `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg` }
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vm) return { tipo: 'vimeo', id: vm[1], embed: `https://player.vimeo.com/video/${vm[1]}?autoplay=1&dnt=1` }
  if (/\.(mp4|webm)(\?|$)/i.test(url)) return { tipo: 'archivo', src: url }
  return null
}

export function scrollToId(id, reduce) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - (id === 'inicio' ? 0 : 20)
  window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' })
}
