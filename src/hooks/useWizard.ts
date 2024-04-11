import { useContext, useEffect, useState } from "react";
import { UserDetailsContext } from "../context";
/*******************************************
 helpers
 *******************************************/
export enum Step {
  Edit,
  Completed,
}

const initStep =
  (
    isLoading: boolean,
    isMissingUserDetails: boolean,
    setStep: (step: Step) => void,
  ) =>
  () => {
    if (!isLoading && isMissingUserDetails) {
      setStep(Step.Edit);
    }
  };
/*******************************************
 hooks
 *******************************************/
export const useInitWizard = (setStep: (step: Step) => void) => {
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
