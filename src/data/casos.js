/* =====================================================================
   CASOS DE ESTUDIO
   ---------------------------------------------------------------------
   Cada bloque { ... } es un caso. Para agregar uno, copia un bloque
   completo, pégalo y cambia los textos.

   Reglas:
   · Cambia solo lo que está entre comillas '...'. No borres comas.
   · Si dejas un campo vacío ('' o []), esa sección NO aparece en el sitio.
   · Las rutas de imágenes van sin barra inicial: 'casos/mi-imagen.webp'.
   · Escribe solo información real. Los KPIs solo con cifras que puedas
     respaldar (y que tu empresa te permita mostrar).

   KPIs — cada indicador:
     {
       nombre: 'Clientes contactados',
       tipo: 'actividad',        // 'actividad' | 'desempeño' | 'impacto'
       resultado: 1200,          // número real alcanzado (obligatorio)
       meta: 1000,               // opcional: si existe, se calcula el % de cumplimiento
       anterior: 900,            // opcional: valor del período anterior (variación)
       unidad: '',               // opcional: '%', 'clientes', 'envíos'...
       periodo: 'Ene–Mar 2026',  // período de medición
       nota: '',                 // opcional: aclaración breve
     }
   · 'actividad' = lo que se hizo (envíos, piezas, campañas).
   · 'desempeño' = cómo respondió el público (aperturas, clics, ingresos al canal).
   · 'impacto'   = efecto en el negocio (transacciones, adopción, ahorro).
   No mezcles: una meta de envíos no es un resultado de interacción.

   Tarjetas destacadas (opcional, para resultados aproximados o cualitativos):
     destacados: [ { prefijo: '~', valor: 20, sufijo: '%', titulo: '...', texto: '...' },
                   { cifra: 'B2B', titulo: '...', texto: '...' } ]
   Resultado principal (tarjeta grande): resultadoPrincipal { prefijo, valor, sufijo, titulo, texto, nota }
   Otros campos opcionales: estrategia.flujo [], estrategia.etapasTitulo, resumenDetalle, aporteIntro, kpiTitulo, kpiIntro,
   resultadoDestacado {titulo, texto, lectura}, otrosIndicadores [], kpiNota,
   estrategia.variables [], estrategia.temas [], valor.parrafos [], valor.cierre.

   Gráfico histórico (opcional):
     historico: { titulo: 'Transacciones mensuales', unidad: '', puntos: [ { periodo: 'Ene', valor: 120 }, ... ] }
   ===================================================================== */

const P = 'Texto provisional — '

export const casos = [
  {
    id: 'masificacion-digital-b2b',
    provisional: false,
    titulo: 'Estrategia de masificación y adopción digital B2B',
    cliente: 'Movistar Empresas',
    anio: '2025 — 2026',
    categoria: 'Segmentación estratégica · Campañas multicanal · Adopción digital · Análisis de resultados',
    area: 'Marketing Digital',
    imagen: 'areas/marketing-digital.svg', // ← puedes reemplazarla por una imagen propia
    resumen:
      'Impulsar la adopción y el uso recurrente de los canales de autogestión digital de Movistar Empresas, promoviendo una experiencia más autónoma y eficiente para los clientes.',
    resumenDetalle: '',

    contexto: {
      situacion: '',
      problema: '',
      oportunidad: '',
      publico: '',
      desafios: [
        'Ir más allá de las comunicaciones masivas tradicionales, desarrollando campañas relevantes según el comportamiento, las necesidades y el nivel de interacción digital de cada audiencia.',
      ],
    },

    objetivos: { estrategicos: [], metas: [] },

    estrategia: {
      enfoque:
        'Una metodología de masificación basada en datos, orientada a conectar a los clientes con las funcionalidades digitales más relevantes para sus necesidades.',
      flujo: ['Datos', 'Audiencias', 'Campañas', 'Medición'],
      publicos: [],
      variables: ['Comportamiento digital', 'Historial de interacciones', 'Frecuencia de uso', 'Necesidades de autogestión'],
      canales: [],
      temas: ['Facturación y pagos', 'Roaming', 'Gestión de SIM', 'Soporte técnico', 'Reactivación de usuarios'],
      mensajes: [],
      decisiones: [],
      etapasTitulo: 'Cuatro ejes de trabajo',
      etapas: [
        { titulo: 'Análisis y segmentación', texto: 'Identificación de audiencias a partir de bases de datos, considerando comportamiento digital, historial de interacciones, frecuencia de uso y necesidades de autogestión.' },
        { titulo: 'Personalización de comunicaciones', texto: 'Campañas asociadas a funcionalidades específicas, como facturación y pagos, roaming, gestión de SIM, soporte técnico y reactivación de usuarios.' },
        { titulo: 'Planificación y contactabilidad', texto: 'Coordinación de campañas periódicas, calendarización de envíos y depuración de bases para optimizar la comunicación con los clientes.' },
        { titulo: 'Medición y optimización', texto: 'Seguimiento de indicadores de lectura, conversión, recurrencia y uso de funcionalidades, identificando oportunidades de mejora continua.' },
      ],
      criterios: [],
    },

    aporteIntro:
      'Participación en la planificación y ejecución de estrategias de masificación digital B2B, integrando comunicación, análisis de datos y gestión de campañas.',
    aporte: [
      { titulo: 'Definición de audiencias', icono: 'usuario' },
      { titulo: 'Segmentación de bases', icono: 'grafico' },
      { titulo: 'Planificación de campañas', icono: 'calendario' },
      { titulo: 'Desarrollo de contenidos y briefs creativos', icono: 'lapiz' },
      { titulo: 'Coordinación de piezas', icono: 'imagen' },
      { titulo: 'Implementación de envíos', icono: 'megafono' },
      { titulo: 'Evaluación de resultados', icono: 'grafico' },
      { titulo: 'Análisis de efectividad para orientar futuras acciones y optimizar la estrategia', icono: 'documento' },
    ],

    // KPIs y resultados (aproximados)
    kpiTitulo: 'Resultados destacados',
    kpiIntro: '',
    resultadoPrincipal: {
      prefijo: '~', valor: 21, sufijo: '%',
      titulo: 'Conversión en reactivación digital',
      texto: 'En una campaña de recuperación de usuarios, aproximadamente uno de cada cinco clientes impactados volvió a ingresar a la Sucursal Virtual Empresas durante el período evaluado.',
      nota: 'Proporción de clientes impactados que regresó al canal en la campaña de referencia. No es un porcentaje de cumplimiento de meta.',
    },
    destacados: [
      { prefijo: '~', valor: 180, titulo: 'Campañas', texto: 'Gestión sostenida de comunicaciones digitales durante seis meses, dirigidas a diferentes segmentos y necesidades de clientes empresas.' },
      { prefijo: '~', valor: 50, sufijo: '%', titulo: 'Lectura', texto: 'Tasa de lectura sobre mensajes entregados en las campañas del período analizado.' },
      { prefijo: '+', valor: 4, sufijo: ' mil', titulo: 'Acciones posteriores', texto: 'Actividad de autogestión, acceso a canales y participación en encuestas entre clientes impactados por campañas evaluadas.' },
    ],
    resultadoDestacado: null,
    otrosIndicadores: [],
    kpiNota: 'Indicadores aproximados, correspondientes a diferentes períodos de medición.',
    kpis: [], // indicadores con meta y resultado (se calculan solos) — cuando tengas metas oficiales
    historico: null,

    valor: {
      parrafos: [
        'La estrategia contribuyó a evolucionar desde comunicaciones masivas hacia campañas más focalizadas, utilizando datos de comportamiento para identificar oportunidades de adopción digital.',
        'El seguimiento de resultados permitió evaluar la respuesta de distintas audiencias, reconocer funcionalidades con potencial de interacción y aportar información relevante para optimizar la planificación de nuevas campañas.',
        'El trabajo integró creatividad, segmentación y análisis para fortalecer una gestión de marketing B2B orientada a resultados.',
      ],
      cierre: 'Transformar datos en decisiones y comunicaciones en oportunidades de adopción digital.',
      demostrado: [],
      esperado: [],
    },
    aprendizajes: [],

    proyectos: ['asistente-virtual-whatsapp', 'campanas-whatsapp-agencia', 'video-tutorial-sucursal-virtual', 'banners-sitio-web'],
  },

  {
    id: 'optimizacion-contactabilidad-b2b',
    provisional: true,
    titulo: 'Optimización de campañas y contactabilidad B2B',
    cliente: 'Movistar Empresas',
    anio: '2025 — 2026', // ← confirma el período
    categoria: 'Planificación de campañas',
    area: 'Planificación multicanal y gestión de bases',
    imagen: 'areas/direccion-creativa.svg',
    resumen: P + 'en 2–3 frases: qué se buscaba, cómo se abordó y qué se logró.',

    contexto: {
      situacion: P + 'cómo se organizaban las campañas y bases al comenzar.',
      problema: P + 'qué problema existía (ej: contactos duplicados, saturación).',
      oportunidad: P + 'qué oportunidad de mejora se identificó.',
      publico: P + 'qué segmentos de clientes estaban involucrados.',
      desafios: [],
    },

    objetivos: { estrategicos: [P + 'objetivo estratégico.'], metas: [] },

    estrategia: {
      enfoque: P + 'la idea central de la estrategia.',
      publicos: [],
      canales: [],
      mensajes: [],
      decisiones: [],
      etapas: [
        { titulo: 'Organización de bases', texto: P + 'cómo se ordenaron las bases.' },
        { titulo: 'Segmentación', texto: P + 'qué criterios se usaron.' },
        { titulo: 'Planificación multicanal', texto: P + 'cómo se calendarizaron los envíos.' },
        { titulo: 'Gestión de metas', texto: P + 'cómo se hizo seguimiento.' },
      ],
      criterios: [],
    },

    aporte: [{ titulo: P + 'tarea 1', texto: 'Describe tu participación concreta.', icono: 'grafico' }],
    kpis: [],
    historico: null,
    valor: { demostrado: [], esperado: [] },
    aprendizajes: [],
    proyectos: ['banners-sitio-web'],
  },

  {
    id: 'comunicacion-corporativa-perceptiva',
    provisional: true,
    titulo: 'Comunicación corporativa y contenidos B2B',
    cliente: 'Perceptiva', // ← o el cliente específico
    anio: '2023 — 2024',
    categoria: 'Comunicación corporativa',
    area: 'Contenidos y comunicación institucional',
    imagen: 'areas/contenido-audiovisual.svg',
    resumen: P + 'en 2–3 frases: qué se buscaba, cómo se abordó y qué se logró.',

    contexto: {
      situacion: P + 'situación del cliente o de la cuenta.',
      problema: P + 'qué necesitaba comunicar.',
      oportunidad: '',
      publico: P + 'a qué públicos se dirigía.',
      desafios: [],
    },

    objetivos: { estrategicos: [P + 'objetivo de comunicación.'], metas: [] },

    estrategia: {
      enfoque: P + 'enfoque de comunicación.',
      publicos: [],
      canales: [],
      mensajes: [],
      decisiones: [],
      etapas: [],
      criterios: [],
    },

    aporte: [{ titulo: P + 'tarea 1', texto: 'Describe tu participación concreta.', icono: 'lapiz' }],
    kpis: [],
    historico: null,
    valor: { demostrado: [], esperado: [] },
    aprendizajes: [],
    proyectos: [],
  },
]
