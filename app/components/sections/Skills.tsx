"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { skillsData } from "@/data/skills";

export const Skills: React.FC = () => {
  return (
    <Container id="skills">
      <SectionHeading
        badgeText="KEAHLIAN TEKNIS"
        title="Ringkasan Tech Stack & Tools"
        description="Penguasaan bahasa pemrosesan data, pustaka Machine Learning, pemodelan basis data SQL, dan perkakas otomatisasi."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillsData.map((group, idx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
          >
            <Card className="space-y-4 p-6">
              <h3 className="text-base font-bold text-slate-50 font-heading border-b border-slate-700/60 pb-3">
                {group.category}
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
                      skill.level === "Advanced"
                        ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-300"
                        : "bg-slate-800 border border-slate-700 text-slate-300 opacity-80"
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};
