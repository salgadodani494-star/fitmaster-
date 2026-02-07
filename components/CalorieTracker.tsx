
import React, { useState } from 'react';
import { FoodEntry, WaterLog, MealPlan } from '../types';
import { INITIAL_MEAL_PLANS } from '../constants';
import { Plus, Utensils, Zap, Camera, Apple, Droplets, Coffee, Pizza, Moon, ChevronDown, ChevronUp } from 'lucide-react';

interface CalorieTrackerProps {
  foodEntries: FoodEntry[];
  waterLogs: WaterLog[];
  addFood: (entry: FoodEntry) => void;
  addWater: (ml: number) => void;
  caloriesGoal: number;
  waterGoal: number;
}

const CalorieTracker: React.FC<CalorieTrackerProps> = ({ foodEntries, waterLogs, addFood, addWater, caloriesGoal, waterGoal }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null);

  const today = new Date().setHours(0,0,0,0);
  const todayEntries = foodEntries.filter(f => new Date(f.timestamp).setHours(0,0,0,0) === today);
  const totalCalories = todayEntries.reduce((sum, f) => sum + f.calories, 0);
  
  const todayWater = waterLogs.filter(w => new Date(w.timestamp).setHours(0,0,0,0) === today);
  const totalWater = todayWater.reduce((sum, w) => sum + w.amountMl, 0);

  const macros = todayEntries.reduce((acc, curr) => ({
    p: acc.p + curr.protein,
    c: acc.c + curr.carbs,
    f: acc.f + curr.fats
  }), { p: 0, c: 0, f: 0 });

  const handleAddMealFromPlan = (meal: any) => {
    addFood({
      id: Math.random().toString(),
      name: meal.name,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
      timestamp: Date.now()
    });
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-1000 pb-20">
      <header className="space-y-1">
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Combustible</h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Gestión Nutricional Pro</p>
      </header>

      {/* Progress Cards */}
      <div className="space-y-4">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group border border-white/5">
          <div className="relative z-10 space-y-6">
             <div className="flex justify-between items-center">
                <div>
                   <p className="text-[10px] font-black uppercase text-violet-400 tracking-widest mb-1">Presupuesto Diario</p>
                   <div className="flex items-baseline gap-2">
                      <h3 className="text-5xl font-black tracking-tighter">{caloriesGoal - totalCalories}</h3>
                      <span className="text-slate-500 text-sm font-black uppercase">kcal rest</span>
                   </div>
                </div>
                <Zap className="w-10 h-10 text-yellow-400 fill-current" />
             </div>
             <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-600 to-indigo-500" style={{ width: `${Math.min(100, (totalCalories/caloriesGoal)*100)}%` }}></div>
             </div>
          </div>
        </div>

        <div className="cyber-glass rounded-[2.5rem] p-6 text-white border border-blue-500/20 flex items-center justify-between">
           <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-400" />
                <h4 className="text-xs font-black uppercase tracking-widest">Agua</h4>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black">{totalWater}</span>
                <span className="text-xs font-bold text-slate-500">/ {waterGoal} ml</span>
              </div>
           </div>
           <button onClick={() => addWater(250)} className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center active:scale-90 transition-all">
             <Plus className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Meal Plans Section */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase ml-2">Planes Recomendados</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {INITIAL_MEAL_PLANS.map(plan => (
            <div key={plan.id} className="flex-shrink-0 w-72 cyber-glass rounded-[2.5rem] overflow-hidden border border-white/5 group">
              <div className="h-40 relative">
                <img src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400&q=${plan.meals[0].imageKey}`} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt={plan.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                   <h4 className="text-xs font-black text-white uppercase">{plan.title}</h4>
                   <span className="text-[8px] font-black text-white bg-violet-600 px-2 py-0.5 rounded-full uppercase">{plan.type}</span>
                </div>
              </div>
              <div className="p-5 space-y-4">
                {plan.meals.map(meal => (
                  <div key={meal.id} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-[11px] font-bold text-slate-300 leading-tight">{meal.name}</p>
                      <button 
                        onClick={() => handleAddMealFromPlan(meal)}
                        className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                       <MacroTag label="P" val={meal.protein} />
                       <MacroTag label="C" val={meal.carbs} />
                       <MacroTag label="F" val={meal.fats} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Macros Bento */}
      <div className="grid grid-cols-3 gap-3">
        <MacroWidget label="Proteína" value={macros.p} target={180} unit="g" color="bg-rose-500" />
        <MacroWidget label="Carbo" value={macros.c} target={250} unit="g" color="bg-cyan-500" />
        <MacroWidget label="Grasas" value={macros.f} target={80} unit="g" color="bg-yellow-500" />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button onClick={() => setShowAddModal(true)} className="flex-1 cyber-glass p-5 rounded-[2.2rem] flex flex-col items-center gap-2 group active:scale-95 shadow-lg">
           <Plus className="w-5 h-5 text-violet-400" />
           <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Manual</span>
        </button>
        <button className="flex-1 cyber-glass p-5 rounded-[2.2rem] flex flex-col items-center gap-2 group active:scale-95 shadow-lg">
           <Camera className="w-5 h-5 text-cyan-400" />
           <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">AI Scan</span>
        </button>
      </div>

      {/* Food Log */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase ml-2">Registro Diario</h3>
        <div className="space-y-3">
           {todayEntries.map(food => (
             <div key={food.id} className="cyber-glass p-4 rounded-[1.8rem] border border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400">
                   <Apple className="w-5 h-5" />
                </div>
                <div className="flex-1">
                   <h4 className="text-xs font-black text-white uppercase truncate">{food.name}</h4>
                   <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{food.calories} kcal • P:{food.protein}g C:{food.carbs}g F:{food.fats}g</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4 animate-in fade-in duration-300">
           <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={() => setShowAddModal(false)}></div>
           <div className="bg-slate-900 w-full max-w-md rounded-[2.5rem] p-8 relative border border-white/10 animate-in slide-in-from-bottom-full duration-500">
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-8"></div>
              <h3 className="text-xl font-black mb-6 tracking-tight text-white uppercase">Registro Rápido</h3>
              <input 
                autoFocus
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm font-bold text-white outline-none focus:border-violet-500 transition-all mb-4"
                placeholder="Nombre de alimento..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addFood({
                      id: Math.random().toString(),
                      name: (e.target as HTMLInputElement).value,
                      calories: 300,
                      protein: 20,
                      carbs: 30,
                      fats: 10,
                      timestamp: Date.now()
                    });
                    setShowAddModal(false);
                  }
                }}
              />
              <p className="text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest">Presiona ENTER para guardar</p>
           </div>
        </div>
      )}
    </div>
  );
};

const MacroTag: React.FC<{ label: string; val: number }> = ({ label, val }) => (
  <div className="bg-white/5 px-2 py-1 rounded-lg text-center">
    <span className="text-[8px] font-black text-slate-500 block uppercase">{label}</span>
    <span className="text-[10px] font-black text-white">{val}g</span>
  </div>
);

const MacroWidget: React.FC<{ label: string; value: number; target: number; unit: string; color: string }> = ({ label, value, target, unit, color }) => (
  <div className="cyber-glass p-5 rounded-[1.8rem] border border-white/5 flex flex-col justify-between h-32 shadow-lg">
    <div>
      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-0.5">
        <span className="text-xl font-black text-white tabular-nums">{value}</span>
        <span className="text-[8px] font-bold text-slate-500">{unit}</span>
      </div>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full ${color} shadow-[0_0_10px_currentColor]`} style={{ width: `${Math.min(100, (value/target)*100)}%` }}></div>
    </div>
  </div>
);

export default CalorieTracker;
