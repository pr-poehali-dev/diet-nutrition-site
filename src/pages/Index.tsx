import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [bmiData, setBmiData] = useState({ weight: '', height: '' });
  const [calorieData, setCalorieData] = useState({ 
    weight: '', 
    height: '', 
    age: '', 
    gender: 'male', 
    activity: 'moderate' 
  });
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [calorieResult, setCalorieResult] = useState<number | null>(null);
  const [consultForm, setConsultForm] = useState({ name: '', email: '', phone: '', message: '' });

  const calculateBMI = () => {
    const weight = parseFloat(bmiData.weight);
    const height = parseFloat(bmiData.height) / 100;
    if (weight > 0 && height > 0) {
      const bmi = weight / (height * height);
      setBmiResult(parseFloat(bmi.toFixed(1)));
    }
  };

  const calculateCalories = () => {
    const weight = parseFloat(calorieData.weight);
    const height = parseFloat(calorieData.height);
    const age = parseFloat(calorieData.age);
    
    if (weight > 0 && height > 0 && age > 0) {
      let bmr;
      if (calorieData.gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }
      
      const activityMultipliers: { [key: string]: number } = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
      };
      
      const calories = bmr * activityMultipliers[calorieData.activity];
      setCalorieResult(Math.round(calories));
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Недостаточный вес', color: 'text-blue-600' };
    if (bmi < 25) return { text: 'Нормальный вес', color: 'text-primary' };
    if (bmi < 30) return { text: 'Избыточный вес', color: 'text-accent' };
    return { text: 'Ожирение', color: 'text-destructive' };
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Я свяжусь с вами в ближайшее время.",
    });
    setConsultForm({ name: '', email: '', phone: '', message: '' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      
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

      <section id="about" className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Обо мне</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center text-left">
              <div className="md:w-1/3">
                <img 
                  src="https://cdn.poehali.dev/projects/3efb9e7c-f658-4b5d-9f9e-f3677f13f08a/files/411f806b-18e8-477d-827f-4438553d165e.jpg" 
                  alt="Диетолог"
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div className="md:w-2/3 space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Меня зовут Анна, я дипломированный диетолог-нутрициолог с 8-летним опытом работы. 
                  Помогаю людям достигать целей в области здоровья и питания через научно обоснованный подход.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <Icon name="Award" className="text-primary" size={32} />
                        <div>
                          <div className="font-bold text-2xl">8+</div>
                          <div className="text-sm text-muted-foreground">лет опыта</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <Icon name="Users" className="text-accent" size={32} />
                        <div>
                          <div className="font-bold text-2xl">500+</div>
                          <div className="text-sm text-muted-foreground">клиентов</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Услуги</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
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
            ].map((service, i) => (
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

      <section id="calculators" className="py-20 bg-gradient-to-r from-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Калькуляторы здоровья</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Узнайте свой индекс массы тела и суточную норму калорий
          </p>
          
          <Tabs defaultValue="bmi" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 h-14">
              <TabsTrigger value="bmi" className="text-lg">Калькулятор ИМТ</TabsTrigger>
              <TabsTrigger value="calories" className="text-lg">Калькулятор калорий</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bmi">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Индекс массы тела (ИМТ)</CardTitle>
                  <CardDescription>Рассчитайте свой индекс массы тела</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bmi-weight">Вес (кг)</Label>
                      <Input
                        id="bmi-weight"
                        type="number"
                        placeholder="70"
                        value={bmiData.weight}
                        onChange={(e) => setBmiData({...bmiData, weight: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bmi-height">Рост (см)</Label>
                      <Input
                        id="bmi-height"
                        type="number"
                        placeholder="170"
                        value={bmiData.height}
                        onChange={(e) => setBmiData({...bmiData, height: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <Button onClick={calculateBMI} className="w-full text-lg py-6">
                    <Icon name="Calculator" className="mr-2" />
                    Рассчитать ИМТ
                  </Button>
                  
                  {bmiResult !== null && (
                    <div className="mt-6 p-6 bg-secondary rounded-xl animate-scale-in">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-primary mb-2">{bmiResult}</div>
                        <div className={`text-xl font-semibold ${getBMICategory(bmiResult).color}`}>
                          {getBMICategory(bmiResult).text}
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                          <div className="flex justify-between mb-2">
                            <span>Недостаточный (&lt;18.5)</span>
                            <span>Нормальный (18.5-24.9)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Избыточный (25-29.9)</span>
                            <span>Ожирение (≥30)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="calories">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Суточная норма калорий</CardTitle>
                  <CardDescription>Рассчитайте вашу дневную потребность в калориях</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cal-weight">Вес (кг)</Label>
                      <Input
                        id="cal-weight"
                        type="number"
                        placeholder="70"
                        value={calorieData.weight}
                        onChange={(e) => setCalorieData({...calorieData, weight: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cal-height">Рост (см)</Label>
                      <Input
                        id="cal-height"
                        type="number"
                        placeholder="170"
                        value={calorieData.height}
                        onChange={(e) => setCalorieData({...calorieData, height: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cal-age">Возраст (лет)</Label>
                      <Input
                        id="cal-age"
                        type="number"
                        placeholder="30"
                        value={calorieData.age}
                        onChange={(e) => setCalorieData({...calorieData, age: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cal-gender">Пол</Label>
                      <Select value={calorieData.gender} onValueChange={(v) => setCalorieData({...calorieData, gender: v})}>
                        <SelectTrigger id="cal-gender">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Мужской</SelectItem>
                          <SelectItem value="female">Женский</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="cal-activity">Уровень активности</Label>
                    <Select value={calorieData.activity} onValueChange={(v) => setCalorieData({...calorieData, activity: v})}>
                      <SelectTrigger id="cal-activity">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Минимальная (сидячий образ жизни)</SelectItem>
                        <SelectItem value="light">Низкая (1-3 тренировки в неделю)</SelectItem>
                        <SelectItem value="moderate">Средняя (3-5 тренировок в неделю)</SelectItem>
                        <SelectItem value="active">Высокая (6-7 тренировок в неделю)</SelectItem>
                        <SelectItem value="veryActive">Очень высокая (интенсивные тренировки)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={calculateCalories} className="w-full text-lg py-6">
                    <Icon name="Calculator" className="mr-2" />
                    Рассчитать калории
                  </Button>
                  
                  {calorieResult !== null && (
                    <div className="mt-6 p-6 bg-secondary rounded-xl animate-scale-in">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-primary mb-2">{calorieResult}</div>
                        <div className="text-xl font-semibold text-muted-foreground">ккал в день</div>
                        <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                          <div className="p-3 bg-white rounded-lg">
                            <div className="font-bold text-lg text-accent">{Math.round(calorieResult * 0.85)}</div>
                            <div className="text-muted-foreground">Похудение</div>
                          </div>
                          <div className="p-3 bg-white rounded-lg">
                            <div className="font-bold text-lg text-primary">{calorieResult}</div>
                            <div className="text-muted-foreground">Поддержание</div>
                          </div>
                          <div className="p-3 bg-white rounded-lg">
                            <div className="font-bold text-lg text-blue-600">{Math.round(calorieResult * 1.15)}</div>
                            <div className="text-muted-foreground">Набор массы</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="reviews" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Отзывы клиентов</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Мария, 32 года',
                text: 'За 3 месяца работы с Анной я не только достигла своего идеального веса, но и научилась питаться правильно. Больше никаких диет!',
                rating: 5
              },
              {
                name: 'Дмитрий, 28 лет',
                text: 'Как спортсмен, мне важно было сбалансировать питание. Анна разработала отличный план, который помог улучшить результаты.',
                rating: 5
              },
              {
                name: 'Екатерина, 45 лет',
                text: 'Профессиональный подход и внимание к деталям. Анна помогла мне разобраться с проблемами пищеварения через правильное питание.',
                rating: 5
              }
            ].map((review, i) => (
              <Card key={i} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(review.rating)].map((_, j) => (
                      <Icon key={j} name="Star" className="text-accent fill-accent" size={20} />
                    ))}
                  </div>
                  <CardTitle className="text-xl">{review.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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

      <footer className="bg-primary/5 py-12 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Heart" className="text-primary" size={32} />
            <span className="text-2xl font-bold text-primary">NutriLife</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Ваш путь к здоровому образу жизни
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 NutriLife. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;