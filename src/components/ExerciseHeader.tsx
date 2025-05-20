
import React from "react";
import { Calculator, Check, X } from "lucide-react";
import { getOperationColor, getOperationSymbol } from "@/utils/mathOperations";

interface ExerciseHeaderProps {
  operationType: "addition" | "subtraction" | "multiplication" | "division";
  remainingTime: number;
  num1: number;
  num2: number;
  answer: string;
  isCorrect: boolean | null;
  correctCount: number;
  totalAttempts: number;
}

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({
  operationType,
  remainingTime,
  num1,
  num2,
  answer,
  isCorrect,
  correctCount,
  totalAttempts,
}) => {
  // Swedish translations for operation types
  const getOperationName = (type: string) => {
    switch(type) {
      case "addition": return "Addition";
      case "subtraction": return "Subtraktion";
      case "multiplication": return "Multiplikation";
      case "division": return "Division";
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  return (
    <div className={`flex flex-col items-center ${getOperationColor(operationType)}`}>
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-lg">
          <Calculator size={20} />
          <span className="font-bold">
            {getOperationName(operationType)}
          </span>
        </div>
        <div className="bg-white/50 px-3 py-1 rounded-lg font-bold">
          Tid: {remainingTime}s
        </div>
      </div>
      
      <div className="w-full mt-4">
        <div className="text-4xl font-bold flex justify-center items-center gap-4 py-4">
          <span>{num1}</span>
          <span>{getOperationSymbol(operationType)}</span>
          <span>{num2}</span>
          <span>=</span>
          <div className={`min-w-16 px-3 py-1 rounded-lg text-center ${
            isCorrect === null ? 'bg-white' : 
            isCorrect ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {answer || "?"}
            {isCorrect !== null && (
              isCorrect 
                ? <Check className="inline ml-2 text-green-500" size={20} />
                : <X className="inline ml-2 text-red-500" size={20} />
            )}
          </div>
        </div>
      </div>

      <div className="w-full bg-white/50 px-3 py-1 rounded-lg text-center font-bold">
        Rätt: {correctCount} / {totalAttempts}
      </div>
    </div>
  );
};

export default ExerciseHeader;
