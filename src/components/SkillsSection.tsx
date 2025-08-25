import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useContent } from "./ContentContext";

export function SkillsSection() {
  const { skills } = useContent();

  // Группируем навыки по категориям на основе названия
  const skillCategories = [
    {
      title: "Тестирование", 
      skills: skills.filter(skill => 
        skill.name.toLowerCase().includes('testing') || 
        skill.name.toLowerCase().includes('documentation') ||
        skill.name.toLowerCase().includes('manual')
      )
    },
    {
      title: "Автоматизация и API",
      skills: skills.filter(skill => 
        skill.name.toLowerCase().includes('postman') ||
        skill.name.toLowerCase().includes('sql') ||
        skill.name.toLowerCase().includes('api') ||
        skill.name.toLowerCase().includes('automation')
      )
    },
    {
      title: "Инструменты",
      skills: skills.filter(skill => 
        skill.name.toLowerCase().includes('jira') ||
        skill.name.toLowerCase().includes('testrail') ||
        skill.name.toLowerCase().includes('charles') ||
        skill.name.toLowerCase().includes('proxy') ||
        skill.name.toLowerCase().includes('git')
      )
    }
  ];

  // Если навыки не попали ни в одну категорию, добавляем их в "Другие"
  const categorizedSkillIds = skillCategories.flatMap(cat => cat.skills.map(s => s.id));
  const uncategorizedSkills = skills.filter(skill => !categorizedSkillIds.includes(skill.id));
  
  if (uncategorizedSkills.length > 0) {
    skillCategories.push({
      title: "Другие навыки",
      skills: uncategorizedSkills
    });
  }

  // Фильтруем пустые категории
  const nonEmptyCategories = skillCategories.filter(cat => cat.skills.length > 0);

  const technologies = Array.from(new Set(skills.map(skill => skill.name)));

  return (
    <section id="skills" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Навыки и инструменты</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Постоянно изучаю новые методики тестирования и инструменты 
            для обеспечения высокого качества продуктов
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {nonEmptyCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-border/50">
                <CardContent className="p-6">
                  <h3 className="mb-6 text-primary">{category.title}</h3>
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="mb-8">Мои технологии и инструменты</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Badge 
                  variant="outline" 
                  className="px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}