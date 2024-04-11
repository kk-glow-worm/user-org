import { useContext, useEffect, useState } from "react";
import { UserDetailsContext } from "../../context/UserDetailsContext";
import { SetStep } from "../../context/WizardContext";
/*******************************************
 helpers
 *******************************************/
export enum Step {
  Edit,
  Completed,
}

const initStep =
  (isLoading: boolean, isMissingUserDetails: boolean, setStep: SetStep) =>
  () => {
    if (!isLoading && isMissingUserDetails) {
      setStep(Step.Edit);
    }
  };
/*******************************************
 hooks
 *******************************************/
export const useInitWizard = (setStep: SetStep) => {
  const { isLoading, isMissingUserDetails } = useContext(UserDetailsContext);

  useEffect(initStep(isLoading, isMissingUserDetails, setStep), [
    isMissingUserDetails,
    isLoading,
  ]);
};
export const useWizard = () => {
  const [step, setStep] = useState(Step.Completed);

  return {
    step,
    setStep,
  };
};
/*******************************************
 export for testing
 *******************************************/
export { initStep };
