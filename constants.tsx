
import { Resource, AdviceItem, WeeklyPlan } from './types';

export const RESOURCES: Resource[] = [
  // Bibliothèques Numériques
  { title: "ProEtudes - Nathan CPGE", url: "https://proetudes.blogspot.com/search/label/Classe%20Prepa%20Nathan?&max-results=30&m=1", category: 'Library', description: "Livres Nathan et ressources variées." },
  { title: "BooksLoop", url: "https://booksloop.blogspot.com/", category: 'Library', description: "Large collection de manuels de prépa." },
  { title: "LID Prepa - H-Prepa", url: "https://lidprepa.blogspot.com/2015/08/collection-des-livre-h-prepa.html", category: 'Library' },
  { title: "Mes Livres site", url: "http://meslivres.site/pf54.html", category: 'Library' },
  { title: "Gérald Philippe Bookmarks", url: "http://gerald.philippe.free.fr/bookmarks.html", category: 'Library' },

  // Informatique (Python)
  { title: "Drive Info Crucial", url: "https://drive.google.com/drive/u/0/folders/1Ypaq8w2dz3I5viyBh3QPcLG_iOi0Y1YU", category: 'Info', isImportant: true, description: "Le drive de référence pour l'informatique TSI." },
  { title: "Drive Info Mobile", url: "https://drive.google.com/drive/mobile/folders/1d8g8Irv2aV5ox27rREVYMhlUAiXhScW7", category: 'Info' },
  { title: "Exos Python Corrigés", url: "http://www.developpement-informatique.com/article/98/exercices-corriges-python-serie-9", category: 'Info' },

  // Mathématiques
  { title: "BibMath", url: "http://www.bibmath.net/", category: 'Math', description: "Résumés de cours et exercices classiques indispensables." },
  { title: "Concours Maths CPGE", url: "https://concours-maths-cpge.fr/", category: 'Math', description: "Annales et corrigés de mathématiques." },
  { title: "RTC.ma (Recommandé)", url: "https://rtc.ma/index.php?language=en", category: 'Math', isImportant: true, description: "Site extrêmement complet utilisé par les meilleurs élèves." },

  // SI & Physique
  { title: "PT Physique Free", url: "http://pt.physique.free.fr/exos.php#emag", category: 'SI/Physics', description: "Exercices d'électromagnétisme et physique." },
  { title: "Cahier de Prépa Coeffin", url: "https://cahier-de-prepa.fr/CoeffinPTSI/docs?rep=6", category: 'SI/Physics' },
  { title: "SI Concours Français (RAR)", url: "http://www.mediafire.com/file/az5lure9ariyeqk/SI_CONCOURS_FRANCAIS.rar/file", category: 'SI/Physics' },

  // Concours Officiels
  { title: "Concours Centrale-Supelec", url: "https://www.concours-centrale-supelec.fr/CentraleSupelec", category: 'Concours' },
  { title: "Annales CCINP TSI", url: "http://www.concours-commun-inp.fr/fr/epreuves/annales/annales-tsi.html", category: 'Concours' },

  // Drives
  { title: "Drive TSI General 1", url: "https://drive.google.com/drive/mobile/folders/1S2e_lV6IODGnUY20zaZoFgHKBjPxpMc5", category: 'Drive' },
  { title: "Drive TSI General 2", url: "https://drive.google.com/drive/mobile/folders/1pKFzk-YWNP-nx1vDETaWkbe6DBoPj4ya", category: 'Drive' }
];

export const ADVICES: AdviceItem[] = [
  { id: 1, title: "Maîtrise de la SI", content: "En TSI, la SI est coefficient 9 ou 10. Ne négligez jamais les schémas cinématiques. C'est là que se fait la différence.", icon: "⚙️" },
  { id: 2, title: "L'art des Annales", content: "Ne faites pas d'exercices au hasard. Finissez les 10 dernières années de CCINP avant d'attaquer Centrale.", icon: "📝" },
  { id: 3, title: "Python est un Bonus", content: "L'épreuve d'info est accessible. Assurez les points en maîtrisant les algorithmes de tri.", icon: "🐍" },
  { id: 4, title: "Sommeil & Ramadan", content: "Le cerveau sature sans sommeil. Dormez immédiatement après le Suhoor jusqu'à 8h ou 9h.", icon: "🌙" }
];

const TIME_SLOTS = ["06:00 - 10:00", "10:30 - 12:30", "13:30 - 15:30", "16:30 - 18:00", "21:30 - 22:00"];

const PLAN_A = [
  { time: TIME_SLOTS[0], subject: "Maths" },
  { time: TIME_SLOTS[1], subject: "Français" },
  { time: TIME_SLOTS[2], subject: "Physique" },
  { time: TIME_SLOTS[3], subject: "SI" },
  { time: TIME_SLOTS[4], subject: "Bilan" }
];

const PLAN_B = [
  { time: TIME_SLOTS[0], subject: "Physique" },
  { time: TIME_SLOTS[1], subject: "Informatique" },
  { time: TIME_SLOTS[2], subject: "Maths" },
  { time: TIME_SLOTS[3], subject: "Chimie" },
  { time: TIME_SLOTS[4], subject: "Bilan" }
];

export const WEEKLY_RAMADAN_PLAN: WeeklyPlan = {
  "Lundi": PLAN_A,
  "Mardi": PLAN_B,
  "Mercredi": PLAN_A,
  "Jeudi": PLAN_B,
  "Vendredi": PLAN_A,
  "Samedi": PLAN_B,
  "Dimanche": PLAN_A
};
