
import React, { useState } from 'react';
import { FoodEntry, WorkoutPlan, AppTab, UserProfile, WaterLog, SleepLog, Challenge, BiometricData } from '../types';
import { Zap, Activity, Star, Moon, Heart, Waves, Thermometer, ShieldCheck, Plus, Clock } from 'lucide-react';

interface DashboardProps {
  foodEntries: FoodEntry[];
  waterLogs: WaterLog[];
  sleepLogs: SleepLog[];
  biometrics: BiometricData;
  workouts: WorkoutPlan[];
  userProfile: UserProfile;
  steps: number;
  challenges: Challenge[];
  onNavToTab: (tab: AppTab) => void;
  addSleepLog: (log: SleepLog) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ foodEntries, waterLogs, sleepLogs, biometrics, userProfile, steps, challenges, onNavToTab, addSleepLog }) => {
  const [showSleepModal, setShowSleepModal] = useState(false);
  const today = new Date().setHours(0,0,0,0);
  const stepProgress = (steps / userProfile.dailyStepGoal) * 100;
  const lastSleep = sleepLogs[0] || { hours: 0, quality: 'poor', deepSleepPercent: 0, remSleepPercent: 0 };

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-1000 pb-20">
      {/* Editorial Hero Header */}
      <section className="relative h-56 rounded-[2.5rem] overflow-hidden group shadow-2xl border border-white/5">
        <img 
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800" 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 transition-transform duration-700 group-hover:scale-110"
          alt="Athlete"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Star className="w-3 h-3 text-cyan-400 fill-current" />
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">Status: Elite</span>
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Bio-Metric</h2>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Efficiency</span>
            <span className="text-xl font-black text-cyan-400">94.2%</span>
          </div>
        </div>
      </section>

      {/* Health Matrix Bento */}
      <div className="grid grid-cols-2 gap-4">
        {/* Real-time Heart Rate */}
        <div className="cyber-glass p-6 rounded-[2.5rem] border border-rose-500/20 flex flex-col justify-between h-44 relative overflow-hidden group">
           <div className="absolute -top-4 -right-4 w-20 h-20 bg-rose-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
           <div className="flex justify-between items-start relative z-10">
              <Heart className={`w-5 h-5 text-rose-500 ${biometrics.isSynced ? 'animate-pulse' : ''}`} />
              <span className="text-[8px] font-black text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full uppercase">Live</span>
           </div>
           <div className="relative z-10">
              <div className="flex items-baseline gap-1">
                 <h3 className="text-4xl font-black text-white tabular-nums">{biometrics.heartRate}</h3>
                 <span className="text-[10px] font-black text-slate-500 uppercase">BPM</span>
              </div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Frecuencia Cardíaca</p>
           </div>
        </div>

        {/* SpO2 & HRV */}
        <div className="cyber-glass p-6 rounded-[2.5rem] border border-cyan-500/20 flex flex-col justify-between h-44">
           <div className="flex justify-between items-start">
              <Waves className="w-5 h-5 text-cyan-400" />
              <Thermometer className="w-4 h-4 text-slate-600" />
           </div>
           <div className="space-y-3">
              <div>
                 <div className="flex justify-between items-baseline">
                    <span className="text-sm font-black text-white">98%</span>
                    <span className="text-[8px] font-black text-slate-600 uppercase">SpO2</span>
                 </div>
                 <div className="h-1 w-full bg-white/5 rounded-full mt-1">
                    <div className="h-full bg-cyan-400" style={{ width: '98%' }}></div>
                 </div>
              </div>
              <div>
                 <div className="flex justify-between items-baseline">
                    <span className="text-sm font-black text-white">{biometrics.hrv}ms</span>
                    <span className="text-[8px] font-black text-slate-600 uppercase">HRV</span>
                 </div>
                 <div className="h-1 w-full bg-white/5 rounded-full mt-1">
                    <div className="h-full bg-violet-500" style={{ width: '45%' }}></div>
                 </div>
              </div>
           </div>
        </div>

        {/* Sleep Analysis - Large Card */}
        <div className="col-span-2 cyber-glass p-8 rounded-[2.5rem] border border-violet-500/20 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Moon className="w-32 h-32" />
           </div>
           <div className="flex justify-between items-center mb-6 relative z-10">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 bg-violet-600/20 rounded-2xl flex items-center justify-center">
                    <Moon className="w-6 h-6 text-violet-400" />
                 </div>
                 <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-tighter">Análisis de Sueño</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Protocolo Nocturno</p>
                 </div>
              </div>
              <div className="flex flex-col items-end">
                 <button onClick={() => setShowSleepModal(true)} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-violet-400 hover:bg-violet-500 hover:text-white transition-all">
                    <Plus className="w-4 h-4" />
                 </button>
                 <div className="mt-2 text-right">
                    <span className="text-2xl font-black text-white">{lastSleep.hours}h</span>
                    <p className="text-[8px] font-black text-violet-400 uppercase">Calidad: {lastSleep.quality}</p>
                 </div>
              </div>
           </div>
           <div className="grid grid-cols-3 gap-4 relative z-10">
              <SleepPhase label="Profundo" percent={lastSleep.deepSleepPercent} color="bg-indigo-500" />
              <SleepPhase label="REM" percent={lastSleep.remSleepPercent} color="bg-violet-400" />
              <SleepPhase label="Ligero" percent={Math.max(0, 100 - lastSleep.deepSleepPercent - lastSleep.remSleepPercent)} color="bg-slate-700" />
           </div>
        </div>
      </div>

      {/* Steps Progress */}
      <section className="cyber-glass p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6 cursor-pointer hover:border-cyan-400/20 transition-all">
         <div className="relative w-20 h-20 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
              <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={213.6} strokeDashoffset={213.6 - (213.6 * stepProgress) / 100} className="text-cyan-400 transition-all duration-1000" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white animate-pulse" />
            </div>
         </div>
         <div className="flex-1">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Movimiento Diario</h4>
            <div className="flex items-baseline gap-2">
               <span className="text-3xl font-black text-white">{steps}</span>
               <span className="text-xs font-bold text-slate-600">/ {userProfile.dailyStepGoal}</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full mt-2 overflow-hidden">
               <div className="h-full bg-gradient-to-r from-cyan-400 to-indigo-600" style={{ width: `${stepProgress}%` }}></div>
            </div>
         </div>
      </section>

      {/* Challenges Section */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase flex items-center gap-2 px-2">
           <ShieldCheck className="w-4 h-4 text-cyan-500" />
           PROTOCOLOS ACTIVOS
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {challenges.map(challenge => (
            <div key={challenge.id} className="flex-shrink-0 w-64 cyber-glass p-6 rounded-[2.2rem] border-t-2 border-t-cyan-500/50 space-y-4 shadow-xl">
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-black text-white uppercase tracking-tight">{challenge.title}</h4>
                <span className="text-[8px] font-black text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">{challenge.rewardPoints} XP</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 leading-tight h-8">{challenge.description}</p>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400" style={{ width: `${(challenge.progress/challenge.target)*100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showSleepModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4 animate-in fade-in duration-300">
           <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={() => setShowSleepModal(false)}></div>
           <div className="bg-slate-900 w-full max-w-md rounded-[2.5rem] p-8 relative border border-white/10 animate-in slide-in-from-bottom-full duration-500">
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-8"></div>
              <h3 className="text-xl font-black mb-6 tracking-tight text-white uppercase">Loguear Sueño</h3>
              <div className="space-y-4">
                 <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Horas Dormidas</label>
                    <input type="number" step="0.5" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-violet-500" placeholder="Ej: 8.5" />
                 </div>
                 <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Calidad</label>
                    <div className="flex gap-2">
                       {['poor', 'fair', 'good', 'excellent'].map(q => (
                         <button key={q} className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-tighter text-slate-500 hover:text-white hover:border-violet-500 transition-all">
                           {q}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>
              <button 
                onClick={() => {
                  addSleepLog({ hours: 8, quality: 'good', deepSleepPercent: 30, remSleepPercent: 20, timestamp: Date.now() });
                  setShowSleepModal(false);
                }}
                className="w-full mt-8 bg-gradient-to-r from-violet-600 to-indigo-600 py-4 rounded-xl text-xs font-black text-white uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all"
              >
                Registrar Descanso
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

const SleepPhase: React.FC<{ label: string; percent: number; color: string }> = ({ label, percent, color }) => (
  <div className="space-y-2 text-center">
    <div className={`h-1.5 w-full ${color} rounded-full`}></div>
    <span className="text-[8px] font-black text-slate-500 uppercase block">{label}</span>
    <span className="text-[10px] font-black text-white">{percent}%</span>
  </div>
);

export default Dashboard;
