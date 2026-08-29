export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  surfaceMetric: string;
  role: string;
  tools: string[];
  githubUrl: string;
  chartData?: { name: string; val: number }[];
}

export const projectsData: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Optimasi Biaya Energi Produksi Klinker Semen (ML)",
    category: "INDUSTRIAL DATA SCIENCE",
    year: "2023",
    description:
      "Model multivariate Machine Learning memprediksi konsumsi bahan bakar pada kiln produksi klinker pabrik semen untuk mendukung efisiensi operasional.",
    surfaceMetric: "Estimasi Efisiensi Energi",
    role: "Data Science Intern — PT Semen Gresik (SIG Group)",
    tools: ["Python", "Scikit-learn", "Pandas", "Power BI"],
    githubUrl: "https://github.com/vickyaditia/Optimasi-Produksi-Klinker-Prediksi-Biaya-Energi-Listrik-Solar-Batu-Bara-",
    chartData: [
      { name: "Jam 04", val: 42.1 },
      { name: "Jam 08", val: 48.5 },
      { name: "Jam 12", val: 54.2 },
      { name: "Jam 16", val: 51.0 },
      { name: "Jam 20", val: 45.8 },
    ],
  },
  {
    id: "proj-2",
    title: "Sistem Rekomendasi Program Studi ITERA (Binary PSO + KNN)",
    category: "MACHINE LEARNING",
    year: "2025",
    description:
      "Sistem rekomendasi pemilihan jurusan perguruan tinggi menggunakan seleksi fitur Binary Particle Swarm Optimization (PSO) dan klasifikasi KNN.",
    surfaceMetric: "91.8% Presisi Rekomendasi",
    role: "Peneliti Utama (Skripsi S1 Sains Data ITERA)",
    tools: ["Python", "Scikit-learn", "NumPy", "Pandas"],
    githubUrl: "https://github.com/vickyaditia/Binary-PSO-KNN-ITERA-Study-Program-Recommendation-System",
    chartData: [
      { name: "KNN Standard", val: 77.6 },
      { name: "Binary PSO + KNN", val: 91.8 },
    ],
  },
  {
    id: "proj-3",
    title: "Prediksi Kuat Tekan Semen 28 Hari (Deep MLP Neural Network)",
    category: "DEEP LEARNING",
    year: "2023",
    description:
      "Deep Multi-Layer Perceptron (Deep MLP) memprediksi kekuatan tekan semen setelah 28 hari pengeringan berdasarkan 11 variabel komposisi kimia.",
    surfaceMetric: "R² = 0.934 Neural Network",
    role: "Data Science Intern — PT Semen Gresik (SIG Group)",
    tools: ["Python", "TensorFlow", "Keras", "Scikit-learn"],
    githubUrl: "https://github.com/vickyaditia/Prediksi-Kuat-Tekan-Semen-setelah-28-hari-Menggunakan-Deep-MLP",
    chartData: [
      { name: "Epoch 10", val: 0.65 },
      { name: "Epoch 25", val: 0.82 },
      { name: "Epoch 50", val: 0.934 },
    ],
  },
  {
    id: "proj-4",
    title: "Analisis Sentimen Ulasan Pariwisata Multi-Aspek (KNN & Sastrawi)",
    category: "NATURAL LANGUAGE PROCESSING",
    year: "2023",
    description:
      "Pemrosesan bahasa alami (NLP) mengklasifikasikan ulasan wisatawan ke dalam aspek kebersihan, fasilitas, dan pelayanan menggunakan TF-IDF & Sastrawi.",
    surfaceMetric: "80.5% Akurasi Sentimen",
    role: "Peneliti Utama (Personal Project NLP)",
    tools: ["Python", "Sastrawi", "Scikit-learn", "Pandas"],
    githubUrl: "https://github.com/vickyaditia/Personal-Project-NLP-Tourism-Review-Sentiment-Analysis-using-KNN-Multi-Output-Classification",
    chartData: [
      { name: "Kebersihan", val: 84.2 },
      { name: "Fasilitas", val: 78.5 },
      { name: "Pelayanan", val: 79.8 },
    ],
  },
];
