import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  scrollToSection: (id: string) => void;
  consultForm: { name: string; email: string; phone: string; message: string };
  setConsultForm: (form: { name: string; email: string; phone: string; message: string }) => void;
  handleConsultSubmit: (e: React.FormEvent) => void;
}

const Navbar = ({ scrollToSection, consultForm, setConsultForm, handleConsultSubmit }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Heart" className="text-primary" size={32} />
            <span className="text-2xl font-bold text-primary">NutriLife</span>
          </div>
          <div className="hidden md:flex gap-6">
            <button onClick={() => scrollToSection('hero')} className="hover:text-primary transition-colors">Главная</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">Обо мне</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">Услуги</button>
            <button onClick={() => scrollToSection('calculators')} className="hover:text-primary transition-colors">Калькуляторы</button>
            <button onClick={() => scrollToSection('reviews')} className="hover:text-primary transition-colors">Отзывы</button>
            <button onClick={() => scrollToSection('contacts')} className="hover:text-primary transition-colors">Контакты</button>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
                Записаться
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
                  <Label htmlFor="name">Имя</Label>
                  <Input 
                    id="name" 
                    required
                    value={consultForm.name}
                    onChange={(e) => setConsultForm({...consultForm, name: e.target.value})}
                    placeholder="Ваше имя" 
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required
                    value={consultForm.email}
                    onChange={(e) => setConsultForm({...consultForm, email: e.target.value})}
                    placeholder="your@email.com" 
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    required
                    value={consultForm.phone}
                    onChange={(e) => setConsultForm({...consultForm, phone: e.target.value})}
                    placeholder="+7 (___) ___-__-__" 
                  />
                </div>
                <div>
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea 
                    id="message" 
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
