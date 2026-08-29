"use client";

import React from "react";
import { Mail, Github, Linkedin, MessageSquare, Download } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

export const Contact: React.FC = () => {
  return (
    <Container id="contact">
      <SectionHeading
        badgeText="KONTAK & KOLABORASI"
        title="Mari Diskusikan Proyek Data Anda"
        description="Terbuka untuk peluang karir sebagai Data Scientist, Data Analyst, maupun kolaborasi otomatisasi pipeline data."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="space-y-6">
          <h3 className="text-xl font-bold text-slate-50 font-heading">
            Saluran Kontak Direct
          </h3>
          <div className="space-y-4 font-sans text-sm">
            <a
              href="mailto:aditia.vicky14@gmail.com"
              className="flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>aditia.vicky14@gmail.com</span>
            </a>

            <a
              href="https://github.com/vickyaditia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <Github className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>github.com/vickyaditia</span>
            </a>

            <a
              href="https://www.linkedin.com/in/vicky-aditia-7b96081a4/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <Linkedin className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>linkedin.com/in/vicky-aditia</span>
            </a>

            <a
              href="https://wa.me/6281273934371"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>WhatsApp / Chat Direct</span>
            </a>
          </div>
        </Card>

        <Card className="flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-50 font-heading">
              Unduh Curriculum Vitae (PDF)
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Dapatkan salinan CV format ATS standar 1 halaman lengkap dengan riwayat proyek industri dan pendidikan.
            </p>
          </div>

          <Button
            href="/docs/CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="CV_Vicky_Aditia_Data_Scientist.pdf"
            variant="primary"
            size="lg"
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            Download CV ATS (PDF)
          </Button>
        </Card>
      </div>
    </Container>
  );
};
