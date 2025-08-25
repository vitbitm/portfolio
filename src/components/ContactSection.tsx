import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { useContent } from "./ContentContext";

export function ContactSection() {
  const { personalInfo } = useContent();

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`
    },
    {
      icon: Phone,
      title: "Телефон",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone.replace(/\D/g, '')}`
    },
    {
      icon: MapPin,
      title: "Локация",
      value: personalInfo.location,
      href: "#"
    }
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Свяжитесь со мной</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Открыт для новых проектов и вакансий в сфере тестирования. 
            Отвечу в течение 24 часов
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Card className="border-border/50 h-fit">
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <contact.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{contact.title}</p>
                      <p>{contact.value}</p>
                    </div>
                  </motion.a>
                ))}

                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">Социальные сети</p>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Отправить сообщение</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input 
                        id="name" 
                        placeholder="Ваше имя"
                        className="bg-input-background border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com"
                        className="bg-input-background border-border/50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Тема</Label>
                    <Input 
                      id="subject" 
                      placeholder="Тема сообщения"
                      className="bg-input-background border-border/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Расскажите о вашем проекте..."
                      className="min-h-32 bg-input-background border-border/50"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}