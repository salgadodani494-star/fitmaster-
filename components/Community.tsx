
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { UserProfile, CommunityPost } from '../types';
import { Users, Heart, MessageCircle, Share2, Sparkles, RefreshCw, Trophy, Target, Zap, Flame } from 'lucide-react';

interface CommunityProps {
  userProfile: UserProfile;
}

const Community: React.FC<CommunityProps> = ({ userProfile }) => {
  const [motivation, setMotivation] = useState<string>("El dolor es temporal, el orgullo es para siempre. Hoy superas tu versión de ayer.");
  const [isGenerating, setIsGenerating] = useState(false);
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: 'p1',
      userName: 'Carlos Hardcore',
      userImage: 'https://i.pravatar.cc/150?u=carlos',
      content: '¡Nuevo PR en Peso Muerto! 220kg por fin. El protocolo de Fit Elite funciona.',
      timestamp: Date.now() - 3600000,
      likes: 24,
      type: 'achievement'
    },
    {
      id: 'p2',
      userName: 'Elena Iron',
      userImage: 'https://i.pravatar.cc/150?u=elena',
      content: 'Día 45 de ayuno intermitente. La claridad mental es otro nivel. ¿Quién más en el Círculo de Ayuno?',
      timestamp: Date.now() - 7200000,
      likes: 12,
      type: 'motivation'
    },
    {
      id: 'p3',
      userName: 'Santi Ultra',
      userImage: 'https://i.pravatar.cc/150?u=santi',
      content: '¿Algún consejo para mejorar la recuperación post-maratón? Siento las piernas de cemento.',
      timestamp: Date.now() - 86400000,
      likes: 8,
      type: 'question'
    }
  ]);

  const generateMotivation = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Genera una frase de motivación corta, potente y agresiva (estilo militar/atleta de élite) en español para un usuario cuyo objetivo es ${userProfile.goal}. Máximo 20 palabras.`,
      });
      setMotivation(response.text || motivation);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const circles = [
    { name: 'Círculo de Fuerza', members: 1240, icon: <Flame className="w-4 h-4 text-orange-500" /> },
    { name: 'Elite Runners', members: 856, icon: <Zap className="w-4 h-4 text-yellow-400" /> },
    { name: 'Bio-Hackers', members: 2105, icon: <Sparkles className="w-4 h-4 text-cyan-400" /> }
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-1000 pb-24">
      <header className="space-y-1">
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Social Hub</h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Red de Alto Rendimiento</p>
      </header>

      {/* Motivational Hero */}
      <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group border border-violet-500/20">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
           <Trophy className="w-32 h-32 text-violet-400" />
        </div>
        <div className="relative z-10 space-y-6">
           <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase text-violet-400 tracking-[0.3em]">Grito de Guerra Diario</span>
              <button 
                onClick={generateMotivation} 
                disabled={isGenerating}
                className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all active:scale-90"
              >
                <RefreshCw className={`w-4 h-4 text-cyan-400 ${isGenerating ? 'animate-spin' : ''}`} />
              </button>
           </div>
           <blockquote className="text-xl font-black italic tracking-tight leading-tight uppercase">
             "{motivation}"
           </blockquote>
           <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Generado por Fit Elite AI Core</span>
           </div>
        </div>
      </section>

      {/* Elite Circles */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase ml-2 flex items-center gap-2">
           <Users className="w-4 h-4 text-cyan-500" />
           CÍRCULOS DE ÉLITE
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {circles.map((circle, i) => (
            <div key={i} className="flex-shrink-0 w-44 cyber-glass p-5 rounded-[2.2rem] border border-white/5 space-y-3 shadow-lg group hover:border-cyan-400/30 transition-all cursor-pointer">
              <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                {circle.icon}
              </div>
              <div>
                <h4 className="text-[11px] font-black text-white uppercase tracking-tighter">{circle.name}</h4>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{circle.members} Atletas</p>
              </div>
              <button className="w-full py-2 bg-white/5 rounded-lg text-[8px] font-black text-slate-400 uppercase tracking-widest group-hover:bg-cyan-500 group-hover:text-black transition-all">
                Unirse
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Battle Feed */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase ml-2 flex items-center gap-2">
           <Target className="w-4 h-4 text-rose-500" />
           BATTLE FEED
        </h3>
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="cyber-glass p-6 rounded-[2.5rem] border border-white/5 space-y-4 group">
               <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10">
                        <img src={post.userImage} alt={post.userName} className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-tight">{post.userName}</h4>
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Hace {Math.floor((Date.now()-post.timestamp)/60000)}m</span>
                     </div>
                  </div>
                  {post.type === 'achievement' && (
                    <div className="bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-lg">
                      <Trophy className="w-3 h-3" />
                    </div>
                  )}
               </div>
               <p className="text-xs font-bold text-slate-300 leading-relaxed uppercase tracking-wide">
                 {post.content}
               </p>
               <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <button className="flex items-center gap-1.5 text-slate-500 hover:text-cyan-400 transition-colors">
                     <Heart className="w-4 h-4" />
                     <span className="text-[10px] font-black">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-slate-500 hover:text-violet-400 transition-colors">
                     <MessageCircle className="w-4 h-4" />
                     <span className="text-[10px] font-black">4</span>
                  </button>
                  <button className="text-slate-500 hover:text-white transition-colors">
                     <Share2 className="w-4 h-4" />
                  </button>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Motivation Footer */}
      <footer className="text-center py-8">
        <button className="inline-flex items-center gap-2 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] hover:text-white transition-all">
          <Users className="w-4 h-4" />
          Conectar con Entrenadores
        </button>
      </footer>
    </div>
  );
};

export default Community;
