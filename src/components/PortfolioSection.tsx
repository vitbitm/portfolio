import { motion } from "motion/react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ExternalLink, Github } from "lucide-react";
import { useContent } from "./ContentContext";

export function PortfolioSection() {
  const { projects } = useContent();

  // Дефолтные изображения для проектов
  const defaultImages = [
    "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMHRlc3RpbmclMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzU1ODAzMTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1633250391894-397930e3f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjB0ZXN0aW5nfGVufDF8fHx8MTc1NTcyMTAwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1615743113032-dd845caa43ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGklMjB0ZXN0aW5nJTIwcG9zdG1hbnxlbnwxfHx8fDE3NTU4MDMxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Мои проекты</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Избранные проекты тестирования, демонстрирующие мои навыки в 
            обеспечении качества программного обеспечения
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={defaultImages[index % defaultImages.length]}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Статус проекта в углу */}
                    <div className="absolute top-3 right-3">
                      <Badge 
                        variant={project.status === 'Завершен' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => project.detailsUrl && project.detailsUrl !== '#' ? window.open(project.detailsUrl, '_blank') : null}
                      disabled={!project.detailsUrl || project.detailsUrl === '#'}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Детали
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => project.reportUrl && project.reportUrl !== '#' ? window.open(project.reportUrl, '_blank') : null}
                      disabled={!project.reportUrl || project.reportUrl === '#'}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Отчет
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}