import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Bug, FileText, CheckCircle, Award } from "lucide-react";

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
}

function Counter({ end, duration, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function StatsSection() {
  const stats = [
    {
      icon: Bug,
      title: "Найдено багов",
      value: 247,
      suffix: "",
      description: "Критических и некритических дефектов"
    },
    {
      icon: FileText,
      title: "Тест-кейсов",
      value: 156,
      suffix: "",
      description: "Написано и выполнено"
    },
    {
      icon: CheckCircle,
      title: "Проектов",
      value: 12,
      suffix: "",
      description: "Успешно протестировано"
    },
    {
      icon: Award,
      title: "Опыт",
      value: 2,
      suffix: " года",
      description: "В сфере тестирования"
    }
  ];

  const achievements = [
    "ISTQB Foundation Level",
    "Postman API Testing",
    "SQL для тестировщиков",
    "Agile Testing Methods",
    "Test Automation Basics"
  ];

  return (
    <section id="stats" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Достижения и статистика</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Количественные показатели работы и полученные сертификаты
          </p>
        </motion.div>

        {/* Статистика */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center border-border/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-semibold text-primary mb-2">
                    <Counter end={stat.value} duration={2} suffix={stat.suffix} />
                  </div>
                  <h3 className="mb-2">{stat.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Сертификаты */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="mb-8">Сертификаты и курсы</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Badge 
                  variant="secondary" 
                  className="px-4 py-2 bg-primary/5 hover:bg-primary/10 transition-colors cursor-default"
                >
                  <Award className="w-3 h-3 mr-2" />
                  {achievement}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}