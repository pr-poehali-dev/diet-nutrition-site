import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface ServicesSectionProps {
  consultForm: { name: string; email: string; phone: string; message: string };
  setConsultForm: (form: { name: string; email: string; phone: string; message: string }) => void;
  handleConsultSubmit: (e: React.FormEvent) => void;
}

const ServicesSection = ({ consultForm, setConsultForm, handleConsultSubmit }: ServicesSectionProps) => {
  const services = [
    {
      icon: 'Utensils',
      title: 'Персональный план питания',
      description: 'Индивидуальный рацион с учётом ваших целей, предпочтений и особенностей организма',
      price: 'от 5000 ₽'
    },
    {
      icon: 'Activity',
      title: 'Консультация + анализы',
      description: 'Детальный разбор анализов и рекомендации по коррекции питания',
      price: 'от 3000 ₽'
    },
    {
      icon: 'Target',
      title: 'Сопровождение',
      description: 'Ежемесячное сопровождение с корректировкой плана и поддержкой',
      price: 'от 8000 ₽/мес'
    },
    {
      icon: 'Baby',
      title: 'Питание для детей',
      description: 'Разработка здорового рациона для детей и подростков',
      price: 'от 4000 ₽'
    },
    {
      icon: 'Dumbbell',
      title: 'Спортивное питание',
      description: 'План питания для спортсменов и людей с активным образом жизни',
      price: 'от 6000 ₽'
    },
    {
      icon: 'Heart',
      title: 'Лечебное питание',
      description: 'Диетотерапия при различных заболеваниях',
      price: 'от 5500 ₽'
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Услуги</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <Card key={i} className="hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name={service.icon} className="text-primary" size={32} />
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{service.price}</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Записаться</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>{service.title}</DialogTitle>
                        <DialogDescription>
                          Заполните форму для записи на консультацию
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleConsultSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor={`service-name-${i}`}>Имя</Label>
                          <Input 
                            id={`service-name-${i}`} 
                            required
                            value={consultForm.name}
                            onChange={(e) => setConsultForm({...consultForm, name: e.target.value})}
                            placeholder="Ваше имя" 
                          />
                        </div>
                        <div>
                          <Label htmlFor={`service-email-${i}`}>Email</Label>
                          <Input 
                            id={`service-email-${i}`} 
                            type="email" 
                            required
                            value={consultForm.email}
                            onChange={(e) => setConsultForm({...consultForm, email: e.target.value})}
                            placeholder="your@email.com" 
                          />
                        </div>
                        <div>
                          <Label htmlFor={`service-phone-${i}`}>Телефон</Label>
                          <Input 
                            id={`service-phone-${i}`} 
                            type="tel" 
                            required
                            value={consultForm.phone}
                            onChange={(e) => setConsultForm({...consultForm, phone: e.target.value})}
                            placeholder="+7 (___) ___-__-__" 
                          />
                        </div>
                        <div>
                          <Label htmlFor={`service-message-${i}`}>Сообщение</Label>
                          <Textarea 
                            id={`service-message-${i}`} 
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
