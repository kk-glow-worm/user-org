import { createContext, ReactNode } from "react";
import { Step, useWizard } from "../hooks/useWizard";
/*******************************************
 context
 *******************************************/
export type SetStep = (step: Step) => void;
export interface IWizard {
  step: Step;
  setStep: SetStep;
}
export const WizardContext = createContext<IWizard>({
  step: Step.Completed,
  setStep: () => {},
});
/*******************************************
 context provider
 *******************************************/
interface IProps {
  children: ReactNode;
}
export const WizardProvider = ({ children }: IProps) => {
  const { step, setStep } = useWizard();
  return (
    <WizardContext.Provider value={{ step, setStep }}>
      {children}
    </WizardContext.Provider>
  );
};
