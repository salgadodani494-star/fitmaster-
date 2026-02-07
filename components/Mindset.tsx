
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { UserProfile } from '../types';
import { Sparkles, Brain, Quote, RefreshCw, Flame, Wind, Eye } from 'lucide-react';

interface MindsetProps {
  userProfile: UserProfile;
}

const Mindset: React.FC<MindsetProps> = ({ userProfile }) => {
  const [mantra, setMantra] = useState<string>("Tus límites son solo ilusiones que has aceptado como verdades.");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMantra = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Genera una frase de mentalidad para un atleta de alto rendimiento. Objetivo: ${userProfile.goal}. Tono: Estoico, poderoso, corto. Máximo 15 palabras. En español.`,
      });
      setMantra(response.text || mantra);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 space-y-10 animate-in fade-in duration-1000 pb-20">
      <header className="space-y-1">
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Mindset</h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Entrenamiento Psicológico</p>
      </header>

      {/* Hero Mantra */}
      <section className="relative min-h-[300px] flex flex-col items-center justify-center text-center p-10 bg-slate-900/50 rounded-[3rem] border border-violet-500/20 shadow-2xl overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-500/10 opacity-50"></div>
         <div className="absolute top-8 left-8">
            <Quote className="w-12 h-12 text-violet-500/20 rotate-180" />
         </div>
         <div className="absolute bottom-8 right-8">
            <Quote className="w-12 h-12 text-cyan-500/20" />
         </div>
         
         <div className="relative z-10 space-y-8">
            <Brain className="w-10 h-10 text-violet-400 mx-auto animate-pulse" />
            <h3 className="text-2xl font-black text-white tracking-tight uppercase leading-tight px-4 italic">
               "{mantra}"
            </h3>
            <button 
              onClick={generateMantra}
              disabled={isGenerating}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-violet-600 hover:text-white transition-all active:scale-95 mx-auto"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-cyan-400" />}
              Nuevo Mantra AI
            </button>
         </div>
      </section>

      {/* Mental Training Drills */}
      <section className="space-y-6">
        <h3 className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase ml-2 flex items-center gap-2">
           <Eye className="w-4 h-4 text-cyan-400" />
           DRILLS MENTALES
        </h3>
        <div className="grid gap-4">
           <DrillCard 
             icon={<Wind className="w-5 h-5 text-cyan-400" />}
             title="Respiración Táctica"
             desc="4s inhalar, 4s retener, 4s exhalar. Reduce el cortisol al instante."
             duration="5 min"
           />
           <DrillCard 
             icon={<Flame className="w-5 h-5 text-rose-500" />}
             title="Visualización del Éxito"
             desc="Cierra los ojos y vive la victoria final de tu entrenamiento."
             duration="3 min"
           />
        </div>
      </section>

      {/* Stoic Principles */}
      <section className="bg-white/5 rounded-[2.5rem] p-8 border border-white/5 space-y-4">
         <h4 className="text-xs font-black text-violet-400 uppercase tracking-[0.2em]">Principio del Día</h4>
         <p className="text-sm font-bold text-slate-300 uppercase italic leading-relaxed">
            "No es lo que te sucede, sino cómo reaccionas a ello lo que importa."
         </p>
         <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">— Epicteto</span>
      </section>
    </div>
  );
};

const DrillCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; duration: string }> = ({ icon, title, desc, duration }) => (
  <div className="cyber-glass p-6 rounded-[2.2rem] border border-white/5 flex items-center gap-5 group hover:border-cyan-400/20 transition-all cursor-pointer">
     <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
        {icon}
     </div>
     <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
           <h4 className="text-xs font-black text-white uppercase tracking-tight">{title}</h4>
           <span className="text-[8px] font-black text-cyan-400">{duration}</span>
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase leading-snug">{desc}</p>
     </div>
  </div>
);

export default Mindset;
