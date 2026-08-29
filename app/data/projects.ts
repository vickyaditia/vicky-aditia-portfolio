export interface ProjectStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  problemStatement: string;
  impactMetric: string;
  impactDescription: string;
  techStack: string[];
  projectUrl: string;
  urlLabel: string;
  steps: ProjectStep[];
  chartData?: { name: string; val: number }[];
}

export const projectsData: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Klasifikasi SKB STMKG 2024 (Machine Learning)",
    category: "Machine Learning / Analytics",
    problemStatement:
      "Prediksi kelulusan Seleksi Kompetensi Bidang (SKB) STMKG 2024 berbasis integrasi skor akademis & tes fisik.",
    impactMetric: "92.4% Akurasi Model",
    impactDescription:
      "Mencapai Akurasi 92.4% dan Recall 93.2% untuk memprediksi potensi kelulusan peserta seleksi STMKG.",
    techStack: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Kaggle"],
    projectUrl: "https://www.kaggle.com/code/vickyaditia/klasifikasi-skb-stmkg-2024",
    urlLabel: "Lihat Notebook Kaggle",
    steps: [
      {
        stepNumber: 1,
        title: "Formulasi Masalah & EDA Data Peserta",
        description: "Eksplorasi distribusi nilai TPA, SKD, tes fisik, dan wawancara peserta seleksi STMKG 2024.",
      },
      {
        stepNumber: 2,
        title: "Preprocessing & Normalisasi Fitur",
        description: "Pembersihan missing values, seleksi fitur dominan, dan penanganan imbalansi kelas.",
      },
      {
        stepNumber: 3,
        title: "Benchmarking Algoritma Klasifikasi",
        description: "Pelatihan dan komparasi performa Random Forest, XGBoost, CatBoost, dan KNN Classifier.",
      },
      {
        stepNumber: 4,
        title: "Tuning Hyperparameter & Cross Validation",
        description: "Optimasi hyperparameter menggunakan RandomizedSearchCV & 5-Fold Cross Validation.",
      },
      {
        stepNumber: 5,
        title: "Evaluasi Model & Matriks Keputusan",
        description: "Mencapai Precision 91.5% dan Recall 93.2% untuk mendukung sistem peringkat otomatis.",
      },
    ],
    chartData: [
      { name: "KNN Baseline", val: 81.2 },
      { name: "Random Forest", val: 88.5 },
      { name: "XGBoost Tuned", val: 92.4 },
    ],
  },
  {
    id: "proj-2",
    title: "Optimasi Produksi Klinker & Prediksi Biaya Energi (Batu Bara, Solar, Listrik)",
    category: "Industrial Data Science",
    problemStatement:
      "Fluktuasi konsumsi batu bara, solar, dan listrik pada kiln semen memicu variansi biaya produksi energi yang tinggi.",
    impactMetric: "Estimasi Efisiensi Energi",
    impactDescription:
      "Memodelkan skenario operasional kiln untuk mengendalikan konsumsi batu bara, solar, dan kWh listrik.",
    techStack: ["Python", "Scikit-learn", "Gradient Boosting", "Pandas", "Power BI"],
    projectUrl: "https://github.com/vickyaditia/Optimasi-Produksi-Klinker-Prediksi-Biaya-Energi-Listrik-Solar-Batu-Bara-/blob/main/Code.ipynb",
    urlLabel: "Lihat Code.ipynb GitHub",
    steps: [
      {
        stepNumber: 1,
        title: "Telemetri IoT Ingestion & Cleaning",
        description: "Pengolahan 14,200+ baris data sensor kiln (suhu, feed rate, tekanan udara, RPM pembakaran).",
      },
      {
        stepNumber: 2,
        title: "Pemodelan Multi-Fuel Multivariate",
        description: "Identifikasi korelasi non-linear antara variabel kontrol kiln dan konsumsi batu bara & kWh.",
      },
      {
        stepNumber: 3,
        title: "Benchmarking Regresi Machine Learning",
        description: "Pelatihan Gradient Boosting Regressor & Random Forest Regressor untuk estimasi biaya energi.",
      },
      {
        stepNumber: 4,
        title: "Skenario Optimasi Pembakaran Kiln",
        description: "Simulasi matriks skenario operasional steady-state kiln untuk meminimalkan waste panas.",
      },
      {
        stepNumber: 5,
        title: "Evaluasi Hasil & Dashboard Engineer",
        description: "Menghasilkan rekomendasi parameter operasional kiln bagi tim engineer pabrik semen SIG.",
      },
    ],
    chartData: [
      { name: "Jam 04", val: 42.1 },
      { name: "Jam 08", val: 48.5 },
      { name: "Jam 12", val: 54.2 },
      { name: "Jam 16", val: 51.0 },
      { name: "Jam 20", val: 45.8 },
    ],
  },
  {
    id: "proj-3",
    title: "Prediksi Kuat Tekan Semen 28 Hari Kedepan (Deep MLP Neural Network)",
    category: "Deep Learning",
    problemStatement:
      "Pengujian laboratorium fisik kuat tekan semen membutuhkan waktu penantian 28 hari sebelum distribusi batch.",
    impactMetric: "R² = 0.934 Neural Network",
    impactDescription:
      "Memungkinkan tim Quality Control mengestimasi mutu semen secara instan via Deep Learning.",
    techStack: ["Python", "TensorFlow", "Keras", "Deep MLP", "Scikit-learn"],
    projectUrl: "https://github.com/vickyaditia/Prediksi-Kuat-Tekan-Semen-setelah-28-hari-Menggunakan-Deep-MLP/blob/main/Prediksi%20Kuat%20Tekan%2028%20hari%20kedepan.ipynb",
    urlLabel: "Lihat Notebook Deep MLP GitHub",
    steps: [
      {
        stepNumber: 1,
        title: "Normalisasi 11 Fitur Kimia QC Lab",
        description: "Preprocessing rasio klinker, gypsum, silica, slag, dan water-cement ratio laboratorium.",
      },
      {
        stepNumber: 2,
        title: "Perancangan Jaringan Deep MLP",
        description: "Desain arsitektur Multi-Layer Perceptron 4-layer dengan fungsi aktivasi ReLU & Dropout 0.2.",
      },
      {
        stepNumber: 3,
        title: "Pengoptimalan Pelatihan TensorFlow",
        description: "Pelatihan Adam Optimizer dengan loss MSE dan Callback Early Stopping untuk mencegah overfitting.",
      },
      {
        stepNumber: 4,
        title: "Evaluasi Skor R² & RMSE",
        description: "Mencapai R² Score = 0.934 dan Low RMSE pada sampel pengujian pengeringan semen.",
      },
      {
        stepNumber: 5,
        title: "Integrasi Decision Support System QC",
        description: "Memungkinkan tim QC meluluskan batch semen instan tanpa mengganggu rantai pasok pabrik.",
      },
    ],
    chartData: [
      { name: "Epoch 10", val: 0.65 },
      { name: "Epoch 25", val: 0.82 },
      { name: "Epoch 50", val: 0.934 },
    ],
  },
];
