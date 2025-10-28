import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
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
  );
};

export default Footer;
