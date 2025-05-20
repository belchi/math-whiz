
import React, { useState, useEffect } from "react";
import MathSettings from "@/components/MathSettings";
import MathExercise from "@/components/MathExercise";
import ResultScreen from "@/components/ResultScreen";

type OperationType = "addition" | "subtraction" | "multiplication" | "division";

enum AppState {
  SETTINGS,
  EXERCISE,
  RESULTS,
}

const Index = () => {
  // App state
  const [appState, setAppState] = useState<AppState>(AppState.SETTINGS);
  
  // User info with localStorage persistence
  const [name, setName] = useState<string>("");
  
  // Settings state
  const [operationType, setOperationType] = useState<OperationType>("addition");
  const [minNumber, setMinNumber] = useState<number>(1);
  const [maxNumber, setMaxNumber] = useState<number>(10);
  const [timeLimit, setTimeLimit] = useState<number>(300); // Default to 5 minutes (300 seconds)
  
  // Results state
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Load name from localStorage on component mount
  useEffect(() => {
    const savedName = localStorage.getItem("mathChallengeName");
    if (savedName) {
      setName(savedName);
    }
  }, []);

  // Save name to localStorage whenever it changes
  const handleNameChange = (newName: string) => {
    setName(newName);
    localStorage.setItem("mathChallengeName", newName);
  };

  // Handlers
  const handleStartExercise = () => {
    // Reset results when starting a new exercise
    setCorrectCount(0);
    setTotalCount(0);
    setAppState(AppState.EXERCISE);
  };

  const handleExerciseComplete = (correct: number, total: number) => {
    console.log("Exercise complete! Received stats:", correct, total);
    setCorrectCount(correct);
    setTotalCount(total);
    setAppState(AppState.RESULTS);
  };

  const handleRestart = () => {
    setAppState(AppState.SETTINGS);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-start justify-start p-0 pt-0 sm:items-center sm:justify-center sm:p-4">
      <main className="w-full max-w-md p-2 sm:p-0">
        {appState === AppState.SETTINGS && (
          <MathSettings
            name={name}
            setName={handleNameChange}
            operationType={operationType}
            setOperationType={setOperationType}
            minNumber={minNumber}
            setMinNumber={setMinNumber}
            maxNumber={maxNumber}
            setMaxNumber={setMaxNumber}
            timeLimit={timeLimit}
            setTimeLimit={setTimeLimit}
            onStart={handleStartExercise}
          />
        )}

        {appState === AppState.EXERCISE && (
          <MathExercise
            operationType={operationType}
            minNumber={minNumber}
            maxNumber={maxNumber}
            timeLimit={timeLimit}
            onComplete={handleExerciseComplete}
          />
        )}

        {appState === AppState.RESULTS && (
          <ResultScreen
            name={name}
            correctCount={correctCount}
            totalCount={totalCount}
            operationType={operationType}
            timeLimit={timeLimit}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
