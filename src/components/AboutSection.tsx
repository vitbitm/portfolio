import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export function AboutSection() {
  const experiences = [
    {
      title: "Junior QA Engineer",
      company: "Tech Startup",
      period: "2023 - настоящее время",
      description: "Выполнение функционального тестирования веб-приложений, написание тест-кейсов, поиск и документирование багов"
    },
    {
      title: "QA Trainee",
      company: "IT Academy", 
      period: "2023 - 2023",
      description: "Изучение основ тестирования, работа с инструментами автоматизации, практика на реальных проектах"
    },
    {
      title: "Manual Tester",
      company: "Freelance",
      period: "2022 - 2023", 
      description: "Тестирование мобильных приложений, проведение регрессионного тестирования, создание отчетов о дефектах"
    }
  ];

  return (
    <section id="about" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">О себе</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Начинающий QA-инженер с passion к обеспечению качества и 
            созданию надежных программных продуктов
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6">Мой путь в тестировании</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Начала свой путь в IT с изучения основ тестирования программного обеспечения. 
              За время работы освоила методики функционального тестирования, изучаю автоматизацию 
              и постоянно развиваю навыки для обеспечения высокого качества продуктов.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              <Badge variant="secondary">Manual Testing</Badge>
              <Badge variant="secondary">Test Cases</Badge>
              <Badge variant="secondary">Bug Reporting</Badge>
              <Badge variant="secondary">Postman</Badge>
              <Badge variant="secondary">SQL</Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {experiences.map((exp, index) => (
              <Card key={index} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-primary">{exp.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {exp.period}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">{exp.company}</p>
                  <p className="text-sm leading-relaxed">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}