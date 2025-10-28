import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const AboutSection = () => {
  return (
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
  );
};

export default AboutSection;
