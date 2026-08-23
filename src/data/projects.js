import tradeTermHubPreview from "../assets/trade-term-hub-preview.png";

export const PROJECTS = [
  {
    id: 1,
    title: 'Dell Clinic',
    description:
      'Cloud-native telemedicine platform designed to streamline patient consultations. Built using a microservices architecture with real-time queue tracking, AI-powered patient triage, automated notifications, and scalable AWS deployment for high availability.',
    tags: [
      'React',
      'Flask',
      'Docker',
      'AWS',
      'RabbitMQ',
      'Firebase',
      'WebSocket',
      'GitHub Actions'
    ],
    media: null,
    demoLink: '',
    codeLink: ''
  },
  {
    id: 2,
    title: 'Trade Term Hub',
    description:
      'AI-powered trade intelligence platform that helps users monitor tariff changes and retrieve trade information through natural language queries. Features real-time notifications, event-driven processing, semantic search, and a RAG system backed by vector embeddings.',
    tags: [
      'Spring Boot',
      'Flask',
      'Vue',
      'Redis',
      'PostgreSQL',
      'Pinecone',
      'AWS',
      'WebSocket'
    ],
    media: {
      type: "image",
      src: tradeTermHubPreview,
      alt: "Trade Term Hub tariff calculator preview",
    },
    demoLink: '',
    codeLink: 'https://github.com/Kyzuma/CSD_Tariffic'
  },
  {
    id: 3,
    title: 'SentinelNav',
    description:
      'Secure pedestrian and transit routing app for safer night walking. It uses OpenStreetMap signals to tailor routes, offers a privacy-conscious SOS workflow with local emergency contacts, and provides continuous audio navigation alerts to keep users aware without looking at their screens.',
    tags: [
      'Spring Boot',
      'React',
      'GraphHopper',
      'OpenStreetMap',
      'Docker'
    ],
    media: null,
    demoLink: '',
    codeLink: ''
  }
];
