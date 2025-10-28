import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
  consultForm: { name: string; email: string; phone: string; message: string };
  setConsultForm: (form: { name: string; email: string; phone: string; message: string }) => void;
  handleConsultSubmit: (e: React.FormEvent) => void;
}

const HeroSection = ({ scrollToSection, consultForm, setConsultForm, handleConsultSubmit }: HeroSectionProps) => {
  return (
    <section id="hero" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Ваш путь к <span className="text-primary">здоровью</span> начинается здесь
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Персональные программы питания от сертифицированного диетолога-нутрициолога. 
              Научный подход, индивидуальный план, реальные результаты.
            </p>
            <div className="flex flex-wrap gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                    <Icon name="Calendar" className="mr-2" />
                    Записаться на консультацию
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Записаться на консультацию</DialogTitle>
                    <DialogDescription>
                      Заполните форму, и я свяжусь с вами в ближайшее время
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleConsultSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="hero-name">Имя</Label>
                      <Input 
                        id="hero-name" 
                        required
                        value={consultForm.name}
                        onChange={(e) => setConsultForm({...consultForm, name: e.target.value})}
                        placeholder="Ваше имя" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-email">Email</Label>
                      <Input 
                        id="hero-email" 
                        type="email" 
                        required
                        value={consultForm.email}
                        onChange={(e) => setConsultForm({...consultForm, email: e.target.value})}
                        placeholder="your@email.com" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-phone">Телефон</Label>
                      <Input 
                        id="hero-phone" 
                        type="tel" 
                        required
                        value={consultForm.phone}
                        onChange={(e) => setConsultForm({...consultForm, phone: e.target.value})}
                        placeholder="+7 (___) ___-__-__" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-message">Сообщение</Label>
                      <Textarea 
                        id="hero-message" 
                        value={consultForm.message}
                        onChange={(e) => setConsultForm({...consultForm, message: e.target.value})}
                        placeholder="Расскажите о своей цели..." 
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full">Отправить заявку</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-2"
                onClick={() => scrollToSection('calculators')}
              >
                <Icon name="Calculator" className="mr-2" />
                Калькуляторы
              </Button>
            </div>
          </div>
          <div className="animate-scale-in">
            <img 
              src="https://cdn.poehali.dev/projects/3efb9e7c-f658-4b5d-9f9e-f3677f13f08a/files/411f806b-18e8-477d-827f-4438553d165e.jpg" 
              alt="Диетолог-нутрициолог"
              className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
