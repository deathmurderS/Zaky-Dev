export const profile = {
  name: "Muhammad Zaky Zamzami",
  nameEn: "MUHAMMAD\nMUZAZ",
  nameJp: "ムハンマド ザキ ザムザミ",
  role: "Data Analyst & Data Entry",
  email: "zakychen558@gmail.com",
  domain: "muzaz.dev",
  bio: "Analis data yang teliti dalam mengolah, membersihkan, dan menyajikan data menjadi insight yang bermanfaat. Terbiasa bekerja dengan spreadsheet, SQL, dan tools visualisasi data.",
  focus: "Excel · SQL · Python · Data Cleaning · Visualisasi Data · Entry Data",
  location: "Indonesia",
  avatar: "/anime-girl.jpg",

  stats: {
    technologies: "8+",
    activeProjects: "3+",
    problemScore: "95",
    curiosity: "∞",
  },

  skills: [
    { name: "Data Entry & Accuracy", value: 95 },
    { name: "Excel & Spreadsheet", value: 90 },
    { name: "SQL & Database", value: 85 },
    { name: "Data Cleaning", value: 82 },
    { name: "Data Visualization", value: 80 },
    { name: "Python (Pandas)", value: 78 },
  ],

  techStack: [
    { name: "Excel", accent: true },
    { name: "SQL", accent: true },
    { name: "Python", accent: true },
    { name: "Pandas", accent: true },
    { name: "Google Sheets", accent: false },
    { name: "Tableau", accent: false },
    { name: "Power BI", accent: false },
    { name: "Notion", accent: false },
    { name: "Airtable", accent: false },
    { name: "Git", accent: false },
  ],

  social: {
    github: "https://github.com/deathmurderS",
    linkedin: "https://www.linkedin.com/in/muhammad-zaky-zamzami-b872b7306/",
  },

  personality: {
    title: "Siapa Muhammad Zaky Zamzami?",
    description:
      "Seorang analis data yang teliti, detail-oriented, dan menikmati proses mengubah data mentah menjadi informasi yang bermakna.",
    traits: [
      {
        icon: "search",
        title: "Teliti & Detail",
        desc: "Selalu memeriksa keakuratan data dan memastikan tidak ada kesalahan dalam setiap pekerjaan.",
      },
      {
        icon: "cog",
        title: "Suka Mengolah Data",
        desc: "Menikmati proses membersihkan, mengorganisir, dan menganalisis data untuk menemukan pola.",
      },
      {
        icon: "zap",
        title: "Cepat & Efisien",
        desc: "Mampu bekerja cepat tanpa mengorbankan akurasi, terutama untuk tugas data entry.",
      },
      {
        icon: "star",
        title: "Standar Tinggi",
        desc: "Tidak cepat puas, selalu ingin hasil yang rapi, akurat, dan profesional.",
      },
    ],
  },
};

export const projects = [
  {
    id: "sales-dashboard",
    title: "Sales Dashboard",
    description:
      "Dashboard interaktif untuk menganalisis penjualan bulanan, tren produk, dan performa tim menggunakan Excel & Power BI.",
    longDescription:
      "Dashboard analisis penjualan yang mengolah data mentah menjadi visualisasi yang mudah dipahami. Mencakup tren penjualan, produk terlaris, dan analisis performa per wilayah.",
    image: "/projects/dashboard-generator.svg",
    tags: ["Excel", "Power BI", "SQL", "Data Visualization"],
    links: {
      github: "https://github.com/deathmurderS",
      demo: "#",
      docs: "#",
    },
    stats: { stars: 12, forks: 3, issues: 2 },
    features: [
      "Analisis tren penjualan",
      "Visualisasi interaktif",
      "Laporan otomatis",
      "Filter multi-dimensi",
    ],
  },
  {
    id: "data-cleaning-pipeline",
    title: "Data Cleaning Pipeline",
    description:
      "Pipeline otomatis untuk membersihkan dan menstandarisasi data mentah menggunakan Python & Pandas.",
    longDescription:
      "Sistem otomatis yang membersihkan data mentah dari berbagai sumber — menghapus duplikat, mengisi nilai kosong, dan menstandarisasi format sebelum dianalisis.",
    image: "/projects/datapulse.svg",
    tags: ["Python", "Pandas", "SQL", "ETL"],
    links: {
      github: "https://github.com/deathmurderS",
      demo: "#",
      docs: "#",
    },
    stats: { stars: 8, forks: 2, issues: 1 },
    features: [
      "Auto-deduplication",
      "Handle missing values",
      "Standardisasi format",
      "Export multi-format",
    ],
  },
  {
    id: "inventory-tracker",
    title: "Inventory Tracker",
    description:
      "Sistem tracking stok barang dengan Google Sheets & Airtable untuk memudahkan data entry dan monitoring.",
    longDescription:
      "Aplikasi tracking inventaris yang memudahkan input data stok, memantau pergerakan barang, dan menghasilkan laporan stok secara otomatis.",
    image: "/projects/monitoring.svg",
    tags: ["Google Sheets", "Airtable", "Data Entry", "Automation"],
    links: {
      github: "#",
      demo: "#",
      docs: "#",
    },
    stats: { stars: 5, forks: 1, issues: 0 },
    features: [
      "Input data cepat",
      "Tracking real-time",
      "Laporan otomatis",
      "Multi-user support",
    ],
  },
];

export const serverStatus = {
  cpu: { usage: 34, cores: 4 },
  ram: { used: 3.2, total: 8, unit: "GB" },
  disk: { used: 45, total: 120, unit: "GB" },
  uptime: "14d 6h 32m",
  docker: { running: 3, total: 5 },
  responseTime: "42ms",
};