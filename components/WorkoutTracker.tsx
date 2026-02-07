
import React, { useState, useEffect } from 'react';
import { WorkoutPlan, Exercise } from '../types';
import { Play, CheckCircle, Plus, Activity, Dumbbell, Timer, Pause, X, Info, Lightbulb, Youtube } from 'lucide-react';

interface WorkoutTrackerProps {
  workouts: WorkoutPlan[];
  addWorkout: (plan: WorkoutPlan) => void;
  toggleExercise: (planId: string, exerciseId: string) => void;
}

const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({ workouts, toggleExercise }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(workouts[0]?.id || null);
  const [showTimer, setShowTimer] = useState(false);
  const selectedPlan = workouts.find(w => w.id === selectedPlanId);

  return (
    <div className="p-6 space-y-6 animate-in slide-in-from-right-8 duration-500 pb-20">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Protocolos</h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Sistemas de Fuerza</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowTimer(true)} className="bg-violet-600 text-white p-4 rounded-2xl shadow-xl active:scale-95 transition-all">
            <Timer className="w-5 h-5" />
          </button>
          <button className="bg-white/5 border border-white/10 text-white p-4 rounded-2xl shadow-xl active:scale-95 transition-all">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {workouts.map(plan => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlanId(plan.id)}
            className={`flex-shrink-0 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
              selectedPlanId === plan.id 
                ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]' 
                : 'cyber-glass text-slate-500 border border-white/5'
            }`}
          >
            {plan.title}
          </button>
        ))}
      </div>

      {selectedPlan ? (
        <div className="space-y-6">
          <div className="cyber-glass p-8 rounded-[2.5rem] border border-white/10 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center relative z-10">
               <h3 className="font-black text-white uppercase text-sm tracking-tighter">Progreso de Sesión</h3>
               <span className="text-3xl font-black text-cyan-400">
                {Math.round((selectedPlan.exercises.filter(e => e.completed).length / selectedPlan.exercises.length) * 100)}%
               </span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full mt-4 overflow-hidden relative z-10">
               <div className="h-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${(selectedPlan.exercises.filter(e => e.completed).length / selectedPlan.exercises.length) * 100}%` }}></div>
            </div>
          </div>

          <div className="space-y-4">
            {selectedPlan.exercises.map(exercise => (
              <ExerciseRow 
                key={exercise.id} 
                exercise={exercise} 
                onToggle={() => toggleExercise(selectedPlan.id, exercise.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="cyber-glass rounded-[2.5rem] p-16 text-center border-dashed border-white/10 opacity-30">
          <Dumbbell className="w-12 h-12 mx-auto mb-4" />
          <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Sin protocolos activos</p>
        </div>
      )}

      {showTimer && <WorkoutTimer onClose={() => setShowTimer(false)} />}
    </div>
  );
};

const WorkoutTimer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: any = null;
    if (isActive) interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-x-0 bottom-24 flex justify-center px-6 z-[60] animate-in slide-in-from-bottom-12 duration-500">
      <div className="w-full max-w-[340px] bg-slate-900 border border-violet-500/30 rounded-[2rem] p-6 shadow-2xl flex items-center justify-between backdrop-blur-3xl">
        <div className="flex items-center gap-4">
           <Timer className="w-6 h-6 text-violet-400 animate-pulse" />
           <h4 className="text-2xl font-black text-white tabular-nums">{formatTime(seconds)}</h4>
        </div>
        <div className="flex gap-2">
           <button onClick={() => setIsActive(!isActive)} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white">
             {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
           </button>
           <button onClick={onClose} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-500">
             <X className="w-4 h-4" />
           </button>
        </div>
      </div>
    </div>
  );
};

const ExerciseRow: React.FC<{ exercise: Exercise; onToggle: () => void }> = ({ exercise, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const photoId = exercise.imageKey || exercise.name.split(' ')[0].toLowerCase();
  const imageUrl = `https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=400&q=${photoId}`;

  return (
    <div className={`cyber-glass rounded-[2rem] border transition-all duration-300 ${
      exercise.completed ? 'border-emerald-500/50 opacity-60' : 'border-white/5 hover:border-cyan-400/20'
    }`}>
      <div className="p-4 flex items-center gap-4">
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden group cursor-pointer border border-white/5 bg-black"
        >
          <img src={imageUrl} alt={exercise.name} className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
          <Play className="text-white w-5 h-5 relative z-10 fill-white/20 group-hover:scale-110 transition-transform" />
        </div>

        <div className="flex-1 min-w-0" onClick={() => setIsExpanded(!isExpanded)}>
          <h4 className="font-black text-white truncate text-sm uppercase tracking-tight">{exercise.name}</h4>
          <p className="text-[10px] font-bold text-slate-500">{exercise.sets}x{exercise.reps} • <span className="text-cyan-400/80">{exercise.muscleGroup}</span></p>
        </div>

        <button onClick={(e) => { e.stopPropagation(); onToggle(); }} className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
          exercise.completed ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-white/5 text-slate-700 border border-white/5 hover:text-white'
        }`}>
          <CheckCircle className="w-6 h-6" />
        </button>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 animate-in slide-in-from-top-4 duration-500 space-y-4">
           {/* Professional Video Player */}
           <div className="aspect-video bg-black rounded-[1.5rem] overflow-hidden relative border border-white/10 shadow-2xl">
              {exercise.videoUrl ? (
                <iframe 
                  className="w-full h-full"
                  src={`${exercise.videoUrl}?autoplay=0&controls=1&rel=0&modestbranding=1`} 
                  title={exercise.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <Youtube className="w-12 h-12 mb-2 opacity-20" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Video No Disponible</span>
                </div>
              )}
           </div>

           {/* Explained Execution */}
           <div className="grid gap-3">
             <div className="bg-white/5 p-5 rounded-[1.5rem] border border-white/5 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-3 text-cyan-400">
                  <Info className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Instrucciones de Élite</span>
                </div>
                <p className="text-[11px] text-slate-300 font-bold leading-relaxed uppercase tracking-wider">
                  {exercise.description}
                </p>
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <Activity className="w-12 h-12" />
                </div>
             </div>

             {exercise.proTips && exercise.proTips.length > 0 && (
               <div className="bg-violet-600/5 p-5 rounded-[1.5rem] border border-violet-500/20">
                  <div className="flex items-center gap-2 mb-3 text-violet-400">
                    <Lightbulb className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secretos del Coach</span>
                  </div>
                  <div className="space-y-3">
                    {exercise.proTips.map((tip, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-5 h-5 bg-violet-600/20 rounded-lg flex items-center justify-center text-violet-400 text-[10px] font-black flex-shrink-0">
                          {i + 1}
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight leading-normal">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
               </div>
             )}
           </div>

           <button 
             onClick={() => setIsExpanded(false)}
             className="w-full py-3 bg-white/5 rounded-xl text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] hover:text-white transition-all"
           >
             Cerrar Manual Técnico
           </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutTracker;
