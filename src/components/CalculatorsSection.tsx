import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface CalculatorsSectionProps {
  bmiData: { weight: string; height: string };
  setBmiData: (data: { weight: string; height: string }) => void;
  calorieData: { weight: string; height: string; age: string; gender: string; activity: string };
  setCalorieData: (data: { weight: string; height: string; age: string; gender: string; activity: string }) => void;
  bmiResult: number | null;
  calorieResult: number | null;
  calculateBMI: () => void;
  calculateCalories: () => void;
  getBMICategory: (bmi: number) => { text: string; color: string };
}

const CalculatorsSection = ({
  bmiData,
  setBmiData,
  calorieData,
  setCalorieData,
  bmiResult,
  calorieResult,
  calculateBMI,
  calculateCalories,
  getBMICategory
}: CalculatorsSectionProps) => {
  return (
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
  );
};

export default CalculatorsSection;
