import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Settings, 
  User, 
  Briefcase, 
  Code, 
  Mail, 
  Plus, 
  Trash2, 
  Save,
  Eye,
  EyeOff,
  LogOut,
  Edit,
  ExternalLink
} from 'lucide-react';
import { useAuth } from './AuthContext';
import { useContent, Project } from './ContentContext';

export function AdminPanel() {
  const { logout, isAdminMode, toggleAdminMode } = useAuth();
  const { 
    personalInfo, 
    projects, 
    skills, 
    updatePersonalInfo,
    addProject,
    removeProject,
    updateProject,
    addSkill,
    removeSkill,
    saveContent
  } = useContent();
  
  const [isSaving, setIsSaving] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    status: 'В процессе',
    detailsUrl: '',
    reportUrl: ''
  });

  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 50
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveContent();
      alert('Изменения сохранены!');
    } catch (error) {
      alert('Ошибка при сохранении');
    }
    setIsSaving(false);
  };

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      addProject({
        title: newProject.title,
        description: newProject.description,
        technologies: newProject.technologies.split(',').map(tech => tech.trim()),
        status: newProject.status,
        detailsUrl: newProject.detailsUrl || undefined,
        reportUrl: newProject.reportUrl || undefined
      });
      setNewProject({ 
        title: '', 
        description: '', 
        technologies: '', 
        status: 'В процессе',
        detailsUrl: '',
        reportUrl: ''
      });
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject({
      ...project,
      technologies: project.technologies.join(', ')
    } as any);
  };

  const handleUpdateProject = () => {
    if (editingProject) {
      updateProject(editingProject.id, {
        title: editingProject.title,
        description: editingProject.description,
        technologies: typeof editingProject.technologies === 'string' 
          ? editingProject.technologies.split(',').map(tech => tech.trim())
          : editingProject.technologies,
        status: editingProject.status,
        detailsUrl: editingProject.detailsUrl || undefined,
        reportUrl: editingProject.reportUrl || undefined
      });
      setEditingProject(null);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.name) {
      addSkill({
        name: newSkill.name,
        level: newSkill.level
      });
      setNewSkill({ name: '', level: 50 });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Административная панель */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Settings className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-lg font-medium">Административная панель</h1>
              <p className="text-sm text-muted-foreground">Управление контентом портфолио</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAdminMode}
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              Вернуться к сайту
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Сохранение...' : 'Сохранить'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Выйти
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal" className="gap-2">
              <User className="w-4 h-4" />
              Личная информация
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <Briefcase className="w-4 h-4" />
              Проекты
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-2">
              <Code className="w-4 h-4" />
              Навыки
            </TabsTrigger>
            <TabsTrigger value="contacts" className="gap-2">
              <Mail className="w-4 h-4" />
              Контакты
            </TabsTrigger>
          </TabsList>

          {/* Личная информация */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Основная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      value={personalInfo.name}
                      onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Должность</Label>
                    <Input
                      id="title"
                      value={personalInfo.title}
                      onChange={(e) => updatePersonalInfo({ title: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">О себе</Label>
                  <Textarea
                    id="bio"
                    value={personalInfo.bio}
                    onChange={(e) => updatePersonalInfo({ bio: e.target.value })}
                    className="min-h-24"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Проекты */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Добавить новый проект</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-title">Название проекта</Label>
                    <Input
                      id="project-title"
                      value={newProject.title}
                      onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                      placeholder="Введите название проекта"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-status">Статус</Label>
                    <Input
                      id="project-status"
                      value={newProject.status}
                      onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                      placeholder="Завершен, В процессе..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-description">Описание</Label>
                  <Textarea
                    id="project-description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    placeholder="Описание проекта"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-technologies">Технологии</Label>
                  <Input
                    id="project-technologies"
                    value={newProject.technologies}
                    onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                    placeholder="React, TypeScript, Node.js (через запятую)"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-details">Ссылка на детали</Label>
                    <Input
                      id="project-details"
                      value={newProject.detailsUrl}
                      onChange={(e) => setNewProject({...newProject, detailsUrl: e.target.value})}
                      placeholder="https://example.com/project-details"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-report">Ссылка на отчет</Label>
                    <Input
                      id="project-report"
                      value={newProject.reportUrl}
                      onChange={(e) => setNewProject({...newProject, reportUrl: e.target.value})}
                      placeholder="https://example.com/test-report"
                    />
                  </div>
                </div>
                <Button onClick={handleAddProject} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Добавить проект
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium mb-2">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="secondary">{tech}</Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{project.status}</Badge>
                            {project.detailsUrl && (
                              <Badge variant="outline" className="gap-1">
                                <ExternalLink className="w-3 h-3" />
                                Детали
                              </Badge>
                            )}
                            {project.reportUrl && (
                              <Badge variant="outline" className="gap-1">
                                <ExternalLink className="w-3 h-3" />
                                Отчет
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditProject(project)}
                                className="gap-2"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Редактировать проект</DialogTitle>
                              </DialogHeader>
                              {editingProject && (
                                <div className="space-y-4">
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label>Название проекта</Label>
                                      <Input
                                        value={editingProject.title}
                                        onChange={(e) => setEditingProject({
                                          ...editingProject, 
                                          title: e.target.value
                                        })}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Статус</Label>
                                      <Input
                                        value={editingProject.status}
                                        onChange={(e) => setEditingProject({
                                          ...editingProject, 
                                          status: e.target.value
                                        })}
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Описание</Label>
                                    <Textarea
                                      value={editingProject.description}
                                      onChange={(e) => setEditingProject({
                                        ...editingProject, 
                                        description: e.target.value
                                      })}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Технологии</Label>
                                    <Input
                                      value={editingProject.technologies as string}
                                      onChange={(e) => setEditingProject({
                                        ...editingProject, 
                                        technologies: e.target.value as any
                                      })}
                                      placeholder="React, TypeScript, Node.js (через запятую)"
                                    />
                                  </div>
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label>Ссылка на детали</Label>
                                      <Input
                                        value={editingProject.detailsUrl || ''}
                                        onChange={(e) => setEditingProject({
                                          ...editingProject, 
                                          detailsUrl: e.target.value
                                        })}
                                        placeholder="https://example.com/project-details"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Ссылка на отчет</Label>
                                      <Input
                                        value={editingProject.reportUrl || ''}
                                        onChange={(e) => setEditingProject({
                                          ...editingProject, 
                                          reportUrl: e.target.value
                                        })}
                                        placeholder="https://example.com/test-report"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex gap-3 pt-4">
                                    <Button onClick={handleUpdateProject} className="gap-2">
                                      <Save className="w-4 h-4" />
                                      Сохранить изменения
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      onClick={() => setEditingProject(null)}
                                    >
                                      Отмена
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeProject(project.id)}
                            className="gap-2 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Навыки */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Добавить новый навык</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="skill-name">Название навыка</Label>
                    <Input
                      id="skill-name"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                      placeholder="Введите название навыка"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skill-level">Уровень (0-100%)</Label>
                    <Input
                      id="skill-level"
                      type="number"
                      min="0"
                      max="100"
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                <Button onClick={handleAddSkill} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Добавить навык
                </Button>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {skills.map((skill) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeSkill(skill.id)}
                          className="ml-4 gap-2 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Контакты */}
          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Местоположение</Label>
                  <Input
                    id="location"
                    value={personalInfo.location}
                    onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}