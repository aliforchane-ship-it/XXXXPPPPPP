
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import ResourceCard from './components/ResourceCard';
import { RESOURCES, ADVICES, WEEKLY_RAMADAN_PLAN } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('tsi_auth_v1') === 'true';
  });
  
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [completedSessions, setCompletedSessions] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('tsi_completed_sessions');
    return saved ? JSON.parse(saved) : {};
  });

  const daysInFrench = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const initialDay = daysInFrench[new Date().getDay()];
  const [selectedDay, setSelectedDay] = useState(initialDay);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('tsi_auth_v1', 'true');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('tsi_completed_sessions', JSON.stringify(completedSessions));
  }, [completedSessions]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Identifiant et Mot de passe requis : cnc2026
    if (loginForm.username === 'cnc2026' && loginForm.password === 'cnc2026') {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  const toggleSession = (day: string, index: number) => {
    const key = `${day}-${index}`;
    setCompletedSessions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredResources = useMemo(() => {
    return RESOURCES.filter(r => {
      const matchesFilter = filter === 'All' || r.category === filter;
      const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (r.description?.toLowerCase() || '').includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const categories = ['All', 'Library', 'Info', 'Math', 'SI/Physics', 'Drive', 'Concours'];

  const handleHomeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage('resources');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-10">
            <div className="inline-block p-4 bg-blue-600 rounded-2xl mb-6 shadow-lg shadow-blue-600/20">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Terminal <span className="text-blue-500 text-shadow-glow">Sécurisé</span></h1>
            <p className="text-slate-500 text-sm mt-2 font-bold uppercase tracking-widest">Veuillez vous identifier</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Identifiant"
                className={`w-full bg-[#0f172a] border ${loginError ? 'border-red-500' : 'border-white/10 group-hover:border-blue-500/50'} rounded-2xl px-6 py-4 text-white font-bold placeholder-slate-700 transition-all outline-none focus:ring-2 focus:ring-blue-500/20`}
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
              />
            </div>
            <div className="relative group">
              <input 
                type="password" 
                placeholder="Mot de passe"
                className={`w-full bg-[#0f172a] border ${loginError ? 'border-red-500' : 'border-white/10 group-hover:border-blue-500/50'} rounded-2xl px-6 py-4 text-white font-bold placeholder-slate-700 transition-all outline-none focus:ring-2 focus:ring-blue-500/20`}
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              />
            </div>
            
            {loginError && (
              <p className="text-red-500 text-[10px] font-black uppercase text-center tracking-[0.2em] animate-pulse">Accès Refusé</p>
            )}

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 uppercase tracking-[0.3em] text-xs mt-6"
            >
              Initialiser la Session
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.5em]">TSI PREPHUB SECURE TERMINAL v2.2</p>
          </div>
        </div>
      </div>
    );
  }

  const renderHome = () => (
    <div className="space-y-24">
      <section className="relative pt-24 pb-32 px-6 bg-[#020617] rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-black uppercase tracking-[0.3em] mb-10">
            <span>Matrice de Réussite TSI Morocco</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black text-white mb-10 tracking-tighter leading-[0.85]">
            ULTIMATE <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">TSI HUB.</span>
          </h1>
          
          <form onSubmit={handleHomeSearch} className="max-w-3xl mx-auto relative group mb-16">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-[#0f172a] rounded-[1.8rem] border border-white/10 p-2 shadow-2xl">
              <div className="pl-6 text-slate-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input 
                type="text" 
                placeholder="Rechercher un Drive, Cours ou Exercice..."
                className="w-full bg-transparent border-none text-white px-6 py-4 text-lg focus:ring-0 placeholder-slate-600 font-bold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-2xl transition-all uppercase tracking-widest text-xs">Rechercher</button>
            </div>
          </form>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setCurrentPage('ramadan')} className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white font-bold rounded-2xl hover:bg-white/10 text-xs uppercase tracking-widest">
              Suivi Ramadan
            </button>
            <button onClick={() => setCurrentPage('resources')} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 text-xs uppercase tracking-widest">
              Tous les Drives
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
        {[
          { icon: "📅", title: "Suivi Interactif", desc: "Un planning quotidien modulaire pour valider chaque session de travail effectuée." },
          { icon: "📡", title: "Archives Directes", desc: "Indexation complète des drives TSI pour éviter les liens morts et les recherches fastidieuses." },
          { icon: "🏆", title: "Conseils Élite", desc: "Stratégies basées sur l'expérience des meilleurs lauréats de la filière TSI." }
        ].map((f, i) => (
          <div key={i} className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all">
            <div className="text-4xl mb-8">{f.icon}</div>
            <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tighter">{f.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-bold opacity-70">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Bibliothèque de Ressources</h2>
            <p className="text-slate-500 font-bold text-sm mt-2 opacity-60">Retrouvez tous les drives, cours et exercices pour réussir vos CPGE.</p>
          </div>
          
          <div className="relative flex-grow max-w-lg">
            <input
              type="text"
              placeholder="Rechercher une ressource..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-slate-900 text-white border-none rounded-3xl text-sm font-bold focus:ring-4 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${
                filter === cat ? 'bg-blue-600 text-white shadow-xl' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredResources.map((res, idx) => (
          <ResourceCard key={idx} resource={res} />
        ))}
      </div>
    </div>
  );

  const renderRamadan = () => {
    const currentDayPlan = WEEKLY_RAMADAN_PLAN[selectedDay];
    const completedCount = currentDayPlan.filter((_, i) => completedSessions[`${selectedDay}-${i}`]).length;
    const progress = (completedCount / currentDayPlan.length) * 100;

    return (
      <div className="max-w-5xl mx-auto space-y-16 py-8 animate-in slide-in-from-bottom-8 duration-700">
        <div className="text-center">
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Dashboard Ramadan Success</h2>
          <p className="text-slate-500 mt-4 font-bold uppercase tracking-widest opacity-60">Gérez et validez vos séances de travail quotidiennes.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {Object.keys(WEEKLY_RAMADAN_PLAN).map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                selectedDay === day 
                ? 'bg-blue-600 text-white shadow-xl scale-105' 
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {day} {day === initialDay && " (Aujourd'hui)"}
            </button>
          ))}
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Progression {selectedDay}</span>
            <span className="text-blue-600 font-black text-xl">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-[#0f172a] rounded-[3rem] shadow-2xl overflow-hidden border border-white/5">
          <div className="grid grid-cols-1 divide-y divide-white/5">
            {currentDayPlan.map((session, i) => {
              const isCompleted = completedSessions[`${selectedDay}-${i}`];
              return (
                <div 
                  key={i} 
                  onClick={() => toggleSession(selectedDay, i)}
                  className={`flex flex-col md:flex-row items-center p-10 cursor-pointer transition-all ${
                    isCompleted ? 'bg-blue-600/10 opacity-60' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="w-full md:w-48 font-mono text-xl font-black text-blue-400 mb-4 md:mb-0">
                    {session.time}
                  </div>
                  <div className="flex-1 flex items-center gap-6">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                      isCompleted ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-700 text-transparent'
                    }`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h4 className={`text-2xl font-black tracking-tight ${
                      isCompleted ? 'text-slate-400 line-through' : 'text-white'
                    }`}>
                      {session.subject}
                    </h4>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-slate-400'
                    }`}>
                      {isCompleted ? "Complété" : "En attente"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderAdvice = () => (
    <div className="max-w-5xl mx-auto space-y-16 py-8">
      <div className="text-center">
        <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase underline decoration-blue-500 decoration-8 underline-offset-8">Conseils des Majors</h2>
        <p className="text-slate-500 mt-6 text-xl font-bold opacity-60">Optimisez votre approche des concours nationaux.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ADVICES.map(advice => (
          <div key={advice.id} className="bg-slate-900 p-12 rounded-[3rem] text-white shadow-2xl hover:bg-slate-800 transition-all border border-white/5 group">
            <div className="text-5xl mb-8 transform group-hover:scale-110 transition-transform inline-block">{advice.icon}</div>
            <h4 className="text-2xl font-black mb-4 uppercase text-blue-400">{advice.title}</h4>
            <p className="text-slate-400 font-bold text-sm leading-relaxed">{advice.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-12">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'resources' && renderResources()}
        {currentPage === 'ramadan' && renderRamadan()}
        {currentPage === 'advice' && renderAdvice()}
      </main>
      <footer className="bg-white border-t border-slate-200 py-16 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-3xl font-black text-slate-900 tracking-tighter">TSI<span className="text-blue-600">HUB</span></div>
          <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">© 2024 • Excellence Opérationnelle TSI</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
