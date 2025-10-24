// script.js
// This file contains code to initialise all interactive charts on the site.

// ---------------------------------------------------------------------------
// Internationalisation (i18n) support
// ---------------------------------------------------------------------------
//
// To provide a multilingual experience across the site we define a small
// translation dictionary covering all static text that appears in the HTML
// templates. Each key corresponds to a piece of text on the page and has a
// translation in Spanish (es), English (en), German (de) and Russian (ru).
// The default language is Spanish, but visitors can switch languages using
// the selector added to the navigation bar. The selected language is stored
// in localStorage so that navigation between pages preserves the choice.
//
const translations = {
  es: {
    // Navigation
    nav_home: 'Inicio',
    // Use a non-breaking space (\u00A0) between words to prevent line breaks
    nav_about: 'Quiénes\u00A0Somos',
    nav_services: 'Servicios',
    nav_approach: 'Enfoque',
    nav_impact: 'Impacto',
    nav_contact: 'Contacto',
    // Home page
    home_hero_title: 'Soluciones inteligentes en análisis de datos',
    home_hero_subtitle: 'Transformamos tus datos en decisiones que inspiran confianza',
    home_hero_button: 'Contáctanos',
    home_intro_title: '¿Por qué elegirnos?',
    home_card1_title: 'Misión',
    home_card1_desc: 'Democratizar la analítica avanzada para crear decisiones informadas.',
    home_card2_title: 'Visión',
    home_card2_desc: 'Ser aliados estratégicos en innovación con IA y Procesamiento de Lenguaje Natural.',
    home_card3_title: 'Data‑driven',
    home_card3_desc: '23 veces más clientes y 19 veces más rentables gracias a las decisiones basadas en datos.',
    home_card4_title: 'Impacto real',
    home_card4_desc: 'Mejora tus resultados: +8 % de utilidades y −10 % de costos al optimizar procesos con IA.',
    home_services_summary_title: 'Nuestros servicios',
    home_service1_title: 'Dashboards y análisis',
    home_service1_desc: 'Monitoreo de KPIs con Power BI, Looker y Tableau para visualizar el rendimiento en tiempo real.',
    home_service2_title: 'Modelado y proyecciones',
    home_service2_desc: 'Predicción de tendencias mediante inteligencia artificial y estadística avanzada.',
    home_service3_title: 'Consultoría basada en evidencia',
    home_service3_desc: 'Decisiones estratégicas guiadas por datos y respaldadas por nuestra experiencia.',
    home_service4_title: 'PLN y chatbots',
    home_service4_desc: 'Interacción y soporte en lenguaje natural con chatbots personalizados.',
    home_service5_title: 'Formación y soporte académico',
    home_service5_desc: 'Capacitación y acompañamiento para estudiantes e investigadores de todos los niveles.',
    home_stats_title: 'Datos que nos respaldan',
    home_stats_label_projects: 'Proyectos completados',
    home_stats_label_clients: 'Clientes satisfechos',
    home_stats_label_experience: 'Años de experiencia',
    home_video_title: 'Descubre la analítica de datos',
    home_footer: '© 2025 Wallpari Analytics · Todos los derechos reservados.',
    // About page
    about_hero_title: 'Quiénes somos',
    about_hero_subtitle: 'Conoce la historia, misión y visión de nuestra consultora',
    about_section1_title: 'Somos Wallpari Analytics',
    about_section1_desc: 'Somos una consultora peruana que transforma la complejidad en oportunidades. Democratizamos el análisis avanzado para que personas y organizaciones tomen decisiones basadas en datos y puedan mejorar sus resultados de manera sostenida.',
    about_mission_vision_title: 'Misión y Visión',
    about_mission_title: 'Misión',
    about_mission_desc: 'Democratizar la analítica avanzada para crear decisiones informadas y accesibles a todos.',
    about_vision_title: 'Visión',
    about_vision_desc: 'Ser aliados estratégicos en innovación con inteligencia artificial y procesamiento de lenguaje natural, acompañando a nuestros clientes en todo su crecimiento.',
    about_values_title: 'Nuestros valores',
    about_value1_title: 'Calidad de datos',
    about_value1_desc: 'Fundamento de decisiones confiables: cuidamos las fuentes y la limpieza de la información.',
    about_value2_title: 'Data‑driven',
    about_value2_desc: 'Impulsamos resultados con datos: 23 veces más clientes y 19 veces más rentables.',
    about_value3_title: 'Impacto real',
    about_value3_desc: 'Generamos +8 % de utilidades y reducimos 10 % de costos a través de nuestros proyectos.',
    about_value4_title: 'Innovación IA + PLN',
    about_value4_desc: 'Desarrollamos chatbots y soluciones en lenguaje natural para potenciar la interacción humana.',
    about_ai_title: 'Innovación en IA',
    about_ai_desc: 'En Wallpari Analytics aplicamos lo último en inteligencia artificial, incluyendo IA generativa y modelos de lenguaje, para ofrecer soluciones que transforman industrias. Nuestra visión de futuro nos impulsa a integrar nuevas tecnologías y crear valor sostenible para nuestros clientes.',
    about_timeline_title: 'Nuestra trayectoria',
    about_timeline1_title: 'Inicio como consultora',
    about_timeline1_desc: 'Nacimos con la visión de acompañar a organizaciones en su transformación digital y analítica.',
    about_timeline2_title: 'IA generativa',
    about_timeline2_desc: 'Integramos tecnologías de inteligencia artificial generativa para crear valor de nuevas maneras.',
    about_timeline3_title: 'Crecimiento global',
    about_timeline3_desc: 'Proyectamos nuestra expansión para brindar soluciones en más países y sectores.',
    about_footer: '© 2025 Wallpari Analytics · Transformamos datos en decisiones.',
    // Services page
    services_hero_title: 'Servicios',
    services_hero_subtitle: 'Explora nuestras soluciones para impulsar tu organización',
    services_section1_title: '¿Qué hacemos?',
    services_service1_title: 'Dashboards y análisis',
    services_service1_desc: 'Diseñamos y construimos tableros dinámicos con herramientas líderes como Power BI, Looker y Tableau. Nuestros dashboards permiten monitorear KPIs en tiempo real y descubrir oportunidades ocultas en tus datos.',
    services_service2_title: 'Modelado y proyecciones',
    services_service2_desc: 'Aplicamos modelos predictivos y de machine learning para anticipar tendencias, optimizar operaciones y estimar comportamientos futuros con bases estadísticas sólidas.',
    services_service3_title: 'Consultoría basada en evidencia',
    services_service3_desc: 'Acompañamos a directivos y ejecutivos en la toma de decisiones estratégicas respaldadas por datos, proporcionando recomendaciones accionables y medición de impacto.',
    services_service4_title: 'Procesamiento de lenguaje natural',
    services_service4_desc: 'Desarrollamos chatbots y asistentes virtuales que interactúan en lenguaje natural para mejorar el soporte al cliente y automatizar procesos de atención.',
    services_service5_title: 'Formación y soporte académico',
    services_service5_desc: 'Ofrecemos talleres y capacitaciones para estudiantes, investigadores y profesionales que buscan fortalecer sus habilidades en analítica de datos y herramientas de visualización.',
    services_chart_title: 'Distribución de servicios',
    services_chart_desc: 'Nuestra oferta de servicios se distribuye de manera equilibrada para cubrir todas las necesidades de nuestros clientes, desde la creación de dashboards hasta la formación especializada.',
    services_footer: '© 2025 Wallpari Analytics · Innovando con análisis de datos.',

    // Platforms & tools section (Services page)
    services_logos_title: 'Plataformas y herramientas',
    services_logos_desc: 'Trabajamos con las principales plataformas de IA generativa, herramientas de datos y servicios en la nube.',
    // Approach page
    approach_hero_title: 'Nuestro enfoque',
    approach_hero_subtitle: 'Descubre cómo convertimos datos en valor',
    approach_process_title: 'Proceso de trabajo',
    approach_step1_title: 'Definir objetivos',
    approach_step1_desc: 'Identificamos las preguntas clave y las metas que guiarán el análisis.',
    approach_step2_title: 'Recolección y limpieza',
    approach_step2_desc: 'Seleccionamos las fuentes adecuadas y aseguramos la calidad de los datos.',
    approach_step3_title: 'Análisis exploratorio',
    approach_step3_desc: 'Descubrimos patrones y tendencias ocultas en tus datos.',
    approach_step4_title: 'Modelado avanzado',
    approach_step4_desc: 'Construimos modelos de machine learning y predicción para anticipar resultados.',
    approach_step5_title: 'Visualización & narrativa',
    approach_step5_desc: 'Diseñamos dashboards y storytelling para comunicar hallazgos de manera efectiva.',
    approach_step6_title: 'IA generativa',
    approach_step6_desc: 'Generamos narrativas automáticas con IA para potenciar la toma de decisiones.',
    approach_pillars_title: 'Nuestros pilares',
    approach_pillar1: 'Calidad',
    approach_pillar2: 'Transparencia',
    approach_pillar3: 'Innovación',
    approach_pillar4: 'Impacto',
    approach_footer: '© 2025 Wallpari Analytics · Avanzando juntos hacia el futuro.',
    // Impact page
    impact_hero_title: 'Impacto con datos',
    impact_hero_subtitle: 'Resultados tangibles gracias a la analítica avanzada',
    impact_section1_title: 'Medimos nuestro impacto',
    impact_chart1_title: 'Adopción de IA',
    impact_chart2_title: 'Adopción de IA generativa',
    impact_cases_title: 'Casos de éxito',
    impact_case1_title: 'Red Roof Inn',
    impact_case1_desc: 'Incremento del 10 % en ingresos gracias a la optimización del pricing y al análisis de demanda.',
    impact_case2_title: 'Corel Software',
    impact_case2_desc: 'Aumento del 106 % en ingresos tras implementar modelos de predicción de ventas y segmentación de clientes.',
    impact_sectors_title: 'Clientes y sectores',
    impact_sector1: 'Educación',
    impact_sector2: 'Salud',
    impact_sector3: 'Finanzas',
    impact_sector4: 'Retail',
    impact_sector5: 'Manufactura',
    impact_list1: 'Asesoría en proyectos universitarios.',
    impact_list2: 'Dashboards ejecutivos para pymes y startups.',
    impact_list3: 'Modelos predictivos para demanda y producción.',
    impact_list4: 'Optimización de operaciones en salud y retail.',
    impact_footer: '© 2025 Wallpari Analytics · Creando valor con información.',
    // Contact page
    contact_hero_title: 'Contáctanos',
    contact_hero_subtitle: 'Estamos listos para escucharte',
    contact_info_title: 'Información de contacto',
    contact_location: 'Pueblo Libre, Lima, Perú',
    contact_form_title: 'Envíanos un mensaje',
    contact_label_name: 'Nombre',
    contact_placeholder_name: 'Tu nombre',
    contact_label_email: 'Correo electrónico',
    contact_placeholder_email: 'tu@correo.com',
    contact_label_message: 'Mensaje',
    contact_placeholder_message: '¿Cómo podemos ayudarte?',
    contact_submit_button: 'Enviar mensaje',
    contact_chart_title: 'Crecimiento de clientes',
    contact_footer: '© 2025 Wallpari Analytics · Estamos a un mensaje de distancia.'
  },
  en: {
    nav_home: 'Home',
    nav_about: 'About\u00A0Us',
    nav_services: 'Services',
    nav_approach: 'Approach',
    nav_impact: 'Impact',
    nav_contact: 'Contact',
    home_hero_title: 'Intelligent data analysis solutions',
    home_hero_subtitle: 'We turn your data into decisions that inspire confidence',
    home_hero_button: 'Contact us',
    home_intro_title: 'Why choose us?',
    home_card1_title: 'Mission',
    home_card1_desc: 'Democratize advanced analytics to create informed decisions.',
    home_card2_title: 'Vision',
    home_card2_desc: 'Be strategic allies in innovation with AI and Natural Language Processing.',
    home_card3_title: 'Data‑driven',
    home_card3_desc: '23 times more customers and 19 times more profitable thanks to data-driven decisions.',
    home_card4_title: 'Real impact',
    home_card4_desc: 'Improve your results: +8% profits and −10% costs by optimizing processes with AI.',
    home_services_summary_title: 'Our services',
    home_service1_title: 'Dashboards and analytics',
    home_service1_desc: 'Monitoring KPIs with Power BI, Looker and Tableau to visualize performance in real time.',
    home_service2_title: 'Modeling and projections',
    home_service2_desc: 'Predicting trends through artificial intelligence and advanced statistics.',
    home_service3_title: 'Evidence-based consulting',
    home_service3_desc: 'Strategic decisions guided by data and backed by our experience.',
    home_service4_title: 'NLP and chatbots',
    home_service4_desc: 'Interaction and support in natural language with customized chatbots.',
    home_service5_title: 'Training and academic support',
    home_service5_desc: 'Training and support for students and researchers of all levels.',
    home_stats_title: 'Data that supports us',
    home_stats_label_projects: 'Completed projects',
    home_stats_label_clients: 'Satisfied clients',
    home_stats_label_experience: 'Years of experience',
    home_video_title: 'Discover data analytics',
    home_footer: '© 2025 Wallpari Analytics · All rights reserved.',
    about_hero_title: 'Who we are',
    about_hero_subtitle: 'Learn about the history, mission and vision of our consultancy',
    about_section1_title: 'We are Wallpari Analytics',
    about_section1_desc: 'We are a Peruvian consultancy that transforms complexity into opportunities. We democratize advanced analytics so that people and organizations can make data-driven decisions and sustainably improve their results.',
    about_mission_vision_title: 'Mission and Vision',
    about_mission_title: 'Mission',
    about_mission_desc: 'Democratize advanced analytics to create informed and accessible decisions for everyone.',
    about_vision_title: 'Vision',
    about_vision_desc: 'Be strategic allies in innovation with artificial intelligence and natural language processing, accompanying our clients throughout their growth.',
    about_values_title: 'Our values',
    about_value1_title: 'Data quality',
    about_value1_desc: 'Foundation of reliable decisions: we take care of data sources and cleanliness.',
    about_value2_title: 'Data-driven',
    about_value2_desc: 'We drive results with data: 23 times more customers and 19 times more profitable.',
    about_value3_title: 'Real impact',
    about_value3_desc: 'We generate +8% profits and reduce 10% costs through our projects.',
    about_value4_title: 'Innovation AI + NLP',
    about_value4_desc: 'We develop chatbots and natural language solutions to enhance human interaction.',
    about_ai_title: 'Innovation in AI',
    about_ai_desc: 'At Wallpari Analytics we apply the latest in artificial intelligence, including generative AI and language models, to offer solutions that transform industries. Our future vision drives us to integrate new technologies and create sustainable value for our clients.',
    about_timeline_title: 'Our journey',
    about_timeline1_title: 'Began as a consultancy',
    about_timeline1_desc: 'We were born with the vision of accompanying organizations in their digital and analytical transformation.',
    about_timeline2_title: 'Generative AI',
    about_timeline2_desc: 'We integrate generative artificial intelligence technologies to create value in new ways.',
    about_timeline3_title: 'Global growth',
    about_timeline3_desc: 'We project our expansion to provide solutions in more countries and sectors.',
    about_footer: '© 2025 Wallpari Analytics · We turn data into decisions.',
    services_hero_title: 'Services',
    services_hero_subtitle: 'Explore our solutions to empower your organization',
    services_section1_title: 'What we do',
    services_service1_title: 'Dashboards and analytics',
    services_service1_desc: 'We design and build dynamic dashboards with leading tools like Power BI, Looker and Tableau. Our dashboards allow monitoring KPIs in real time and discovering hidden opportunities in your data.',
    services_service2_title: 'Modeling and projections',
    services_service2_desc: 'We apply predictive models and machine learning to anticipate trends, optimize operations and estimate future behaviors with solid statistical bases.',
    services_service3_title: 'Evidence-based consulting',
    services_service3_desc: 'We accompany executives and directors in strategic decision-making backed by data, providing actionable recommendations and impact measurement.',
    services_service4_title: 'Natural language processing',
    services_service4_desc: 'We develop chatbots and virtual assistants that interact in natural language to improve customer support and automate service processes.',
    services_service5_title: 'Training and academic support',
    services_service5_desc: 'We offer workshops and training for students, researchers and professionals who want to strengthen their skills in data analytics and visualization tools.',
    services_chart_title: 'Distribution of services',
    services_chart_desc: 'Our service offering is distributed evenly to cover all our clients’ needs, from dashboard creation to specialized training.',
    services_footer: '© 2025 Wallpari Analytics · Innovating with data analytics.',

    // Platforms & tools section (Services page)
    services_logos_title: 'Platforms & tools',
    services_logos_desc: 'We work with leading generative AI platforms, data tools and cloud providers.',
    approach_hero_title: 'Our approach',
    approach_hero_subtitle: 'Discover how we turn data into value',
    approach_process_title: 'Work process',
    approach_step1_title: 'Define objectives',
    approach_step1_desc: 'We identify key questions and goals that will guide the analysis.',
    approach_step2_title: 'Collection and cleansing',
    approach_step2_desc: 'We select the appropriate sources and ensure data quality.',
    approach_step3_title: 'Exploratory analysis',
    approach_step3_desc: 'We discover hidden patterns and trends in your data.',
    approach_step4_title: 'Advanced modeling',
    approach_step4_desc: 'We build machine learning and prediction models to anticipate results.',
    approach_step5_title: 'Visualization & storytelling',
    approach_step5_desc: 'We design dashboards and storytelling to communicate findings effectively.',
    approach_step6_title: 'Generative AI',
    approach_step6_desc: 'We generate automatic narratives with AI to enhance decision-making.',
    approach_pillars_title: 'Our pillars',
    approach_pillar1: 'Quality',
    approach_pillar2: 'Transparency',
    approach_pillar3: 'Innovation',
    approach_pillar4: 'Impact',
    approach_footer: '© 2025 Wallpari Analytics · Moving forward together into the future.',
    impact_hero_title: 'Impact with data',
    impact_hero_subtitle: 'Tangible results thanks to advanced analytics',
    impact_section1_title: 'We measure our impact',
    impact_chart1_title: 'AI adoption',
    impact_chart2_title: 'Generative AI adoption',
    impact_cases_title: 'Success stories',
    impact_case1_title: 'Red Roof Inn',
    impact_case1_desc: '10% increase in revenue thanks to pricing optimization and demand analysis.',
    impact_case2_title: 'Corel Software',
    impact_case2_desc: '106% increase in revenue after implementing sales prediction and customer segmentation models.',
    impact_sectors_title: 'Clients and sectors',
    impact_sector1: 'Education',
    impact_sector2: 'Health',
    impact_sector3: 'Finance',
    impact_sector4: 'Retail',
    impact_sector5: 'Manufacturing',
    impact_list1: 'Advising on university projects.',
    impact_list2: 'Executive dashboards for SMEs and startups.',
    impact_list3: 'Predictive models for demand and production.',
    impact_list4: 'Optimization of operations in health and retail.',
    impact_footer: '© 2025 Wallpari Analytics · Creating value with information.',
    contact_hero_title: 'Contact us',
    contact_hero_subtitle: 'We are ready to listen to you',
    contact_info_title: 'Contact information',
    contact_location: 'Pueblo Libre, Lima, Peru',
    contact_form_title: 'Send us a message',
    contact_label_name: 'Name',
    contact_placeholder_name: 'Your name',
    contact_label_email: 'Email',
    contact_placeholder_email: 'your@email.com',
    contact_label_message: 'Message',
    contact_placeholder_message: 'How can we help you?',
    contact_submit_button: 'Send message',
    contact_chart_title: 'Client growth',
    contact_footer: '© 2025 Wallpari Analytics · We are just a message away.'
  },
  de: {
    nav_home: 'Startseite',
    nav_about: 'Über\u00A0uns',
    nav_services: 'Dienstleistungen',
    nav_approach: 'Vorgehensweise',
    nav_impact: 'Auswirkungen',
    nav_contact: 'Kontakt',
    home_hero_title: 'Intelligente Datenanalyse-Lösungen',
    home_hero_subtitle: 'Wir verwandeln Ihre Daten in Entscheidungen, die Vertrauen schaffen',
    home_hero_button: 'Kontaktieren Sie uns',
    home_intro_title: 'Warum uns wählen?',
    home_card1_title: 'Mission',
    home_card1_desc: 'Demokratisierung der fortgeschrittenen Analytik zur Schaffung fundierter Entscheidungen.',
    home_card2_title: 'Vision',
    home_card2_desc: 'Strategische Partner für Innovation mit KI und natürlicher Sprachverarbeitung sein.',
    home_card3_title: 'Datengesteuert',
    home_card3_desc: '23‑mal mehr Kunden und 19‑mal profitabler dank datengesteuerter Entscheidungen.',
    home_card4_title: 'Reale Wirkung',
    home_card4_desc: 'Verbessern Sie Ihre Ergebnisse: +8 % Gewinn und −10 % Kosten durch Optimierung der Prozesse mit KI.',
    home_services_summary_title: 'Unsere Dienstleistungen',
    home_service1_title: 'Dashboards und Analysen',
    home_service1_desc: 'Überwachung von KPIs mit Power BI, Looker und Tableau, um die Leistung in Echtzeit zu visualisieren.',
    home_service2_title: 'Modellierung und Prognosen',
    home_service2_desc: 'Vorhersage von Trends mittels künstlicher Intelligenz und fortgeschrittener Statistik.',
    home_service3_title: 'Evidenzbasierte Beratung',
    home_service3_desc: 'Strategische Entscheidungen, geführt von Daten und unterstützt durch unsere Erfahrung.',
    home_service4_title: 'NLP und Chatbots',
    home_service4_desc: 'Interaktion und Support in natürlicher Sprache mit maßgeschneiderten Chatbots.',
    home_service5_title: 'Schulungen und akademische Unterstützung',
    home_service5_desc: 'Schulungen und Begleitung für Studenten und Forscher aller Niveaus.',
    home_stats_title: 'Daten, die uns unterstützen',
    home_stats_label_projects: 'Abgeschlossene Projekte',
    home_stats_label_clients: 'Zufriedene Kunden',
    home_stats_label_experience: 'Jahre Erfahrung',
    home_video_title: 'Entdecke Datenanalyse',
    home_footer: '© 2025 Wallpari Analytics · Alle Rechte vorbehalten.',
    about_hero_title: 'Wer wir sind',
    about_hero_subtitle: 'Erfahren Sie mehr über die Geschichte, Mission und Vision unserer Beratung',
    about_section1_title: 'Wir sind Wallpari Analytics',
    about_section1_desc: 'Wir sind eine peruanische Beratungsfirma, die Komplexität in Chancen verwandelt. Wir demokratisieren fortgeschrittene Analytik, damit Menschen und Organisationen datenbasierte Entscheidungen treffen und ihre Ergebnisse nachhaltig verbessern können.',
    about_mission_vision_title: 'Mission und Vision',
    about_mission_title: 'Mission',
    about_mission_desc: 'Fortgeschrittene Analytik demokratisieren, um fundierte und für alle zugängliche Entscheidungen zu ermöglichen.',
    about_vision_title: 'Vision',
    about_vision_desc: 'Strategische Partner für Innovation mit künstlicher Intelligenz und natürlicher Sprachverarbeitung sein, unsere Kunden während ihres gesamten Wachstums begleiten.',
    about_values_title: 'Unsere Werte',
    about_value1_title: 'Datenqualität',
    about_value1_desc: 'Grundlage vertrauenswürdiger Entscheidungen: Wir kümmern uns um die Quellen und die Sauberkeit der Daten.',
    about_value2_title: 'Datengesteuert',
    about_value2_desc: 'Wir treiben Ergebnisse mit Daten voran: 23‑mal mehr Kunden und 19‑mal profitabler.',
    about_value3_title: 'Reale Wirkung',
    about_value3_desc: 'Wir erzielen +8 % Gewinn und reduzieren 10 % Kosten durch unsere Projekte.',
    about_value4_title: 'Innovation KI + NLP',
    about_value4_desc: 'Wir entwickeln Chatbots und Lösungen in natürlicher Sprache, um die menschliche Interaktion zu verbessern.',
    about_ai_title: 'Innovation in KI',
    about_ai_desc: 'Bei Wallpari Analytics wenden wir das Neueste in der künstlichen Intelligenz an, einschließlich generativer KI und Sprachmodelle, um Lösungen anzubieten, die Branchen transformieren. Unsere Zukunftsvision treibt uns an, neue Technologien zu integrieren und nachhaltigen Wert für unsere Kunden zu schaffen.',
    about_timeline_title: 'Unsere Laufbahn',
    about_timeline1_title: 'Beginn als Beratungsunternehmen',
    about_timeline1_desc: 'Wir wurden mit der Vision geboren, Organisationen bei ihrer digitalen und analytischen Transformation zu begleiten.',
    about_timeline2_title: 'Generative KI',
    about_timeline2_desc: 'Wir integrieren generative KI‑Technologien, um auf neue Weise Wert zu schaffen.',
    about_timeline3_title: 'Globales Wachstum',
    about_timeline3_desc: 'Wir planen unsere Expansion, um in mehr Ländern und Branchen Lösungen anzubieten.',
    about_footer: '© 2025 Wallpari Analytics · Wir machen aus Daten Entscheidungen.',
    services_hero_title: 'Dienstleistungen',
    services_hero_subtitle: 'Entdecke unsere Lösungen, um dein Unternehmen voranzubringen',
    services_section1_title: 'Was wir tun',
    services_service1_title: 'Dashboards und Analysen',
    services_service1_desc: 'Wir entwerfen und erstellen dynamische Dashboards mit führenden Tools wie Power BI, Looker und Tableau. Unsere Dashboards ermöglichen es, KPIs in Echtzeit zu überwachen und verborgene Chancen in deinen Daten zu entdecken.',
    services_service2_title: 'Modellierung und Prognosen',
    services_service2_desc: 'Wir wenden prädiktive Modelle und Machine Learning an, um Trends vorherzusagen, Abläufe zu optimieren und zukünftige Verhaltensweisen auf solider statistischer Grundlage zu schätzen.',
    services_service3_title: 'Evidenzbasierte Beratung',
    services_service3_desc: 'Wir begleiten Führungskräfte und Direktoren bei der strategischen Entscheidungsfindung, unterstützt durch Daten, und liefern umsetzbare Empfehlungen und Wirkungsmessungen.',
    services_service4_title: 'Verarbeitung natürlicher Sprache',
    services_service4_desc: 'Wir entwickeln Chatbots und virtuelle Assistenten, die in natürlicher Sprache interagieren, um den Kundensupport zu verbessern und Serviceprozesse zu automatisieren.',
    services_service5_title: 'Schulung und akademische Unterstützung',
    services_service5_desc: 'Wir bieten Workshops und Schulungen für Studenten, Forscher und Fachleute, die ihre Fähigkeiten in der Datenanalyse und in Visualisierungstools stärken möchten.',
    services_chart_title: 'Verteilung der Dienstleistungen',
    services_chart_desc: 'Unser Serviceangebot ist ausgewogen verteilt, um alle Bedürfnisse unserer Kunden abzudecken – von der Erstellung von Dashboards bis hin zur spezialisierten Schulung.',
    services_footer: '© 2025 Wallpari Analytics · Innovieren mit Datenanalyse.',

    // Platforms & tools section (Services page)
    services_logos_title: 'Plattformen & Tools',
    services_logos_desc: 'Wir arbeiten mit führenden generativen KI‑Plattformen, Datentools und Cloud‑Anbietern.',
    approach_hero_title: 'Unsere Vorgehensweise',
    approach_hero_subtitle: 'Entdecke, wie wir Daten in Wert verwandeln',
    approach_process_title: 'Arbeitsprozess',
    approach_step1_title: 'Ziele definieren',
    approach_step1_desc: 'Wir identifizieren die Schlüsselfragen und Ziele, die die Analyse leiten werden.',
    approach_step2_title: 'Erfassung und Bereinigung',
    approach_step2_desc: 'Wir wählen die geeigneten Quellen aus und stellen die Datenqualität sicher.',
    approach_step3_title: 'Explorative Analyse',
    approach_step3_desc: 'Wir entdecken verborgene Muster und Trends in deinen Daten.',
    approach_step4_title: 'Fortgeschrittene Modellierung',
    approach_step4_desc: 'Wir erstellen Machine-Learning- und Prognosemodelle, um Ergebnisse vorherzusagen.',
    approach_step5_title: 'Visualisierung & Storytelling',
    approach_step5_desc: 'Wir gestalten Dashboards und Storytelling, um Erkenntnisse effektiv zu kommunizieren.',
    approach_step6_title: 'Generative KI',
    approach_step6_desc: 'Wir generieren mit KI automatische Erzählungen, um die Entscheidungsfindung zu stärken.',
    approach_pillars_title: 'Unsere Säulen',
    approach_pillar1: 'Qualität',
    approach_pillar2: 'Transparenz',
    approach_pillar3: 'Innovation',
    approach_pillar4: 'Wirkung',
    approach_footer: '© 2025 Wallpari Analytics · Gemeinsam in die Zukunft.',
    impact_hero_title: 'Auswirkungen mit Daten',
    impact_hero_subtitle: 'Konkrete Ergebnisse dank fortgeschrittener Analytik',
    impact_section1_title: 'Wir messen unsere Auswirkungen',
    impact_chart1_title: 'KI-Adoption',
    impact_chart2_title: 'Adoption generativer KI',
    impact_cases_title: 'Erfolgsgeschichten',
    impact_case1_title: 'Red Roof Inn',
    impact_case1_desc: '10 % Umsatzsteigerung dank Preisoptimierung und Nachfrageanalyse.',
    impact_case2_title: 'Corel Software',
    impact_case2_desc: '106 % Umsatzsteigerung nach der Implementierung von Verkaufsprognosen und Kundensegmentierung.',
    impact_sectors_title: 'Kunden und Branchen',
    impact_sector1: 'Bildung',
    impact_sector2: 'Gesundheit',
    impact_sector3: 'Finanzen',
    impact_sector4: 'Einzelhandel',
    impact_sector5: 'Fertigung',
    impact_list1: 'Beratung für Universitätsprojekte.',
    impact_list2: 'Executive-Dashboards für KMU und Startups.',
    impact_list3: 'Prädiktive Modelle für Nachfrage und Produktion.',
    impact_list4: 'Optimierung von Abläufen in Gesundheit und Einzelhandel.',
    impact_footer: '© 2025 Wallpari Analytics · Wert schaffen mit Informationen.',
    contact_hero_title: 'Kontaktiere uns',
    contact_hero_subtitle: 'Wir sind bereit, Ihnen zuzuhören',
    contact_info_title: 'Kontaktinformationen',
    contact_location: 'Pueblo Libre, Lima, Peru',
    contact_form_title: 'Schicken Sie uns eine Nachricht',
    contact_label_name: 'Name',
    contact_placeholder_name: 'Ihr Name',
    contact_label_email: 'E-Mail',
    contact_placeholder_email: 'ihre@email.com',
    contact_label_message: 'Nachricht',
    contact_placeholder_message: 'Wie können wir Ihnen helfen?',
    contact_submit_button: 'Nachricht senden',
    contact_chart_title: 'Kundenwachstum',
    contact_footer: '© 2025 Wallpari Analytics · Wir sind nur eine Nachricht entfernt.'
  },
  ru: {
    nav_home: 'Главная',
    nav_about: 'О\u00A0нас',
    nav_services: 'Услуги',
    nav_approach: 'Подход',
    nav_impact: 'Воздействие',
    nav_contact: 'Контакты',
    home_hero_title: 'Интеллектуальные решения анализа данных',
    home_hero_subtitle: 'Мы превращаем ваши данные в решения, которые внушают доверие',
    home_hero_button: 'Свяжитесь с нами',
    home_intro_title: 'Почему выбирают нас?',
    home_card1_title: 'Миссия',
    home_card1_desc: 'Демократизация продвинутой аналитики для принятия обоснованных решений.',
    home_card2_title: 'Видение',
    home_card2_desc: 'Быть стратегическими союзниками в инновациях с ИИ и обработкой естественного языка.',
    home_card3_title: 'Основано на данных',
    home_card3_desc: 'В 23 раза больше клиентов и в 19 раз более прибыльны благодаря решениям, основанным на данных.',
    home_card4_title: 'Реальное воздействие',
    home_card4_desc: 'Улучшите свои результаты: +8 % прибыли и −10 % затрат, оптимизируя процессы с ИИ.',
    home_services_summary_title: 'Наши услуги',
    home_service1_title: 'Дашборды и анализ',
    home_service1_desc: 'Мониторинг KPI с помощью Power BI, Looker и Tableau для визуализации эффективности в реальном времени.',
    home_service2_title: 'Моделирование и прогнозы',
    home_service2_desc: 'Прогнозирование тенденций с помощью искусственного интеллекта и продвинутой статистики.',
    home_service3_title: 'Консалтинг на основе данных',
    home_service3_desc: 'Стратегические решения, основанные на данных и поддержанные нашим опытом.',
    home_service4_title: 'НЛП и чат-боты',
    home_service4_desc: 'Взаимодействие и поддержка на естественном языке с персонализированными чат-ботами.',
    home_service5_title: 'Обучение и академическая поддержка',
    home_service5_desc: 'Обучение и сопровождение для студентов и исследователей всех уровней.',
    home_stats_title: 'Данные, которые подтверждают нас',
    home_stats_label_projects: 'Завершённые проекты',
    home_stats_label_clients: 'Довольные клиенты',
    home_stats_label_experience: 'Лет опыта',
    home_video_title: 'Откройте для себя анализ данных',
    home_footer: '© 2025 Wallpari Analytics · Все права защищены.',
    about_hero_title: 'Кто мы такие',
    about_hero_subtitle: 'Узнайте об истории, миссии и видении нашей консалтинговой компании',
    about_section1_title: 'Мы Wallpari Analytics',
    about_section1_desc: 'Мы перуанская консалтинговая компания, которая превращает сложность в возможности. Мы демократизируем продвинутую аналитику, чтобы люди и организации могли принимать решения, основанные на данных, и устойчиво улучшать свои результаты.',
    about_mission_vision_title: 'Миссия и видение',
    about_mission_title: 'Миссия',
    about_mission_desc: 'Демократизировать продвинутую аналитику, чтобы создавать обоснованные и доступные решения для всех.',
    about_vision_title: 'Видение',
    about_vision_desc: 'Быть стратегическими союзниками в инновациях с искусственным интеллектом и обработкой естественного языка, сопровождая наших клиентов на протяжении всего их роста.',
    about_values_title: 'Наши ценности',
    about_value1_title: 'Качество данных',
    about_value1_desc: 'Основа надежных решений: мы заботимся об источниках и чистоте данных.',
    about_value2_title: 'Основанное на данных',
    about_value2_desc: 'Мы добиваемся результатов с помощью данных: в 23 раза больше клиентов и в 19 раз более прибыльно.',
    about_value3_title: 'Реальное воздействие',
    about_value3_desc: 'Мы генерируем +8 % прибыли и сокращаем 10 % затрат через наши проекты.',
    about_value4_title: 'Инновации ИИ + НЛП',
    about_value4_desc: 'Мы разрабатываем чат-боты и решения на естественном языке, чтобы улучшить взаимодействие с людьми.',
    about_ai_title: 'Инновации в ИИ',
    about_ai_desc: 'В Wallpari Analytics мы применяем последние достижения искусственного интеллекта, включая генеративный ИИ и языковые модели, чтобы предлагать решения, которые трансформируют отрасли. Наш взгляд в будущее побуждает нас интегрировать новые технологии и создавать устойчивую ценность для наших клиентов.',
    about_timeline_title: 'Наш путь',
    about_timeline1_title: 'Начало как консалтинговая фирма',
    about_timeline1_desc: 'Мы появились с видением сопровождать организации в их цифровой и аналитической трансформации.',
    about_timeline2_title: 'Генеративный ИИ',
    about_timeline2_desc: 'Мы интегрируем технологии генеративного ИИ, чтобы создавать ценность новыми способами.',
    about_timeline3_title: 'Глобальный рост',
    about_timeline3_desc: 'Мы планируем наше расширение, чтобы предоставлять решения в большем количестве стран и секторов.',
    about_footer: '© 2025 Wallpari Analytics · Мы превращаем данные в решения.',
    services_hero_title: 'Услуги',
    services_hero_subtitle: 'Изучите наши решения, чтобы укрепить вашу организацию',
    services_section1_title: 'Что мы делаем',
    services_service1_title: 'Дашборды и анализ',
    services_service1_desc: 'Мы проектируем и создаём динамические панели управления с использованием ведущих инструментов, таких как Power BI, Looker и Tableau. Наши дашборды позволяют отслеживать KPI в реальном времени и обнаруживать скрытые возможности в ваших данных.',
    services_service2_title: 'Моделирование и прогнозы',
    services_service2_desc: 'Мы применяем прогностические модели и машинное обучение, чтобы предвидеть тенденции, оптимизировать операции и оценивать будущие поведения на прочной статистической основе.',
    services_service3_title: 'Консалтинг на основе данных',
    services_service3_desc: 'Мы сопровождаем руководителей и директоров в стратегическом принятии решений, опираясь на данные, предоставляя практические рекомендации и измерение воздействия.',
    services_service4_title: 'Обработка естественного языка',
    services_service4_desc: 'Мы разрабатываем чат-ботов и виртуальных ассистентов, которые взаимодействуют на естественном языке, чтобы улучшить поддержку клиентов и автоматизировать процессы обслуживания.',
    services_service5_title: 'Обучение и академическая поддержка',
    services_service5_desc: 'Мы предлагаем семинары и обучение для студентов, исследователей и профессионалов, которые хотят укрепить свои навыки в анализе данных и инструментах визуализации.',
    services_chart_title: 'Распределение услуг',
    services_chart_desc: 'Наше предложение услуг распределено равномерно, чтобы покрывать все потребности наших клиентов, от создания дашбордов до специализированного обучения.',
    services_footer: '© 2025 Wallpari Analytics · Инновации с анализом данных.',

    // Platforms & tools section (Services page)
    services_logos_title: 'Платформы и инструменты',
    services_logos_desc: 'Мы работаем с ведущими платформами генеративного ИИ, инструментами данных и облачными провайдерами.',
    approach_hero_title: 'Наш подход',
    approach_hero_subtitle: 'Узнайте, как мы превращаем данные в ценность',
    approach_process_title: 'Процесс работы',
    approach_step1_title: 'Определение целей',
    approach_step1_desc: 'Мы определяем ключевые вопросы и цели, которые будут направлять анализ.',
    approach_step2_title: 'Сбор и очистка',
    approach_step2_desc: 'Мы выбираем подходящие источники и обеспечиваем качество данных.',
    approach_step3_title: 'Исследовательский анализ',
    approach_step3_desc: 'Мы обнаруживаем скрытые закономерности и тенденции в ваших данных.',
    approach_step4_title: 'Продвинутое моделирование',
    approach_step4_desc: 'Мы строим модели машинного обучения и прогнозирования, чтобы предвидеть результаты.',
    approach_step5_title: 'Визуализация и повествование',
    approach_step5_desc: 'Мы разрабатываем дашборды и сторителлинг, чтобы эффективно донести выводы.',
    approach_step6_title: 'Генеративный ИИ',
    approach_step6_desc: 'Мы создаём автоматические повествования с помощью ИИ для улучшения принятия решений.',
    approach_pillars_title: 'Наши принципы',
    approach_pillar1: 'Качество',
    approach_pillar2: 'Прозрачность',
    approach_pillar3: 'Инновации',
    approach_pillar4: 'Воздействие',
    approach_footer: '© 2025 Wallpari Analytics · Вперёд в будущее вместе.',
    impact_hero_title: 'Воздействие с данными',
    impact_hero_subtitle: 'Осязаемые результаты благодаря продвинутой аналитике',
    impact_section1_title: 'Мы измеряем наше воздействие',
    impact_chart1_title: 'Принятие ИИ',
    impact_chart2_title: 'Принятие генеративного ИИ',
    impact_cases_title: 'Истории успеха',
    impact_case1_title: 'Red Roof Inn',
    impact_case1_desc: '10 % увеличение доходов благодаря оптимизации ценообразования и анализу спроса.',
    impact_case2_title: 'Corel Software',
    impact_case2_desc: '106 % рост доходов после внедрения моделей прогнозирования продаж и сегментации клиентов.',
    impact_sectors_title: 'Клиенты и секторы',
    impact_sector1: 'Образование',
    impact_sector2: 'Здравоохранение',
    impact_sector3: 'Финансы',
    impact_sector4: 'Ритейл',
    impact_sector5: 'Производство',
    impact_list1: 'Консультирование по университетским проектам.',
    impact_list2: 'Исполнительные дашборды для малых и средних предприятий и стартапов.',
    impact_list3: 'Прогностические модели для спроса и производства.',
    impact_list4: 'Оптимизация операций в здравоохранении и розничной торговле.',
    impact_footer: '© 2025 Wallpari Analytics · Создавая ценность с информацией.',
    contact_hero_title: 'Свяжитесь с нами',
    contact_hero_subtitle: 'Мы готовы вас выслушать',
    contact_info_title: 'Контактная информация',
    contact_location: 'Пуэбло Либре, Лима, Перу',
    contact_form_title: 'Отправьте нам сообщение',
    contact_label_name: 'Имя',
    contact_placeholder_name: 'Ваше имя',
    contact_label_email: 'Электронная почта',
    contact_placeholder_email: 'ваш@почта.com',
    contact_label_message: 'Сообщение',
    contact_placeholder_message: 'Как мы можем вам помочь?',
    contact_submit_button: 'Отправить сообщение',
    contact_chart_title: 'Рост клиентов',
    contact_footer: '© 2025 Wallpari Analytics · Мы всего лишь на расстоянии одного сообщения.'
  }
};

/**
 * Apply translations to all elements with a data-i18n attribute and update
 * placeholders. The selected language is persisted in localStorage so that
 * navigation between pages keeps the user’s choice.
 * @param {string} lang The language code to apply (es, en, de, ru)
 */
function applyTranslations(lang) {
  document.documentElement.lang = lang;
  try {
    localStorage.setItem('lang', lang);
  } catch (e) {
    // localStorage might not be available (e.g. in private browsing)
  }
  const dict = translations[lang] || {};
  // Update text contents
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialise i18n
  // Determine the previously selected language or default to Spanish. We wrap
  // access to localStorage in a try/catch because some browsers or modes
  // (e.g. private browsing) may disallow storage access.
  const savedLang = (() => {
    try {
      return localStorage.getItem('lang');
    } catch (e) {
      return null;
    }
  })() || 'es';
  // Language selector: support both a <select id="langSelect"> and a custom list of
  // clickable flag options (.lang-option elements). If flag elements exist
  // we prefer them; otherwise fall back to the <select> element. When using
  // the list, clicking a flag will update the language, highlight the active
  // selection and persist the choice via applyTranslations().
  const langSelect = document.getElementById('langSelect');
  const langOptions = document.querySelectorAll('.lang-option');
  if (langOptions.length) {
    // Apply saved language and highlight the corresponding option
    langOptions.forEach(opt => {
      if (opt.dataset.lang === savedLang) {
        opt.classList.add('active');
      }
      opt.addEventListener('click', () => {
        const selected = opt.dataset.lang;
        langOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        applyTranslations(selected);
      });
    });
    applyTranslations(savedLang);
  } else if (langSelect) {
    langSelect.value = savedLang;
    applyTranslations(savedLang);
    langSelect.addEventListener('change', e => {
      applyTranslations(e.target.value);
    });
  } else {
    applyTranslations(savedLang);
  }

  // Impact bar chart (horizontal)
  const impactBar = document.getElementById('impactBarChart');
  if (impactBar) {
    new Chart(impactBar.getContext('2d'), {
      type: 'bar',
      data: {
        labels: [
          'Adquirir clientes',
          'Retención',
          'Rentabilidad',
          'Aumento utilidades',
          'Reducción costos',
          'Ventaja competitiva',
          'Crecimiento anual'
        ],
        datasets: [{
          label: 'Índice',
          data: [23, 6, 19, 8, 10, 62, 30],
          backgroundColor: [
            '#00a79d', '#7e3e97', '#ff8552', '#0a3d62', '#00a79d', '#7e3e97', '#ff8552'
          ],
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.05)' },
            ticks: { color: '#0a2540' }
          },
          y: {
            grid: { display: false },
            ticks: { color: '#0a2540' }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: '#05172f', titleColor: '#fff', bodyColor: '#fff' }
        }
      }
    });
  }

  // Adoption of AI donut chart
  const aiChart = document.getElementById('adoptionAiChart');
  if (aiChart) {
    new Chart(aiChart.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Adopción', 'Sin adopción'],
        datasets: [{
          data: [65, 35],
          backgroundColor: ['#00a79d', '#dce4f6'],
          borderWidth: 0
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#0a2540' }
          }
        }
      }
    });
  }

  // Adoption of generative AI donut chart
  const genAiChart = document.getElementById('adoptionGenChart');
  if (genAiChart) {
    new Chart(genAiChart.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Generativa', 'Otros'],
        datasets: [{
          data: [55, 45],
          backgroundColor: ['#ff8552', '#dce4f6'],
          borderWidth: 0
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#0a2540' }
          }
        }
      }
    });
  }

  // Services distribution donut chart
  const servicesChart = document.getElementById('servicesChart');
  if (servicesChart) {
    new Chart(servicesChart.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Dashboards', 'Modelado', 'Consultoría', 'PLN', 'Formación'],
        datasets: [{
          data: [20, 20, 20, 20, 20],
          backgroundColor: ['#00a79d', '#7e3e97', '#ff8552', '#0a3d62', '#00a79d'],
          borderWidth: 0
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#0a2540' }
          }
        }
      }
    });
  }

  // Client growth line chart
  const growthChart = document.getElementById('growthChart');
  if (growthChart) {
    new Chart(growthChart.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['2019','2020','2021','2022','2023','2024'],
        datasets: [{
          label: 'Crecimiento de clientes',
          data: [1,2,4,6,8,10],
          borderColor: '#00a79d',
          backgroundColor: 'rgba(0,167,157,0.2)',
          tension: 0.3,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: '#00a79d'
        }]
      },
      options: {
        scales: {
          x: {
            ticks: { color: '#0a2540' },
            grid: { color: 'rgba(0,0,0,0.05)' }
          },
          y: {
            beginAtZero: true,
            ticks: { color: '#0a2540' },
            grid: { color: 'rgba(0,0,0,0.05)' }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: '#05172f', titleColor: '#fff', bodyColor: '#fff' }
        }
      }
    });
  }

  /**
   * Scroll reveal and counters
   *
   * To bring the pages to life, we use the Intersection Observer API
   * to lazily animate elements as they scroll into view. Elements
   * registered with the observer have the `reveal` class added in
   * JavaScript; once visible a `reveal-visible` class is toggled
   * which triggers CSS transitions defined in styles.css. This
   * approach keeps animations fast and avoids jank because it only
   * affects items that are on screen.
   */
  // Create a single observer for reveal animations
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // Elements to reveal: cards, timeline items, steps, pillars, cases, sectors,
  // contact items, stats and AI section pieces. Selecting by class keeps
  // things declarative and doesn't require changes to the HTML markup.
  const revealElements = document.querySelectorAll('.card, .timeline-item, .step, .pillar, .case, .sector, .contact-item, .stat, .ai-image, .ai-content');
  revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Counter animation for statistics
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        let current = 0;
        const increment = Math.max(1, Math.floor(target / 200));
        const update = () => {
          current += increment;
          if (current >= target) {
            el.textContent = target.toLocaleString();
          } else {
            el.textContent = current.toLocaleString();
            requestAnimationFrame(update);
          }
        };
        update();
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 1.0 });

  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(el => counterObserver.observe(el));

  /**
   * Dynamic neural network background animation
   *
   * For sections marked with the `dynamic` class we overlay a canvas on top
   * of the hero and draw a simple network of nodes connected by lines. A
   * glowing dot travels along each line to simulate electrical activity.
   */
  /**
   * Initialize a subtle blinking star field. This function scatters a
   * configurable number of 'destellos' across the hero area. Each star
   * independently fades in and out, then respawns at a random position
   * once it has completely faded. Stars inherit their colour from the
   * supplied base colour, but their opacity oscillates to produce the
   * twinkling effect. No lines are drawn, keeping the effect minimal
   * and organic.
   */
  function initBlinkingStars(canvas, container, colour = '#00a79d') {
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    // convert colour to RGB once
    const baseRgb = hexToRgb(colour);
    function resize() {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    }
    function initStars() {
      const numStars = Math.floor((width * height) / 50000); // density based on area
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push(createStar());
      }
    }
    function createStar() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1 + Math.random() * 2.5,
        opacity: 0,
        fadeIn: true,
        speed: 0.02 + Math.random() * 0.02
      };
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(s => {
        // update opacity
        if (s.fadeIn) {
          s.opacity += s.speed;
          if (s.opacity >= 1) {
            s.opacity = 1;
            s.fadeIn = false;
          }
        } else {
          s.opacity -= s.speed;
          if (s.opacity <= 0) {
            // respawn at a new random position
            s.x = Math.random() * width;
            s.y = Math.random() * height;
            s.radius = 1 + Math.random() * 2.5;
            s.opacity = 0;
            s.fadeIn = true;
            s.speed = 0.02 + Math.random() * 0.02;
          }
        }
        // compute star colour blending towards white as it brightens
        const r = Math.round(baseRgb.r * s.opacity + 255 * (1 - s.opacity));
        const g = Math.round(baseRgb.g * s.opacity + 255 * (1 - s.opacity));
        const b = Math.round(baseRgb.b * s.opacity + 255 * (1 - s.opacity));
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${s.opacity})`;
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener('resize', resize);
    draw();
  }

  // Existing network animation function is kept for reference but unused now
  function initNetworkAnimation(canvas, container, colour = '#00a79d') {
    const ctx = canvas.getContext('2d');
    let width, height;
    let nodes = [];
    let edges = [];
    function resize() {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      initNetwork();
    }
    function initNetwork() {
      // generate random nodes
      const count = 14;
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({ x: Math.random() * width, y: Math.random() * height });
      }
      edges = [];
      // connect nodes with a low probability
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          if (Math.random() < 0.12) {
            // Create a control point roughly halfway between the two nodes but
            // offset randomly to introduce curvature. This makes the
            // connections appear more organic and neuron‑like.
            const ax = nodes[i].x;
            const ay = nodes[i].y;
            const bx = nodes[j].x;
            const by = nodes[j].y;
            const midX = (ax + bx) / 2;
            const midY = (ay + by) / 2;
            // Create a curved control point by offsetting perpendicular to the
            // line AB. This produces pronounced arcs instead of straight
            // connectors. The magnitude of the offset is proportional to the
            // distance between the nodes and randomised for diversity.
            const dx = bx - ax;
            const dy = by - ay;
            const dist = Math.hypot(dx, dy) || 1;
            const normX = dx / dist;
            const normY = dy / dist;
            // Perpendicular vector
            const perpX = -normY;
            const perpY = normX;
            const sign = Math.random() < 0.5 ? -1 : 1;
            const magnitude = dist * (0.3 + Math.random() * 0.3);
            const cp = {
              x: midX + perpX * magnitude * sign,
              y: midY + perpY * magnitude * sign
            };
            edges.push({
              a: nodes[i],
              b: nodes[j],
              cp,
              t: Math.random(),
              speed: 0.002 + Math.random() * 0.006
            });
          }
        }
      }
    }

    /**
     * Given two points a and b, compute a control point for a quadratic
     * Bezier curve that bows out perpendicular to the straight segment.
     * This is used both during initialisation and when reassigning
     * trajectories after a pulse completes a path.
     */
    function computeControlPoint(a, b) {
      const ax = a.x;
      const ay = a.y;
      const bx = b.x;
      const by = b.y;
      const midX = (ax + bx) / 2;
      const midY = (ay + by) / 2;
      const dx = bx - ax;
      const dy = by - ay;
      const dist = Math.hypot(dx, dy) || 1;
      const normX = dx / dist;
      const normY = dy / dist;
      const perpX = -normY;
      const perpY = normX;
      const sign = Math.random() < 0.5 ? -1 : 1;
      const magnitude = dist * (0.3 + Math.random() * 0.3);
      return {
        x: midX + perpX * magnitude * sign,
        y: midY + perpY * magnitude * sign
      };
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      // We no longer draw the underlying curves, leaving just the moving
      // pulses visible. The lines are omitted to give the appearance of
      // neurons firing across invisible pathways. Pulses still follow the
      // precomputed quadratic trajectories.
      // Cache the RGB representation of the colour once per frame for tails
      const baseRgb = hexToRgb(colour);
      edges.forEach(e => {
        // advance the pulse
        e.t += e.speed;
        if (e.t >= 1) {
          // When a pulse completes its trajectory, pick a new random pair of
          // nodes and compute a fresh control point so the next path is
          // unrelated to the previous one. This ensures trajectories are
          // randomised across all nodes.
          e.t = 0;
          // choose two distinct random nodes
          let ai = Math.floor(Math.random() * nodes.length);
          let bi;
          do {
            bi = Math.floor(Math.random() * nodes.length);
          } while (bi === ai);
          e.a = nodes[ai];
          e.b = nodes[bi];
          e.cp = computeControlPoint(e.a, e.b);
        }
        const t = e.t;
        // current position on the quadratic curve
        const x = (1 - t) * (1 - t) * e.a.x + 2 * (1 - t) * t * e.cp.x + t * t * e.b.x;
        const y = (1 - t) * (1 - t) * e.a.y + 2 * (1 - t) * t * e.cp.y + t * t * e.b.y;
        // draw a trailing comet tail along the curve. Sample several points
        // behind the current position and draw short segments with colours
        // transitioning from white at the far tail to the base colour at the
        // head. This creates the appearance of a meteoric glow that follows
        // the curved trajectory rather than a straight line.
        const tailSteps = 6;
        for (let i = 1; i <= tailSteps; i++) {
          let tp = t - i * 0.05;
          if (tp < 0) tp += 1;
          const tailX = (1 - tp) * (1 - tp) * e.a.x + 2 * (1 - tp) * tp * e.cp.x + tp * tp * e.b.x;
          const tailY = (1 - tp) * (1 - tp) * e.a.y + 2 * (1 - tp) * tp * e.cp.y + tp * tp * e.b.y;
          const ratio = (tailSteps - i + 1) / tailSteps;
          const rCol = Math.round(baseRgb.r * ratio + 255 * (1 - ratio));
          const gCol = Math.round(baseRgb.g * ratio + 255 * (1 - ratio));
          const bCol = Math.round(baseRgb.b * ratio + 255 * (1 - ratio));
          ctx.beginPath();
          ctx.fillStyle = `rgba(${rCol}, ${gCol}, ${bCol}, 0.8)`;
          ctx.arc(tailX, tailY, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        // draw the head of the pulse
        ctx.beginPath();
        ctx.fillStyle = `rgb(${baseRgb.r}, ${baseRgb.g}, ${baseRgb.b})`;
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener('resize', resize);
    draw();
  }
  // attach a canvas and initialise the starfield animation on all dynamic heroes
  const dynamicHeroes = document.querySelectorAll('.hero.dynamic');
  dynamicHeroes.forEach(hero => {
    const canvas = document.createElement('canvas');
    canvas.classList.add('network-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    // place the canvas above the dark overlay but below the hero content
    canvas.style.zIndex = 1;
    // allow clicks to pass through to underlying elements like buttons
    canvas.style.pointerEvents = 'none';
    hero.appendChild(canvas);
    // Each hero can specify a custom network colour via data-network-color
    // attribute. If not specified, default to brand teal. Convert any CSS
    // variables or invalid values gracefully.
    let colour = hero.getAttribute('data-network-color') || '#00a79d';
    // normalise CSS variable references e.g. var(--teal)
    if (colour.startsWith('var(')) {
      const varName = colour.match(/var\(([^)]+)\)/)[1];
      const computed = getComputedStyle(document.documentElement).getPropertyValue(varName);
      colour = computed.trim() || '#00a79d';
    }
    initBlinkingStars(canvas, hero, colour);
  });

  /**
   * Convert a hex colour (e.g. #ff8552) to an object with r, g, b values.
   * If the input is invalid, returns the teal colour.
   */
  function hexToRgb(hex) {
    let c = hex.replace('#', '');
    if (c.length === 3) {
      c = c.split('').map(ch => ch + ch).join('');
    }
    const int = parseInt(c, 16);
    if (isNaN(int)) {
      return { r: 0, g: 167, b: 157 };
    }
    return {
      r: (int >> 16) & 255,
      g: (int >> 8) & 255,
      b: int & 255
    };
  }

  /**
   * Formulario de contacto con validación
   * Valida los campos y muestra mensajes de éxito/error al usuario
   */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formMessage = document.getElementById('formMessage');
      const nombre = document.getElementById('nombre').value.trim();
      const correo = document.getElementById('correo').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();

      // Validación básica
      if (nombre.length < 2) {
        showFormMessage('El nombre debe tener al menos 2 caracteres.', 'error');
        return;
      }

      if (!isValidEmail(correo)) {
        showFormMessage('Por favor, ingresa un correo electrónico válido.', 'error');
        return;
      }

      if (mensaje.length < 10) {
        showFormMessage('El mensaje debe tener al menos 10 caracteres.', 'error');
        return;
      }

      // Simulación de envío (en producción, aquí iría la llamada a un backend)
      showFormMessage('¡Gracias por tu mensaje! Te contactaremos pronto.', 'success');

      // Limpiar formulario
      contactForm.reset();

      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    });
  }

  /**
   * Muestra mensaje de formulario con estilo según el tipo
   */
  function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.style.display = 'block';

    if (type === 'success') {
      formMessage.style.backgroundColor = '#d4edda';
      formMessage.style.color = '#155724';
      formMessage.style.border = '1px solid #c3e6cb';
    } else if (type === 'error') {
      formMessage.style.backgroundColor = '#f8d7da';
      formMessage.style.color = '#721c24';
      formMessage.style.border = '1px solid #f5c6cb';
    }
  }

  /**
   * Valida formato de correo electrónico
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});