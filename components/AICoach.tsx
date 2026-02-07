
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Send, Bot, User, Loader2, Wand2, Sparkles } from 'lucide-react';
import { WorkoutPlan } from '../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AICoachProps {
  onPlanGenerated: (plan: WorkoutPlan) => void;
}

const AICoach: React.FC<AICoachProps> = ({ onPlanGenerated }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'assistant', 
      content: '¡Listo para el combate! Soy tu sistema de entrenamiento táctico. ¿Generamos tu nueva sesión con videos explicativos hoy?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const generatePlan = async () => {
    setIsLoading(true);
    setMessages(prev => [...prev, { id: 'user-plan', role: 'user', content: 'Genera un protocolo de alta intensidad con tutoriales.' }]);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: 'Genera una rutina avanzada de gimnasio. Devuelve un objeto JSON con title y exercises. Cada ejercicio debe tener: name, sets, reps, muscleGroup, description (explicación técnica detallada), proTips (array de 3 consejos clave), videoUrl (un link de YouTube embed válido como "https://www.youtube.com/embed/XXXXX" para ese ejercicio), e imageKey (palabra clave en inglés).',
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              exercises: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    sets: { type: Type.NUMBER },
                    reps: { type: Type.NUMBER },
                    muscleGroup: { type: Type.STRING },
                    description: { type: Type.STRING },
                    proTips: { type: Type.ARRAY, items: { type: Type.STRING } },
                    videoUrl: { type: Type.STRING },
                    imageKey: { type: Type.STRING }
                  },
                  required: ['name', 'sets', 'reps', 'muscleGroup', 'description', 'imageKey', 'videoUrl']
                }
              }
            },
            required: ['title', 'exercises']
          }
        }
      });

      const planData = JSON.parse(response.text);
      const newPlan: WorkoutPlan = {
        id: Date.now().toString(),
        title: planData.title,
        date: Date.now(),
        exercises: planData.exercises.map((e: any, i: number) => ({ ...e, id: `ai-${i}`, completed: false }))
      };

      onPlanGenerated(newPlan);
      setMessages(prev => [...prev, { id: 'ai-done', role: 'assistant', content: `Protocolo "${newPlan.title}" activado. He incluido videos técnicos para que cada repetición sea perfecta. ¡A por ello!` }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: 'error', role: 'assistant', content: 'Falla en el enlace táctico. Reintentando...' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: 'Eres el Coach AI de Fit Elite. Eres directo, motivador y experto técnico. Siempre explicas por qué un ejercicio es bueno. Responde en español con un tono profesional y dinámico.',
        }
      });
      setMessages(prev => [...prev, { id: (Date.now()+1).toString(), role: 'assistant', content: response.text || 'Protocolo sin respuesta.' }]);
    } catch (e) {
      setMessages(prev => [...prev, { id: 'err', role: 'assistant', content: 'Error de enlace con el servidor central.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-hide">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 border ${msg.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-slate-900 text-cyan-400 border-cyan-400/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`p-5 rounded-[1.8rem] text-sm shadow-xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'cyber-glass text-slate-200 rounded-tl-none border border-white/10'}`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center border border-white/5">
                <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
             </div>
          </div>
        )}
      </div>

      <div className="p-5 bg-black/40 backdrop-blur-3xl border-t border-white/5 space-y-4 pb-20">
        {!isLoading && (
           <button 
             onClick={generatePlan} 
             className="w-full group flex items-center justify-center gap-3 bg-gradient-to-r from-violet-600 to-cyan-500 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all relative overflow-hidden"
           >
             <div className="absolute inset-0 bg-white/10 group-hover:translate-x-full transition-transform duration-700"></div>
             <Sparkles className="w-4 h-4 animate-pulse" />
             REDISEÑAR PROTOCOLO TÉCNICO (CON VIDEO)
           </button>
        )}
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Comando de voz/texto..."
            className="w-full bg-slate-900/50 border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-sm font-bold text-white outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all"
          />
          <button onClick={sendMessage} disabled={isLoading || !input.trim()} className="absolute right-2 top-2 bottom-2 w-12 bg-cyan-500 text-black rounded-xl flex items-center justify-center hover:bg-cyan-400 active:scale-90 transition-all">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICoach;
