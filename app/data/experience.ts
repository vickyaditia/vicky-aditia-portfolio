export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  type: "Work" | "Education" | "Teaching";
  highlights: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    company: "PT. Depoguna Bangunan Online (DBO)",
    role: "Business Partner Consultant / Data Analyst",
    period: "Feb 2026 – Present",
    type: "Work",
    highlights: [
      "Mengelola pipeline data penjualan otomatis untuk 7 brand produk utama (Rucika, Granito, Djabesmen, dll).",
      "Mengoptimalkan query SQL PostgreSQL dan visualisasi dashboard Tableau.",
    ],
  },
  {
    company: "PT Semen Gresik (SIG Group)",
    role: "Data Science Intern",
    period: "Jun 2023 – Aug 2023",
    type: "Work",
    highlights: [
      "Membangun model Machine Learning optimasi konsumsi bahan bakar (batu bara, solar, listrik) kiln semen.",
      "Mengembangkan model Deep MLP untuk memprediksi kuat tekan semen 28 hari dengan R² = 0.934.",
    ],
  },
  {
    company: "Institut Teknologi Sumatera (ITERA)",
    role: "Asisten Praktikum Sains Data",
    period: "Feb 2023 – Jun 2023",
    type: "Teaching",
    highlights: [
      "Membimbing 50+ mahasiswa dalam praktikum Pemrograman Python, Struktur Data, dan Statistika.",
    ],
  },
  {
    company: "Institut Teknologi Sumatera (ITERA)",
    role: "S1 Sains Data (S.Si. Sains Data)",
    period: "Graduation: Jun 2025",
    type: "Education",
    highlights: [
      "IPK: 3.09 / 4.00",
      "Skripsi: Klasifikasi Seleksi SKB STMKG & Sistem Rekomendasi Program Studi ITERA (Presisi 91.8%).",
    ],
  },
];
