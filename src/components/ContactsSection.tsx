import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface ContactsSectionProps {
  consultForm: { name: string; email: string; phone: string; message: string };
  setConsultForm: (form: { name: string; email: string; phone: string; message: string }) => void;
  handleConsultSubmit: (e: React.FormEvent) => void;
}

const ContactsSection = ({ consultForm, setConsultForm, handleConsultSubmit }: ContactsSectionProps) => {
  return (
    <section id="contacts" className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Свяжитесь со мной</CardTitle>
                <CardDescription>Я всегда рада ответить на ваши вопросы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" className="text-primary" />
                  <span>+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" className="text-primary" />
                  <span>info@nutrilife.ru</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" className="text-primary" />
                  <span>Москва, ул. Здоровья, д. 1</span>
                </div>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Icon name="Instagram" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Icon name="Send" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Icon name="Mail" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Записаться на консультацию</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleConsultSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name">Имя</Label>
                    <Input 
                      id="contact-name" 
                      required
                      value={consultForm.name}
                      onChange={(e) => setConsultForm({...consultForm, name: e.target.value})}
                      placeholder="Ваше имя" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input 
                      id="contact-email" 
                      type="email" 
                      required
                      value={consultForm.email}
                      onChange={(e) => setConsultForm({...consultForm, email: e.target.value})}
                      placeholder="your@email.com" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Телефон</Label>
                    <Input 
                      id="contact-phone" 
                      type="tel" 
                      required
                      value={consultForm.phone}
                      onChange={(e) => setConsultForm({...consultForm, phone: e.target.value})}
                      placeholder="+7 (___) ___-__-__" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Сообщение</Label>
                    <Textarea 
                      id="contact-message" 
                      value={consultForm.message}
                      onChange={(e) => setConsultForm({...consultForm, message: e.target.value})}
                      placeholder="Расскажите о своей цели..." 
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full">Отправить заявку</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
