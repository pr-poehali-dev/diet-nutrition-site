import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import CalculatorsSection from '@/components/CalculatorsSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';

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
      <Navbar 
        scrollToSection={scrollToSection}
        consultForm={consultForm}
        setConsultForm={setConsultForm}
        handleConsultSubmit={handleConsultSubmit}
      />
      
      <HeroSection 
        scrollToSection={scrollToSection}
        consultForm={consultForm}
        setConsultForm={setConsultForm}
        handleConsultSubmit={handleConsultSubmit}
      />
      
      <AboutSection />
      
      <ServicesSection 
        consultForm={consultForm}
        setConsultForm={setConsultForm}
        handleConsultSubmit={handleConsultSubmit}
      />
      
      <CalculatorsSection 
        bmiData={bmiData}
        setBmiData={setBmiData}
        calorieData={calorieData}
        setCalorieData={setCalorieData}
        bmiResult={bmiResult}
        calorieResult={calorieResult}
        calculateBMI={calculateBMI}
        calculateCalories={calculateCalories}
        getBMICategory={getBMICategory}
      />
      
      <ReviewsSection />
      
      <ContactsSection 
        consultForm={consultForm}
        setConsultForm={setConsultForm}
        handleConsultSubmit={handleConsultSubmit}
      />
      
      <Footer />
    </div>
  );
};

export default Index;
