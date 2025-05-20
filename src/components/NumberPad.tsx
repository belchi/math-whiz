
import React from "react";
import { Button } from "@/components/ui/button";

interface NumberPadProps {
  handleNumberPress: (num: string) => void;
  handleDelete: () => void;
  checkAnswer: () => void;
  answerEntered: boolean;
}

const NumberPad: React.FC<NumberPadProps> = ({
  handleNumberPress,
  handleDelete,
  checkAnswer,
  answerEntered,
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 text-center">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
        <Button
          key={num}
          onClick={() => handleNumberPress(num.toString())}
          className="number-button h-16 relative bg-white hover:bg-gray-50/50"
        >
          {num}
        </Button>
      ))}
      <Button
        onClick={handleDelete}
        className="operation-button h-16 relative bg-kidyellow hover:bg-kidyellow/90"
        title="Backspace"
      >
        ←
        <span className="absolute bottom-1 right-1 text-[0.6rem] text-gray-400">⌫</span>
      </Button>
      <Button
        onClick={() => handleNumberPress("0")}
        className="number-button h-16 bg-white hover:bg-gray-50/50"
      >
        0
      </Button>
      <Button
        onClick={checkAnswer}
        disabled={!answerEntered}
        className="control-button h-16 relative bg-kidblue hover:bg-kidblue/90"
        title="Enter"
      >
        ✓
        <span className="absolute bottom-1 right-1 text-[0.6rem] text-gray-400">⌫</span>
      </Button>
    </div>
  );
};

export default NumberPad;
