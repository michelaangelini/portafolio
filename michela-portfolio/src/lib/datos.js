import { proyectos as todos, CATEGORIAS as TODAS } from '../data/proyectos'
import { sitio } from '../data/sitio'

// Si sitio.soloProyectosListos es true, se muestran solo los proyectos con provisional: false
export const proyectos = sitio.soloProyectosListos ? todos.filter((p) => !p.provisional) : todos

// Solo las categorías que tienen al menos un proyecto visible
export const CATEGORIAS = TODAS.filter((c) => proyectos.some((p) => p.categorias.includes(c)))
