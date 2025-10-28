import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ReviewsSection = () => {
  const reviews = [
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
  ];

  return (
    <section id="reviews" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Отзывы клиентов</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
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
  );
};

export default ReviewsSection;
