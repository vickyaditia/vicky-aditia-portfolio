export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  problemStatement: string;
  impactMetric: string;
  impactDescription: string;
  techStack: string[];
  githubUrl: string;
  imageUrl?: string;
  chartData?: { name: string; val: number }[];
}

export const projectsData: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Optimasi Biaya Energi Produksi Klinker Semen (ML)",
    category: "Industrial Data Science",
    problemStatement:
      "Fluktuasi konsumsi batu bara, solar, dan listrik pada kiln semen memicu variansi biaya produksi energi yang tinggi.",
    impactMetric: "Model Prediksi Efisiensi Biaya",
    impactDescription:
      "Memberikan rekomendasi skenario operasional kiln untuk mengendalikan biaya bahan bakar pabrik semen.",
    techStack: ["Python", "Scikit-learn", "Pandas", "Power BI"],
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
    category: "Machine Learning",
    problemStatement:
      "Tingginya dimensi variabel akademis calon mahasiswa membuat algoritma klasifikasi standar kurang presisi.",
    impactMetric: "91.8% Presisi Rekomendasi",
    impactDescription:
      "Meningkatkan akurasi rekomendasi jurusan perguruan tinggi sebesar +14.2% dibanding KNN tanpa seleksi fitur.",
    techStack: ["Python", "Scikit-learn", "NumPy", "Pandas"],
    githubUrl: "https://github.com/vickyaditia/Binary-PSO-KNN-ITERA-Study-Program-Recommendation-System",
    chartData: [
      { name: "KNN Standard", val: 77.6 },
      { name: "Binary PSO + KNN", val: 91.8 },
    ],
  },
  {
    id: "proj-3",
    title: "Prediksi Kuat Tekan Semen 28 Hari (Deep MLP)",
    category: "Deep Learning",
    problemStatement:
      "Pengujian laboratorium fisik kuat tekan semen membutuhkan waktu penantian 28 hari sebelum distribusi.",
    impactMetric: "R² = 0.934 Neural Network",
    impactDescription:
      "Memungkinkan tim QC mengestimasi mutu semen secara instan berdasarkan 11 variabel komposisi kimia.",
    techStack: ["Python", "TensorFlow", "Keras", "Scikit-learn"],
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
    category: "Natural Language Processing",
    problemStatement:
      "Volume ulasan teks informal bahasa Indonesia yang tinggi sulit dikategorikan secara manual oleh pengelola destinasi.",
    impactMetric: "80.5% Akurasi Sentimen",
    impactDescription:
      "Mengotomatiskan klasifikasi ulasan wisatawan ke dalam aspek kebersihan, fasilitas, dan pelayanan.",
    techStack: ["Python", "Sastrawi", "Scikit-learn", "Pandas"],
    githubUrl: "https://github.com/vickyaditia/Personal-Project-NLP-Tourism-Review-Sentiment-Analysis-using-KNN-Multi-Output-Classification",
    chartData: [
      { name: "Kebersihan", val: 84.2 },
      { name: "Fasilitas", val: 78.5 },
      { name: "Pelayanan", val: 79.8 },
    ],
  },
];
