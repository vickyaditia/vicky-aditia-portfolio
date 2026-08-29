"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Badge } from "../ui/Badge";
import { experienceData } from "@/data/experience";

export const Experience: React.FC = () => {
  return (
    <Container id="experience">
      <SectionHeading
        badgeText="PENGALAMAN & PENDIDIKAN"
        title="Rekam Jejak Karir & Akademis"
        description="Pengalaman profesional di industri ritel modern DBO, industri manufaktur semen SIG Group, serta pendidikan Sains Data ITERA."
      />

      <div className="relative border-l-2 border-slate-700/80 ml-3 md:ml-6 space-y-10 pl-6 md:pl-10">
        {experienceData.map((item, idx) => (
          <motion.div
            key={item.company + item.role}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="relative space-y-3"
          >
            {/* Timeline Connector Emerald Dot */}
            <span className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </span>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-50 font-heading">
                  {item.role}
                </h3>
                <p className="text-sm font-semibold text-emerald-400 font-sans">
                  {item.company}
                </p>
              </div>
              <Badge variant="slate">{item.period}</Badge>
            </div>

            <ul className="space-y-2 text-sm text-slate-300 font-sans">
              {item.highlights.map((bullet, i) => (
                <li key={i} className="flex items-start space-x-2 leading-relaxed">
                  <span className="text-emerald-400">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};
