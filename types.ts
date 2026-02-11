
export interface Resource {
  title: string;
  url: string;
  category: 'Library' | 'Info' | 'Math' | 'SI/Physics' | 'Drive' | 'Concours';
  description?: string;
  isImportant?: boolean;
}

export interface AdviceItem {
  id: number;
  title: string;
  content: string;
  icon: string;
}

export interface DailySession {
  time: string;
  subject: string;
}

export interface WeeklyPlan {
  [day: string]: DailySession[];
}
