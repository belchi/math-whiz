
import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import NumberPad from "./NumberPad";
import ExerciseHeader from "./ExerciseHeader";
import { calculateCorrectAnswer, generateExerciseNumbers } from "@/utils/mathOperations";
import { toast } from "@/hooks/use-toast";
import { Keyboard } from "lucide-react";

interface MathExerciseProps {
  operationType: "addition" | "subtraction" | "multiplication" | "division";
  minNumber: number;
  maxNumber: number;
  timeLimit: number;
  onComplete: (correct: number, total: number) => void;
}

const MathExercise: React.FC<MathExerciseProps> = ({
  operationType,
  minNumber,
  maxNumber,
  timeLimit,
  onComplete,
}) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [remainingTime, setRemainingTime] = useState(timeLimit);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  
  // Use refs to keep track of stats that will be reported when component unmounts
  const correctCountRef = useRef(0);
  const totalAttemptsRef = useRef(0);
  const timerEndedRef = useRef(false);
  
  // Generate a new exercise
  const generateNewExercise = () => {
    const [n1, n2] = generateExerciseNumbers(minNumber, maxNumber, operationType);
    setNum1(n1);
    setNum2(n2);
    setAnswer("");
    setIsCorrect(null);
  };

  // Check the answer
  const checkAnswer = () => {
    if (!answer) return; // Don't check empty answers
    
    const correctAnswer = calculateCorrectAnswer(num1, num2, operationType);
    const userAnswerNum = parseInt(answer, 10);
    const isCorrectAnswer = userAnswerNum === correctAnswer;
    setIsCorrect(isCorrectAnswer);
    
    if (isCorrectAnswer) {
      correctCountRef.current += 1;
      setCorrectCount(correctCountRef.current);
    }
    
    totalAttemptsRef.current += 1;
    setTotalAttempts(totalAttemptsRef.current);
    
    console.log(`Answer checked - Correct: ${correctCountRef.current}, Total: ${totalAttemptsRef.current}`);
    
    // Move to next exercise after a short delay
    setTimeout(() => {
      generateNewExercise();
    }, 500);
  };

  // Handle number button press
  const handleNumberPress = (num: string) => {
    if (answer.length < 4) { // Limit answer length
      setAnswer(answer + num);
    }
  };

  // Handle delete button press
  const handleDelete = () => {
    setAnswer(answer.slice(0, -1));
  };

  // Report results when exercise completes
  const reportResults = () => {
    if (!timerEndedRef.current) {
      timerEndedRef.current = true;
      console.log(`Reporting final results: Correct=${correctCountRef.current}, Total=${totalAttemptsRef.current}`);
      onComplete(correctCountRef.current, totalAttemptsRef.current);
      
      if (totalAttemptsRef.current > 0) {
        const percentage = Math.round((correctCountRef.current / totalAttemptsRef.current) * 100);
        toast({
          title: "Övning avslutad!",
          description: `Du fick ${correctCountRef.current} av ${totalAttemptsRef.current} rätt (${percentage}%)`,
        });
      }
    }
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only process if timer is still running
      if (remainingTime <= 0) return;
      
      // Handle number keys (both main keyboard and numpad)
      if (/^[0-9]$/.test(e.key)) {
        handleNumberPress(e.key);
      }
      // Handle Backspace/Delete for erasing
      else if (e.key === "Backspace" || e.key === "Delete") {
        handleDelete();
      }
      // Handle Enter for submitting answer
      else if (e.key === "Enter" && answer) {
        checkAnswer();
      }
    };

    // Add event listener for keyboard input
    window.addEventListener("keydown", handleKeyDown);
    
    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [answer, remainingTime]); // Re-add listener when answer or remainingTime changes

  // Initialize the first exercise and set up cleanup
  useEffect(() => {
    console.log("Starting exercise with time limit:", timeLimit);
    generateNewExercise();
    
    // Start the timer
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          console.log("Time's up!");
          reportResults();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Clean up when component unmounts
    return () => {
      clearInterval(timer);
      // Make sure to report results when component unmounts
      reportResults();
    };
  }, []);

  return (
    <Card className="w-full max-w-md bg-white shadow-xl rounded-2xl">
      <CardHeader>
        <ExerciseHeader
          operationType={operationType}
          remainingTime={remainingTime}
          num1={num1}
          num2={num2}
          answer={answer}
          isCorrect={isCorrect}
          correctCount={correctCount}
          totalAttempts={totalAttempts}
        />
      </CardHeader>

      <CardContent className="pt-4">
        <NumberPad 
          handleNumberPress={handleNumberPress}
          handleDelete={handleDelete}
          checkAnswer={checkAnswer}
          answerEntered={!!answer}
        />
      </CardContent>

      <CardFooter className="flex flex-col items-center pt-2 pb-4">
        <div className="text-sm text-gray-500 italic mb-2">
          Lös så många problem du kan innan tiden tar slut!
        </div>
      </CardFooter>
    </Card>
  );
};

export default MathExercise;
