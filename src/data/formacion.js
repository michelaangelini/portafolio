/* =====================================================================
   FORMACIÓN ACADÉMICA (aparece en "Sobre mí")
   ---------------------------------------------------------------------
   · tipo:      etiqueta discreta: 'Pregrado' | 'Diplomado' | 'Formación internacional' | 'Curso'
   · foto:      fotografía real de la institución (campus, fachada).
                Guárdala en public/formacion/ (ej: 'formacion/uandes-campus.webp').
                Vacío = se muestra el logo sobre su color institucional.
   · logo / fondoLogo: logo de la institución y color de fondo del recuadro.
   · programas: lo que estudiaste. etiqueta = 'Título profesional', 'Grado académico'...
   · distincion, detalle, fechas: solo si están confirmados ('' = no se muestra).
   · certificado: ruta a un PDF o imagen real (ej: 'formacion/titulo-periodista.pdf').
                Si está vacío, NO aparece el botón "Ver certificado".
   ===================================================================== */

export const formacion = [
  {
    institucion: 'Universidad de los Andes',
    pais: 'Chile',
    tipo: 'Pregrado',
    foto: '', // ← agrega aquí una foto del campus
    logo: 'formacion/uandes-logo.webp',
    fondoLogo: '#C8102C',
    programas: [
      { etiqueta: 'Título profesional', nombre: 'Periodista' },
      { etiqueta: 'Grado académico', nombre: 'Licenciada en Comunicación Social' },
    ],
    distincion: 'Titulada con distinción máxima',
    detalle: 'Minor en Gestión de Servicios',
    fechas: '2019 — 2023',
    certificado: '', // ← ej: 'formacion/titulo-periodista.pdf'
  },
  {
    institucion: 'Pontificia Universidad Católica de Chile',
    pais: 'Chile',
    tipo: 'Diplomado',
    foto: '',
    logo: 'formacion/puc-logo.webp',
    fondoLogo: '#FFFFFF',
    programas: [
      { etiqueta: 'Diplomado de especialización', nombre: 'Posicionamiento y Comunicación Integrada en Marketing' },
    ],
    distincion: '',
    detalle: 'En curso',
    fechas: 'Marzo — Noviembre 2026',
    certificado: '',
  },
  {
    institucion: 'Milestones English Academy',
    pais: 'Australia',
    tipo: 'Formación internacional',
    foto: '',
    logo: 'formacion/milestones-logo.webp',
    fondoLogo: '#FFFFFF',
    programas: [
      { etiqueta: 'Programa de inglés', nombre: 'IELTS Preparation Course' },
    ],
    distincion: '',
    detalle: 'Nivel Upper Intermediate',
    fechas: '2024',
    certificado: '',
  },
]

// Otros cursos y certificaciones (lista breve bajo las tarjetas)
export const cursos = [
  { nombre: 'Community Manager Estratégico', institucion: 'Academia Metrics', fecha: '2023', certificado: '' },
]
