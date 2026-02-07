
import React, { useState } from 'react';
import { User, Award, Palette, RefreshCw, Watch, Bell, Clock, Zap, Instagram, Phone, ToggleLeft as Toggle } from 'lucide-react';
import { UserProfile, Badge, BiometricData, Reminder } from '../types';

interface ProfileProps {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  badges: Badge[];
  biometrics: BiometricData;
  reminders: Reminder[];
  setReminders: (reminders: Reminder[]) => void;
}

const Profile: React.FC<ProfileProps> = ({ userProfile, setUserProfile, badges, biometrics, reminders, setReminders }) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const toggleTheme = (theme: 'cyber' | 'neon' | 'sunset') => {
    setUserProfile({ ...userProfile, theme });
  };

  const connectDevice = (device: UserProfile['connectedDevice']) => {
    setIsSyncing(true);
    setTimeout(() => {
      setUserProfile({ ...userProfile, connectedDevice: device });
      setIsSyncing(false);
    }, 2000);
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  return (
    <div className="p-6 space-y-12 animate-in fade-in duration-1000 pb-32">
      {/* User Hero */}
      <section className="text-center space-y-6 relative py-4">
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-violet-600 to-cyan-500 p-1 mx-auto shadow-2xl">
            <div className="w-full h-full rounded-[2.3rem] bg-slate-900 flex items-center justify-center overflow-hidden">
              <User className="w-12 h-12 text-slate-700" />
            </div>
          </div>
          {userProfile.connectedDevice !== 'none' && (
             <div className="absolute -bottom-2 -right-2 bg-cyan-500 text-black p-2 rounded-xl shadow-xl">
                <Watch className="w-4 h-4" />
             </div>
          )}
        </div>
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{userProfile.name}</h2>
          <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.4em]">Elite User Tier</span>
        </div>
      </section>

      {/* Reminders - NEW */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase ml-2 flex items-center gap-2">
           <Bell className="w-4 h-4 text-violet-500" />
           NOTIFICACIONES TÁCTICAS
        </h3>
        <div className="cyber-glass p-6 rounded-[2.5rem] border border-white/5 space-y-4">
           {reminders.map(reminder => (
             <div key={reminder.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center border border-white/10">
                      <Clock className="w-4 h-4 text-violet-400" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-white uppercase">{reminder.label}</p>
                      <p className="text-[8px] font-bold text-slate-500 uppercase">{reminder.time}</p>
                   </div>
                </div>
                <button onClick={() => toggleReminder(reminder.id)} className={`w-10 h-6 rounded-full transition-all flex items-center px-1 ${reminder.active ? 'bg-cyan-500' : 'bg-slate-700'}`}>
                   <div className={`w-4 h-4 bg-white rounded-full transition-transform ${reminder.active ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </button>
             </div>
           ))}
        </div>
      </section>

      {/* Device Management */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase ml-2 flex items-center gap-2">
           <Watch className="w-4 h-4 text-cyan-400" />
           SINCRONIZACIÓN DISPOSITIVO
        </h3>
        <div className="cyber-glass p-6 rounded-[2.5rem] border border-white/5 space-y-6 shadow-xl">
           <div className="flex justify-between items-center">
              <div>
                 <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Estado de Enlace</p>
                 <h4 className="text-sm font-black text-white uppercase">
                    {userProfile.connectedDevice === 'apple_watch' ? 'Apple Watch Elite' : 
                     userProfile.connectedDevice === 'garmin' ? 'Garmin Tactical' : 
                     userProfile.connectedDevice === 'whoop' ? 'Whoop Bio-Strap' : 'Desconectado'}
                 </h4>
              </div>
              <button 
                onClick={() => setIsSyncing(true)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 ${isSyncing ? 'animate-spin' : ''}`}
              >
                <RefreshCw className="w-4 h-4 text-cyan-400" />
              </button>
           </div>

           <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <DeviceBtn active={userProfile.connectedDevice === 'apple_watch'} label="Apple" onClick={() => connectDevice('apple_watch')} />
              <DeviceBtn active={userProfile.connectedDevice === 'garmin'} label="Garmin" onClick={() => connectDevice('garmin')} />
              <DeviceBtn active={userProfile.connectedDevice === 'whoop'} label="Whoop" onClick={() => connectDevice('whoop')} />
           </div>
        </div>
      </section>

      {/* Badges Section */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase ml-2 flex items-center gap-2">
           <Award className="w-4 h-4 text-yellow-500" />
           LOGROS ALCANZADOS
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {badges.map(badge => (
            <div key={badge.id} className={`cyber-glass p-5 rounded-[2rem] flex flex-col items-center justify-center gap-2 border transition-all ${badge.unlocked ? 'border-cyan-500/30' : 'border-white/5 grayscale opacity-20'}`}>
              <span className="text-3xl">{badge.icon}</span>
              <p className="text-[8px] font-black text-white uppercase text-center leading-none">{badge.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Theme Selector */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase ml-2 flex items-center gap-2">
           <Palette className="w-4 h-4 text-cyan-400" />
           VISUAL ENGINE
        </h3>
        <div className="flex gap-4">
          <ThemeOption active={userProfile.theme === 'cyber'} label="Cyber" color="from-violet-600 to-cyan-500" onClick={() => toggleTheme('cyber')} />
          <ThemeOption active={userProfile.theme === 'neon'} label="Neon" color="from-lime-400 to-emerald-500" onClick={() => toggleTheme('neon')} />
          <ThemeOption active={userProfile.theme === 'sunset'} label="Sunset" color="from-orange-500 to-rose-600" onClick={() => toggleTheme('sunset')} />
        </div>
      </section>

      {/* Contact Support */}
      <section className="space-y-6 pt-6 border-t border-white/5">
        <div className="grid grid-cols-2 gap-4">
          <ContactIcon icon={<Instagram className="w-6 h-6 text-pink-500" />} label="Instagram" value="@danisalg_" href="https://instagram.com/danisalg_" />
          <ContactIcon icon={<Phone className="w-6 h-6 text-emerald-400" />} label="WhatsApp" value="698 099 133" href="https://wa.me/34698099133" />
        </div>
      </section>

      <footer className="text-center pt-8 pb-12 opacity-20">
        <div className="flex items-center justify-center gap-2 mb-2">
           <Zap className="w-4 h-4" />
           <span className="text-[10px] font-black uppercase tracking-[0.5em]">Fit Elite Pro v1.6.0</span>
        </div>
      </footer>
    </div>
  );
};

const DeviceBtn: React.FC<{ active: boolean; label: string; onClick: () => void }> = ({ active, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${active ? 'bg-cyan-500 text-black border-cyan-500 shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-slate-500 border-white/5 hover:text-white'}`}
  >
    {label}
  </button>
);

const ThemeOption: React.FC<{ active: boolean; label: string; color: string; onClick: () => void }> = ({ active, label, color, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex flex-col items-center gap-3 p-5 rounded-[2.2rem] border transition-all ${active ? 'border-white/20 bg-white/5 shadow-2xl' : 'border-white/5 grayscale'}`}
  >
    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} shadow-lg shadow-black/40 rotate-6`}></div>
    <span className="text-[9px] font-black text-white uppercase tracking-widest">{label}</span>
  </button>
);

const ContactIcon: React.FC<{ icon: React.ReactNode; label: string; value: string; href: string }> = ({ icon, label, value, href }) => (
  <a href={href} target="_blank" rel="noopener" className="cyber-glass p-6 rounded-[2.5rem] border border-white/5 flex flex-col items-center text-center gap-3 hover:border-white/20 transition-all group">
    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 transition-transform group-hover:scale-110">{icon}</div>
    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">{label}</p>
    <p className="text-[10px] font-black text-white">{value}</p>
  </a>
);

export default Profile;
