export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Data Science & Machine Learning",
    skills: [
      "Python (Pandas, NumPy, Scikit-learn)",
      "TensorFlow / Keras (Deep Learning & MLP)",
      "Time-Series Forecasting (LSTM & Prophet)",
      "Particle Swarm Optimization (PSO & KNN)",
      "NLP & Stemming (TF-IDF & Sastrawi)",
    ],
  },
  {
    title: "Data Analytics & SQL Databases",
    skills: [
      "SQL (PostgreSQL, MySQL, Query Optimization)",
      "Power BI (DAX Measures & Star Schema)",
      "Excel Power Query & Openpyxl Automation",
      "Exploratory Data Analysis (EDA & Seaborn)",
      "Data Validation & Pipeline Anomaly Checks",
    ],
  },
  {
    title: "Automation & Development Tools",
    skills: [
      "Git & GitHub Version Control",
      "Cron Schedulers & Batch Automation",
      "MongoDB & Document Databases",
      "FTP / API Automated Ingestion Pipelines",
      "Jupyter & Modular Python Scripting",
    ],
  },
];
