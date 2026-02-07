
import React, { useState, useEffect } from 'react';
import { AppTab, WorkoutPlan, FoodEntry, UserProfile, WaterLog, SleepLog, Challenge, Badge, BiometricData, Reminder } from './types';
import Dashboard from './components/Dashboard';
import WorkoutTracker from './components/WorkoutTracker';
import CalorieTracker from './components/CalorieTracker';
import AICoach from './components/AICoach';
import Profile from './components/Profile';
import Community from './components/Community';
import Mindset from './components/Mindset';
import { INITIAL_WORKOUTS } from './constants';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Zap, 
  Cpu, 
  User,
  Users,
  Brain
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [workouts, setWorkouts] = useState<WorkoutPlan[]>(INITIAL_WORKOUTS);
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [waterLogs, setWaterLogs] = useState<WaterLog[]>([]);
  const [sleepLogs, setSleepLogs] = useState<SleepLog[]>([
    { hours: 7.5, quality: 'good', deepSleepPercent: 35, remSleepPercent: 25, timestamp: Date.now() - 86400000 }
  ]);
  const [biometrics, setBiometrics] = useState<BiometricData>({
    heartRate: 68,
    spo2: 98,
    hrv: 45,
    bodyTemp: 36.6,
    isSynced: true,
    lastSync: Date.now()
  });
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', type: 'water', time: '10:00', active: true, label: 'Hidratación' },
    { id: '2', type: 'workout', time: '18:00', active: true, label: 'Entrenamiento' },
    { id: '3', type: 'meal', time: '14:00', active: false, label: 'Almuerzo Proteico' }
  ]);
  const [steps, setSteps] = useState(7432);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Atleta Pro',
    weight: 78,
    height: 180,
    age: 25,
    goal: 'fitness',
    dailyStepGoal: 10000,
    dailyCalorieGoal: 2600,
    dailyWaterGoalMl: 3000,
    dailySleepGoalHours: 8,
    theme: 'cyber',
    connectedDevice: 'apple_watch'
  });

  const [challenges] = useState<Challenge[]>([
    { id: 'c1', title: 'Máquina de Pasos', description: 'Camina 50k pasos esta semana', progress: 32000, target: 50000, rewardPoints: 500, type: 'steps', expiresInDays: 3 },
    { id: 'c2', title: 'Hidratación Extrema', description: 'Bebe 3L diarios por 5 días', progress: 4, target: 5, rewardPoints: 300, type: 'water', expiresInDays: 1 },
    { id: 'c3', title: 'Hierro Forjado', description: 'Completa 4 entrenamientos', progress: 2, target: 4, rewardPoints: 1000, type: 'workouts', expiresInDays: 5 },
  ]);

  const [badges] = useState<Badge[]>([
    { id: 'b1', title: 'Early Bird', icon: '🌅', unlocked: true, unlockedAt: Date.now() - 86400000 },
    { id: 'b2', title: 'Water King', icon: '💧', unlocked: false },
    { id: 'b3', title: 'Iron Soul', icon: '⚔️', unlocked: true, unlockedAt: Date.now() - 500000 },
  ]);

  useEffect(() => {
    if (userProfile.connectedDevice !== 'none') {
      const interval = setInterval(() => {
        setBiometrics(prev => ({
          ...prev,
          heartRate: 65 + Math.floor(Math.random() * 10),
          lastSync: Date.now()
        }));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [userProfile.connectedDevice]);

  const addSleepLog = (log: SleepLog) => setSleepLogs(prev => [log, ...prev]);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return (
          <Dashboard 
            foodEntries={foodEntries} 
            waterLogs={waterLogs}
            sleepLogs={sleepLogs}
            biometrics={biometrics}
            workouts={workouts} 
            userProfile={userProfile} 
            steps={steps} 
            challenges={challenges}
            onNavToTab={setActiveTab}
            addSleepLog={addSleepLog}
          />
        );
      case AppTab.WORKOUTS:
        return <WorkoutTracker workouts={workouts} addWorkout={(p) => setWorkouts([p, ...workouts])} toggleExercise={toggleExercise} />;
      case AppTab.CALORIES:
        return (
          <CalorieTracker 
            foodEntries={foodEntries} 
            waterLogs={waterLogs}
            addFood={(e) => setFoodEntries([e, ...foodEntries])} 
            addWater={(ml) => setWaterLogs([{ id: Math.random().toString(), amountMl: ml, timestamp: Date.now() }, ...waterLogs])}
            caloriesGoal={userProfile.dailyCalorieGoal} 
            waterGoal={userProfile.dailyWaterGoalMl}
          />
        );
      case AppTab.COACH:
        return <AICoach onPlanGenerated={(p) => { setWorkouts(prev => [p, ...prev]); setActiveTab(AppTab.WORKOUTS); }} />;
      case AppTab.COMMUNITY:
        return <Community userProfile={userProfile} />;
      case AppTab.MINDSET:
        return <Mindset userProfile={userProfile} />;
      case AppTab.PROFILE:
        return (
          <Profile 
            userProfile={userProfile} 
            setUserProfile={setUserProfile} 
            badges={badges}
            biometrics={biometrics}
            reminders={reminders}
            setReminders={setReminders}
          />
        );
      default:
        return null;
    }
  };

  const toggleExercise = (planId: string, exerciseId: string) => {
    setWorkouts(prev => prev.map(p => {
      if (p.id === planId) {
        return {
          ...p,
          exercises: p.exercises.map(e => e.id === exerciseId ? { ...e, completed: !e.completed } : e)
        };
      }
      return p;
    }));
  };

  const getThemeColors = () => {
    switch(userProfile.theme) {
      case 'sunset': return 'from-orange-500 to-rose-600';
      case 'neon': return 'from-lime-400 to-emerald-500';
      default: return 'from-violet-600 to-cyan-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col max-w-md mx-auto shadow-[0_0_100px_rgba(139,92,246,0.1)] overflow-hidden border-x border-white/5 selection:bg-cyan-500 selection:text-black">
      <header className="p-6 sticky top-0 z-50 flex justify-between items-center bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${getThemeColors()} rounded-2xl flex items-center justify-center shadow-2xl rotate-3 transition-transform hover:rotate-0 cursor-pointer`}>
            <Zap className="w-7 h-7 text-white fill-current" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tighter text-white leading-none">FIT ELITE</h1>
            <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.2em]">ULTRA TRACKER</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <div className={`w-1.5 h-1.5 rounded-full ${userProfile.connectedDevice !== 'none' ? 'bg-cyan-400 animate-pulse' : 'bg-rose-500'}`}></div>
          <span className="text-[9px] font-black text-slate-400 uppercase">
            {userProfile.connectedDevice !== 'none' ? 'Linked' : 'No Sync'}
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-40 scrollbar-hide">
        {renderContent()}
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-[420px] z-50">
        <div className="bg-slate-900/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-2 flex justify-between items-center shadow-2xl shadow-black/80 overflow-x-auto scrollbar-hide">
          <NavButton active={activeTab === AppTab.DASHBOARD} onClick={() => setActiveTab(AppTab.DASHBOARD)} icon={<LayoutDashboard />} label="Status" theme={getThemeColors()} />
          <NavButton active={activeTab === AppTab.WORKOUTS} onClick={() => setActiveTab(AppTab.WORKOUTS)} icon={<Dumbbell />} label="Power" theme={getThemeColors()} />
          <NavButton active={activeTab === AppTab.CALORIES} onClick={() => setActiveTab(AppTab.CALORIES)} icon={<Zap />} label="Fuel" theme={getThemeColors()} />
          <NavButton active={activeTab === AppTab.COACH} onClick={() => setActiveTab(AppTab.COACH)} icon={<Cpu />} label="AI" theme={getThemeColors()} />
          <NavButton active={activeTab === AppTab.MINDSET} onClick={() => setActiveTab(AppTab.MINDSET)} icon={<Brain />} label="Mind" theme={getThemeColors()} />
          <NavButton active={activeTab === AppTab.COMMUNITY} onClick={() => setActiveTab(AppTab.COMMUNITY)} icon={<Users />} label="Elite" theme={getThemeColors()} />
          <NavButton active={activeTab === AppTab.PROFILE} onClick={() => setActiveTab(AppTab.PROFILE)} icon={<User />} label="Self" theme={getThemeColors()} />
        </div>
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; theme: string }> = ({ active, onClick, icon, label, theme }) => (
  <button 
    onClick={onClick} 
    className={`flex flex-col items-center justify-center min-w-[50px] h-14 rounded-full transition-all duration-500 flex-shrink-0 ${
      active 
        ? `bg-gradient-to-br ${theme} text-white shadow-xl scale-110` 
        : 'text-slate-500 hover:text-slate-300'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4' })}
    {active && <span className="text-[7px] font-black uppercase mt-0.5 animate-in fade-in slide-in-from-bottom-1">{label}</span>}
  </button>
);

export default App;
