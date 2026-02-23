export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Project {
  title: string;
  tech: string[];
  description: string[];
  color: string;
}

export interface Skill {
  category: string;
  items: string[];
  icon: string;
}

export interface Certification {
  name: string;
  date: string;
  badge: string;
}
