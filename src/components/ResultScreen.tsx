
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ResultScreenProps {
  name: string;
  correctCount: number;
  totalCount: number;
  operationType: string;
  timeLimit: number;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  name,
  correctCount,
  totalCount,
  operationType,
  timeLimit,
  onRestart,
}) => {
  // Calculate accuracy percentage, ensuring we don't divide by zero
  const accuracyPercentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  
  // Get message based on stats
  const getMessage = () => {
    if (totalCount === 0) return `${name || "Du"} kan göra bättre nästa gång!`;
    if (accuracyPercentage >= 90) return `Fantastiskt jobb, ${name}! Du är en mattestjärna!`;
    if (accuracyPercentage >= 70) return `Bra jobbat, ${name}! Fortsätt öva!`;
    if (accuracyPercentage >= 50) return `Bra insats, ${name}! Du blir bättre!`;
    return `Fortsätt öva, ${name}! Du kommer att förbättras med tiden!`;
  };

  // Get emoji based on stats
  const getEmoji = () => {
    if (totalCount === 0) return "💪";
    if (accuracyPercentage >= 90) return "🏆";
    if (accuracyPercentage >= 70) return "🌟";
    if (accuracyPercentage >= 50) return "👍";
    return "💪";
  };

  // Calculate speed, handling the zero case
  const speed = totalCount > 0 ? (totalCount / (timeLimit / 60)).toFixed(1) : "0.0";

  return (
    <Card className="w-full max-w-md bg-white shadow-xl rounded-2xl border-t-4 border-kidpurple animate-float">
      <CardHeader className="bg-kidpurple/10 rounded-t-xl">
        <CardTitle className="text-3xl text-center text-kidpurple">
          {name ? `${name}s Resultat` : "Dina Resultat"}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6">
        <div className="text-center">
          <div className="text-9xl mb-4">{getEmoji()}</div>
          <p className="text-xl font-bold text-gray-800">{getMessage()}</p>
        </div>

        <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Problem Lösta:</span>
              <span className="font-bold text-kidblue">{totalCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Rätta Svar:</span>
              <span className="font-bold text-kidgreen">{correctCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Tidsgräns:</span>
              <span className="font-bold">{timeLimit} sekunder</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Operation:</span>
              <span className="font-bold capitalize">
                {operationType === "addition" ? "Addition" : 
                 operationType === "subtraction" ? "Subtraktion" : 
                 operationType === "multiplication" ? "Multiplikation" : 
                 "Division"}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Noggrannhet:</span>
              <span className="font-bold">{accuracyPercentage}%</span>
            </div>
            <Progress value={accuracyPercentage} className="h-4" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Hastighet:</span>
              <span className="font-bold">{speed} problem/minut</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center pt-2 pb-6">
        <Button 
          onClick={onRestart} 
          className="bg-kidgreen hover:bg-green-600 text-white text-xl px-10 py-6 rounded-xl shadow-lg transition-transform hover:-translate-y-1"
        >
          Försök Igen!
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultScreen;
