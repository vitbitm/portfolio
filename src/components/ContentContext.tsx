import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  status: string;
  detailsUrl?: string;
  reportUrl?: string;
}

export interface Skill {
  id: number;
  name: string;
  level: number;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

interface ContentState {
  personalInfo: PersonalInfo;
  projects: Project[];
  skills: Skill[];
}

interface ContentContextType extends ContentState {
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  removeProject: (id: number) => void;
  updateProject: (id: number, updates: Partial<Project>) => void;
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  removeSkill: (id: number) => void;
  updateSkill: (id: number, updates: Partial<Skill>) => void;
  saveContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const defaultContent: ContentState = {
  personalInfo: {
    name: 'Виктор Мурахин',
    title: 'QA-инженер',
    email: 'viktor.murakhin@example.com',
    phone: '+7 (999) 123-45-67',
    location: 'Москва, Россия',
    bio: 'QA-инженер с passion к обеспечению качества программного обеспечения. Специализируюсь на функциональном, автоматизированном тестировании и обеспечиваю надежность пользовательского опыта.',
  },
  projects: [
    {
      id: 1,
      title: 'Тестирование E-commerce платформы',
      description: 'Комплексное тестирование интернет-магазина с функциями оплаты, включая функциональное и регрессионное тестирование, проверку интеграций с платежными системами.',
      technologies: ['Manual Testing', 'Postman', 'SQL', 'TestRail'],
      status: 'Завершен',
      detailsUrl: '#',
      reportUrl: '#'
    },
    {
      id: 2,
      title: 'Автоматизация тестирования API',
      description: 'Создание автоматизированных тестов для REST API, настройка CI/CD пайплайна для запуска тестов, создание отчетности.',
      technologies: ['Postman', 'JavaScript', 'Newman', 'Jenkins'],
      status: 'В процессе',
      detailsUrl: '#',
      reportUrl: '#'
    },
    {
      id: 3,
      title: 'Тестирование мобильного приложения',
      description: 'Функциональное и usability тестирование iOS/Android приложения, создание чек-листов и тест-кейсов.',
      technologies: ['Manual Testing', 'Charles Proxy', 'TestFlight', 'JIRA'],
      status: 'Завершен',
      detailsUrl: '#',
      reportUrl: '#'
    }
  ],
  skills: [
    { id: 1, name: 'Manual Testing', level: 90 },
    { id: 2, name: 'Test Documentation', level: 85 },
    { id: 3, name: 'API Testing', level: 80 },
    { id: 4, name: 'SQL', level: 75 },
    { id: 5, name: 'Postman', level: 85 },
    { id: 6, name: 'JIRA', level: 90 },
    { id: 7, name: 'TestRail', level: 80 },
    { id: 8, name: 'Charles Proxy', level: 70 }
  ]
};

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentState>(() => {
    // Загружаем сохраненные данные из localStorage
    const saved = localStorage.getItem('portfolio_content');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing saved content:', error);
        return defaultContent;
      }
    }
    return defaultContent;
  });

  // Автосохранение при изменении контента
  useEffect(() => {
    localStorage.setItem('portfolio_content', JSON.stringify(content));
  }, [content]);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setContent(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now(),
      technologies: typeof projectData.technologies === 'string' 
        ? (projectData.technologies as string).split(',').map(tech => tech.trim())
        : projectData.technologies
    };
    
    setContent(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const removeProject = (id: number) => {
    setContent(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const updateProject = (id: number, updates: Partial<Project>) => {
    setContent(prev => ({
      ...prev,
      projects: prev.projects.map(p => 
        p.id === id ? { ...p, ...updates } : p
      )
    }));
  };

  const addSkill = (skillData: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      ...skillData,
      id: Date.now()
    };
    
    setContent(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const removeSkill = (id: number) => {
    setContent(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  const updateSkill = (id: number, updates: Partial<Skill>) => {
    setContent(prev => ({
      ...prev,
      skills: prev.skills.map(s => 
        s.id === id ? { ...s, ...updates } : s
      )
    }));
  };

  const saveContent = async () => {
    // Имитация сохранения на сервер
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem('portfolio_content', JSON.stringify(content));
  };

  return (
    <ContentContext.Provider value={{
      ...content,
      updatePersonalInfo,
      addProject,
      removeProject,
      updateProject,
      addSkill,
      removeSkill,
      updateSkill,
      saveContent
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}