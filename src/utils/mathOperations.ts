
// Get the operation symbol
export const getOperationSymbol = (operationType: "addition" | "subtraction" | "multiplication" | "division"): string => {
  switch (operationType) {
    case "addition": return "+";
    case "subtraction": return "−";
    case "multiplication": return "×";
    case "division": return "÷";
    default: return "+";
  }
};

// Get background color based on operation
export const getOperationColor = (operationType: "addition" | "subtraction" | "multiplication" | "division"): string => {
  switch (operationType) {
    case "addition": return "bg-kidblue/10";
    case "subtraction": return "bg-kidred/10";
    case "multiplication": return "bg-kidgreen/10";
    case "division": return "bg-kidyellow/10";
    default: return "bg-kidblue/10";
  }
};

// Calculate the correct answer based on operation type
export const calculateCorrectAnswer = (
  num1: number, 
  num2: number, 
  operationType: "addition" | "subtraction" | "multiplication" | "division"
): number => {
  switch (operationType) {
    case "addition":
      return num1 + num2;
    case "subtraction":
      return num1 - num2;
    case "multiplication":
      return num1 * num2;
    case "division":
      return num1 / num2;
    default:
      return 0;
  }
};

// Generate a new exercise
export const generateExerciseNumbers = (
  minNumber: number, 
  maxNumber: number, 
  operationType: "addition" | "subtraction" | "multiplication" | "division"
): [number, number] => {
  let n1, n2;
  
  // Ensure proper number order for subtraction and division
  if (operationType === "subtraction" || operationType === "division") {
    n1 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    n2 = Math.floor(Math.random() * (n1 - minNumber + 1)) + minNumber;
    
    if (operationType === "division") {
      // Generate numbers that divide evenly
      n2 = Math.max(1, n2); // Ensure n2 is at least 1
      n1 = n2 * (Math.floor(Math.random() * Math.min(maxNumber / n2, 10)) + 1);
    }
  } else {
    n1 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    n2 = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  }
  
  return [n1, n2];
};
