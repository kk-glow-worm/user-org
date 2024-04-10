import { useEffect, useState } from "react";

export enum Step {
  Edit,
  Confirm,
  Completed,
  Landing,
}

export const useInitWizard = (
  isCompleted: boolean,
  setStep: (step: Step) => void,
) => {
  useEffect(() => {
    if (!isCompleted) {
      setStep(Step.Edit);
    }
  }, [isCompleted, setStep]);
};
export const useWizard = () => {
  const [step, setStep] = useState(Step.Landing);

  return {
    step,
    setStep,
  };
};
