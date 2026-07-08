export const profile = {
  name: "Muhammad Zaky Zamzami",
  nameEn: "MUHAMMAD\nZAKY",
  nameJp: "ムハンマド ザキ ザムザミ",
  role: "Backend & DevOps Engineer",
  email: "zaky@zaky.dev",
  domain: "zaky.dev",
  bio: "Suka membangun sistem dari nol sampai production-ready. Tidak puas di 'bisa' — selalu tanya kenapa dan gimana.",
  focus: "Python · Docker · FastAPI · PostgreSQL · Monitoring · CI/CD",
  location: "Indonesia",
  avatar: "/zaky-avatar.svg",

  stats: {
    technologies: "10+",
    activeProjects: "3+",
    problemScore: "95",
    curiosity: "∞",
  },

  skills: [
    { name: "Problem decomposition", value: 95 },
    { name: "Backend & Python", value: 88 },
    { name: "DevOps & Docker", value: 82 },
    { name: "Database & SQL", value: 80 },
    { name: "Monitoring & observability", value: 76 },
    { name: "System design", value: 79 },
  ],

  techStack: [
    { name: "Python", accent: true },
    { name: "FastAPI", accent: true },
    { name: "Docker", accent: true },
    { name: "PostgreSQL", accent: false },
    { name: "Linux", accent: false },
    { name: "Grafana", accent: false },
    { name: "Prometheus", accent: false },
    { name: "React", accent: false },
    { name: "Railway", accent: false },
    { name: "Git", accent: false },
    { name: "CI/CD", accent: false },
  ],

  social: {
    github: "https://github.com/deathmurderS",
    linkedin: "#",
  },

  personality: {
    title: "Siapa Muhammad Zaky Zamzami?",
    description:
      "Seorang problem solver yang menikmati proses membangun sistem yang rapi, fungsional, dan terus berkembang melalui pembelajaran langsung.",
    traits: [
      {
        icon: "search",
        title: "Rasa Ingin Tahu Tinggi",
        desc: "Selalu ingin memahami alasan di balik setiap solusi, bukan sekadar mengetahui hasil akhirnya.",
      },
      {
        icon: "cog",
        title: "Suka Membangun",
        desc: "Menikmati proses membangun produk dibanding sekadar mempelajari teori.",
      },
      {
        icon: "zap",
        title: "Belajar Lewat Praktik",
        desc: "Belajar dengan mencoba langsung, bukan hanya membaca dokumentasi.",
      },
      {
        icon: "star",
        title: "Standar Tinggi",
        desc: "Tidak cepat puas, selalu ingin hasil yang lebih rapi, lengkap, dan profesional.",
      },
    ],
  },
};

export const projects = [
  {
    id: "dashboard-generator",
    title: "Dashboard Generator",
    description:
      "Generate dashboard monitoring otomatis dengan konfigurasi minimal. Mendukung多种 visualisasi data dan integrasi dengan berbagai sumber data.",
    longDescription:
      "Dashboard Generator adalah tools untuk membuat dashboard monitoring secara otomatis. Cukup dengan konfigurasi YAML/JSON, sistem akan menghasilkan dashboard lengkap dengan grafik, tabel, dan metrik real-time.",
    image: "/projects/dashboard-generator.svg",
    tags: ["Python", "FastAPI", "Docker", "PostgreSQL", "Grafana"],
    links: {
      github: "https://github.com/deathmurderS/Dashboard-Generator",
      demo: "#",
      docs: "#",
    },
    stats: { stars: 12, forks: 3, issues: 2 },
    features: [
      "Konfigurasi berbasis YAML/JSON",
      "Multi-source data integration",
      "Auto-deploy dengan Docker",
      "Real-time metrics",
    ],
  },
  {
    id: "datapulse",
    title: "DataPulse",
    description:
      "Platform analisis data real-time dengan pipeline ETL otomatis, visualisasi interaktif, dan monitoring performa.",
    longDescription:
      "DataPulse adalah platform data analytics yang memungkinkan pengguna mengolah, menganalisis, dan memvisualisasikan data secara real-time. Dilengkapi pipeline ETL otomatis dan sistem monitoring.",
    image: "/projects/datapulse.svg",
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker", "React"],
    links: {
      github: "https://github.com/deathmurderS/DataPulse",
      demo: "#",
      docs: "#",
    },
    stats: { stars: 8, forks: 2, issues: 1 },
    features: [
      "ETL Pipeline otomatis",
      "Real-time analytics",
      "Interactive visualization",
      "Performance monitoring",
    ],
  },
  {
    id: "monitoring-system",
    title: "Monitoring System",
    description:
      "Sistem monitoring infrastruktur dengan Prometheus, Grafana, dan alerting. Mencakup CPU, RAM, disk, dan network metrics.",
    longDescription:
      "Sistem monitoring lengkap untuk infrastruktur server. Menggunakan Prometheus untuk metrics collection, Grafana untuk visualisasi, dan Alertmanager untuk notifikasi.",
    image: "/projects/monitoring.svg",
    tags: ["Prometheus", "Grafana", "Docker", "Linux", "Python"],
    links: {
      github: "#",
      demo: "#",
      docs: "#",
    },
    stats: { stars: 5, forks: 1, issues: 0 },
    features: [
      "Infrastructure monitoring",
      "Custom alerting rules",
      "Multi-server support",
      "Dashboard templating",
    ],
  },
];

export const blogPosts = [
  {
    slug: "deploy-python-ke-railway",
    title: "Cara Deploy Python ke Railway",
    excerpt:
      "Panduan lengkap deploy aplikasi Python (FastAPI/Django) ke Railway dengan mudah dan cepat.",
    date: "2026-06-15",
    readTime: 8,
    tags: ["Python", "Deployment", "Railway"],
  },
  {
    slug: "belajar-docker-untuk-pemula",
    title: "Belajar Docker untuk Pemula",
    excerpt:
      "Memahami konsep dasar Docker, container, image, dan cara menggunakannya dalam development.",
    date: "2026-06-10",
    readTime: 12,
    tags: ["Docker", "DevOps", "Tutorial"],
  },
  {
    slug: "membangun-dashboard-monitoring",
    title: "Membangun Dashboard Monitoring dengan Grafana",
    excerpt:
      "Langkah-langkah membangun dashboard monitoring menggunakan Grafana dan Prometheus.",
    date: "2026-05-28",
    readTime: 10,
    tags: ["Grafana", "Monitoring", "Prometheus"],
  },
  {
    slug: "postgresql-tips-performance",
    title: "PostgreSQL Performance Tips",
    excerpt:
      "Tips dan trik mengoptimalkan performa database PostgreSQL untuk production.",
    date: "2026-05-20",
    readTime: 7,
    tags: ["PostgreSQL", "Database", "Performance"],
  },
];

export const tools = [
  { id: "csv-to-json", name: "CSV to JSON", description: "Convert CSV data to JSON format", category: "converter" },
  { id: "json-formatter", name: "JSON Formatter", description: "Format and validate JSON data", category: "formatter" },
  { id: "excel-preview", name: "Excel Preview", description: "Preview Excel files online", category: "preview" },
  { id: "sql-formatter", name: "SQL Formatter", description: "Format SQL queries neatly", category: "formatter" },
  { id: "uuid-generator", name: "UUID Generator", description: "Generate random UUIDs", category: "generator" },
  { id: "password-generator", name: "Password Generator", description: "Generate secure passwords", category: "generator" },
  { id: "base64-encode", name: "Base64 Encode", description: "Encode text to Base64", category: "encode" },
  { id: "base64-decode", name: "Base64 Decode", description: "Decode Base64 to text", category: "decode" },
];

export const serverStatus = {
  cpu: { usage: 34, cores: 4 },
  ram: { used: 3.2, total: 8, unit: "GB" },
  disk: { used: 45, total: 120, unit: "GB" },
  uptime: "14d 6h 32m",
  docker: { running: 3, total: 5 },
  responseTime: "42ms",
};