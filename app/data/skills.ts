export interface SkillItem {
  name: string;
  level: "Advanced" | "Proficient";
}

export interface SkillCategoryGroup {
  category: string;
  skills: SkillItem[];
}

export const skillsData: SkillCategoryGroup[] = [
  {
    category: "Data Analytics & SQL",
    skills: [
      { name: "SQL (PostgreSQL, MySQL)", level: "Advanced" },
      { name: "Exploratory Data Analysis (EDA)", level: "Advanced" },
      { name: "Data Validation & Pipeline Checks", level: "Proficient" },
      { name: "Business Intelligence Reporting", level: "Advanced" },
    ],
  },
  {
    category: "Machine Learning & AI",
    skills: [
      { name: "Python (Scikit-learn, Pandas, NumPy)", level: "Advanced" },
      { name: "TensorFlow / Keras (Deep MLP)", level: "Proficient" },
      { name: "Particle Swarm Optimization (PSO)", level: "Proficient" },
      { name: "NLP & Indonesian Stemming (Sastrawi)", level: "Proficient" },
    ],
  },
  {
    category: "Data Visualization & Dashboards",
    skills: [
      { name: "Tableau (Calculated Fields & Visual Analytics)", level: "Advanced" },
      { name: "Matplotlib & Seaborn Analytics", level: "Advanced" },
      { name: "Excel Power Query Automation", level: "Advanced" },
    ],
  },
  {
    category: "Data Engineering & Tools",
    skills: [
      { name: "Git & GitHub Version Control", level: "Advanced" },
      { name: "Cron Schedulers & Batch Automation", level: "Proficient" },
      { name: "Jupyter Notebook & Scripting", level: "Advanced" },
      { name: "MongoDB & Document Databases", level: "Proficient" },
    ],
  },
];
