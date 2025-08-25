import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useContent } from "./ContentContext";

export function HeroSection() {
  const { personalInfo } = useContent();
  
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden shadow-lg">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU1Nzk1NDU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Профессиональное фото"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6"
          >
            Привет, я <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{personalInfo.name}</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {personalInfo.bio}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 shadow-lg"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Посмотреть работы
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/20 hover:bg-primary/5"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Связаться со мной
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}