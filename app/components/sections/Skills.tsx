"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Cpu, Database, Wrench } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { skillsData } from "@/data/skills";

export const Skills: React.FC = () => {
  const icons = [Cpu, Database, Wrench];

  return (
    <Container id="skills">
      <SectionHeading
        badgeText="TECH STACK & KEAHLIAN"
        title="Kompetensi Teknikal Utama"
        description="Bahasa pemrosesan data, pustaka machine learning, pemodelan basis data SQL, dan perkakas otomatisasi."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillsData.map((cat, idx) => {
          const Icon = icons[idx % icons.length];

          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card className="h-full space-y-6">
                <div className="flex items-center space-x-3 border-b border-slate-800/80 pb-4">
                  <span className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="text-base font-bold text-slate-100 font-heading">
                    {cat.title}
                  </h3>
                </div>

                <ul className="space-y-3 font-sans text-sm text-slate-300">
                  {cat.skills.map((skill) => (
                    <li key={skill} className="flex items-start space-x-3 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Container>
  );
};
