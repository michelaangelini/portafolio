/* =====================================================================
   TEXTOS Y ENLACES DEL SITIO
   ---------------------------------------------------------------------
   Aquí editas todo lo que no es un proyecto: presentación, sobre mí,
   experiencia, IA y contacto.

   Reglas simples:
   · Cambia solo lo que está entre comillas '...'.
   · No borres las comas al final de cada línea.
   · En los títulos, una palabra entre *asteriscos* se muestra en
     cursiva burdeo (acento editorial). Ej: 'Hola *mundo*'.
   · Las rutas de archivos van SIN barra inicial: 'cv/mi-cv.pdf'
   ===================================================================== */

export const sitio = {
  nombre: 'Michela Angelini',
  nombreLinea1: 'Michela',
  nombreLinea2: 'Angelini',
  disciplinas: ['Marketing', 'Comunicaciones', 'Contenido Creativo'],
  presentacion:
    'Transformo ideas en contenidos, campañas y experiencias de comunicación que conectan marcas con personas.',
  estado: 'Abierta a nuevas oportunidades',

  // Muestra u oculta las etiquetas "Contenido provisional" en todo el sitio.
  // Cuando hayas cargado tus proyectos reales, cámbialo a false.
  mostrarAvisosProvisionales: true,

  /* ---------- CONTACTO ---------- */
  contacto: {
    email: 'tu-correo@ejemplo.com', // ← tu correo real
    linkedin: 'https://www.linkedin.com/in/tu-perfil', // ← tu URL de LinkedIn
    cv: 'cv/Michela-Angelini-CV.pdf', // ← reemplaza el archivo en public/cv/
  },

  /* ---------- CINTA EN MOVIMIENTO (bajo la portada) ---------- */
  cinta: [
    'Marketing digital',
    'Comunicación corporativa',
    'Contenido creativo',
    'Producción audiovisual',
    'Copywriting',
    'Campañas',
    'Branding',
  ],

  /* ---------- SOBRE MÍ ---------- */
  sobreMi: {
    titulo: 'Periodista de formación, *creativa* por oficio y *estratégica* por convicción.',
    parrafos: [
      'Soy periodista y licenciada en Comunicación Social de la Universidad de los Andes, titulada con distinción máxima. Mi trabajo cruza marketing digital, comunicación corporativa, creación de contenido, producción audiovisual y coordinación de campañas creativas.',
      'Pasé por agencias de comunicaciones como Perceptiva y hoy trabajo en marketing digital B2B en Movistar Empresas. Ahí aprendí que una buena idea necesita también planificación, criterio y un mensaje que se entienda a la primera.',
    ],
    // Ruta a tu foto (ej: 'img/michela.jpg' dentro de /public). Vacío = imagen provisional.
    foto: '',
    formacion: {
      titulo: 'Periodismo y Licenciatura en Comunicación Social',
      institucion: 'Universidad de los Andes',
      distincion: 'Distinción máxima',
    },
    ejes: [
      { titulo: 'Periodismo y comunicación', texto: 'Formación para investigar, ordenar ideas y contar historias con claridad.' },
      { titulo: 'Agencia y empresa', texto: 'Experiencia en agencia de comunicaciones y en marketing digital corporativo.' },
      { titulo: 'Marketing digital y corporativo', texto: 'Campañas, canales digitales y comunicación para públicos B2B y corporativos.' },
      { titulo: 'Contenido gráfico y audiovisual', texto: 'Creación de piezas, registro audiovisual y edición de videos.' },
      { titulo: 'Campañas creativas', texto: 'Conceptualización, briefs y coordinación de campañas de principio a fin.' },
      { titulo: 'Redacción y copywriting', texto: 'Mensajes adaptados a cada canal, formato y audiencia.' },
    ],
    // Agrega o quita herramientas libremente.
    herramientas: ['Canva', 'CapCut', 'Figma', 'ChatGPT', 'Herramientas de IA generativa'],
  },

  /* ---------- FRASE DESTACADA (se ilumina al hacer scroll) ---------- */
  frase:
    'Una buena campaña empieza con una *idea*, se sostiene con *estrategia* y se recuerda por cómo hace *sentir* a las personas.',

  /* ---------- EXPERIENCIA ----------
     "proyectos" enlaza a los slugs definidos en proyectos.js            */
  experiencia: [
    {
      empresa: 'Movistar Empresas',
      tipo: 'Marketing digital B2B',
      cargo: '', // ← ej: 'Analista de Canales Digitales B2B' (vacío = no se muestra)
      periodo: 'Actualidad',
      descripcion:
        'Trabajo donde se cruzan creatividad, planificación y estrategia: desde la idea y el brief hasta el mensaje final que llega a clientes empresa por canales digitales.',
      puntos: [
        'Campañas de marketing digital B2B',
        'Campañas para WhatsApp y email marketing',
        'Banners para sitios web',
        'Comunicaciones para canales digitales',
        'Conceptualización de piezas gráficas',
        'Elaboración de briefs creativos',
        'Redacción y adaptación de mensajes',
        'Coordinación y revisión de diseños',
        'Guías y material informativo',
      ],
      proyectos: ['campanas-whatsapp-email', 'banners-sitio-web', 'guias-canales-digitales'],
    },
    {
      empresa: 'Perceptiva',
      tipo: 'Agencia de comunicaciones',
      cargo: '', // ← tu cargo en Perceptiva
      periodo: '', // ← ej: '2022 — 2023'
      descripcion:
        'Experiencia en agencia: cobertura en terreno, registro audiovisual y contenido para clientes corporativos y gremiales.',
      puntos: [
        'Grabación y cobertura de puntos de prensa',
        'Registro audiovisual de eventos',
        'Videos resumen de actividades corporativas',
        'Creación de contenido para redes sociales',
        'Proyectos de comunicación para la Cámara de Centros Comerciales',
        'Contenido corporativo de LinkedIn para ACHILA',
      ],
      proyectos: ['cobertura-puntos-prensa', 'registro-eventos', 'camara-centros-comerciales', 'achila-linkedin'],
    },
  ],

  /* ---------- INTELIGENCIA ARTIFICIAL ---------- */
  ia: {
    titulo: 'La IA como *aliada* del proceso creativo.',
    intro:
      'Integro herramientas de inteligencia artificial para pensar más rápido, explorar más caminos y dedicar más tiempo a lo que importa: la idea y el criterio.',
    usos: [
      { titulo: 'Ideación de campañas', texto: 'Explorar territorios, ángulos y enfoques antes de elegir una dirección.' },
      { titulo: 'Conceptos creativos', texto: 'Desarrollar y tensionar conceptos, claims y variantes de mensaje.' },
      { titulo: 'Generación y adaptación de contenidos', texto: 'Adaptar textos a distintos canales, formatos y audiencias.' },
      { titulo: 'Recursos visuales', texto: 'Apoyo en referencias, bocetos y recursos para piezas gráficas.' },
      { titulo: 'Flujos de trabajo', texto: 'Ordenar, documentar y agilizar procesos repetitivos del día a día.' },
    ],
    nota: 'La herramienta acelera; la decisión final, el tono y la revisión siempre son humanos.',
  },

  /* ---------- CIERRE ---------- */
  cierre: {
    titulo: 'Hablemos.',
    texto:
      '¿Tienes un proyecto, un equipo o una marca que necesita comunicar mejor? Me encantaría conversar.',
  },
}
