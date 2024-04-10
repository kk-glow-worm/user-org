import { createContext } from "react";
import { Step } from "../hooks";

export interface IWizard {
  step: Step;
  setStep: (step: Step) => void;
}
export const WizardContext = createContext<IWizard>({
  step: Step.Completed,
  setStep: () => {},
});
