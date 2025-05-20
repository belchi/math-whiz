
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

type OperationType = "addition" | "subtraction" | "multiplication" | "division";

interface MathSettingsProps {
  name: string;
  setName: (name: string) => void;
  operationType: OperationType;
  setOperationType: (type: OperationType) => void;
  minNumber: number;
  setMinNumber: (num: number) => void;
  maxNumber: number;
  setMaxNumber: (num: number) => void;
  timeLimit: number;
  setTimeLimit: (time: number) => void;
  onStart: () => void;
}

const MathSettings: React.FC<MathSettingsProps> = ({
  name,
  setName,
  operationType,
  setOperationType,
  minNumber,
  setMinNumber,
  maxNumber,
  setMaxNumber,
  timeLimit,
  setTimeLimit,
  onStart,
}) => {
  // Convert timeLimit from seconds to minutes for display
  const timeLimitMinutes = Math.round(timeLimit / 60);
  
  // Handle time limit changes in minutes, convert back to seconds
  const handleTimeLimitChange = (value: number[]) => {
    setTimeLimit(value[0] * 60); // Convert minutes to seconds
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart();
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-xl rounded-2xl border-t-4 border-kidpurple animate-float">
      <CardHeader className="bg-kidpurple/10 rounded-t-xl">
        <CardTitle className="text-3xl text-center text-kidpurple">Matteutmaning</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-lg font-bold text-gray-700">Ditt Namn</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ange ditt namn"
                className="text-lg"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-bold text-gray-700">Välj Operation</Label>
              <RadioGroup
                value={operationType}
                onValueChange={(value) => setOperationType(value as OperationType)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 bg-kidblue/10 p-3 rounded-lg">
                  <RadioGroupItem value="addition" id="addition" />
                  <Label htmlFor="addition" className="text-lg font-medium cursor-pointer">Addition (+)</Label>
                </div>
                
                <div className="flex items-center space-x-2 bg-kidred/10 p-3 rounded-lg">
                  <RadioGroupItem value="subtraction" id="subtraction" />
                  <Label htmlFor="subtraction" className="text-lg font-medium cursor-pointer">Subtraktion (-)</Label>
                </div>
                
                <div className="flex items-center space-x-2 bg-kidgreen/10 p-3 rounded-lg">
                  <RadioGroupItem value="multiplication" id="multiplication" />
                  <Label htmlFor="multiplication" className="text-lg font-medium cursor-pointer">Multiplikation (×)</Label>
                </div>
                
                <div className="flex items-center space-x-2 bg-kidyellow/10 p-3 rounded-lg">
                  <RadioGroupItem value="division" id="division" />
                  <Label htmlFor="division" className="text-lg font-medium cursor-pointer">Division (÷)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-number" className="text-lg font-bold text-gray-700">Minsta Nummer:</Label>
                <Input
                  type="number"
                  id="min-number"
                  value={minNumber}
                  onChange={(e) => setMinNumber(parseInt(e.target.value, 10))}
                  min={1}
                  max={maxNumber - 1}
                  className="text-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-number" className="text-lg font-bold text-gray-700">Största Nummer:</Label>
                <Input
                  type="number"
                  id="max-number"
                  value={maxNumber}
                  onChange={(e) => setMaxNumber(parseInt(e.target.value, 10))}
                  min={minNumber + 1}
                  max={20}
                  className="text-lg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-bold text-gray-700">Tidsgräns: {timeLimitMinutes} minut{timeLimitMinutes !== 1 ? 'er' : ''}</Label>
              </div>
              <Slider
                value={[timeLimitMinutes]}
                onValueChange={handleTimeLimitChange}
                min={1}
                max={10}
                step={1}
                className="pt-2"
              />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center pt-2 pb-6">
        <Button 
          onClick={onStart} 
          className="bg-kidgreen hover:bg-green-600 text-white text-xl px-10 py-6 rounded-xl shadow-lg transition-transform hover:-translate-y-1"
          disabled={!name.trim()}
        >
          Starta Utmaning!
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MathSettings;
