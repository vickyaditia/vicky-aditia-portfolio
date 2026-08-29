"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { experienceData } from "@/data/experience";

export const Experience: React.FC = () => {
  return (
    <Container id="experience">
      <SectionHeading
        badgeText="PENGALAMAN & PENDIDIKAN"
        title="Rekam Jejak Karir & Akademis"
        description="Pengalaman profesional di industri ritel modern DBO, industri manufaktur semen SIG, serta latar belakang akademis Sains Data ITERA."
      />

      <div className="space-y-6">
        {experienceData.map((item, idx) => (
          <motion.div
            key={item.company + item.role}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Card className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center space-x-3">
                  <span className="p-2 rounded bg-emerald-500/10 text-emerald-400">
                    {item.type === "Work" ? (
                      <Briefcase className="w-4 h-4" />
                    ) : (
                      <GraduationCap className="w-4 h-4" />
                    )}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 font-heading">
                      {item.role}
                    </h3>
                    <p className="text-xs font-mono text-emerald-400">{item.company}</p>
                  </div>
                </div>
                <Badge variant="slate">{item.period}</Badge>
              </div>

              <ul className="space-y-2 text-sm text-slate-300 font-sans pl-2">
                {item.highlights.map((h, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-mono">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};
